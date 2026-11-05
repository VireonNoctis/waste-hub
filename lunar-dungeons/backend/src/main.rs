use std::{env, net::SocketAddr, str::FromStr, sync::Arc};

use axum::{
    Json, Router,
    extract::{Path, State},
    http::{HeaderMap, StatusCode, header},
    response::{IntoResponse, Response},
    routing::{delete, get, post},
};
use jsonwebtoken::{Algorithm, DecodingKey, Validation, decode};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, SqlitePool, sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions}};
use tracing_subscriber::EnvFilter;
use uuid::Uuid;

const STANDARD_STAGE_LIMIT: i64 = 800;
const PLAYER_MAX_HP: i64 = 150;

#[derive(Clone)]
struct AppState {
    pool: SqlitePool,
    jwt_secret: Arc<String>,
    jwt_audience: Option<Arc<String>>,
    session_cookie: Arc<String>,
}

#[derive(Debug)]
struct ApiError {
    status: StatusCode,
    message: String,
}

impl ApiError {
    fn new(status: StatusCode, message: impl Into<String>) -> Self {
        Self { status, message: message.into() }
    }
}

#[derive(Serialize)]
struct ErrorBody {
    error: String,
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        (self.status, Json(ErrorBody { error: self.message })).into_response()
    }
}

impl From<sqlx::Error> for ApiError {
    fn from(error: sqlx::Error) -> Self {
        tracing::error!(?error, "dungeon database operation failed");
        Self::new(StatusCode::INTERNAL_SERVER_ERROR, "The dungeon service encountered an error.")
    }
}

type ApiResult<T> = Result<T, ApiError>;

#[derive(Debug, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct ProgressView {
    highest_unlocked_level: i64,
    completed_level: i64,
    infinity_unlocked: bool,
    infinity_depth: i64,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct HealthView {
    hp: i64,
    max_hp: i64,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct EnemyView {
    name: String,
    hp: i64,
    max_hp: i64,
    boss: bool,
    phase: Option<String>,
    telegraph: bool,
    modifier: Option<String>,
}

#[derive(Serialize)]
struct TurnLog {
    player: String,
    enemy: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct BattleView {
    attempt_id: String,
    mode: String,
    stage: i64,
    depth: i64,
    turn: i64,
    player: HealthView,
    enemy: EnemyView,
    status: String,
    pulse_cooldown: i64,
    last_turn: Option<TurnLog>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct StateResponse {
    progress: ProgressView,
    active_attempt: Option<BattleView>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct StartResponse {
    progress: ProgressView,
    battle: BattleView,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct VictoryEvent {
    attempt_id: String,
    mode: String,
    stage: i64,
    depth: i64,
    tier: Option<i64>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct TurnResponse {
    progress: ProgressView,
    battle: BattleView,
    victory: Option<VictoryEvent>,
    defeated: bool,
}

#[derive(Serialize)]
struct OkResponse {
    ok: bool,
}

#[derive(Serialize)]
struct HealthResponse {
    ok: bool,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct StartRequest {
    mode: String,
    level: Option<i64>,
}

#[derive(Deserialize)]
struct ActionRequest {
    action: String,
}

#[derive(FromRow)]
struct ProfileRow {
    highest_unlocked: i64,
    completed_level: i64,
    infinity_depth: i64,
}

#[derive(FromRow)]
struct AttemptRow {
    attempt_id: String,
    mode: String,
    stage: i64,
    depth: i64,
    seed: i64,
    player_hp: i64,
    enemy_hp: i64,
    enemy_hp_max: i64,
    enemy_power: i64,
    turn: i64,
    guarding: i64,
    pulse_cooldown: i64,
    status: String,
    enemy_name: String,
    is_boss: i64,
    last_player_text: Option<String>,
    last_enemy_text: Option<String>,
}

fn authenticate(headers: &HeaderMap, state: &AppState) -> ApiResult<String> {
    let bearer = headers
        .get(header::AUTHORIZATION)
        .and_then(|value| value.to_str().ok())
        .and_then(|value| value.strip_prefix("Bearer "));

    let cookie_token = headers
        .get(header::COOKIE)
        .and_then(|value| value.to_str().ok())
        .and_then(|cookies| {
            cookies.split(';').find_map(|cookie| {
                let (name, value) = cookie.trim().split_once('=')?;
                (name == state.session_cookie.as_str()).then_some(value)
            })
        });

    let token = bearer.or(cookie_token).ok_or_else(|| {
        ApiError::new(StatusCode::UNAUTHORIZED, "Sign in to enter the dungeons.")
    })?;

    let mut validation = Validation::new(Algorithm::HS256);
    validation.set_required_spec_claims(&["exp", "sub"]);
    if let Some(audience) = &state.jwt_audience {
        validation.set_audience(&[audience.as_str()]);
    } else {
        validation.validate_aud = false;
    }
    let token = decode::<Claims>(
        token,
        &DecodingKey::from_secret(state.jwt_secret.as_bytes()),
        &validation,
    )
    .map_err(|_| ApiError::new(StatusCode::UNAUTHORIZED, "Your Lunar session is invalid or expired."))?;

    let _expires_at = token.claims.exp;
    if token.claims.sub.trim().is_empty() {
        return Err(ApiError::new(StatusCode::UNAUTHORIZED, "Your Lunar session has no user identity."));
    }

    Ok(token.claims.sub)
}

async fn ensure_profile(pool: &SqlitePool, user_id: &str) -> Result<(), sqlx::Error> {
    sqlx::query(
        "INSERT OR IGNORE INTO dungeon_profiles (user_id, highest_unlocked, completed_level, infinity_depth) VALUES (?, 1, 0, 0)",
    )
    .bind(user_id)
    .execute(pool)
    .await?;
    Ok(())
}

async fn load_progress(pool: &SqlitePool, user_id: &str) -> ApiResult<ProgressView> {
    let row = sqlx::query_as::<_, ProfileRow>(
        "SELECT highest_unlocked, completed_level, infinity_depth FROM dungeon_profiles WHERE user_id = ?",
    )
    .bind(user_id)
    .fetch_one(pool)
    .await?;

    Ok(ProgressView {
        highest_unlocked_level: row.highest_unlocked,
        completed_level: row.completed_level,
        infinity_unlocked: row.completed_level >= STANDARD_STAGE_LIMIT,
        infinity_depth: row.infinity_depth,
    })
}

async fn find_active_attempt(pool: &SqlitePool, user_id: &str) -> ApiResult<Option<AttemptRow>> {
    sqlx::query_as::<_, AttemptRow>(
        "SELECT attempt_id, mode, stage, depth, seed, player_hp, enemy_hp, enemy_hp_max, enemy_power, turn, guarding, pulse_cooldown, status, enemy_name, is_boss, last_player_text, last_enemy_text FROM dungeon_attempts WHERE user_id = ? AND status = 'active' ORDER BY created_at DESC LIMIT 1",
    )
    .bind(user_id)
    .fetch_optional(pool)
    .await
    .map_err(ApiError::from)
}

fn battle_view(row: AttemptRow) -> BattleView {
    let last_turn = row.last_player_text.map(|player| TurnLog {
        player,
        enemy: row.last_enemy_text,
    });

    BattleView {
        attempt_id: row.attempt_id,
        mode: row.mode,
        stage: row.stage,
        depth: row.depth,
        turn: row.turn,
        player: HealthView { hp: row.player_hp, max_hp: PLAYER_MAX_HP },
        enemy: EnemyView {
            name: row.enemy_name,
            hp: row.enemy_hp.max(0),
            max_hp: row.enemy_hp_max,
            boss: row.is_boss != 0,
            phase: boss_phase(row.is_boss, row.enemy_hp, row.enemy_hp_max),
            telegraph: boss_telegraph(row.is_boss, row.turn),
            modifier: infinity_modifier(&row.mode, row.depth).map(str::to_string),
        },
        status: row.status,
        pulse_cooldown: row.pulse_cooldown,
        last_turn,
    }
}

fn enemy_profile(mode: &str, stage: i64, depth: i64) -> (String, bool, i64, i64) {
    let scale = if mode == "infinity" { 800_i64.saturating_add(depth.saturating_mul(4)) } else { stage };
    let tier = ((scale - 1) / 160).clamp(0, 4) as usize;
    let boss = if mode == "infinity" { depth % 10 == 0 } else { stage % 20 == 0 };
    let names = [
        ["Mossling", "Thorn Sprite", "Rootbound Keeper"],
        ["Cinder Wisp", "Ash Hound", "Coalbound Sentinel"],
        ["Frost Mote", "Glacier Warden", "Snowveil Shade"],
        ["Rune Echo", "Starforged Construct", "Astral Drake"],
        ["Voidling", "Eclipse Shade", "Null Colossus"],
    ];
    let bosses = [
        "The Verdant Colossus",
        "The Ember Sovereign",
        "The Hollow Monarch",
        "The Astral Warden",
        "The Quiet King",
    ];
    let name = if boss {
        bosses[tier].to_string()
    } else {
        names[tier][(stage.saturating_add(depth).unsigned_abs() as usize) % 3].to_string()
    };
    let (modifier_hp, modifier_power) = infinity_modifier_bonus(mode, depth);
    let hp = 60 + scale / 4 + (tier as i64 * 10) + if boss { 75 } else { 0 } + modifier_hp;
    let power = 6 + (tier as i64 * 2) + scale / 250 + if boss { 4 } else { 0 } + modifier_power;
    (name, boss, hp, power)
}

fn boss_phase(is_boss: i64, enemy_hp: i64, enemy_hp_max: i64) -> Option<String> {
    if is_boss == 0 {
        None
    } else if enemy_hp.saturating_mul(2) <= enemy_hp_max {
        Some("awakened".to_string())
    } else {
        Some("sealed".to_string())
    }
}

fn boss_telegraph(is_boss: i64, turn: i64) -> bool {
    is_boss != 0 && turn.saturating_add(1) % 4 == 0
}

fn infinity_modifier(mode: &str, depth: i64) -> Option<&'static str> {
    if mode != "infinity" {
        return None;
    }

    Some(match depth.saturating_sub(1).rem_euclid(5) {
        0 => "Echoing Halls",
        1 => "Hollow Tide",
        2 => "Falling Ash",
        3 => "Fractured Gravity",
        _ => "Withered Light",
    })
}

fn infinity_modifier_bonus(mode: &str, depth: i64) -> (i64, i64) {
    if mode != "infinity" {
        return (0, 0);
    }

    match depth.saturating_sub(1).rem_euclid(5) {
        0 => (18, 0),
        1 => (0, 3),
        2 => (8, 2),
        3 => (26, 0),
        _ => (0, 4),
    }
}

fn focus_recovery(current_hp: i64) -> i64 {
    (PLAYER_MAX_HP - current_hp).clamp(0, 24)
}

fn seed_from_uuid(id: &Uuid) -> i64 {
    let mut bytes = [0_u8; 8];
    bytes.copy_from_slice(&id.as_bytes()[..8]);
    let seed = i64::from_le_bytes(bytes) & i64::MAX;
    if seed == 0 { 0x5eed } else { seed }
}

fn next_roll(seed: &mut i64, max: i64) -> i64 {
    let mut value = *seed as u64;
    value ^= value << 13;
    value ^= value >> 7;
    value ^= value << 17;
    *seed = (value & i64::MAX as u64) as i64;
    (*seed % max.max(1)).abs()
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse { ok: true })
}

async fn get_state(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
) -> ApiResult<Json<StateResponse>> {
    let user_id = authenticate(&headers, &state)?;
    ensure_profile(&state.pool, &user_id).await?;
    let progress = load_progress(&state.pool, &user_id).await?;
    let active_attempt = find_active_attempt(&state.pool, &user_id).await?.map(battle_view);
    Ok(Json(StateResponse { progress, active_attempt }))
}

async fn start_attempt(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(body): Json<StartRequest>,
) -> ApiResult<Json<StartResponse>> {
    let user_id = authenticate(&headers, &state)?;
    ensure_profile(&state.pool, &user_id).await?;

    if let Some(active) = find_active_attempt(&state.pool, &user_id).await? {
        let progress = load_progress(&state.pool, &user_id).await?;
        return Ok(Json(StartResponse { progress, battle: battle_view(active) }));
    }

    let progress_row = sqlx::query_as::<_, ProfileRow>(
        "SELECT highest_unlocked, completed_level, infinity_depth FROM dungeon_profiles WHERE user_id = ?",
    )
    .bind(&user_id)
    .fetch_one(&state.pool)
    .await?;

    let (mode, stage, depth) = match body.mode.as_str() {
        "standard" => {
            let stage = body.level.unwrap_or(progress_row.highest_unlocked);
            if !(1..=STANDARD_STAGE_LIMIT).contains(&stage) {
                return Err(ApiError::new(StatusCode::BAD_REQUEST, "Choose a stage between 1 and 800."));
            }
            if stage > progress_row.highest_unlocked {
                return Err(ApiError::new(StatusCode::FORBIDDEN, "That stage is still sealed. Clear the previous stage first."));
            }
            ("standard", stage, 0)
        }
        "infinity" => {
            if progress_row.completed_level < STANDARD_STAGE_LIMIT {
                return Err(ApiError::new(StatusCode::FORBIDDEN, "Clear stage 800 to unlock Infinity."));
            }
            ("infinity", STANDARD_STAGE_LIMIT + 1, progress_row.infinity_depth.saturating_add(1))
        }
        _ => return Err(ApiError::new(StatusCode::BAD_REQUEST, "Unknown dungeon mode.")),
    };

    let (enemy_name, is_boss, enemy_hp_max, enemy_power) = enemy_profile(mode, stage, depth);
    let attempt_id = Uuid::new_v4();
    let attempt_id_text = attempt_id.to_string();
    let seed = seed_from_uuid(&attempt_id);

    sqlx::query(
        "INSERT INTO dungeon_attempts (attempt_id, user_id, mode, stage, depth, seed, player_hp, enemy_hp, enemy_hp_max, enemy_power, turn, guarding, pulse_cooldown, status, enemy_name, is_boss, last_player_text, last_enemy_text, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 'active', ?, ?, NULL, NULL, unixepoch())",
    )
    .bind(&attempt_id_text)
    .bind(&user_id)
    .bind(mode)
    .bind(stage)
    .bind(depth)
    .bind(seed)
    .bind(PLAYER_MAX_HP)
    .bind(enemy_hp_max)
    .bind(enemy_hp_max)
    .bind(enemy_power)
    .bind(&enemy_name)
    .bind(if is_boss { 1_i64 } else { 0_i64 })
    .execute(&state.pool)
    .await?;

    let row = sqlx::query_as::<_, AttemptRow>(
        "SELECT attempt_id, mode, stage, depth, seed, player_hp, enemy_hp, enemy_hp_max, enemy_power, turn, guarding, pulse_cooldown, status, enemy_name, is_boss, last_player_text, last_enemy_text FROM dungeon_attempts WHERE attempt_id = ?",
    )
    .bind(&attempt_id_text)
    .fetch_one(&state.pool)
    .await?;

    let progress = load_progress(&state.pool, &user_id).await?;
    Ok(Json(StartResponse { progress, battle: battle_view(row) }))
}

async fn take_turn(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Path(attempt_id): Path<String>,
    Json(body): Json<ActionRequest>,
) -> ApiResult<Json<TurnResponse>> {
    let user_id = authenticate(&headers, &state)?;
    if !matches!(body.action.as_str(), "strike" | "guard" | "pulse" | "focus") {
        return Err(ApiError::new(StatusCode::BAD_REQUEST, "Choose a valid dungeon action."));
    }

    let mut tx = state.pool.begin().await?;
    let row = sqlx::query_as::<_, AttemptRow>(
        "SELECT attempt_id, mode, stage, depth, seed, player_hp, enemy_hp, enemy_hp_max, enemy_power, turn, guarding, pulse_cooldown, status, enemy_name, is_boss, last_player_text, last_enemy_text FROM dungeon_attempts WHERE attempt_id = ? AND user_id = ?",
    )
    .bind(&attempt_id)
    .bind(&user_id)
    .fetch_optional(&mut *tx)
    .await?
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "That dungeon attempt could not be found."))?;

    if row.status != "active" {
        return Err(ApiError::new(StatusCode::CONFLICT, "This encounter has already ended."));
    }
    if body.action == "pulse" && row.pulse_cooldown > 0 {
        return Err(ApiError::new(StatusCode::CONFLICT, "Star Pulse is still recharging."));
    }

    let scale = if row.mode == "infinity" { 800_i64.saturating_add(row.depth.saturating_mul(4)) } else { row.stage };
    let base_damage = 24 + (scale / 36) * 2;
    let mut seed = row.seed;
    let random_bonus = next_roll(&mut seed, 8);
    let mut enemy_hp = row.enemy_hp;
    let mut player_hp = row.player_hp;
    let mut guarding = row.guarding != 0;
    let mut pulse_cooldown = row.pulse_cooldown;
    let turn = row.turn.saturating_add(1);

    let (damage, player_text) = match body.action.as_str() {
        "strike" => {
            let damage = base_damage + random_bonus;
            (damage, format!("Arc Strike deals {damage} vitality damage."))
        }
        "guard" => {
            guarding = true;
            let damage = 7 + random_bonus / 3;
            (damage, "Moon Guard raises a ward and softens the next hit.".to_string())
        }
        "pulse" => {
            pulse_cooldown = 1;
            let damage = base_damage * 2 + random_bonus;
            (damage, format!("Star Pulse bursts for {damage} vitality damage."))
        }
        "focus" => {
            let recovered = focus_recovery(player_hp);
            player_hp += recovered;
            (0, format!("Lantern Focus restores {recovered} vitality."))
        }
        _ => unreachable!(),
    };

    enemy_hp = (enemy_hp - damage).max(0);
    let mut enemy_text = None;
    let mut status = "active".to_string();

    if enemy_hp == 0 {
        status = "won".to_string();
    } else {
        let heavy_turn = turn % 4 == 0;
        let awakened = row.is_boss != 0 && enemy_hp.saturating_mul(2) <= row.enemy_hp_max;
        let raw_damage = row.enemy_power
            + next_roll(&mut seed, 6)
            + if heavy_turn { 7 } else { 0 }
            + if awakened { 5 } else { 0 };
        let incoming = if guarding { (raw_damage + 2) / 3 } else { raw_damage };
        player_hp = (player_hp - incoming).max(0);
        enemy_text = Some(if guarding {
            format!("Your Moon Guard absorbs most of the wave. You lose {incoming} vitality.")
        } else if row.is_boss != 0 && heavy_turn && awakened {
            format!("{} unleashes an awakened strike for {incoming} vitality.", row.enemy_name)
        } else if row.is_boss != 0 && heavy_turn {
            format!("{} gathers a crushing blow for {incoming} vitality.", row.enemy_name)
        } else if heavy_turn {
            format!("A charged wave reaches you for {incoming} vitality.")
        } else {
            format!("The enemy's wave reaches you for {incoming} vitality.")
        });
        guarding = false;
        if body.action != "pulse" {
            pulse_cooldown = (pulse_cooldown - 1).max(0);
        }
        if player_hp == 0 {
            status = "lost".to_string();
        }
    }

    sqlx::query(
        "UPDATE dungeon_attempts SET seed = ?, player_hp = ?, enemy_hp = ?, turn = ?, guarding = ?, pulse_cooldown = ?, status = ?, last_player_text = ?, last_enemy_text = ? WHERE attempt_id = ? AND user_id = ? AND status = 'active'",
    )
    .bind(seed)
    .bind(player_hp)
    .bind(enemy_hp)
    .bind(turn)
    .bind(if guarding { 1_i64 } else { 0_i64 })
    .bind(pulse_cooldown)
    .bind(&status)
    .bind(&player_text)
    .bind(&enemy_text)
    .bind(&attempt_id)
    .bind(&user_id)
    .execute(&mut *tx)
    .await?;

    let victory = if status == "won" {
        if row.mode == "standard" {
            sqlx::query(
                "UPDATE dungeon_profiles SET completed_level = MAX(completed_level, ?), highest_unlocked = MAX(highest_unlocked, MIN(?, 800)) WHERE user_id = ?",
            )
            .bind(row.stage)
            .bind(row.stage + 1)
            .bind(&user_id)
            .execute(&mut *tx)
            .await?;
            Some(VictoryEvent {
                attempt_id: attempt_id.clone(),
                mode: row.mode.clone(),
                stage: row.stage,
                depth: 0,
                tier: Some(((row.stage - 1) / 160) + 1),
            })
        } else {
            sqlx::query("UPDATE dungeon_profiles SET infinity_depth = MAX(infinity_depth, ?) WHERE user_id = ?")
                .bind(row.depth)
                .bind(&user_id)
                .execute(&mut *tx)
                .await?;
            Some(VictoryEvent {
                attempt_id: attempt_id.clone(),
                mode: row.mode.clone(),
                stage: STANDARD_STAGE_LIMIT + 1,
                depth: row.depth,
                tier: None,
            })
        }
    } else {
        None
    };

    tx.commit().await?;

    let updated = sqlx::query_as::<_, AttemptRow>(
        "SELECT attempt_id, mode, stage, depth, seed, player_hp, enemy_hp, enemy_hp_max, enemy_power, turn, guarding, pulse_cooldown, status, enemy_name, is_boss, last_player_text, last_enemy_text FROM dungeon_attempts WHERE attempt_id = ? AND user_id = ?",
    )
    .bind(&attempt_id)
    .bind(&user_id)
    .fetch_one(&state.pool)
    .await?;
    let progress = load_progress(&state.pool, &user_id).await?;
    let defeated = status == "lost";

    Ok(Json(TurnResponse {
        progress,
        battle: battle_view(updated),
        victory,
        defeated,
    }))
}

async fn abandon_attempt(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Path(attempt_id): Path<String>,
) -> ApiResult<Json<OkResponse>> {
    let user_id = authenticate(&headers, &state)?;
    let result = sqlx::query(
        "UPDATE dungeon_attempts SET status = 'abandoned' WHERE attempt_id = ? AND user_id = ? AND status = 'active'",
    )
    .bind(attempt_id)
    .bind(user_id)
    .execute(&state.pool)
    .await?;

    if result.rows_affected() == 0 {
        return Err(ApiError::new(StatusCode::NOT_FOUND, "There is no active encounter to leave."));
    }
    Ok(Json(OkResponse { ok: true }))
}

async fn initialise_database(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS dungeon_profiles (user_id TEXT PRIMARY KEY, highest_unlocked INTEGER NOT NULL DEFAULT 1, completed_level INTEGER NOT NULL DEFAULT 0, infinity_depth INTEGER NOT NULL DEFAULT 0)",
    )
    .execute(pool)
    .await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS dungeon_attempts (attempt_id TEXT PRIMARY KEY, user_id TEXT NOT NULL, mode TEXT NOT NULL, stage INTEGER NOT NULL, depth INTEGER NOT NULL, seed INTEGER NOT NULL, player_hp INTEGER NOT NULL, enemy_hp INTEGER NOT NULL, enemy_hp_max INTEGER NOT NULL, enemy_power INTEGER NOT NULL, turn INTEGER NOT NULL DEFAULT 0, guarding INTEGER NOT NULL DEFAULT 0, pulse_cooldown INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL, enemy_name TEXT NOT NULL, is_boss INTEGER NOT NULL DEFAULT 0, last_player_text TEXT, last_enemy_text TEXT, created_at INTEGER NOT NULL)",
    )
    .execute(pool)
    .await?;

    sqlx::query("CREATE INDEX IF NOT EXISTS idx_dungeon_attempts_user_status ON dungeon_attempts (user_id, status, created_at DESC)")
        .execute(pool)
        .await?;

    sqlx::query("CREATE UNIQUE INDEX IF NOT EXISTS idx_one_active_dungeon_attempt ON dungeon_attempts (user_id) WHERE status = 'active'")
        .execute(pool)
        .await?;
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenvy::dotenv().ok();
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info")))
        .init();

    let database_url = env::var("DATABASE_URL").unwrap_or_else(|_| "sqlite://dungeons.db?mode=rwc".to_string());
    let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set to Lunar's JWT signing secret");
    let session_cookie = env::var("DUNGEON_SESSION_COOKIE").unwrap_or_else(|_| "lunar_session".to_string());
    let jwt_audience = env::var("JWT_AUDIENCE").ok().filter(|value| !value.trim().is_empty());
    if jwt_secret.len() < 32 {
        return Err("JWT_SECRET must be at least 32 characters".into());
    }

    let options = SqliteConnectOptions::from_str(&database_url)?
        .create_if_missing(true)
        .foreign_keys(true)
        .journal_mode(SqliteJournalMode::Wal);
    let pool = SqlitePoolOptions::new()
        .max_connections(10)
        .connect_with(options)
        .await?;
    initialise_database(&pool).await?;

    let state = Arc::new(AppState {
        pool,
        jwt_secret: Arc::new(jwt_secret),
        jwt_audience: jwt_audience.map(Arc::new),
        session_cookie: Arc::new(session_cookie),
    });

    let app = Router::new()
        .route("/health", get(health))
        .route("/api/dungeons/state", get(get_state))
        .route("/api/dungeons/attempts", post(start_attempt))
        .route("/api/dungeons/attempts/{attempt_id}/turn", post(take_turn))
        .route("/api/dungeons/attempts/{attempt_id}", delete(abandon_attempt))
        .with_state(state);

    let address: SocketAddr = env::var("BIND_ADDRESS")
        .unwrap_or_else(|_| "127.0.0.1:8080".to_string())
        .parse()?;
    let listener = tokio::net::TcpListener::bind(address).await?;
    tracing::info!(%address, "Lunar dungeon API listening");
    axum::serve(listener, app).await?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn tier_bosses_are_every_twentieth_standard_stage() {
        assert!(enemy_profile("standard", 20, 0).1);
        assert!(enemy_profile("standard", 800, 0).1);
        assert!(!enemy_profile("standard", 19, 0).1);
    }

    #[test]
    fn infinity_is_endless_and_has_periodic_bosses() {
        assert!(!enemy_profile("infinity", 801, 1).1);
        assert!(enemy_profile("infinity", 801, 10).1);
        assert!(enemy_profile("infinity", 801, 20).1);
    }

    #[test]
    fn bosses_awaken_below_half_health_and_telegraph_heavy_turns() {
        assert_eq!(boss_phase(1, 60, 100).as_deref(), Some("sealed"));
        assert_eq!(boss_phase(1, 50, 100).as_deref(), Some("awakened"));
        assert_eq!(boss_phase(0, 1, 100), None);
        assert!(boss_telegraph(1, 3));
        assert!(!boss_telegraph(1, 2));
        assert!(!boss_telegraph(0, 3));
    }

    #[test]
    fn infinity_affixes_cycle_and_focus_has_a_fixed_cap() {
        assert_eq!(infinity_modifier("infinity", 1), Some("Echoing Halls"));
        assert_eq!(infinity_modifier("infinity", 6), Some("Echoing Halls"));
        assert_eq!(infinity_modifier("standard", 1), None);
        assert_eq!(focus_recovery(150), 0);
        assert_eq!(focus_recovery(140), 10);
        assert_eq!(focus_recovery(80), 24);
    }

    #[test]
    fn random_roll_stays_inside_requested_range() {
        let mut seed = 123_456;
        for _ in 0..100 {
            let roll = next_roll(&mut seed, 8);
            assert!((0..8).contains(&roll));
        }
    }
}

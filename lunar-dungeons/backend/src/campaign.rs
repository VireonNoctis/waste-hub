use std::collections::BTreeMap;

use axum::{Json, Router, extract::State, http::HeaderMap, routing::{get, post}};
use serde::{Deserialize, Serialize};

use super::{ApiError, ApiResult, AppState, authenticate};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CampaignSettings {
    reduced_motion: bool,
    camera_shake: bool,
    high_contrast_telegraphs: bool,
    colorblind_telegraphs: bool,
    controls: BTreeMap<String, String>,
}

impl Default for CampaignSettings {
    fn default() -> Self {
        let controls = [
            ("left", "KeyA"), ("right", "KeyD"), ("jump", "Space"),
            ("attack", "KeyJ"), ("dash", "KeyK"), ("interact", "KeyE"),
            ("grapple", "KeyG"),
        ].into_iter().map(|(key, value)| (key.to_string(), value.to_string())).collect();
        Self {
            reduced_motion: false,
            camera_shake: true,
            high_contrast_telegraphs: true,
            colorblind_telegraphs: true,
            controls,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CampaignState {
    current_room: String,
    checkpoint_room: String,
    unlocked_abilities: Vec<String>,
    discovered_lore: Vec<String>,
    discovered_secrets: Vec<String>,
    bestiary: Vec<String>,
    completed_quests: Vec<String>,
    bosses_defeated: Vec<String>,
    quest_choices: BTreeMap<String, String>,
    companion_affinity: i64,
    ending: Option<String>,
    settings: CampaignSettings,
}

impl Default for CampaignState {
    fn default() -> Self {
        Self {
            current_room: "moonwake_observatory".to_string(),
            checkpoint_room: "moonwake_observatory".to_string(),
            unlocked_abilities: Vec::new(),
            discovered_lore: Vec::new(),
            discovered_secrets: Vec::new(),
            bestiary: Vec::new(),
            completed_quests: Vec::new(),
            bosses_defeated: Vec::new(),
            quest_choices: BTreeMap::new(),
            companion_affinity: 0,
            ending: None,
            settings: CampaignSettings::default(),
        }
    }
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CampaignResponse {
    campaign: CampaignState,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct CampaignEvent {
    action: String,
    room_id: Option<String>,
    key: Option<String>,
    value: Option<String>,
    settings: Option<CampaignSettings>,
}

fn allowed_rooms() -> &'static [&'static str] {
    &[
        "moonwake_observatory", "moonwake_underlight",
        "mosslight_bell_garden", "mosslight_root_archive", "mosslight_briar_well",
        "ember_cinder_market", "ember_slag_bridge", "ember_last_hearth",
        "frost_name_library", "frost_glass_causeway", "frost_hushed_throne",
        "astral_scriptorium", "astral_orbit_gallery", "astral_first_star",
        "quiet_hushwater", "quiet_echo_court", "quiet_moonheart",
    ]
}

fn connected_rooms(from: &str, to: &str) -> bool {
    const LINKS: &[(&str, &str)] = &[
        ("moonwake_observatory", "mosslight_bell_garden"),
        ("moonwake_observatory", "moonwake_underlight"),
        ("mosslight_bell_garden", "mosslight_root_archive"),
        ("mosslight_root_archive", "mosslight_briar_well"),
        ("mosslight_briar_well", "ember_cinder_market"),
        ("ember_cinder_market", "ember_slag_bridge"),
        ("ember_slag_bridge", "ember_last_hearth"),
        ("ember_last_hearth", "frost_name_library"),
        ("frost_name_library", "frost_glass_causeway"),
        ("frost_glass_causeway", "frost_hushed_throne"),
        ("frost_hushed_throne", "astral_scriptorium"),
        ("astral_scriptorium", "astral_orbit_gallery"),
        ("astral_orbit_gallery", "astral_first_star"),
        ("astral_first_star", "quiet_hushwater"),
        ("quiet_hushwater", "quiet_echo_court"),
        ("quiet_echo_court", "quiet_moonheart"),
    ];
    LINKS.iter().any(|(left, right)| (*left == from && *right == to) || (*left == to && *right == from))
}

fn region_is_open(room: &str, state: &CampaignState) -> bool {
    if room.starts_with("moonwake_") || room.starts_with("mosslight_") {
        return true;
    }
    if room.starts_with("ember_") {
        return state.bosses_defeated.iter().any(|boss| boss == "verdant_colossus");
    }
    if room.starts_with("frost_") {
        return state.bosses_defeated.iter().any(|boss| boss == "ember_sovereign");
    }
    if room.starts_with("astral_") {
        return state.bosses_defeated.iter().any(|boss| boss == "hollow_monarch");
    }
    if room.starts_with("quiet_") {
        return state.bosses_defeated.iter().any(|boss| boss == "astral_warden");
    }
    room == "moonwake_underlight" && state.discovered_secrets.len() >= 5
}

fn room_for_boss(boss: &str) -> Option<&'static str> {
    match boss {
        "verdant_colossus" => Some("mosslight_briar_well"),
        "ember_sovereign" => Some("ember_last_hearth"),
        "hollow_monarch" => Some("frost_hushed_throne"),
        "astral_warden" => Some("astral_first_star"),
        "orin_first_keeper" => Some("quiet_moonheart"),
        "eclipse_warden" => Some("moonwake_underlight"),
        _ => None,
    }
}

fn ability_for_boss(boss: &str) -> Option<&'static str> {
    match boss {
        "verdant_colossus" => Some("dash"),
        "ember_sovereign" => Some("wall-jump"),
        "hollow_monarch" => Some("double-jump"),
        "astral_warden" => Some("grapple"),
        _ => None,
    }
}

fn lore_is_in_room(key: &str, room: &str) -> bool {
    matches!(
        (key, room),
        ("lore_moonwake", "moonwake_observatory")
            | ("lore_bell", "mosslight_bell_garden")
            | ("lore_root_archive", "mosslight_root_archive")
            | ("lore_first_note", "mosslight_briar_well")
            | ("lore_cinder", "ember_cinder_market")
            | ("lore_slag", "ember_slag_bridge")
            | ("lore_second_note", "ember_last_hearth")
            | ("lore_names", "frost_name_library")
            | ("lore_glass", "frost_glass_causeway")
            | ("lore_third_note", "frost_hushed_throne")
            | ("lore_atlas", "astral_scriptorium")
            | ("lore_orbit", "astral_orbit_gallery")
            | ("lore_fourth_note", "astral_first_star")
            | ("lore_hushwater", "quiet_hushwater")
            | ("lore_echo", "quiet_echo_court")
            | ("lore_fifth_note", "quiet_moonheart")
            | ("lore_underlight", "moonwake_underlight")
    )
}

fn secret_is_in_room(key: &str, room: &str) -> bool {
    matches!(
        (key, room),
        ("secret_mosslight", "mosslight_root_archive")
            | ("secret_ember", "ember_slag_bridge")
            | ("secret_frost", "frost_glass_causeway")
            | ("secret_astral", "astral_orbit_gallery")
            | ("secret_quiet", "quiet_echo_court")
    )
}

fn bestiary_key_is_known(key: &str) -> bool {
    matches!(
        key,
        "mossling" | "thorn_sprite" | "verdant_colossus" | "cinder_wisp" | "ash_hound"
            | "ember_sovereign" | "frost_echo" | "glacier_warden" | "hollow_monarch"
            | "star_construct" | "astral_drake" | "astral_warden" | "quietling"
            | "eclipse_shade" | "orin_first_keeper" | "eclipse_warden"
    )
}

fn quest_choices(key: &str) -> Option<&'static [&'static str]> {
    match key {
        "the-unlit-lantern" => Some(&["Trust Iri with the lantern", "Keep the lantern close for now"]),
        "the-bell-kept-quiet" => Some(&["Let the roots finish their warning", "Carry the bell's note forward"]),
        "a-hearth-for-two" => Some(&["Keep the hearth for the unknown guest", "Give the ember back to the city"]),
        "the-name-without-ink" => Some(&["Speak Edda's name with her", "Let Edda choose when to remember"]),
        "the-blank-constellation" => Some(&["Leave the final star unmarked", "Draw a path for whoever comes next"]),
        "a-name-for-the-light" => Some(&["Tell Iri the name Auralis", "Ask Iri to choose her own name"]),
        _ => None,
    }
}

async fn ensure_campaign(pool: &sqlx::SqlitePool, user_id: &str) -> Result<CampaignState, sqlx::Error> {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS dungeon_campaign_state (user_id TEXT PRIMARY KEY, state_json TEXT NOT NULL, updated_at INTEGER NOT NULL)",
    )
    .execute(pool)
    .await?;

    let initial = serde_json::to_string(&CampaignState::default()).expect("campaign defaults serialize");
    sqlx::query("INSERT OR IGNORE INTO dungeon_campaign_state (user_id, state_json, updated_at) VALUES (?, ?, unixepoch())")
        .bind(user_id)
        .bind(initial)
        .execute(pool)
        .await?;

    let raw: (String,) = sqlx::query_as("SELECT state_json FROM dungeon_campaign_state WHERE user_id = ?")
        .bind(user_id)
        .fetch_one(pool)
        .await?;
    Ok(serde_json::from_str(&raw.0).unwrap_or_default())
}

async fn save_campaign(pool: &sqlx::SqlitePool, user_id: &str, campaign: &CampaignState) -> Result<(), sqlx::Error> {
    let serialized = serde_json::to_string(campaign).expect("campaign state serializes");
    sqlx::query("UPDATE dungeon_campaign_state SET state_json = ?, updated_at = unixepoch() WHERE user_id = ?")
        .bind(serialized)
        .bind(user_id)
        .execute(pool)
        .await?;
    Ok(())
}

async fn get_campaign(
    State(state): State<std::sync::Arc<AppState>>,
    headers: HeaderMap,
) -> ApiResult<Json<CampaignResponse>> {
    let user_id = authenticate(&headers, &state)?;
    let campaign = ensure_campaign(&state.pool, &user_id).await?;
    Ok(Json(CampaignResponse { campaign }))
}

async fn update_campaign(
    State(state): State<std::sync::Arc<AppState>>,
    headers: HeaderMap,
    Json(event): Json<CampaignEvent>,
) -> ApiResult<Json<CampaignResponse>> {
    let user_id = authenticate(&headers, &state)?;
    let mut campaign = ensure_campaign(&state.pool, &user_id).await?;

    match event.action.as_str() {
        "room" => {
            let room = event.room_id.as_deref().unwrap_or_default();
            if !allowed_rooms().contains(&room) || !connected_rooms(&campaign.current_room, room) {
                return Err(ApiError::new(axum::http::StatusCode::FORBIDDEN, "That room is not connected to your current route."));
            }
            if !region_is_open(room, &campaign) {
                return Err(ApiError::new(axum::http::StatusCode::FORBIDDEN, "That gate is still sealed. Complete the previous realm's warden first."));
            }
            campaign.current_room = room.to_string();
        }
        "checkpoint" => {
            let room = event.room_id.as_deref().unwrap_or_default();
            if room != campaign.current_room {
                return Err(ApiError::new(axum::http::StatusCode::FORBIDDEN, "You can only attune a shrine in the room you currently occupy."));
            }
            campaign.checkpoint_room = room.to_string();
        }
        "lore" => {
            let key = event.key.as_deref().unwrap_or_default();
            if !lore_is_in_room(key, &campaign.current_room) {
                return Err(ApiError::new(axum::http::StatusCode::FORBIDDEN, "That memory is not present in this room."));
            }
            if !campaign.discovered_lore.iter().any(|item| item == key) {
                campaign.discovered_lore.push(key.to_string());
            }
        }
        "secret" => {
            let key = event.key.as_deref().unwrap_or_default();
            if !secret_is_in_room(key, &campaign.current_room) {
                return Err(ApiError::new(axum::http::StatusCode::FORBIDDEN, "That hidden passage is not present in this room."));
            }
            if !campaign.discovered_secrets.iter().any(|item| item == key) {
                campaign.discovered_secrets.push(key.to_string());
            }
        }
        "bestiary" => {
            let key = event.key.as_deref().unwrap_or_default();
            if !bestiary_key_is_known(key) {
                return Err(ApiError::new(axum::http::StatusCode::BAD_REQUEST, "Unknown bestiary entry."));
            }
            if !campaign.bestiary.iter().any(|item| item == key) {
                campaign.bestiary.push(key.to_string());
            }
        }
        "quest" => {
            let key = event.key.as_deref().unwrap_or_default();
            let choice = event.value.as_deref().unwrap_or_default();
            let choices = quest_choices(key).ok_or_else(|| ApiError::new(axum::http::StatusCode::BAD_REQUEST, "Unknown companion quest."))?;
            if !choices.contains(&choice) {
                return Err(ApiError::new(axum::http::StatusCode::BAD_REQUEST, "That is not a valid choice for this conversation."));
            }
            let room_for_quest = match key {
                "the-unlit-lantern" => "moonwake_observatory",
                "the-bell-kept-quiet" => "mosslight_bell_garden",
                "a-hearth-for-two" => "ember_cinder_market",
                "the-name-without-ink" => "frost_name_library",
                "the-blank-constellation" => "astral_scriptorium",
                "a-name-for-the-light" => "quiet_hushwater",
                _ => unreachable!(),
            };
            if campaign.current_room != room_for_quest {
                return Err(ApiError::new(axum::http::StatusCode::FORBIDDEN, "Return to the companion's room to complete this conversation."));
            }
            let first_choice = choices.first().copied() == Some(choice);
            campaign.quest_choices.insert(key.to_string(), choice.to_string());
            if !campaign.completed_quests.iter().any(|item| item == key) {
                campaign.completed_quests.push(key.to_string());
                campaign.companion_affinity = (campaign.companion_affinity + if first_choice { 1 } else { 0 }).clamp(-5, 10);
            }
        }
        "boss" => {
            let boss = event.key.as_deref().unwrap_or_default();
            let boss_room = room_for_boss(boss).ok_or_else(|| ApiError::new(axum::http::StatusCode::BAD_REQUEST, "Unknown warden."))?;
            if campaign.current_room != boss_room {
                return Err(ApiError::new(axum::http::StatusCode::FORBIDDEN, "The warden is not in your current room."));
            }
            if !campaign.bosses_defeated.iter().any(|item| item == boss) {
                campaign.bosses_defeated.push(boss.to_string());
            }
            if let Some(ability) = ability_for_boss(boss) {
                if !campaign.unlocked_abilities.iter().any(|item| item == ability) {
                    campaign.unlocked_abilities.push(ability.to_string());
                }
            }
        }
        "ending" => {
            let ending = event.value.as_deref().unwrap_or_default();
            if !campaign.bosses_defeated.iter().any(|boss| boss == "orin_first_keeper")
                || !matches!(ending, "shared-light" | "quiet-keeper" | "open-sky")
            {
                return Err(ApiError::new(axum::http::StatusCode::FORBIDDEN, "The final choice is not ready."));
            }
            campaign.ending = Some(ending.to_string());
        }
        "settings" => {
            let settings = event.settings.ok_or_else(|| ApiError::new(axum::http::StatusCode::BAD_REQUEST, "Missing accessibility settings."))?;
            let required = ["left", "right", "jump", "attack", "dash", "interact", "grapple"];
            if required.iter().any(|key| settings.controls.get(*key).is_none_or(|value| value.is_empty() || value.len() > 32)) {
                return Err(ApiError::new(axum::http::StatusCode::BAD_REQUEST, "Every action needs a valid key binding."));
            }
            campaign.settings = settings;
        }
        _ => return Err(ApiError::new(axum::http::StatusCode::BAD_REQUEST, "Unknown campaign event.")),
    }

    save_campaign(&state.pool, &user_id, &campaign).await?;
    Ok(Json(CampaignResponse { campaign }))
}

pub fn routes() -> Router<std::sync::Arc<AppState>> {
    Router::new()
        .route("/api/dungeons/campaign", get(get_campaign))
        .route("/api/dungeons/campaign/event", post(update_campaign))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn campaign_regions_require_the_previous_warden() {
        let mut state = CampaignState::default();
        assert!(!region_is_open("ember_cinder_market", &state));
        state.bosses_defeated.push("verdant_colossus".to_string());
        assert!(region_is_open("ember_cinder_market", &state));
        assert!(!region_is_open("frost_name_library", &state));
    }

    #[test]
    fn secret_room_requires_all_five_hidden_fragments() {
        let mut state = CampaignState::default();
        for secret in ["secret_mosslight", "secret_ember", "secret_frost", "secret_astral"] {
            state.discovered_secrets.push(secret.to_string());
        }
        assert!(!region_is_open("moonwake_underlight", &state));
        state.discovered_secrets.push("secret_quiet".to_string());
        assert!(region_is_open("moonwake_underlight", &state));
    }

    #[test]
    fn room_transitions_are_connected_and_bidirectional() {
        assert!(connected_rooms("moonwake_observatory", "mosslight_bell_garden"));
        assert!(connected_rooms("mosslight_bell_garden", "moonwake_observatory"));
        assert!(!connected_rooms("moonwake_observatory", "quiet_moonheart"));
    }
}

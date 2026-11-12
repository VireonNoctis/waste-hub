use axum::{
    Json, Router,
    extract::DefaultBodyLimit,
    http::StatusCode,
    routing::post,
};
use serde::Serialize;

use crate::account_linkage::{ScoreRequest, ScoreResponse, score_pair};

#[derive(Serialize)]
struct ApiError {
    error: String,
}

pub fn router() -> Router {
    Router::new()
        .route("/api/account-linkage/score", post(score))
        .layer(DefaultBodyLimit::max(256 * 1024))
}

async fn score(
    Json(payload): Json<ScoreRequest>,
) -> Result<Json<ScoreResponse>, (StatusCode, Json<ApiError>)> {
    score_pair(payload)
        .map(Json)
        .map_err(|message| {
            (
                StatusCode::UNPROCESSABLE_ENTITY,
                Json(ApiError { error: message }),
            )
        })
}
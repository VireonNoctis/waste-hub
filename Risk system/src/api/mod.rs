pub mod account_linkage;

use axum::Router;

pub fn router() -> Router {
    Router::new().merge(account_linkage::router())
}
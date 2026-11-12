mod account_linkage;
mod api;

#[tokio::main]
async fn main() {
    let app = api::router();
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8787")
        .await
        .expect("failed to bind LunarX account-linkage API");

    println!("LunarX account-linkage API listening on 0.0.0.0:8787");
    axum::serve(listener, app)
        .await
        .expect("LunarX account-linkage API stopped unexpectedly");
}
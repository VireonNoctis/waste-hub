# Lunar — Explore Dungeons

Source code for Lunar's pixel-style dungeon exploration feature.

## Source

- Feature setup and integration: [lunar-dungeons/README.md](./lunar-dungeons/README.md)
- Rust backend: [lunar-dungeons/backend](./lunar-dungeons/backend/)
- Next.js page and API proxy: [lunar-dungeons/frontend/app](./lunar-dungeons/frontend/app/)
- Three.js scene and explorer: [lunar-dungeons/frontend/components/dungeons](./lunar-dungeons/frontend/components/dungeons/)
- Frontend API and contracts: [lunar-dungeons/frontend/lib/dungeons](./lunar-dungeons/frontend/lib/dungeons/)

## Feature scope

- Five tiers, 16 sectors per tier, and 10 chambers per sector: 800 standard stages.
- Boss encounters and Infinity progression after stage 800.
- Next.js App Router frontend with a Three.js pixel-style dungeon world.
- Rust/Axum/SQLx backend for authenticated progression and server-validated combat.
- Rewards are intentionally left to the separate rewards integration.

See lunar-dungeons/README.md for setup, configuration, authentication assumptions, API routes, and verification commands.

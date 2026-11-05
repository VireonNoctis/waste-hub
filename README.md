# Lunar — Explore Dungeons

Expanded Next.js, Three.js, and Rust dungeon feature bundle for Lunar.

The complete feature source is included in **[lunar-dungeons-expanded.zip](./lunar-dungeons-expanded.zip)**. Unpack the archive to get the `lunar-dungeons/` directory, then follow `lunar-dungeons/README.md` for setup and integration.

## What's included
- Five themed tiers, 16 named sectors per tier, and 10 chambers per sector (800 stages).
- Expanded pixel-style Three.js atlas with winding chambers, corridors, room architecture, rune details, and ruined annex scenery.
- Boss encounter every 20 standard stages.
- Endless Infinity mode after stage 800.
- Next.js App Router UI and API proxy.
- Rust/Axum/SQLx backend with authenticated, server-owned progression and turn resolution.
- No rewards implementation; victory callback remains the integration boundary for the separate rewards developer.

The archive's README includes configuration, authentication assumptions, API routes, and verification commands.

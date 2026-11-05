# Lunar — Explore Dungeons

A self-contained Next.js + Three.js + Rust dungeon feature bundle with an expanded 80-sector pixel atlas. It is designed to be dropped into the Lunar App Router project without changing the supplied player or community-guidelines pages.

## Massive dungeon atlas

- Five fantasy tiers, each containing 16 named sectors and 10 chambers per sector: 80 sectors and 800 standard stages in total.
- Each tier has its own named route through 16 distinct chapters, with a sector navigator and per-sector completion meters.
- Every 20th standard stage is a boss room, placed at the end of every second sector.
- The Three.js atlas uses a wider, winding chamber route, tiled stone floors, room walls, corridor stones, rune details, torches, and ruined annex architecture. The annexes are atmospheric scenery, not extra reward rooms or unlockable stages.
- Clearing stage 800 unlocks Infinity. Each Infinity victory advances the player's saved depth; every tenth depth is a boss encounter.
- Players choose one of three server-validated actions per turn: Arc Strike, Moon Guard, or Star Pulse.
- The Rust API owns stage unlocks, battle health, enemy health, turn resolution, boss selection, and completion state. The browser only displays the result.
- There is no reward/currency implementation. A server-confirmed victory is exposed through `DungeonExplorer`'s `onVictory` callback for the separate rewards integration.

## 1. Add the frontend

Copy the contents of `frontend/` into the matching location in the Lunar project. If the repository uses `src/app`, put `frontend/app/` under `src/app/`. Keep the `components/` and `lib/` aliases consistent with Lunar's existing `@/` alias.

Install the 3D dependencies in the Lunar project:

```bash
npm install three @react-three/fiber @types/three
```

The component also uses `lucide-react`, which is already present in the supplied Lunar code (`lunar-player.tsx`). The feature targets Next.js 16.4.5 (the latest stable release checked on November 5, 2026), React 19, and `@react-three/fiber` 9.8.2. The code uses the React 19-compatible Fiber 9 line. The feature does not replace the root layout or the existing package manifest; keep React aligned with the selected Next.js release.

Add this to the Next.js environment:

```env
DUNGEON_API_URL=http://127.0.0.1:8080
```

The feature route is `/dungeons`. The same-origin Next.js route handler at `/api/dungeons/*` forwards requests and the incoming `Authorization` and `Cookie` headers to the Rust API.

## 2. Run the Rust API

The backend is in `backend/` and pins Rust 1.99.1 (2024 edition), with Axum 0.8.9, SQLx 0.9.0, and SQLite. The SQLite database and tables are created automatically on first boot.

```bash
cd backend
cp .env.example .env
# Set JWT_SECRET to the same HS256 signing secret used by Lunar's auth service.
cargo run --release
```

The API defaults to `127.0.0.1:8080`; `/health` is a health check. In production, run the API on a private network and proxy it through the Next.js server rather than exposing the database service directly.

### Authentication contract

The API does not trust a client-supplied user ID. It identifies the player from a signed HS256 JWT's `sub` claim and checks the token expiry. The token may be sent as `Authorization: Bearer <jwt>` or stored in a cookie. The cookie name defaults to `lunar_session`; set `DUNGEON_SESSION_COOKIE` to Lunar's actual JWT cookie name. If Lunar tokens include an `aud` claim, set `JWT_AUDIENCE` to the expected value so it is checked as well.

This adapter assumes Lunar's session token is an HS256 JWT with `sub` and `exp`. The provided files do not include Lunar's authentication implementation, so confirm the algorithm, claim names, and cookie name before deployment. If Lunar uses a different signing algorithm or an opaque session cookie, replace `authenticate()` with a server-side call to Lunar's existing session verifier. Do not substitute a user ID header or trust a user ID sent by the browser.

## 3. Rewards integration boundary

The React component accepts:

```tsx
<DungeonExplorer onVictory={(event) => {
  // Hand the event to the separate reward integration.
  // event.attemptId is stable for de-duplication.
}} />
```

`event` contains `attemptId`, `mode`, `stage`, `depth`, and `tier`. The callback runs only after the Rust API returns a confirmed win. The reward service should de-duplicate by `attemptId` so a retry or repeated delivery cannot grant twice. No coins, items, points, or reward balances are created by this feature.

## 4. API contract

All gameplay routes are authenticated and user-scoped:

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/dungeons/state` | Load progress and any active attempt |
| `POST` | `/api/dungeons/attempts` | Start/reopen a standard stage or Infinity run |
| `POST` | `/api/dungeons/attempts/:id/turn` | Submit `strike`, `guard`, or `pulse` |
| `DELETE` | `/api/dungeons/attempts/:id` | Abandon an active attempt |

Standard start body: `{"mode":"standard","level":1}`. Infinity start body: `{"mode":"infinity"}`. Turn body: `{"action":"strike"}`. The API refuses locked stages and refuses Infinity until stage 800 is completed.

## 5. Checks

Run these from the Lunar frontend after installing the dependencies:

```bash
npm run lint
npm run build
```

Run these in `backend/`:

```bash
cargo fmt --check
cargo test
cargo clippy -- -D warnings
```

The container used to assemble this bundle did not include the Rust toolchain or Lunar's full repository/dependencies, so the Rust binary and an integrated Next.js build could not be run here. Run the checks above in the project environment before deploying.

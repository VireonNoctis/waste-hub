# Lunar — Explore Dungeons

A self-contained Next.js + Three.js + Rust dungeon feature bundle for Lunar: a real-time side-scrolling campaign set in Moonwake, plus the original 800-stage atlas and Infinity descent. It is designed to be dropped into the Lunar App Router project without changing the supplied player or community-guidelines pages.

## Massive dungeon atlas

- Five fantasy tiers, each containing 16 named sectors and 10 chambers per sector: 80 sectors and 800 standard stages in total.
- Each tier has its own named route through 16 distinct chapters, with a sector navigator and per-sector completion meters.
- Every 20th standard stage is a boss room, placed at the end of every second sector.
- The Three.js atlas uses a wider, winding chamber route, tiled stone floors, room walls, corridor stones, rune details, torches, and ruined annex architecture. The annexes are atmospheric scenery, not extra reward rooms or unlockable stages.
- Clearing stage 800 unlocks Infinity. Each Infinity victory advances the player's saved depth; every tenth depth is a boss encounter.
- Players choose from four server-validated actions: Arc Strike, Moon Guard, Star Pulse, and Lantern Focus (a limited-turn heal).
- The original five-act story now follows the Moonwake Testament: the Lumen, the Quiet, Orin the First Keeper, Iri/Auralis, and the five lunar notes.
- The real-time campaign has a connected 17-room world: Moonwake Observatory, five linked kingdoms, and the hidden Underlight room. A separate side-scrolling player controller supports jumping, dash, wall-jump, double-jump, grapple, melee attacks, and camera-follow.
- Four movement arts unlock from four realm wardens. Later gates require the relevant art; the Underlight requires five hidden fragments.
- NPC companion quests record choices and companion trust. Lore tablets, secrets, a bestiary, shrine checkpoints, a hidden boss, and three alternate endings are included.
- Accessibility settings include remappable keyboard controls, touch controls, reduced motion, camera-shake control, high-contrast tells, and shape-coded telegraphs.
- Rust persists campaign progress and validates room adjacency, region gates, checkpoint/lore/secret/bestiary/quest events, boss encounter hits, ability unlocks, ending choices, and accessibility settings.
- The real-time physics and moment-to-moment non-boss combat simulation run in the browser for responsiveness. Rust validates campaign transitions and boss encounter progress; it does not simulate every frame of platform physics.
- Each realm has its own layered pixel-art environment; bosses telegraph charged attacks and awaken at half health.
- Infinity encounters cycle through five server-calculated environmental affixes that alter enemy strength.
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
| `POST` | `/api/dungeons/attempts/:id/turn` | Submit `strike`, `guard`, `pulse`, or `focus` |
| `GET` | `/api/dungeons/campaign` | Load Moonwake campaign, discoveries, checkpoints, quests, and settings |
| `POST` | `/api/dungeons/campaign/event` | Persist a validated room, shrine, lore, secret, bestiary, quest, boss-hit, ending, respawn, or settings event |
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


## Campaign expansion

The campaign is an original moonlit fantasy set in Moonwake: a silver observatory city built around the Lumen, a light that remembers every name. When the Quiet begins erasing memory, Orin the First Keeper divides the Lumen into five lunar notes and hides them across five kingdoms. The Wayfarer wakes beneath the observatory with a lantern that has no flame. Iri, a moth archivist whose forgotten name is Auralis, leads the journey. Each chapter reframes one of the wardens from enemy to guardian, until the final choice decides whether the light belongs to one keeper, a few companions, or everyone.

The atlas combat retains Lantern Focus, server-derived boss phases, and Infinity affixes. The new Moonwake campaign is an additional real-time 2.5D platforming mode; its player physics and moment-to-moment non-boss enemy simulation run client-side, while campaign progress and boss health hits are recorded and validated by Rust. Boss rooms telegraph distinct attack lanes and change patterns at half health.


## 6. Real-time Moonwake campaign

The dungeons page now opens with a side-scrolling Moonwake world. Move with the current key bindings (A/D by default), jump with Space, strike with J, interact with E, and use K/G after those movement arts unlock. Touch devices receive an on-screen control row. Room entrances are connected; the backend refuses jumps to non-adjacent or still-sealed regions.

The route is:

- Moonwake Observatory → Mosslight Wilds → Ember Hollow → Frostglass Vale → Astral Archive → Quiet Beyond.
- Defeating the first four wardens unlocks dash, wall-jump, double-jump, and grapple in that order.
- Five secret fragments open the Underlight beneath the observatory, where the Unwritten Warden waits.
- Shrine attunement saves a return room. Death returns the player to the last shrine.
- Six companion conversations track choices and trust. Lore tablets and creature encounters fill the Chronicle and Bestiary.
- Defeating Orin opens three final choices: Shared Light, Quiet Keeper, or Open Sky.

The real-time platform physics and ordinary enemy encounters are client-simulated for responsive controls. Rust persists the campaign and validates connected room changes, realm gates, lore/secret/bestiary locations, quest choices, shrines, and boss encounter hits. The server does not run a frame-by-frame physics simulation. The original 800-stage atlas remains beneath the new campaign, with its existing onVictory reward handoff untouched.

## 7. Fullscreen launch, platforming polish, and expanded chronicle

The Moonwake side-scroller now begins behind an explicit **Enter the Moonwake** launch screen. Starting the game requests fullscreen from that user gesture (browsers require a direct interaction); if fullscreen is unsupported or blocked, the campaign remains playable in the normal page. The in-game expand control enters or exits fullscreen, and Escape pauses the adventure.

Platforming input includes a short coyote-time window after leaving a ledge and a buffered jump so a slightly early jump press is not discarded. The grapple art now selects the nearest elevated platform within range and has a short cooldown instead of applying an arbitrary vertical boost. Remapped key labels are reflected in the on-screen instructions, and touch input is released safely on pointer cancellation.

Respawning now recreates the room scene as well as restoring the saved shrine location. This resets local enemy and movement state, preventing a defeated local enemy from remaining hidden after the player returns to a checkpoint.

The in-game Chronicle now contains an expanded story bible:
- The full five-act journey through Mosslight, Ember Hollow, Frostglass Vale, Astral Archive, and the Quiet Beyond.
- Deeper explanations of the Lumen, the five notes, the Quiet, and the sixth note: the margin.
- Character histories and arcs for Iri/Auralis, Vey, Edda, Nym, Orin, and the Wayfarer.
- The five secret memories and what each reveals about the world.
- Expanded descriptions of all three endings, with the selected ending and companion bond reflected in the Chronicle.

Recovered lore now opens as an in-world memory panel and pauses the simulation while it is read; companion dialogue has also been expanded so character arcs are encountered during exploration. The story bible is implemented in `frontend/components/dungeons/moonwake-chronicle.tsx` and rendered inside the live-world Chronicle. The campaign's server-owned save format and event contract remain unchanged by this frontend/story expansion. The platform physics and ordinary enemy movement are still client-simulated; room transitions, checkpoints, discoveries, quests, boss health, unlocked movement arts, and ending choices continue to be persisted and validated by the Rust API.

## 8. Complete Moonwake Testament

The canonical five-act story and its companion, creature, and afterstory folios are part of the Next.js application at `frontend/lib/dungeons/moonwake-story.ts`. The manuscript is represented as typed story blocks (headings, paragraphs, quotations, lists, and dividers), rather than runtime-loaded Markdown files.

The in-app reader lives at **/dungeons/story** and includes click-to-select volume navigation, previous/next controls, live reading progress, a focus-reading layout, keyboard-accessible controls, responsive layouts, and restrained moonlit transitions. Motion follows the user's reduced-motion preference. The reader links back to the live campaign and the 800-stage atlas.

The dungeon landing page now has one connected navigation rail for the live campaign, 800-stage atlas, and complete story archive. The Chronicle also links directly to the full Testament. The seven volumes preserve the complete **4,972-line** manuscript:
- The Lumen's origin, five notes, the Quiet, the Keepers, and the Wayfarer's arrival.
- Five full acts following the established playable route and its guardians.
- Expanded histories and arcs for Iri/Auralis, Vey, Edda, Nym, Orin, and the Wayfarer.
- Companion threads, hidden marks, the Underlight, the Unwritten Warden, bestiary folios, side stories, and all three endings.

The reader no longer uses server filesystem reads, and the original Markdown assets are removed from `public/moonwake/`. The campaign save schema, Rust API, and gameplay contracts are unchanged.

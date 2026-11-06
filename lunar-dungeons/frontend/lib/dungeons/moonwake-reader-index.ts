import { MOONWAKE_VOLUMES, type MoonwakeVolume } from "./moonwake-story"
import {
  MOONWAKE_MAP_VOLUMES,
  MOONWAKE_MILESTONE_STORIES,
} from "./moonwake-map-stories"
import { MOONWAKE_EXPANDED_VOLUMES_A } from "./moonwake-expanded-a"
import { MOONWAKE_EXPANDED_VOLUMES_B } from "./moonwake-expanded-b"
import { MOONWAKE_EXPANDED_VOLUMES_C } from "./moonwake-expanded-c"
import { MOONWAKE_EXPANDED_VOLUMES_D } from "./moonwake-expanded-d"
import { MOONWAKE_EXPANDED_VOLUMES_E } from "./moonwake-expanded-e"
import { MOONWAKE_EXPANDED_VOLUMES_F } from "./moonwake-expanded-f"
import { MOONWAKE_EXPANDED_VOLUMES_G } from "./moonwake-expanded-g"

export const MOONWAKE_READER_VOLUMES: MoonwakeVolume[] = [
  MOONWAKE_VOLUMES[0],
  MOONWAKE_EXPANDED_VOLUMES_A[0],
  MOONWAKE_EXPANDED_VOLUMES_B[0],
  MOONWAKE_EXPANDED_VOLUMES_A[1],
  MOONWAKE_VOLUMES[1],
  MOONWAKE_EXPANDED_VOLUMES_A[2],
  MOONWAKE_EXPANDED_VOLUMES_B[3],
  MOONWAKE_MAP_VOLUMES[0],
  MOONWAKE_EXPANDED_VOLUMES_E[0],
  MOONWAKE_EXPANDED_VOLUMES_A[3],
  MOONWAKE_VOLUMES[2],
  MOONWAKE_EXPANDED_VOLUMES_C[0],
  MOONWAKE_EXPANDED_VOLUMES_B[1],
  MOONWAKE_MAP_VOLUMES[1],
  MOONWAKE_EXPANDED_VOLUMES_E[4],
  MOONWAKE_VOLUMES[3],
  MOONWAKE_EXPANDED_VOLUMES_C[1],
  MOONWAKE_MAP_VOLUMES[2],
  MOONWAKE_EXPANDED_VOLUMES_B[4],
  MOONWAKE_VOLUMES[4],
  MOONWAKE_EXPANDED_VOLUMES_C[2],
  MOONWAKE_EXPANDED_VOLUMES_B[2],
  MOONWAKE_MAP_VOLUMES[3],
  MOONWAKE_VOLUMES[5],
  MOONWAKE_EXPANDED_VOLUMES_D[0],
  MOONWAKE_MAP_VOLUMES[4],
  MOONWAKE_EXPANDED_VOLUMES_C[3],
  MOONWAKE_EXPANDED_VOLUMES_D[1],
  MOONWAKE_MAP_VOLUMES[5],
  MOONWAKE_EXPANDED_VOLUMES_E[1],
  MOONWAKE_EXPANDED_VOLUMES_E[2],
  MOONWAKE_EXPANDED_VOLUMES_F[0],
  MOONWAKE_EXPANDED_VOLUMES_E[3],
  MOONWAKE_EXPANDED_VOLUMES_F[1],
  MOONWAKE_VOLUMES[6],
  MOONWAKE_EXPANDED_VOLUMES_D[2],
  MOONWAKE_EXPANDED_VOLUMES_D[3],
  MOONWAKE_EXPANDED_VOLUMES_D[4],
  MOONWAKE_EXPANDED_VOLUMES_E[5],
  MOONWAKE_EXPANDED_VOLUMES_G[0],
]

export const MOONWAKE_PROSE_WORD_COUNT = MOONWAKE_READER_VOLUMES.reduce(
  (total, volume) => total + volume.blocks.reduce((volumeTotal, block) => {
    const runs = block.type === "divider" ? [] : block.type === "list" ? block.items.flat() : block.runs
    return volumeTotal + runs.reduce((count, run) => count + run.text.trim().split(/\s+/).filter(Boolean).length, 0)
  }, 0),
  0,
)

export const MOONWAKE_ROOM_STORY_VOLUMES: Record<string, string[]> = {
  lore_moonwake: ["the-first-keeper", "maelin-house-of-measurements", "auralis-before-iri", "lantern-history-unlit"],
  lore_bell: ["five-wardens-five-wounds", "the-second-bell", "pell-and-sella"],
  lore_root_archive: ["interlude-mosslight", "five-witnesses-unrecorded-day", "rooms-between-rooms", "pell-and-sella"],
  lore_first_note: ["five-wardens-five-wounds", "five-witnesses-unrecorded-day"],
  lore_cinder: ["sella-kitchen-ordinary-things", "vey-last-promise", "letters-small-map"],
  lore_slag: ["interlude-ember", "archive-unsent-apologies"],
  lore_second_note: ["vey-last-promise", "shared-light-open-city"],
  lore_names: ["edda-unwritten-name", "interlude-frostglass"],
  lore_glass: ["interlude-frostglass", "lantern-witness-test"],
  lore_third_note: ["edda-unwritten-name", "five-wardens-five-wounds"],
  lore_atlas: ["nym-map-that-lied", "maelin-tides-edge"],
  lore_orbit: ["interlude-astral", "rooms-between-rooms"],
  lore_fourth_note: ["nym-map-that-lied", "five-witnesses-unrecorded-day"],
  lore_hushwater: ["auralis-before-iri", "auralis-silver-star"],
  lore_echo: ["quiet-anatomy", "archive-unsent-apologies"],
  lore_fifth_note: ["witness-present-tense", "wayfarer-name-unwritten"],
  lore_orchard_unsent: ["interlude-mosslight", "the-second-bell", "five-witnesses-unrecorded-day"],
  lore_foundry_voices: ["interlude-ember", "quiet-anatomy", "vey-last-promise"],
  lore_catalogue_unborn: ["interlude-frostglass", "edda-unwritten-name"],
  lore_observatory_inward: ["interlude-astral", "nym-map-that-lied"],
  lore_corridor_returns: ["interlude-quiet", "auralis-before-iri", "auralis-silver-star"],
  lore_underlight: ["interlude-after", "underlight-five-doors", "lantern-witness-test"],
}

export { MOONWAKE_MILESTONE_STORIES }

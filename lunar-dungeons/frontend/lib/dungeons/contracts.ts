export type DungeonMode = "standard" | "infinity"
export type DungeonAction = "strike" | "guard" | "pulse"

export interface DungeonProgress {
  highestUnlockedLevel: number
  completedLevel: number
  infinityUnlocked: boolean
  infinityDepth: number
}

export interface DungeonHealth {
  hp: number
  maxHp: number
}

export interface DungeonTurnLog {
  player: string
  enemy: string | null
}

export interface DungeonBattle {
  attemptId: string
  mode: DungeonMode
  stage: number
  depth: number
  turn: number
  player: DungeonHealth
  enemy: DungeonHealth & { name: string; boss: boolean }
  status: "active" | "won" | "lost" | "abandoned"
  pulseCooldown: number
  lastTurn: DungeonTurnLog | null
}

export interface DungeonVictoryEvent {
  attemptId: string
  mode: DungeonMode
  stage: number
  depth: number
  tier: number | null
}

export interface DungeonStateResponse {
  progress: DungeonProgress
  activeAttempt: DungeonBattle | null
}

export interface DungeonStartResponse {
  progress: DungeonProgress
  battle: DungeonBattle
}

export interface DungeonTurnResponse {
  progress: DungeonProgress
  battle: DungeonBattle
  victory: DungeonVictoryEvent | null
  defeated: boolean
}

export interface DungeonTier {
  id: number
  name: string
  subtitle: string
  color: string
  glow: string
  chapters: string[]
}

export const DUNGEON_TIERS: DungeonTier[] = [
  {
    id: 1, name: "Mosslight Wilds", subtitle: "Where the old roots stir", color: "#80d99a", glow: "#377c58",
    chapters: ["Rootbound Gate", "Fernfall Crossing", "The Sunken Grove", "Mosskeeper Halls", "Thornwake Tunnels", "The Buried Orchard", "Wyrmroot Warrens", "The Hollow Stump", "Briarwatch Depths", "Lanternfen", "The Verdant Maze", "Oldgrowth Catacombs", "The Spore Cathedral", "Heartwood Descent", "The Warden's Ring", "The Ancient Canopy"],
  },
  {
    id: 2, name: "Ember Hollow", subtitle: "A kingdom under cinders", color: "#ff9a68", glow: "#9f4e38",
    chapters: ["Cinderfall Entry", "Ashen Barracks", "The Coalworks", "Sootglass Gallery", "Magma Reliquary", "The Furnace Run", "Scoria Bastion", "The Smelter Depths", "Charred Throneway", "The Obsidian Kiln", "Embervault", "The Black Foundry", "Pyreheart Tunnels", "The Crown of Ash", "The Crucible Ring", "The Last Hearth"],
  },
  {
    id: 3, name: "Frostglass Vale", subtitle: "Silence beneath the ice", color: "#8bd5ff", glow: "#426f9c",
    chapters: ["Glacier Mouth", "Blueice Causeway", "The Frozen Choir", "Snowblind Halls", "Crystal Burrows", "The Rime Library", "Whitefang Pass", "The Shiverdeep", "Mirrorfrost Gallery", "The Pale Reservoir", "Winterglass Vault", "The Silent Keep", "Frostworn Chapel", "The Boreal Maze", "The Stillness Ring", "The Heart of Winter"],
  },
  {
    id: 4, name: "Astral Archive", subtitle: "Fragments of a lost sky", color: "#c7a3ff", glow: "#7252a7",
    chapters: ["Starfall Vestibule", "The Orrey Walk", "Cometglass Stacks", "The Lost Constellary", "Moonlit Index", "The Gravity Well", "Astral Scriptorium", "The Shattered Meridian", "Eclipse Atrium", "The Celestial Engine", "Nullstar Annex", "The Chronology Vault", "The Forgotten Zodiac", "The Eventide Spiral", "The Observatory Ring", "The First Star"],
  },
  {
    id: 5, name: "The Quiet Void", subtitle: "The edge of every story", color: "#f18ec7", glow: "#914b86",
    chapters: ["The Unlit Threshold", "Hushwater Hall", "The Pale Fracture", "Nullstone Gallery", "The Unmaking Steps", "Echoes Without Names", "The Dusk Engine", "The Hollow Meridian", "The Veil Between", "The Quiet Labyrinth", "Ash of Memory", "The Last Reflection", "The Nameless Archive", "The Black Horizon", "The Final Ring", "Beyond the Silence"],
  },
]

export const STAGES_PER_TIER = 160
export const TOTAL_STAGES = 800
export const MAP_PAGE_SIZE = 10
export const MAP_PAGES_PER_TIER = STAGES_PER_TIER / MAP_PAGE_SIZE

export function tierForStage(stage: number): number | null {
  if (stage < 1 || stage > TOTAL_STAGES) return null
  return Math.floor((stage - 1) / STAGES_PER_TIER) + 1
}

export function isBossStage(stage: number): boolean {
  return stage > 0 && stage <= TOTAL_STAGES && stage % 20 === 0
}

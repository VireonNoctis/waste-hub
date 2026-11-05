export type DungeonMode = "standard" | "infinity"
export type DungeonAction = "strike" | "guard" | "pulse" | "focus"

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
  enemy: DungeonHealth & { name: string; boss: boolean; phase: "sealed" | "awakened" | null; telegraph: boolean; modifier: string | null }
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

export interface DungeonChronicleChapter {
  id: number
  title: string
  region: string
  companion: string
  boss: string
  startStage: number
  endStage: number
  summary: string
  revelation: string
  memoryTitle: string
  memoryText: string
}

export const DUNGEON_PROLOGUE =
  "When the moon above Aster dimmed, its light did not disappear. It fell beneath the world and broke into five notes. The silence that followed began hollowing out every living memory. A lone Wayfarer follows a small lantern through the buried kingdom, searching for the bellkeeper who first heard the silence."

export const DUNGEON_CHRONICLE: DungeonChronicleChapter[] = [
  {
    id: 1,
    title: "The Bell Beneath the Briars",
    region: "Mosslight Wilds",
    companion: "Iri, the moth archivist",
    boss: "The Verdant Colossus",
    startStage: 1,
    endStage: 160,
    summary: "Iri's lantern leads you below a kingdom where roots have swallowed the roads. The forest's creatures attack as if following a command older than the trees. Somewhere beneath the oldest grove, a bell keeps ringing with no hand to move it.",
    revelation: "The first warden rang the bell to warn the world, not to summon the silence. The roots have been holding the warning in place for centuries.",
    memoryTitle: "The First Note",
    memoryText: "When the moon went quiet, the roots kept singing."
  },
  {
    id: 2,
    title: "A Furnace for the Fallen",
    region: "Ember Hollow",
    companion: "Vey, the ash-smith",
    boss: "The Ember Sovereign",
    startStage: 161,
    endStage: 320,
    summary: "In the city beneath the cinders, every furnace burns a memory instead of fuel. Vey remembers a promise made by the miners: keep one ember alive until the missing moonlight can find its way home.",
    revelation: "The Ember Sovereign fed the city its own memories to keep the Moonheart burning. The fire was never a weapon; it was a final act of shelter.",
    memoryTitle: "A Warm Place",
    memoryText: "A home is not the walls that remain. It is the name someone keeps for you."
  },
  {
    id: 3,
    title: "The Names Beneath the Ice",
    region: "Frostglass Vale",
    companion: "Edda, keeper of names",
    boss: "The Hollow Monarch",
    startStage: 321,
    endStage: 480,
    summary: "The frozen choir sings names that no living person can remember. Edda asks you to listen rather than fight the echoes. The deeper you travel, the more the ice begins to answer in familiar voices.",
    revelation: "The Hollow Monarch is the last keeper of the kingdom's names. Its silence protected the people from being erased, even as it trapped their memories in the ice.",
    memoryTitle: "The Names We Keep",
    memoryText: "A name spoken with care is a light the dark cannot swallow."
  },
  {
    id: 4,
    title: "The Map That Lied",
    region: "Astral Archive",
    companion: "Nym, the star cartographer",
    boss: "The Astral Warden",
    startStage: 481,
    endStage: 640,
    summary: "Nym's star charts reveal that every road in the archive bends toward the same sealed chamber. The five wardens were not corrupted guardians. They drew the map that led the silence away from the surface.",
    revelation: "The wardens divided the Moonheart into five notes and hid them across the realms. The map was designed to bring one worthy traveller to the truth, not to the throne.",
    memoryTitle: "The Hidden Route",
    memoryText: "A map can show the way. Only a heart can decide why the journey matters."
  },
  {
    id: 5,
    title: "The Last Light Remembered",
    region: "The Quiet Void",
    companion: "Iri, carrying the first lantern",
    boss: "The Quiet King",
    startStage: 641,
    endStage: 800,
    summary: "At the edge of the world, the silence finally speaks. The Quiet King waits beside the broken Moonheart, guarding a truth that has outlived the kingdom that created it. Iri's lantern begins to remember its first owner.",
    revelation: "The Quiet King is Orin, the first bellkeeper. Orin bound the silence inside the Moonheart and erased their own name to keep it there. The final battle is about returning every stolen memory to the world.",
    memoryTitle: "The Moon Remembers",
    memoryText: "The night did not end when the moon went dark. It ended when someone remembered how to carry the light."
  }
]

export const DUNGEON_ENDING =
  "The five notes return to the Moonheart. Across Aster, roots loosen, furnaces cool, and names rise from the ice. Iri sets the lantern beside the first bell. Orin is remembered at last—not as a king, but as the keeper who waited for someone to come home. The moon does not become as it was. It becomes something the living can share again."

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

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
  companionLine: string
  boss: string
  startStage: number
  endStage: number
  summary: string
  revelation: string
  memoryTitle: string
  memoryText: string
}

export const DUNGEON_PROLOGUE =
  "Before the first sunrise, there was Moonwake: a silver city built around a quiet observatory, where the people listened to the moon as if it were a living archive. When the Quiet arrived—not darkness, but the absence of being remembered—Orin, the First Keeper, broke the Lumen into five lunar notes and hid them in five kingdoms below the city. You wake beneath the observatory with a lantern that has no flame. Iri, a moth archivist with a star stitched into her wing, knows the lantern. She will not yet tell you why. The old atlas promises a throne at the end of the descent. The lantern promises something smaller: someone is waiting to be remembered."

export const DUNGEON_CHRONICLE: DungeonChronicleChapter[] = [
  {
    id: 1,
    title: "A Lantern Without a Flame",
    region: "Mosslight Wilds",
    companion: "Iri, the moth archivist",
    companionLine: "Iri: “The forest remembers every footstep. Walk gently.”",
    boss: "The Verdant Colossus",
    startStage: 1,
    endStage: 160,
    summary: "The Wayfarer wakes beneath Moonwake Observatory. Iri leads them into the Mosslight Wilds, where roots have grown around a buried bell. The creatures here do not hunt for food. They guard the bell as if it were a sleeping heart.",
    revelation: "The bell was never rung to summon the Quiet. The First Keeper rang it to warn the kingdoms that memory itself was under attack. The forest has kept the warning alive by growing around it.",
    memoryTitle: "A Path Remembered",
    memoryText: "A path is not lost while someone remembers where it began."
  },
  {
    id: 2,
    title: "The Hearth That Kept the Dark",
    region: "Ember Hollow",
    companion: "Vey, the ash-smith",
    companionLine: "Vey: “A flame can warm a name without consuming it.”",
    boss: "The Ember Sovereign",
    startStage: 161,
    endStage: 320,
    summary: "Ember Hollow is a city of violet soot and pale gold windows. Its furnaces burn memories instead of coal. Vey, the last ash-smith, has kept one small hearth alight for a visitor whose face has faded from every portrait.",
    revelation: "The Ember Sovereign fed the city its own memories to keep the Lumen warm. The fire was an act of shelter, not conquest. Vey's forgotten promise was made to Orin, not to a king.",
    memoryTitle: "The Hearthlight",
    memoryText: "A home is the name someone saves a place for."
  },
  {
    id: 3,
    title: "The Library of Unsaid Names",
    region: "Frostglass Vale",
    companion: "Edda, keeper of names",
    companionLine: "Edda: “Speak the names you find. The ice listens.”",
    boss: "The Hollow Monarch",
    startStage: 321,
    endStage: 480,
    summary: "Beneath a blue-white aurora, Frostglass keeps a library of names that no living voice can pronounce. Edda has memorised every shelf, but cannot remember her own. The ice answers questions with voices borrowed from the past.",
    revelation: "The Hollow Monarch trapped memories in ice to keep them from the Quiet. It mistook stillness for safety. The names are not asking to remain untouched; they are asking to be spoken again.",
    memoryTitle: "The Name Returned",
    memoryText: "A name is not a cage. It is a door someone may choose to open."
  },
  {
    id: 4,
    title: "An Atlas of Impossible Stars",
    region: "Astral Archive",
    companion: "Nym, the star cartographer",
    companionLine: "Nym: “Stars are not directions. They are promises.”",
    boss: "The Astral Warden",
    startStage: 481,
    endStage: 640,
    summary: "The Astral Archive is suspended above an endless midnight sea. Its orreries turn without hands and its constellations rearrange themselves when watched. Nym has drawn the same map for a thousand years, always leaving one final room blank.",
    revelation: "The wardens divided the Moonheart into five notes and hid them across the realms. The map was designed to bring one worthy traveller to the truth, not to the throne.",
    memoryTitle: "The Blank Constellation",
    memoryText: "A star is not a command. It is a direction you may choose."
  },
  {
    id: 5,
    title: "The Quiet Between Heartbeats",
    region: "Quiet Beyond",
    companion: "Iri, carrying the first lantern",
    companionLine: "Iri: “If you remember me, I will remember the way home.”",
    boss: "Orin · First Keeper",
    startStage: 641,
    endStage: 800,
    summary: "The Quiet Beyond has no horizon. Rooms appear only when someone remembers them. Iri's lantern begins to glow without a flame, and the Wayfarer hears a voice that knows every step they have taken. At the end waits Orin, who has guarded the silence for so long that even their own name became a locked door.",
    revelation: "Orin did not become the Quiet. Orin bound it inside the broken Lumen and gave up their name to keep the world from being erased. The final encounter is not a trial of strength, but a choice about whether memory should be held by one keeper or shared by everyone.",
    memoryTitle: "The Shared Moon",
    memoryText: "Light is not made smaller by being shared."
  }
]

export const DUNGEON_ENDING =
  "The five notes return, not to restore the old Moonwake, but to let the world choose what comes after it. Mosslight grows through the observatory's broken glass. The last Ember furnace becomes a hearth. The names beneath Frostglass are spoken aloud. Above the Astral Archive, stars return to their proper distances. Iri remembers her first name: Auralis. Orin remembers their own. The moon rises over a world that no longer needs one keeper to hold its light. Across the kingdoms, small lanterns answer one another. For the first time in an age, the night belongs to everyone."

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
    id: 5, name: "Quiet Beyond", subtitle: "The edge of every story", color: "#f18ec7", glow: "#914b86",
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

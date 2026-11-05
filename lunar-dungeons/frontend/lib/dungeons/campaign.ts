export type CampaignRegion = "moonwake" | "mosslight" | "ember" | "frost" | "astral" | "quiet" | "underlight"
export type CampaignEventKind = "room" | "checkpoint" | "respawn" | "lore" | "secret" | "bestiary" | "quest" | "boss-hit" | "ending" | "settings"

export interface AccessibilitySettings {
  reducedMotion: boolean
  cameraShake: boolean
  highContrastTelegraphs: boolean
  colorblindTelegraphs: boolean
  controls: Record<string, string>
}

export interface CampaignBoss {\n  id: string\n  hp: number\n  maxHp: number\n}\n\nexport interface CampaignSnapshot {
  currentRoom: string
  checkpointRoom: string
  unlockedAbilities: string[]
  discoveredLore: string[]
  discoveredSecrets: string[]
  bestiary: string[]
  completedQuests: string[]
  bossesDefeated: string[]
  questChoices: Record<string, string>
  companionAffinity: number
  ending: string | null
  activeBoss: CampaignBoss | null
  settings: AccessibilitySettings
}

export interface CampaignRoom {
  id: string
  title: string
  region: CampaignRegion
  chapter: number
  subtitle: string
  background: string
  midground: string
  accent: string
  spawn: number
  platforms: Array<{ x: number; y: number; width: number }>
  exits: Array<{ x: number; target: string; label: string; ability?: string }>
  enemy?: { id: string; name: string; hp: number; pattern: string; kind: "ground" | "float" | "boss" }
  npc?: { id: string; name: string; role: string; line: string; quest: string }
  lore?: { id: string; title: string; text: string; x: number }
  secret?: { id: string; title: string; x: number; target: string }
  shrine?: { id: string; x: number; title: string }
}

export const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  reducedMotion: false,
  cameraShake: true,
  highContrastTelegraphs: true,
  colorblindTelegraphs: true,
  controls: {
    left: "KeyA",
    right: "KeyD",
    jump: "Space",
    attack: "KeyJ",
    dash: "KeyK",
    interact: "KeyE",
    grapple: "KeyG",
  },
}

export const MOONWAKE_PROLOGUE = `Before the first sunrise, there was the Moonwake: a silver city built around a quiet observatory, where the night sky was studied as if it were a living archive. Its people did not worship the moon. They listened to it. Every phase was a letter, every eclipse a held breath, every returning tide a promise that what had gone missing could still find its way home.

At the centre of the observatory rested the Lumen, a small, impossible light said to remember every name ever spoken beneath the night. Orin, the First Keeper, was charged with protecting it. When the Quiet arrived—not darkness, but the absence of being remembered—Orin broke the Lumen into five lunar notes and hid them in five kingdoms below the city. The Moonwake vanished from the maps. Its people became stories with their names rubbed away.

You are the Wayfarer, found asleep beneath the observatory with a lantern that has no flame. Iri, a moth archivist with a star stitched into her wing, knows the lantern. She will not tell you why. Not yet.

The old atlas promises a throne at the end of the descent. The lantern promises something smaller: someone is waiting to be remembered.`

export const MOONWAKE_ENDING = `The five notes return, not to restore the old Moonwake, but to let the world choose what comes after it. Mosslight grows through the observatory's broken glass. The last Ember furnace becomes a hearth. The names beneath Frostglass are spoken aloud. Above the Astral Archive, stars return to their proper distances.

At the Lumen, Iri finally remembers her first name: Auralis. Orin remembers his own. Neither asks to be forgiven. They ask only that the story continue without erasing the people who carried it.

The moon rises over a world that no longer needs one keeper to hold its light. Across the kingdoms, small lanterns answer one another. For the first time in an age, the night belongs to everyone.`

export const CAMPAIGN_CHAPTERS = [
  {
    id: 1,
    title: "A Lantern Without a Flame",
    region: "Mosslight Wilds",
    companion: "Iri · the moth archivist",
    boss: "The Verdant Colossus",
    arc: "Iri remembers the shape of the world, but not the name she carried before the Quiet.",
    summary: "The Wayfarer wakes beneath Moonwake Observatory. A moth with a paper-thin star on her wing leads them into the Mosslight Wilds, where roots have grown around a buried bell. The creatures here do not hunt for food. They guard the bell as if it were a sleeping heart.",
    revelation: "The bell was never rung to summon the Quiet. The First Keeper rang it to warn the kingdoms that memory itself was under attack. The forest has kept the warning alive by growing around it.",
    memory: "A path is not lost while someone remembers where it began.",
    companionLine: "Iri: The roots are holding a sound. Please do not make them let go all at once.",
  },
  {
    id: 2,
    title: "The Hearth That Kept the Dark",
    region: "Ember Hollow",
    companion: "Vey · the last ash-smith",
    boss: "The Ember Sovereign",
    arc: "Vey learns that a promise can survive even when the person who made it cannot be recalled.",
    summary: "Ember Hollow is a city of violet soot and pale gold windows. Its furnaces burn memories instead of coal. Vey, the last ash-smith, has kept one small hearth alight for a visitor whose face has faded from every portrait.",
    revelation: "The Ember Sovereign fed the city its own memories to keep the Lumen warm. The fire was an act of shelter, not conquest. Vey's forgotten promise was made to Orin, not to a king.",
    memory: "A home is the name someone saves a place for.",
    companionLine: "Vey: A flame should show you the face beside it. It should never ask you to become the fuel.",
  },
  {
    id: 3,
    title: "The Library of Unsaid Names",
    region: "Frostglass Vale",
    companion: "Edda · keeper of names",
    boss: "The Hollow Monarch",
    arc: "Edda accepts that preserving a name also means allowing its owner to change.",
    summary: "Beneath a blue-white aurora, Frostglass keeps a library of names that no living voice can pronounce. Edda has memorised every shelf, but cannot remember her own. The ice answers questions with voices borrowed from the past.",
    revelation: "The Hollow Monarch trapped memories in ice to keep them from the Quiet. It mistook stillness for safety. The names are not asking to remain untouched; they are asking to be spoken again.",
    memory: "A name is not a cage. It is a door someone may choose to open.",
    companionLine: "Edda: Read them gently. Even a forgotten name deserves a little room.",
  },
  {
    id: 4,
    title: "An Atlas of Impossible Stars",
    region: "Astral Archive",
    companion: "Nym · cartographer of the night",
    boss: "The Astral Warden",
    arc: "Nym stops drawing routes that guarantee an outcome and learns to map possibility.",
    summary: "The Astral Archive is suspended above an endless midnight sea. Its orreries turn without hands and its constellations rearrange themselves when watched. Nym has drawn the same map for a thousand years, always leaving one final room blank.",
    revelation: "The five wardens divided the Lumen and made the map as a message to a future traveller. They did not hide the notes from the world; they hid them from the Quiet until someone could return them without becoming another keeper.",
    memory: "A star is not a command. It is a direction you may choose.",
    companionLine: "Nym: The blank space is not an error. It is where your choice belongs.",
  },
  {
    id: 5,
    title: "The Quiet Between Heartbeats",
    region: "The Quiet Beyond",
    companion: "Iri · the last remembered light",
    boss: "Orin, the First Keeper",
    arc: "Iri and Orin recover their names. The Wayfarer must decide what the Lumen should mean to the living.",
    summary: "The Quiet Beyond has no horizon. Rooms appear only when someone remembers them. Iri's lantern begins to glow without a flame, and the Wayfarer hears a voice that knows every step they have taken. At the end waits Orin, who has guarded the silence for so long that even their own name became a locked door.",
    revelation: "Orin did not become the Quiet. Orin bound it inside the broken Lumen and gave up their name to keep the world from being erased. The final encounter is not a trial of strength, but a choice about whether memory should be held by one keeper or shared by everyone.",
    memory: "Light is not made smaller by being shared.",
    companionLine: "Iri: I remember the lantern now. It was never meant to lead us away. It was meant to bring us back.",
  },
]

export const WORLD_ROOMS: CampaignRoom[] = [
  {
    id: "moonwake_observatory", title: "Moonwake Observatory", region: "moonwake", chapter: 0,
    subtitle: "A home beneath the last moon", background: "#101426", midground: "#242945", accent: "#c7c3f2", spawn: -9,
    platforms: [{ x: -4, y: -1.8, width: 4.2 }, { x: 3, y: -0.7, width: 3.8 }, { x: 9, y: -2, width: 3.2 }],
    exits: [{ x: 13.1, target: "mosslight_bell_garden", label: "Mosslight Gate" }, { x: -12.9, target: "moonwake_underlight", label: "Underlight", ability: "five-secrets" }],
    npc: { id: "iri", name: "Iri", role: "Moth Archivist", line: "A lantern with no flame. That is how the old story begins.", quest: "the-unlit-lantern" },
    lore: { id: "lore_moonwake", title: "The Observatory Oath", text: "We will not own the moonlight. We will keep a place for it, and leave the door open when it returns.", x: 5.5 },
    shrine: { id: "shrine_moonwake", x: -7.3, title: "First Return" },
  },
  {
    id: "mosslight_bell_garden", title: "Bell Garden", region: "mosslight", chapter: 1,
    subtitle: "Where the roots keep a warning", background: "#101c20", midground: "#1c3539", accent: "#b2e4c7", spawn: -10,
    platforms: [{ x: -5, y: -1.9, width: 4 }, { x: 1, y: -0.7, width: 4.1 }, { x: 8, y: -2.1, width: 4 }],
    exits: [{ x: -13.1, target: "moonwake_observatory", label: "Moonwake" }, { x: 13.1, target: "mosslight_root_archive", label: "Root Archive" }],
    enemy: { id: "mossling", name: "Mossling", hp: 44, pattern: "A patient root-creature circles twice, then springs toward the lantern.", kind: "ground" },
    npc: { id: "iri", name: "Iri", role: "Moth Archivist", line: "Listen. The bell is not calling us. It is trying to finish a sentence.", quest: "the-bell-kept-quiet" },
    lore: { id: "lore_bell", title: "A Warning in Green", text: "The first bell was rung for the living. Let no one mistake a warning for an invitation.", x: 8.2 },
    shrine: { id: "shrine_bell", x: -8.1, title: "Rootbound Rest" },
  },
  {
    id: "mosslight_root_archive", title: "Root Archive", region: "mosslight", chapter: 1,
    subtitle: "A library grown around a tree", background: "#101c20", midground: "#263f39", accent: "#a9d9b8", spawn: -10,
    platforms: [{ x: -7, y: -1.2, width: 3.5 }, { x: -1, y: -2.4, width: 3.5 }, { x: 5, y: -0.8, width: 3.8 }, { x: 10, y: -2.2, width: 2.8 }],
    exits: [{ x: -13.1, target: "mosslight_bell_garden", label: "Bell Garden" }, { x: 13.1, target: "mosslight_briar_well", label: "Briar Well" }],
    enemy: { id: "thorn_sprite", name: "Thorn Sprite", hp: 54, pattern: "A floating thorn pauses in the air before a quick diagonal dive.", kind: "float" },
    lore: { id: "lore_root_archive", title: "The Root Index", text: "Every memory has a root. Some are deep, some are tender, and none should be pulled out simply because they are difficult to name.", x: 4.8 },
    secret: { id: "secret_mosslight", title: "The Mosslight Reliquary", x: -7.4, target: "mosslight_root_archive" },
    shrine: { id: "shrine_root", x: 10, title: "Quiet Canopy" },
  },
  {
    id: "mosslight_briar_well", title: "Briar Well", region: "mosslight", chapter: 1,
    subtitle: "The colossus beneath the bell", background: "#0c191c", midground: "#213d3b", accent: "#c6e5b5", spawn: -9,
    platforms: [{ x: -6, y: -1.8, width: 4 }, { x: 0, y: -2.7, width: 3 }, { x: 6.5, y: -1.5, width: 4.5 }],
    exits: [{ x: -13.1, target: "mosslight_root_archive", label: "Root Archive" }, { x: 13.1, target: "ember_cinder_market", label: "Ember Hollow", ability: "dash" }],
    enemy: { id: "verdant_colossus", name: "Verdant Colossus", hp: 190, pattern: "The colossus raises both arms, marks the floor, then sends roots across the arena.", kind: "boss" },
    lore: { id: "lore_first_note", title: "The First Note", text: "When the moon went quiet, the roots kept singing.", x: 8.7 },
  },
  {
    id: "ember_cinder_market", title: "Cinder Market", region: "ember", chapter: 2,
    subtitle: "A city that burns memories", background: "#1a141e", midground: "#3b2736", accent: "#eebd9e", spawn: -10,
    platforms: [{ x: -6, y: -2, width: 4 }, { x: 0, y: -0.8, width: 4 }, { x: 7, y: -2.1, width: 4 }],
    exits: [{ x: -13.1, target: "mosslight_briar_well", label: "Mosslight" }, { x: 13.1, target: "ember_slag_bridge", label: "Slag Bridge", ability: "dash" }],
    enemy: { id: "cinder_wisp", name: "Cinder Wisp", hp: 60, pattern: "A pale ember circles above you, flashes twice, then drops a warm shockwave.", kind: "float" },
    npc: { id: "vey", name: "Vey", role: "Ash-smith", line: "I have kept a hearth warm for a name I can no longer pronounce.", quest: "a-hearth-for-two" },
    lore: { id: "lore_cinder", title: "The Hearth Ledger", text: "We gave the fire our memories so that a stranger would still find a light in the window.", x: 7.5 },
    shrine: { id: "shrine_cinder", x: -8.2, title: "Ashen Rest" },
  },
  {
    id: "ember_slag_bridge", title: "Slag Bridge", region: "ember", chapter: 2,
    subtitle: "An old road over sleeping fire", background: "#20131a", midground: "#4a2931", accent: "#ffba91", spawn: -10,
    platforms: [{ x: -7, y: -1.1, width: 3.2 }, { x: -1, y: -2.2, width: 3.5 }, { x: 5, y: -0.9, width: 3.4 }, { x: 10, y: -2.4, width: 3 }],
    exits: [{ x: -13.1, target: "ember_cinder_market", label: "Cinder Market" }, { x: 13.1, target: "ember_last_hearth", label: "Last Hearth" }],
    enemy: { id: "ash_hound", name: "Ash Hound", hp: 72, pattern: "The hound lowers its head, leaves a cinder trail, then lunges in a straight line.", kind: "ground" },
    lore: { id: "lore_slag", title: "Bridge of Small Promises", text: "A city is not saved all at once. It is saved each time someone keeps a small promise.", x: 3.5 },
    secret: { id: "secret_ember", title: "The Glass Kiln", x: 10.5, target: "ember_slag_bridge" },
    shrine: { id: "shrine_slag", x: -9, title: "Coalglass Rest" },
  },
  {
    id: "ember_last_hearth", title: "The Last Hearth", region: "ember", chapter: 2,
    subtitle: "A fire that refuses to forget", background: "#1c141b", midground: "#482934", accent: "#f2c39b", spawn: -9,
    platforms: [{ x: -6, y: -1.9, width: 4 }, { x: 0, y: -2.8, width: 3 }, { x: 6.5, y: -1.5, width: 4.5 }],
    exits: [{ x: -13.1, target: "ember_slag_bridge", label: "Slag Bridge" }, { x: 13.1, target: "frost_name_library", label: "Frostglass", ability: "wall-jump" }],
    enemy: { id: "ember_sovereign", name: "Ember Sovereign", hp: 220, pattern: "The sovereign marks three ember circles, then sweeps a wide ribbon of flame across the floor.", kind: "boss" },
    lore: { id: "lore_second_note", title: "A Warm Place", text: "A home is the name someone keeps for you.", x: 8.7 },
  },
  {
    id: "frost_name_library", title: "Name Library", region: "frost", chapter: 3,
    subtitle: "Where every shelf remembers", background: "#111a2a", midground: "#273a59", accent: "#c1ddf7", spawn: -10,
    platforms: [{ x: -7, y: -1.1, width: 3.6 }, { x: -1, y: -2.1, width: 3.7 }, { x: 5, y: -0.7, width: 3.6 }, { x: 10, y: -2.2, width: 3 }],
    exits: [{ x: -13.1, target: "ember_last_hearth", label: "Ember Hollow" }, { x: 13.1, target: "frost_glass_causeway", label: "Glass Causeway", ability: "wall-jump" }],
    enemy: { id: "frost_echo", name: "Frost Echo", hp: 74, pattern: "The echo disappears in a cold shimmer, then reappears behind your last position.", kind: "float" },
    npc: { id: "edda", name: "Edda", role: "Keeper of Names", line: "I can recite every name here. I cannot remember which one was mine.", quest: "the-name-without-ink" },
    lore: { id: "lore_names", title: "A Name Spoken Once", text: "Say the name even if no one answers. The saying is already a kind of return.", x: 8 },
    shrine: { id: "shrine_frost", x: -8, title: "Blueglass Rest" },
  },
  {
    id: "frost_glass_causeway", title: "Glass Causeway", region: "frost", chapter: 3,
    subtitle: "A bridge made of held breath", background: "#111a2a", midground: "#273f60", accent: "#b9e4ef", spawn: -10,
    platforms: [{ x: -8, y: -1.4, width: 3 }, { x: -2.5, y: -2.2, width: 3.1 }, { x: 3.5, y: -1.1, width: 3.4 }, { x: 9, y: -2, width: 3 }],
    exits: [{ x: -13.1, target: "frost_name_library", label: "Name Library" }, { x: 13.1, target: "frost_hushed_throne", label: "Hushed Throne" }],
    enemy: { id: "glacier_warden", name: "Glacier Warden", hp: 88, pattern: "A crystal shield forms first; the warden then sends a low ice wave along the bridge.", kind: "ground" },
    lore: { id: "lore_glass", title: "The Moving Ice", text: "Nothing living remains unchanged. Even ice moves, if you give it enough time.", x: 4 },
    secret: { id: "secret_frost", title: "The White Mirror", x: -8.4, target: "frost_glass_causeway" },
    shrine: { id: "shrine_mirror", x: 9.2, title: "Mirror Rest" },
  },
  {
    id: "frost_hushed_throne", title: "Hushed Throne", region: "frost", chapter: 3,
    subtitle: "The monarch of held names", background: "#101928", midground: "#2c4565", accent: "#d0e9fa", spawn: -9,
    platforms: [{ x: -6, y: -1.8, width: 4 }, { x: 0, y: -2.8, width: 3 }, { x: 6.5, y: -1.5, width: 4.5 }],
    exits: [{ x: -13.1, target: "frost_glass_causeway", label: "Glass Causeway" }, { x: 13.1, target: "astral_scriptorium", label: "Astral Archive", ability: "double-jump" }],
    enemy: { id: "hollow_monarch", name: "Hollow Monarch", hp: 250, pattern: "The monarch sends two crescent waves, pauses, then calls a falling star of ice.", kind: "boss" },
    lore: { id: "lore_third_note", title: "The Names We Keep", text: "A name spoken with care is a light the dark cannot swallow.", x: 8.7 },
  },
  {
    id: "astral_scriptorium", title: "Astral Scriptorium", region: "astral", chapter: 4,
    subtitle: "Ink written across the night", background: "#17162d", midground: "#343257", accent: "#d7c9ff", spawn: -10,
    platforms: [{ x: -7, y: -1.2, width: 3.6 }, { x: -1, y: -2.3, width: 3.7 }, { x: 5, y: -0.8, width: 3.6 }, { x: 10, y: -2.2, width: 3 }],
    exits: [{ x: -13.1, target: "frost_hushed_throne", label: "Frostglass" }, { x: 13.1, target: "astral_orbit_gallery", label: "Orbit Gallery", ability: "double-jump" }],
    enemy: { id: "star_construct", name: "Star Construct", hp: 96, pattern: "The construct draws a bright line in the air, then fires along that line.", kind: "float" },
    npc: { id: "nym", name: "Nym", role: "Star Cartographer", line: "My map ends here. I have mistaken an unfinished map for a finished world.", quest: "the-blank-constellation" },
    lore: { id: "lore_atlas", title: "The Map That Waited", text: "The final mark is not a destination. It is the place where another traveller begins.", x: 8 },
    shrine: { id: "shrine_astral", x: -8, title: "Orbit Rest" },
  },
  {
    id: "astral_orbit_gallery", title: "Orbit Gallery", region: "astral", chapter: 4,
    subtitle: "A gallery with no ceiling", background: "#17162d", midground: "#3b355f", accent: "#e2d2ff", spawn: -10,
    platforms: [{ x: -8, y: -1.4, width: 3 }, { x: -2.5, y: -2.2, width: 3.1 }, { x: 3.5, y: -1.1, width: 3.4 }, { x: 9, y: -2, width: 3 }],
    exits: [{ x: -13.1, target: "astral_scriptorium", label: "Scriptorium" }, { x: 13.1, target: "astral_first_star", label: "First Star" }],
    enemy: { id: "astral_drake", name: "Astral Drake", hp: 108, pattern: "The drake orbits once, folds its wings, then dives through your previous position.", kind: "float" },
    lore: { id: "lore_orbit", title: "The Promise of Distance", text: "The stars are not far because they are cold. They are far so that we can see one another.", x: 4 },
    secret: { id: "secret_astral", title: "The Unwritten Orbit", x: 9.8, target: "astral_orbit_gallery" },
    shrine: { id: "shrine_orbit", x: -9, title: "Farstar Rest" },
  },
  {
    id: "astral_first_star", title: "The First Star", region: "astral", chapter: 4,
    subtitle: "The warden at the edge of the map", background: "#14132a", midground: "#34305b", accent: "#e3d4ff", spawn: -9,
    platforms: [{ x: -6, y: -1.8, width: 4 }, { x: 0, y: -2.8, width: 3 }, { x: 6.5, y: -1.5, width: 4.5 }],
    exits: [{ x: -13.1, target: "astral_orbit_gallery", label: "Orbit Gallery" }, { x: 13.1, target: "quiet_hushwater", label: "Quiet Beyond", ability: "grapple" }],
    enemy: { id: "astral_warden", name: "Astral Warden", hp: 280, pattern: "Three orbiting sigils mark safe and unsafe lanes; the warden then collapses the orbit inward.", kind: "boss" },
    lore: { id: "lore_fourth_note", title: "The Hidden Route", text: "A map can show the way. Only a heart can decide why the journey matters.", x: 8.7 },
  },
  {
    id: "quiet_hushwater", title: "Hushwater", region: "quiet", chapter: 5,
    subtitle: "A sea that reflects forgotten rooms", background: "#171222", midground: "#30213a", accent: "#e0c7ef", spawn: -10,
    platforms: [{ x: -7, y: -1.2, width: 3.6 }, { x: -1, y: -2.3, width: 3.7 }, { x: 5, y: -0.8, width: 3.6 }, { x: 10, y: -2.2, width: 3 }],
    exits: [{ x: -13.1, target: "astral_first_star", label: "Astral Archive" }, { x: 13.1, target: "quiet_echo_court", label: "Echo Court", ability: "grapple" }],
    enemy: { id: "quietling", name: "Quietling", hp: 112, pattern: "The quietling dims, reappears at a distance, then sends a slow wave of silence across the floor.", kind: "float" },
    npc: { id: "iri", name: "Iri", role: "The lantern's keeper", line: "I remember the sound of my name. I am nearly brave enough to say it.", quest: "a-name-for-the-light" },
    lore: { id: "lore_hushwater", title: "The Quiet is Not Empty", text: "A silence can be full of people who have not yet found the courage to speak.", x: 8 },
    shrine: { id: "shrine_hushwater", x: -8, title: "Soft Return" },
  },
  {
    id: "quiet_echo_court", title: "Echo Court", region: "quiet", chapter: 5,
    subtitle: "Where every footstep comes home", background: "#171222", midground: "#392644", accent: "#e8c9f0", spawn: -10,
    platforms: [{ x: -8, y: -1.4, width: 3 }, { x: -2.5, y: -2.2, width: 3.1 }, { x: 3.5, y: -1.1, width: 3.4 }, { x: 9, y: -2, width: 3 }],
    exits: [{ x: -13.1, target: "quiet_hushwater", label: "Hushwater" }, { x: 13.1, target: "quiet_moonheart", label: "Moonheart" }],
    enemy: { id: "eclipse_shade", name: "Eclipse Shade", hp: 126, pattern: "The shade leaves a delayed echo of itself, then attacks from the echo's position.", kind: "ground" },
    lore: { id: "lore_echo", title: "A Room Made of Returning", text: "You are not the sum of what you have lost. You are also every hand that helped you carry it.", x: 4 },
    secret: { id: "secret_quiet", title: "The Room Behind Silence", x: 9.6, target: "quiet_echo_court" },
    shrine: { id: "shrine_echo", x: -9, title: "Echo Rest" },
  },
  {
    id: "quiet_moonheart", title: "The Moonheart", region: "quiet", chapter: 5,
    subtitle: "The last keeper, and the first promise", background: "#100e1c", midground: "#30203b", accent: "#f0d6f5", spawn: -9,
    platforms: [{ x: -6, y: -1.8, width: 4 }, { x: 0, y: -2.8, width: 3 }, { x: 6.5, y: -1.5, width: 4.5 }],
    exits: [{ x: -13.1, target: "quiet_echo_court", label: "Echo Court" }],
    enemy: { id: "orin_first_keeper", name: "Orin · First Keeper", hp: 330, pattern: "Orin sends a slow crescent, pauses for the echo, then folds the arena into a final inward pulse.", kind: "boss" },
    lore: { id: "lore_fifth_note", title: "The Moon Remembers", text: "The night did not end when the moon went dark. It ended when someone remembered how to carry the light.", x: 8.7 },
  },
  {
    id: "moonwake_underlight", title: "The Underlight", region: "underlight", chapter: 0,
    subtitle: "A secret room beneath the first map", background: "#0b1021", midground: "#292443", accent: "#e2cbff", spawn: -9,
    platforms: [{ x: -7, y: -1.2, width: 3.5 }, { x: -1, y: -2.3, width: 3.7 }, { x: 5, y: -0.8, width: 3.5 }, { x: 10, y: -2.1, width: 3 }],
    exits: [{ x: 13.1, target: "moonwake_observatory", label: "Return to Moonwake" }],
    enemy: { id: "eclipse_warden", name: "The Unwritten Warden", hp: 300, pattern: "The warden erases one platform, waits for the lantern to answer, then restores the room in a new shape.", kind: "boss" },
    lore: { id: "lore_underlight", title: "The Unwritten Page", text: "There was a sixth note. It was not part of the Lumen. It was the space left for a future voice.", x: 8.5 },
  },
]

export const WORLD_ROOM_BY_ID = Object.fromEntries(WORLD_ROOMS.map((room) => [room.id, room])) as Record<string, CampaignRoom>

export const BESTIARY_ENTRIES: Record<string, { title: string; pattern: string; note: string }> = {
  mossling: { title: "Mossling", pattern: "Circles twice, then springs toward the lantern.", note: "Patient. Interrupt the spring with a close lantern strike." },
  thorn_sprite: { title: "Thorn Sprite", pattern: "Hovers, flashes, then dives diagonally.", note: "Watch for the flash and dash through its landing line." },
  verdant_colossus: { title: "Verdant Colossus", pattern: "Raises both arms before sending roots across the floor.", note: "The ground marks are a warning. Jump or dash over the roots." },
  cinder_wisp: { title: "Cinder Wisp", pattern: "Circles twice, then drops a warm shockwave.", note: "Keep moving after the second flash." },
  ash_hound: { title: "Ash Hound", pattern: "Leaves a cinder trail, then lunges straight ahead.", note: "Let the lunge pass, then answer from behind." },
  ember_sovereign: { title: "Ember Sovereign", pattern: "Marks three ember circles before a wide floor sweep.", note: "The third mark is the signal to jump." },
  frost_echo: { title: "Frost Echo", pattern: "Vanished shimmer, then reappears behind you.", note: "Turn quickly after the shimmer; the echo is briefly still." },
  glacier_warden: { title: "Glacier Warden", pattern: "Raises a crystal shield before a low ice wave.", note: "A high platform is safe while the wave crosses the bridge." },
  hollow_monarch: { title: "Hollow Monarch", pattern: "Two crescent waves, pause, then a falling ice star.", note: "The pause is part of the pattern, not an opening to rush." },
  star_construct: { title: "Star Construct", pattern: "Draws a bright line before firing along it.", note: "Do not stand on the line when the glow becomes solid." },
  astral_drake: { title: "Astral Drake", pattern: "Orbits, folds its wings, then dives at your previous position.", note: "Change direction after the wing fold." },
  astral_warden: { title: "Astral Warden", pattern: "Three orbiting sigils mark lanes before the orbit collapses inward.", note: "Move toward the gap between sigils, then cross the arena." },
  quietling: { title: "Quietling", pattern: "Dims, reappears, then sends a slow wave across the floor.", note: "The wave travels slowly; a measured jump is enough." },
  eclipse_shade: { title: "Eclipse Shade", pattern: "Leaves a delayed echo, then attacks from that position.", note: "The echo is the warning. Move away from its mark." },
  orin_first_keeper: { title: "Orin · First Keeper", pattern: "Crescent, echo, then an inward pulse.", note: "Wait through the echo before approaching. The last pulse leaves a clear opening." },
  eclipse_warden: { title: "The Unwritten Warden", pattern: "Erases one platform, then restores the arena in a new shape.", note: "Watch the platform silhouettes. The room itself is part of the encounter." },
}

export const QUEST_CHOICES: Record<string, string[]> = {
  "the-unlit-lantern": ["Trust Iri with the lantern", "Keep the lantern close for now"],
  "the-bell-kept-quiet": ["Let the roots finish their warning", "Carry the bell's note forward"],
  "a-hearth-for-two": ["Keep the hearth for the unknown guest", "Give the ember back to the city"],
  "the-name-without-ink": ["Speak Edda's name with her", "Let Edda choose when to remember"],
  "the-blank-constellation": ["Leave the final star unmarked", "Draw a path for whoever comes next"],
  "a-name-for-the-light": ["Tell Iri the name Auralis", "Ask Iri to choose her own name"],
}

export const BOSS_UNLOCKS: Record<string, string> = {
  verdant_colossus: "dash",
  ember_sovereign: "wall-jump",
  hollow_monarch: "double-jump",
  astral_warden: "grapple",
}

export const LUNAR_ENDINGS = [
  { id: "shared-light", title: "The Shared Light", description: "Return the Lumen to the people. No single keeper owns the night." },
  { id: "quiet-keeper", title: "The Quiet Keeper", description: "Keep the Quiet sealed, but carry the burden together with Iri and Orin." },
  { id: "open-sky", title: "The Open Sky", description: "Release the Lumen into the sky. The old Moonwake ends, and every kingdom begins its own dawn." },
]

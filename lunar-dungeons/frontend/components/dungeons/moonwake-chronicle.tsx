"use client"

import type { CampaignSnapshot } from "@/lib/dungeons/campaign"

const ACTS = [
  {
    number: "I",
    realm: "Mosslight Wilds",
    title: "The Bell Beneath the Roots",
    subtitle: "A warning mistaken for a summons",
    story: "The Wayfarer leaves the observatory through a gate grown over with pale leaves. Mosslight is not a forest that has reclaimed a ruin; it is a forest that has chosen to become a ruin's memory. The paths curve back toward old promises. Lantern-moths gather where the air is warm, and the roots beneath the soil carry a low note that can be felt before it can be heard. Iri recognises the tune, but each time she tries to name it, a little silver dust falls from her wings.",
    turn: "The Bell Garden's creatures guard a buried bell. The Verdant Colossus is bound to its roots, not as a jailer but as the last living listener. When it falls, the bell sounds once. Its note does not open a door: it reveals that Orin rang it to warn the five kingdoms that the Lumen was beginning to forget. The first lunar note is called Return. It is the memory of a path kept open for someone who has not yet come home.",
    aftermath: "Iri admits she once catalogued every voice in the observatory. She cannot remember whether she was asked to do so, or whether she volunteered. The forest gives the Wayfarer a seed of pale glass. It will not grow into a tree; it grows into a map whenever someone tells the truth beside it.",
    image: "Green-gold canopies, bell-shaped flowers, root bridges, rain caught in silver leaves, and old stone stairways slowly lifted by living wood.",
  },
  {
    number: "II",
    realm: "Ember Hollow",
    title: "The Hearth That Kept the Dark",
    subtitle: "A city that chose to remember for one another",
    story: "Ember Hollow sits inside a cooled caldera. Its roofs are black glass, its windows are amber, and its streets are warmed by public hearths fed with memories freely given. The city has survived because no one person has had to keep every story. Vey, the last ash-smith, tends a small flame for a guest whose face has disappeared from every portrait. He remembers the promise, but not the person to whom he made it.",
    turn: "The Ember Sovereign appears to be feeding the city to its furnaces. The truth is gentler and sadder: the Sovereign has been giving away its own memories to keep the public fires alive. It has forgotten its own first name, its family, and the reason it began. The second note is Hearth. The Wayfarer returns the flame to the city and learns that care is not the same as possession.",
    aftermath: "Vey's promise was made to Orin: if the First Keeper ever returned without a name, there would still be a place at the fire. Vey does not recover the missing guest's face. Instead, he leaves the chair empty by choice, so that the city can keep making room for people it has not met.",
    image: "Violet soot, rose-gold furnaces, suspended chains, glass kilns, molten rivers below delicate bridges, and a single warm window in every district.",
  },
  {
    number: "III",
    realm: "Frostglass Vale",
    title: "The Library of Unsaid Names",
    subtitle: "Nothing preserved can remain untouched forever",
    story: "Frostglass is a valley beneath a slow aurora. Its library is carved into glaciers and arranged by the sound of a name rather than its spelling. Edda knows every shelf and can recite thousands of names, yet cannot say her own. The ice answers questions with borrowed voices. Some shelves contain names that have changed; others are blank because their owners chose not to be found.",
    turn: "The Hollow Monarch froze memories to protect them from the Quiet. It believed that anything which never changed could never be lost. But the frozen voices have become unable to grow, forgive, or choose. The third note is Name. Edda begins to speak her own name without demanding that it be the name she once had. The Monarch's crown melts into a clear pool, and the names are returned to their owners rather than to the catalogue.",
    aftermath: "Edda keeps the library, but changes its oldest rule: no name is stored without the permission of the person who carries it. The Wayfarer finds a page with their own silhouette drawn in frost. There is no name beneath it. For the first time, the blank feels like an invitation rather than a threat.",
    image: "Blue-white ice, translucent shelves, aurora ribbons, frozen waterfalls, mirrored bridges, and tiny lamps suspended inside the glaciers.",
  },
  {
    number: "IV",
    realm: "Astral Archive",
    title: "An Atlas of Impossible Stars",
    subtitle: "A map is a promise, not an order",
    story: "The Astral Archive hangs above a midnight sea. Its observatories rotate around one another, and the constellations change whenever a traveller insists they know the way. Nym has mapped every possible route except the final room. They have mistaken certainty for safety: every map they draw is designed to prevent the future from surprising them.",
    turn: "The Astral Warden is the keeper of Distance, the fourth note. It measures the space between people and mistakes separation for protection. Nym discovers that the blank room is not missing from the atlas. It is the one place no map can decide on the traveller's behalf. The Warden's defeat restores the stars to motion and makes the route into the Quiet visible.",
    aftermath: "Nym redraws the atlas with several possible endings instead of one perfect route. The stars do not settle into a single shape. They become a moving chart that anyone can read from a different place. Nym's final map is deliberately unfinished, with room for a traveller who has not been born yet.",
    image: "Lilac observatories, rotating brass orreries, comet-glass shelves, star bridges, impossible staircases, and a horizon reflected in an ocean with no shore.",
  },
  {
    number: "V",
    realm: "The Quiet Beyond",
    title: "The Quiet Between Heartbeats",
    subtitle: "The last keeper is also someone who was kept",
    story: "The Quiet Beyond has no fixed horizon. A room appears when someone remembers it, and a corridor fades when no one needs to cross it. The Quiet is not a monster that wants the world to end. It is the gathering of every story left unspoken, every name treated as inconvenient, and every memory carried alone until its keeper could no longer speak. Iri's lantern begins to glow. She remembers that her first name was Auralis.",
    turn: "Orin, the First Keeper, did not create the Quiet. Orin tried to hold the Lumen alone after discovering that it was changing with every life it touched. When the light began to overwhelm the observatory, Orin broke it into five notes and gave up their own name to bind the silence. Orin has guarded the world, but also prevented it from sharing the burden. The fifth note is Witness: the act of seeing another person without claiming to own their story.",
    aftermath: "The final battle ends when Orin remembers their name and the Wayfarer refuses the empty throne. The Lumen is whole again, but it is no longer a private light. What follows depends on the ending chosen, the promises kept, and the people who learned to carry one another's stories.",
    image: "Ink-dark water, pale doorways, fragments of familiar rooms, floating paper lanterns, and stars that appear only when spoken to.",
  },
]

const CAST = [
  {
    name: "Iri / Auralis",
    role: "Moth archivist · the lantern's first keeper",
    truth: "Auralis once tended the observatory's living archive. When the Quiet began to gather, she erased her own name from its records so that it could not use her memories as a doorway. The act saved the archive but left her unable to recognise the person she had been.",
    change: "She learns that remembering a name does not require returning to an old self. In the final act she chooses what to call herself, rather than accepting a name as a debt.",
  },
  {
    name: "Vey",
    role: "Ash-smith · keeper of the last public hearth",
    truth: "Vey promised Orin that a warm place would remain for anyone who arrived without a name. He has kept the small hearth alive through years of forgetting, never knowing whether the promise would be needed.",
    change: "He stops treating the promise as a vigil for one missing person and turns the hearth into a shared table. The empty chair remains, but it is no longer reserved by grief.",
  },
  {
    name: "Edda",
    role: "Keeper of Names · archivist of Frostglass",
    truth: "Edda tried to preserve every name after the first frost swept through the valley. The Quiet took her own name while she was protecting the others. She began to believe that the catalogue mattered more than the people inside it.",
    change: "She changes the library's law: the owner of a name decides whether it is recorded, spoken, changed, or left alone. The archive becomes a living place instead of a vault.",
  },
  {
    name: "Nym",
    role: "Star cartographer · keeper of possible routes",
    truth: "Nym has drawn the same atlas for a thousand years because every new route felt like a chance to fail. The blank final room was never a missing coordinate. It was a refusal to choose for the next traveller.",
    change: "Nym learns to map uncertainty and lets the constellations move. Their final chart offers several paths and leaves the destination open.",
  },
  {
    name: "Orin",
    role: "First Keeper · guardian of the Moonheart",
    truth: "Orin discovered that the Lumen could remember every life, but could not safely be held by one person. Rather than ask the kingdoms to share it, Orin chose to carry the danger alone. The five wardens helped divide the light, and Orin surrendered their name to seal the Quiet.",
    change: "Orin must accept that protection without consent can become another kind of silence. Remembering their name is the beginning of repair, not an instant absolution.",
  },
  {
    name: "The Wayfarer",
    role: "Unwritten witness · player character",
    truth: "The Wayfarer is not a prophesied monarch or a lost heir. They are the first person to emerge from the blank margin left by the Lumen: a witness with no assigned history, able to listen without inheriting the old keepers' claim.",
    change: "Their defining action is not collecting power. It is deciding what should happen to a light that remembers everyone and belongs to no one.",
  },
]

const LAWS = [
  ["The Lumen remembers, but does not judge.", "It holds the shape of a life, not a verdict about whether that life was good or worthy."],
  ["The Quiet grows where memory is carried alone.", "It gathers around silence, shame, and stories that have no safe listener. It can be met with witness and shared remembrance."],
  ["A name belongs to the person who carries it.", "A record may help someone find a name, but no archive, monarch, or keeper may decide what that name must mean."],
  ["The sixth note is the margin.", "The five notes restore what was divided. The margin is the freedom to add something the old story could not predict."],
]

const SECRETS = [
  ["Mosslight · The Seed That Waited", "A seed sealed inside a root reliquary contains the first sketch of the Wayfarer's lantern. It was planted before the observatory disappeared."],
  ["Ember · The Glass Kiln", "A kiln wall holds the outline of a second chair beside Vey's hearth. The guest was never a single person; it was a place kept open for whoever needed it."],
  ["Frostglass · The White Mirror", "The mirror reflects Edda with a name written in frost, then lets the letters melt. It proves that a name can be remembered without being forced to stay."],
  ["Astral · The Unwritten Orbit", "A hidden orbit circles the blank room. It shows that the map was designed to make space for the Wayfarer, not to predict them."],
  ["Quiet · The Room Behind Silence", "The final fragment is a memory of Auralis choosing to erase her own name. It reveals why Iri fears the lantern and why the Underlight has been waiting beneath the observatory."],
]

const ENDINGS = [
  {
    id: "shared-light",
    title: "The Shared Light",
    line: "The Lumen returns to the kingdoms, not to a throne.",
    text: "The five notes travel outward and settle into places where people can tend them together. Mosslight keeps Return in the old bell. Ember Hollow places Hearth above its public table. Frostglass lets every person decide whether their name belongs on a shelf. Nym charts Distance as a constellation visible from every roof. Witness remains in the observatory, where Iri and Orin welcome anyone who arrives without a story. The Wayfarer does not become the next Keeper. They leave the door open.",
  },
  {
    id: "quiet-keeper",
    title: "The Quiet Keeper",
    line: "The Quiet is sealed, but no one carries it alone.",
    text: "The Lumen remains beneath the observatory. Orin and Iri establish a circle of keepers, with one representative from every kingdom and a place reserved for someone who has not yet arrived. The Quiet can still be heard beyond the threshold, but it is no longer treated as an enemy to be hidden. The circle listens, records what people choose to share, and lets every keeper step away when they need rest. The Wayfarer becomes a witness to the circle, never its owner.",
  },
  {
    id: "open-sky",
    title: "The Open Sky",
    line: "The old Moonwake ends, and every kingdom becomes its own dawn.",
    text: "The five notes rise into the sky and become a new moon, bright enough to reach the deepest roots. Moonwake loosens into silver dust and settles across the kingdoms. Orin walks into the morning without a title. Iri follows the moth-lights beyond the map. The old observatory is not rebuilt. In its place, every town raises a small open roof where people can look at the same sky and tell different stories beneath it.",
  },
]

export function MoonwakeChronicle({ campaign }: { campaign: CampaignSnapshot }) {
  const ending = ENDINGS.find((item) => item.id === campaign.ending)
  const unlocked = new Set(campaign.discoveredSecrets)

  return (
    <div className="ld-story-bible">
      <section className="ld-story-intro">
        <span>THE WORLD BEFORE THE FIRST BELL</span>
        <h3>The Moonwake Testament</h3>
        <p>Moonwake was not a kingdom built to rule the night. It was an observatory built to listen: a place where the moon's phases were read as letters, eclipses as held breaths, and returning tides as promises that what had gone missing could still find its way home.</p>
        <p>At its centre rested the Lumen, a living light that remembered every name spoken beneath the sky. When it began to hold more memory than one keeper could safely carry, Orin divided it into five notes and entrusted them to the wardens of five kingdoms. The Quiet gathered around the silence left behind. The old atlas called the descent a route to a throne. The lantern calls it a route back to one another.</p>
        <a className="ld-story-full-link" href="/dungeons/story">Read the 13-volume Moonwake Testament and map chronicles <span>↗</span></a>
      </section>

      <section className="ld-story-law-grid" aria-label="The laws of Moonwake">
        {LAWS.map(([title, copy]) => <article key={title}><strong>{title}</strong><p>{copy}</p></article>)}
      </section>

      <section className="ld-story-section">
        <div className="ld-story-section-heading"><span>THE FIVE NOTES</span><h3>Five realms, five ways to remember</h3></div>
        <div className="ld-story-act-list">
          {ACTS.map((act, index) => (
            <article key={act.number} className="ld-story-act">
              <div className="ld-story-act-number">{act.number}</div>
              <div className="ld-story-act-body">
                <span>{act.realm.toUpperCase()} · {act.subtitle}</span>
                <h4>{act.title}</h4>
                <p>{act.story}</p>
                <blockquote>{act.turn}</blockquote>
                <p>{act.aftermath}</p>
                <small>VISUAL LANGUAGE · {act.image}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ld-story-section">
        <div className="ld-story-section-heading"><span>THE PEOPLE OF THE MOON</span><h3>Every keeper has a life beyond the title</h3></div>
        <div className="ld-story-cast-grid">
          {CAST.map((person) => (
            <article key={person.name}>
              <span>{person.role.toUpperCase()}</span>
              <h4>{person.name}</h4>
              <p>{person.truth}</p>
              <blockquote>{person.change}</blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="ld-story-section">
        <div className="ld-story-section-heading"><span>THE FIVE HIDDEN MARKS</span><h3>The road beneath the road</h3></div>
        <p className="ld-story-copy">The hidden fragments are not keys cut by a forgotten architect. Each one is a choice that someone made when no one else was watching. Find them all to enter the Underlight, where the sixth note waits in the margin of the story.</p>
        <div className="ld-story-secret-grid">
          {SECRETS.map(([title, copy], index) => {
            const keys = ["secret_mosslight", "secret_ember", "secret_frost", "secret_astral", "secret_quiet"]
            const found = unlocked.has(keys[index])
            return <article key={title} className={found ? "is-found" : ""}><span>{found ? "DISCOVERED" : "HIDDEN MEMORY"}</span><strong>{title}</strong><p>{found ? copy : "A fragment waits in a room already visited. Its meaning will appear when the lantern is brought close."}</p></article>
          })}
        </div>
      </section>

      <section className="ld-story-section">
        <div className="ld-story-section-heading"><span>THE LAST PAGE</span><h3>Three futures for the Lumen</h3></div>
        <div className="ld-story-ending-grid">
          {ENDINGS.map((item) => (
            <article key={item.id} className={campaign.ending === item.id ? "is-chosen" : ""}>
              <span>{campaign.ending === item.id ? "YOUR CHOSEN ENDING" : "POSSIBLE ENDING"}</span>
              <h4>{item.title}</h4>
              <strong>{item.line}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        {ending && <p className="ld-story-recorded">Your Chronicle records <strong>{ending.title}</strong>. The ending remains part of this save.</p>}
        {campaign.companionAffinity >= 4 && <p className="ld-story-bond">Iri stays beside the Wayfarer after the final choice. The observatory becomes a home they tend together, not a duty either must carry alone.</p>}
      </section>
    </div>
  )
}

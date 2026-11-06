import { readFile } from "node:fs/promises"
import { join } from "node:path"
import type { ReactNode } from "react"
import Link from "next/link"
import "./story.css"

export const metadata = {
  title: "The Moonwake Testament | Lunar",
  description: "Read the complete five-act story of Moonwake, the Lumen, the five notes, and the Quiet.",
}

const VOLUMES = [
  { file: "00-the-world-before-the-journey.md", title: "Before the Journey", subtitle: "The Lumen, the five notes, the Quiet, and the Keepers." },
  { file: "01-act-one-the-bell-beneath-the-roots.md", title: "I · The Bell Beneath the Roots", subtitle: "Mosslight Wilds · Return" },
  { file: "02-act-two-the-hearth-that-kept-the-dark.md", title: "II · The Hearth That Kept the Dark", subtitle: "Ember Hollow · Hearth" },
  { file: "03-act-three-the-library-of-unsaid-names.md", title: "III · The Library of Unsaid Names", subtitle: "Frostglass Vale · Name" },
  { file: "04-act-four-an-atlas-of-impossible-stars.md", title: "IV · An Atlas of Impossible Stars", subtitle: "Astral Archive · Distance" },
  { file: "05-act-five-the-quiet-between-heartbeats.md", title: "V · The Quiet Between Heartbeats", subtitle: "Quiet Beyond · Witness" },
  { file: "06-companions-creatures-and-afterstories.md", title: "Companions, Creatures, and Afterstories", subtitle: "Character folios, side stories, bestiary, and epilogues." },
]

function inlineMarkdown(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>
    return part
  })
}

function renderMarkdown(source: string): ReactNode[] {
  return source.trim().split(/\n\s*\n/).map((block, index) => {
    const lines = block.split("\n")
    const first = lines[0].trim()
    if (first === "---") return <hr key={index} />
    if (first.startsWith("# ")) return <h1 key={index}>{inlineMarkdown(first.slice(2))}</h1>
    if (first.startsWith("## ")) return <h2 key={index}>{inlineMarkdown(first.slice(3))}</h2>
    if (first.startsWith("### ")) return <h3 key={index}>{inlineMarkdown(first.slice(4))}</h3>
    if (lines.every((line) => /^\d+\.\s/.test(line))) {
      return <ol key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{inlineMarkdown(line.replace(/^\d+\.\s/, ""))}</li>)}</ol>
    }
    if (lines.every((line) => /^-\s/.test(line))) {
      return <ul key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{inlineMarkdown(line.replace(/^-\s/, ""))}</li>)}</ul>
    }
    if (lines.every((line) => line.startsWith("> "))) {
      return <blockquote key={index}>{lines.map((line, lineIndex) => <span key={lineIndex}>{inlineMarkdown(line.slice(2))}<br /></span>)}</blockquote>
    }
    return <p key={index}>{lines.map((line, lineIndex) => <span key={lineIndex}>{inlineMarkdown(line)}{lineIndex < lines.length - 1 && <br />}</span>)}</p>
  })
}

export default async function MoonwakeStoryPage() {
  const volumes = await Promise.all(VOLUMES.map(async (volume, index) => ({
    ...volume,
    id: `volume-${index}`,
    content: await readFile(join(process.cwd(), "public", "moonwake", volume.file), "utf8"),
  })))

  return (
    <main className="ld-story-reader">
      <div className="ld-story-reader-top">
        <Link href="/dungeons">← Return to the dungeons</Link>
        <span>LUNAR · THE MOONWAKE TESTAMENT</span>
      </div>
      <header className="ld-story-reader-hero">
        <span>THE COMPLETE CAMPAIGN STORY</span>
        <h1>A light is not made smaller by being shared.</h1>
        <p>Five kingdoms. Five notes. One unfinished promise. Read the complete Moonwake story, from the first light beneath the observatory to the choice that waits beyond the Quiet.</p>
        <div className="ld-story-reader-meta">
          <span>5 ACTS</span><span>7 VOLUMES</span><span>APPROX. 4,999 MANUSCRIPT LINES</span>
        </div>
      </header>
      <nav className="ld-story-reader-nav" aria-label="Story volumes">
        <span>CONTENTS</span>
        {volumes.map((volume) => <a key={volume.id} href={`#${volume.id}`}><strong>{volume.title}</strong><small>{volume.subtitle}</small></a>)}
      </nav>
      <div className="ld-story-reader-book">
        {volumes.map((volume) => (
          <article id={volume.id} className="ld-story-reader-volume" key={volume.id}>
            <div className="ld-story-reader-volume-head">
              <span>{volume.id.replace("volume-", "VOLUME ")}</span>
              <h2>{volume.title}</h2>
              <p>{volume.subtitle}</p>
              <a href={`/moonwake/${volume.file}`} target="_blank" rel="noreferrer">Open this volume as Markdown ↗</a>
            </div>
            <div className="ld-story-reader-prose">{renderMarkdown(volume.content)}</div>
            <a className="ld-story-reader-back" href="#top">Back to contents ↑</a>
          </article>
        ))}
      </div>
      <footer className="ld-story-reader-footer">
        <p>The story leaves the Wayfarer unnamed by design. The future is a space the player gets to shape.</p>
        <Link href="/dungeons">Return to Moonwake</Link>
      </footer>
    </main>
  )
}

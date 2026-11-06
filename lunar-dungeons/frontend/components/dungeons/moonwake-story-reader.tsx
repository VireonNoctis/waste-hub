"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { type MoonwakeInlineRun, type MoonwakeStoryBlock } from "@/lib/dungeons/moonwake-story"
import { MOONWAKE_READER_VOLUMES } from "@/lib/dungeons/moonwake-reader-index"

function InlineText({ runs }: { runs: MoonwakeInlineRun[] }) {
  return (
    <>
      {runs.map((run, index) => {
        if (run.emphasis === "strong") return <strong key={index}>{run.text}</strong>
        if (run.emphasis === "em") return <em key={index}>{run.text}</em>
        return <span key={index}>{run.text}</span>
      })}
    </>
  )
}

function StoryBlock({ block, index }: { block: MoonwakeStoryBlock; index: number }) {
  if (block.type === "divider") return <hr key={index} />
  if (block.type === "heading") {
    if (block.level === 1) return <h1 key={index}><InlineText runs={block.runs} /></h1>
    if (block.level === 2) return <h2 key={index}><InlineText runs={block.runs} /></h2>
    return <h3 key={index}><InlineText runs={block.runs} /></h3>
  }
  if (block.type === "quote") return <blockquote key={index}><InlineText runs={block.runs} /></blockquote>
  if (block.type === "list") {
    const List = block.ordered ? "ol" : "ul"
    return <List key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}><InlineText runs={item} /></li>)}</List>
  }
  return <p key={index}><InlineText runs={block.runs} /></p>
}

export default function MoonwakeStoryReader() {
  const [activeVolume, setActiveVolume] = useState(0)
  const [volumeProgress, setVolumeProgress] = useState(0)
  const [focusMode, setFocusMode] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const bookRef = useRef<HTMLDivElement>(null)
  const proseRef = useRef<HTMLElement>(null)
  const volume = MOONWAKE_READER_VOLUMES[activeVolume]
  const overallProgress = Math.round(((activeVolume + volumeProgress / 100) / MOONWAKE_READER_VOLUMES.length) * 100)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const requestedVolume = new URLSearchParams(window.location.search).get("volume")
    const requestedIndex = MOONWAKE_READER_VOLUMES.findIndex((item) => item.id === requestedVolume)
    if (requestedIndex >= 0) setActiveVolume(requestedIndex)
  }, [])

  useEffect(() => {
    let frame = 0
    const updateProgress = () => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const prose = proseRef.current
        if (!prose) return
        const top = prose.getBoundingClientRect().top
        const distance = Math.max(0, -top)
        const total = Math.max(1, prose.scrollHeight - window.innerHeight * 0.72)
        setVolumeProgress(Math.max(0, Math.min(100, Math.round((distance / total) * 100))))
      })
    }
    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)
    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [activeVolume])

  const selectVolume = useCallback((index: number) => {
    const next = Math.max(0, Math.min(MOONWAKE_READER_VOLUMES.length - 1, index))
    setActiveVolume(next)
    setVolumeProgress(0)
    window.requestAnimationFrame(() => {
      bookRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })
    })
  }, [reducedMotion])

  return (
    <main className={`ld-story-reader ${focusMode ? "is-focused" : ""}`}>
      <div className="ld-story-sky" aria-hidden="true">
        <span className="ld-story-moon" />
        <span className="ld-story-orbit ld-story-orbit-one" />
        <span className="ld-story-orbit ld-story-orbit-two" />
        <span className="ld-story-starfield" />
      </div>

      <div className="ld-story-frame">
        <header className="ld-story-top">
          <Link href="/dungeons" className="ld-story-back-link"><ArrowLeft size={14} /> BACK TO MOONWAKE</Link>
          <div className="ld-story-wordmark"><span>✦</span> LUNAR <i>/</i> THE MOONWAKE TESTAMENT</div>
          <Link href="/dungeons#dungeon-atlas" className="ld-story-atlas-link">OPEN THE ATLAS <ArrowRight size={13} /></Link>
        </header>

        <section className="ld-story-hero">
          <div className="ld-story-hero-copy">
            <span className="ld-story-kicker"><Sparkles size={12} /> THE COMPLETE CAMPAIGN ARCHIVE</span>
            <h1>A light is not made smaller by being shared.</h1>
            <p>Five kingdoms. Five notes. One unfinished promise. Follow the Wayfarer from the first light beneath the observatory to the choice that waits beyond the Quiet.</p>
            <button className="ld-story-start" onClick={() => selectVolume(0)}><BookOpen size={15} /> BEGIN THE TESTAMENT <ArrowRight size={15} /></button>
            <div className="ld-story-stats"><span>05 ACTS</span><span>13 VOLUMES</span><span>4,972 ORIGINAL LINES</span><span>6 MAP CHRONICLES</span></div>
          </div>
          <div className="ld-story-emblem" aria-hidden="true">
            <span className="ld-story-emblem-core">✦</span>
            <span className="ld-story-emblem-ring" />
            <span className="ld-story-emblem-caption">THE LUMEN · STILL REMEMBERING</span>
          </div>
        </section>

        <section className="ld-story-progress" aria-label="Reading progress">
          <div><span>YOUR PLACE IN THE TESTAMENT</span><strong>{overallProgress}%</strong></div>
          <div className="ld-story-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={overallProgress}><i style={{ width: `${overallProgress}%` }} /></div>
          <small>{volumeProgress}% through {volume.title}</small>
        </section>

        <div className="ld-story-workspace" ref={bookRef}>
          <aside className="ld-story-contents" aria-label="Choose a story volume">
            <div className="ld-story-contents-head"><span>THE TESTAMENT & MAP CHRONICLES</span><small>SELECT A CHAPTER</small></div>
            {MOONWAKE_READER_VOLUMES.map((item, index) => (
              <button
                key={item.id}
                className={`ld-story-volume-choice ${activeVolume === index ? "is-active" : ""}`}
                onClick={() => selectVolume(index)}
                aria-pressed={activeVolume === index}
              >
                <span className="ld-story-volume-number">{String(index).padStart(2, "0")}</span>
                <span className="ld-story-volume-copy"><strong>{item.title}</strong><small>{item.subtitle}</small></span>
                <ChevronRight size={14} />
              </button>
            ))}
            <div className="ld-story-contents-note"><Sparkles size={13} /><span>The Wayfarer's name is left unwritten. The final page belongs to the person reading it.</span></div>
          </aside>

          <section className="ld-story-book">
            <div className="ld-story-book-head">
              <div><span>VOLUME {String(activeVolume + 1).padStart(2, "0")} / {String(MOONWAKE_READER_VOLUMES.length).padStart(2, "0")}</span><h2>{volume.title}</h2><p>{volume.subtitle}</p></div>
              <button className="ld-story-focus-toggle" onClick={() => setFocusMode(value => !value)} aria-pressed={focusMode}>{focusMode ? "SHOW CONTENTS" : "FOCUS READING"}</button>
            </div>
            <article className="ld-story-prose ld-story-enter" ref={proseRef} key={volume.id}>
              {volume.blocks.map((block, index) => <StoryBlock key={index} block={block} index={index} />)}
            </article>
            <nav className="ld-story-chapter-controls" aria-label="Previous and next volume">
              <button onClick={() => selectVolume(activeVolume - 1)} disabled={activeVolume === 0}><ChevronLeft size={15} /><span><small>PREVIOUS VOLUME</small><strong>{MOONWAKE_READER_VOLUMES[activeVolume - 1]?.title ?? "Beginning"}</strong></span></button>
              <span className="ld-story-page-mark">{String(activeVolume + 1).padStart(2, "0")} <i>/</i> {String(MOONWAKE_READER_VOLUMES.length).padStart(2, "0")}</span>
              <button className="is-next" onClick={() => selectVolume(activeVolume + 1)} disabled={activeVolume === MOONWAKE_READER_VOLUMES.length - 1}><span><small>NEXT VOLUME</small><strong>{MOONWAKE_READER_VOLUMES[activeVolume + 1]?.title ?? "The end"}</strong></span><ChevronRight size={15} /></button>
            </nav>
          </section>
        </div>

        <footer className="ld-story-footer">
          <p>The night belongs to everyone who carries a little light.</p>
          <div><Link href="/dungeons#moonwake-campaign">RETURN TO THE CAMPAIGN</Link><span>·</span><Link href="/dungeons#dungeon-atlas">EXPLORE THE 800-STAGE ATLAS</Link></div>
        </footer>
      </div>
    </main>
  )
}

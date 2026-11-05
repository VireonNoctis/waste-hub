"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { CSSProperties } from "react"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Crown,
  Flame,
  HeartPulse,
  Lock,
  Map,
  RotateCcw,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  X,
  Zap,
} from "lucide-react"
import {
  abandonDungeon,
  getDungeonState,
  startDungeon,
  takeDungeonTurn,
} from "@/lib/dungeons/api"
import {
  DUNGEON_CHRONICLE,
  DUNGEON_ENDING,
  DUNGEON_PROLOGUE,
  DUNGEON_TIERS,
  MAP_PAGE_SIZE,
  MAP_PAGES_PER_TIER,
  STAGES_PER_TIER,
  TOTAL_STAGES,
  isBossStage,
  type DungeonAction,
  type DungeonBattle,
  type DungeonProgress,
  type DungeonTier,
  type DungeonVictoryEvent,
} from "@/lib/dungeons/contracts"
import type { WorldNode } from "./dungeon-world"
import "./dungeon-explorer.css"

const DungeonLiveWorld = dynamic(() => import("./dungeon-live-world"), {\n  ssr: false,\n  loading: () => <div className="ld-webgl-fallback">Opening the Moonwake observatory…</div>,\n})\n\nconst DungeonWorld = dynamic(() => import("./dungeon-world"), {
  ssr: false,
  loading: () => <div className="ld-webgl-fallback">Loading the pixel realm…</div>,
})

interface DungeonExplorerProps {
  /** Called after a server-confirmed victory. Rewards are intentionally handled elsewhere. */
  onVictory?: (event: DungeonVictoryEvent) => void
}

const EMPTY_PROGRESS: DungeonProgress = {
  highestUnlockedLevel: 1,
  completedLevel: 0,
  infinityUnlocked: false,
  infinityDepth: 0,
}

const STAGE_LAYOUT = [
  [-10.5, 5.0], [-5.5, 5.6], [0.1, 4.7], [6.0, 5.1], [10.7, 2.6],
  [7.6, -0.1], [2.1, -0.8], [-3.7, -1.7], [-8.8, -3.5], [-10.2, -5.6],
] as const

function stageLabel(stage: number) {
  return `STAGE ${String(stage).padStart(3, "0")}`
}

function formatTierProgress(tier: DungeonTier, progress: DungeonProgress) {
  const start = (tier.id - 1) * STAGES_PER_TIER + 1
  const end = tier.id * STAGES_PER_TIER
  const completed = Math.max(0, Math.min(end, progress.completedLevel) - start + 1)
  return { start, end, completed }
}

function HealthBar({ label, health, enemy = false }: { label: string; health: { hp: number; maxHp: number }; enemy?: boolean }) {
  const percent = Math.max(0, Math.min(100, (health.hp / Math.max(1, health.maxHp)) * 100))
  return (
    <div className="ld-health-wrap">
      <div className="ld-health-label"><span>{label}</span><strong>{health.hp} / {health.maxHp}</strong></div>
      <div className={`ld-health-track ${enemy ? "is-enemy" : ""}`}>
        <div className="ld-health-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export function DungeonExplorer({ onVictory }: DungeonExplorerProps) {
  const [progress, setProgress] = useState<DungeonProgress>(EMPTY_PROGRESS)
  const [battle, setBattle] = useState<DungeonBattle | null>(null)
  const [selectedTier, setSelectedTier] = useState(0)
  const [mapPage, setMapPage] = useState(0)
  const [selectedStage, setSelectedStage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [showRules, setShowRules] = useState(false)
  const [showChronicle, setShowChronicle] = useState(false)

  const currentTier = DUNGEON_TIERS[Math.min(4, selectedTier)]
  const currentRange = formatTierProgress(currentTier, progress)
  const firstStage = currentRange.start + mapPage * MAP_PAGE_SIZE
  const nodes = useMemo<WorldNode[]>(() => Array.from({ length: MAP_PAGE_SIZE }, (_, index) => {
    const stage = firstStage + index
    const status: WorldNode["status"] = stage <= progress.completedLevel
      ? "completed"
      : stage <= progress.highestUnlockedLevel
        ? "available"
        : "locked"
    return {
      stage,
      x: STAGE_LAYOUT[index][0],
      y: STAGE_LAYOUT[index][1],
      status,
      boss: isBossStage(stage),
    }
  }), [firstStage, progress.completedLevel, progress.highestUnlockedLevel])

  const selectedIsUnlocked = selectedStage <= progress.highestUnlockedLevel
  const selectedIsCompleted = selectedStage <= progress.completedLevel
  const currentTierProgress = formatTierProgress(currentTier, progress)
  const currentSectorName = currentTier.chapters[mapPage]
  const currentChronicle = DUNGEON_CHRONICLE[Math.min(DUNGEON_CHRONICLE.length - 1, selectedTier)]
  const battleTier = battle?.mode === "standard" ? Math.min(5, Math.floor((battle.stage - 1) / STAGES_PER_TIER) + 1) : 5
  const tierStartUnlocked = currentTierProgress.start <= progress.highestUnlockedLevel
  const currentPageStart = currentRange.start + mapPage * MAP_PAGE_SIZE
  const currentPageEnd = Math.min(currentPageStart + MAP_PAGE_SIZE - 1, currentRange.end)

  const loadState = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getDungeonState()
      setProgress(response.progress)
      setBattle(response.activeAttempt)
      if (response.activeAttempt) {
        if (response.activeAttempt.mode === "standard") {
          const tierIndex = Math.min(4, Math.floor((response.activeAttempt.stage - 1) / STAGES_PER_TIER))
          setSelectedTier(tierIndex)
          setMapPage(Math.floor(((response.activeAttempt.stage - 1) % STAGES_PER_TIER) / MAP_PAGE_SIZE))
          setSelectedStage(response.activeAttempt.stage)
        }
      } else {
        const nextStage = Math.min(TOTAL_STAGES, response.progress.highestUnlockedLevel)
        setSelectedStage(nextStage)
        const tierIndex = Math.min(4, Math.floor((nextStage - 1) / STAGES_PER_TIER))
        setSelectedTier(tierIndex)
        setMapPage(Math.floor(((nextStage - 1) % STAGES_PER_TIER) / MAP_PAGE_SIZE))
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not load dungeon progress.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void loadState() }, [loadState])

  const selectTier = (index: number) => {
    setSelectedTier(index)
    const tier = DUNGEON_TIERS[index]
    const start = (tier.id - 1) * STAGES_PER_TIER + 1
    const tierUnlocked = start <= progress.highestUnlockedLevel
    if (tierUnlocked) {
      const furthestInTier = Math.min(progress.highestUnlockedLevel, tier.id * STAGES_PER_TIER)
      const offset = Math.max(0, furthestInTier - start)
      setMapPage(Math.min(MAP_PAGES_PER_TIER - 1, Math.floor(offset / MAP_PAGE_SIZE)))
      setSelectedStage(furthestInTier)
    } else {
      setMapPage(0)
      setSelectedStage(start)
    }
  }

  const begin = async (mode: "standard" | "infinity") => {
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      const response = await startDungeon(mode, mode === "standard" ? selectedStage : undefined)
      setProgress(response.progress)
      setBattle(response.battle)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not enter this dungeon.")
    } finally {
      setBusy(false)
    }
  }

  const act = async (action: DungeonAction) => {
    if (!battle || busy || battle.status !== "active") return
    setBusy(true)
    setError(null)
    try {
      const response = await takeDungeonTurn(battle.attemptId, action)
      setBattle(response.battle)
      setProgress(response.progress)
      if (response.victory) {
        setNotice(response.battle.mode === "infinity"
          ? `Infinity depth ${response.victory.depth} cleared. The next depth is ready.`
          : `${stageLabel(response.victory.stage)} cleared. Your route has advanced.`)
        onVictory?.(response.victory)
      } else if (response.defeated) {
        setNotice("Your run ended here. You can retry this stage from the map.")
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "That action could not be completed.")
    } finally {
      setBusy(false)
    }
  }

  const leaveBattle = async () => {
    if (!battle) return
    setBusy(true)
    try {
      if (battle.status === "active") await abandonDungeon(battle.attemptId)
      if (battle.mode === "infinity") {
        setSelectedTier(5)
        setMapPage(0)
      } else {
        const stage = Math.min(TOTAL_STAGES, battle.stage)
        const tierIndex = Math.min(4, Math.floor((stage - 1) / STAGES_PER_TIER))
        setSelectedTier(tierIndex)
        setMapPage(Math.floor(((stage - 1) % STAGES_PER_TIER) / MAP_PAGE_SIZE))
        setSelectedStage(stage)
      }
      setBattle(null)
      setNotice(null)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not return to the map.")
    } finally {
      setBusy(false)
    }
  }

  const tierUnlocked = (tier: DungeonTier) => (tier.id - 1) * STAGES_PER_TIER + 1 <= progress.highestUnlockedLevel
  const changeMapPage = (page: number) => {
    const nextPage = Math.max(0, Math.min(MAP_PAGES_PER_TIER - 1, page))
    const pageStart = currentRange.start + nextPage * MAP_PAGE_SIZE
    const pageEnd = Math.min(currentRange.end, pageStart + MAP_PAGE_SIZE - 1)
    setMapPage(nextPage)
    setSelectedStage(Math.min(pageEnd, Math.max(pageStart, progress.highestUnlockedLevel)))
  }

  return (
    <main className="lunar-dungeon">
      <div className="ld-shell">
        <header className="ld-header">
          <div className="ld-brandline"><span className="ld-brand-mark">✦</span><span>LUNAR / MOONWAKE</span><span className="ld-header-divider">/</span><span className="ld-muted">EXPEDITION ATLAS</span></div>
          <div className="ld-header-main">
            <div>
              <p className="ld-eyebrow">A QUIET WORLD REMEMBERS</p>
              <h1>The Moonwake Testament</h1>
              <p className="ld-subtitle">A moonlit metroidvania across forgotten kingdoms, 800 atlas stages, and Infinity.</p>
              <p className="ld-current-chapter"><span>CHAPTER 0{currentChronicle.id}</span> {currentChronicle.title}</p>
            </div>
            <div className="ld-header-actions">
              <button className="ld-help-button" onClick={() => setShowChronicle((value) => !value)} aria-expanded={showChronicle}>
                <BookOpen size={16} /> Chronicle <ChevronDown size={14} className={showChronicle ? "ld-rotate" : ""} />
              </button>
              <button className="ld-help-button" onClick={() => setShowRules((value) => !value)} aria-expanded={showRules}>
                <CircleHelp size={16} /> How it works <ChevronDown size={14} className={showRules ? "ld-rotate" : ""} />
              </button>
            </div>
          </div>
          {showRules && (
            <div className="ld-rules-panel">
              <strong>Walk the world. Remember its people.</strong> Explore connected rooms in real time, learn movement arts from the wardens, attune shrines, uncover hidden chambers, and choose how the story ends. The 800-stage atlas and Infinity descent remain available below.
            </div>
          )}
          <div className="ld-stats-row">
            <div className="ld-stat"><span>ROUTE CLEARED</span><strong>{progress.completedLevel}<small> / 800</small></strong></div>
            <div className="ld-stat"><span>NEXT STAGE</span><strong>{progress.infinityUnlocked ? "∞" : String(progress.highestUnlockedLevel).padStart(3, "0")}</strong></div>
            <div className="ld-stat"><span>INFINITY DEPTH</span><strong>{progress.infinityUnlocked ? progress.infinityDepth : "—"}</strong></div>
            <div className="ld-progress-track"><div style={{ width: `${Math.min(100, (progress.completedLevel / TOTAL_STAGES) * 100)}%` }} /></div>
          </div>
        </header>

        <DungeonLiveWorld />\n\n        {showChronicle && (
          <section className="ld-chronicle-panel" aria-label="Campaign chronicle">
            <div className="ld-chronicle-intro">
              <div className="ld-panel-kicker">THE CHRONICLE OF ASTER</div>
              <h2>Five notes. One forgotten moon.</h2>
              <p>{DUNGEON_PROLOGUE}</p>
            </div>
            <div className="ld-chronicle-grid">
              {DUNGEON_CHRONICLE.map((chapter) => {
                const unlocked = progress.highestUnlockedLevel >= chapter.startStage
                const restored = progress.completedLevel >= chapter.endStage
                return (
                  <article key={chapter.id} className={`ld-chronicle-card ${restored ? "is-restored" : ""} ${!unlocked ? "is-sealed" : ""}`}>
                    <div className="ld-chronicle-card-top">
                      <span>ACT 0{chapter.id} · {chapter.region.toUpperCase()}</span>
                      <strong>{restored ? "MEMORY RESTORED" : unlocked ? "DISCOVERED" : "SEALED"}</strong>
                    </div>
                    <h3>{unlocked ? chapter.title : "A chapter beyond the mist"}</h3>
                    <p>{unlocked ? chapter.summary : "Reach this realm to uncover the next part of the story."}</p>
                    {unlocked && (
                      <div className="ld-chronicle-guide">
                        <span>GUIDE · {chapter.companion}</span>
                        <span>FINAL WARDEN · {chapter.boss}</span>
                        <p>{chapter.companionLine}</p>
                      </div>
                    )}
                    {restored && (
                      <div className="ld-memory-fragment">
                        <span><BookOpen size={12} /> MEMORY RESTORED · {chapter.memoryTitle}</span>
                        <p>{chapter.revelation}</p>
                        <blockquote>“{chapter.memoryText}”</blockquote>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
            {progress.completedLevel >= TOTAL_STAGES && (
              <div className="ld-chronicle-ending">
                <div className="ld-panel-kicker">THE FIFTH NOTE · TRUE ENDING</div>
                <h3>The Moon Remembers</h3>
                <p>{DUNGEON_ENDING}</p>
              </div>
            )}
          </section>
        )}

        {error && <div className="ld-alert" role="alert"><span>{error}</span><button onClick={() => setError(null)} aria-label="Dismiss error"><X size={15} /></button></div>}
        {notice && (!battle || battle.status !== "active") && <div className="ld-notice"><Check size={16} /> {notice}</div>}

        {loading ? (
          <div className="ld-loading"><span className="ld-loader" /> Reading the ancient map…</div>
        ) : battle ? (
          <section className="ld-battle-layout">
            <div className="ld-battle-art">
              <div className="ld-battle-topline"><span>ACTIVE ENCOUNTER</span><span>{battle.mode === "infinity" ? `INFINITY · DEPTH ${battle.depth}` : stageLabel(battle.stage)}</span></div>
              <div className="ld-battle-scene" data-tier={battleTier}>
                <div className="ld-battle-stars" />
                <div className="ld-player-sprite"><span>✦</span><i /></div>
                <div className={`ld-enemy-sprite ${battle.enemy.boss ? "is-boss" : ""}`}><span>{battle.enemy.boss ? "♛" : "◈"}</span><i /></div>
                <div className="ld-ground-line" />
                <div className="ld-fight-caption"><span>TURN {battle.turn}</span><b>{battle.enemy.name}</b></div>
              </div>
              {battle.enemy.boss && (
                <div className={`ld-boss-state ${battle.enemy.telegraph ? "is-charged" : ""}`}>
                  <span>{battle.enemy.phase === "awakened" ? "AWAKENED PHASE" : "SEALED PHASE"}</span>
                  <strong>{battle.enemy.telegraph ? "CHARGED STRIKE · DEFEND OR PREPARE" : "WATCH THE WARDEN'S PATTERN"}</strong>
                </div>
              )}
              {battle.enemy.modifier && (
                <div className="ld-infinity-affix"><span>INFINITY AFFINITY</span><strong>{battle.enemy.modifier}</strong></div>
              )}
              <div className="ld-battle-vitals">
                <HealthBar label="YOUR VITALITY" health={battle.player} />
                <HealthBar label={battle.enemy.name.toUpperCase()} health={battle.enemy} enemy />
              </div>
              {battle.lastTurn && (
                <div className="ld-combat-log">
                  <p><Sparkles size={13} /> {battle.lastTurn.player}</p>
                  {battle.lastTurn.enemy && <p><Flame size={13} /> {battle.lastTurn.enemy}</p>}
                </div>
              )}
            </div>
            <aside className="ld-action-panel">
              <div className="ld-panel-kicker">YOUR TURN</div>
              <h2>{battle.status === "active" ? "Choose an action" : battle.status === "won" ? "Room cleared" : "Run ended"}</h2>
              <p className="ld-action-copy">Read the room, manage your focus, and choose your next move.</p>
              {battle.status === "active" ? (
                <div className="ld-actions">
                  <button className="ld-action-button" onClick={() => void act("strike")} disabled={busy}>
                    <span className="ld-action-icon"><Swords size={19} /></span><span><strong>Arc Strike</strong><small>A steady burst of damage</small></span><ArrowRight size={16} />
                  </button>
                  <button className="ld-action-button" onClick={() => void act("guard")} disabled={busy}>
                    <span className="ld-action-icon"><Shield size={19} /></span><span><strong>Moon Guard</strong><small>Reduce the next incoming hit</small></span><ArrowRight size={16} />
                  </button>
                  <button className="ld-action-button is-focus" onClick={() => void act("focus")} disabled={busy || battle.player.hp >= battle.player.maxHp}>
                    <span className="ld-action-icon"><HeartPulse size={19} /></span><span><strong>Lantern Focus</strong><small>Restore up to 24 vitality · the enemy still acts</small></span><ArrowRight size={16} />
                  </button>
                  <button className="ld-action-button is-pulse" onClick={() => void act("pulse")} disabled={busy || battle.pulseCooldown > 0}>
                    <span className="ld-action-icon"><Zap size={19} /></span><span><strong>Star Pulse</strong><small>{battle.pulseCooldown > 0 ? `Recharging · ${battle.pulseCooldown} turn` : "A stronger burst · recharge after use"}</small></span><ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <div className={`ld-result-card ${battle.status === "won" ? "is-win" : "is-loss"}`}>
                  {battle.status === "won" ? <Trophy size={24} /> : <RotateCcw size={24} />}
                  <strong>{battle.status === "won" ? "Victory recorded" : "Try another run"}</strong>
                  <span>{battle.status === "won" ? "Your progress has been saved by the dungeon server." : "This stage remains available for another attempt."}</span>
                </div>
              )}
              {busy && <div className="ld-busy-line"><span className="ld-loader small" /> Updating the encounter…</div>}
              <button className="ld-back-map" onClick={() => void leaveBattle()} disabled={busy}><ArrowLeft size={15} /> Return to map</button>
              <div className="ld-battle-footnote">Progress is confirmed by Lunar's dungeon server. Rewards are connected separately.</div>
            </aside>
          </section>
        ) : (
          <>
            <section className="ld-tier-selector" aria-label="Dungeon tiers">
              <div className="ld-tier-label">CHOOSE YOUR REALM</div>
              <div className="ld-tier-tabs">
                {DUNGEON_TIERS.map((tier, index) => (
                  <button
                    key={tier.id}
                    className={`ld-tier-tab ${selectedTier === index ? "is-active" : ""} ${!tierUnlocked(tier) ? "is-locked" : ""}`}
                    style={{ "--tier-color": tier.color, "--tier-glow": tier.glow } as CSSProperties}
                    onClick={() => selectTier(index)}
                  >
                    <span className="ld-tier-number">0{tier.id}</span>
                    <span className="ld-tier-name">{tier.name}</span>
                    <span className="ld-tier-count">{Math.min(STAGES_PER_TIER, Math.max(0, progress.completedLevel - (tier.id - 1) * STAGES_PER_TIER))} / 160</span>
                    {!tierUnlocked(tier) && <Lock size={13} className="ld-tier-lock" />}
                  </button>
                ))}
                <button
                  className={`ld-infinity-tab ${progress.infinityUnlocked ? "is-open" : "is-locked"} ${selectedTier === 5 ? "is-active" : ""}`}
                  onClick={() => {
                    if (progress.infinityUnlocked) {
                      setSelectedTier(5)
                      setMapPage(0)
                    }
                  }}
                  disabled={!progress.infinityUnlocked}
                >
                  <span className="ld-tier-number">∞</span><span className="ld-tier-name">Infinity</span><span className="ld-tier-count">{progress.infinityUnlocked ? `DEPTH ${progress.infinityDepth}` : "CLEAR 800"}</span>
                  {!progress.infinityUnlocked && <Lock size={13} className="ld-tier-lock" />}
                </button>
              </div>
            </section>

            {selectedTier < 5 ? (
              <section className="ld-explore-layout">
                <div className="ld-map-panel">
                  <div className="ld-map-heading">
                    <div><div className="ld-map-overline">TIER 0{currentTier.id} · SECTOR {String(mapPage + 1).padStart(2, "0")} · STAGES {String(currentPageStart).padStart(3, "0")}–{currentPageEnd}</div><h2>{currentSectorName}</h2><p>{currentTier.name} · {currentTier.subtitle}</p></div>
                    <div className="ld-map-stamp"><Map size={17} /><span>PIXEL ATLAS</span></div>
                  </div>
                  <div className="ld-sector-nav">
                    <div className="ld-sector-nav-top"><span>THE DESCENT · 16 SECTORS</span><span>10 CHAMBERS EACH</span></div>
                    <div className="ld-sector-grid">
                      {Array.from({ length: MAP_PAGES_PER_TIER }, (_, index) => {
                        const sectorStart = currentRange.start + index * MAP_PAGE_SIZE
                        const sectorEnd = Math.min(currentRange.end, sectorStart + MAP_PAGE_SIZE - 1)
                        const sectorUnlocked = sectorStart <= progress.highestUnlockedLevel
                        const sectorCompleted = sectorEnd <= progress.completedLevel
                        const sectorProgress = Math.max(0, Math.min(sectorEnd, progress.completedLevel) - sectorStart + 1)
                        return (
                          <button
                            key={index}
                            className={`ld-sector-chip ${mapPage === index ? "is-active" : ""} ${sectorCompleted ? "is-complete" : ""} ${!sectorUnlocked ? "is-locked" : ""}`}
                            onClick={() => changeMapPage(index)}
                            disabled={!sectorUnlocked}
                            title={`${currentTier.chapters[index]} · Stages ${sectorStart}–${sectorEnd}`}
                            aria-label={`Sector ${index + 1}: ${currentTier.chapters[index]}${sectorCompleted ? ", cleared" : sectorUnlocked ? ", unlocked" : ", locked"}`}
                          >
                            <span className="ld-sector-number">{String(index + 1).padStart(2, "0")}</span>
                            <span className="ld-sector-name">{currentTier.chapters[index]}</span>
                            <span className="ld-sector-meter"><i style={{ width: `${sectorCompleted ? 100 : (sectorProgress / MAP_PAGE_SIZE) * 100}%` }} /></span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="ld-map-window" style={{ "--tier-color": currentTier.color, "--tier-glow": currentTier.glow } as CSSProperties}>
                    <DungeonWorld nodes={nodes} color={currentTier.color} glow={currentTier.glow} tier={currentTier.id} />
                    <div className="ld-map-overlay">
                      {nodes.map((node) => (
                        <button
                          key={node.stage}
                          className={`ld-map-node ${node.status} ${node.boss ? "is-boss" : ""} ${selectedStage === node.stage ? "is-selected" : ""}`}
                          style={{ left: `calc(50% + ${node.x * 24}px)`, top: `calc(50% - ${node.y * 24}px)` }}
                          onClick={() => {
                            if (node.status !== "locked") setSelectedStage(node.stage)
                          }}
                          disabled={node.status === "locked"}
                          aria-label={`${stageLabel(node.stage)}${node.boss ? ", boss room" : ""}, ${node.status}`}
                        >
                          {node.status === "completed" ? <Check size={15} /> : node.status === "locked" ? <Lock size={13} /> : node.boss ? <Crown size={15} /> : String(node.stage)}
                        </button>
                      ))}
                    </div>
                    <div className="ld-map-coordinate">SECTOR {String(mapPage + 1).padStart(2, "0")} / 16</div>
                    <div className="ld-map-axis">NORTH ROUTE <ArrowDown size={12} /></div>
                  </div>
                  <div className="ld-map-footer">
                    <div className="ld-map-legend"><span><i className="legend-cleared" /> CLEARED</span><span><i className="legend-open" /> OPEN</span><span><i className="legend-locked" /> SEALED</span><span><i className="legend-boss">♛</i> BOSS</span></div>
                    <div className="ld-map-pages">
                      <button onClick={() => changeMapPage(mapPage - 1)} disabled={mapPage === 0}><ArrowLeft size={14} /> PREV</button>
                      <span>{currentPageStart}–{currentPageEnd}</span>
                      <button onClick={() => changeMapPage(mapPage + 1)} disabled={mapPage === MAP_PAGES_PER_TIER - 1}><span>NEXT</span> <ArrowRight size={14} /></button>
                    </div>
                  </div>
                </div>

                <aside className="ld-stage-panel">
                  <div className="ld-stage-panel-kicker">SELECTED ROOM</div>
                  <div className="ld-stage-emblem" style={{ "--tier-color": currentTier.color } as CSSProperties}>{isBossStage(selectedStage) ? <Crown size={29} /> : <Sparkles size={29} />}</div>
                  <p className="ld-stage-tier">{currentTier.name.toUpperCase()} / {currentSectorName.toUpperCase()}</p>
                  <h2>{stageLabel(selectedStage)}</h2>
                  <div className="ld-stage-tags"><span>{isBossStage(selectedStage) ? "BOSS ROOM" : "STANDARD ROOM"}</span><span>{selectedIsCompleted ? "CLEARED" : selectedIsUnlocked ? "AVAILABLE" : "SEALED"}</span></div>
                  <div className="ld-stage-divider" />
                  <div className="ld-stage-facts"><div><span>SECTOR</span><strong>{String(mapPage + 1).padStart(2, "0")} / 16</strong></div><div><span>CHAMBER</span><strong>{String(selectedStage - currentPageStart + 1).padStart(2, "0")} / 10</strong></div><div><span>ROUTE STATUS</span><strong>{selectedIsCompleted ? "CLEARED" : selectedIsUnlocked ? "READY" : "LOCKED"}</strong></div><div><span>GATE</span><strong>{isBossStage(selectedStage) ? "BOSS SEAL" : "OPEN PATH"}</strong></div></div>
                  {selectedIsUnlocked ? (
                    <button className="ld-enter-button" onClick={() => void begin("standard")} disabled={busy || !tierStartUnlocked}>
                      <span>{selectedIsCompleted ? "RE-ENTER ROOM" : "ENTER DUNGEON"}</span><ArrowRight size={17} />
                    </button>
                  ) : (
                    <div className="ld-locked-message"><Lock size={16} /><span>Clear the previous rooms to open this stage.</span></div>
                  )}
                  <div className="ld-stage-note"><Shield size={14} /><span>Battle progress is saved when the server confirms the result.</span></div>
                </aside>
              </section>
            ) : (
              <section className="ld-infinity-panel">
                <div className="ld-infinity-glyph">∞</div>
                <p className="ld-map-overline">POST-CLEAR CONTENT · UNBOUNDED</p>
                <h2>The Endless</h2>
                <p>Stage 800 was only the final door. Infinity opens a shifting underworld of endless chambers. Each confirmed victory pushes your descent deeper, while every tenth depth becomes a boss encounter.</p>
                <div className="ld-infinity-map" aria-hidden="true"><i /><i /><i /><i /><span>∞</span></div>
                <div className="ld-infinity-stats"><div><span>CURRENT DEPTH</span><strong>{progress.infinityDepth}</strong></div><div><span>NEXT ENCOUNTER</span><strong>{progress.infinityDepth + 1}</strong></div><div><span>LIMIT</span><strong>NONE</strong></div></div>
                <button className="ld-enter-button infinity" onClick={() => void begin("infinity")} disabled={busy}><span>{progress.infinityDepth ? "CONTINUE INFINITY" : "ENTER INFINITY"}</span><ArrowRight size={17} /></button>
              </section>
            )}
          </>
        )}
        <footer className="ld-footer"><span>LUNAR DUNGEON ATLAS</span><span>800 STAGES · 5 TIERS · ONE ENDLESS FRONTIER</span><button onClick={() => void loadState()} disabled={loading || busy}><RotateCcw size={12} /> SYNC PROGRESS</button></footer>
      </div>
    </main>
  )
}

export default DungeonExplorer

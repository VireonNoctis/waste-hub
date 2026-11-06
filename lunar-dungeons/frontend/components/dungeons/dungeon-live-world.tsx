"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import type { MutableRefObject } from "react"
import * as THREE from "three"
import { BookOpen, Heart, Map, Maximize2, Minimize2, Pause, Play, Settings2, ShieldCheck, Sparkles, Wind, X } from "lucide-react"
import {
  BESTIARY_ENTRIES,
  CAMPAIGN_CHAPTERS,
  DEFAULT_ACCESSIBILITY,
  LUNAR_ENDINGS,
  MOONWAKE_PROLOGUE,
  QUEST_CHOICES,
  WORLD_ROOMS,
  WORLD_ROOM_BY_ID,
} from "@/lib/dungeons/campaign"
import type {
  AccessibilitySettings,
  CampaignEventKind,
  CampaignRoom,
  CampaignSnapshot,
} from "@/lib/dungeons/campaign"
import { getCampaign, sendCampaignEvent } from "@/lib/dungeons/api"
import { MOONWAKE_MILESTONE_STORIES, MOONWAKE_ROOM_STORY_VOLUMES } from "@/lib/dungeons/moonwake-reader-index"
import { MoonwakeChronicle } from "./moonwake-chronicle"
import "./dungeon-live-world.css"

type Action = keyof AccessibilitySettings["controls"]
type InputState = { held: Set<Action>; pressed: Set<Action> }
type HudState = {
  hp: number
  maxHp: number
  enemyHp: number
  enemyMaxHp: number
  enemyName: string
  boss: boolean
  phase: "sealed" | "awakened" | null
  telegraph: boolean
  prompt: string
  message: string
}
type NpcConversation = NonNullable<CampaignRoom["npc"]>

const EMPTY_HUD: HudState = {
  hp: 100, maxHp: 100, enemyHp: 0, enemyMaxHp: 0, enemyName: "",
  boss: false, phase: null, telegraph: false, prompt: "", message: "",
}

function displayKey(code: string) {
  const arrows: Record<string, string> = { ArrowLeft: "←", ArrowRight: "→", ArrowUp: "↑", ArrowDown: "↓" }
  if (code === "Space") return "SPACE"
  return arrows[code] ?? code.replace(/^Key/, "").replace(/^Digit/, "")
}

function PlayerSprite({ playerRef }: { playerRef: MutableRefObject<THREE.Group | null> }) {
  return (
    <group ref={playerRef} position={[-9, -3.7, 1]}>
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[0.72, 0.8, 0.2]} />
        <meshBasicMaterial color="#aeb8e8" />
      </mesh>
      <mesh position={[0, 0.42, 0.02]}>
        <boxGeometry args={[0.64, 0.48, 0.22]} />
        <meshBasicMaterial color="#e8e7ff" />
      </mesh>
      <mesh position={[0.17, 0.44, 0.16]}>
        <boxGeometry args={[0.08, 0.09, 0.025]} />
        <meshBasicMaterial color="#343657" />
      </mesh>
      <mesh position={[-0.17, 0.44, 0.16]}>
        <boxGeometry args={[0.08, 0.09, 0.025]} />
        <meshBasicMaterial color="#343657" />
      </mesh>
      <mesh position={[0, -0.62, -0.02]}>
        <boxGeometry args={[0.94, 0.2, 0.16]} />
        <meshBasicMaterial color="#716c9f" />
      </mesh>
      <mesh position={[0.42, -0.12, -0.08]} rotation={[0, 0, -0.22]}>
        <boxGeometry args={[0.12, 0.9, 0.12]} />
        <meshBasicMaterial color="#d9d5f8" />
      </mesh>
      <mesh position={[-0.48, 0.02, 0.03]}>
        <boxGeometry args={[0.18, 0.24, 0.12]} />
        <meshBasicMaterial color="#d4e5f0" />
      </mesh>
    </group>
  )
}

function WorldBackdrop({ room }: { room: CampaignRoom }) {
  const stars = useMemo(() => Array.from({ length: 72 }, (_, i) => ({
    x: -14 + ((i * 37) % 280) / 10,
    y: -0.2 + ((i * 53) % 105) / 10,
    size: 0.035 + (i % 4) * 0.018,
    alpha: 0.28 + (i % 5) * 0.11,
  })), [room.region])
  return (
    <group>
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[34, 14]} />
        <meshBasicMaterial color={room.background} />
      </mesh>
      <mesh position={[0, -0.6, -4.4]}>
        <planeGeometry args={[34, 8]} />
        <meshBasicMaterial color={room.midground} transparent opacity={0.34} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} position={[-14 + i * 3.5, -1.65 + (i % 3) * 0.45, -3.5]}>
          <boxGeometry args={[2.1 + (i % 2) * 0.8, 3.2 + (i % 4) * 0.5, 0.2]} />
          <meshBasicMaterial color="#101426" transparent opacity={0.48} />
        </mesh>
      ))}
      {room.region === "moonwake" && (
        <group position={[-8.8, 0.2, -3.2]}>
          <mesh>
            <torusGeometry args={[3.25, 0.24, 4, 12, Math.PI]} />
            <meshBasicMaterial color="#aaa6d7" transparent opacity={0.62} />
          </mesh>
          <mesh position={[0, -2.1, 0]}>
            <boxGeometry args={[7.2, 0.22, 0.3]} />
            <meshBasicMaterial color="#8e8abf" />
          </mesh>
          <mesh position={[0, 0.25, -0.2]}>
            <circleGeometry args={[0.75, 8]} />
            <meshBasicMaterial color="#dfd9ff" transparent opacity={0.38} />
          </mesh>
        </group>
      )}
      {room.region === "mosslight" && (
        <group>
          {[-10, -5, 4, 10].map((x, i) => (
            <group key={x} position={[x, -0.8, -2.8]}>
              <mesh rotation={[0, 0, i % 2 ? -0.38 : 0.32]}>
                <cylinderGeometry args={[0.12, 0.32, 6.4, 5]} />
                <meshBasicMaterial color="#476c64" />
              </mesh>
              <mesh position={[i % 2 ? 0.7 : -0.6, -2.2, 0.25]}>
                <cylinderGeometry args={[0.08, 0.12, 0.8, 5]} />
                <meshBasicMaterial color="#b5d8ba" />
              </mesh>
              <mesh position={[i % 2 ? 0.7 : -0.6, -1.7, 0.25]}>
                <sphereGeometry args={[0.42, 6, 4]} />
                <meshBasicMaterial color="#b4a8d9" />
              </mesh>
            </group>
          ))}
        </group>
      )}
      {room.region === "ember" && (
        <group>
          {[-10, -4, 4, 10].map((x, i) => (
            <group key={x} position={[x, -1.5, -2.5]}>
              <mesh>
                <boxGeometry args={[1.3, 5.2 + (i % 2) * 1.2, 0.5]} />
                <meshBasicMaterial color="#533443" />
              </mesh>
              <mesh position={[0, -0.1, 0.29]}>
                <boxGeometry args={[0.22, 2.1, 0.06]} />
                <meshBasicMaterial color="#e6a1a5" transparent opacity={0.72} />
              </mesh>
              <mesh position={[0, 2.1, 0]}>
                <coneGeometry args={[0.95, 0.55, 4]} />
                <meshBasicMaterial color="#a66b88" />
              </mesh>
            </group>
          ))}
        </group>
      )}
      {room.region === "frost" && (
        <group>
          {[-11, -7, -2, 4, 9, 12].map((x, i) => (
            <mesh key={x} position={[x, -1.5 + (i % 2) * 0.4, -2.6]} rotation={[0, 0, (i % 2 ? -1 : 1) * 0.14]}>
              <coneGeometry args={[0.9 + (i % 3) * 0.24, 3.4 + (i % 2) * 1.8, 5]} />
              <meshBasicMaterial color={i % 2 ? "#7899bd" : "#a8c9dc"} transparent opacity={0.72} />
            </mesh>
          ))}
        </group>
      )}
      {room.region === "astral" && (
        <group position={[0, 1, -2.4]}>
          <mesh rotation={[0, 0, 0.24]}>
            <torusGeometry args={[5.2, 0.035, 3, 36]} />
            <meshBasicMaterial color="#b7a7eb" transparent opacity={0.7} />
          </mesh>
          <mesh rotation={[0, 0, -0.62]}>
            <torusGeometry args={[3.6, 0.04, 3, 32]} />
            <meshBasicMaterial color="#dacafa" transparent opacity={0.56} />
          </mesh>
          <mesh rotation={[0, 0, 1.05]}>
            <torusGeometry args={[2.2, 0.035, 3, 28]} />
            <meshBasicMaterial color="#8c8cce" transparent opacity={0.64} />
          </mesh>
        </group>
      )}
      {(room.region === "quiet" || room.region === "underlight") && (
        <group>
          {[-10, -5, 1, 7, 11].map((x, i) => (
            <mesh key={x} position={[x, -1 + (i % 3) * 0.45, -2.5]} rotation={[0, 0, (i % 2 ? 1 : -1) * 0.28]}>
              <boxGeometry args={[0.28, 4 + (i % 2), 0.3]} />
              <meshBasicMaterial color={room.accent} transparent opacity={0.34} />
            </mesh>
          ))}
          <mesh position={[0, 1.2, -2.3]} rotation={[0, 0, Math.PI / 4]}>
            <octahedronGeometry args={[2.1, 0]} />
            <meshBasicMaterial color="#cdb2e4" transparent opacity={0.1} />
          </mesh>
        </group>
      )}
      <mesh position={[8.8, 4.4, -3.1]}>
        <circleGeometry args={[1.25, 8]} />
        <meshBasicMaterial color={room.accent} transparent opacity={0.1} />
      </mesh>
      <mesh position={[8.8, 4.4, -3]}>
        <circleGeometry args={[0.82, 8]} />
        <meshBasicMaterial color={room.background} />
      </mesh>
      {stars.map((star, index) => (
        <mesh key={index} position={[star.x, star.y, -2.9]}>
          <boxGeometry args={[star.size, star.size, 0.02]} />
          <meshBasicMaterial color="#e6e2ff" transparent opacity={star.alpha} />
        </mesh>
      ))}
    </group>
  )
}

interface LiveSceneProps {
  room: CampaignRoom
  enemyEnabled: boolean
  serverBossHp: number | null
  abilities: string[]
  foundLore: string[]
  foundSecrets: string[]
  settings: AccessibilitySettings
  inputRef: MutableRefObject<InputState>
  paused: boolean
  onHud: (hud: HudState) => void
  onEvent: (action: "lore" | "secret" | "bestiary" | "boss-hit", key: string) => void
  onRoomExit: (roomId: string) => void
  onNpc: (npc: NpcConversation) => void
  onCheckpoint: (title: string) => void
  onRespawn: () => void
}

function LiveScene({
  room, enemyEnabled, serverBossHp, abilities, foundLore, foundSecrets, settings, inputRef, paused,
  onHud, onEvent, onRoomExit, onNpc, onCheckpoint, onRespawn,
}: LiveSceneProps) {
  const playerRef = useRef<THREE.Group>(null)
  const enemyRef = useRef<THREE.Group>(null)
  const warningRef = useRef<THREE.Mesh>(null)
  const reportedBestiary = useRef(false)
  const eventCooldown = useRef(0)
  const lastRoomId = useRef("")
  const game = useRef({
    x: room.spawn, y: -3.7, vx: 0, vy: 0, facing: 1, hp: 100,
    grounded: false, jumps: 0, dashTime: 0, invulnerable: 0,
    enemyX: 4.5, enemyY: -3.7, enemyHp: enemyEnabled ? room.enemy?.hp ?? 0 : 0,
    enemyClock: 0, enemyTelegraph: false, enemyHitFlash: 0, enemyAlive: enemyEnabled, warningX: 4.5,
    lastAttack: -2, interactLock: 0, shake: 0, lastPrompt: "", timeSinceHud: 0,
    coyoteTime: 0, jumpBuffer: 0, grappleCooldown: 0,
  })

  useEffect(() => {
    const current = game.current
    const roomChanged = lastRoomId.current !== room.id
    if (!roomChanged) {
      if (!enemyEnabled) {
        current.enemyAlive = false
        current.enemyHp = 0
      } else if (room.enemy?.kind === "boss" && serverBossHp !== null) {
        current.enemyHp = serverBossHp
        current.enemyAlive = serverBossHp > 0
      }
      return
    }
    lastRoomId.current = room.id
    current.x = room.spawn
    current.y = -3.7
    current.vx = 0
    current.vy = 0
    current.hp = 100
    current.grounded = false
    current.jumps = 0
    current.dashTime = 0
    current.invulnerable = 0
    current.enemyX = 4.5
    current.enemyY = room.enemy?.kind === "float" ? -1.7 : -3.7
    current.enemyHp = enemyEnabled ? (room.enemy?.kind === "boss" ? serverBossHp ?? room.enemy.hp : room.enemy?.hp ?? 0) : 0
    current.enemyClock = 0
    current.enemyTelegraph = false
    current.enemyAlive = enemyEnabled
    current.warningX = 4.5
    current.lastAttack = -2
    current.coyoteTime = 0
    current.jumpBuffer = 0
    current.grappleCooldown = 0
    reportedBestiary.current = false
  }, [room.id, room.spawn, room.enemy, enemyEnabled, serverBossHp])

  useFrame((state, rawDelta) => {
    if (paused) {
      inputRef.current.held.clear()
      inputRef.current.pressed.clear()
      return
    }
    const dt = Math.min(rawDelta, 0.035)
    const p = game.current
    const input = inputRef.current
    const held = input.held
    const pressed = input.pressed
    const left = held.has("left")
    const right = held.has("right")
    const move = (right ? 1 : 0) - (left ? 1 : 0)
    p.jumpBuffer = pressed.has("jump") ? 0.15 : Math.max(0, p.jumpBuffer - dt)
    p.coyoteTime = p.grounded ? 0.12 : Math.max(0, p.coyoteTime - dt)
    p.grappleCooldown = Math.max(0, p.grappleCooldown - dt)

    if (p.dashTime > 0) {
      p.dashTime = Math.max(0, p.dashTime - dt)
      p.vx = p.facing * 18
      p.vy = 0
    } else {
      p.vx = THREE.MathUtils.damp(p.vx, move * 7.3, 13, dt)
      if (move !== 0) p.facing = move
      p.vy -= 24 * dt
    }

    if (p.jumpBuffer > 0) {
      const touchingWall = Math.abs(p.x) > 12.2 || room.platforms.some((platform) => (
        Math.abs(Math.abs(p.x - platform.x) - platform.width / 2 - 0.35) < 0.32
        && p.y < platform.y + 2.2 && p.y > platform.y - 0.7
      ))
      if (p.grounded || p.coyoteTime > 0) {
        p.vy = 10.5
        p.grounded = false
        p.jumps = 1
        p.coyoteTime = 0
        p.jumpBuffer = 0
      } else if (touchingWall && abilities.includes("wall-jump")) {
        p.vy = 10.2
        p.vx = p.x < 0 ? 8.5 : -8.5
        p.facing = p.x < 0 ? 1 : -1
        p.jumps = 1
        p.jumpBuffer = 0
      } else if (abilities.includes("double-jump") && p.jumps < 2) {
        p.vy = 9.7
        p.jumps += 1
        p.jumpBuffer = 0
      }
    }

    if (pressed.has("dash") && abilities.includes("dash") && p.dashTime <= 0) {
      p.dashTime = 0.17
      p.invulnerable = Math.max(p.invulnerable, 0.2)
    }
    if (pressed.has("grapple") && abilities.includes("grapple") && p.grappleCooldown <= 0) {
      const anchor = room.platforms
        .map((platform) => ({ x: platform.x, y: platform.y + 0.55 }))
        .filter((point) => point.y > p.y + 0.35 && Math.abs(point.x - p.x) < 9)
        .sort((a, b) => Math.hypot(a.x - p.x, a.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y))[0]
      if (anchor) {
        p.vx = THREE.MathUtils.clamp((anchor.x - p.x) * 1.8, -12, 12)
        p.vy = THREE.MathUtils.clamp(10.8 + (anchor.y - p.y) * 0.22, 10.8, 14)
        p.facing = anchor.x >= p.x ? 1 : -1
        p.grounded = false
        p.jumps = 1
        p.grappleCooldown = 0.72
      }
    }

    const oldY = p.y
    p.x += p.vx * dt
    p.y += p.vy * dt
    p.x = THREE.MathUtils.clamp(p.x, -13.45, 13.45)

    const floorY = -4.55
    if (p.y - 0.7 <= floorY) {
      p.y = floorY + 0.7
      p.vy = 0
      p.grounded = true
      p.jumps = 0
    } else {
      p.grounded = false
    }
    for (const platform of room.platforms) {
      const crossed = p.vy <= 0 && oldY - 0.7 >= platform.y && p.y - 0.7 <= platform.y
      if (crossed && Math.abs(p.x - platform.x) <= platform.width / 2 + 0.35) {
        p.y = platform.y + 0.72
        p.vy = 0
        p.grounded = true
        p.jumps = 0
      }
    }

    if (p.enemyAlive && room.enemy) {
      p.enemyClock += dt
      p.enemyHitFlash = Math.max(0, p.enemyHitFlash - dt)
      const boss = room.enemy.kind === "boss"
      const phaseTwo = boss && p.enemyHp <= (room.enemy.hp / 2)
      const cycleLength = boss ? (phaseTwo ? 2.8 : 3.7) : 3.25
      const cycle = p.enemyClock % cycleLength
      const patternIndex = Math.floor(p.enemyClock / cycleLength)
      const distance = Math.abs(p.x - p.enemyX)
      let targetX = p.enemyX

      if (room.enemy.kind === "ground") {
        p.enemyX += Math.sign(p.x - p.enemyX) * Math.min(1.4 * dt, distance * 0.12)
      } else if (room.enemy.kind === "float") {
        p.enemyY = settings.reducedMotion ? -1.8 : -1.8 + Math.sin(p.enemyClock * 1.6) * 0.6
        p.enemyX += Math.sin(p.enemyClock * 0.7) * dt * 0.7
      } else {
        p.enemyX = 5.3 + Math.sin(p.enemyClock * 0.58) * 1.7
      }

      if (boss) {
        if (room.enemy.id === "hollow_monarch") targetX = patternIndex % 2 === 0 ? -5.2 : 5.2
        else if (room.enemy.id === "astral_warden") targetX = Math.sin(patternIndex * 1.7) * 5.4
        else if (room.enemy.id === "orin_first_keeper") targetX = 0
        else if (room.enemy.id === "eclipse_warden") targetX = patternIndex % 2 === 0 ? 6.2 : -6.2
      }
      p.warningX = targetX
      p.enemyTelegraph = cycle > cycleLength - 0.9

      if (!reportedBestiary.current && distance < 9) {
        reportedBestiary.current = true
        onEvent("bestiary", room.enemy.id)
      }

      const attackMoment = cycle > cycleLength - 0.08 && cycle < cycleLength
      let attackHits = false
      if (boss) {
        switch (room.enemy.id) {
          case "verdant_colossus":
            attackHits = Math.abs(p.x - targetX) < 8 && p.y < -2.8
            break
          case "ember_sovereign":
            attackHits = Math.abs(p.x - targetX) < 8.6 && p.y < -2.0
            break
          case "hollow_monarch":
          case "astral_warden":
          case "eclipse_warden":
            attackHits = Math.abs(p.x - targetX) < 2.45 && p.y < -0.35
            break
          case "orin_first_keeper":
            attackHits = Math.abs(p.x - targetX) < 8.2 && p.y < -1.7
            break
          default:
            attackHits = distance < 7.2 && Math.abs(p.y - p.enemyY) < 2.3
        }
      } else {
        switch (room.enemy.id) {
          case "mossling":
          case "ash_hound":
            attackHits = distance < 2.1 && Math.abs(p.y - p.enemyY) < 1.7
            break
          case "thorn_sprite":
          case "frost_echo":
            attackHits = distance < 2.45 && Math.abs(p.y - p.enemyY) < 2.1
            break
          case "cinder_wisp":
          case "quietling":
            attackHits = distance < 3.25 && p.y < -2.1
            break
          case "star_construct":
          case "astral_drake":
            attackHits = distance < 2.9 && Math.abs(p.y - p.enemyY) < 2.4
            break
          case "eclipse_shade":
            attackHits = distance < 2.55 && Math.abs(p.y - p.enemyY) < 1.9
            break
          default:
            attackHits = distance < 2.3 && Math.abs(p.y - p.enemyY) < 2
        }
      }

      if (attackMoment && attackHits && p.invulnerable <= 0) {
        p.hp = Math.max(0, p.hp - (boss ? (phaseTwo ? 17 : 13) : 10))
        p.vx = p.x < targetX ? -4.5 : 4.5
        p.invulnerable = 0.75
        p.shake = settings.cameraShake && !settings.reducedMotion ? 0.2 : 0
      }
      if (pressed.has("attack") && state.clock.elapsedTime - p.lastAttack > 0.3) {
        p.lastAttack = state.clock.elapsedTime
        if (distance < 2.8 && Math.abs(p.y - p.enemyY) < 2.3) {
          p.enemyHp = Math.max(0, p.enemyHp - (boss ? 23 : 30))
          p.enemyHitFlash = 0.12
          if (boss) onEvent("boss-hit", room.enemy.id)
          if (p.enemyHp <= 0) p.enemyAlive = false
        }
      }
    } else if (pressed.has("attack")) {
      p.lastAttack = state.clock.elapsedTime
    }

    p.invulnerable = Math.max(0, p.invulnerable - dt)
    p.shake = Math.max(0, p.shake - dt)
    p.interactLock = Math.max(0, p.interactLock - dt)
    eventCooldown.current = Math.max(0, eventCooldown.current - dt)

    let prompt = ""
    const npcNear = room.npc && Math.abs(p.x - (room.npc.id === "iri" ? 0 : 7.5)) < 1.8 && Math.abs(p.y + 3.7) < 1.5
    const loreNear = room.lore && !foundLore.includes(room.lore.id) && Math.abs(p.x - room.lore.x) < 1.65 && Math.abs(p.y + 3.7) < 2.2
    const shrineNear = room.shrine && Math.abs(p.x - room.shrine.x) < 1.5 && Math.abs(p.y + 3.7) < 1.7
    const secretNear = room.secret && !foundSecrets.includes(room.secret.id) && Math.abs(p.x - room.secret.x) < 1.55
    const nearbyExit = room.exits.find((exit) => Math.abs(p.x - exit.x) < 1.25)
    if (npcNear) prompt = "E · Speak with " + room.npc?.name
    else if (loreNear) prompt = "E · Read " + room.lore?.title
    else if (shrineNear) prompt = "E · Attune " + room.shrine?.title
    else if (secretNear) prompt = "E · Reveal hidden passage"
    else if (nearbyExit) prompt = "E · Enter " + nearbyExit.label
    if (pressed.has("interact") && p.interactLock <= 0 && eventCooldown.current <= 0) {
      p.interactLock = 0.22
      if (npcNear && room.npc) onNpc(room.npc)
      else if (loreNear && room.lore) {
        onEvent("lore", room.lore.id)
        eventCooldown.current = 1
      } else if (shrineNear && room.shrine) {
        onCheckpoint(room.shrine.title)
        p.hp = 100
        eventCooldown.current = 1
      } else if (secretNear && room.secret) {
        onEvent("secret", room.secret.id)
        eventCooldown.current = 1
      } else if (nearbyExit) {
        const required = nearbyExit.ability
        const allowed = !required || (required === "five-secrets" ? foundSecrets.length >= 5 : abilities.includes(required))
        if (allowed) onRoomExit(nearbyExit.target)
        else prompt = required === "five-secrets" ? "Five hidden marks are needed" : "Sealed · requires " + required.replace("-", " ")
      }
    }

    if (p.hp <= 0) {
      p.hp = 100
      p.x = room.spawn
      p.y = -3.7
      p.vx = 0
      p.vy = 0
      p.enemyAlive = false
      onRespawn()
    }

    const player = playerRef.current
    if (player) {
      player.position.set(p.x, p.y, 1)
      player.scale.x = p.facing
      player.visible = p.invulnerable <= 0 || Math.floor(state.clock.elapsedTime * 18) % 2 === 0
    }
    const enemy = enemyRef.current
    if (enemy) {
      enemy.position.set(p.enemyX, p.enemyY, 0.8)
      enemy.visible = p.enemyAlive
      enemy.scale.setScalar(p.enemyHitFlash > 0 ? 1.12 : 1)
    }
    if (warningRef.current) {
      warningRef.current.visible = p.enemyTelegraph && p.enemyAlive
      warningRef.current.position.set(p.warningX, -4.45, 0.25)
      warningRef.current.scale.set(1.6 + Math.sin(state.clock.elapsedTime * 18) * 0.12, 0.18, 1)
    }

    const camera = state.camera
    camera.position.x = THREE.MathUtils.damp(camera.position.x, p.x * 0.35, 3.1, dt)
    const shake = p.shake > 0 ? Math.sin(state.clock.elapsedTime * 80) * p.shake * 0.16 : 0
    camera.position.y = THREE.MathUtils.damp(camera.position.y, shake, 4, dt)

    p.timeSinceHud += dt
    if (p.timeSinceHud > 0.12) {
      p.timeSinceHud = 0
      onHud({
        hp: p.hp,
        maxHp: 100,
        enemyHp: p.enemyAlive ? p.enemyHp : 0,
        enemyMaxHp: room.enemy?.hp ?? 0,
        enemyName: room.enemy?.name ?? "",
        boss: room.enemy?.kind === "boss" && p.enemyAlive,
        phase: room.enemy?.kind === "boss" && p.enemyAlive ? (p.enemyHp <= (room.enemy.hp / 2) ? "awakened" : "sealed") : null,
        telegraph: p.enemyTelegraph && p.enemyAlive,
        prompt,
        message: p.enemyTelegraph ? "A pattern is gathering. Find the safe lane." : "",
      })
    }
    input.pressed.clear()
  })

  return (
    <>
      <WorldBackdrop room={room} />
      <mesh position={[0, -4.82, -0.3]}>
        <boxGeometry args={[30, 0.55, 0.5]} />
        <meshBasicMaterial color="#171a2a" />
      </mesh>
      <mesh position={[0, -4.5, 0]}>
        <boxGeometry args={[30, 0.08, 0.28]} />
        <meshBasicMaterial color={room.accent} transparent opacity={0.65} />
      </mesh>
      {room.platforms.map((platform, index) => (
        <group key={index} position={[platform.x, platform.y, 0]}>
          <mesh>
            <boxGeometry args={[platform.width, 0.28, 0.4]} />
            <meshBasicMaterial color="#252943" />
          </mesh>
          <mesh position={[0, 0.15, 0.02]}>
            <boxGeometry args={[platform.width, 0.06, 0.42]} />
            <meshBasicMaterial color={room.accent} />
          </mesh>
          {Array.from({ length: Math.floor(platform.width / 0.55) }, (_, i) => (
            <mesh key={i} position={[-platform.width / 2 + 0.28 + i * 0.55, -0.19, 0.03]}>
              <boxGeometry args={[0.18, 0.22, 0.1]} />
              <meshBasicMaterial color="#12162a" />
            </mesh>
          ))}
        </group>
      ))}
      {room.exits.map((exit) => (
        <group key={exit.target} position={[exit.x, -3.25, -0.2]}>
          <mesh>
            <boxGeometry args={[0.74, 2.55, 0.18]} />
            <meshBasicMaterial color="#b8afd9" transparent opacity={0.15} />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <boxGeometry args={[0.08, 2.5, 0.08]} />
            <meshBasicMaterial color={room.accent} />
          </mesh>
          <mesh position={[0, 0.9, 0.14]}>
            <circleGeometry args={[0.24, 6]} />
            <meshBasicMaterial color="#f0eaff" />
          </mesh>
        </group>
      ))}
      {room.npc && (
        <group position={[room.npc.id === "iri" ? 0 : 7.5, -3.68, 0.65]}>
          <mesh>
            <boxGeometry args={[0.52, 0.78, 0.18]} />
            <meshBasicMaterial color={room.npc.id === "iri" ? "#d7d0f5" : "#b6a7ce"} />
          </mesh>
          <mesh position={[0, 0.5, 0.02]}>
            <boxGeometry args={[0.5, 0.42, 0.2]} />
            <meshBasicMaterial color="#f0eaff" />
          </mesh>
          <mesh position={[0.31, 0.56, -0.03]} rotation={[0, 0, -0.45]}>
            <boxGeometry args={[0.18, 0.7, 0.07]} />
            <meshBasicMaterial color={room.accent} />
          </mesh>
        </group>
      )}
      {room.lore && !foundLore.includes(room.lore.id) && (
        <group position={[room.lore.x, -3.65, 0.55]}>
          <mesh>
            <boxGeometry args={[0.55, 0.95, 0.18]} />
            <meshBasicMaterial color="#d8d2f3" />
          </mesh>
          <mesh position={[0, 0.13, 0.12]}>
            <boxGeometry args={[0.25, 0.06, 0.04]} />
            <meshBasicMaterial color="#7f80aa" />
          </mesh>
          <mesh position={[0, -0.05, 0.12]}>
            <boxGeometry args={[0.25, 0.06, 0.04]} />
            <meshBasicMaterial color="#7f80aa" />
          </mesh>
        </group>
      )}
      {room.shrine && (
        <group position={[room.shrine.x, -3.55, 0.6]}>
          <mesh>
            <boxGeometry args={[0.9, 0.16, 0.35]} />
            <meshBasicMaterial color="#8b89b7" />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <octahedronGeometry args={[0.34, 0]} />
            <meshBasicMaterial color="#d7d2ff" />
          </mesh>
          <mesh position={[0, 0.5, -0.04]}>
            <octahedronGeometry args={[0.52, 0]} />
            <meshBasicMaterial color={room.accent} transparent opacity={0.18} />
          </mesh>
        </group>
      )}
      {room.secret && !foundSecrets.includes(room.secret.id) && (
        <group position={[room.secret.x, -3.74, 0.6]}>
          <mesh>
            <boxGeometry args={[0.72, 0.92, 0.2]} />
            <meshBasicMaterial color="#716a9c" transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.13]}>
            <boxGeometry args={[0.16, 0.16, 0.08]} />
            <meshBasicMaterial color="#f0d7ff" />
          </mesh>
        </group>
      )}
      {enemyEnabled && room.enemy && (
        <group ref={enemyRef} position={[4.5, -3.7, 0.8]}>
          <mesh>
            <boxGeometry args={room.enemy.kind === "boss" ? [1.7, 1.75, 0.3] : [0.88, 0.95, 0.22]} />
            <meshBasicMaterial color={room.enemy.kind === "boss" ? "#b78fb9" : room.enemy.kind === "float" ? "#a6a4d2" : "#8ca9a1"} />
          </mesh>
          <mesh position={[0, room.enemy.kind === "boss" ? 0.82 : 0.5, 0.04]}>
            <boxGeometry args={room.enemy.kind === "boss" ? [1.25, 0.48, 0.28] : [0.62, 0.38, 0.24]} />
            <meshBasicMaterial color="#ece6ff" />
          </mesh>
          <mesh position={[-0.48, 0.1, 0.16]}>
            <boxGeometry args={[0.13, 0.14, 0.04]} />
            <meshBasicMaterial color="#26253f" />
          </mesh>
          <mesh position={[0.48, 0.1, 0.16]}>
            <boxGeometry args={[0.13, 0.14, 0.04]} />
            <meshBasicMaterial color="#26253f" />
          </mesh>
          <mesh position={[0, -0.55, -0.05]}>
            <boxGeometry args={[room.enemy.kind === "boss" ? 2 : 1.05, 0.2, 0.18]} />
            <meshBasicMaterial color="#655176" />
          </mesh>
        </group>
      )}
      <mesh ref={warningRef} visible={false} position={[0, -4.45, 0.25]}>
        <boxGeometry args={[1.8, 0.18, 0.04]} />
        <meshBasicMaterial color="#f0c1dc" transparent opacity={0.85} />
      </mesh>
      <PlayerSprite playerRef={playerRef} />
    </>
  )
}

const ACTION_LABELS: Record<Action, string> = {
  left: "Move left", right: "Move right", jump: "Jump", attack: "Lantern strike",
  dash: "Moon dash", interact: "Interact", grapple: "Star grapple",
}

export default function DungeonLiveWorld() {
  const [campaign, setCampaign] = useState<CampaignSnapshot | null>(null)
  const [roomId, setRoomId] = useState("moonwake_observatory")
  const [hud, setHud] = useState(EMPTY_HUD)
  const [loading, setLoading] = useState(true)
  const [paused, setPaused] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [respawnVersion, setRespawnVersion] = useState(0)
  const [dialogue, setDialogue] = useState<NpcConversation | null>(null)
  const [memory, setMemory] = useState<{ title: string; text: string; volume?: string } | null>(null)
  const [milestoneStory, setMilestoneStory] = useState<{ title: string; volume: string; paragraphs: string[] } | null>(null)
  const [endingAfterMilestone, setEndingAfterMilestone] = useState(false)
  const [showChronicle, setShowChronicle] = useState(false)
  const [showBestiary, setShowBestiary] = useState(false)
  const [showQuests, setShowQuests] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [remapping, setRemapping] = useState<Action | null>(null)
  const [endingChoice, setEndingChoice] = useState(false)
  const [toast, setToast] = useState("")
  const [error, setError] = useState("")
  const [dialogueBusy, setDialogueBusy] = useState(false)
  const inputRef = useRef<InputState>({ held: new Set(), pressed: new Set() })
  const gameFrameRef = useRef<HTMLDivElement>(null)
  const settingsRef = useRef<AccessibilitySettings>(DEFAULT_ACCESSIBILITY)
  const remappingRef = useRef<Action | null>(null)
  const room = WORLD_ROOM_BY_ID[roomId] ?? WORLD_ROOM_BY_ID.moonwake_observatory
  const settings = campaign?.settings ?? DEFAULT_ACCESSIBILITY
  settingsRef.current = settings
  remappingRef.current = remapping

  const applyEvent = useCallback(async (event: {
    action: CampaignEventKind
    roomId?: string
    key?: string
    value?: string
    settings?: AccessibilitySettings
  }) => {
    const response = await sendCampaignEvent(event)
    setCampaign(response.campaign)
    return response.campaign
  }, [])

  useEffect(() => {
    let active = true
    getCampaign().then((response) => {
      if (!active) return
      setCampaign(response.campaign)
      setRoomId(response.campaign.currentRoom)
    }).catch((reason) => {
      if (active) setError(reason instanceof Error ? reason.message : "The campaign could not be loaded.")
    }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === gameFrameRef.current)
    document.addEventListener("fullscreenchange", syncFullscreen)
    return () => document.removeEventListener("fullscreenchange", syncFullscreen)
  }, [])

  useEffect(() => {
    const actionForCode = (code: string): Action | undefined => (
      Object.entries(settingsRef.current.controls).find(([, mapped]) => mapped === code)?.[0] as Action | undefined
    )
    const down = (event: KeyboardEvent) => {
      if (remappingRef.current) {
        if (event.code === "Escape") {
          setRemapping(null)
          return
        }
        const action = remappingRef.current
        const next = { ...settingsRef.current, controls: { ...settingsRef.current.controls, [action]: event.code } }
        setCampaign((current) => current ? { ...current, settings: next } : current)
        setRemapping(null)
        void sendCampaignEvent({ action: "settings", settings: next }).then((response) => setCampaign(response.campaign)).catch((reason) => setError(reason instanceof Error ? reason.message : "Could not save controls."))
        event.preventDefault()
        return
      }
      if (event.code === "Escape") {
        inputRef.current.held.clear()
        inputRef.current.pressed.clear()
        setMemory(null)
        setPaused((value) => !value)
        return
      }
      const action = actionForCode(event.code)
      if (!action) return
      event.preventDefault()
      inputRef.current.held.add(action)
      if (!event.repeat) inputRef.current.pressed.add(action)
    }
    const up = (event: KeyboardEvent) => {
      const action = actionForCode(event.code)
      if (action) inputRef.current.held.delete(action)
    }
    const clear = () => { inputRef.current.held.clear(); inputRef.current.pressed.clear() }
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    window.addEventListener("blur", clear)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
      window.removeEventListener("blur", clear)
    }
  }, [])

  const saveWorldEvent = useCallback(async (action: "lore" | "secret" | "bestiary" | "boss-hit", key: string) => {
    try {
      const next = await applyEvent({ action, key })
      const bossWon = action === "boss-hit" && next.bossesDefeated.includes(key)
      const copy = action === "lore" ? "Memory added to your Chronicle."
        : action === "secret" ? "A hidden mark answers the lantern."
          : action === "bestiary" ? "Bestiary pattern recorded."
            : bossWon ? "Warden defeated. A new movement art has awakened."
              : "The warden's seal weakens. Keep reading its pattern."
      setToast(copy)
      if (action === "lore") {
        const discovered = WORLD_ROOMS.find((entry) => entry.lore?.id === key)?.lore
        if (discovered) setMemory({ title: discovered.title, text: discovered.text, volume: MOONWAKE_ROOM_STORY_VOLUMES[key] })
      }
      if (bossWon) {
        const story = MOONWAKE_MILESTONE_STORIES[key]
        if (story) setMilestoneStory(story)
        if (key === "orin_first_keeper") setEndingAfterMilestone(true)
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The campaign could not be saved.")
    }
  }, [applyEvent])

  const continueMilestone = () => {
    setMilestoneStory(null)
    setPaused(false)
    if (endingAfterMilestone) {
      setEndingAfterMilestone(false)
      setEndingChoice(true)
    }
  }

  const changeRoom = useCallback(async (target: string) => {
    try {
      const next = await applyEvent({ action: "room", roomId: target })
      setRoomId(next.currentRoom)
      setShowMap(false)
      setHud(EMPTY_HUD)
      setToast("Entered " + (WORLD_ROOM_BY_ID[target]?.title ?? "a new room") + ".")
      setPaused(false)
      setDialogue(null)
    } catch (reason) {
      setToast(reason instanceof Error ? reason.message : "That passage remains sealed.")
    }
  }, [applyEvent])

  const setCheckpoint = useCallback(async (title: string) => {
    try {
      await applyEvent({ action: "checkpoint", roomId })
      setToast(title + " attuned. Your return point is saved.")
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The shrine could not be attuned.")
    }
  }, [applyEvent, roomId])

  const respawn = useCallback(async () => {
    setRespawnVersion((version) => version + 1)
    try {
      const next = await applyEvent({ action: "respawn" })
      setRoomId(next.currentRoom)
      setToast("The lantern returns you to your last shrine.")
    } catch (reason) {
      setToast(reason instanceof Error ? reason.message : "The last shrine could not be reached.")
    }
  }, [applyEvent])

  const saveQuest = async (choice: string) => {
    if (!dialogue || dialogueBusy) return
    setDialogueBusy(true)
    try {
      await applyEvent({ action: "quest", key: dialogue.quest, value: choice })
      setToast("The conversation is remembered.")
      setDialogue(null)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The conversation could not be saved.")
    } finally {
      setDialogueBusy(false)
    }
  }

  useEffect(() => {
    if (campaign?.bossesDefeated.includes("orin_first_keeper") && !campaign.ending) setEndingChoice(true)
  }, [campaign])

  const saveEnding = async (ending: string) => {
    try {
      await applyEvent({ action: "ending", value: ending })
      setEndingChoice(false)
      setToast("Your ending has been written into the Moonwake Chronicle.")
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The ending could not be saved.")
    }
  }

  const saveSettings = async (next: AccessibilitySettings) => {
    setCampaign((current) => current ? { ...current, settings: next } : current)
    try {
      const response = await sendCampaignEvent({ action: "settings", settings: next })
      setCampaign(response.campaign)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Accessibility settings could not be saved.")
    }
  }

  const pushTouch = (action: Action, down: boolean) => {
    if (down) {
      inputRef.current.held.add(action)
      inputRef.current.pressed.add(action)
    } else {
      inputRef.current.held.delete(action)
    }
  }

  const startGame = () => {
    setGameStarted(true)
    const frame = gameFrameRef.current
    if (!frame?.requestFullscreen) {
      setToast("Fullscreen is unavailable in this browser. The adventure will continue in this window.")
      return
    }
    void frame.requestFullscreen().catch(() => {
      setToast("The browser blocked fullscreen. Use the expand control whenever you are ready.")
    })
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => setToast("The browser could not leave fullscreen."))
      return
    }
    const frame = gameFrameRef.current
    if (!frame?.requestFullscreen) {
      setToast("Fullscreen is unavailable in this browser.")
      return
    }
    void frame.requestFullscreen().catch(() => setToast("Fullscreen was blocked by the browser."))
  }

  const abilities = campaign?.unlockedAbilities ?? []
  const currentChapter = room.chapter > 0 ? CAMPAIGN_CHAPTERS[room.chapter - 1] : null
  const activeEnemy = room.enemy && !(campaign?.bossesDefeated.includes(room.enemy.id)) ? room.enemy : undefined
  const completedQuestCount = campaign?.completedQuests.length ?? 0
  const selectedEnding = LUNAR_ENDINGS.find((ending) => ending.id === campaign?.ending)

  if (loading) {
    return <section className="ld-live-world"><div className="ld-live-loading">Opening the Moonwake observatory…</div></section>
  }

  return (
    <section className="ld-live-world" data-reduced-motion={settings.reducedMotion} data-telegraphs={settings.highContrastTelegraphs ? "high" : "soft"}>
      <div className="ld-live-heading">
        <div>
          <div className="ld-live-kicker">LUNAR · THE MOONWAKE TESTAMENT</div>
          <h2>Walk beneath the moon.</h2>
          <p>A connected realm of quiet ruins, remembered names, and paths that open as you grow.</p>
        </div>
        <div className="ld-live-heading-actions">
          <button onClick={() => setShowMap((value) => !value)} aria-expanded={showMap}><Map size={15} /> World Map</button>
          <button onClick={() => setShowChronicle((value) => !value)} aria-expanded={showChronicle}><BookOpen size={15} /> Chronicle</button>
          <button onClick={() => setShowBestiary((value) => !value)} aria-expanded={showBestiary}><BookOpen size={15} /> Bestiary <span>{campaign?.bestiary.length ?? 0}</span></button>
          <button onClick={() => setShowQuests((value) => !value)} aria-expanded={showQuests}><Sparkles size={15} /> Threads <span>{completedQuestCount}/6</span></button>
          <button onClick={() => setShowSettings((value) => !value)} aria-expanded={showSettings} aria-label="Accessibility and controls"><Settings2 size={16} /></button>
        </div>
      </div>

      <div className="ld-live-status">
        <span className="ld-live-location"><i /> {room.title} <small>/ {room.subtitle}</small></span>
        <span className="ld-live-abilities">
          {["dash", "wall-jump", "double-jump", "grapple"].map((ability) => (
            <span key={ability} className={abilities.includes(ability) ? "is-unlocked" : ""}>{ability.toUpperCase()}</span>
          ))}
        </span>
      </div>

      {error && <div className="ld-live-error" role="alert">{error}<button onClick={() => setError("")} aria-label="Dismiss"><X size={14} /></button></div>}
      {toast && <div className="ld-live-toast" role="status">{toast}<button onClick={() => setToast("")} aria-label="Dismiss"><X size={14} /></button></div>}

      {showMap && (
        <div className="ld-live-panel ld-live-world-map">
          <div className="ld-live-panel-head"><div><span>THE MOONWAKE ATLAS</span><h3>Every road remembers a way home.</h3></div><button onClick={() => setShowMap(false)} aria-label="Close world map"><X size={16} /></button></div>
          <p className="ld-live-map-copy">The kingdoms form one connected descent. Only the passages beside your current room can be entered from here.</p>
          <div className="ld-live-map-route">
            {WORLD_ROOMS.map((entry) => {
              const exit = room.exits.find((candidate) => candidate.target === entry.id)
              const gateReady = !exit?.ability || (exit.ability === "five-secrets" ? (campaign?.discoveredSecrets.length ?? 0) >= 5 : abilities.includes(exit.ability))
              const isCurrent = entry.id === roomId
              const canTravel = !!exit && gateReady
              const cleared = entry.enemy?.kind === "boss" && !!campaign?.bossesDefeated.includes(entry.enemy.id)
              const visited = !!campaign?.visitedRooms.includes(entry.id)
              const sealed = entry.region === "underlight" ? (campaign?.discoveredSecrets.length ?? 0) < 5
                : entry.region === "ember" ? !campaign?.bossesDefeated.includes("verdant_colossus")
                  : entry.region === "frost" ? !campaign?.bossesDefeated.includes("ember_sovereign")
                    : entry.region === "astral" ? !campaign?.bossesDefeated.includes("hollow_monarch")
                      : entry.region === "quiet" ? !campaign?.bossesDefeated.includes("astral_warden")
                        : false
              return (
                <button
                  key={entry.id}
                  className={isCurrent ? "is-current" : canTravel ? "is-next" : sealed ? "is-sealed" : ""}
                  disabled={!canTravel}
                  onClick={() => void changeRoom(entry.id)}
                  title={entry.subtitle}
                >
                  <span>{entry.region.toUpperCase()}</span>
                  <strong>{entry.title}</strong>
                  <small>{isCurrent ? "YOU ARE HERE" : canTravel ? "NEXT PASSAGE" : cleared ? "WARDEN REMEMBERED" : sealed ? "SEALED BY THE QUIET" : visited ? "MAPPED" : "NOT YET MAPPED"}</small>
                  {entry.lore && <small className={campaign?.discoveredLore.includes(entry.lore.id) ? "ld-live-map-story-state is-discovered" : "ld-live-map-story-state"}>{campaign?.discoveredLore.includes(entry.lore.id) ? "STORY MEMORY RECOVERED" : "STORY MEMORY TO FIND"}</small>}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {showChronicle && (
        <div className="ld-live-panel ld-live-chronicle">
          <div className="ld-live-panel-head"><div><span>THE MOONWAKE TESTAMENT</span><h3>Five notes. A world that remembers.</h3></div><button onClick={() => setShowChronicle(false)} aria-label="Close chronicle"><X size={16} /></button></div>
          <p className="ld-live-prologue">{MOONWAKE_PROLOGUE}</p>
          <div className="ld-live-chapter-grid">
            {CAMPAIGN_CHAPTERS.map((chapter, index) => {
              const opened = (campaign?.bossesDefeated.length ?? 0) >= index
              const completed = !!campaign?.bossesDefeated.includes(["verdant_colossus", "ember_sovereign", "hollow_monarch", "astral_warden", "orin_first_keeper"][index])
              return (
                <article key={chapter.id} className={completed ? "is-restored" : opened ? "is-open" : "is-sealed"}>
                  <span>ACT 0{chapter.id} · {chapter.region.toUpperCase()}</span>
                  <h4>{opened ? chapter.title : "A chapter beyond the mist"}</h4>
                  <p>{opened ? chapter.summary : "A new page will appear when the previous warden is remembered."}</p>
                  {opened && <small>{chapter.companion} · {chapter.boss}</small>}
                  {completed && <blockquote>{chapter.revelation}<br /><b>{chapter.memory}</b></blockquote>}
                </article>
              )
            })}
          </div>
          {campaign && <MoonwakeChronicle campaign={campaign} />}
          {selectedEnding && <div className="ld-live-ending"><span>ENDING RECORDED</span><strong>{selectedEnding.title}</strong><p>{selectedEnding.description}</p><blockquote>{selectedEnding.epilogue}</blockquote></div>}
        </div>
      )}

      {showBestiary && (
        <div className="ld-live-panel">
          <div className="ld-live-panel-head"><div><span>FIELD NOTES</span><h3>Bestiary</h3></div><button onClick={() => setShowBestiary(false)} aria-label="Close bestiary"><X size={16} /></button></div>
          <div className="ld-live-entry-grid">
            {(campaign?.bestiary ?? []).map((key) => {
              const entry = BESTIARY_ENTRIES[key]
              return entry ? <article key={key}><strong>{entry.title}</strong><p>{entry.pattern}</p><small>{entry.note}</small></article> : null
            })}
            {(campaign?.bestiary.length ?? 0) === 0 && <p className="ld-live-empty">Approach an unfamiliar creature to add its movement pattern here.</p>}
          </div>
        </div>
      )}

      {showQuests && (
        <div className="ld-live-panel">
          <div className="ld-live-panel-head"><div><span>COMPANION THREADS</span><h3>Promises kept along the way</h3></div><button onClick={() => setShowQuests(false)} aria-label="Close threads"><X size={16} /></button></div>
          <div className="ld-live-quest-grid">
            {Object.entries(QUEST_CHOICES).map(([key, choices]) => (
              <article key={key} className={campaign?.completedQuests.includes(key) ? "is-done" : ""}>
                <strong>{key.replaceAll("-", " ")}</strong>
                <span>{campaign?.completedQuests.includes(key) ? "REMEMBERED" : "NOT YET SPOKEN"}</span>
                <p>{campaign?.questChoices[key] ?? choices[0]}</p>
              </article>
            ))}
          </div>
          <p className="ld-live-affinity">Companion trust · {campaign?.companionAffinity ?? 0} / 6</p>
        </div>
      )}

      {showSettings && (
        <div className="ld-live-panel ld-live-settings">
          <div className="ld-live-panel-head"><div><span>PERSONAL NIGHT MODE</span><h3>Accessibility & controls</h3></div><button onClick={() => setShowSettings(false)} aria-label="Close settings"><X size={16} /></button></div>
          <div className="ld-live-setting-toggles">
            {([
              ["reducedMotion", "Reduce motion", "Reduce floating effects and camera transitions."],
              ["cameraShake", "Camera shake", "Allow a small camera response when hit."],
              ["highContrastTelegraphs", "High-contrast tells", "Make enemy warning lanes more visible."],
              ["colorblindTelegraphs", "Shape-coded tells", "Pair colour with a distinct warning shape and label."],
            ] as const).map(([key, label, description]) => (
              <label key={key}><span><strong>{label}</strong><small>{description}</small></span><input type="checkbox" checked={settings[key]} onChange={(event) => void saveSettings({ ...settings, [key]: event.target.checked })} /></label>
            ))}
          </div>
          <div className="ld-live-remap-grid">
            {(Object.keys(ACTION_LABELS) as Action[]).map((action) => (
              <button key={action} onClick={() => setRemapping(action)}><span>{ACTION_LABELS[action]}</span><kbd>{settings.controls[action]}</kbd></button>
            ))}
          </div>
          {remapping && <p className="ld-live-remap-hint">Press a key for {ACTION_LABELS[remapping]}. Escape cancels.</p>}
        </div>
      )}

      <div ref={gameFrameRef} className="ld-live-game-frame">
        <div className="ld-live-game-top">
          <span><Map size={13} /> {room.region.toUpperCase()} · {currentChapter?.title ?? "THE LAST OBSERVATORY"}</span>
          <div className="ld-live-top-actions">
            <span><Heart size={13} /> {hud.hp}/{hud.maxHp}</span>
            <button onClick={() => setPaused((value) => !value)}>{paused ? <Play size={13} /> : <Pause size={13} />}{paused ? "Resume" : "Pause"}</button>
            <button onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"} title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>{isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}</button>
          </div>
        </div>
        <div className="ld-live-canvas-wrap">
          <Canvas
            orthographic
            camera={{ position: [0, 0, 24], zoom: 28 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
          >
            <color attach="background" args={[room.background]} />
            <LiveScene
              key={room.id + ":" + respawnVersion}
              room={room}
              enemyEnabled={!!activeEnemy}
              serverBossHp={campaign?.activeBoss?.id === room.enemy?.id ? campaign?.activeBoss?.hp ?? null : null}
              abilities={abilities}
              foundLore={campaign?.discoveredLore ?? []}
              foundSecrets={campaign?.discoveredSecrets ?? []}
              settings={settings}
              inputRef={inputRef}
              paused={!gameStarted || paused || !!dialogue || !!memory || !!milestoneStory || endingChoice || showSettings || showChronicle || showBestiary || showQuests || showMap}
              onHud={setHud}
              onEvent={(action, key) => void saveWorldEvent(action, key)}
              onRoomExit={(target) => void changeRoom(target)}
              onNpc={setDialogue}
              onCheckpoint={(title) => void setCheckpoint(title)}
              onRespawn={() => void respawn()}
            />
          </Canvas>
          {!gameStarted && (
            <div className="ld-live-start-screen">
              <span>THE MOONWAKE TESTAMENT</span>
              <h3>The night is waiting for a witness.</h3>
              <p>Move through the forgotten kingdoms, recover the five notes, and decide what the Lumen should become.</p>
              <button onClick={startGame}><Play size={14} /> Enter the Moonwake</button>
              <small>Fullscreen is requested only when you start. Press Escape to pause.</small>
            </div>
          )}
          {hud.telegraph && (
            <div className={settings.colorblindTelegraphs ? "ld-live-telegraph is-shaped" : "ld-live-telegraph"}>
              <span>{settings.colorblindTelegraphs ? "▲" : "!"}</span>
              {settings.highContrastTelegraphs ? "WARDEN PATTERN · MOVE FROM THE MARKED LANE" : "A pattern is gathering"}
            </div>
          )}
          {paused && gameStarted && <div className="ld-live-pause"><span>THE NIGHT IS HELD</span><button onClick={() => setPaused(false)}><Play size={14} /> Return to the world</button></div>}
          <div className="ld-live-room-title"><span>{room.title}</span><small>{room.subtitle}</small></div>
          {hud.prompt && !paused && !dialogue && <div className="ld-live-interact-prompt">{hud.prompt}</div>}
        </div>
        <div className="ld-live-vitals">
          <div><span>WAYFARER</span><div className="ld-live-health"><i style={{ width: (hud.hp / hud.maxHp * 100) + "%" }} /></div></div>
          {hud.enemyName && hud.enemyMaxHp > 0 && (
            <div><span>{hud.enemyName.toUpperCase()}</span><div className="ld-live-health is-enemy"><i style={{ width: (hud.enemyHp / hud.enemyMaxHp * 100) + "%" }} /></div></div>
          )}
          {hud.boss && <b className={hud.phase === "awakened" ? "is-awakened" : ""}>{hud.phase === "awakened" ? "AWAKENED" : "SEALED"}</b>}
        </div>
        <div className="ld-live-controls">
          <div className="ld-live-instructions"><span>{displayKey(settings.controls.left)} / {displayKey(settings.controls.right)}</span> move <span>{displayKey(settings.controls.jump)}</span> jump <span>{displayKey(settings.controls.attack)}</span> strike <span>{displayKey(settings.controls.dash)}</span> dash <span>{displayKey(settings.controls.interact)}</span> interact <span>{displayKey(settings.controls.grapple)}</span> grapple</div>
          <div className="ld-live-touch" aria-label="Touch controls">
            {(["left", "right", "jump", "attack", "dash", "interact", "grapple"] as Action[]).map((action) => (
              <button
                key={action}
                aria-label={ACTION_LABELS[action]}
                onPointerDown={(event) => { event.preventDefault(); pushTouch(action, true) }}
                onPointerUp={() => pushTouch(action, false)}
                onPointerLeave={() => pushTouch(action, false)}
                onPointerCancel={() => pushTouch(action, false)}
              >{action === "left" ? "←" : action === "right" ? "→" : action === "jump" ? "JUMP" : action === "attack" ? "STRIKE" : action === "dash" ? "DASH" : action === "interact" ? "USE" : "HOOK"}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="ld-live-footer">
        <div><ShieldCheck size={15} /><span>Campaign progress, shrines, discoveries, quests, and endings are saved to Lunar.</span></div>
        <div><Wind size={15} /><span>{abilities.length ? abilities.join(" · ").toUpperCase() : "Movement arts awaken as wardens are remembered"}</span></div>
      </div>

      {memory && (
        <div className="ld-live-modal-backdrop" role="presentation">
          <section className="ld-live-dialogue" role="dialog" aria-modal="true" aria-label={memory.title}>
            <div className="ld-live-panel-head"><div><span>RECOVERED MEMORY</span><h3>{memory.title}</h3></div><button onClick={() => setMemory(null)} aria-label="Close memory"><X size={16} /></button></div>
            <p>“{memory.text}”</p>
            {memory.volume && <Link className="ld-live-ending-option ld-live-story-link" href={`/dungeons/story?volume=${memory.volume}`}>Read the complete memory chapter ↗</Link>}
            <button className="ld-live-ending-option" onClick={() => setMemory(null)}>Return to the path</button>
          </section>
        </div>
      )}

      {milestoneStory && (
        <div className="ld-live-modal-backdrop" role="presentation">
          <section className="ld-live-dialogue ld-live-milestone-story" role="dialog" aria-modal="true" aria-label={milestoneStory.title}>
            <div className="ld-live-panel-head">
              <div><span>THE CHRONICLE OPENS · NEW CHAPTER</span><h3>{milestoneStory.title}</h3></div>
              <button onClick={continueMilestone} aria-label="Continue the journey"><X size={16} /></button>
            </div>
            {milestoneStory.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <Link className="ld-live-ending-option ld-live-story-link" href={`/dungeons/story?volume=${milestoneStory.volume}`}>
              Read this chapter in the Testament ↗
            </Link>
            <button className="ld-live-ending-option" onClick={continueMilestone}>Continue the journey</button>
          </section>
        </div>
      )}

      {dialogue && (
        <div className="ld-live-modal-backdrop" role="presentation">
          <section className="ld-live-dialogue" role="dialog" aria-modal="true" aria-label={dialogue.name + " conversation"}>
            <div className="ld-live-panel-head"><div><span>{dialogue.role.toUpperCase()}</span><h3>{dialogue.name}</h3></div><button onClick={() => setDialogue(null)} aria-label="Close conversation"><X size={16} /></button></div>
            <p>“{dialogue.line}”</p>
            <div className="ld-live-dialogue-choices">
              {(QUEST_CHOICES[dialogue.quest] ?? []).map((choice) => (
                <button key={choice} disabled={dialogueBusy || !!campaign?.completedQuests.includes(dialogue.quest)} onClick={() => void saveQuest(choice)}>
                  {choice}
                </button>
              ))}
            </div>
            {campaign?.completedQuests.includes(dialogue.quest) && <small>This promise is already held in the Chronicle.</small>}
          </section>
        </div>
      )}

      {endingChoice && (
        <div className="ld-live-modal-backdrop" role="presentation">
          <section className="ld-live-dialogue ld-live-ending-choice" role="dialog" aria-modal="true" aria-label="Choose the ending">
            <div className="ld-live-panel-head"><div><span>THE LAST NOTE</span><h3>What should the Lumen become?</h3></div><button onClick={() => setEndingChoice(false)} aria-label="Close ending choice"><X size={16} /></button></div>
            <p>Orin has remembered their name. Iri stands beside the Lumen. The night is no longer asking for a keeper. It is asking what you will do with the light.</p>
            {LUNAR_ENDINGS.map((ending) => (
              <button key={ending.id} className="ld-live-ending-option" onClick={() => void saveEnding(ending.id)}>
                <strong>{ending.title}</strong><span>{ending.description}</span>
              </button>
            ))}
            <p className="ld-live-affinity-epilogue">
              {(campaign?.companionAffinity ?? 0) >= 4
                ? "Iri stays beside the Wayfarer. The old observatory becomes a place they tend together, not a duty either must carry alone."
                : "Iri leaves her lantern in the observatory window, then follows the moth-lights back into the kingdoms. The path between you remains open."}
            </p>
          </section>
        </div>
      )}
    </section>
  )
}

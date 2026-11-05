"use client"

import { useMemo } from "react"
import { Canvas } from "@react-three/fiber"

export interface WorldNode {
  stage: number
  x: number
  y: number
  status: "completed" | "available" | "locked"
  boss: boolean
}

interface DungeonWorldProps {
  nodes: WorldNode[]
  color: string
  glow: string
}

function PixelGround({ color }: { color: string }) {
  const tiles = useMemo(() => {
    const shades = ["#17252b", "#1a2b31", "#203238", "#1a292f", "#24383d"]
    return Array.from({ length: 392 }, (_, index) => {
      const col = (index % 28) - 13.5
      const row = Math.floor(index / 28) - 6.5
      const seed = (index * 37 + 11) % shades.length
      return {
        key: index,
        x: col * 1.02,
        y: row * 0.96,
        z: -1.5 + ((index * 7) % 5) * 0.006,
        shade: shades[seed],
        opacity: 0.58 + ((index * 13) % 31) / 100,
      }
    })
  }, [])

  return (
    <group>
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[30, 15]} />
        <meshBasicMaterial color="#101b20" />
      </mesh>
      {tiles.map((tile) => (
        <mesh key={tile.key} position={[tile.x, tile.y, tile.z]}>
          <boxGeometry args={[0.96, 0.9, 0.08]} />
          <meshBasicMaterial color={tile.shade} transparent opacity={tile.opacity} />
        </mesh>
      ))}
      {Array.from({ length: 44 }, (_, index) => (
        <mesh
          key={`rune-${index}`}
          position={[-14 + ((index * 17) % 28), -6.7 + ((index * 29) % 13), -0.9]}
          rotation={[0, 0, (index % 4) * Math.PI / 4]}
        >
          <boxGeometry args={[0.11 + (index % 3) * 0.04, 0.11 + (index % 4) * 0.03, 0.08]} />
          <meshBasicMaterial color={index % 3 === 0 ? color : "#344950"} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function Route({ nodes, glow }: { nodes: WorldNode[]; glow: string }) {
  const segments = useMemo(() => nodes.slice(0, -1).map((node, index) => {
    const next = nodes[index + 1]
    const dx = next.x - node.x
    const dy = next.y - node.y
    return {
      key: `${node.stage}-${next.stage}`,
      x: (node.x + next.x) / 2,
      y: (node.y + next.y) / 2,
      angle: Math.atan2(dy, dx),
      length: Math.sqrt(dx * dx + dy * dy),
    }
  }), [nodes])

  return (
    <group>
      {segments.map((segment) => (
        <group key={segment.key} position={[segment.x, segment.y, -0.25]} rotation={[0, 0, segment.angle]}>
          <mesh>
            <boxGeometry args={[segment.length, 0.38, 0.08]} />
            <meshBasicMaterial color="#101a1e" />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[segment.length, 0.12, 0.07]} />
            <meshBasicMaterial color={glow} transparent opacity={0.7} />
          </mesh>
          {Array.from({ length: Math.max(2, Math.floor(segment.length / 1.1)) }, (_, index) => (
            <mesh key={index} position={[-segment.length / 2 + (index + 0.5) * segment.length / Math.max(2, Math.floor(segment.length / 1.1)), 0, 0.1]}>
              <boxGeometry args={[0.32, 0.28, 0.06]} />
              <meshBasicMaterial color="#536b68" transparent opacity={0.62} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function RoomArchitecture({ nodes, color, glow }: { nodes: WorldNode[]; color: string; glow: string }) {
  return (
    <group>
      {nodes.map((node) => {
        const width = node.boss ? 3.15 : 2.35
        const height = node.boss ? 2.85 : 2.1
        const wall = node.status === "locked" ? "#334348" : "#526a65"
        const floor = node.status === "locked" ? "#1c292e" : "#263b3b"
        return (
          <group key={`room-${node.stage}`} position={[node.x, node.y, -0.15]}>
            <mesh position={[0, 0, -0.28]}>
              <boxGeometry args={[width + 0.42, height + 0.42, 0.18]} />
              <meshBasicMaterial color="#090f12" />
            </mesh>
            <mesh position={[0, 0, -0.16]}>
              <boxGeometry args={[width, height, 0.12]} />
              <meshBasicMaterial color={floor} />
            </mesh>
            <mesh position={[0, height / 2, -0.02]}>
              <boxGeometry args={[width, 0.14, 0.12]} />
              <meshBasicMaterial color={wall} />
            </mesh>
            <mesh position={[0, -height / 2, -0.02]}>
              <boxGeometry args={[width, 0.14, 0.12]} />
              <meshBasicMaterial color={wall} />
            </mesh>
            <mesh position={[-width / 2, 0, -0.02]}>
              <boxGeometry args={[0.14, height, 0.12]} />
              <meshBasicMaterial color={wall} />
            </mesh>
            <mesh position={[width / 2, 0, -0.02]}>
              <boxGeometry args={[0.14, height, 0.12]} />
              <meshBasicMaterial color={wall} />
            </mesh>
            {[-0.58, 0.58].map((offset) => (
              <mesh key={offset} position={[offset, 0, -0.06]}>
                <boxGeometry args={[0.07, height - 0.4, 0.08]} />
                <meshBasicMaterial color={glow} transparent opacity={0.28} />
              </mesh>
            ))}
            {[-1, 1].map((side) => (
              <group key={side} position={[side * (width / 2 - 0.32), height / 2 - 0.25, 0.02]}>
                <mesh>
                  <boxGeometry args={[0.22, 0.48, 0.2]} />
                  <meshBasicMaterial color="#18262a" />
                </mesh>
                <mesh position={[0, 0.15, 0.13]}>
                  <boxGeometry args={[0.1, 0.1, 0.1]} />
                  <meshBasicMaterial color={color} />
                </mesh>
              </group>
            ))}
          </group>
        )
      })}
    </group>
  )
}

function StagePedestals({ nodes, color }: { nodes: WorldNode[]; color: string }) {
  return (
    <group>
      {nodes.map((node) => {
        const tint = node.status === "completed" ? "#79cfa1" : node.status === "available" ? color : "#52636a"
        return (
          <group key={node.stage} position={[node.x, node.y, 0.24]}>
            <mesh position={[0, -0.13, -0.12]}>
              <boxGeometry args={[node.boss ? 1.75 : 1.25, node.boss ? 1.75 : 1.25, 0.25]} />
              <meshBasicMaterial color="#0a1115" />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[node.boss ? 1.48 : 1.0, node.boss ? 1.48 : 1.0, 0.2]} />
              <meshBasicMaterial color={tint} transparent opacity={node.status === "locked" ? 0.48 : 0.9} />
            </mesh>
            <mesh position={[0, 0, 0.12]}>
              <boxGeometry args={[node.boss ? 0.88 : 0.62, node.boss ? 0.88 : 0.62, 0.08]} />
              <meshBasicMaterial color={node.status === "locked" ? "#25343a" : "#d9f5df"} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

function RuinedAnnexes({ color }: { color: string }) {
  const annexes = [
    { x: -12.8, y: 0.15, rotation: -0.18 },
    { x: 1.4, y: -6.35, rotation: 0.12 },
    { x: 12.9, y: -3.7, rotation: 0.2 },
  ]

  return (
    <group>
      {annexes.map((annex, index) => (
        <group key={index} position={[annex.x, annex.y, -0.1]} rotation={[0, 0, annex.rotation]}>
          <mesh position={[0, 0, -0.2]}>
            <boxGeometry args={[2.6, 1.7, 0.1]} />
            <meshBasicMaterial color="#111d21" />
          </mesh>
          <mesh position={[0, 0.78, -0.02]}>
            <boxGeometry args={[2.6, 0.12, 0.1]} />
            <meshBasicMaterial color="#455a59" />
          </mesh>
          <mesh position={[-1.24, 0, -0.02]}>
            <boxGeometry args={[0.12, 1.7, 0.1]} />
            <meshBasicMaterial color="#455a59" />
          </mesh>
          <mesh position={[1.24, -0.25, -0.02]}>
            <boxGeometry args={[0.12, 1.2, 0.1]} />
            <meshBasicMaterial color="#34464a" />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.34, 0.34, 0.12]} />
            <meshBasicMaterial color={color} transparent opacity={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function DungeonWorld({ nodes, color, glow }: DungeonWorldProps) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 24], zoom: 24 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      fallback={<div className="ld-webgl-fallback">3D rendering is unavailable. Use the stage route below.</div>}
    >
      <color attach="background" args={["#101b20"]} />
      <PixelGround color={color} />
      <RuinedAnnexes color={color} />
      <Route nodes={nodes} glow={glow} />
      <RoomArchitecture nodes={nodes} color={color} glow={glow} />
      <StagePedestals nodes={nodes} color={color} />
      <mesh position={[0, 0, -0.8]}>
        <planeGeometry args={[30, 0.025]} />
        <meshBasicMaterial color="#385058" transparent opacity={0.28} />
      </mesh>
    </Canvas>
  )
}

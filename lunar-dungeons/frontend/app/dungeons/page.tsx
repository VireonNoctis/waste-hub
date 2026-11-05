import type { Metadata } from "next"
import DungeonExplorer from "@/components/dungeons/dungeon-explorer"

export const metadata: Metadata = {
  title: "Explore Dungeons | Lunar",
  description: "Uncover five story chapters, explore 800 pixel-art chambers, and descend into Infinity.",
}

export default function DungeonsPage() {
  return <DungeonExplorer />
}

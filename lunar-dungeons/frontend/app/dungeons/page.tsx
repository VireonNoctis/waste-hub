import type { Metadata } from "next"
import DungeonExplorer from "@/components/dungeons/dungeon-explorer"

export const metadata: Metadata = {
  title: "Explore Dungeons | Lunar",
  description: "Explore five pixel realms, clear 800 dungeon stages, and unlock Infinity.",
}

export default function DungeonsPage() {
  return <DungeonExplorer />
}

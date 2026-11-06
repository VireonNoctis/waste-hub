import type { Metadata } from "next"
import MoonwakeStoryReader from "@/components/dungeons/moonwake-story-reader"
import "./story.css"

export const metadata: Metadata = {
  title: "The Moonwake Testament | Lunar",
  description: "Explore the complete 40-volume, 60,978-word Moonwake epic in an animated, map-connected reader.",
}

export default function MoonwakeStoryPage() {
  return <MoonwakeStoryReader />
}

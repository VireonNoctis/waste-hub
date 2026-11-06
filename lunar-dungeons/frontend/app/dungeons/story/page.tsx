import type { Metadata } from "next"
import MoonwakeStoryReader from "@/components/dungeons/moonwake-story-reader"
import "./story.css"

export const metadata: Metadata = {
  title: "The Moonwake Testament | Lunar",
  description: "Explore the complete Moonwake story through an animated, interactive seven-volume reader.",
}

export default function MoonwakeStoryPage() {
  return <MoonwakeStoryReader />
}

import type { Metadata } from "next"
import MoonwakeStoryReader from "@/components/dungeons/moonwake-story-reader"
import "./story.css"

export const metadata: Metadata = {
  title: "The Moonwake Testament | Lunar",
  description: "Explore the Moonwake Testament in an animated 13-volume reader with map-linked story chronicles.",
}

export default function MoonwakeStoryPage() {
  return <MoonwakeStoryReader />
}

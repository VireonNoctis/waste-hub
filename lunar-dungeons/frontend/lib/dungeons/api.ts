import type { CampaignEventKind, CampaignSnapshot, AccessibilitySettings } from "./campaign"
import type {
  DungeonAction,
  DungeonMode,
  DungeonStartResponse,
  DungeonStateResponse,
  DungeonTurnResponse,
} from "./contracts"

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/dungeons/${path}`, {
    ...init,
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(typeof payload.error === "string" ? payload.error : "The dungeon service is unavailable.")
  }
  return payload as T
}

export function getDungeonState() {
  return request<DungeonStateResponse>("state")
}

export function startDungeon(mode: DungeonMode, level?: number) {
  return request<DungeonStartResponse>("attempts", {
    method: "POST",
    body: JSON.stringify({ mode, level }),
  })
}

export function takeDungeonTurn(attemptId: string, action: DungeonAction) {
  return request<DungeonTurnResponse>(`attempts/${encodeURIComponent(attemptId)}/turn`, {
    method: "POST",
    body: JSON.stringify({ action }),
  })
}

export function abandonDungeon(attemptId: string) {
  return request<{ ok: true }>(`attempts/${encodeURIComponent(attemptId)}`, {
    method: "DELETE",
  })
}


export function getCampaign() {
  return request<{ campaign: CampaignSnapshot }>("campaign")
}

export function sendCampaignEvent(event: {
  action: CampaignEventKind
  roomId?: string
  key?: string
  value?: string
  settings?: AccessibilitySettings
}) {
  return request<{ campaign: CampaignSnapshot }>("campaign/event", {
    method: "POST",
    body: JSON.stringify(event),
  })
}

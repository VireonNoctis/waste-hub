import type { NextRequest } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type RouteContext = { params: Promise<{ path: string[] }> }

async function proxy(request: NextRequest, context: RouteContext) {
  const backend = process.env.DUNGEON_API_URL
  if (!backend) {
    return Response.json({ error: "Dungeon service is not configured." }, { status: 503 })
  }

  const { path } = await context.params
  const incoming = new URL(request.url)
  const suffix = path.map((part) => encodeURIComponent(part)).join("/")
  const target = `${backend.replace(/\/$/, "")}/api/dungeons/${suffix}${incoming.search}`
  const headers = new Headers()

  for (const name of ["authorization", "cookie", "content-type", "accept", "x-request-id"]) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }

  const hasBody = request.method !== "GET" && request.method !== "HEAD"
  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    })

    const responseHeaders = new Headers({
      "content-type": upstream.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    })
    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    })
  } catch {
    return Response.json({ error: "The dungeon service could not be reached." }, { status: 502 })
  }
}

export const GET = proxy
export const POST = proxy
export const DELETE = proxy

import { NextResponse } from "next/server";

export async function POST() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return NextResponse.json({ error: "Counter unavailable" }, { status: 503 });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["INCR", "portfolio:visits"]),
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok || !Number.isSafeInteger(data.result) || data.result < 1) throw new Error("Redis error");
    return NextResponse.json({ views: 5000 + data.result }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Counter unavailable" }, { status: 503 });
  }
}

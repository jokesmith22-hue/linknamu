import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { getClickCounts, getClicksCollection } from "@/lib/mongodb";

// 클릭 수는 매번 최신 값이어야 하므로 캐시하지 않습니다.
export const dynamic = "force-dynamic";

const validIds = new Set(profile.links.map((l) => l.id));

/** GET /api/click → 모든 링크의 현재 클릭 수를 한 번에 반환. 예: { "github": 42, "blog": 0, ... } */
export async function GET() {
  const stored = await getClickCounts();
  const counts = Object.fromEntries(
    profile.links.map((l) => [l.id, stored[l.id] ?? 0]),
  );
  return NextResponse.json(counts, { headers: { "Cache-Control": "no-store" } });
}

/** POST /api/click { id } → 해당 링크의 클릭 수를 1 늘림 */
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크" }, { status: 400 });
  }

  try {
    const col = await getClicksCollection();
    if (!col) return NextResponse.json({ ok: false, reason: "db-not-configured" });
    const doc = await col.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ ok: true, count: doc?.count ?? null });
  } catch (err) {
    console.error("클릭 기록 실패:", err);
    return NextResponse.json({ error: "기록 실패" }, { status: 500 });
  }
}

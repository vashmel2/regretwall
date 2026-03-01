import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const PAGE_SIZE = 20;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");

  let query = supabase
    .from("regret_replies")
    .select("id, text, created_at")
    .eq("regret_id", id)
    .eq("is_hidden", false)
    .order("created_at", { ascending: true })
    .limit(PAGE_SIZE);

  if (cursor) {
    query = query.gt("created_at", cursor);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Failed to fetch replies" }, { status: 500 });
  }

  const nextCursor =
    data && data.length === PAGE_SIZE
      ? data[data.length - 1].created_at
      : null;

  return NextResponse.json({ replies: data ?? [], nextCursor });
}

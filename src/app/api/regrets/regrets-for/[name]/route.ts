import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

const PAGE_SIZE = 20;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { name } = await params;
  const decodedName = decodeURIComponent(name).toLowerCase().trim();

  if (!decodedName || !/^[a-z\s\-']+$/.test(decodedName)) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  // Rate limit searches to prevent scraping
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = rateLimit(`search:${ip}`, {
    maxRequests: 30,
    windowMs: 60 * 1000,
  });

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");

  let query = supabase
    .from("regrets")
    .select("id, text, topic, age_range, created_at, recipient_name")
    .eq("is_hidden", false)
    .ilike("recipient_name", decodedName)
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Failed to fetch regrets" }, { status: 500 });
  }

  // Get total count for this name
  const { count } = await supabase
    .from("regrets")
    .select("*", { count: "exact", head: true })
    .eq("is_hidden", false)
    .ilike("recipient_name", decodedName);

  const nextCursor =
    data && data.length === PAGE_SIZE
      ? data[data.length - 1].created_at
      : null;

  return NextResponse.json({
    regrets: data ?? [],
    nextCursor,
    totalCount: count ?? 0,
  });
}

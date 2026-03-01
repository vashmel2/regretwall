import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import { moderateContent } from "@/lib/moderation";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

  // Rate limit: 5 replies per IP per 15 minutes
  const { allowed, retryAfterMs } = rateLimit(`reply:${ip}`, {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!allowed) {
    const retryAfterSec = Math.ceil(retryAfterMs / 1000);
    return NextResponse.json(
      { error: "Too many replies. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const trimmed = text.trim();

    if (trimmed.length < 2) {
      return NextResponse.json({ error: "Reply is too short" }, { status: 400 });
    }

    if (trimmed.length > 300) {
      return NextResponse.json({ error: "Reply must be 300 characters or less" }, { status: 400 });
    }

    const rejection = moderateContent(trimmed);
    if (rejection) {
      return NextResponse.json({ error: rejection }, { status: 400 });
    }

    // Verify the regret exists and is visible
    const { data: regret } = await supabase
      .from("regrets")
      .select("id")
      .eq("id", id)
      .eq("is_hidden", false)
      .single();

    if (!regret) {
      return NextResponse.json({ error: "Regret not found" }, { status: 404 });
    }

    // Insert reply
    const { data: reply, error: insertError } = await supabase
      .from("regret_replies")
      .insert({ regret_id: id, text: trimmed })
      .select("id, text, created_at")
      .single();

    if (insertError) {
      return NextResponse.json({ error: "Failed to save reply" }, { status: 500 });
    }

    // Atomically increment reply_count on the parent regret
    await supabase.rpc("increment_reply_count", { p_regret_id: id });

    return NextResponse.json({ reply }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

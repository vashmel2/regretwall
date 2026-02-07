import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const PAGE_SIZE = 20;

const VALID_TOPICS = ["love", "career", "money", "family", "health", "fear"];
const VALID_AGE_RANGES = ["<18", "18-25", "26-35", "36-50", "50+"];

// Patterns that indicate spam
const SPAM_PATTERNS = [
  /https?:\/\//i,
  /www\./i,
  /\.com\b/i,
  /\.net\b/i,
  /\.org\b/i,
  /buy now/i,
  /click here/i,
  /free money/i,
  /subscribe/i,
];

export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");

  let query = supabase
    .from("regrets")
    .select("id, text, topic, age_range, created_at")
    .eq("is_hidden", false)
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Failed to fetch regrets" }, { status: 500 });
  }

  const nextCursor =
    data && data.length === PAGE_SIZE
      ? data[data.length - 1].created_at
      : null;

  return NextResponse.json({
    regrets: data ?? [],
    nextCursor,
  });
}

export async function POST(request: NextRequest) {
  // Rate limiting via IP (basic — production should use middleware or edge)
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

  try {
    const body = await request.json();
    const { text, topic, age_range, turnstileToken } = body;

    // Validate text
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const trimmed = text.trim();

    if (trimmed.length < 5) {
      return NextResponse.json(
        { error: "Regret must be at least 5 characters" },
        { status: 400 }
      );
    }

    if (trimmed.length > 500) {
      return NextResponse.json(
        { error: "Regret must be 500 characters or less" },
        { status: 400 }
      );
    }

    // Check spam patterns
    if (SPAM_PATTERNS.some((pattern) => pattern.test(trimmed))) {
      return NextResponse.json(
        { error: "Submission flagged as spam" },
        { status: 400 }
      );
    }

    // Validate optional fields
    if (topic && !VALID_TOPICS.includes(topic)) {
      return NextResponse.json({ error: "Invalid topic" }, { status: 400 });
    }

    if (age_range && !VALID_AGE_RANGES.includes(age_range)) {
      return NextResponse.json({ error: "Invalid age range" }, { status: 400 });
    }

    // Verify Turnstile token if configured
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileSecret !== "your-secret-key-here") {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "Verification required" },
          { status: 400 }
        );
      }

      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: turnstileSecret,
            response: turnstileToken,
            remoteip: ip,
          }),
        }
      );

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json(
          { error: "Verification failed" },
          { status: 400 }
        );
      }
    }

    // Insert into Supabase
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { data, error } = await supabase
      .from("regrets")
      .insert({
        text: trimmed,
        topic: topic || null,
        age_range: age_range || null,
      })
      .select("id, text, topic, age_range, created_at")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save regret" },
        { status: 500 }
      );
    }

    return NextResponse.json({ regret: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + (process.env.FLAG_SALT ?? "regretwall"));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = await hashIp(ip);

  const { data: isNew, error } = await supabase.rpc("flag_regret", {
    regret_id: id,
    flagger_ip_hash: ipHash,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to flag regret" }, { status: 500 });
  }

  if (!isNew) {
    return NextResponse.json({ error: "Already flagged" }, { status: 409 });
  }

  return NextResponse.json({ success: true });
}

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

  const { data, error } = await supabase.rpc("resonate_regret", {
    p_regret_id: id,
    p_ip_hash: ipHash,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to resonate" }, { status: 500 });
  }

  return NextResponse.json({ count: data.count, isNew: data.is_new });
}

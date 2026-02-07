import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { error } = await supabase.rpc("flag_regret", { regret_id: id });

  if (error) {
    return NextResponse.json({ error: "Failed to flag regret" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

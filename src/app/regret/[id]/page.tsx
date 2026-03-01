import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import RegretCard from "@/components/RegretCard";
import ReplySection from "@/components/ReplySection";
import type { RegretReply } from "@/types/database";

type Props = {
  params: Promise<{ id: string }>;
};

async function getRegret(slugOrId: string) {
  if (!supabase) return null;

  // Try slug first (new SEO-friendly URLs)
  const { data: bySlug } = await supabase
    .from("regrets")
    .select("id, text, topic, age_range, created_at, resonance_count, reply_count, slug")
    .eq("slug", slugOrId)
    .eq("is_hidden", false)
    .maybeSingle();
  if (bySlug) return bySlug;

  // Fallback: UUID (old share links remain valid)
  const { data: byId } = await supabase
    .from("regrets")
    .select("id, text, topic, age_range, created_at, resonance_count, reply_count, slug")
    .eq("id", slugOrId)
    .eq("is_hidden", false)
    .maybeSingle();
  return byId ?? null;
}

async function getInitialReplies(
  regretId: string
): Promise<{ replies: RegretReply[]; nextCursor: string | null }> {
  if (!supabase) return { replies: [], nextCursor: null };
  const { data } = await supabase
    .from("regret_replies")
    .select("id, regret_id, text, created_at")
    .eq("regret_id", regretId)
    .eq("is_hidden", false)
    .order("created_at", { ascending: true })
    .limit(20);

  const replies = (data ?? []) as RegretReply[];
  const nextCursor =
    replies.length === 20 ? replies[replies.length - 1].created_at : null;

  return { replies, nextCursor };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const regret = await getRegret(id);

  if (!regret) {
    return { title: "Regret not found | RegretWall" };
  }

  const preview =
    regret.text.length > 120
      ? regret.text.slice(0, 120) + "..."
      : regret.text;

  return {
    title: `"${preview}" — Anonymous Regret | RegretWall`,
    description: `An anonymous regret shared on RegretWall: "${preview}"`,
    openGraph: {
      title: `"${preview}"`,
      description: "An anonymous regret shared by a real person on RegretWall.",
      type: "article",
      siteName: "RegretWall",
    },
    twitter: {
      card: "summary_large_image",
      title: `"${preview}"`,
      description: "An anonymous regret shared by a real person on RegretWall.",
    },
  };
}

export default async function RegretPage({ params }: Props) {
  const { id } = await params;
  const [regret, { replies, nextCursor }] = await Promise.all([
    getRegret(id),
    getInitialReplies(id),
  ]);

  if (!regret) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <header className="pt-12 sm:pt-20 pb-8 sm:pb-12">
          <Link
            href="/"
            className="text-xs sm:text-sm tracking-widest uppercase text-muted hover:text-foreground/60 transition-colors"
          >
            RegretWall
          </Link>
        </header>

        <RegretCard regret={regret} linkable={false} />

        <ReplySection
          regretId={regret.id}
          initialReplies={replies}
          initialNextCursor={nextCursor}
          initialResonanceCount={regret.resonance_count}
        />

        <div className="mt-12 text-center space-y-3">
          <Link href="/" className="block text-sm text-accent hover:underline">
            Read more anonymous regrets
          </Link>
          <p className="text-xs text-muted/40">or share yours, anonymously</p>
        </div>

        <footer className="py-12 text-center">
          <p className="text-xs text-muted/50">
            Anonymous. No accounts. No judgement.
          </p>
        </footer>
      </div>
    </main>
  );
}

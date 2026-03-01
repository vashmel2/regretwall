import Link from "next/link";
import { supabase } from "@/lib/supabase";
import RegretFeed from "@/components/RegretFeed";

const PROMPTS = [
  "What's something you wish you did earlier?",
  "What would you tell your younger self?",
  "What's a door you wish you hadn't closed?",
  "What's the one thing you'd do differently?",
  "What keeps you up at night?",
  "Is there someone you never told how you felt?",
  "What did you never say, but wish you had?",
];

function getDailyPrompt(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return PROMPTS[dayOfYear % PROMPTS.length];
}

function capitalize(name: string): string {
  return name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const revalidate = 60;

export default async function Home() {
  let initialRegrets: Awaited<ReturnType<typeof fetchRegrets>> = [];
  let recentNames: string[] = [];

  async function fetchRegrets() {
    if (!supabase) return [];
    const { data } = await supabase
      .from("regrets")
      .select("id, text, topic, age_range, created_at, resonance_count, reply_count, slug")
      .eq("is_hidden", false)
      .order("created_at", { ascending: false })
      .limit(20);
    return data ?? [];
  }

  async function fetchRecentNames(): Promise<string[]> {
    if (!supabase) return [];
    const { data } = await supabase
      .from("regrets")
      .select("recipient_name")
      .not("recipient_name", "is", null)
      .eq("is_hidden", false)
      .order("created_at", { ascending: false })
      .limit(60);
    if (!data) return [];
    // Relationship words that look odd as name chips on the homepage
    const GENERIC_TERMS = new Set([
      "mom", "dad", "mama", "papa", "mommy", "daddy",
      "sis", "bro", "sister", "brother",
      "ate", "kuya", "lola", "lolo", "tita", "tito",
      "nanay", "tatay", "inay", "itay", "inang", "amang",
    ]);
    // Deduplicate, skip generic relationship words, take first 7 unique names
    const seen = new Set<string>();
    const names: string[] = [];
    for (const row of data) {
      const name = row.recipient_name;
      if (name && !seen.has(name) && !GENERIC_TERMS.has(name.toLowerCase())) {
        seen.add(name);
        names.push(name);
        if (names.length === 7) break;
      }
    }
    return names;
  }

  [initialRegrets, recentNames] = await Promise.all([
    fetchRegrets(),
    fetchRecentNames(),
  ]);

  const initialCursor =
    initialRegrets.length === 20
      ? initialRegrets[initialRegrets.length - 1].created_at
      : null;

  const prompt = getDailyPrompt();

  return (
    <main className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="pt-12 sm:pt-20 pb-8 sm:pb-12">
          <span className="block text-xs sm:text-sm tracking-widest uppercase text-muted mb-4">
            RegretWall
          </span>
          <h1 className="text-xl sm:text-2xl font-light leading-snug text-foreground">
            Read anonymous regrets shared by real people
          </h1>
          <p className="mt-2 text-base sm:text-lg text-foreground/80">
            {prompt}
          </p>
        </header>

        {/* /regrets-for callout — the viral mechanic */}
        <div className="mb-8 p-4 rounded-lg border border-border/50 bg-card/20">
          <p className="text-sm text-foreground/80 mb-3">
            Someone may have left an anonymous regret for you.
          </p>
          {recentNames.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
              {recentNames.map((name) => (
                <Link
                  key={name}
                  href={`/regrets-for/${encodeURIComponent(name)}`}
                  className="text-sm text-accent/70 hover:text-accent transition-colors"
                >
                  {capitalize(name)}
                </Link>
              ))}
            </div>
          )}
          <Link
            href="/regrets-for"
            className="text-sm text-accent underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-colors"
          >
            Check if someone left a regret for you →
          </Link>
        </div>

        {/* Feed */}
        <RegretFeed
          initialRegrets={initialRegrets}
          initialCursor={initialCursor}
          dbAvailable={!!supabase}
        />

        {/* SEO context */}
        <section className="py-10 border-t border-border/30">
          <h2 className="text-xs tracking-widest uppercase text-muted/40 mb-3">
            Real thoughts about life, love, and missed chances
          </h2>
          <p className="text-sm leading-relaxed text-muted/50">
            RegretWall is a public collection of anonymous regrets shared by
            real people. Read honest thoughts about love, career, money,
            family, health, and life decisions — the things people wish they
            had done differently. No accounts, no judgement.
          </p>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center">
          <p className="text-xs text-muted/50">
            Anonymous. No accounts. No judgement.
          </p>
        </footer>
      </div>
    </main>
  );
}

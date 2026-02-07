import { supabase } from "@/lib/supabase";
import RegretFeed from "@/components/RegretFeed";

const PROMPTS = [
  "What's something you wish you did earlier?",
  "What would you tell your younger self?",
  "What's a door you wish you hadn't closed?",
  "What's the one thing you'd do differently?",
  "What keeps you up at night?",
];

function getDailyPrompt(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return PROMPTS[dayOfYear % PROMPTS.length];
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function Home() {
  const { data: regrets } = await supabase
    .from("regrets")
    .select("id, text, topic, age_range, created_at")
    .eq("is_hidden", false)
    .order("created_at", { ascending: false })
    .limit(20);

  const initialRegrets = regrets ?? [];
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
          <h1 className="text-xs sm:text-sm tracking-widest uppercase text-muted mb-6">
            RegretWall
          </h1>
          <p className="text-xl sm:text-2xl font-light leading-snug text-foreground/80">
            {prompt}
          </p>
        </header>

        {/* Feed */}
        <RegretFeed
          initialRegrets={initialRegrets}
          initialCursor={initialCursor}
        />

        {/* Footer */}
        <footer className="py-12 text-center">
          <p className="text-xs text-muted/30">
            Anonymous. No accounts. No judgement.
          </p>
        </footer>
      </div>
    </main>
  );
}

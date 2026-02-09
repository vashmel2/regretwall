import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import NameSearchForm from "@/components/NameSearchForm";
import RecipientFeed from "@/components/RecipientFeed";

type Props = {
  params: Promise<{ name: string }>;
};

function capitalize(name: string): string {
  return name
    .split(/[\s-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const displayName = capitalize(decodeURIComponent(name));

  return {
    title: `Anonymous Regrets for ${displayName} | RegretWall`,
    description: `Read anonymous regrets left for ${displayName}. Honest words from people who wish they had done things differently.`,
    openGraph: {
      title: `Anonymous Regrets for ${displayName}`,
      description: `Someone left an anonymous regret for ${displayName} on RegretWall.`,
      type: "website",
      siteName: "RegretWall",
    },
  };
}

export default async function RegretsForNamePage({ params }: Props) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name).toLowerCase().trim();
  const displayName = capitalize(decodedName);

  let initialRegrets: {
    id: string;
    text: string;
    topic: string | null;
    age_range: string | null;
    created_at: string;
    recipient_name: string | null;
  }[] = [];
  let totalCount = 0;

  if (supabase) {
    const [{ data }, { count }] = await Promise.all([
      supabase
        .from("regrets")
        .select("id, text, topic, age_range, created_at, recipient_name")
        .eq("is_hidden", false)
        .ilike("recipient_name", decodedName)
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("regrets")
        .select("*", { count: "exact", head: true })
        .eq("is_hidden", false)
        .ilike("recipient_name", decodedName),
    ]);

    initialRegrets = data ?? [];
    totalCount = count ?? 0;
  }

  const initialCursor =
    initialRegrets.length === 20
      ? initialRegrets[initialRegrets.length - 1].created_at
      : null;

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
          <h1 className="mt-6 text-2xl sm:text-3xl font-light leading-snug text-foreground">
            Regrets for {displayName}
          </h1>
          {totalCount > 0 && (
            <p className="mt-2 text-sm text-muted">
              {totalCount} anonymous {totalCount === 1 ? "regret" : "regrets"}
            </p>
          )}
        </header>

        {/* Search for another name */}
        <NameSearchForm initialValue={decodedName} />

        {/* Feed */}
        {initialRegrets.length > 0 ? (
          <RecipientFeed
            name={decodedName}
            initialRegrets={initialRegrets}
            initialCursor={initialCursor}
          />
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted mb-4">
              No one has left a regret for {displayName} yet.
            </p>
            <Link
              href="/"
              className="text-sm text-accent hover:underline"
            >
              Be the first to leave one
            </Link>
          </div>
        )}

        <footer className="py-12 text-center">
          <Link
            href="/"
            className="text-xs text-muted/40 hover:text-muted transition-colors"
          >
            Back to RegretWall
          </Link>
        </footer>
      </div>
    </main>
  );
}

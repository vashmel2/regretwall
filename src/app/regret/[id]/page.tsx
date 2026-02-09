import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import RegretCard from "@/components/RegretCard";

type Props = {
  params: Promise<{ id: string }>;
};

async function getRegret(id: string) {
  if (!supabase) return null;
  const { data } = await supabase
    .from("regrets")
    .select("id, text, topic, age_range, created_at")
    .eq("id", id)
    .eq("is_hidden", false)
    .single();
  return data;
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
      description:
        "An anonymous regret shared by a real person on RegretWall.",
      type: "article",
      siteName: "RegretWall",
    },
    twitter: {
      card: "summary_large_image",
      title: `"${preview}"`,
      description:
        "An anonymous regret shared by a real person on RegretWall.",
    },
  };
}

export default async function RegretPage({ params }: Props) {
  const { id } = await params;
  const regret = await getRegret(id);

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

        <RegretCard regret={regret} />

        <div className="mt-12 text-center space-y-3">
          <Link
            href="/"
            className="block text-sm text-accent hover:underline"
          >
            Read more anonymous regrets
          </Link>
          <p className="text-xs text-muted/40">
            or share yours, anonymously
          </p>
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

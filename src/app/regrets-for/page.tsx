import type { Metadata } from "next";
import Link from "next/link";
import NameSearchForm from "@/components/NameSearchForm";

export const metadata: Metadata = {
  title: "Did Someone Leave a Regret for You? | RegretWall",
  description:
    "Search your name to see if someone left an anonymous regret for you on RegretWall. Honest words from people who wish they had done things differently.",
  openGraph: {
    title: "Did Someone Leave a Regret for You?",
    description:
      "Search your name to see if someone left an anonymous regret for you. Honest words from real people.",
    type: "website",
    siteName: "RegretWall",
  },
};

export default function RegretsForPage() {
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
            Did someone leave a regret for you?
          </h1>
          <p className="mt-2 text-sm text-muted">
            Enter your first name to find out.
          </p>
        </header>

        <NameSearchForm />

        <section className="mt-16 py-10 border-t border-border/30">
          <p className="text-sm leading-relaxed text-muted/50">
            People use RegretWall to anonymously share things they wish they had
            said or done. Sometimes those regrets are about someone specific. If
            someone shared a link with you, your name might be here.
          </p>
        </section>

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

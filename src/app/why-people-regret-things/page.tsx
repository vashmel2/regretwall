import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why People Regret Things They Didn't Do | RegretWall",
  description:
    "Explore why regret over inaction hurts more than failure. Learn why people regret the things they didn't do — and why sharing those regrets anonymously helps.",
  openGraph: {
    title: "Why People Regret Things They Didn't Do",
    description:
      "The psychology of regret: why missed chances haunt us more than mistakes, and why anonymous sharing helps people process what they wish they had done differently.",
    type: "article",
    siteName: "RegretWall",
  },
};

export default function WhyPeopleRegretThings() {
  return (
    <main className="min-h-screen">
      <article className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <header className="mb-10">
          <Link
            href="/"
            className="text-xs sm:text-sm tracking-widest uppercase text-muted hover:text-foreground/60 transition-colors"
          >
            RegretWall
          </Link>
          <h1 className="mt-6 text-2xl sm:text-3xl font-light leading-snug text-foreground">
            Why people regret things they didn&apos;t do
          </h1>
          <p className="mt-3 text-sm text-muted">
            On missed chances, silence, and the weight of &ldquo;what
            if.&rdquo;
          </p>
        </header>

        <div className="space-y-6 text-base leading-relaxed text-foreground/85 font-light">
          <p>
            Most people assume their biggest regrets would come from mistakes
            — the wrong job, the bad relationship, the investment that tanked.
            But research consistently shows the opposite. Over time, it&apos;s
            not what we did that haunts us. It&apos;s what we didn&apos;t do.
          </p>

          <p>
            The things we never said. The chances we didn&apos;t take. The
            conversations we avoided because they felt too uncomfortable, too
            vulnerable, too risky. Those are the ones that stay.
          </p>

          <h2 className="text-lg sm:text-xl font-light text-foreground pt-4">
            Why inaction hurts more than failure
          </h2>

          <p>
            When you try something and it doesn&apos;t work, your brain has a
            way of rationalizing it. You learn from it, you adjust, you move
            on. But when you don&apos;t try at all, there&apos;s nothing to
            learn from. There&apos;s just a blank space where a memory should
            have been.
          </p>

          <p>
            Psychologists call this the{" "}
            <strong className="font-normal text-foreground">
              Zeigarnik effect
            </strong>{" "}
            — the tendency for unfinished tasks to occupy our minds more than
            completed ones. An unanswered question loops endlessly. A closed
            door, even if it led somewhere bad, eventually fades.
          </p>

          <p>
            This is why &ldquo;what if&rdquo; is more painful than &ldquo;I
            tried and it didn&apos;t work.&rdquo; One has an ending. The other
            doesn&apos;t.
          </p>

          <h2 className="text-lg sm:text-xl font-light text-foreground pt-4">
            The categories of regret that come up most
          </h2>

          <p>
            When you{" "}
            <Link
              href="/#recent-regrets"
              className="text-accent hover:underline"
            >
              read real anonymous regrets
            </Link>
            , certain themes emerge again and again:
          </p>

          <ul className="list-none space-y-3 pl-0">
            <li className="border-l-2 border-border pl-4">
              <strong className="font-normal text-foreground">Love</strong> —
              The person they didn&apos;t tell. The relationship they stayed in
              too long, or left too soon. The words they swallowed.
            </li>
            <li className="border-l-2 border-border pl-4">
              <strong className="font-normal text-foreground">Career</strong>{" "}
              — The dream job they didn&apos;t apply for. The safe path they
              chose over the meaningful one. The years spent building someone
              else&apos;s vision.
            </li>
            <li className="border-l-2 border-border pl-4">
              <strong className="font-normal text-foreground">Fear</strong> —
              The trip they didn&apos;t take. The conversation they avoided.
              The life they didn&apos;t live because they were afraid of what
              people would think.
            </li>
            <li className="border-l-2 border-border pl-4">
              <strong className="font-normal text-foreground">Silence</strong>{" "}
              — The apology they never gave. The &ldquo;I love you&rdquo; they
              assumed was obvious. The call they kept meaning to make.
            </li>
          </ul>

          <p>
            These aren&apos;t dramatic, life-altering catastrophes. They&apos;re
            quiet. They&apos;re ordinary. And that&apos;s exactly why they
            stick — because anyone can see themselves in them.
          </p>

          <h2 className="text-lg sm:text-xl font-light text-foreground pt-4">
            Why sharing regrets anonymously helps
          </h2>

          <p>
            Regret is one of the most isolating emotions. It feels deeply
            personal — like you&apos;re the only person who missed that
            obvious chance, who stayed quiet when they should have spoken, who
            let something good slip away.
          </p>

          <p>
            But the moment you see someone else say the same thing — someone
            you&apos;ll never meet, with no name and no face — something
            shifts. You realize you&apos;re not uniquely broken. You&apos;re
            just human.
          </p>

          <p>
            That&apos;s the power of anonymity. It strips away performance.
            There&apos;s no audience to impress, no reputation to manage. Just
            the raw thought, written down and released into a wall of other
            raw thoughts.
          </p>

          <p>
            It&apos;s not therapy. It&apos;s not advice. It&apos;s witnessing.
            And sometimes, being witnessed — even anonymously — is enough to
            loosen the grip of something you&apos;ve been carrying alone.
          </p>

          <h2 className="text-lg sm:text-xl font-light text-foreground pt-4">
            What people wish they did differently
          </h2>

          <p>
            If there&apos;s one pattern that runs through every regret, it&apos;s
            this: people don&apos;t regret being too honest, too vulnerable, or
            too brave. They regret holding back. Playing it safe. Waiting for
            the &ldquo;right time&rdquo; that never came.
          </p>

          <p>
            The father who wishes he had said &ldquo;I&apos;m proud of
            you&rdquo; out loud. The woman who wishes she had left the job
            that was slowly hollowing her out. The friend who wishes they had
            shown up instead of sending a text.
          </p>

          <p>
            None of these are failures. They&apos;re absences — small ones
            that grew heavy with time.
          </p>

          <h2 className="text-lg sm:text-xl font-light text-foreground pt-4">
            A wall of things left unsaid
          </h2>

          <p>
            RegretWall exists because these thoughts need somewhere to go. Not
            a journal that no one reads. Not a social media post optimized for
            likes. Just a quiet wall where people can leave the things
            they&apos;ve been carrying — and where others can scroll through
            them and feel a little less alone.
          </p>

          <p>
            No accounts. No usernames. No advice. Just honest words from
            people who wish they had done one thing differently.
          </p>

          <p className="pt-4">
            <Link href="/#recent-regrets" className="text-accent hover:underline">
              See what people wish they did differently
            </Link>{" "}
            — or share your own, anonymously.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border/30 text-center">
          <Link
            href="/"
            className="text-xs text-muted/40 hover:text-muted transition-colors"
          >
            Back to RegretWall
          </Link>
        </footer>
      </article>
    </main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — RegretWall",
  description: "Terms of Service for RegretWall. Read our rules for using the anonymous regret wall.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <header className="pt-12 sm:pt-20 pb-8">
          <Link href="/" className="text-xs tracking-widest uppercase text-muted hover:text-foreground transition-colors">
            ← RegretWall
          </Link>
          <h1 className="mt-6 text-xl sm:text-2xl font-light text-foreground">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-muted">
            Effective date: March 1, 2026. Last updated: March 1, 2026.
          </p>
        </header>

        <div className="prose-regret pb-20 space-y-10">

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">1. Acceptance</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              By accessing or using RegretWall ("the Service," "we," "us"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service. These terms apply to all visitors and users, including those who submit content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">2. What RegretWall Is</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              RegretWall is an anonymous public platform where people share personal regrets and leave anonymous messages for named individuals. All submissions are publicly visible. There are no private messages and no user accounts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">3. Eligibility</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              You must be at least 13 years old to use this Service. By using RegretWall, you represent that you meet this requirement. If you are under 18, you should have parental permission before submitting content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">4. Content You Submit</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              You retain ownership of the content you submit. By submitting, you grant RegretWall a perpetual, worldwide, royalty-free, non-exclusive license to store, display, and distribute your submission as part of the Service.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              All submissions become publicly visible immediately upon posting. You are solely responsible for the content you submit. You represent that your submission does not violate any applicable law or third-party rights.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">Anonymity notice:</strong> While we do not display your identity, complete anonymity cannot be guaranteed. Your content is public and may be indexed by search engines, shared by other users, or potentially linked back to you through the content itself. Do not include information in your submission that you wish to keep private.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">5. Prohibited Content</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              You agree not to submit content that:
            </p>
            <ul className="text-sm leading-relaxed text-foreground/80 space-y-2 list-none pl-0">
              {[
                "Is illegal under any applicable law, including defamation, invasion of privacy, or copyright infringement",
                "Constitutes harassment, threats, intimidation, or targeted abuse toward any individual",
                "Contains hate speech, slurs, or content that dehumanizes people based on race, ethnicity, religion, gender, sexual orientation, disability, or other protected characteristics",
                "Includes private or personally identifying information about a real person without their consent (doxxing) — including home addresses, phone numbers, workplaces, financial details, or other sensitive personal data",
                "Impersonates any real person in a way intended to deceive or harm",
                "Constitutes spam, advertising, or commercial solicitation",
                "Contains links to external websites or services",
                "Is intended to manipulate, game, or abuse the platform's features",
                "Violates the privacy or dignity of minors",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-muted shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-foreground/80">
              The "For someone" feature (leaving a regret addressed to a named person) is intended for sincere, personal expression — not for harassment, public shaming, or coordinated targeting of individuals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">6. Content Moderation and Removal</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              We reserve the right — but not the obligation — to review, hide, or permanently delete any submission at any time, for any reason, without prior notice or liability to you. This includes content that we determine, in our sole discretion, violates these Terms or is otherwise objectionable.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              Users may flag content for review. Flagging does not guarantee removal. We are not responsible for moderating all content in real time and make no representations that the Service is free of harmful content.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              If you believe content on the Service violates your rights or these Terms, you may contact us using the details at the end of this document. We will review reports in good faith but are not obligated to take any particular action.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">7. No Accounts</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              RegretWall does not require or offer user accounts. We cannot verify the identity of any submitter. Because of this, we cannot facilitate deletion requests tied to specific submissions — once something is posted, we cannot guarantee its removal upon request unless we independently decide to do so.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">8. Disclaimer of Warranties</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL CONTENT.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">9. Limitation of Liability</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, REGRETWALL AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO DAMAGES ARISING FROM USER-GENERATED CONTENT, LOSS OF DATA, OR UNAUTHORIZED ACCESS.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE GREATER OF ONE HUNDRED PHILIPPINE PESOS (PHP 100) OR THE AMOUNT YOU PAID US IN THE PAST TWELVE MONTHS (WHICH FOR A FREE SERVICE IS ZERO).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">10. Indemnification</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              You agree to indemnify, defend, and hold harmless RegretWall and its operators from and against any claims, liabilities, damages, losses, and expenses — including legal fees — arising from your use of the Service, your submissions, or your violation of these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">11. Third-Party Services</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              RegretWall uses third-party infrastructure providers including Supabase (database), Vercel (hosting), and Cloudflare (network protection). Your use of this Service is subject to their respective terms and privacy policies. We are not responsible for the practices of these providers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">12. Governing Law</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              These Terms are governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to conflict of law principles. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Cebu City, Philippines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">13. Changes to These Terms</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              We may update these Terms at any time. Continued use of the Service after changes are posted constitutes acceptance of the updated Terms. The effective date at the top of this page will reflect the most recent revision.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">14. Contact</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              For questions about these Terms or to report content, contact us at:{" "}
              <a href="mailto:hello@regretwall.com" className="text-accent underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-colors">
                hello@regretwall.com
              </a>
            </p>
          </section>

          <div className="pt-6 border-t border-border/30 flex gap-6 text-xs text-muted">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-foreground transition-colors">← Back to RegretWall</Link>
          </div>

        </div>
      </div>
    </main>
  );
}

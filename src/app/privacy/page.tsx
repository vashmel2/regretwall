import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — RegretWall",
  description: "Privacy Policy for RegretWall. Learn what data we collect and how we use it.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <header className="pt-12 sm:pt-20 pb-8">
          <Link href="/" className="text-xs tracking-widest uppercase text-muted hover:text-foreground transition-colors">
            ← RegretWall
          </Link>
          <h1 className="mt-6 text-xl sm:text-2xl font-light text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-muted">
            Effective date: March 1, 2026. Last updated: March 1, 2026.
          </p>
        </header>

        <div className="pb-20 space-y-10">

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">1. Overview</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              RegretWall is designed to be as private as possible. There are no user accounts, no email collection, and no behavioral tracking. This policy explains the limited data we do collect, why we collect it, and how it is used.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              This Privacy Policy applies to all users of regretwall.com, regardless of location, including users in the Philippines (covered by Republic Act 10173, the Data Privacy Act of 2012), the European Union (covered by GDPR), and California, USA (covered by CCPA).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">2. What We Collect</h2>

            <p className="text-sm font-medium text-foreground/90">Content you submit</p>
            <p className="text-sm leading-relaxed text-foreground/80">
              When you post a regret, we store: the text of your submission, an optional topic category, and an optional recipient name. This content is publicly visible to all visitors and indexed by search engines. Do not include sensitive personal information about yourself or others in your submissions.
            </p>

            <p className="text-sm font-medium text-foreground/90 pt-2">IP address (hashed)</p>
            <p className="text-sm leading-relaxed text-foreground/80">
              When you submit content, flag a post, or react to a regret, we process your IP address. We immediately convert it to a one-way cryptographic hash (SHA-256 with a server-side salt) and store only the hash — never the original IP address. This hash cannot be reversed to identify you and is used solely for:
            </p>
            <ul className="text-sm leading-relaxed text-foreground/80 space-y-1 pl-0 list-none">
              {[
                "Rate limiting to prevent spam and abuse",
                "Deduplicating flags so one person cannot flag the same post multiple times",
                "Deduplicating reactions (\"felt this\") to prevent manipulation",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-muted shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm font-medium text-foreground/90 pt-2">Technical / server logs</p>
            <p className="text-sm leading-relaxed text-foreground/80">
              Our hosting provider (Vercel) and network protection service (Cloudflare) may collect standard server access logs including IP addresses, browser type, and page requests as part of normal infrastructure operation. These are governed by their respective privacy policies and are not controlled by us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">3. What We Do Not Collect</h2>
            <ul className="text-sm leading-relaxed text-foreground/80 space-y-1 pl-0 list-none">
              {[
                "Names, email addresses, or any account information",
                "Precise location data",
                "Tracking cookies or advertising identifiers",
                "Device fingerprints or cross-site behavioral data",
                "Social media profile information",
                "Payment information (the Service is free)",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-muted shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-foreground/80">
              We do not use Google Analytics, Meta Pixel, or any third-party behavioral tracking scripts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">4. How We Use Your Data</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              Data collected is used only to operate the Service:
            </p>
            <ul className="text-sm leading-relaxed text-foreground/80 space-y-1 pl-0 list-none">
              {[
                "Submitted text and recipient names are stored and displayed publicly as part of the Service",
                "IP hashes are used for abuse prevention, rate limiting, and deduplication as described above",
                "We do not sell, rent, share, or monetize any user data",
                "We do not use your data for advertising or profiling",
                "We do not share data with third parties except as required to operate the Service (see Section 5)",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-muted shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widests uppercase text-muted/60">5. Third-Party Services</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              We use the following third-party providers to operate the Service. Each has their own privacy policy:
            </p>
            <ul className="text-sm leading-relaxed text-foreground/80 space-y-2 pl-0 list-none">
              <li className="flex gap-2">
                <span className="text-muted shrink-0">—</span>
                <span><strong className="text-foreground/90">Supabase</strong> — database and storage. Submitted content and IP hashes are stored on Supabase infrastructure. Data may be hosted in the US or EU depending on Supabase's configuration.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted shrink-0">—</span>
                <span><strong className="text-foreground/90">Vercel</strong> — web hosting and serverless functions. Processes requests and may retain server logs.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted shrink-0">—</span>
                <span><strong className="text-foreground/90">Cloudflare</strong> — network protection and DNS. May process IP addresses and request data as part of DDoS protection and CDN services.</span>
              </li>
            </ul>
            <p className="text-sm leading-relaxed text-foreground/80">
              We do not control the data practices of these providers. We have chosen providers who maintain high privacy and security standards, but we encourage you to review their respective policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">6. Data Retention</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              Publicly submitted content (regrets, replies) is retained indefinitely as part of the public record of the Service, unless removed by us for policy violations. IP hashes are retained for as long as necessary for abuse prevention purposes.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              Because there are no user accounts, we have no way to identify which submissions belong to a particular person based on a deletion request alone. If you can provide specific information identifying your submission (e.g., the exact text and approximate date), we will review removal requests on a case-by-case basis.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">7. Your Rights</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="text-sm leading-relaxed text-foreground/80 space-y-1 pl-0 list-none">
              {[
                "Right to be informed about how your data is used (this policy fulfills that)",
                "Right to access data we hold about you",
                "Right to correction of inaccurate data",
                "Right to erasure (\"right to be forgotten\")",
                "Right to object to processing",
                "Right to data portability",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-muted shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-foreground/80">
              To exercise any of these rights, contact us at the address below. Note that because we do not collect identity information, we may be limited in our ability to fulfill certain requests without additional identifying context about your submission.
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              Philippine users may also file a complaint with the National Privacy Commission (NPC) at{" "}
              <span className="text-foreground/60">privacy.gov.ph</span> if you believe your data rights have been violated.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">8. Children's Privacy</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              RegretWall is intended for users 18 years of age and older. We do not knowingly collect any information from minors. If you believe a minor has submitted content to our Service, please contact us and we will remove it promptly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">9. Security</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              We implement reasonable technical measures to protect data, including one-way hashing of IP addresses, HTTPS encryption in transit, and access controls on our database. However, no system is completely secure, and we cannot guarantee absolute security of data transmitted over the internet.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">10. Anonymity Limitation</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              RegretWall does not link posts to identifiable users. However, we cannot guarantee complete anonymity. Your submission is publicly visible and may be shared, screenshot, or linked to by others. Search engines may index your submission. The content of your submission itself — if it contains identifying details — may be traced back to you. Submit only what you are comfortable being permanently public.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">11. Changes to This Policy</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              We may update this Privacy Policy from time to time. The effective date at the top of this page will reflect any changes. Continued use of the Service after updates constitutes acceptance of the revised policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm tracking-widest uppercase text-muted/60">12. Contact</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              For privacy-related questions, data requests, or content removal, contact us at:{" "}
              <a href="mailto:hello@regretwall.com" className="text-accent underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-colors">
                hello@regretwall.com
              </a>
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              We are based in the Philippines and operate under Philippine law.
            </p>
          </section>

          <div className="pt-6 border-t border-border/30 flex gap-6 text-xs text-muted">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-foreground transition-colors">← Back to RegretWall</Link>
          </div>

        </div>
      </div>
    </main>
  );
}

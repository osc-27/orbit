import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = { title: "Help & FAQ", description: "Answers to common questions about using Orbit." };

const FAQ = [
  { q: "Does checking my rate affect my credit score?", a: "No. Orbit uses a soft credit inquiry to show your prequalified options, which does not affect your score. A hard inquiry only happens if you formally apply with a lender you choose." },
  { q: "Is Orbit a lender?", a: "No. Orbit is a marketplace that matches you with lenders and partners. We don't make credit decisions or lend money." },
  { q: "How does Orbit make money?", a: "Lenders and partners may compensate us when you get a product through the marketplace. Featured placements are paid and labeled; market results are sorted by APR." },
  { q: "Are the offers real?", a: "In this preview build, all offers are illustrative mock data. In production, offers come from OppFi and partner lenders via prequalification." },
  { q: "Why don't I see any offers?", a: "Offers depend on your profile, amount, and state. Try a different amount, or explore the Marketplace for other options." },
  { q: "How do I stop marketing emails?", a: "Every email includes an unsubscribe link, and you can manage preferences from our Privacy Policy page at any time." },
];

export default function HelpPage() {
  return (
    <div className="wrap-narrow py-14 sm:py-20">
      <p className="eyebrow">Help center</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">How can we help?</h1>
      <p className="mt-4 text-lg text-muted">Answers to the questions we hear most.</p>

      <div className="mt-8 flex flex-col gap-3">
        {FAQ.map((f) => (
          <details key={f.q} className="card group p-5">
            <summary className="cursor-pointer list-none font-bold text-ink marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {f.q}
                <span className="text-brand transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-2 text-sm text-muted">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="card flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-brand-dark">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-bold text-ink">Chat with us</h2>
            <p className="text-sm text-muted">Weekdays, 8am–8pm ET</p>
          </div>
        </div>
        <a href="mailto:support@orbit.example.com" className="card flex items-center gap-4 p-5 hover:border-brand">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-brand-dark">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-bold text-ink">Email support</h2>
            <p className="text-sm text-muted">support@orbit.example.com</p>
          </div>
        </a>
      </div>

      <p className="mt-8 text-sm text-muted">
        Still stuck?{" "}
        <Link href="/prequalify" className="font-semibold text-brand hover:underline">
          Check your rate
        </Link>{" "}
        or browse the{" "}
        <Link href="/orbit" className="font-semibold text-brand hover:underline">
          Marketplace
        </Link>
        .
      </p>
    </div>
  );
}

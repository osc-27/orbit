import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { LENDERS } from "@/lib/offers/lenders";
import { HandoffRedirector } from "@/components/HandoffRedirector";
import { LenderLogo } from "@/components/offers/LenderLogo";
import { Logo } from "@/components/ui/Logo";
import { currency, aprRange } from "@/lib/format";

export const metadata = { title: "Taking you to OppLoans" };

export default async function ContinueOppfiPage({
  searchParams,
}: {
  searchParams: Promise<{ offer?: string; amt?: string }>;
}) {
  const sp = await searchParams;
  const product = LENDERS.find((l) => l.id === sp.offer && l.isFirstParty);
  const amount = Number(sp.amt ?? "0");
  const handoffUrl = `/handoff/oppfi?offer=${encodeURIComponent(sp.offer ?? "")}&amt=${amount}`;

  if (!product) {
    return (
      <div className="wrap-narrow py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">Something went sideways</h1>
        <Link href="/" className="btn-primary mt-6">
          Back home
        </Link>
      </div>
    );
  }

  const apr = product.aprByBand.good ?? Object.values(product.aprByBand)[0] ?? [0, 0];

  return (
    <div className="wrap-narrow py-24 text-center">
      <HandoffRedirector to={handoffUrl} />

      <div className="mb-8 flex items-center justify-center gap-4 text-brand">
        <Logo height={26} />
        <ArrowRight className="h-5 w-5 animate-pulse text-muted" aria-hidden="true" />
        <LenderLogo text={product.logoText} color={product.brandColor} size={40} />
      </div>

      <h1 className="text-2xl font-extrabold text-ink">Taking you to OppLoans…</h1>
      <p className="mx-auto mt-2 max-w-md text-muted">
        You&apos;re being securely transferred to complete your application. Your rate check did not affect your
        credit score.
      </p>

      <div className="card mx-auto mt-8 max-w-md p-5 text-left">
        <div className="flex items-center gap-3">
          <LenderLogo text={product.logoText} color={product.brandColor} />
          <div>
            <div className="font-bold text-ink">{product.name}</div>
            <div className="text-xs text-muted">{product.fundingSpeed}</div>
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">Est. APR</dt>
            <dd className="font-bold text-brand-dark">{aprRange(apr[0], apr[1])}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">Amount</dt>
            <dd className="font-bold text-ink">{currency(amount)}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">Funds</dt>
            <dd className="text-xs font-medium text-ink">Next day*</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 h-1 w-full max-w-md mx-auto overflow-hidden rounded-full bg-cloud">
        <div className="h-full w-1/3 animate-[grow_1.7s_ease-in-out_forwards] bg-brand" />
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted">
        <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" /> Secure transfer
      </p>
      <a href={handoffUrl} className="mt-2 inline-block text-xs font-semibold text-brand hover:underline">
        Not redirected? Continue manually
      </a>
    </div>
  );
}

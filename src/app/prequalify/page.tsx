import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Funnel } from "@/components/prequalify/Funnel";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Check your rate",
  description: "Answer a few questions to see prequalified offers — a soft inquiry that won't affect your credit.",
};

// Lantern-style flow: minimal brand chrome (logo + the funnel's progress bar).
// The step content is our mock stand-in for the Engine-driven question/offer
// flow — swap the step bodies for the Engine embed when live.
export default async function PrequalifyPage({
  searchParams,
}: {
  searchParams: Promise<{ goal?: string; vertical?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="min-h-screen bg-cloud">
      <div className="border-b border-line bg-paper">
        <div className="wrap-narrow flex h-16 items-center justify-center">
          <Link href="/" className="text-brand" aria-label="Orbit home">
            <Logo height={28} />
          </Link>
        </div>
      </div>

      <div className="wrap-narrow py-8 sm:py-12">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            See your real rate — no credit impact
          </h1>
          <p className="mt-1 text-sm text-muted">Answer a few questions. It takes about 2 minutes.</p>
        </div>

        <Funnel defaultGoalId={sp.goal} defaultVertical={sp.vertical} />

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted">
          <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Your information is encrypted and secure. Orbit is not
          a lender.
        </p>
      </div>
    </div>
  );
}

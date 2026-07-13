import type { Metadata } from "next";
import { Funnel } from "@/components/prequalify/Funnel";

export const metadata: Metadata = {
  title: "Check your rate",
  description: "Answer a few questions to see prequalified offers — a soft inquiry that won't affect your credit.",
};

export default async function PrequalifyPage({
  searchParams,
}: {
  searchParams: Promise<{ goal?: string; vertical?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="wrap-narrow py-10 sm:py-16">
      <div className="mb-6 text-center">
        <p className="eyebrow">Prequalify in 2 minutes</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          See your real rate — no credit impact
        </h1>
      </div>
      <Funnel defaultGoalId={sp.goal} defaultVertical={sp.vertical} />
    </div>
  );
}

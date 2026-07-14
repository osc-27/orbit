"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { GOALS, VERTICALS } from "@/lib/content/verticals";
import { currency } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { CreditBand } from "@/lib/offers/types";

const schema = z.object({
  vertical: z.enum(["personal", "auto", "card", "student-refi", "home"]),
  goal: z.string().optional(),
  amount: z.number().min(300, "Enter at least $300").max(100000, "Enter $100,000 or less"),
  creditBand: z.enum(["excellent", "good", "fair", "poor"]),
  firstName: z.string().min(1, "Enter your first name"),
  lastName: z.string().min(1, "Enter your last name"),
  email: z.string().email("Enter a valid email"),
  zip: z.string().regex(/^\d{5}$/, "Enter a 5-digit ZIP"),
  consent: z.boolean().refine((v) => v === true, "Please agree to continue"),
});

type FormValues = z.infer<typeof schema>;

const BANDS: { value: CreditBand; label: string; range: string }[] = [
  { value: "excellent", label: "Excellent", range: "720+" },
  { value: "good", label: "Good", range: "660–719" },
  { value: "fair", label: "Fair", range: "600–659" },
  { value: "poor", label: "Building", range: "Below 600" },
];

const STEP_FIELDS: (keyof FormValues)[][] = [
  ["vertical", "amount"],
  ["creditBand"],
  ["firstName", "lastName", "email", "zip", "consent"],
];

export function Funnel({ defaultGoalId, defaultVertical }: { defaultGoalId?: string; defaultVertical?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const initialGoal = useMemo(
    () => GOALS.find((g) => g.id === defaultGoalId) ?? null,
    [defaultGoalId],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      vertical: (initialGoal?.vertical ?? (defaultVertical as FormValues["vertical"]) ?? "personal"),
      goal: initialGoal?.id,
      amount: initialGoal?.amount ?? 5000,
      creditBand: "good",
      firstName: "",
      lastName: "",
      email: "",
      zip: "",
      consent: false,
    },
  });

  const vertical = watch("vertical");
  const amount = watch("amount");
  const creditBand = watch("creditBand");
  const consent = watch("consent");

  async function next() {
    const ok = await trigger(STEP_FIELDS[step]);
    if (ok) setStep((s) => Math.min(s + 1, 2));
  }

  function onSubmit(data: FormValues) {
    setSubmitting(true);
    try {
      sessionStorage.setItem("orbit.lead", JSON.stringify(data));
    } catch {
      /* sessionStorage may be unavailable; offers page falls back gracefully */
    }
    router.push("/offers");
  }

  return (
    <div className="card overflow-hidden">
      {/* progress */}
      <div className="h-1.5 bg-cloud">
        <div
          className="h-full bg-brand transition-all duration-300"
          style={{ width: `${((step + 1) / 3) * 100}%` }}
        />
      </div>

      <div className="p-6 sm:p-8">
        {/* soft-pull reassurance */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-tint px-3.5 py-1.5 text-xs font-semibold text-brand-dark">
          <Lock className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
          Checking your rate won&apos;t affect your credit score
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* ── Step 1: goal + amount ── */}
          {step === 0 && (
            <fieldset>
              <legend className="text-xl font-bold text-ink">What are you looking to do?</legend>
              <p className="mt-1 text-sm text-muted">We&apos;ll match you to the right offers.</p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {GOALS.map((g) => {
                  const active = watch("goal") === g.id;
                  return (
                    <button
                      type="button"
                      key={g.id}
                      onClick={() => {
                        setValue("goal", g.id);
                        setValue("vertical", g.vertical);
                        setValue("amount", g.amount);
                      }}
                      className={cn(
                        "rounded-xl border p-3 text-left text-sm font-semibold transition-all",
                        active
                          ? "border-brand bg-brand-tint text-brand-dark shadow-[0_0_0_3px_var(--color-brand-tint-2)]"
                          : "border-line bg-paper text-ink hover:border-brand-dark/40",
                      )}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-7">
                <label htmlFor="amount" className="text-sm font-semibold text-ink">
                  {vertical === "card" ? "Credit line you want" : "How much do you need?"}
                </label>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-brand-dark">{currency(amount || 0)}</span>
                </div>
                <input
                  id="amount"
                  type="range"
                  min={vertical === "card" ? 300 : 500}
                  max={vertical === "card" ? 10000 : 50000}
                  step={vertical === "card" ? 100 : 500}
                  value={amount}
                  onChange={(e) => setValue("amount", Number(e.target.value), { shouldValidate: true })}
                  className="mt-3 w-full accent-[var(--color-brand)]"
                />
                {errors.amount && <p className="mt-1 text-xs font-medium text-crit">{errors.amount.message}</p>}
              </div>
            </fieldset>
          )}

          {/* ── Step 2: credit band ── */}
          {step === 1 && (
            <fieldset>
              <legend className="text-xl font-bold text-ink">How&apos;s your credit?</legend>
              <p className="mt-1 text-sm text-muted">An estimate is fine — this only shapes your matches.</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {BANDS.map((b) => {
                  const active = creditBand === b.value;
                  return (
                    <button
                      type="button"
                      key={b.value}
                      onClick={() => setValue("creditBand", b.value, { shouldValidate: true })}
                      className={cn(
                        "flex items-center justify-between rounded-xl border p-4 text-left transition-all",
                        active
                          ? "border-brand bg-brand-tint shadow-[0_0_0_3px_var(--color-brand-tint-2)]"
                          : "border-line bg-paper hover:border-brand-dark/40",
                      )}
                    >
                      <span>
                        <span className="block font-bold text-ink">{b.label}</span>
                        <span className="block text-xs text-muted">{b.range}</span>
                      </span>
                      {active && <Check className="h-5 w-5 text-brand" strokeWidth={2.4} aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* ── Step 3: details + consent ── */}
          {step === 2 && (
            <fieldset>
              <legend className="text-xl font-bold text-ink">Save your progress &amp; see your rates</legend>
              <p className="mt-1 text-sm text-muted">
                We&apos;ll send your personalized offers to this email. (Preview — mock data only.)
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <Field label="First name" error={errors.firstName?.message}>
                  <input className="input" {...register("firstName")} autoComplete="given-name" />
                </Field>
                <Field label="Last name" error={errors.lastName?.message}>
                  <input className="input" {...register("lastName")} autoComplete="family-name" />
                </Field>
                <Field label="Email" error={errors.email?.message} full>
                  <input className="input" type="email" {...register("email")} autoComplete="email" />
                </Field>
                <Field label="ZIP code" error={errors.zip?.message}>
                  <input className="input" inputMode="numeric" maxLength={5} {...register("zip")} autoComplete="postal-code" />
                </Field>
              </div>

              {/* Klarna-style consent + disclosure */}
              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-cloud p-4">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--color-brand)]" {...register("consent")} />
                <span className="text-xs leading-relaxed text-muted">
                  I have read and consent to the{" "}
                  <span className="font-semibold text-brand-dark">E-Sign Consent</span>,{" "}
                  <span className="font-semibold text-brand-dark">Privacy Policy</span>,{" "}
                  <span className="font-semibold text-brand-dark">Terms of Use</span>, and{" "}
                  <span className="font-semibold text-brand-dark">Arbitration Agreement</span>, and I authorize Orbit
                  and its partners to use a <span className="font-semibold text-ink">soft credit inquiry</span> to
                  pre-fill my application and show my prequalified options. A soft inquiry does not affect my credit
                  score.
                </span>
              </label>
              {errors.consent && <p className="mt-1 text-xs font-medium text-crit">{errors.consent.message}</p>}
            </fieldset>
          )}

          {/* nav */}
          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-ghost">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
              </button>
            ) : (
              <span />
            )}
            {step < 2 ? (
              <button type="button" onClick={next} className="btn-primary">
                Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button type="submit" disabled={!consent || submitting} className="btn-primary">
                {submitting ? "Finding offers…" : "See my offers"}
                {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="text-sm font-semibold text-ink">{label}</label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs font-medium text-crit">{error}</p>}
    </div>
  );
}

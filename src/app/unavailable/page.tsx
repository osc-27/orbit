import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { EmailCapture } from "@/components/marketing/EmailCapture";

export const metadata: Metadata = { title: "Not available in your state yet" };

export default function UnavailablePage() {
  return (
    <div className="wrap-narrow py-24">
      <div className="card p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-tint text-brand-dark">
          <MapPin className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">Orbit isn&apos;t in your state yet</h1>
        <p className="mx-auto mt-2 max-w-md text-muted">
          We&apos;re expanding fast. In the meantime, here are a few ways we can still help.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/orbit" className="btn-primary">
            Explore the Marketplace
          </Link>
          <Link href="/learn" className="btn-ghost">
            Free money guides
          </Link>
        </div>
        <div className="mx-auto mt-8 max-w-sm text-left">
          <EmailCapture />
        </div>
      </div>
    </div>
  );
}

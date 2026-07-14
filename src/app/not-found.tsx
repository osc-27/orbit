import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap-narrow py-28 text-center">
      <svg width="72" height="72" viewBox="0 0 72 72" className="mx-auto text-brand" fill="none" aria-hidden="true">
        <circle cx="36" cy="36" r="30" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
        <circle cx="36" cy="36" r="9" fill="currentColor" />
        <circle cx="63" cy="22" r="4" fill="var(--color-accent)" />
      </svg>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">This page drifted out of orbit</h1>
      <p className="mx-auto mt-2 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/loans/personal" className="btn-ghost">
          Personal Loans
        </Link>
        <Link href="/orbit" className="btn-ghost">
          Marketplace
        </Link>
      </div>
    </div>
  );
}

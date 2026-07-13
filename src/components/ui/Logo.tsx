export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-tight ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="11.5" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.4" />
        <circle cx="13" cy="13" r="4.4" fill="currentColor" />
        <circle cx="24" cy="9" r="2.1" fill="var(--color-accent)" />
      </svg>
      <span>Orbit</span>
    </span>
  );
}

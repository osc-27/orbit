// Orbit wordmark — rounded-geometric "Orbit" (Fredoka) with the orbital swoosh
// (an over-the-top arc + a lower-left comet tail wrapping the "O"). Monochrome +
// themeable via currentColor. For a pixel-exact brand asset, drop the official
// SVG/PNG into /public and render it here instead.
export function Logo({ className = "", height = 26 }: { className?: string; height?: number }) {
  return (
    <svg
      viewBox="0 0 152 46"
      height={height}
      className={className}
      role="img"
      aria-label="Orbit"
      fill="none"
    >
      {/* orbital swoosh */}
      <path d="M30 13 C 66 3, 114 5, 144 17" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M19 43 C 6 42, 3 32, 11 26" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      {/* wordmark */}
      <text
        x="3"
        y="36"
        fontFamily="var(--font-fredoka), ui-rounded, system-ui, sans-serif"
        fontSize="35"
        fontWeight="600"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        Orbit
      </text>
    </svg>
  );
}

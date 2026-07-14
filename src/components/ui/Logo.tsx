// Orbit wordmark lockup — the "Orbit" bold wordmark with an orbital swoosh.
// Monochrome + themeable via currentColor (brand blue on light, white on dark).
// Drop the official SVG/PNG into /public and swap this if you prefer the exact asset.
export function Logo({ className = "", height = 26 }: { className?: string; height?: number }) {
  return (
    <svg
      viewBox="0 0 132 44"
      height={height}
      className={className}
      role="img"
      aria-label="Orbit"
      fill="none"
    >
      {/* orbital swoosh — a comet arc sweeping over the wordmark */}
      <defs>
        <linearGradient id="orbit-swoosh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.35" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="1" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        d="M5 27 C 10 39, 96 41, 128 9"
        stroke="url(#orbit-swoosh)"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <text
        x="2"
        y="35"
        fontFamily="var(--font-arimo), Arial, sans-serif"
        fontSize="34"
        fontWeight="800"
        letterSpacing="-1.5"
        fill="currentColor"
      >
        Orbit
      </text>
    </svg>
  );
}

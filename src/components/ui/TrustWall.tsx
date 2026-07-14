// Lender-logo trust wall (Credible's strongest device). Mock logos as monochrome
// chips; swap for real partner marks later.
export function TrustWall({
  heading = "Compare offers from 12+ lenders",
  names = ["SoFi", "Upstart", "Upgrade", "Best Egg", "Avant", "Prosper"],
}: {
  heading?: string;
  names?: string[];
}) {
  return (
    <section className="py-8">
      <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-muted">{heading}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {names.map((n) => (
          <span key={n} className="text-lg font-extrabold tracking-tight text-line-strong grayscale">
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}

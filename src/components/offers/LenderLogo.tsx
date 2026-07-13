export function LenderLogo({
  text,
  color,
  size = 44,
}: {
  text: string;
  color: string;
  size?: number;
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-xl font-extrabold text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.34,
        letterSpacing: "-0.02em",
      }}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}

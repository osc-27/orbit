export function currency(n: number, opts: { cents?: boolean } = {}): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts.cents ? 2 : 0,
    maximumFractionDigits: opts.cents ? 2 : 0,
  }).format(n);
}

export function percent(n: number): string {
  return `${n.toFixed(2).replace(/\.00$/, "")}%`;
}

export function aprRange(min: number, max: number): string {
  if (min === max) return percent(min);
  return `${percent(min)}–${percent(max)}`;
}

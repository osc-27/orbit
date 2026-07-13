import { Wallet, Car, CreditCard, GraduationCap, Home, type LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  wallet: Wallet,
  car: Car,
  card: CreditCard,
  cap: GraduationCap,
  home: Home,
};

export function VerticalIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name] ?? Wallet;
  return <Icon className={className} strokeWidth={1.8} aria-hidden="true" />;
}

import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Orbit by OppFi — Compare prequalified loan offers",
    template: "%s · Orbit by OppFi",
  },
  description:
    "Orbit is OppFi's financial-product marketplace. Compare real, prequalified offers from OppFi and top lenders in minutes — without affecting your credit score.",
  metadataBase: new URL("https://orbit.example.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

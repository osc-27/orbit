import type { Metadata } from "next";
import { Arimo, Fredoka } from "next/font/google";
import "./globals.css";
import { AppFrame } from "@/components/AppFrame";
import { CookieConsent } from "@/components/CookieConsent";

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-arimo",
  display: "swap",
});

// Rounded-geometric face for the Orbit wordmark logo (matches the brand mark).
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

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
    <html lang="en" className={`${arimo.variable} ${fredoka.variable}`}>
      <body className="min-h-screen">
        <AppFrame>{children}</AppFrame>
        <CookieConsent />
      </body>
    </html>
  );
}

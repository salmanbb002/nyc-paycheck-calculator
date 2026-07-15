import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteTitle = "NYC Paycheck Calculator 2026 | Free Take-Home Pay Tool";
const siteDescription =
  "Calculate your 2026 NYC take-home pay after federal, New York State, New York City, Social Security, and Medicare taxes. Free, fast, and private.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | NYC Paycheck Calculator",
  },
  description: siteDescription,
  applicationName: "NYC Paycheck Calculator",
  authors: [{ name: "NYC Paycheck Calculator" }],
  creator: "NYC Paycheck Calculator",
  publisher: "NYC Paycheck Calculator",
  category: "finance",
  keywords: [
    "NYC paycheck calculator",
    "New York paycheck calculator",
    "NYC take-home pay",
    "New York City tax calculator",
    "salary after taxes NYC",
  ],
  metadataBase: new URL("https://nycpaycheckcalculator.site"),
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: "https://nycpaycheckcalculator.site",
    siteName: "NYC Paycheck Calculator",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "BZyrrlxE7dPDuLmTL2P2kgXzxvPsX-dXz3yqTU0ICJc",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0c0a09",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

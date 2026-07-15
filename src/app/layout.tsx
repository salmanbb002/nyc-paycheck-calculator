import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYC Paycheck Calculator 2026 | Paycheck.NYC",
  description:
    "Estimate your 2026 NYC take-home pay after federal, New York State, New York City, and FICA taxes.",
  metadataBase: new URL("https://nycpaycheckcalculator.site"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "NYC Paycheck Calculator 2026",
    description:
      "A clear, free estimate of what lands in your account after NYC taxes.",
    type: "website",
    url: "https://nycpaycheckcalculator.site",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

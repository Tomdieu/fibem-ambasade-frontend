import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const montserrat = localFont({
  src: "../public/fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ambassade de Guinée-Bissau",
    default: "Ambassade de Guinée-Bissau en France",
  },
  description:
    "Site officiel de l'Ambassade de la République de Guinée-Bissau en France. Services consulaires, visas, passeports et informations diplomatiques.",
  openGraph: {
    title: "Ambassade de Guinée-Bissau en France",
    description:
      "Site officiel de l'Ambassade de la République de Guinée-Bissau en France.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={cn("h-full", montserrat.variable)}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

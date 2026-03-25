import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const montserrat = localFont({
  src: "../public/fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  display: "swap",
});

const SITE_URL = "https://ambassade-guinee-bissau.fr";

export const metadata: Metadata = {
  title: {
    template: "%s | Ambassade de Guinée-Bissau",
    default: "Ambassade de Guinée-Bissau en France",
  },
  description:
    "Site officiel de l'Ambassade de la République de Guinée-Bissau en France. Services consulaires, visas, passeports et informations diplomatiques.",
  keywords: [
    "Ambassade Guinée-Bissau",
    "Guinée-Bissau France",
    "visa Guinée-Bissau",
    "passeport guinéen",
    "services consulaires",
    "Tomdieu Ivan",
    "FIBEM",
    "diaspora guinéenne",
  ],
  authors: [{ name: "Tomdieu Ivan" }],
  creator: "Tomdieu Ivan",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Ambassade de Guinée-Bissau en France",
    description:
      "Site officiel de l'Ambassade de la République de Guinée-Bissau en France.",
    url: SITE_URL,
    siteName: "Ambassade de Guinée-Bissau en France",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ambassade de Guinée-Bissau en France",
    description:
      "Site officiel de l'Ambassade de la République de Guinée-Bissau en France.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Ambassade de Guinée-Bissau en France",
      description:
        "Site officiel de l'Ambassade de la République de Guinée-Bissau en France.",
      inLanguage: ["fr", "en", "pt"],
      creator: { "@id": `${SITE_URL}/#tomdieu-ivan` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/fr/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "GovernmentOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: "Ambassade de la République de Guinée-Bissau en France",
      alternateName: "Ambassade Guinée-Bissau Paris",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/web-app-manifest-192x192.png`,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "24 Rue de la Pompe",
        addressLocality: "Paris",
        postalCode: "75116",
        addressCountry: "FR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+33-1-45-20-00-00",
        email: "contact@ambassade-guinee-bissau.fr",
        contactType: "customer service",
        areaServed: "FR",
        availableLanguage: ["French", "English", "Portuguese"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
      },
      sameAs: [
        "https://facebook.com",
        "https://twitter.com",
        "https://linkedin.com",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#tomdieu-ivan`,
      name: "Tomdieu Ivan",
      jobTitle: "Développeur Web Full-Stack",
      description:
        "Développeur Web Full-Stack, créateur du site officiel de l'Ambassade de Guinée-Bissau en France.",
      url: SITE_URL,
      sameAs: ["https://github.com/ivantom"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={cn("h-full", montserrat.variable)}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

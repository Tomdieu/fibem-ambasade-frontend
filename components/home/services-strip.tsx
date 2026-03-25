"use client";

import { useMemo } from "react";
import { ServiceTile } from "@/components/ui/service-tile";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/locales/client";

export function ServicesStrip() {
  const t = useI18n();

  const SERVICES = useMemo(() => [
    {
      service: "visa" as const,
      href: "/services/visa",
      description: t("home_page.services_visa_desc"),
    },
    {
      service: "passeport" as const,
      href: "/services/passeport",
      description: t("home_page.services_passport_desc"),
    },
    {
      service: "legalisation" as const,
      href: "/services/legalisation",
      description: t("home_page.services_legal_desc"),
    },
    {
      service: "rendezvous" as const,
      href: "/services/rendez-vous",
      description: t("home_page.services_appointment_desc"),
    },
    {
      service: "inscription" as const,
      href: "/services/inscription",
      description: t("home_page.services_registration_desc"),
    },
  ], [t]);
  return (
    <section className="bg-white py-section">
      <div className="max-w-7xl mx-auto px-container">
        <SectionHeading
          align="center"
          title={t("home_page.services_section_title")}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {SERVICES.map((item) => (
            <ServiceTile
              key={item.service}
              service={item.service}
              href={item.href}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { ServiceTile } from "@/components/ui/service-tile";
import { SectionHeading } from "@/components/ui/section-heading";

const SERVICES = [
  {
    service: "visa" as const,
    href: "/services/visa",
    description: "Demandez votre visa pour la Guinée-Bissau",
  },
  {
    service: "passeport" as const,
    href: "/services/passeport",
    description: "Établissement et renouvellement de passeport",
  },
  {
    service: "legalisation" as const,
    href: "/services/legalisation",
    description: "Légalisation et apostille de documents",
  },
  {
    service: "rendezvous" as const,
    href: "/services/rendezvous",
    description: "Prenez rendez-vous en ligne",
  },
  {
    service: "inscription" as const,
    href: "/services/inscription",
    description: "Inscrivez-vous au registre consulaire",
  },
];

export function ServicesStrip() {
  return (
    <section className="bg-white py-section">
      <div className="max-w-7xl mx-auto px-container">
        <SectionHeading
          align="center"
          title="Services consulaires en bref"
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

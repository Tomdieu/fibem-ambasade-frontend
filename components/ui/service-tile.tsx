import Link from "next/link";
import {
  Stamp,
  BookOpen,
  FileCheck,
  UserPlus,
  CalendarDays,
} from "lucide-react";
import { ServiceType } from "@/types";

interface ServiceTileProps {
  service: ServiceType;
  href: string;
  description: string;
}

const serviceLabelMap: Record<ServiceType, string> = {
  visa: "Visa",
  passeport: "Passeport",
  legalisation: "Légalisation",
  inscription: "Inscription consulaire",
  rendezvous: "Rendez-vous",
};

const serviceIconMap: Record<ServiceType, React.ElementType> = {
  visa: Stamp,
  passeport: BookOpen,
  legalisation: FileCheck,
  inscription: UserPlus,
  rendezvous: CalendarDays,
};

export function ServiceTile({ service, href, description }: ServiceTileProps) {
  const Icon = serviceIconMap[service];
  const label = serviceLabelMap[service];

  return (
    <Link
      href={href}
      className="bg-white border rounded-(--radius-card) p-4 hover:shadow-md transition-shadow cursor-pointer block"
    >
      <div className="w-12 h-12 bg-(--color-gb-blue)/10 text-(--color-gb-blue) rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium mt-3">{label}</p>
      <p className="text-xs text-(--color-text-muted) mt-1">{description}</p>
      <p className="text-(--color-gb-red) text-xs mt-2">→</p>
    </Link>
  );
}

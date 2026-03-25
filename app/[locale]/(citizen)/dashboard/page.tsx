import Link from "next/link";
import {
  TrendingUp,
  CheckCircle,
  Calendar,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { RequestsTable } from "@/components/citizen/requests-table";
import { VisaRequest } from "@/types";

const mockRequests: VisaRequest[] = [
  {
    id: "req-001",
    reference: "VIS-2025-0001",
    applicantName: "João Mendes",
    nationality: "Guinée-Bissau",
    visaType: "Visa touristique",
    submittedAt: new Date("2025-02-10"),
    status: "approved",
  },
  {
    id: "req-002",
    reference: "VIS-2025-0042",
    applicantName: "João Mendes",
    nationality: "Guinée-Bissau",
    visaType: "Visa étudiant",
    submittedAt: new Date("2025-02-28"),
    status: "pending",
  },
  {
    id: "req-003",
    reference: "VIS-2025-0078",
    applicantName: "João Mendes",
    nationality: "Guinée-Bissau",
    visaType: "Visa affaires",
    submittedAt: new Date("2025-03-05"),
    status: "missing",
  },
  {
    id: "req-004",
    reference: "VIS-2024-0194",
    applicantName: "João Mendes",
    nationality: "Guinée-Bissau",
    visaType: "Visa touristique",
    submittedAt: new Date("2024-11-15"),
    status: "rejected",
  },
  {
    id: "req-005",
    reference: "VIS-2024-0212",
    applicantName: "João Mendes",
    nationality: "Guinée-Bissau",
    visaType: "Visa long séjour",
    submittedAt: new Date("2024-12-01"),
    status: "archived",
  },
];

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="space-y-6">
      {/* Welcome row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-[var(--color-gb-dark)]">
            Bonjour, João
          </h1>
          <p className="text-sm text-muted-foreground capitalize">{today}</p>
        </div>
        <Button
          asChild
          className="bg-[var(--color-gb-red)] text-white hover:bg-[var(--color-gb-red)]/90 w-fit"
        >
          <Link href="/services/visa">Nouvelle demande</Link>
        </Button>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Demandes en cours"
          value={2}
          icon={TrendingUp}
          color="amber"
        />
        <StatCard
          label="Demandes traitées"
          value={5}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          label="Prochain rendez-vous"
          value="18 mars"
          icon={Calendar}
          color="blue"
        />
        <StatCard
          label="Documents requis"
          value={3}
          icon={AlertCircle}
          color="red"
        />
      </div>

      {/* Recent requests */}
      <div className="space-y-4">
        <SectionHeading
          title="Mes demandes récentes"
          action={
            <Link
              href="/dashboard/demandes"
              className="text-sm text-[var(--color-gb-red)] hover:underline"
            >
              Voir tout →
            </Link>
          }
        />
        <div className="bg-white border rounded-[var(--radius-card)] p-4">
          <RequestsTable requests={mockRequests} />
        </div>
      </div>
    </div>
  );
}

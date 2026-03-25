import { Download, FileText, Clock, CheckSquare, TrendingUp } from "lucide-react";

import { VisaRequest } from "@/types";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { RequestsTable } from "@/components/admin/requests-table";

const mockRequests: VisaRequest[] = [
  {
    id: "req-001",
    reference: "VIS-2025-0001",
    applicantName: "Amadou Diallo",
    nationality: "Guinée-Bissau",
    visaType: "Tourisme",
    submittedAt: new Date("2025-03-01"),
    status: "new",
    assignedAgent: "Sophie Martin",
  },
  {
    id: "req-002",
    reference: "VIS-2025-0002",
    applicantName: "Fatou Camara",
    nationality: "Sénégal",
    visaType: "Affaires",
    submittedAt: new Date("2025-03-02"),
    status: "pending",
  },
  {
    id: "req-003",
    reference: "VIS-2025-0003",
    applicantName: "Ibrahima Sow",
    nationality: "France",
    visaType: "Transit",
    submittedAt: new Date("2025-03-03"),
    status: "approved",
    assignedAgent: "Jean Dupont",
  },
  {
    id: "req-004",
    reference: "VIS-2025-0004",
    applicantName: "Mariama Baldé",
    nationality: "Portugal",
    visaType: "Tourisme",
    submittedAt: new Date("2025-03-04"),
    status: "missing",
    assignedAgent: "Sophie Martin",
  },
  {
    id: "req-005",
    reference: "VIS-2025-0005",
    applicantName: "Seydou Traoré",
    nationality: "Mali",
    visaType: "Étudiant",
    submittedAt: new Date("2025-03-05"),
    status: "rejected",
  },
  {
    id: "req-006",
    reference: "VIS-2025-0006",
    applicantName: "Aissatou Barry",
    nationality: "Guinée-Bissau",
    visaType: "Famille",
    submittedAt: new Date("2025-03-06"),
    status: "pending",
    assignedAgent: "Jean Dupont",
  },
  {
    id: "req-007",
    reference: "VIS-2025-0007",
    applicantName: "Moussa Kouyaté",
    nationality: "Côte d'Ivoire",
    visaType: "Affaires",
    submittedAt: new Date("2025-03-07"),
    status: "approved",
    assignedAgent: "Sophie Martin",
  },
  {
    id: "req-008",
    reference: "VIS-2025-0008",
    applicantName: "Kadiatou Diallo",
    nationality: "Guinée",
    visaType: "Tourisme",
    submittedAt: new Date("2025-03-08"),
    status: "new",
  },
  {
    id: "req-009",
    reference: "VIS-2025-0009",
    applicantName: "Ousmane Ndiaye",
    nationality: "Sénégal",
    visaType: "Transit",
    submittedAt: new Date("2025-03-09"),
    status: "archived",
    assignedAgent: "Jean Dupont",
  },
  {
    id: "req-010",
    reference: "VIS-2025-0010",
    applicantName: "Bintou Keita",
    nationality: "France",
    visaType: "Étudiant",
    submittedAt: new Date("2025-03-10"),
    status: "pending",
    assignedAgent: "Sophie Martin",
  },
  {
    id: "req-011",
    reference: "VIS-2025-0011",
    applicantName: "Lamine Touré",
    nationality: "Guinée-Bissau",
    visaType: "Famille",
    submittedAt: new Date("2025-03-11"),
    status: "new",
  },
  {
    id: "req-012",
    reference: "VIS-2025-0012",
    applicantName: "Rokhaya Mbaye",
    nationality: "Sénégal",
    visaType: "Affaires",
    submittedAt: new Date("2025-03-12"),
    status: "approved",
    assignedAgent: "Jean Dupont",
  },
  {
    id: "req-013",
    reference: "VIS-2025-0013",
    applicantName: "Aboubacar Sylla",
    nationality: "Guinée",
    visaType: "Tourisme",
    submittedAt: new Date("2025-03-13"),
    status: "missing",
    assignedAgent: "Sophie Martin",
  },
  {
    id: "req-014",
    reference: "VIS-2025-0014",
    applicantName: "Hadja Koné",
    nationality: "Mali",
    visaType: "Transit",
    submittedAt: new Date("2025-03-14"),
    status: "pending",
  },
  {
    id: "req-015",
    reference: "VIS-2025-0015",
    applicantName: "Cheikh Gueye",
    nationality: "Sénégal",
    visaType: "Étudiant",
    submittedAt: new Date("2025-03-15"),
    status: "rejected",
    assignedAgent: "Jean Dupont",
  },
  {
    id: "req-016",
    reference: "VIS-2025-0016",
    applicantName: "Mariam Coulibaly",
    nationality: "Côte d'Ivoire",
    visaType: "Famille",
    submittedAt: new Date("2025-03-16"),
    status: "new",
    assignedAgent: "Sophie Martin",
  },
  {
    id: "req-017",
    reference: "VIS-2025-0017",
    applicantName: "Aliou Bah",
    nationality: "Guinée-Bissau",
    visaType: "Affaires",
    submittedAt: new Date("2025-03-17"),
    status: "approved",
  },
  {
    id: "req-018",
    reference: "VIS-2025-0018",
    applicantName: "Ndeye Sarr",
    nationality: "Sénégal",
    visaType: "Tourisme",
    submittedAt: new Date("2025-03-18"),
    status: "pending",
    assignedAgent: "Jean Dupont",
  },
  {
    id: "req-019",
    reference: "VIS-2025-0019",
    applicantName: "Mamadou Balde",
    nationality: "Portugal",
    visaType: "Transit",
    submittedAt: new Date("2025-03-19"),
    status: "archived",
    assignedAgent: "Sophie Martin",
  },
  {
    id: "req-020",
    reference: "VIS-2025-0020",
    applicantName: "Oumou Diarra",
    nationality: "Mali",
    visaType: "Famille",
    submittedAt: new Date("2025-03-20"),
    status: "new",
  },
];

export default function DemandesPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium text-gb-dark">
          Demandes consulaires
        </h1>
        <Button variant="outline">
          <Download className="w-4 h-4" />
          Exporter CSV
        </Button>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Nouvelles aujourd'hui"
          value={12}
          icon={FileText}
          color="blue"
        />
        <StatCard
          label="En attente"
          value={34}
          icon={Clock}
          color="amber"
        />
        <StatCard
          label="Traitées ce mois"
          value={287}
          icon={CheckSquare}
          color="green"
        />
        <StatCard
          label="Taux de traitement"
          value="89%"
          icon={TrendingUp}
          color="red"
        />
      </div>

      {/* Data table */}
      <div className="bg-white rounded-card p-4 ring-1 ring-foreground/10">
        <RequestsTable requests={mockRequests} />
      </div>
    </div>
  );
}

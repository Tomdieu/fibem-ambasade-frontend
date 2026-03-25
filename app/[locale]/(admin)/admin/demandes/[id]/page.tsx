"use client";

import { Download, CheckCircle, AlertTriangle } from "lucide-react";

import { VisaRequest } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { AuditTimeline } from "@/components/admin/audit-timeline";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const mockRequest: VisaRequest & {
  firstName: string;
  lastName: string;
  passportNumber: string;
  address: string;
} = {
  id: "req-001",
  reference: "VIS-2025-0001",
  applicantName: "Amadou Diallo",
  firstName: "Amadou",
  lastName: "Diallo",
  nationality: "Guinée-Bissau",
  visaType: "Tourisme",
  submittedAt: new Date("2025-03-01"),
  status: "pending",
  assignedAgent: "Sophie Martin",
  passportNumber: "GB123456789",
  address: "12 Rue de la Paix, 75001 Paris",
};

const mockDocuments = [
  { name: "Passeport scanné", received: true },
  { name: "Photo d'identité", received: true },
  { name: "Lettre d'invitation", received: true },
  { name: "Preuve d'hébergement", received: false },
  { name: "Justificatif de ressources", received: false },
];

const mockAuditEvents = [
  {
    action: "Demande créée",
    agentName: "Système",
    timestamp: new Date("2025-03-01T09:00:00"),
    color: "blue" as const,
  },
  {
    action: "Documents vérifiés",
    agentName: "Sophie Martin",
    timestamp: new Date("2025-03-02T14:30:00"),
    color: "green" as const,
  },
  {
    action: "Pièces manquantes signalées",
    agentName: "Sophie Martin",
    timestamp: new Date("2025-03-03T10:15:00"),
    color: "amber" as const,
  },
  {
    action: "Demande réassignée",
    agentName: "Marie Dupont",
    timestamp: new Date("2025-03-05T16:00:00"),
    color: "gray" as const,
  },
  {
    action: "Mise en attente de validation",
    agentName: "Jean Dupont",
    timestamp: new Date("2025-03-10T11:45:00"),
    color: "blue" as const,
  },
];

const agents = [
  { id: "agent-1", name: "Sophie Martin" },
  { id: "agent-2", name: "Jean Dupont" },
  { id: "agent-3", name: "Léa Bernard" },
];

const statusAlertConfig: Record<
  string,
  { bg: string; border: string; text: string; message: string }
> = {
  pending: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    message: "Cette demande est en cours de traitement.",
  },
  new: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    message: "Cette demande vient d'être soumise et attend d'être prise en charge.",
  },
  approved: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    message: "Cette demande a été approuvée.",
  },
  rejected: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    message: "Cette demande a été rejetée.",
  },
  missing: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    message: "Des pièces justificatives sont manquantes pour cette demande.",
  },
  archived: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-700",
    message: "Cette demande a été archivée.",
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DemandeDetailPage({ params }: PageProps) {
  const { id } = await params;

  const request = mockRequest;
  const alertConfig =
    statusAlertConfig[request.status] ?? statusAlertConfig.pending;

  return (
    <div className="p-6 grid lg:grid-cols-[1fr_320px] gap-6">
      {/* LEFT COLUMN */}
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/demandes">Demandes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page heading */}
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-medium text-gb-dark">
            {request.applicantName}
          </h1>
          <StatusBadge status={request.status} />
          <span className="font-mono text-sm text-muted-foreground">
            {request.reference}
          </span>
        </div>

        {/* Alert banner */}
        <div
          className={`flex items-start gap-3 rounded-card border px-4 py-3 ${alertConfig.bg} ${alertConfig.border}`}
        >
          <AlertTriangle
            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${alertConfig.text}`}
          />
          <p className={`text-sm ${alertConfig.text}`}>{alertConfig.message}</p>
        </div>

        {/* Applicant info card */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du demandeur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Nom
                </p>
                <p className="text-sm font-medium">{request.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Prénom
                </p>
                <p className="text-sm font-medium">{request.firstName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Nationalité
                </p>
                <p className="text-sm font-medium">{request.nationality}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Numéro de passeport
                </p>
                <p className="text-sm font-mono">{request.passportNumber}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Adresse
                </p>
                <p className="text-sm font-medium">{request.address}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Type de visa
                </p>
                <p className="text-sm font-medium">{request.visaType}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents card */}
        <Card>
          <CardHeader>
            <CardTitle>Documents joints</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockDocuments.map((doc) => (
                <li
                  key={doc.name}
                  className="flex items-center justify-between gap-3 py-1"
                >
                  <div className="flex items-center gap-2">
                    {doc.received ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    )}
                    <span className="text-sm">{doc.name}</span>
                    <Badge
                      variant={doc.received ? "secondary" : "outline"}
                      className={
                        doc.received
                          ? "bg-emerald-100 text-emerald-800 text-xs"
                          : "border-orange-300 text-orange-700 text-xs"
                      }
                    >
                      {doc.received ? "Reçu" : "Manquant"}
                    </Badge>
                  </div>
                  {doc.received && (
                    <Button variant="ghost" size="sm">
                      <Download className="w-3.5 h-3.5" />
                      <span className="sr-only">Télécharger {doc.name}</span>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Internal notes */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-gb-dark">Notes internes</h2>
          <Textarea
            placeholder="Ajouter une note interne sur cette demande..."
            className="min-h-[100px] resize-none"
          />
          <Button size="sm">Ajouter une note</Button>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-4 lg:sticky lg:top-6 self-start">
        {/* Actions card */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Approve */}
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Approuver
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Approuver la demande</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir approuver la demande{" "}
                    <strong>{request.reference}</strong> de{" "}
                    <strong>{request.applicantName}</strong> ? Cette action sera
                    enregistrée dans le journal d&apos;audit.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction className="bg-emerald-600 hover:bg-emerald-700">
                    Confirmer l&apos;approbation
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Request missing docs */}
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  variant="outline"
                  className="w-full border-amber-500 text-amber-700 hover:bg-amber-50"
                >
                  Demander des pièces
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Demander des pièces manquantes</AlertDialogTitle>
                  <AlertDialogDescription>
                    Une notification sera envoyée au demandeur pour lui signaler
                    les pièces manquantes. La demande passera en statut
                    &quot;Pièces manquantes&quot;.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction className="bg-amber-600 hover:bg-amber-700 text-white">
                    Envoyer la notification
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Reject */}
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  variant="outline"
                  className="w-full border-red-500 text-red-700 hover:bg-red-50"
                >
                  Rejeter
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Rejeter la demande</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir rejeter la demande{" "}
                    <strong>{request.reference}</strong> ? Le demandeur sera
                    notifié du rejet. Cette action ne peut pas être annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white">
                    Confirmer le rejet
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Assign agent card */}
        <Card>
          <CardHeader>
            <CardTitle>Assigner à</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select defaultValue={request.assignedAgent ? "agent-1" : undefined}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="w-full">
              Assigner
            </Button>
          </CardContent>
        </Card>

        {/* Audit log card */}
        <Card>
          <CardHeader>
            <CardTitle>Journal d&apos;audit</CardTitle>
          </CardHeader>
          <CardContent>
            <AuditTimeline events={mockAuditEvents} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

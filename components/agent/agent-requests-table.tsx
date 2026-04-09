"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableWrapper } from "@/components/ui/data-table-wrapper";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { VisaRequest } from "@/types";

const statusConfig = {
  new: { label: "Nouvelle", color: "bg-blue-100 text-blue-800", icon: Clock },
  pending: { label: "En cours", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  approved: { label: "Approuvée", color: "bg-green-100 text-green-800", icon: CheckCircle },
  rejected: { label: "Rejetée", color: "bg-red-100 text-red-800", icon: AlertCircle },
  completed: { label: "Complétée", color: "bg-green-100 text-green-800", icon: CheckCircle },
};

interface AgentRequestsTableProps {
  initialRequests: VisaRequest[];
}

export function AgentRequestsTable({ initialRequests }: AgentRequestsTableProps) {
  const router = useRouter();

  const columns: ColumnDef<VisaRequest>[] = [
    {
      header: "Référence",
      accessorKey: "reference",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.reference}</span>
      ),
    },
    {
      header: "Demandeur",
      cell: ({ row }) => (
        <div className="text-sm">
          <div className="font-medium">{row.original.applicant_name}</div>
          <div className="text-gray-500">{row.original.email}</div>
        </div>
      ),
    },
    {
      header: "Type de visa",
      accessorKey: "visa_type",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.visa_type}</span>
      ),
    },
    {
      header: "Date de soumission",
      cell: ({ row }) => (
        <span className="text-sm">
          {new Date(row.original.submitted_at).toLocaleDateString("fr-FR")}
        </span>
      ),
    },
    {
      header: "Statut",
      cell: ({ row }) => {
        const statusKey = row.original.status as keyof typeof statusConfig;
        const statusInfo = statusConfig[statusKey] || statusConfig.new;
        const StatusIcon = statusInfo.icon;

        return (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${statusInfo.color}`}>
            <StatusIcon className="size-4" />
            {statusInfo.label}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/agent/dashboard/demandes/${row.original.id}`)}
            className="gap-2"
          >
            <Eye className="size-4" />
            Détails
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTableWrapper
      columns={columns}
      data={initialRequests}
      searchableColumns={[
        {
          id: "reference",
          title: "Référence",
        },
      ]}
    />
  );
}

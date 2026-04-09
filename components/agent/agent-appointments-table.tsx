"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableWrapper } from "@/components/ui/data-table-wrapper";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Appointment } from "@/types/appointment";

const statusConfig = {
  scheduled: { label: "Programmé", color: "bg-blue-100 text-blue-800", icon: Clock },
  completed: { label: "Complété", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Annulé", color: "bg-gray-100 text-gray-800", icon: AlertCircle },
  no_show: { label: "Non présenté", color: "bg-red-100 text-red-800", icon: AlertCircle },
};

interface AgentAppointmentsTableProps {
  initialAppointments: Appointment[];
}

export function AgentAppointmentsTable({ initialAppointments }: AgentAppointmentsTableProps) {
  const router = useRouter();

  const columns: ColumnDef<Appointment>[] = [
    {
      header: "Confirmation",
      accessorKey: "confirmation_number",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.confirmation_number}</span>
      ),
    },
    {
      header: "Client",
      cell: ({ row }) => (
        <div className="text-sm">
          <div className="font-medium">{row.original.first_name} {row.original.last_name}</div>
          <div className="text-gray-500">{row.original.email}</div>
        </div>
      ),
    },
    {
      header: "Service",
      accessorKey: "service_type",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.service_type === 'visa' && 'Visa'}
          {row.original.service_type === 'passeport' && 'Passeport'}
          {row.original.service_type === 'legalisation' && 'Légalisation'}
          {row.original.service_type === 'inscription' && 'Inscription'}
          {row.original.service_type === 'rendezvous' && 'Rendez-vous général'}
        </span>
      ),
    },
    {
      header: "Date & Heure",
      cell: ({ row }) => (
        <span className="text-sm">
          {new Date(row.original.appointment_date).toLocaleDateString("fr-FR")} à {row.original.appointment_time}
        </span>
      ),
    },
    {
      header: "Statut",
      cell: ({ row }) => {
        const statusKey = row.original.status as keyof typeof statusConfig;
        const statusInfo = statusConfig[statusKey] || statusConfig.scheduled;
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
            onClick={() => router.push(`/agent/dashboard/rendez-vous/${row.original.id}`)}
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
      data={initialAppointments}
      searchableColumns={[
        {
          id: "confirmation_number",
          title: "Confirmation",
        },
      ]}
    />
  );
}

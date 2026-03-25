"use client";

import { Eye, Pencil, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { VisaRequest, StatusType } from "@/types";
import { formatDate } from "@/lib/utils";
import { DataTableWrapper } from "@/components/ui/data-table-wrapper";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RequestsTableProps {
  requests: VisaRequest[];
}

// VisaRequest satisfies Record<string, unknown> since all values are serialisable.
// We cast once here and keep full type access via row.original.
type VisaRow = VisaRequest & Record<string, unknown>;

const columns: ColumnDef<VisaRow>[] = [
  {
    accessorKey: "reference",
    header: "Référence",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-gray-700">
        {row.original.reference}
      </span>
    ),
  },
  {
    accessorKey: "applicantName",
    header: "Demandeur",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.applicantName}</span>
    ),
  },
  {
    accessorKey: "visaType",
    header: "Type de visa",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.visaType}</span>
    ),
  },
  {
    accessorKey: "submittedAt",
    header: "Soumis le",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.submittedAt)}
      </span>
    ),
  },
  {
    accessorKey: "assignedAgent",
    header: "Agent assigné",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.assignedAgent ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status as StatusType} size="sm" />
    ),
    filterFn: (row, _columnId, filterValue) => {
      return row.original.status === filterValue;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href={`/admin/demandes/${row.original.id}`}>
            <Eye className="w-4 h-4" />
            <span className="sr-only">Voir</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href={`/admin/demandes/${row.original.id}/modifier`}>
            <Pencil className="w-4 h-4" />
            <span className="sr-only">Modifier</span>
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="w-4 h-4" />
              <span className="sr-only">Plus d&apos;actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Archiver</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

const statusFilterOptions = {
  key: "status",
  label: "Statut",
  options: [
    { label: "Nouveau", value: "new" },
    { label: "En attente", value: "pending" },
    { label: "Approuvé", value: "approved" },
    { label: "Rejeté", value: "rejected" },
    { label: "Archivé", value: "archived" },
    { label: "Pièces manquantes", value: "missing" },
  ],
};

export function RequestsTable({ requests }: RequestsTableProps) {
  return (
    <DataTableWrapper
      columns={columns}
      data={requests as VisaRow[]}
      searchKey="applicantName"
      filterOptions={[statusFilterOptions]}
    />
  );
}

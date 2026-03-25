"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableWrapper } from "@/components/ui/data-table-wrapper";
import { StatusBadge } from "@/components/ui/status-badge";
import { RequestRowActions } from "@/components/citizen/request-row-actions";
import { VisaRequest, StatusType } from "@/types";
import { formatDate } from "@/lib/utils";

interface RequestsTableProps {
  requests: VisaRequest[];
}

const columns: ColumnDef<VisaRequest>[] = [
  {
    accessorKey: "reference",
    header: "Référence",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("reference")}</span>
    ),
  },
  {
    accessorKey: "visaType",
    header: "Type",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("visaType")}</span>
    ),
  },
  {
    accessorKey: "submittedAt",
    header: "Date de dépôt",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.getValue("submittedAt"))}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <StatusBadge status={row.getValue<StatusType>("status")} />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <RequestRowActions requestId={row.original.id} />,
  },
];

export function RequestsTable({ requests }: RequestsTableProps) {
  return (
    <DataTableWrapper
      columns={columns}
      data={requests as unknown as Record<string, unknown>[]}
      searchKey="reference"
    />
  );
}

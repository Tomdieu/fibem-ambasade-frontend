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

// VisaRequest satisfies Record<string, unknown> since all values are serialisable.
// We cast once here and keep full type access via row.original.
type VisaRow = VisaRequest & Record<string, unknown>;

const columns: ColumnDef<VisaRow>[] = [
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
    accessorFn: (row) => row.id,
    cell: ({ row }) => <RequestRowActions requestId={row.original.id} />,
  },
];

export function RequestsTable({ requests }: RequestsTableProps) {
  return (
    <DataTableWrapper
      columns={columns}
      data={requests as VisaRow[]}
      searchKey="reference"
    />
  );
}

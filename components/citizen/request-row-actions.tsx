"use client";

import { useRouter } from "next/navigation";
import { Eye, Download, MessageSquare, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface RequestRowActionsProps {
  requestId: string;
}

export function RequestRowActions({ requestId }: RequestRowActionsProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon-sm" aria-label="Actions">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/demandes/${requestId}`)}
        >
          <Eye className="size-4" />
          Voir les détails
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="size-4" />
          Télécharger
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="size-4" />
          Contacter un agent
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

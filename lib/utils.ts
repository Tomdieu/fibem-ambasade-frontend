import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale = "fr-FR"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export type StatusConfig = {
  label: string;
  className: string;
  variant: "default" | "secondary" | "destructive" | "outline";
};

export function getStatusConfig(status: string): StatusConfig {
  switch (status) {
    case "new":
      return {
        label: "Nouveau",
        className: "bg-blue-100 text-blue-800",
        variant: "secondary",
      };
    case "pending":
      return {
        label: "En attente",
        className: "bg-amber-100 text-amber-800",
        variant: "secondary",
      };
    case "approved":
      return {
        label: "Approuvé",
        className: "bg-emerald-100 text-emerald-800",
        variant: "secondary",
      };
    case "rejected":
      return {
        label: "Rejeté",
        className: "bg-red-100 text-red-800",
        variant: "destructive",
      };
    case "archived":
      return {
        label: "Archivé",
        className: "bg-gray-100 text-gray-600",
        variant: "secondary",
      };
    case "missing":
      return {
        label: "Pièces manquantes",
        className: "bg-orange-100 text-orange-800",
        variant: "secondary",
      };
    default:
      return {
        label: status,
        className: "bg-gray-100 text-gray-600",
        variant: "secondary",
      };
  }
}

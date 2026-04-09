import { z } from "zod";

import type { ServiceType } from "@/types";

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySlots {
  date: Date;
  slots: TimeSlot[];
}

export interface Appointment {
  id: number;
  confirmation_number: string;
  service_type: ServiceType;
  appointment_date: string;
  appointment_time: string;
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface BookingFormData {
  serviceType: ServiceType;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

export const bookingSchema = z.object({
  serviceType: z.enum(["visa", "passeport", "legalisation", "inscription", "rendezvous"]),
  date: z.string().min(1, "La date est requise"),
  time: z.string().min(1, "L'heure est requise"),
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().min(1, "L'email est requis").email("Email invalide"),
  phone: z.string().min(6, "Le numéro de téléphone est requis"),
  notes: z.string().optional(),
});

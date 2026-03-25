export type StatusType =
  | "new"
  | "pending"
  | "approved"
  | "rejected"
  | "archived"
  | "missing";

export type ServiceType =
  | "visa"
  | "passeport"
  | "legalisation"
  | "inscription"
  | "rendezvous";

export type UserRole = "admin" | "agent" | "citizen" | "public";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: string;
}

export interface VisaRequest {
  id: string;
  reference: string;
  applicantName: string;
  nationality: string;
  visaType: string;
  submittedAt: Date;
  status: StatusType;
  assignedAgent?: string;
}

export interface AppointmentSlot {
  id: string;
  date: Date;
  time: string;
  serviceType: ServiceType;
  isAvailable: boolean;
  citizenId?: string;
}

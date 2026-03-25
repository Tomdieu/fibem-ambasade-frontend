import { z } from "zod";

export interface VisaFormData {
  // Step 1: Personal info
  lastName: string;
  firstName: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  addressFrance: string;
  postalCode: string;
  city: string;
  visaType: string;
  // Step 2: Travel details
  departureDate: string;
  returnDate: string;
  purposeOfVisit: string;
  destinationCity: string;
  invitingPersonName?: string;
  invitingPersonAddress?: string;
  accommodationType: string;
  // Step 3: Documents
  hasPassportScan: boolean;
  hasPhoto: boolean;
  hasInvitationLetter: boolean;
  hasProofOfAccommodation: boolean;
  hasProofOfFunds: boolean;
  additionalNotes?: string;
  // Step 4: Confirmation
  confirmation: true;
}

export const visaFormSchema = z.object({
  // Step 1
  lastName: z.string().min(1, "Le nom est requis"),
  firstName: z.string().min(1, "Le prénom est requis"),
  birthDate: z.string().min(1, "La date de naissance est requise"),
  birthPlace: z.string().min(1, "Le lieu de naissance est requis"),
  nationality: z.string().min(1, "La nationalité est requise"),
  passportNumber: z.string().min(1, "Le numéro de passeport est requis"),
  passportExpiry: z.string().min(1, "La date d'expiration est requise"),
  addressFrance: z.string().min(1, "L'adresse en France est requise"),
  postalCode: z.string().min(5, "Le code postal est requis"),
  city: z.string().min(1, "La ville est requise"),
  visaType: z.string().min(1, "Le type de visa est requis"),
  // Step 2
  departureDate: z.string().min(1, "La date de départ est requise"),
  returnDate: z.string().min(1, "La date de retour est requise"),
  purposeOfVisit: z.string().min(1, "Le motif du voyage est requis"),
  destinationCity: z.string().min(1, "La ville de destination est requise"),
  invitingPersonName: z.string().optional(),
  invitingPersonAddress: z.string().optional(),
  accommodationType: z.string().min(1, "Le type d'hébergement est requis"),
  // Step 3
  hasPassportScan: z.boolean(),
  hasPhoto: z.boolean(),
  hasInvitationLetter: z.boolean(),
  hasProofOfAccommodation: z.boolean(),
  hasProofOfFunds: z.boolean(),
  additionalNotes: z.string().optional(),
  // Step 4
  confirmation: z.literal(true, "Vous devez certifier l'exactitude des informations"),
});

export const VISA_STEPS: { id: number; title: string; description: string }[] =
  [
    {
      id: 1,
      title: "Informations personnelles",
      description: "Identité et coordonnées du demandeur",
    },
    {
      id: 2,
      title: "Détails du voyage",
      description: "Dates, destination et hébergement",
    },
    {
      id: 3,
      title: "Documents requis",
      description: "Liste des pièces à fournir",
    },
    {
      id: 4,
      title: "Confirmation",
      description: "Vérification et soumission de la demande",
    },
  ];

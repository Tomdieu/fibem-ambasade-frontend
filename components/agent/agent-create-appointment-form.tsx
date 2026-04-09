"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createAppointmentAsAgent } from "@/actions/booking-actions";
import { getCitizens } from "@/actions/user-actions";
import { BookingFormData } from "@/types/appointment";
import { ArrowLeft, CheckCircle } from "lucide-react";

const serviceTypes = [
  { value: "visa", label: "Visa" },
  { value: "passeport", label: "Passeport" },
  { value: "legalisation", label: "Légalisation" },
  { value: "inscription", label: "Inscription" },
  { value: "rendezvous", label: "Rendez-vous général" },
];

interface Citizen {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export function AgentCreateAppointmentForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCitizens, setIsLoadingCitizens] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [citizens, setCitizens] = useState<Citizen[]>([]);

  const [formData, setFormData] = useState({
    selectedCitizenId: "",
    serviceType: "visa",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Load citizens on mount
  useEffect(() => {
    const loadCitizens = async () => {
      setIsLoadingCitizens(true);
      const result = await getCitizens();
      if (result.success) {
        setCitizens(result.data);
      } else {
        setErrorMessage(result.error || "Erreur lors du chargement des citoyens.");
      }
      setIsLoadingCitizens(false);
    };

    loadCitizens();
  }, []);

  // Auto-fill form when citizen is selected
  const handleCitizenSelect = (citizenId: string) => {
    setFormData((prev) => ({ ...prev, selectedCitizenId: citizenId }));
    const selected = citizens.find((c) => c.id.toString() === citizenId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        firstName: selected.first_name,
        lastName: selected.last_name,
        email: selected.email,
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "selectedCitizenId") {
      handleCitizenSelect(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate required fields
    if (
      !formData.selectedCitizenId ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time
    ) {
      setErrorMessage("Tous les champs requis doivent être remplis.");
      setIsLoading(false);
      return;
    }

    const appointmentData: BookingFormData = {
      serviceType: formData.serviceType as any,
      date: formData.date,
      time: formData.time,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes || undefined,
    };

    const result = await createAppointmentAsAgent(appointmentData, parseInt(formData.selectedCitizenId));

    if (result.success) {
      setSuccessMessage(
        `Rendez-vous créé avec succès! Numéro de confirmation: ${result.confirmationNumber}`
      );
      setFormData({
        selectedCitizenId: "",
        serviceType: "visa",
        date: "",
        time: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        notes: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/agent/dashboard/rendez-vous");
      }, 2000);
    } else {
      setErrorMessage(result.error || "Une erreur est survenue.");
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900">{successMessage}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Citizen Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Sélection du citoyen</CardTitle>
            <CardDescription>Choisissez le citoyen pour lequel créer le rendez-vous.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingCitizens ? (
              <p className="text-sm text-gray-500">Chargement des citoyens...</p>
            ) : citizens.length === 0 ? (
              <p className="text-sm text-gray-500">Aucun citoyen disponible.</p>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="selectedCitizenId">Citoyen *</Label>
                <Select
                  value={formData.selectedCitizenId}
                  onValueChange={(value) => handleSelectChange("selectedCitizenId", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un citoyen" />
                  </SelectTrigger>
                  <SelectContent>
                    {citizens.map((citizen) => (
                      <SelectItem key={citizen.id} value={citizen.id.toString()}>
                        {citizen.first_name} {citizen.last_name} ({citizen.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Client Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du client</CardTitle>
            <CardDescription>Entrez les coordonnées du client.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Jean"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Dupont"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="jean@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+33 6 12 34 56 78"
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Détails du rendez-vous</CardTitle>
            <CardDescription>Configurez la date, l'heure et le type de service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="serviceType">Type de service *</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => handleSelectChange("serviceType", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Heure *</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Ajoutez des notes spéciales pour ce rendez-vous..."
                rows={3}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading || !!successMessage}>
            {isLoading ? "Création en cours..." : "Créer le rendez-vous"}
          </Button>
        </div>
      </form>
    </div>
  );
}

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
import { submitVisaRequestAsAgent } from "@/actions/visa-actions";
import { getCitizens } from "@/actions/user-actions";
import { VisaFormData } from "@/types/visa";
import { ArrowLeft, CheckCircle } from "lucide-react";

const visaTypes = [
  { value: "Tourisme", label: "Tourisme" },
  { value: "Affaires", label: "Affaires" },
  { value: "Étudiant", label: "Étudiant" },
  { value: "Traitement médical", label: "Traitement médical" },
  { value: "Famille", label: "Famille" },
  { value: "Transit", label: "Transit" },
];

const accommodationTypes = [
  { value: "Hotel", label: "Hôtel" },
  { value: "Family", label: "Famille" },
  { value: "Friends", label: "Amis" },
  { value: "Other", label: "Autre" },
];

interface Citizen {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export function AgentCreateVisaRequestForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCitizens, setIsLoadingCitizens] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [citizens, setCitizens] = useState<Citizen[]>([]);

  const [formData, setFormData] = useState({
    selectedCitizenId: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    birthPlace: "",
    nationality: "Guinée-Bissau",
    passportNumber: "",
    passportExpiry: "",
    addressFrance: "",
    postalCode: "",
    city: "",
    visaType: "Tourisme",
    departureDate: "",
    returnDate: "",
    purposeOfVisit: "",
    destinationCity: "",
    accommodationType: "Hotel",
    additionalNotes: "",
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
      !formData.birthDate ||
      !formData.passportNumber ||
      !formData.passportExpiry ||
      !formData.addressFrance ||
      !formData.departureDate ||
      !formData.returnDate ||
      !formData.purposeOfVisit
    ) {
      setErrorMessage("Tous les champs requis doivent être remplis.");
      setIsLoading(false);
      return;
    }

    const visaData: VisaFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      birthDate: formData.birthDate,
      birthPlace: formData.birthPlace,
      nationality: formData.nationality,
      passportNumber: formData.passportNumber,
      passportExpiry: formData.passportExpiry,
      addressFrance: formData.addressFrance,
      postalCode: formData.postalCode,
      city: formData.city,
      visaType: formData.visaType,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate,
      purposeOfVisit: formData.purposeOfVisit,
      destinationCity: formData.destinationCity,
      accommodationType: formData.accommodationType,
      hasPassportScan: false,
      hasPhoto: false,
      hasInvitationLetter: false,
      hasProofOfAccommodation: false,
      hasProofOfFunds: false,
      additionalNotes: formData.additionalNotes || undefined,
    };

    const result = await submitVisaRequestAsAgent(visaData, parseInt(formData.selectedCitizenId));

    if (result.success) {
      setSuccessMessage(
        `Demande créée avec succès! Numéro de référence: ${result.reference}`
      );

      setFormData({
        selectedCitizenId: "",
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        birthPlace: "",
        nationality: "Guinée-Bissau",
        passportNumber: "",
        passportExpiry: "",
        addressFrance: "",
        postalCode: "",
        city: "",
        visaType: "Tourisme",
        departureDate: "",
        returnDate: "",
        purposeOfVisit: "",
        destinationCity: "",
        accommodationType: "Hotel",
        additionalNotes: "",
      });

      setTimeout(() => {
        router.push("/agent/dashboard/demandes");
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
            <CardDescription>Choisissez le citoyen pour lequel créer la demande de visa.</CardDescription>
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

        {/* Applicant Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du demandeur</CardTitle>
            <CardDescription>Entrez les informations personnelles du demandeur.</CardDescription>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Date de naissance *</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthPlace">Lieu de naissance *</Label>
                <Input
                  id="birthPlace"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleInputChange}
                  placeholder="Bissau"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationalité *</Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Passport Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations sur le passeport</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Numéro de passeport *</Label>
                <Input
                  id="passportNumber"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleInputChange}
                  placeholder="AB123456"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportExpiry">Expiration du passeport *</Label>
                <Input
                  id="passportExpiry"
                  name="passportExpiry"
                  type="date"
                  value={formData.passportExpiry}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle>Adresse en France</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="addressFrance">Adresse *</Label>
              <Input
                id="addressFrance"
                name="addressFrance"
                value={formData.addressFrance}
                onChange={handleInputChange}
                placeholder="123 Rue de la Paix"
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="75001"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Paris"
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visa Details */}
        <Card>
          <CardHeader>
            <CardTitle>Détails du visa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visaType">Type de visa *</Label>
                <Select
                  value={formData.visaType}
                  onValueChange={(value) => handleSelectChange("visaType", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {visaTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accommodationType">Type d'hébergement *</Label>
                <Select
                  value={formData.accommodationType}
                  onValueChange={(value) => handleSelectChange("accommodationType", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accommodationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departureDate">Date de départ *</Label>
                <Input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnDate">Date de retour *</Label>
                <Input
                  id="returnDate"
                  name="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destinationCity">Ville de destination</Label>
              <Input
                id="destinationCity"
                name="destinationCity"
                value={formData.destinationCity}
                onChange={handleInputChange}
                placeholder="Paris"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purposeOfVisit">Objet de la visite *</Label>
              <Textarea
                id="purposeOfVisit"
                name="purposeOfVisit"
                value={formData.purposeOfVisit}
                onChange={handleInputChange}
                placeholder="Décrivez l'objet de votre visite..."
                rows={3}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Notes supplémentaires</Label>
              <Textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Ajoutez des notes supplémentaires..."
                rows={2}
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
            {isLoading ? "Création en cours..." : "Créer la demande"}
          </Button>
        </div>
      </form>
    </div>
  );
}

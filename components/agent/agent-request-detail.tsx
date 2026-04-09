"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateVisaRequestStatus } from "@/actions/visa-actions";
import { VisaRequest } from "@/types";
import { ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react";

const statusOptions = [
  { value: "new", label: "Nouvelle", icon: Clock },
  { value: "pending", label: "En cours", icon: Clock },
  { value: "approved", label: "Approuvée", icon: CheckCircle },
  { value: "rejected", label: "Rejetée", icon: AlertCircle },
  { value: "completed", label: "Complétée", icon: CheckCircle },
];

const statusConfig = {
  new: { label: "Nouvelle", color: "bg-blue-100 text-blue-800", icon: Clock },
  pending: { label: "En cours", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  approved: { label: "Approuvée", color: "bg-green-100 text-green-800", icon: CheckCircle },
  rejected: { label: "Rejetée", color: "bg-red-100 text-red-800", icon: AlertCircle },
  completed: { label: "Complétée", color: "bg-green-100 text-green-800", icon: CheckCircle },
};

interface AgentRequestDetailProps {
  request: VisaRequest;
}

export function AgentRequestDetail({ request }: AgentRequestDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState(request.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    setMessage(null);

    const result = await updateVisaRequestStatus(request.id.toString(), newStatus);

    if (result.success) {
      setStatus(newStatus);
      setMessage({ type: "success", text: "Statut mis à jour avec succès." });
    } else {
      setMessage({ type: "error", text: result.error || "Erreur lors de la mise à jour." });
    }

    setIsUpdating(false);
  };

  const statusInfo = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-10 w-10"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Demande de visa</h1>
          <p className="text-gray-500">{request.reference}</p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Statut actuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${statusInfo.color}`}>
              <StatusIcon className="size-4" />
              {statusInfo.label}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Date de soumission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {new Date(request.submitted_at).toLocaleDateString("fr-FR")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Dernière mise à jour</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {new Date(request.updated_at).toLocaleDateString("fr-FR")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mettre à jour le statut</CardTitle>
          <CardDescription>Changez le statut de cette demande de visa.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Nouveau statut</label>
              <Select value={status} onValueChange={handleStatusChange} disabled={isUpdating}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informations du demandeur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Nom</h3>
              <p>{request.first_name} {request.last_name}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Email</h3>
              <p>{request.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Date de naissance</h3>
              <p>{new Date(request.birth_date).toLocaleDateString("fr-FR")}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Lieu de naissance</h3>
              <p>{request.birth_place}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Nationalité</h3>
              <p>{request.nationality}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Numéro de passeport</h3>
              <p>{request.passport_number}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Information sur le visa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Type de visa</h3>
              <p>{request.visa_type}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Objet de visite</h3>
              <p>{request.purpose_of_visit}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Adresse en France</h3>
              <p>{request.address_france}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Code postal</h3>
              <p>{request.postal_code}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Ville</h3>
              <p>{request.city}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Expiration du passeport</h3>
              <p>{new Date(request.passport_expiry).toLocaleDateString("fr-FR")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
import { updateAppointmentStatus } from "@/actions/booking-actions";
import { Appointment } from "@/types/appointment";
import { ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react";

const statusOptions = [
  { value: "scheduled", label: "Programmé", icon: Clock },
  { value: "completed", label: "Complété", icon: CheckCircle },
  { value: "cancelled", label: "Annulé", icon: AlertCircle },
  { value: "no_show", label: "Non présenté", icon: AlertCircle },
];

const statusConfig = {
  scheduled: { label: "Programmé", color: "bg-blue-100 text-blue-800", icon: Clock },
  completed: { label: "Complété", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Annulé", color: "bg-gray-100 text-gray-800", icon: AlertCircle },
  no_show: { label: "Non présenté", color: "bg-red-100 text-red-800", icon: AlertCircle },
};

const serviceTypeLabels: Record<string, string> = {
  visa: "Visa",
  passeport: "Passeport",
  legalisation: "Légalisation",
  inscription: "Inscription",
  rendezvous: "Rendez-vous général",
};

interface AgentAppointmentDetailProps {
  appointment: Appointment;
}

export function AgentAppointmentDetail({ appointment }: AgentAppointmentDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState(appointment.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    setMessage(null);

    const result = await updateAppointmentStatus(appointment.id.toString(), newStatus);

    if (result.success) {
      setStatus(newStatus);
      setMessage({ type: "success", text: "Statut mis à jour avec succès." });
    } else {
      setMessage({ type: "error", text: result.error || "Erreur lors de la mise à jour." });
    }

    setIsUpdating(false);
  };

  const statusInfo = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
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
          <h1 className="text-3xl font-bold">Détails du rendez-vous</h1>
          <p className="text-gray-500">{appointment.confirmation_number}</p>
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
            <CardTitle className="text-sm font-medium">Date de création</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {new Date(appointment.created_at).toLocaleDateString("fr-FR")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Dernière mise à jour</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {new Date(appointment.updated_at).toLocaleDateString("fr-FR")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mettre à jour le statut</CardTitle>
          <CardDescription>Changez le statut de ce rendez-vous.</CardDescription>
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
          <CardTitle>Informations du client</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Nom</h3>
              <p>{appointment.first_name} {appointment.last_name}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Email</h3>
              <p>{appointment.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Téléphone</h3>
              <p>{appointment.phone}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Service</h3>
              <p>{serviceTypeLabels[appointment.service_type] || appointment.service_type}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Détails du rendez-vous</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Date</h3>
              <p>{new Date(appointment.appointment_date).toLocaleDateString("fr-FR")}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-600 mb-2">Heure</h3>
              <p>{appointment.appointment_time}</p>
            </div>
            {appointment.notes && (
              <div className="md:col-span-2">
                <h3 className="font-medium text-sm text-gray-600 mb-2">Notes</h3>
                <p className="whitespace-pre-wrap">{appointment.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

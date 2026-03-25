"use client";

import { Controller, type Control, type UseFormWatch } from "react-hook-form";

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
import type { VisaFormData } from "@/types/visa";

interface StepTravelDetailsProps {
  control: Control<VisaFormData>;
  watch: UseFormWatch<VisaFormData>;
}

export function StepTravelDetails({ control, watch }: StepTravelDetailsProps) {
  const accommodationType = watch("accommodationType");

  return (
    <div className="flex flex-col gap-4">
      {/* Departure + return dates */}
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="departureDate"
          render={({ field, fieldState }) => (
            <div>
              <Label htmlFor="departureDate" className="mb-1 block">
                Date de départ <span className="text-red-500">*</span>
              </Label>
              <Input id="departureDate" type="date" {...field} />
              {fieldState.error && (
                <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="returnDate"
          render={({ field, fieldState }) => (
            <div>
              <Label htmlFor="returnDate" className="mb-1 block">
                Date de retour <span className="text-red-500">*</span>
              </Label>
              <Input id="returnDate" type="date" {...field} />
              {fieldState.error && (
                <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Purpose of visit */}
      <Controller
        control={control}
        name="purposeOfVisit"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="purposeOfVisit" className="mb-1 block">
              Motif du voyage <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="purposeOfVisit"
              placeholder="Décrivez le motif de votre voyage..."
              {...field}
            />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Destination city */}
      <Controller
        control={control}
        name="destinationCity"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="destinationCity" className="mb-1 block">
              Ville de destination <span className="text-red-500">*</span>
            </Label>
            <Input id="destinationCity" placeholder="Bissau" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Accommodation type */}
      <Controller
        control={control}
        name="accommodationType"
        render={({ field, fieldState }) => (
          <div>
            <Label className="mb-1 block">
              Type d&apos;hébergement <span className="text-red-500">*</span>
            </Label>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hôtel">Hôtel</SelectItem>
                <SelectItem value="Chez l'habitant">Chez l&apos;habitant</SelectItem>
                <SelectItem value="Airbnb">Airbnb</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Conditional: inviting person details */}
      {accommodationType === "Chez l'habitant" && (
        <>
          <Controller
            control={control}
            name="invitingPersonName"
            render={({ field, fieldState }) => (
              <div>
                <Label htmlFor="invitingPersonName" className="mb-1 block">
                  Nom de la personne qui vous invite
                </Label>
                <Input
                  id="invitingPersonName"
                  placeholder="Nom complet"
                  {...field}
                  value={field.value ?? ""}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="invitingPersonAddress"
            render={({ field, fieldState }) => (
              <div>
                <Label htmlFor="invitingPersonAddress" className="mb-1 block">
                  Adresse de la personne qui vous invite
                </Label>
                <Input
                  id="invitingPersonAddress"
                  placeholder="Adresse complète"
                  {...field}
                  value={field.value ?? ""}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </>
      )}
    </div>
  );
}

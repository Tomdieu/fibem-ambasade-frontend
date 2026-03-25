"use client";

import { Controller, type Control } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { VisaFormData } from "@/types/visa";

interface StepPersonalInfoProps {
  control: Control<VisaFormData>;
}

export function StepPersonalInfo({ control }: StepPersonalInfoProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Last name */}
      <Controller
        control={control}
        name="lastName"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="lastName" className="mb-1 block">
              Nom de famille <span className="text-red-500">*</span>
            </Label>
            <Input id="lastName" placeholder="Dupont" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* First name */}
      <Controller
        control={control}
        name="firstName"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="firstName" className="mb-1 block">
              Prénom <span className="text-red-500">*</span>
            </Label>
            <Input id="firstName" placeholder="Jean" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Birth date */}
      <Controller
        control={control}
        name="birthDate"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="birthDate" className="mb-1 block">
              Date de naissance <span className="text-red-500">*</span>
            </Label>
            <Input id="birthDate" type="date" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Birth place */}
      <Controller
        control={control}
        name="birthPlace"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="birthPlace" className="mb-1 block">
              Lieu de naissance <span className="text-red-500">*</span>
            </Label>
            <Input id="birthPlace" placeholder="Paris" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Nationality */}
      <Controller
        control={control}
        name="nationality"
        render={({ field, fieldState }) => (
          <div>
            <Label className="mb-1 block">
              Nationalité <span className="text-red-500">*</span>
            </Label>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Française">Française</SelectItem>
                <SelectItem value="Portugaise">Portugaise</SelectItem>
                <SelectItem value="Sénégalaise">Sénégalaise</SelectItem>
                <SelectItem value="Malienne">Malienne</SelectItem>
                <SelectItem value="Guinéenne">Guinéenne</SelectItem>
                <SelectItem value="Ivoirienne">Ivoirienne</SelectItem>
                <SelectItem value="Camerounaise">Camerounaise</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Passport number */}
      <Controller
        control={control}
        name="passportNumber"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="passportNumber" className="mb-1 block">
              Numéro de passeport <span className="text-red-500">*</span>
            </Label>
            <Input id="passportNumber" placeholder="AB123456" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Passport expiry */}
      <Controller
        control={control}
        name="passportExpiry"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="passportExpiry" className="mb-1 block">
              Date d&apos;expiration du passeport <span className="text-red-500">*</span>
            </Label>
            <Input id="passportExpiry" type="date" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Spacer for grid alignment */}
      <div className="hidden md:block" />

      {/* Address France — full width */}
      <Controller
        control={control}
        name="addressFrance"
        render={({ field, fieldState }) => (
          <div className="md:col-span-2">
            <Label htmlFor="addressFrance" className="mb-1 block">
              Adresse en France <span className="text-red-500">*</span>
            </Label>
            <Input id="addressFrance" placeholder="12 rue de la Paix" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Postal code */}
      <Controller
        control={control}
        name="postalCode"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="postalCode" className="mb-1 block">
              Code postal <span className="text-red-500">*</span>
            </Label>
            <Input id="postalCode" placeholder="75001" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* City */}
      <Controller
        control={control}
        name="city"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="city" className="mb-1 block">
              Ville <span className="text-red-500">*</span>
            </Label>
            <Input id="city" placeholder="Paris" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Visa type — full width */}
      <Controller
        control={control}
        name="visaType"
        render={({ field, fieldState }) => (
          <div className="md:col-span-2">
            <Label className="mb-1 block">
              Type de visa <span className="text-red-500">*</span>
            </Label>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner le type de visa..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tourisme">Tourisme</SelectItem>
                <SelectItem value="Affaires">Affaires</SelectItem>
                <SelectItem value="Transit">Transit</SelectItem>
                <SelectItem value="Famille">Famille</SelectItem>
                <SelectItem value="Étudiant">Étudiant</SelectItem>
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}

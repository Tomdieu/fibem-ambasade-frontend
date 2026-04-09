"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Edit2, Save, X, Eye, EyeOff } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { updateUserProfile, changePassword } from "@/actions/user-actions";
import { useI18n } from "@/locales/client";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface ProfileData {
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

export default function ProfilePage() {
  const t = useI18n();
  const [user, setUser] = useState<UserData | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("gb-user="))
      ?.split("=")[1];

    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie));
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  if (!user) {
    return <div className="py-6 text-center">{t("common.loading")}</div>;
  }

  const initials = `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
  const fullName = `${user.first_name} ${user.last_name}`;

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const result = await updateUserProfile(profileData);
      if (result.success) {
        setMessage({ type: "success", text: "Profil mis à jour avec succès" });
        setIsEditingProfile(false);
        setProfileData({});
      } else {
        setMessage({ type: "error", text: result.error || "Erreur lors de la mise à jour" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Les mots de passe ne correspondent pas" });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const result = await changePassword(passwordData.oldPassword, passwordData.newPassword);
      if (result.success) {
        setMessage({ type: "success", text: "Mot de passe changé avec succès" });
        setIsEditingPassword(false);
        setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage({ type: "error", text: result.error || "Erreur lors du changement de mot de passe" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeading title="Mon profil" />

      {message && (
        <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message.text}
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white border rounded-[var(--radius-card)] p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-[var(--color-gb-red)]/10 text-[var(--color-gb-red)] text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-[var(--color-gb-dark)]">
                {fullName}
              </h2>
              <p className="text-sm text-muted-foreground">Habitant de Guinée-Bissau</p>
            </div>
          </div>
          {!isEditingProfile && (
            <Button
              onClick={() => setIsEditingProfile(true)}
              className="text-[var(--color-gb-red)] border-[var(--color-gb-red)] hover:bg-[var(--color-gb-red)]/5"
              variant="outline"
            >
              <Edit2 className="size-4 mr-2" />
              Modifier le profil
            </Button>
          )}
        </div>
      </div>

      {/* Contact Information - Edit Mode */}
      {isEditingProfile && (
        <div className="bg-white border rounded-[var(--radius-card)] p-6">
          <h3 className="text-lg font-semibold text-[var(--color-gb-dark)] mb-4">
            Informations de contact
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Numéro de téléphone
              </label>
              <Input
                type="tel"
                placeholder="+245 96 123 4567"
                value={profileData.phone || ""}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Adresse
              </label>
              <Input
                type="text"
                placeholder="Rue..."
                value={profileData.address || ""}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Ville
                </label>
                <Input
                  type="text"
                  placeholder="Bissau"
                  value={profileData.city || ""}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Code postal
                </label>
                <Input
                  type="text"
                  placeholder="Code postal"
                  value={profileData.postal_code || ""}
                  onChange={(e) => setProfileData({ ...profileData, postal_code: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Pays
              </label>
              <Input
                type="text"
                placeholder="Guinée-Bissau"
                value={profileData.country || ""}
                onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSaveProfile}
                disabled={loading}
                className="bg-[var(--color-gb-red)] text-white hover:bg-[var(--color-gb-red)]/90"
              >
                <Save className="size-4 mr-2" />
                {loading ? "Sauvegarde..." : "Enregistrer"}
              </Button>
              <Button
                onClick={() => {
                  setIsEditingProfile(false);
                  setProfileData({});
                }}
                variant="outline"
              >
                <X className="size-4 mr-2" />
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information - View Mode */}
      {!isEditingProfile && (
        <div className="bg-white border rounded-[var(--radius-card)] p-6">
          <h3 className="text-lg font-semibold text-[var(--color-gb-dark)] mb-4">
            Informations de contact
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-[var(--color-gb-red)]" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-[var(--color-gb-red)]" />
              <div>
                <p className="text-xs text-muted-foreground">Numéro de téléphone</p>
                <p className="text-sm font-medium">
                  {profileData.phone || "+245 96 123 4567"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-[var(--color-gb-red)]" />
              <div>
                <p className="text-xs text-muted-foreground">Adresse</p>
                <p className="text-sm font-medium">
                  {profileData.address || "Non spécifiée"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personal Information */}
      {!isEditingProfile && (
        <div className="bg-white border rounded-[var(--radius-card)] p-6">
          <h3 className="text-lg font-semibold text-[var(--color-gb-dark)] mb-4">
            Informations personnelles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Prénom
              </label>
              <p className="text-sm">{user.first_name}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Nom
              </label>
              <p className="text-sm">{user.last_name}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Ville
              </label>
              <p className="text-sm">{profileData.city || "Bissau"}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Pays
              </label>
              <p className="text-sm">{profileData.country || "Guinée-Bissau"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Account Settings */}
      <div className="bg-white border rounded-[var(--radius-card)] p-6">
        <h3 className="text-lg font-semibold text-[var(--color-gb-dark)] mb-4">
          Paramètres du compte
        </h3>

        {!isEditingPassword ? (
          <Button
            onClick={() => setIsEditingPassword(true)}
            variant="outline"
            className="w-full justify-start text-left text-[var(--color-gb-red)] border-[var(--color-gb-red)] hover:bg-[var(--color-gb-red)]/5"
          >
            Modifier le mot de passe
          </Button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Ancien mot de passe
              </label>
              <div className="relative">
                <Input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Ancien mot de passe"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, oldPassword: e.target.value })
                  }
                />
                <button
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showOldPassword ? (
                    <EyeOff className="size-4 text-muted-foreground" />
                  ) : (
                    <Eye className="size-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Nouveau mot de passe"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? (
                    <EyeOff className="size-4 text-muted-foreground" />
                  ) : (
                    <Eye className="size-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4 text-muted-foreground" />
                  ) : (
                    <Eye className="size-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleChangePassword}
                disabled={loading}
                className="bg-[var(--color-gb-red)] text-white hover:bg-[var(--color-gb-red)]/90"
              >
                <Save className="size-4 mr-2" />
                {loading ? "Changement..." : "Changer le mot de passe"}
              </Button>
              <Button
                onClick={() => {
                  setIsEditingPassword(false);
                  setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
                }}
                variant="outline"
              >
                <X className="size-4 mr-2" />
                Annuler
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

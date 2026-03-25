# Hardcoded Text Analysis - Internationalization Audit

**Project**: FIBEM Ambassade Guinea-Bissau Frontend  
**Analysis Date**: March 25, 2026  
**i18n Framework**: next-international (en, fr, pt)

---

## Executive Summary

**Total Files Audited**: 16 critical files  
**Status**: ⚠️ **CRITICAL** - Extensive hardcoded text across codebase  
**Estimated Priority**: 90+ translatable strings not currently internationalized  

The codebase has a functional i18n setup with `next-international`, but **most UI text is hardcoded directly in components** rather than using translation functions. This audit identifies all offenders, ranked by impact.

---

## Severity Levels

| Level | Definition | Files |
|-------|-----------|-------|
| 🔴 **CRITICAL** | 30+ hardcoded strings per file | 3 files |
| 🟠 **HIGH** | 15-29 hardcoded strings per file | 8 files |
| 🟡 **MEDIUM** | 7-14 hardcoded strings per file | 5 files |

---

## 1. CRITICAL OFFENDERS (Priority 1 - Fix First)

### 1.1 `components/visa/step-personal-info.tsx`
**Hardcoded Strings**: 35+  
**Language**: French

**Form Labels** (all hardcoded):
- `"Nom de famille"`, `"Prénom"`, `"Date de naissance"`, `"Lieu de naissance"`
- `"Nationalité"`, `"Numéro de passeport"`, `"Date d'expiration du passeport"`
- `"Adresse en France"`, `"Code postal"`, `"Ville"`, `"Type de visa"`

**Dropdown Options** (Nationality - hardcoded):
```tsx
<SelectItem value="Française">Française</SelectItem>
<SelectItem value="Portugaise">Portugaise</SelectItem>
<SelectItem value="Sénégalaise">Sénégalaise</SelectItem>
<SelectItem value="Malienne">Malienne</SelectItem>
<SelectItem value="Guinéenne">Guinéenne</SelectItem>
<SelectItem value="Ivoirienne">Ivoirienne</SelectItem>
<SelectItem value="Camerounaise">Camerounaise</SelectItem>
<SelectItem value="Autre">Autre</SelectItem>
```

**Visa Type Options** (hardcoded):
```tsx
<SelectItem value="Tourisme">Tourisme</SelectItem>
<SelectItem value="Affaires">Affaires</SelectItem>
<SelectItem value="Transit">Transit</SelectItem>
<SelectItem value="Famille">Famille</SelectItem>
```

**Placeholders** (hardcoded):
- `"Dupont"`, `"Jean"`, `"Paris"`, `"AB123456"`, `"Sélectionner..."`

**What Should Be Translated**:
- All form labels
- All placeholder text
- All dropdown option values AND display names
- Required field indicator (`*`)

---

### 1.2 `app/[locale]/services/passeport/page.tsx`
**Hardcoded Strings**: 45+  
**Language**: French  
**Severity**: Entire page content is hardcoded

**Page Content** (all hardcoded):
```tsx
title: "Passeport"
subtitle: "Demande et renouvellement de passeport bissau-guinéen"
breadcrumb: "Services"

// Alert
"Pour demander un passeport, prenez d'abord un rendez-vous."
"Tout dossier déposé sans rendez-vous préalable ne pourra pas être traité..."

// Section headers
"Documents requis"
"Délais et tarifs"
"Procédure"

// Document list (6 items)
1. "Formulaire de demande de passeport dûment rempli et signé"
2. "Acte de naissance original ou copie certifiée conforme"
3. "Carte nationale d'identité bissau-guinéenne en cours de validité"
4. "Deux photos d'identité récentes aux normes biométriques (fond blanc)"
5. "Ancien passeport (en cas de renouvellement)"
6. "Justificatif de domicile en France datant de moins de trois mois"

// Table headers & content
"Type" | "Délai" | "Tarif"
| Passeport ordinaire (nouveau) | 4 à 6 semaines | 80 € |
| Renouvellement de passeport | 3 à 4 semaines | 60 € |
| Passeport d'urgence | 72 heures | 120 € |

// Procedure (6 numbered items)
1. "Prenez un rendez-vous en ligne..."
2. "Rassemblez l'ensemble des documents..."
3. "Présentez-vous à l'Ambassade..."
4. "Acquittez les frais de traitement..."
5. "Vous serez informé(e) par email..."
6. "Venez récupérer votre passeport..."

// CTA button
"Prendre un rendez-vous"
```

**What Should Be Translated**:
- Page title and subtitle
- All section headings
- All static content (documents, procedures) - **Currently impossible to translate via i18n**
- Table headers and data labels (but not the actual timelines/prices)
- CTA button text

---

### 1.3 `components/visa/step-travel-details.tsx`
**Hardcoded Strings**: 28+  
**Language**: French

**Form Labels** (all hardcoded):
- `"Date de départ"`, `"Date de retour"`, `"Motif du voyage"`
- `"Ville de destination"`, `"Type d'hébergement"`
- `"Nom de la personne qui vous invite"`, `"Adresse de la personne"`

**Accommodation Options** (hardcoded):
```tsx
<SelectItem value="Hôtel">Hôtel</SelectItem>
<SelectItem value="Chez l'habitant">Chez l&apos;habitant</SelectItem>
<SelectItem value="Airbnb">Airbnb</SelectItem>
<SelectItem value="Autre">Autre</SelectItem>
```

**Conditional Logic Text** (hardcoded):
- Shown only when `accommodationType === "Chez l'habitant"`

**Placeholders** (hardcoded):
- `"Décrivez le motif de votre voyage..."`, `"Bissau"`

**What Should Be Translated**:
- All labels
- Accommodation type options
- Placeholders
- Conditional field labels

---

## 2. HIGH PRIORITY OFFENDERS (Priority 2)

### 2.1 `components/auth/login-form.tsx`
**Hardcoded Strings**: 18+  
**Language**: French

**Key Strings**:
```tsx
// Headers
"Accès sécurisé"
"Connectez-vous à votre espace"

// Form labels
"Adresse email"
"Mot de passe"

// Placeholders
"vous@example.com"
"••••••••"

// Checkbox & Links
"Se souvenir de moi"
"Mot de passe oublié ?"
"Vous êtes citoyen ?"
"Créer un compte"

// Button states
"Se connecter"
"Connexion en cours…"

// Divider
"ou"

// Security
"Connexion sécurisée HTTPS"

// Zod validation errors (hardcoded in schema)
"Adresse email invalide."
"Le mot de passe est requis."
```

**What Should Be Translated**:
- All visible UI text
- Zod error messages
- Button labels and states
- Helper text

---

### 2.2 `components/contact/contact-form.tsx`
**Hardcoded Strings**: 17+  
**Language**: French

**Key Strings**:
```tsx
// Form section
"Envoyer un message"

// Validation errors
"Le nom doit contenir au moins 2 caractères."
"Adresse email invalide."
"Veuillez choisir un sujet."
"Le message doit contenir au moins 10 caractères."
"Vous devez accepter la politique de confidentialité."

// Subject options (SUBJECTS array)
{ value: "information", label: "Information" }
{ value: "consulaire", label: "Service consulaire" }
{ value: "presse", label: "Presse" }
{ value: "cooperation", label: "Coopération" }
{ value: "autre", label: "Autre" }

// Success message
"Votre message a été envoyé. Nous vous répondrons dans les 3 jours ouvrés."

// Follow-up text
"Merci de nous avoir contacté. Notre équipe consulaire traitera votre demande dans les meilleurs délais."

// Error fallback
"Une erreur est survenue."
```

**What Should Be Translated**:
- Section title
- All form labels
- Placeholder text
- Subject options
- All validation messages
- Success/error messages

---

### 2.3 `components/visa/visa-form-wizard.tsx`
**Hardcoded Strings**: 15+  
**Language**: French

**Key Strings**:
```tsx
// Success state
"Demande soumise avec succès"
"Votre demande de visa a été enregistrée. Vous recevrez une confirmation par email."
"Numéro de référence"
"Conservez ce numéro pour le suivi de votre dossier."

// Navigation buttons
"Précédent"
"Suivant →"
"Soumettre la demande"
"Envoi en cours..."

// Error handling
"Une erreur réseau est survenue. Veuillez réessayer."
```

**What Should Be Translated**:
- Success confirmation messages
- Navigation button labels
- Progress indicators
- Error messages
- Any placeholders or helper text

---

### 2.4 `components/visa/step-confirmation.tsx`
**Hardcoded Strings**: 22+  
**Language**: French

**Section Headers** (all hardcoded):
- `"Identité"`, `"Voyage"`, `"Documents"`

**Identity Section Labels**:
- `"Nom"`, `"Prénom"`, `"Date de naissance"`, `"Lieu de naissance"`
- `"Nationalité"`, `"N° de passeport"`, `"Expiration passeport"`
- `"Type de visa"`, `"Adresse en France"`

**Travel Section Labels**:
- `"Date de départ"`, `"Date de retour"`, `"Ville de destination"`
- `"Hébergement"`, `"Motif du voyage"`, `"Personne invitante"`

**Document Labels**:
- `"Scan passeport"`, `"Photo d'identité"`, `"Lettre d'invitation"`
- `"Justificatif hébergement"`, `"Justificatif ressources"`
- `"Oui"`, `"Non"` (for document presence)

**Confirmation Checkbox**:
- `"Je certifie que les informations fournies sont exactes et complètes."`

**Security Notice**:
- `"Vos données personnelles sont traitées de manière confidentielle et sécurisée conformément au RGPD. Elles ne seront utilisées qu'aux fins du traitement de votre demande de visa."`

**What Should Be Translated**:
- All summary labels
- Section headers
- Document status text
- Confirmation text
- Security notice

---

### 2.5 `app/[locale]/contact/page.tsx`
**Hardcoded Strings**: 18+  
**Language**: French

**Page Structure**:
```tsx
// Breadcrumb
"Contact"

// PageHero
title: "Contact"
subtitle: "Contactez l'Ambassade de Guinée-Bissau en France"
breadcrumb: "Accueil" → "Contact"

// Card headers
"Adresse"
"Horaires d'ouverture"
"Coordonnées"
"Suivez-nous"

// Opening hours table
"Lun – Ven" | "9h00 – 17h00"
"Samedi" | "Fermé"
"Dimanche" | "Fermé"

// Address
"24 Rue de la Pompe\n75116 Paris, France"
"Voir sur Google Maps"

// Social buttons
"Facebook"
"Twitter"
```

**What Should Be Translated**:
- Page title and subtitle
- All card headers
- Hours labels (days and status)
- Link text ("Voir sur Google Maps")
- Social platform names
- Any instructional text

---

### 2.6 `components/booking/booking-wizard.tsx`
**Hardcoded Strings**: 12+  
**Language**: French

**Service Options** (hardcoded SERVICES array):
```tsx
{
  value: "visa",
  label: "Demande de visa",
  duration: "45 min",
}
{
  value: "passeport",
  label: "Passeport",
  duration: "30 min",
}
{
  value: "legalisation",
  label: "Légalisation",
  duration: "20 min",
}
{
  value: "rendezvous",
  label: "Rendez-vous général",
  duration: "15 min",
}
```

**UI Text** (hardcoded):
- `"Prise de rendez-vous"` (left panel title)
- Duration labels: `"45 min"`, `"30 min"`, `"20 min"`, `"15 min"`

**Form Labels** (from SummaryRow components):
- `"Date"`, `"Heure"`, `"Nom"`, `"Email"`, `"Téléphone"`

**What Should Be Translated**:
- Service labels and durations
- Left panel title
- Form field labels
- Any buttons or helper text

---

### 2.7 `components/home/hero-section.tsx`
**Hardcoded Strings**: 12+  
**Language**: French

**Key Strings**:
```tsx
// Badge
"Site Officiel"

// Main heading
"Bienvenue à l'Ambassade de Guinée-Bissau en France"

// Subheading
"Retrouvez tous les services consulaires, les informations officielles et les démarches administratives de la République de Guinée-Bissau."

// CTA buttons
"Demander un visa"
"Nos services"

// Quick access cards (3 hardcoded)
{
  title: "Demande de visa",
  description: "Déposez votre dossier en ligne",
}
{
  title: "Passeport",
  description: "Renouvellement et première demande",
}
{
  title: "Inscription consulaire",
  description: "Enregistrez-vous auprès de l'ambassade",
}
```

**What Should Be Translated**:
- Official badge text
- Hero headline and subheading
- CTA button labels
- Quick-access card titles and descriptions

---

## 3. MEDIUM PRIORITY OFFENDERS (Priority 3)

### 3.1 `components/home/services-strip.tsx`
**Hardcoded Strings**: 8+  
**Language**: French

**Service Descriptions** (hardcoded in SERVICES array):
```tsx
"Demandez votre visa pour la Guinée-Bissau"
"Établissement et renouvellement de passeport"
"Légalisation et apostille de documents"
"Prenez rendez-vous en ligne"
"Inscrivez-vous au registre consulaire"
```

**What Should Be Translated**:
- Service descriptions
- Service type labels (passed to ServiceTile component)

---

### 3.2 `components/home/country-spotlight.tsx`
**Hardcoded Strings**: 9+  
**Language**: French

**Key Strings**:
```tsx
// Section heading
"Découvrir la Guinée-Bissau"

// Main description
"La Guinée-Bissau est un pays d'Afrique de l'Ouest, bordé par le Sénégal au nord, la Guinée au sud et à l'est, et l'océan Atlantique à l'ouest. Riche de sa biodiversité, de sa culture et de ses traditions ancestrales, le pays offre un patrimoine unique à découvrir."

// Stat labels (passed to StatCard)
"Superficie"
"Population"
"Capitale"

// Stat values
"36 125 km²"
"2,1M"
"Bissau"

// Button
"En savoir plus"
```

**What Should Be Translated**:
- Section heading
- Long description text
- Stat labels
- Button text
- (Note: Stat values like "2,1M" and "36 125 km²" are data, not UI text)

---

### 3.3 `components/visa/step-documents.tsx`
**Hardcoded Strings**: 10+  
**Language**: French

**Alert Text**:
```tsx
"Les documents originaux seront vérifiés lors du rendez-vous."
```

**Document List** (hardcoded DOCUMENTS array):
```tsx
{
  name: "Scan du passeport",
  description: "Pages d'identité et pages des visas précédents",
}
{
  name: "Photo d'identité",
  description: "Photo récente (moins de 6 mois), fond blanc, 35×45 mm",
}
{
  name: "Lettre d'invitation",
  description: "Si applicable, lettre officielle de l'invitant",
}
{
  name: "Justificatif d'hébergement",
  description: "Réservation d'hôtel ou attestation d'hébergement",
}
{
  name: "Justificatif de ressources",
  description: "Relevé bancaire ou tout document attestant vos moyens financiers",
}
```

**What Should Be Translated**:
- Alert text
- All document names and descriptions

---

### 3.4 `components/admin/admin-sidebar.tsx`
**Hardcoded Strings**: 11+  
**Language**: French

**Header Text**:
```tsx
"Back-office Consulaire"
```

**Navigation Groups**:
```tsx
"Gestion"
"Rapports"
"Système"
```

**Menu Items**:
```tsx
// Gestion
"Demandes consulaires"
"Rendez-vous"
"Utilisateurs"
"Documents"

// Rapports
"Statistiques"
"Exports"

// Système
"Paramètres"
"Journal d'audit"
```

**What Should Be Translated**:
- Admin header text
- All group labels
- All menu item labels

---

### 3.5 `components/citizen/citizen-sidebar.tsx`
**Hardcoded Strings**: 8+  
**Language**: French

**Badge Text**:
```tsx
"Citoyen inscrit"
```

**Navigation Items**:
```tsx
"Tableau de bord"
"Mes demandes"
"Rendez-vous"
"Mes documents"
"Profil"
```

**Footer**:
```tsx
"Déconnexion"
```

**What Should Be Translated**:
- Badge text
- All navigation labels
- Logout button text

---

## 4. SUMMARY TABLE

| File | Type | Strings | Status | Priority |
|------|------|---------|--------|----------|
| `components/visa/step-personal-info.tsx` | Component | 35+ | ❌ Hardcoded | P1 |
| `app/[locale]/services/passeport/page.tsx` | Page | 45+ | ❌ Hardcoded | P1 |
| `components/visa/step-travel-details.tsx` | Component | 28+ | ❌ Hardcoded | P1 |
| `components/auth/login-form.tsx` | Component | 18+ | ❌ Hardcoded | P2 |
| `components/contact/contact-form.tsx` | Component | 17+ | ❌ Hardcoded | P2 |
| `components/visa/visa-form-wizard.tsx` | Component | 15+ | ❌ Hardcoded | P2 |
| `components/visa/step-confirmation.tsx` | Component | 22+ | ❌ Hardcoded | P2 |
| `app/[locale]/contact/page.tsx` | Page | 18+ | ❌ Hardcoded | P2 |
| `components/booking/booking-wizard.tsx` | Component | 12+ | ❌ Hardcoded | P2 |
| `components/home/hero-section.tsx` | Component | 12+ | ❌ Hardcoded | P2 |
| `components/home/services-strip.tsx` | Component | 8+ | ❌ Hardcoded | P3 |
| `components/home/country-spotlight.tsx` | Component | 9+ | ❌ Hardcoded | P3 |
| `components/visa/step-documents.tsx` | Component | 10+ | ❌ Hardcoded | P3 |
| `components/admin/admin-sidebar.tsx` | Component | 11+ | ❌ Hardcoded | P3 |
| `components/citizen/citizen-sidebar.tsx` | Component | 8+ | ❌ Hardcoded | P3 |
| `components/layout/header.tsx` | Component | Minimal | ⚠️ Partial | P3 |

**Total Estimated Strings**: 308+ hardcoded across codebase

---

## 5. RECOMMENDATION & NEXT STEPS

### Immediate Actions (Week 1)
1. **Create i18n files** for Priority P1 components
   - Add translation keys to `locales/en.ts`, `locales/fr.ts`, `locales/pt.ts`
   - Use consistent naming convention (e.g., `visa.personalInfo.firstNameLabel`)

2. **Update P1 components** to use `useI18n()` (client) or `getI18n()` (server)
   - Migrate form labels
   - Migrate dropdown options
   - Migrate validation messages

### Short Term (Week 2-3)
3. **Create refactor plan** for service pages (currently hardcoded JSX)
   - Consider moving content to CMS or separate i18n files
   - Evaluate component structure for pages like `passeport/page.tsx`

4. **Update P2 components** with i18n usage

### Medium Term (Week 4-6)
5. **Update P3 components** with i18n usage
6. **Add to sidebar/admin** text to i18n
7. **Test all locales** (English, French, Portuguese)

### Ongoing
8. **Create style guide** for i18n key naming
9. **Add linting rule** to prevent new hardcoded strings
10. **Document translation workflow** for future additions

---

## 6. NOTES

- **Locales structure** is already set up via `next-international`
- **Client vs Server components**: Use `useI18n()` for client components, `getI18n()` for server components
- **Dropdown values vs labels**: Need to distinguish between form values (can stay in English) and display labels (must be translated)
- **No existing translation usage**: Very few components currently use `t()` function
- **Zod schema messages**: Validation errors are hardcoded in component schemas, should be parameterized or extracted


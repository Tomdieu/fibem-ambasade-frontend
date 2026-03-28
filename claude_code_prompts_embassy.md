# Claude Code Prompts — Ambassade de Guinée-Bissau
## Stack: Next.js 16 · Tailwind CSS v4 · shadcn/ui

> **How to use:** Copy each prompt block verbatim into Claude Code.
> Run them in order — each prompt builds on the previous ones.
> Prompts reference each other's file paths so the component tree stays consistent.

---

## TECH CONSTRAINTS PREAMBLE
> Paste this block at the top of EVERY prompt, or save it as a Claude Code memory.

```
STRICT TECH CONSTRAINTS — respect these in every file you generate:

NEXT.JS 16:
- App Router only. No Pages Router.
- All route params are async: always `const { id } = await params` inside Server Components.
- Use `"use cache"` directive (NOT fetch cache options) for cached Server Components/functions.
- Rename any middleware to proxy.ts and export `proxy` (not `middleware`).
- Turbopack is default — do NOT add webpack config unless explicitly asked.
- React 19.2 — use `useOptimistic`, `useFormStatus`, `useActionState` where appropriate.
- Server Actions go in separate `actions/` files with `"use server"` at the top.
- Use `<Suspense>` boundaries with skeleton fallbacks for all async Server Components.

TAILWIND CSS v4:
- NO tailwind.config.js/ts. All customisation lives in globals.css via @theme {}.
- CSS entry is: @import "tailwindcss"; — NOT @tailwind base/components/utilities.
- All custom tokens go inside @theme {} block in globals.css.
- Reference design tokens as CSS variables: var(--color-gb-red), etc.
- No content[] array — auto-detection is on by default.
- Use new v4 utilities: not-* variant, @starting-style, container queries (cq-*), 3D transforms.
- Arbitrary values still work: bg-[#CE1126], text-[var(--color-gb-red)].

SHADCN/UI:
- Install components with: npx shadcn@latest add <component>
- Import from "@/components/ui/<component>".
- Use the Sidebar component (shadcn built-in) for all sidebar layouts.
- Use Sonner (not Toast) for notifications: npx shadcn@latest add sonner.
- Forms: use React Hook Form + zod with shadcn Form, Field, Label components.
- Use shadcn DataTable (TanStack Table) for all tabular data.
- Spinner is now a shadcn component: npx shadcn@latest add spinner.

GENERAL:
- TypeScript strict mode everywhere.
- All components in src/components/, pages in src/app/.
- Shared types in src/types/.
- Use cn() from "@/lib/utils" for conditional class merging.
- Lucide React for all icons.
- next/image for all images with proper width/height or fill + sizes props.
- next/link for all internal navigation.
```

---

## PROMPT 1 — Project Bootstrap & Design Tokens

```
You are setting up the foundation for the official website of the Embassy of Guinea-Bissau
in France. This is a Next.js 16 App Router project with Tailwind CSS v4 and shadcn/ui.

[Apply TECH CONSTRAINTS above]

TASK: Create the global CSS file and layout scaffolding.

━━━ FILE: src/app/globals.css ━━━
Set up Tailwind v4 with @import "tailwindcss" (NOT the old @tailwind directives).

Inside an @theme {} block, define these custom design tokens:

Brand colours:
  --color-gb-red: #CE1126;
  --color-gb-yellow: #FCE020;
  --color-gb-green: #009E60;
  --color-gb-dark: #1A1A1A;

Surface colours:
  --color-surface-page: #F7F7F5;
  --color-surface-card: #FFFFFF;
  --color-surface-muted: #E8E6E0;

Text colours:
  --color-text-body: #1A1A1A;
  --color-text-muted: #6B7280;
  --color-text-hint: #9CA3AF;

Semantic colours (for status badges):
  --color-status-new: #3B82F6;
  --color-status-pending: #F59E0B;
  --color-status-approved: #10B981;
  --color-status-rejected: #EF4444;
  --color-status-archived: #6B7280;
  --color-status-missing: #F97316;

Spacing scale (extend the default):
  --spacing-section: 5rem;
  --spacing-container: 1.25rem;

Typography:
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Inter", ui-sans-serif, system-ui, sans-serif;

Border radius:
  --radius-card: 0.75rem;
  --radius-badge: 0.375rem;

Also add these base styles in a @layer base {} block:
- html: scroll-behaviour smooth
- body: font-sans, bg-surface-page, text-body, antialiased
- ::selection: bg-gb-red/20

━━━ FILE: src/app/layout.tsx ━━━
Root layout. Must include:
- <html lang="fr"> with suppressHydrationWarning
- Metadata: title template "%s | Ambassade de Guinée-Bissau", description, openGraph
- Inter font loaded via next/font/google with subsets: ["latin", "latin-ext"]
  Apply font via className on <body>
- Toaster from shadcn Sonner: <Toaster position="top-right" richColors />
- No client components in this file — keep it a Server Component

━━━ FILE: src/lib/utils.ts ━━━
Standard cn() utility using clsx + tailwind-merge.
Also export a formatDate(date: Date, locale?: string) helper.
Also export a getStatusConfig(status: string) helper that returns
{ label, className, variant } for the 5 status types above.

━━━ FILE: src/types/index.ts ━━━
Export these TypeScript interfaces:
- VisaRequest: id, reference, applicantName, nationality, visaType, submittedAt, status, assignedAgent
- AppointmentSlot: id, date, time, serviceType, isAvailable, citizenId?
- NavItem: label, href, children?: NavItem[], icon?: string
- StatusType: "new" | "pending" | "approved" | "rejected" | "archived" | "missing"
- ServiceType: "visa" | "passeport" | "legalisation" | "inscription" | "rendezvous"
- UserRole: "admin" | "agent" | "citizen" | "public"

━━━ FILE: src/lib/navigation.ts ━━━
Export MAIN_NAV as NavItem[] with the full navigation tree:
Accueil / L'Ambassade (children: Présentation, Mot de l'Ambassadeur, Personnel, Histoire) /
Services Consulaires (children: Visa, Passeport, Légalisation, État Civil, Inscription, Rendez-vous) /
Guinée-Bissau (children: Présentation, Culture & Tourisme, Économie, Actualités) /
Coopération / Diaspora / Contact

Also export FOOTER_LINKS as a grouped object with sections:
Informations, Services, Légal — each with arrays of { label, href }.
```

---

## PROMPT 2 — Header & Navigation Component

```
Build the sticky site-wide Header component for the Embassy of Guinea-Bissau website.

[Apply TECH CONSTRAINTS]

━━━ INSTALL SHADCN COMPONENTS FIRST ━━━
npx shadcn@latest add navigation-menu button sheet command

━━━ FILE: src/components/layout/header.tsx ━━━
'use client' — this component needs interactivity.

VISUAL SPEC:
- Full-width, sticky top-0, z-50, white background, border-b border-surface-muted
- Height: 72px desktop / 60px mobile
- Max-width container: max-w-7xl mx-auto px-container

LEFT SECTION:
- Logo: next/image placeholder (64x64) + site title "Ambassade de Guinée-Bissau en France"
  Title: hidden on mobile, visible md:block, text-sm font-medium text-gb-dark
  Both wrapped in next/link href="/"

CENTRE SECTION (desktop only, hidden on mobile):
- Use shadcn NavigationMenu component.
- Render MAIN_NAV from src/lib/navigation.ts.
- Items with children render as NavigationMenuTrigger + NavigationMenuContent dropdown.
- Dropdowns: white card, rounded-card shadow-md, grid cols for items with children > 4.
- Active link: text-gb-red, underline offset-4.
- Use next/link inside NavigationMenuLink for proper prefetching.

RIGHT SECTION:
- Search button: Ghost Button with Search icon (lucide), opens a shadcn Command dialog
  (cmdk) for site-wide search. Keyboard shortcut: Ctrl+K / Cmd+K.
- Language selector: a simple toggle cycling FR → PT → EN.
  Render as a Button variant="outline" showing current lang.
  Store selection in a cookie via a Server Action.
- Mobile menu button (md:hidden): Menu icon, opens a shadcn Sheet from the right.
  Sheet contains full nav tree as collapsible accordion (shadcn Accordion component).

SCROLL BEHAVIOUR:
- On scroll > 20px: add a subtle box-shadow-sm and slightly reduce height (transition).
- Use useScrollPosition custom hook (create in src/hooks/use-scroll-position.ts).

━━━ FILE: src/components/layout/mobile-nav.tsx ━━━
Client component. Receives navItems: NavItem[].
Renders as a Sheet sidebar with nested Accordion for items with children.
Each leaf link closes the Sheet on click.

━━━ FILE: src/hooks/use-scroll-position.ts ━━━
Simple hook returning scrollY: number, updated on scroll with useEffect + cleanup.

━━━ FILE: src/components/layout/search-dialog.tsx ━━━
'use client'. Uses shadcn Command (cmdk) inside a Dialog.
Shows command groups: Services Consulaires, Pages, Ressources.
Hard-code 8–10 realistic search items for now (placeholder).
Opens on Ctrl+K / Cmd+K via keyboard event listener.
```

---

## PROMPT 3 — Footer Component

```
Build the site-wide Footer component for the Embassy of Guinea-Bissau website.

[Apply TECH CONSTRAINTS]

━━━ FILE: src/components/layout/footer.tsx ━━━
Server Component (no interactivity needed).

LAYOUT: Full-width, bg-gb-dark text-white, padding-y section.
Max-width container: max-w-7xl mx-auto px-container.
Four-column grid on desktop (lg:grid-cols-4), two-column on tablet (md:grid-cols-2),
single column on mobile.

COLUMN 1 — Brand:
- Logo + title "Ambassade de Guinée-Bissau en France" in white.
- Short tagline text in text-white/60.
- Flag colour bar: three horizontal stripes (gb-red, gb-yellow, gb-green), h-1 w-20,
  displayed as three inline divs.
- Social icons: Facebook, Twitter, Linkedin, Youtube — each a lucide icon in a square
  button (variant ghost, text-white/60 hover:text-white hover:bg-white/10, size 36px).

COLUMNS 2 & 3 — Links:
- Use FOOTER_LINKS from src/lib/navigation.ts.
- Each group: heading in text-white/50 uppercase text-xs tracking-wider,
  then list of next/link items in text-white/70 hover:text-white text-sm leading-loose.

COLUMN 4 — Contact:
- MapPin icon + address text
- Phone icon + telephone
- Mail icon + email
- Clock icon + "Lun-Ven 9h00–17h00"
- "Voir sur Google Maps →" link styled as text-gb-yellow hover:underline text-sm.

BOTTOM BAR:
- border-t border-white/10, padding-y-4.
- Left: "© {current year} Ambassade de Guinée-Bissau. Tous droits réservés."
- Right: Mentions légales · Politique de confidentialité · Plan du site (links).
- Use Flexbox row on desktop, column on mobile.

IMPORTANT: Import this footer into src/app/layout.tsx alongside the Header.
Wrap main page content in <main className="flex-1">.
```

---

## PROMPT 4 — Reusable UI Components Library

```
Create the shared reusable component library for the Embassy website.
These will be used across multiple pages.

[Apply TECH CONSTRAINTS]

━━━ FILE: src/components/ui/status-badge.tsx ━━━
Props: status: StatusType, size?: "sm" | "md"
Uses getStatusConfig() from src/lib/utils.ts.
Renders a shadcn Badge with the correct variant and label.
Colour mapping:
  new → bg-blue-100 text-blue-800
  pending → bg-amber-100 text-amber-800
  approved → bg-emerald-100 text-emerald-800
  rejected → bg-red-100 text-red-800
  archived → bg-gray-100 text-gray-600
  missing → bg-orange-100 text-orange-800

━━━ FILE: src/components/ui/section-heading.tsx ━━━
Props: title: string, subtitle?: string, align?: "left" | "center", action?: ReactNode
Desktop: left or center aligned heading with optional red left-border accent (3px, gb-red)
when align="left". Title: text-2xl font-medium. Subtitle: text-muted text-sm mt-1.
Action (e.g. "Voir tout →" link) rendered to the right of the title row.

━━━ FILE: src/components/ui/stat-card.tsx ━━━
Props: label: string, value: string | number, icon?: LucideIcon, trend?: number,
color?: "red" | "green" | "amber" | "blue"
Renders a metric card: bg-white border rounded-card p-4.
Icon in a colored circle (color prop maps to Tailwind bg-*/10 + text-*).
Large value: text-2xl font-medium. Muted label: text-xs text-muted uppercase.
Optional trend: green ↑ or red ↓ with percentage.

━━━ FILE: src/components/ui/service-tile.tsx ━━━
Props: service: ServiceType, href: string, description: string
Icon circle (48px, bg-gb-blue/10, gb-green icon), title, short description, arrow link.
Entire tile is a next/link wrapper with hover:shadow-md transition.

━━━ FILE: src/components/ui/news-card.tsx ━━━
Props: category: string, date: Date, title: string, excerpt: string, href: string,
imageUrl?: string
Renders a card with: optional image (next/image with aspect-video), category badge
(bg-gb-red/10 text-gb-red text-xs), date (formatted dd/MM/yyyy), title (text-base font-medium
line-clamp-2), excerpt (text-sm text-muted line-clamp-3), "Lire la suite →" link.

━━━ FILE: src/components/ui/page-hero.tsx ━━━
Props: title: string, subtitle?: string, breadcrumbs?: {label: string, href?: string}[]
Full-width banner. Background: bg-gb-dark.
Left border accent: 4px solid gb-red on title container.
Breadcrumbs row above title using shadcn Breadcrumb component.
Title: text-3xl font-medium text-white. Subtitle: text-white/70 text-base mt-2.
Padding: py-12 md:py-16.

━━━ FILE: src/components/ui/empty-state.tsx ━━━
Props: icon: LucideIcon, title: string, description: string, action?: ReactNode
Centred layout: icon (48px, text-muted), title (text-base font-medium), description
(text-sm text-muted), optional action button below.
Uses shadcn Empty component as base.

━━━ FILE: src/components/ui/data-table-wrapper.tsx ━━━
Generic wrapper around shadcn DataTable (TanStack Table).
Props: columns: ColumnDef<T>[], data: T[], searchKey?: string,
filterOptions?: {key: string, label: string, options: {label, value}[]}[]
Includes: search input (if searchKey), filter dropdowns, column visibility toggle,
export CSV button (client-side), pagination (shadcn Pagination).
Use shadcn Table, Select, Button, Input components internally.
```

---

## PROMPT 5 — Homepage

```
Build the complete homepage for the Embassy of Guinea-Bissau website.

[Apply TECH CONSTRAINTS]
Import and reuse components from Prompts 3 & 4.

━━━ FILE: src/app/page.tsx ━━━
Server Component. Use "use cache" directive for any fetched data.
Import and compose the sections below.

━━━ FILE: src/components/home/hero-section.tsx ━━━
'use client' — for animation only.
Full-width, min-h-[580px] relative, bg-gb-green.
Layout: flex flex-col md:flex-row.

LEFT (55%, padding 4rem md:5rem):
- Tag: "Site Officiel" small badge (bg-white/20 text-white)
- H1: "Bienvenue à l'Ambassade de Guinée-Bissau en France" — text-4xl md:text-5xl
  font-medium text-white leading-tight
- Subtitle: text-white/80 text-lg mt-4 max-w-md
- CTA row: two Button components side by side mt-8
  Primary: "Demander un visa" → /services/visa (bg-white text-gb-dark hover:bg-white/90)
  Secondary: "Nos services" → /services (variant=outline border-white text-white
  hover:bg-white/10)

RIGHT (45%):
- Three stacked "quick access" cards, slightly overlapping, each with a white bg,
  rounded-card, border, p-4.
  Cards: Visa · Passeport · Inscription consulaire.
  Each: service icon circle + title + short description + "→" link.
  Use translate-x-6 on the stack container for the overlapping visual effect.

━━━ FILE: src/components/home/news-section.tsx ━━━
Server Component. Accept posts: NewsPost[] prop (define NewsPost type inline).
Use <SectionHeading> with action="Voir toutes les actualités".
Three-column grid (lg:grid-cols-3 md:grid-cols-2), gap-6.
Render <NewsCard> for each post.
Wrap in <Suspense fallback={<NewsSectionSkeleton />}>.

━━━ FILE: src/components/home/services-strip.tsx ━━━
Server Component. White bg, padding-y-section.
SectionHeading centred: "Services consulaires en bref".
Five-column grid (lg:grid-cols-5 sm:grid-cols-3), gap-4.
Render <ServiceTile> for: visa, passeport, legalisation, rendezvous, inscription.

━━━ FILE: src/components/home/country-spotlight.tsx ━━━
Two-column layout (md:grid-cols-2 gap-12).
LEFT: next/image placeholder (aspect-video, rounded-card, bg-gb-blue/10 as placeholder).
RIGHT: SectionHeading + paragraph text + three StatCards in a 3-column grid
(area, population, capital) + "En savoir plus →" Button variant=outline.

━━━ FILE: src/components/home/news-section-skeleton.tsx ━━━
Skeleton loading state using shadcn Skeleton component.
Three card skeletons matching NewsCard layout: skeleton image, skeleton lines.

━━━ FILE: src/app/page.tsx (compose) ━━━
Import and render in order:
1. <HeroSection />
2. <ServicesStrip />
3. <Suspense><NewsSection posts={mockPosts} /></Suspense>
4. <CountrySpotlight />
Add realistic mock data inline for posts (4 items) and stats.
Generate a proper <Metadata> export with title and description.
```

---

## PROMPT 6 — Multi-Step Visa Application Form

```
Build the multi-step visa application form for the Embassy of Guinea-Bissau.

[Apply TECH CONSTRAINTS]

━━━ INSTALL ━━━
npx shadcn@latest add form field label input select textarea checkbox progress

━━━ FILE: src/types/visa.ts ━━━
Export VisaFormData interface with all fields across 4 steps:
Step 1 (Personal): lastName, firstName, birthDate, birthPlace, nationality,
  passportNumber, passportExpiry, addressFrance, postalCode, city, visaType
Step 2 (Travel): departureDate, returnDate, purposeOfVisit, destinationCity,
  invitingPersonName?, invitingPersonAddress?, accommodationType
Step 3 (Documents): hasPassportScan, hasPhoto, hasInvitationLetter,
  hasProofOfAccommodation, hasProofOfFunds, additionalNotes?
Step 4: confirmation boolean

Export visaFormSchema using zod, with proper validation per field.
Export a const VISA_STEPS: {id, title, description, fields}[] for the 4 steps.

━━━ FILE: src/app/services/visa/page.tsx ━━━
Server Component. Renders <PageHero> + <VisaFormWizard />.
Metadata: title "Demande de Visa", description.

━━━ FILE: src/components/visa/visa-form-wizard.tsx ━━━
'use client'. This is the main form orchestrator.

STATE: useReducer with { currentStep: number, formData: Partial<VisaFormData>,
isSubmitting: boolean, isSubmitted: boolean }.

STEP INDICATOR (top of form):
- Four steps shown as numbered circles (1–4) connected by a line.
- Completed steps: filled gb-red circle with checkmark icon.
- Current step: filled gb-red circle with number.
- Upcoming steps: grey circle with number.
- Step label below each circle (hidden on mobile).
- shadcn Progress bar below showing completion percentage.

FORM BODY:
- White card (bg-white border rounded-card p-6 md:p-8), max-w-2xl mx-auto.
- Step title (text-xl font-medium) + subtitle (text-sm text-muted) at top.
- Render the correct step component based on currentStep.

NAVIGATION BUTTONS (bottom of card):
- "Précédent" Button variant=ghost (hidden on step 1).
- "Suivant →" Button (gb-red bg) or "Soumettre" on step 4.
- useFormStatus for loading state on submit.

━━━ FILE: src/components/visa/step-personal-info.tsx ━━━
'use client'. Uses shadcn Form + react-hook-form.
Two-column grid (md:grid-cols-2 gap-4) for most fields.
Fields: lastName, firstName (row 1), birthDate (shadcn DatePicker), birthPlace (row 2),
nationality (shadcn Select with 20 most common nationalities), passportNumber (row 3),
passportExpiry (DatePicker) (row 4), addressFrance full-width, postalCode + city (row 5),
visaType Select (Tourisme / Affaires / Transit / Famille / Étudiant) full-width.
Each field uses shadcn Field + Label + Input/Select + error message pattern.

━━━ FILE: src/components/visa/step-travel-details.tsx ━━━
departureDate + returnDate (two DatePickers side by side).
purposeOfVisit Textarea.
destinationCity Input.
accommodationType Select (Hôtel / Chez l'habitant / Airbnb / Autre).
Conditional fields (shown only if accommodationType = "Chez l'habitant"):
  invitingPersonName + invitingPersonAddress — use useWatch to control visibility.

━━━ FILE: src/components/visa/step-documents.tsx ━━━
Checklist of required documents, each as a row with:
- Document icon + name + description.
- Checkbox (shadcn) to confirm the document is ready to bring.
- Status indicator: ticked (green checkmark), unticked (amber warning icon).
Use an Alert (shadcn) at the top: "Les documents originaux seront vérifiés lors du rendez-vous."

━━━ FILE: src/components/visa/step-confirmation.tsx ━━━
Summary view. Grouped sections (Identité, Voyage, Documents) showing all form values.
Each section: SectionHeading + grid of label/value pairs.
Checkbox: "Je certifie que les informations sont exactes" — required.
Security notice: Shield icon + RGPD text in a muted Alert.

━━━ FILE: src/actions/visa-actions.ts ━━━
"use server" — Server Actions file.
Export submitVisaApplication(formData: VisaFormData): Promise<{success, reference?, error?}>
For now: validate with zod, generate a fake reference (REF-{year}-{random 4 digits}),
return success. Add revalidateTag("visa-requests").
```

---

## PROMPT 7 — Appointment Booking

```
Build the appointment booking page for consular services.

[Apply TECH CONSTRAINTS]

━━━ INSTALL ━━━
npx shadcn@latest add calendar radio-group separator

━━━ FILE: src/types/appointment.ts ━━━
Export interfaces: TimeSlot { time: string, available: boolean },
DaySlots { date: Date, slots: TimeSlot[] },
BookingFormData { serviceType: ServiceType, date: Date, time: string,
  firstName: string, lastName: string, email: string, phone: string, notes?: string }
Export bookingSchema (zod).

━━━ FILE: src/app/services/rendez-vous/page.tsx ━━━
Server Component. PageHero + <BookingWizard />. Metadata.

━━━ FILE: src/components/booking/booking-wizard.tsx ━━━
'use client'. Three-step flow:
Step 1: Choose service + date/time.
Step 2: Personal details form.
Step 3: Confirmation.

LAYOUT: Two-panel card (lg:flex), max-w-5xl mx-auto, border rounded-card overflow-hidden.

LEFT PANEL (38%, bg-surface-page border-r):
- "Prise de rendez-vous" heading.
- Service selector: shadcn RadioGroup, each option rendered as a styled card row
  (icon + name + duration chip). Selected item: left border gb-red, bg-gb-red/5.
- Duration display: "Durée estimée : {duration}".
- Separator.
- Embassy address block: MapPin icon + address text, text-sm.

RIGHT PANEL (62%, bg-white p-6):
STEP 1 — Calendar + time slots:
- Month navigator: "← {month} {year} →" with ChevronLeft/Right Buttons.
- 7-column weekday header (Lun–Dim), text-xs text-muted.
- Calendar grid: use shadcn Calendar component (mode="single", locale=fr).
  Override day render: available=white hover:border-gb-blue, unavailable=bg-surface-muted
  text-muted cursor-not-allowed, selected=bg-gb-red text-white.
- Time slots grid (3 cols, gap-2): pill buttons.
  Available: border border-surface-muted hover:border-gb-blue hover:text-gb-green.
  Selected: bg-gb-red text-white border-gb-red.
  Full: bg-surface-muted text-muted cursor-not-allowed opacity-60.

STEP 2 — Attendee form:
firstName + lastName (2-col), email full-width, phone full-width, notes Textarea optional.
All via shadcn Form + react-hook-form + zod.

STEP 3 — Confirmation summary:
Appointment card: date, time, service in a clean summary block with checkmark icon.
Two buttons: "Modifier" (ghost) + "Confirmer" (gb-red).

STICKY BOTTOM BAR (mobile only):
Shows selected: "Mardi 18 mars · 10h30 · Visa" + "Confirmer →" Button.

━━━ FILE: src/actions/booking-actions.ts ━━━
"use server". Export bookAppointment(data: BookingFormData).
Validate, generate confirmation number, return success + confirmation.
Placeholder: send confirmation email (console.log for now).
```

---

## PROMPT 8 — Citizen Dashboard (Authenticated)

```
Build the authenticated citizen portal dashboard for tracking consular requests.

[Apply TECH CONSTRAINTS]

━━━ INSTALL ━━━
npx shadcn@latest add sidebar avatar dropdown-menu tabs badge

━━━ FILE: src/app/(citizen)/dashboard/layout.tsx ━━━
Server Component. This is a route group layout — no header/footer from root layout.
Uses shadcn SidebarProvider + SidebarInset pattern for the layout shell.
Check auth (mock: redirect to /auth/login if no session).
Render <CitizenSidebar /> + <SidebarInset>{children}</SidebarInset>.

━━━ FILE: src/components/citizen/citizen-sidebar.tsx ━━━
'use client'. Uses shadcn Sidebar component.

HEADER: Avatar (initials circle, bg-gb-red/10 text-gb-red) + name + "Citoyen inscrit" Badge.

NAV ITEMS (use SidebarMenu + SidebarMenuItem):
- Tableau de bord (LayoutDashboard icon) → /dashboard
- Mes demandes (FileText icon) → /dashboard/demandes
- Rendez-vous (Calendar icon) → /dashboard/rendez-vous
- Mes documents (FolderOpen icon) → /dashboard/documents
- Profil (User icon) → /dashboard/profil

FOOTER: SidebarFooter with logout button (LogOut icon, variant=ghost).

Active item: bg-gb-red/10 text-gb-red, left border 3px gb-red.

━━━ FILE: src/app/(citizen)/dashboard/page.tsx ━━━
Server Component with "use cache". Fetch mock data.

LAYOUT (p-6 space-y-6):

1. WELCOME ROW: "Bonjour, João" text-2xl + date string + "Nouvelle demande" Button gb-red.

2. KPI GRID (grid grid-cols-2 lg:grid-cols-4 gap-4):
   <StatCard> × 4:
   - Demandes en cours: 2 (color=amber, TrendingUp icon)
   - Demandes traitées: 5 (color=green, CheckCircle icon)
   - Prochain rendez-vous: "18 mars" (color=blue, Calendar icon)
   - Documents requis: 3 (color=red, AlertCircle icon)

3. RECENT REQUESTS SECTION:
   SectionHeading "Mes demandes récentes" + "Voir tout →" action.
   DataTableWrapper with columns:
   - Référence (monospace text-sm)
   - Type (ServiceType label)
   - Date de dépôt (formatted)
   - Statut (<StatusBadge />)
   - Actions (eye Button + optional "Compléter" Button if status=missing)

4. RIGHT SIDEBAR (lg:col-span-1, for larger screens use a 3:1 grid):
   Upcoming appointment Card + Notifications list (2 unread, dot indicator).

━━━ FILE: src/components/citizen/request-row-actions.tsx ━━━
'use client'. DropdownMenu with: Voir détails / Télécharger / Contacter un agent.
```

---

## PROMPT 9 — Admin Back-Office Dashboard

```
Build the admin back-office for embassy staff managing consular requests.

[Apply TECH CONSTRAINTS]

━━━ INSTALL ━━━
npx shadcn@latest add sidebar resizable sheet command

━━━ FILE: src/app/(admin)/admin/layout.tsx ━━━
Route group layout. Dark sidebar admin shell.
SidebarProvider + SidebarInset. Check for admin role (mock).

━━━ FILE: src/components/admin/admin-sidebar.tsx ━━━
'use client'. Uses shadcn Sidebar.

Background: bg-gb-dark (via className override or CSS var).
All text: text-white/80, active: text-white bg-white/10.

HEADER: Logo + "Back-office Consulaire" text-white text-sm.

GROUPS (SidebarGroup + SidebarGroupLabel):
GESTION:
  - Demandes consulaires (Inbox icon)
  - Rendez-vous (Calendar icon)
  - Utilisateurs (Users icon)
  - Documents (FolderOpen icon)

RAPPORTS:
  - Statistiques (BarChart2 icon)
  - Exports (Download icon)

SYSTÈME:
  - Paramètres (Settings icon)
  - Journal d'audit (Shield icon)

FOOTER: staff name + role + Avatar + logout.

━━━ FILE: src/app/(admin)/admin/demandes/page.tsx ━━━
Server Component with "use cache". Main requests management page.

LAYOUT (p-6 space-y-6):

1. PAGE HEADER: "Demandes consulaires" h1 + "Exporter CSV" Button outline right.

2. KPI STRIP (grid-cols-4 gap-4):
   - Nouvelles aujourd'hui: 12 (blue)
   - En attente: 34 (amber)
   - Traitées ce mois: 287 (green)
   - Taux traitement: 89% (gb-red)

3. FILTER ROW (flex gap-3 flex-wrap):
   - Search Input (placeholder "Rechercher par nom, réf...")
   - Select: Type de demande (all / visa / passeport / légalisation / inscription)
   - Select: Statut (all / new / pending / approved / rejected / missing)
   - Select: Agent assigné
   - DatePicker range: Période

4. DATA TABLE (DataTableWrapper):
   Columns: Réf. · Demandeur · Type · Date dépôt · Agent assigné · Statut · Actions
   Actions column: Eye (view) + Pencil (edit) + DropdownMenu (more: assign, archive, delete).
   Row click → navigate to /admin/demandes/[id].
   Show 20 mock rows with realistic French names, varied statuses and types.

━━━ FILE: src/app/(admin)/admin/demandes/[id]/page.tsx ━━━
Server Component. Receives async params: const { id } = await params.
Two-column layout (lg:grid-cols-[1fr_320px] gap-6), p-6.

LEFT COLUMN:
- Breadcrumb (shadcn) → back to demandes list.
- PageHero compact variant with reference + status badge.
- Status Alert banner (colour matches status).
- Card "Informations du demandeur": 2-col grid of label/value pairs, read-only.
- Card "Détails du voyage" or relevant service details.
- Card "Documents joints": file list with shadcn Badge status per file
  (✓ Reçu / ⚠ Manquant / 📎 À vérifier). Download icon button per file.
- Agent notes: Textarea "Ajouter une note interne..." + submit.

RIGHT COLUMN (sticky top-6):
- Card "Actions": Three Buttons stacked:
    "Approuver" (bg-emerald-600 hover:bg-emerald-700 text-white full-width)
    "Demander des pièces" (variant=outline border-amber-500 text-amber-700 full-width)
    "Rejeter" (variant=outline border-red-500 text-red-700 full-width)
  Each opens a shadcn AlertDialog for confirmation.
- Card "Assigner à": Select of agents + "Assigner" Button.
- Card "Journal d'audit": vertical timeline of 5 events.
  Each event: dot (colour by action type) + action label + agent name + timestamp text-xs.

━━━ FILE: src/components/admin/audit-timeline.tsx ━━━
Props: events: {action, agentName, timestamp, color}[]
Vertical timeline. Each item: coloured dot + connector line + content.
```

---

## PROMPT 10 — proxy.ts (Auth Guard) & Auth Pages

```
Set up authentication guard and login page for the Embassy website.

[Apply TECH CONSTRAINTS]

━━━ INSTALL ━━━
npx shadcn@latest add form input label button card

━━━ FILE: proxy.ts (at project root, next to package.json) ━━━
IMPORTANT: In Next.js 16, this file is named proxy.ts (NOT middleware.ts).
Export function named `proxy` (NOT `middleware`).
Import { NextResponse } from "next/server" and type { NextRequest }.

Logic:
- Protected routes: /dashboard/:path*, /admin/:path*
- Check for a session cookie named "gb-session".
- If no session + accessing protected route → redirect to /auth/login?callbackUrl={pathname}
- If session exists + accessing /auth/login → redirect to appropriate dashboard
  based on role stored in cookie.
- Public routes: allow through.
Export a config with matcher for both /dashboard and /admin paths.

━━━ FILE: src/app/auth/login/page.tsx ━━━
Server Component. Centred layout with bg-surface-page min-h-screen.
Renders <LoginForm /> card centred vertically.
Metadata: title "Connexion — Ambassade de Guinée-Bissau".

━━━ FILE: src/components/auth/login-form.tsx ━━━
'use client'. Card (max-w-sm w-full mx-auto, bg-white border rounded-card p-8).

Top: Logo placeholder (48px) centred + "Accès sécurisé" heading text-xl text-center.
Sub-text: "Espace réservé au personnel et aux citoyens inscrits." text-muted text-sm.

Form (react-hook-form + zod):
  email: Input type=email, label "Adresse e-mail"
  password: Input type=password, label "Mot de passe"
  rememberMe: Checkbox "Se souvenir de moi"
  "Mot de passe oublié ?" link → /auth/forgot-password (text-gb-red text-sm)
  Submit Button: full-width, bg-gb-red, "Se connecter", with Spinner when loading.

Server Action for login: src/actions/auth-actions.ts
  "use server". Validate credentials (mock: admin@ambassade.gw / admin → role admin).
  Set session cookie. Redirect based on role.

Divider below form + "Vous êtes citoyen ?" link → /auth/register.

Security notice: Lock icon + "Connexion sécurisée HTTPS" text-xs text-muted.
```

---

## PROMPT 11 — Contact & Country Pages

```
Build the Contact page and Guinée-Bissau country page.

[Apply TECH CONSTRAINTS]

━━━ INSTALL ━━━
npx shadcn@latest add accordion tabs textarea

━━━ FILE: src/app/contact/page.tsx ━━━
Server Component. Metadata. PageHero.
Two-column layout (lg:grid-cols-[1fr_380px] gap-8 mt-8 px-container max-w-7xl mx-auto).

LEFT — <ContactForm /> (client component):
Card, bg-white border rounded-card p-6.
SectionHeading "Envoyer un message".
react-hook-form + zod + shadcn Form:
  name (Input full-width)
  email (Input)
  phone (Input, optional)
  subject (Select: Information / Service consulaire / Presse / Coopération / Autre)
  message (Textarea, rows=5)
  privacyConsent (Checkbox required: "J'accepte la politique de confidentialité")
Submit Button: full-width gb-red "Envoyer le message" + Spinner on submit.
Success state: replace form with a green Alert "Votre message a été envoyé."
Response time notice: text-xs text-muted mt-2.

RIGHT — Info cards (Server Component, stacked, space-y-4):
Card 1: MapPin + address + "Voir sur Google Maps →"
Card 2: Clock + opening hours table (Mon-Fri rows, Sat/Sun closed in red text)
Card 3: Phone + Mail (with mailto: link)
Card 4: Social icons row (Facebook, Twitter, Linkedin)

BELOW FULL WIDTH: Map placeholder div (h-80, bg-surface-muted rounded-card,
flex items-center justify-center, MapPin icon 32px + caption text-muted text-sm).

━━━ FILE: src/actions/contact-actions.ts ━━━
"use server". submitContactForm(data). Validate zod. Return success/error.

━━━ FILE: src/app/guinee-bissau/page.tsx ━━━
Server Component. "use cache".

HERO: Full-width colour stripe bar (gb-red, gb-yellow, gb-green — three equal divs h-2).
Then PageHero-style section: "La Guinée-Bissau" + subtitle.

TABS SECTION (max-w-7xl mx-auto px-container):
shadcn Tabs: Présentation · Culture & Tourisme · Économie · Actualités.
Tab triggers: text-sm, active tab has border-b-2 border-gb-red text-gb-red.

TAB: Présentation — lg:grid-cols-[1fr_300px] gap-8:
  LEFT: article prose (H2s: Géographie, Histoire, Politique) with placeholder French text.
         Pull-quote block (border-l-4 border-gb-red pl-4 italic).
  RIGHT (sticky): CountryFactCard (flag stripe, stats: Surface, Population, Capitale,
    Langue, Monnaie, Fuseau horaire) + ExternalLink card "Conseils aux voyageurs →".

TAB: Économie — StatCard grid (4 cols) + article text.

Each tab: wrap async content in <Suspense fallback={<TabSkeleton />}>.
```

---

## APPENDIX — Quick Reference

### File Tree Summary
```
src/
├── app/
│   ├── layout.tsx                    # Root layout (Prompt 1)
│   ├── page.tsx                      # Homepage (Prompt 5)
│   ├── globals.css                   # Tailwind v4 + @theme tokens (Prompt 1)
│   ├── auth/login/page.tsx           # Login (Prompt 10)
│   ├── contact/page.tsx              # Contact (Prompt 11)
│   ├── guinee-bissau/page.tsx        # Country page (Prompt 11)
│   ├── services/
│   │   ├── visa/page.tsx             # Visa form (Prompt 6)
│   │   └── rendez-vous/page.tsx      # Booking (Prompt 7)
│   ├── (citizen)/dashboard/          # Citizen portal (Prompt 8)
│   └── (admin)/admin/                # Admin back-office (Prompt 9)
├── components/
│   ├── layout/                       # header, footer, mobile-nav (Prompts 2–3)
│   ├── ui/                           # shared components (Prompt 4)
│   ├── home/                         # homepage sections (Prompt 5)
│   ├── visa/                         # multi-step form (Prompt 6)
│   ├── booking/                      # appointment wizard (Prompt 7)
│   ├── citizen/                      # citizen dashboard (Prompt 8)
│   ├── admin/                        # back-office (Prompt 9)
│   └── auth/                         # login form (Prompt 10)
├── actions/                          # Server Actions ("use server")
├── hooks/                            # Custom hooks
├── lib/utils.ts                      # cn(), formatDate(), getStatusConfig()
├── lib/navigation.ts                 # MAIN_NAV, FOOTER_LINKS
└── types/                            # TypeScript interfaces
proxy.ts                              # Auth guard (Next.js 16, NOT middleware.ts)
```

### shadcn Components Needed (run all at once)
```bash
npx shadcn@latest add \
  navigation-menu button sheet command \
  form field label input select textarea checkbox \
  calendar radio-group separator progress \
  sidebar avatar dropdown-menu tabs badge \
  accordion card dialog alert alert-dialog \
  breadcrumb pagination table skeleton \
  sonner spinner tooltip popover
```

### globals.css Tailwind v4 Starter
```css
@import "tailwindcss";

@theme {
  --color-gb-red: #CE1126;
  --color-gb-yellow: #FCE020;
  --color-gb-green: #009E60;
  --color-gb-dark: #1A1A1A;
  --color-surface-page: #F7F7F5;
  --color-surface-card: #FFFFFF;
  --color-surface-muted: #E8E6E0;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
/* No tailwind.config.js needed in v4 */
```

### Key Next.js 16 Patterns
```typescript
// ✅ Async params (Next.js 16)
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}

// ✅ Cache directive (Next.js 16, replaces fetch cache options)
async function getData() {
  "use cache"
  return await db.query(...)
}

// ✅ proxy.ts (NOT middleware.ts)
export default function proxy(request: NextRequest) { ... }

// ✅ Server Action
"use server"
export async function submitForm(data: FormData) { ... }
```

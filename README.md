# FIBEM Ambassade Frontend

A modern, responsive web application built with **Next.js 16** and **React 19** for the FIBEM Ambassade Guinea-Bissau initiative. This frontend provides a comprehensive portal for visa applications, appointment booking, and information services.

## Features

### 🛂 Visa Services
- **Multi-step Visa Application Wizard** - Intuitive 4-step process
  - Personal information collection
  - Travel details
  - Document checklist tracking
  - Application confirmation
- **Real-time Application Tracking** - Check visa status
- **Document Management** - Track required documents
- **Reference Numbers** - Unique tracking for applications

### 📅 Appointment Booking
- **Online Scheduling** - Book appointments instantly
- **Real-time Availability** - Check open time slots
- **Multiple Services** - Visa, passport, legalization, registration
- **Confirmation Numbers** - Instant booking confirmation
- **Service Descriptions** - Detailed information for each service

### 📞 Contact & Support
- **Contact Form** - Send messages to administration
- **Information Pages** - Country info, legal notices, privacy policy
- **Responsive Design** - Works on all devices
- **Multilingual Support** - English, French, Portuguese

### 👤 User Portal
- **Authentication System** - Secure login/registration
- **User Dashboard** - View applications and appointments
- **Profile Management** - Update user information
- **Role-based Access** - Citizens, agents, and admin views

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js | 16.2.1 |
| **React** | React | 19.2.4 |
| **Language** | TypeScript | 5.0 |
| **Styling** | Tailwind CSS | 4.0 |
| **Forms** | React Hook Form | 7.72.0 |
| **Validation** | Zod | 4.3.6 |
| **UI Components** | Shadcn/ui | Latest |
| **HTTP Client** | Axios | 1.13.6 |
| **State Management** | Zustand | 5.0.12 |
| **Internationalization** | next-international | 1.3.1 |
| **Charts** | Recharts | 3.8.0 |

## Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles & Tailwind config
│   ├── layout.tsx               # Root layout
│   ├── not-found.tsx            # 404 page
│   ├── manifest.json            # PWA manifest
│   └── [locale]/                # Locale-specific routes
│       ├── layout.tsx           # Locale layout wrapper
│       ├── page.tsx             # Home page
│       ├── not-found.tsx        # Locale-specific 404
│       ├── (admin)/             # Admin-only routes
│       ├── (citizen)/           # Citizen-only routes
│       ├── auth/                # Authentication pages
│       ├── services/            # Service information
│       ├── ambassade/           # Embassy information
│       ├── guinee-bissau/       # Country information
│       └── [other routes]/      # Static pages
│
├── components/                   # Reusable React components
│   ├── ui/                      # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── [20+ more components]
│   ├── admin/                   # Admin dashboard components
│   │   ├── admin-sidebar.tsx
│   │   ├── requests-table.tsx
│   │   └── audit-timeline.tsx
│   ├── auth/                    # Authentication components
│   │   ├── login-form.tsx
│   │   └── register-content.tsx
│   ├── booking/                 # Appointment booking
│   │   └── booking-wizard.tsx
│   ├── citizen/                 # Citizen portal components
│   │   ├── citizen-sidebar.tsx
│   │   └── requests-table.tsx
│   ├── contact/                 # Contact form
│   │   └── contact-form.tsx
│   ├── home/                    # Homepage components
│   │   ├── hero-section.tsx
│   │   ├── services-strip.tsx
│   │   ├── news-section.tsx
│   │   └── country-spotlight.tsx
│   ├── layout/                  # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── search-dialog.tsx
│   └── visa/                    # Visa application components
│       ├── visa-form-wizard.tsx
│       ├── step-personal-info.tsx
│       ├── step-travel-details.tsx
│       ├── step-documents.tsx
│       └── step-confirmation.tsx
│
├── actions/                      # Server actions (Server-side functions)
│   ├── auth-actions.ts          # Login, register, logout
│   ├── user-actions.ts          # User data retrieval
│   ├── visa-actions.ts          # Visa API interactions
│   ├── booking-actions.ts       # Appointment API interactions
│   └── contact-actions.ts       # Contact form submission
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection
│   ├── use-navigation.ts        # Navigation helpers
│   ├── use-footer-links.ts      # Footer data
│   └── use-scroll-position.ts   # Scroll tracking
│
├── lib/                          # Utility functions
│   ├── api-client.ts            # API client with axios
│   ├── utils.ts                 # General utilities (cn(), etc.)
│   └── navigation.ts            # i18n navigation helpers
│
├── locales/                      # Internationalization
│   ├── client.ts                # i18n provider & hook
│   ├── server.ts                # Server-side i18n
│   ├── en.ts                    # English translations
│   ├── fr.ts                    # French translations
│   └── pt.ts                    # Portuguese translations
│
├── types/                        # TypeScript type definitions
│   ├── index.ts                 # Common types
│   ├── visa.ts                  # Visa-related types
│   └── appointment.ts           # Appointment types
│
├── public/                       # Static assets
│   └── fonts/                   # Custom fonts
│
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── components.json              # Shadcn/ui configuration
├── eslint.config.mjs            # ESLint configuration
├── package.json                 # Dependencies
├── .env.local                   # Environment variables
├── README.md                    # This file
├── HARDCODED_TEXT_ANALYSIS.md   # Known hardcoded text issues
├── CLAUDE.md                    # Claude-specific instructions
├── AGENTS.md                    # Documentation index
└── copilot-instructions.md      # Copilot instructions
```

## Quick Start

### Prerequisites
- **Node.js** 18.0 or higher
- **npm**, **yarn**, **pnpm**, or **bun**
- Backend API running on `http://localhost:8000`

### Installation

1. **Clone and navigate to frontend**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   pnpm install
   bun install
   ```

3. **Configure environment**:
   ```bash
   # Create .env.local
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
   ```

4. **Run development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   pnpm dev
   bun dev
   ```

5. **Open browser**:
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production Build
npm run build            # Build for production
npm start               # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Check TypeScript (if configured)

# Testing
npm test                # Run tests (if configured)
```

## Authentication

### Login Flow
1. User enters credentials (email/password)
2. `loginAction()` sends credentials to backend
3. Backend validates and returns auth token + user data
4. Token stored in HTTP-only cookie (`gb-session`)
5. User data stored in regular cookie (`gb-user`)
6. User redirected to dashboard based on role

### Test Credentials
| Email | Password | Role |
|-------|----------|------|
| admin@ambassade.gw | admin | Admin |
| agent@ambassade.gw | agent | Agent |
| citoyen@test.fr | citoyen | Citizen |

### Using Authentication in Components
```typescript
"use client";

import { loginAction } from "@/actions/auth-actions";
import { useTransition } from "react";

export function MyComponent() {
  const [isPending, startTransition] = useTransition();
  
  const handleLogin = (email: string, password: string) => {
    startTransition(async () => {
      const result = await loginAction({ email, password });
      if (result?.error) {
        // Handle error
      }
    });
  };
  
  return (
    // JSX
  );
}
```

## API Integration

### Server Actions
All API calls are made through server actions in the `actions/` directory:

- **Auth**: `loginAction()`, `registerAction()`, `logoutAction()`
- **User**: `getCurrentUser()`, `getAuthToken()`
- **Visa**: `submitVisaApplication()`, `getVisaRequests()`, `getVisaRequest()`
- **Appointments**: `bookAppointment()`, `getAvailableSlots()`, `getAppointments()`
- **Contact**: `sendContactMessage()`

### API Endpoint Structure
```
POST   /api/auth/login/                    # User login
POST   /api/auth/register/                 # User registration
POST   /api/auth/logout/                   # User logout

POST   /api/visa-requests/                 # Submit visa application
GET    /api/visa-requests/                 # List user's visa requests
GET    /api/visa-requests/{id}/            # Get visa request details

POST   /api/appointments/                  # Book appointment
GET    /api/appointments/                  # List user's appointments
GET    /api/appointments/available_slots/  # Get available time slots

POST   /api/contact-messages/              # Send contact message
```

See [Backend README](../backend/README.md) for complete API documentation.

## Form Handling

### Using React Hook Form + Zod

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be 6+ characters"),
});

type FormData = z.infer<typeof schema>;

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Call server action
    const result = await myAction(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
      {/* ... */}
    </form>
  );
}
```

## Internationalization (i18n)

The application supports **English**, **French**, and **Portuguese**.

### Using Translations in Components
```typescript
"use client";

import { useI18n } from "@/locales/client";

export function MyComponent() {
  const t = useI18n();
  
  return (
    <h1>{t("common.welcome")}</h1>
    <p>{t("common.description")}</p>
  );
}
```

### Translation Files
- `locales/en.ts` - English
- `locales/fr.ts` - French
- `locales/pt.ts` - Portuguese

Nested structure for organization:
```typescript
// locales/en.ts
export default {
  common: {
    welcome: "Welcome",
    description: "Description",
  },
  visa: {
    title: "Visa Application",
    steps: "Step",
  },
} as const;
```

## Component Guidelines

### Client Components
Use `"use client"` directive when:
- Using React hooks (useState, useEffect, etc.)
- Using form state management
- Handling user interactions

```typescript
"use client";

import { useState } from "react";

export function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Server Components
Use server components (default) for:
- Fetching data directly from database
- Accessing secrets securely
- Building layouts
- Combining client and server components

```typescript
// No "use client" directive
import { getServerData } from "@/lib/server";

export async function ServerComponent() {
  const data = await getServerData();
  return <div>{data}</div>;
}
```

## Styling

### Tailwind CSS Classes
Common custom classes defined in `app/globals.css`:
- `py-section` - Vertical padding for sections
- `px-container` - Horizontal container padding
- `rounded-card` - Standard card border radius
- `bg-surface-page` - Page background color
- `text-gb-dark` - Primary text color

### Using Utilities
```typescript
import { cn } from "@/lib/utils";

export function MyComponent() {
  return (
    <div className={cn(
      "base-class",
      isActive && "active-class",
      error && "error-class"
    )}>
      Content
    </div>
  );
}
```

## Type Definitions

Common types in `types/`:

```typescript
// types/index.ts
export type UserRole = "admin" | "agent" | "citizen";
export type ServiceType = "visa" | "passeport" | "legalisation" | "inscription" | "rendezvous";
export type StatusType = "new" | "pending" | "approved" | "rejected" | "archived" | "missing";

// types/visa.ts
export interface VisaFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  // ... more fields
}

// types/appointment.ts
export interface BookingFormData {
  serviceType: ServiceType;
  date: string;
  time: string;
  // ... more fields
}
```

## Performance Optimization

### Image Optimization
```typescript
import Image from "next/image";

export function OptimizedImage() {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={100}
      height={100}
      priority // For above-the-fold images
    />
  );
}
```

### Code Splitting
Next.js automatically code-splits at route boundaries. For dynamic imports:
```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/heavy"), {
  loading: () => <div>Loading...</div>,
});
```

## Common Tasks

### Adding a New Page
1. Create directory: `app/[locale]/new-page/`
2. Create `page.tsx` with your content
3. Route automatically available at `/en/new-page`, `/fr/new-page`, etc.

### Adding a New Component
1. Create in `components/feature/my-component.tsx`
2. Export for use: `export function MyComponent() { ... }`
3. Import: `import { MyComponent } from "@/components/feature/my-component"`

### Adding a New Translation
1. Add key to `locales/en.ts`, `locales/fr.ts`, `locales/pt.ts`
2. Use with `t("new.key")`

### Calling Backend API
1. Create server action in `actions/my-actions.ts`
2. Use `fetch()` with proper headers
3. Include auth token from cookies
4. Return typed response

## Troubleshooting

### Development Server Won't Start
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
# Check types
npm run type-check

# Rebuild
npm run build
```

### API Connection Issues
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Verify backend is running on `http://localhost:8000`
- Check CORS settings in backend

### Styling Not Applied
- Ensure Tailwind CSS classes are used
- Run `npm run build` to check for purging issues
- Check `tailwind.config.js` includes correct file paths

## Deployment

### Vercel (Recommended)
1. Push code to Git repository
2. Connect repository to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL=https://api.yourdomain.com`
4. Deploy automatically on push

### Self-hosted
```bash
# Build
npm run build

# Start production server
npm start

# Use process manager (e.g., PM2)
npm install -g pm2
pm2 start "npm start" --name "fibem-frontend"
```

### Environment Variables for Production
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NODE_ENV=production
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

### Code Style
- Use TypeScript for all code
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

### Testing Before Push
```bash
npm run lint      # Check code style
npm run build     # Verify build succeeds
npm run dev       # Test locally
```

## Security

- ✅ HTTP-only cookies for auth tokens
- ✅ HTTPS enforced in production
- ✅ Environment variables for sensitive data
- ✅ Input validation with Zod
- ✅ CSRF protection via Next.js
- ✅ XSS protection via React

## Performance Metrics

Target Lighthouse scores:
- 90+ Performance
- 95+ Accessibility
- 90+ Best Practices
- 90+ SEO

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Backend API Docs](../backend/API_DOCUMENTATION.md)

## License

This project is proprietary software for FIBEM Ambassade Guinea-Bissau.

## Questions?

Refer to:
1. [INTEGRATION_DETAIL.md](../INTEGRATION_DETAIL.md) - Frontend-backend integration
2. [Backend README](../backend/README.md) - API documentation
3. [copilot-instructions.md](./copilot-instructions.md) - Development guidelines

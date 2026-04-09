// Custom authentication using email/password with backend API
// User sessions are stored in cookies: gb-session (token), gb-user (info), gb-role
// Authentication flow:
// 1. User submits email/password via login form
// 2. Backend returns token and user info
// 3. Token stored in gb-session (httpOnly)
// 4. User info stored in gb-user (accessible client-side)
// 5. Role stored in gb-role (accessible client-side)

// For NextAuth compatibility, we export empty handlers
import NextAuth from "next-auth"
export const { auth, handlers } = NextAuth({ 
  providers: [],
  session: { strategy: "jwt" },
})
# Architecture & Data Flow

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          USER BROWSER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   React Application                      │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │          AuthProvider (Context)                    │  │   │
│  │  │  ├─ User State                                     │  │   │
│  │  │  ├─ Authentication Status                          │  │   │
│  │  │  └─ Sign Out Function                             │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                          ▲                                │   │
│  │                          │                                │   │
│  │  ┌────────────────┬──────┴───────┬────────────────┐       │   │
│  │  │                │              │                │       │   │
│  │  ▼                ▼              ▼                ▼       │   │
│  │ ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐ │   │
│  │ │Navigation│  │HeroSection│  │ LoginModal│  │UserProfile │ │   │
│  │ │          │  │          │  │          │  │           │ │   │
│  │ │ Get      │  │ Get      │  │ Email    │  │ Profile   │ │   │
│  │ │ Started  │  │ Started  │  │ Password │  │ Dropdown  │ │   │
│  │ │ Button   │  │ Button   │  │ Google   │  │ Sign Out  │ │   │
│  │ └─────────┘  └──────────┘  └──────────┘  └────────────┘ │   │
│  │       ▲            ▲             ▲             ▲          │   │
│  │       │            │             │             │          │   │
│  │       └────────────┴─────────────┴─────────────┘          │   │
│  │              useAuthContext() Hook                        │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ▲                                        │
│                          │                                        │
│           (useAuth.ts) ──┴── (supabase.ts)                       │
│                                  │                               │
└──────────────────────────────────┼───────────────────────────────┘
                                   │
                                   │ HTTP/HTTPS
                                   │
           ┌───────────────────────┴───────────────────────┐
           │                                               │
           ▼                                               ▼
┌──────────────────────────┐              ┌──────────────────────────┐
│   SUPABASE BACKEND       │              │  GOOGLE OAUTH            │
│   ✓ Auth Service         │◄────────────►│  ✓ OAuth Provider        │
│   ✓ User Database        │   OAuth      │  ✓ User Info             │
│   ✓ Session Management   │   Flow       │  ✓ Redirect              │
│   ✓ JWT Tokens           │              │                          │
└──────────────────────────┘              └──────────────────────────┘
```

## 🔄 Authentication Flow

### Email/Password Sign-Up
```
User → Click Get Started → LoginModal Opens
  → Enter Email & Password
  → Click "Create Account"
  → signUpWithEmail() → Supabase
  → Confirm Email (email sent)
  → Auto sign-in (optional)
  → AuthProvider updates state
  → Components re-render
  → UserProfile shows
```

### Email/Password Sign-In
```
User → Click Get Started → LoginModal Opens
  → Enter Email & Password
  → Click "Sign In"
  → signInWithEmail() → Supabase
  → Session created
  → AuthProvider updates state
  → Modal closes
  → UserProfile shows
```

### Google OAuth Sign-In
```
User → Click Get Started → LoginModal Opens
  → Click "Google" Button
  → signInWithGoogle() → Redirect to Google
  → User authenticates with Google
  → Google redirects → Supabase Callback
  → Supabase creates session
  → Redirect back to app
  → AuthProvider updates state
  → UserProfile shows
```

## 🗄️ Data Flow

```
┌─────────────────────────────────────┐
│    User Interacts with UI           │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Component Event Handler            │
│  (handleGoogleSignIn, etc)          │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Supabase Auth Function             │
│  (signInWithGoogle, etc)            │
│  client/lib/supabase.ts             │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Supabase SDK                       │
│  @supabase/supabase-js              │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Supabase Server / OAuth Provider   │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Session/User Data                  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  AuthContext                        │
│  (Global State Update)              │
│  client/context/AuthContext.tsx     │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Components Re-render               │
│  (useAuthContext Hook)              │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  UI Updates                         │
│  (Show UserProfile, Hide GetStarted)│
└─────────────────────────────────────┘
```

## 📁 Component Hierarchy

```
App.tsx
│
├── AuthProvider (Context Wrapper)
│   │
│   └── BrowserRouter
│       │
│       ├── Route: "/" → Index
│       │   │
│       │   ├── Navigation
│       │   │   ├── Logo
│       │   │   ├── Menu Items
│       │   │   ├── Get Started Button (if !authenticated)
│       │   │   └── UserProfile (if authenticated)
│       │   │
│       │   ├── HeroSection
│       │   │   ├── Badge
│       │   │   ├── Headline
│       │   │   ├── Subheading
│       │   │   ├── Get Started Button
│       │   │   └── Stats
│       │   │
│       │   ├── Features Section
│       │   │
│       │   ├── Contact CTA Section
│       │   │
│       │   ├── Footer
│       │   │
│       │   └── LoginModal
│       │       ├── Form
│       │       ├── Email Input
│       │       ├── Password Input
│       │       ├── Sign In/Up Button
│       │       ├── Divider
│       │       ├── Google Sign In Button
│       │       └── Terms Section
│       │
│       └── Route: "*" → NotFound
│
├── TooltipProvider
├── QueryClientProvider
├── Toaster (UI Toast)
└── Sonner (Notifications)
```

## 🔐 Security Architecture

```
┌──────────────────────────────────────────────┐
│           CLIENT SIDE (Frontend)              │
├──────────────────────────────────────────────┤
│  • Anon Key (Public, Safe to Expose)        │
│  • Supabase Client Library                   │
│  • Session Tokens (Managed by Supabase)     │
│  • LocalStorage (Browser Session)            │
└────────────────────┬─────────────────────────┘
                     │
                     │ HTTPS Only
                     │
┌────────────────────▼─────────────────────────┐
│         SERVER SIDE (Supabase)               │
├──────────────────────────────────────────────┤
│  • Service Role Key (Secret, Server Only)   │
│  • Database (PostgreSQL)                     │
│  • Auth Service (JWT Tokens)                │
│  • OAuth Provider Integration               │
│  • Session Management                       │
│  • Data Encryption                          │
└──────────────────────────────────────────────┘
```

## 🔗 Environment Variables Flow

```
.env File (Local) / DevServerControl (Production)
    │
    ├─ VITE_SUPABASE_URL
    │  └─→ supabase.ts (createClient())
    │      └─→ useAuth() / AuthContext
    │
    └─ VITE_SUPABASE_ANON_KEY
       └─→ supabase.ts (createClient())
           └─→ Supabase API Calls
               └─→ Authentication Operations
```

## 🎯 State Management

```
AuthContext (Global State)
├── user: User | null
│   ├── id: string
│   ├── email: string
│   └── user_metadata
│       ├── full_name: string
│       └── avatar_url: string
│
├── isAuthenticated: boolean
│
├── isLoading: boolean
│
└── signOut(): Promise<void>

Accessed via:
├── useAuthContext() (Full context)
└── useAuth() (Custom hook)
```

## 📊 Session Lifecycle

```
1. App Loads
   └─ AuthContext initializes
      └─ Check existing session
         ├─ User logged in → Set user state
         └─ User not logged in → Set null

2. User Logs In
   └─ signInWithGoogle() / signInWithEmail()
      └─ Supabase processes auth
         └─ Session created
            └─ onAuthStateChange listener triggers
               └─ AuthContext updates user state
                  └─ Components re-render
                     └─ UserProfile appears

3. User Navigates
   └─ Session persisted automatically
      └─ Page refresh → Session restored
         └─ AuthContext still knows user is logged in

4. User Logs Out
   └─ signOut()
      └─ Supabase clears session
         └─ onAuthStateChange listener triggers
            └─ AuthContext sets user to null
               └─ Components re-render
                  └─ Get Started button appears
```

## 🚀 Scalability

```
Current:
- Single provider (email + Google)
- Basic user info stored
- Session-based auth

Future Additions:
- GitHub OAuth
- LinkedIn OAuth
- Apple OAuth
- 2FA Authentication
- Custom user profiles DB
- Team/Workspace support
- Role-based access control
```

---

**Key Points:**
- ✅ Centralized auth state with Context API
- ✅ Secure credential management via environment variables
- ✅ JWT-based session management by Supabase
- ✅ Real-time auth state changes
- ✅ Error handling and loading states
- ✅ Mobile-responsive design
- ✅ Production-ready implementation

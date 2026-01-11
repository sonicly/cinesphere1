# Supabase & Google OAuth Integration - Step-by-Step Guide

Your CINE SPHERE application is now configured with Supabase authentication. Follow these steps to complete the integration.

## ✅ What's Already Done

- ✅ Supabase client library installed (`@supabase/supabase-js`)
- ✅ Login modal with email/password and Google Sign-In button
- ✅ Authentication context for global state management
- ✅ User profile component with sign-out functionality
- ✅ Environment variable setup
- ✅ Authentication hooks and utilities

## 🔧 Next Steps

### Step 1: Connect to Supabase MCP

1. Click **[Open MCP popover](#open-mcp-popover)** in the top section of the screen
2. Select **Supabase** from the available integrations
3. Follow the prompts to connect your Supabase account
4. Copy the following from Supabase:
   - **Project URL** (from Settings → API)
   - **Anon Key** (from Settings → API)

### Step 2: Update Environment Variables

Once you have your Supabase credentials:

1. In the **DevServerControl tool** (or in `.env` file), add:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. Don't commit sensitive keys! Use DevServerControl tool to set production variables.

### Step 3: Configure Google OAuth in Supabase

#### Part A: Create Google OAuth Application

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Select **Web Application**
6. In **Authorized redirect URIs**, add:
   - `https://[your-project-id].supabase.co/auth/v1/callback`
   - For local dev: `http://localhost:5173/auth/v1/callback`
7. Copy the **Client ID** and **Client Secret**

#### Part B: Add Google OAuth to Supabase

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find and click **Google**
3. Enable the provider
4. Paste your Google credentials:
   - Client ID
   - Client Secret
5. Click **Save**

### Step 4: Configure Redirect URLs in Supabase

1. In Supabase, go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your application domain:
   - Local development: `http://localhost:5173`
   - Production: `https://yourdomain.com`
3. Add to **Redirect URLs**:
   - `http://localhost:5173` (development)
   - `http://localhost:5173/auth/v1/callback` (development)
   - `https://yourdomain.com` (production)
   - `https://yourdomain.com/auth/v1/callback` (production)

## 🧪 Testing

Once configured:

1. Click **"Get Started"** button
2. Test email/password sign-up and sign-in
3. Test Google sign-in button
4. After login, you should see a user profile icon instead of "Get Started"
5. Click the profile icon to see user info and sign out

## 📁 Project Structure

```
client/
├── lib/
│   └── supabase.ts           # Supabase client and auth functions
├── hooks/
│   └── useAuth.ts            # Authentication state hook
├── context/
│   └── AuthContext.tsx       # Global auth context
├── components/
│   ├── LoginModal.tsx        # Login/signup modal with Google sign-in
│   ├── UserProfile.tsx       # User profile dropdown (shows after login)
│   └── Navigation.tsx        # Updated to show profile when logged in
└── pages/
    └── Index.tsx             # Main page with auth logic
```

## 🔐 Security Features

- ✅ Environment variables for API keys
- ✅ Anon key used (safe for frontend)
- ✅ Auth state management with context
- ✅ Automatic session handling
- ✅ Sign-out functionality
- ✅ Protected profile access (only shows when authenticated)

## 📚 Key Files

### `client/lib/supabase.ts`
- Initializes Supabase client
- Provides: `signUpWithEmail`, `signInWithEmail`, `signInWithGoogle`, `signOut`

### `client/context/AuthContext.tsx`
- Global auth state
- User info management
- Auto-login on page refresh

### `client/components/LoginModal.tsx`
- Email/password authentication
- Google OAuth button
- Error handling and loading states

### `client/components/UserProfile.tsx`
- Shows user info after login
- Profile dropdown menu
- Sign-out button

## ⚠️ Troubleshooting

### "Missing Supabase URL or Anon Key"
- Check `.env` or DevServerControl variables
- Make sure variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Google Sign-In Not Working
- Verify redirect URIs in Google Cloud Console match Supabase
- Check that Google is enabled in Supabase Authentication → Providers
- Clear browser cache
- Check browser console for errors

### CORS Errors
- Add your domain to Supabase URL Configuration
- Include `/auth/v1/callback` in redirect URLs

### User Profile Icon Not Showing After Login
- Check browser console for errors
- Verify Supabase connection is working
- Try hard refresh (Ctrl+Shift+R)

## 🚀 Next Features to Add

Consider adding:
- User profile page (`/profile`)
- Password reset flow
- Email verification
- User preferences/settings
- Social provider linking
- 2FA authentication

## 📖 Documentation

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup](https://supabase.com/docs/guides/auth/social-login/auth-google)

## 💡 Tips

- Use Supabase dashboard to view user registrations
- Check **Authentication** → **Users** to see all registered users
- Monitor **Logs** for debugging
- Test locally first before deploying to production

---

**You're all set!** Once you complete the Supabase configuration steps, your authentication system will be live and ready to use.

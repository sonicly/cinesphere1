# Quick Start Guide - Supabase Authentication

## 🚀 Get Started in 5 Minutes

### Step 1: Connect Supabase (1 min)
Click [Connect to Supabase](#open-mcp-popover) and authorize your Supabase account.

### Step 2: Get Your Credentials (1 min)
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to **Settings** → **API**
3. Copy:
   - `Project URL`
   - `Anon Key`

### Step 3: Update Environment Variables (1 min)
Add to your `.env` file or use DevServerControl tool:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 4: Configure Google OAuth (2 min)
In Supabase:
1. Go to **Authentication** → **Providers**
2. Click **Google** and enable it
3. You'll see a Google OAuth configuration form
4. Copy the credentials from [Google Cloud Console](https://console.cloud.google.com)

### Step 5: Test It! (1 min)
1. Refresh your app
2. Click **"Get Started"** button
3. Try **Google Sign-In** button
4. Success! 🎉

## 📋 What You Can Now Do

✅ **Email/Password Authentication**
- Sign up with email
- Sign in with existing account
- Forgot password link
- Password reset

✅ **Google OAuth**
- Click "Google" button
- Automatic redirect
- One-click login
- Get user profile (name, email, avatar)

✅ **User Profile**
- After login, see profile icon
- Click to view user info
- Sign out when done

## 🎯 Key Features Implemented

| Feature | Status | Location |
|---------|--------|----------|
| Email/Password Auth | ✅ | `LoginModal.tsx` |
| Google Sign-In | ✅ | `LoginModal.tsx` |
| Auth Context | ✅ | `AuthContext.tsx` |
| User Profile | ✅ | `UserProfile.tsx` |
| Navigation Updates | ✅ | `Navigation.tsx` |
| Session Management | ✅ | `supabase.ts` |

## 🔧 Customization

### Change Button Styles
File: `client/components/LoginModal.tsx`
```tsx
<button className="...">
  {/* Modify className to change button appearance */}
</button>
```

### Change Colors
File: `client/global.css`
```css
:root {
  --primary: hsl(180, 100%, 50%); /* Cyan color */
}
```

### Add More OAuth Providers
In `client/lib/supabase.ts`:
```typescript
export const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  // ...
};
```

## 📞 Support

### Supabase Official Docs
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup](https://supabase.com/docs/guides/auth/social-login/auth-google)

### Debugging
1. Check browser console (F12) for errors
2. Check Supabase dashboard **Logs**
3. Verify environment variables are set
4. Clear cache and hard refresh (Ctrl+Shift+R)

## ✅ Checklist

- [ ] Connected Supabase MCP
- [ ] Added API credentials to `.env`
- [ ] Tested email sign-up
- [ ] Tested email sign-in
- [ ] Configured Google OAuth
- [ ] Tested Google sign-in
- [ ] Profile icon shows after login
- [ ] Sign-out works properly

## 🎓 Learn More

- Full setup: See `SUPABASE_SETUP.md`
- Step-by-step: See `INTEGRATION_STEPS.md`
- Complete details: See `IMPLEMENTATION_SUMMARY.md`

---

**That's it!** Your authentication system is now ready. 🚀

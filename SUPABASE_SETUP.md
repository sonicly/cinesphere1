# Supabase Integration Guide

This guide will help you set up Supabase for authentication with email/password and Google OAuth.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in the project details:
   - Project Name: (e.g., "CINE SPHERE")
   - Database Password: (create a strong password)
   - Region: Choose the region closest to your users
5. Click "Create new project" and wait for it to complete

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **Anon Key** (under "Project API keys")

## Step 3: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Set Up Google OAuth

### 4.1 Create a Google OAuth Application

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (if you don't have one)
3. Enable the "Google+ API"
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web Application**
6. Add authorized redirect URIs:
   - `https://[your-project-id].supabase.co/auth/v1/callback`
   - `http://localhost:5173/auth/v1/callback` (for local development)
7. Copy the **Client ID** and **Client Secret**

### 4.2 Configure Google OAuth in Supabase

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Find "Google" and click it
3. Enable the provider
4. Paste your Google OAuth credentials:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console
5. Click "Save"

## Step 5: Configure Callback URL

1. In Supabase, go to **Authentication** → **URL Configuration**
2. Set your Site URL to your application's domain:
   - Local: `http://localhost:5173`
   - Production: `https://your-domain.com`
3. Add Redirect URLs:
   - `http://localhost:5173/auth/v1/callback` (development)
   - `https://your-domain.com/auth/v1/callback` (production)

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Click the "Get Started" button
3. Try:
   - Email/Password sign-up
   - Email/Password sign-in
   - Google sign-in button

## Troubleshooting

### Google OAuth Not Working

- Ensure redirect URLs in Google Cloud Console match Supabase settings
- Check that Google OAuth is enabled in Supabase Authentication → Providers
- Clear browser cache and try again
- Check browser console for error messages

### Invalid API Key

- Verify you're using the **Anon Key** (not the Service Role Key)
- Make sure the key is copied correctly without extra spaces
- Check that `VITE_SUPABASE_URL` is correct

### CORS Errors

- Ensure your domain is in the Supabase URL Configuration
- Check that redirect URLs include the `/auth/v1/callback` path

## Database Setup (Optional)

If you want to store additional user data:

1. In Supabase, go to **SQL Editor**
2. Create a new table:
   ```sql
   CREATE TABLE user_profiles (
     id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
     email TEXT UNIQUE,
     full_name TEXT,
     avatar_url TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

## Environment Variables Summary

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key (safe to expose in frontend code)

Never commit `.env` files with real credentials to version control. Use the platform's environment variable settings for production.

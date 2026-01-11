# 🔐 Fix CAPTCHA Verification Error

## Problem

When users try to reset their password, they get this error:

```
HTTP 500: "captcha verification process failed"
```

This error comes from Supabase, not your app.

## ✅ Solution

You have two options:

---

## **Option 1: Disable CAPTCHA (Recommended for Development)**

### Step-by-Step Guide

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Click your project

2. **Navigate to Security Settings**
   - On the left sidebar, go to: **Authentication**
   - Click: **Security**

3. **Find and Disable CAPTCHA**
   - Look for section: "Bot Protection" or "CAPTCHA"
   - Find: "Captcha Protection for Password Recovery"
   - Toggle: **OFF** (disable it)

4. **Save Changes**
   - Scroll down and click **Save**

5. **Test Password Reset**
   - Try password reset again
   - Should work now! ✓

### Screenshot Guide

```
Supabase Dashboard
├── Authentication (left menu)
│   └── Security
│       └── Bot Protection
│           └── "Captcha protection" → Toggle OFF
```

---

## **Option 2: Configure CAPTCHA (Production)**

If you want CAPTCHA protection for production:

### Using hCaptcha (Free)

1. **Sign Up for hCaptcha**
   - Go to: https://www.hcaptcha.com/
   - Click: "Sign Up"
   - Complete registration

2. **Get Your Keys**
   - After signup, go to your dashboard
   - You'll see:
     - **Site Key** (public)
     - **Secret Key** (private)
   - Copy both

3. **Add to Supabase**
   - Supabase Dashboard → **Authentication** → **Security**
   - Find: "Captcha Protection"
   - Select: **hCaptcha**
   - Paste:
     - Site Key: `[your-site-key]`
     - Secret Key: `[your-secret-key]`
   - Click: **Save**

4. **Verify Configuration**
   - Test password reset
   - Should show captcha (if configured on frontend)
   - Should work!

### Using reCAPTCHA (Google)

1. **Sign Up for Google reCAPTCHA**
   - Go to: https://www.google.com/recaptcha/admin
   - Click: "Create" or "+" button
   - Add your domain

2. **Get Your Keys**
   - Copy:
     - **Site Key**
     - **Secret Key**

3. **Add to Supabase**
   - Supabase Dashboard → **Authentication** → **Security**
   - Select: **reCAPTCHA**
   - Paste keys
   - Save

---

## 🧪 Test It

After making changes:

1. **Refresh Your App**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

2. **Try Password Reset**
   - Click "Get Started"
   - Click "Forgot password?"
   - Enter email
   - Click "Send Reset Link"

3. **Should See One Of:**
   - ✅ Success message (if CAPTCHA disabled)
   - ✅ CAPTCHA prompt (if CAPTCHA enabled)
   - ✅ Reset email sent confirmation

---

## 📋 Troubleshooting

### Still Getting CAPTCHA Error?

1. **Clear Cache**
   - Hard refresh: `Ctrl+Shift+R`
   - Clear browser cache
   - Try again

2. **Check Supabase Status**
   - Go to: https://status.supabase.com/
   - Check if any services are down
   - Wait if maintenance happening

3. **Verify Settings**
   - Go back to Supabase Dashboard
   - Check → **Authentication** → **Security**
   - Confirm CAPTCHA is disabled (or properly configured)

4. **Check Email Address**
   - Make sure email is registered
   - Try with different email
   - Check for typos

### CAPTCHA Enabled but Not Showing?

If you enabled hCaptcha/reCAPTCHA but don't see the widget:

1. **Verify Keys Are Correct**
   - Double-check Site Key and Secret Key
   - No extra spaces or characters
   - Case-sensitive!

2. **Check Frontend Configuration**
   - Your app might need CAPTCHA widget code
   - (Currently app sends request, Supabase verifies)
   - Contact support if needed

---

## 🔄 Recommended Approach

### Development (Now)

```
✓ Disable CAPTCHA
✓ Test password reset freely
✓ No verification needed
```

### Production (Later)

```
✓ Enable hCaptcha or reCAPTCHA
✓ Adds bot protection
✓ Better security
✓ Users don't see widget (transparent verification)
```

---

## 📊 CAPTCHA Options Comparison

| Feature        | Disabled | hCaptcha | reCAPTCHA |
| -------------- | -------- | -------- | --------- |
| Cost           | Free     | Free     | Free      |
| Privacy        | Best     | Good     | Good      |
| Setup Time     | < 1 min  | 5 mins   | 5 mins    |
| Bot Protection | ❌ No    | ✅ Yes   | ✅ Yes    |
| Good For       | Dev      | Prod     | Prod      |

---

## ✅ Quick Checklist

- [ ] Opened Supabase Dashboard
- [ ] Went to Authentication → Security
- [ ] Disabled CAPTCHA OR configured it
- [ ] Saved changes
- [ ] Hard refreshed app
- [ ] Tested password reset
- [ ] Got success confirmation or CAPTCHA prompt

---

## 🎯 Success Indicators

### When CAPTCHA Disabled (Current)

```
User Flow:
1. Click "Forgot password?"
2. Enter email
3. Click "Send Reset Link"
4. ✅ See: "Check Your Email" success message
5. ✅ Email received
```

### When CAPTCHA Enabled (Future)

```
User Flow:
1. Click "Forgot password?"
2. See CAPTCHA challenge (hCaptcha/reCAPTCHA)
3. Complete challenge
4. Email sent automatically
5. ✅ See: "Check Your Email" success message
```

---

## 🚀 Next Steps

1. **Fix Now** (5 minutes)
   - Disable CAPTCHA in Supabase
   - Test password reset
   - Done!

2. **Setup Later** (Production)
   - When ready for production
   - Configure hCaptcha or reCAPTCHA
   - Add frontend widget (if needed)
   - Deploy

---

## 📞 Need Help?

If you're still getting errors:

1. **Check Supabase Logs**
   - Dashboard → **Auth** → **Logs**
   - Look for password recovery attempts
   - See actual error details

2. **Verify Email Settings**
   - Dashboard → **Authentication** → **Providers**
   - Check email provider configuration
   - Ensure SMTP settings are correct

3. **Contact Supabase Support**
   - Supabase has excellent support
   - Include error message and logs
   - They can help resolve CAPTCHA issues

---

**Status**: ✅ Solution Provided  
**Time to Fix**: 5-10 minutes  
**Difficulty**: Easy

**Next Action**: Go to Supabase Dashboard and disable CAPTCHA in Authentication → Security

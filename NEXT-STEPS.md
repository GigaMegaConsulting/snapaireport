# AI Assessment — Next Steps

**Status:** Landing page built, GitHub repo live, ready for domain + Vercel deployment.

---

## ✅ Done (as of 2026-05-01 16:11 EDT)

- [x] **GitHub repo created:** `gigamegamania/ai-assessment` is live
- [x] **Landing page built:** Full Next.js site with hero, how it works, pricing, CTA
- [x] **All VAPI → Retell AI:** Updated across docs + Mission Control dashboard
- [x] **Project docs organized:** Moved to `/docs` (PROJECT.md, DASHBOARD.md, WORKFLOW.md)
- [x] **README added:** Clean project overview for GitHub

**View repo:** https://github.com/gigamegamania/ai-assessment

---

## 🔲 Next: Giga (blocking deployment)

### 1. **Register domain**

Pick one and register on Namecheap (~$15/yr):

- **aiclarity.ca** (recommended — clean, bilingual-friendly)
- **aibizaudit.com** (descriptive, direct)
- **smartbizaudit.com** (premium feel)

Once registered, you'll point the domain to Vercel (Vercel gives you the DNS records after connecting).

### 2. **Connect repo to Vercel**

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import `gigamegamania/ai-assessment` from GitHub
4. Framework preset: Next.js (auto-detected)
5. Click "Deploy"

Vercel will:
- Build the site
- Give you a temporary URL (e.g., `ai-assessment.vercel.app`)
- Let you add your custom domain (step 1) in Project Settings → Domains

### 3. **Create Retell AI account**

1. Go to https://retellai.com
2. Sign up (free trial or paid plan)
3. Get a phone number (~$0.08/min voice)
4. API key will be needed later for the voice agent integration

### 4. **Confirm Resend account**

You already have Resend. Just confirm:
- Login at https://resend.com
- Check API key is active
- Free tier: 100 emails/day (plenty for beta)

### 5. **Create Cal.com account**

1. Go to https://cal.com/signup
2. Create free account
3. Set up event: "AI Business Assessment" (20 min)
4. Copy booking link → update landing page CTA

---

## 🔧 Next: Sam (after domain + Vercel)

Once Vercel is live:

1. **Update Cal.com link** in landing page (currently placeholder)
2. **Build Retell AI integration:** Voice agent script + webhook → Claude pipeline
3. **Build Claude report generator:** Transcript → structured AI readiness report
4. **Build PDF renderer:** Format report using `@react-pdf/renderer`
5. **Wire up Make.com:** Glue Retell → Claude → PDF → Resend
6. **Logo + branding:** Generate with Midjourney or Canva
7. **Test full flow:** End-to-end from voice call → PDF email delivery

---

## 📊 Timeline Estimate

**If you do steps 1–5 today:**
- Vercel deploy: live in 5 minutes
- Retell AI setup: 30 min
- Full pipeline (Sam): 2–3 days
- Beta-ready: **Monday May 5**

**First beta client:** As soon as pipeline is validated (2–3 test calls).

---

## 💬 Questions?

Reply in #projects thread or DM Sam.

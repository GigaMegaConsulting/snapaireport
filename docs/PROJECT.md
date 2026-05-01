# AI Business Assessment — Project Plan

**Created:** 2026-05-01  
**Owner:** Giga  
**Status:** Planning — starts after Male Brief + NunaJohnson are stable  
**Revenue model:** $1,000/assessment (free for first 2–3 to get testimonials)  
**Upsell:** $3,000–$5,000 automation builds after the audit  
**Goal:** Fully agent-run. Giga does day-1 setup only.

## Documentation

- **[DASHBOARD.md](DASHBOARD.md)** — Complete guide to the Mission Control dashboard  
- **[WORKFLOW.md](WORKFLOW.md)** — Visual workflow diagrams showing how everything connects  
- **Mission Control:** `/projects/ai-business-assessments` — Live progress tracker

---

## What It Is

A small business calls in (or books a call). A voice AI agent conducts a 20–30 min structured intake interview. A second AI agent generates a full AI Readiness Report (PDF + slide deck). The report is emailed to the client automatically. Giga only approves the first few to validate quality — then it's hands-off.

---

## Domain Name Options

Register one of these (check availability, pick the best):

| Domain | Notes |
|---|---|
| **aiclarity.ca** | Clean, bilingual-friendly |
| **aibizaudit.com** | Descriptive, direct |
| **smartbizaudit.com** | Feels premium |
| **aireadiness.ca** | Consulting tone |
| **bizaicheck.com** | Simple, clear |

Recommendation: **aiclarity.ca** or **aibizaudit.com**. Register via Namecheap (~$15/yr).

---

## Tech Stack

| Layer | Tool | Cost |
|---|---|---|
| Landing page | Next.js on Vercel | Free (hobby) |
| Voice intake | Retell AI | ~$0.08/min voice |
| Report generation | Claude API (Sonnet) | ~$0.50–$1.00/report |
| Report format | PDF via `@react-pdf/renderer` or Puppeteer | Free |
| Email delivery | Resend | Free (100 emails/day) |
| Booking | Cal.com (free tier) | Free |
| Payment | Stripe (one-time link, $1,000) | 2.9% + $0.30 |
| Pipeline glue | Make.com | Already in stack |
| Repo | GitHub (gigamegamania/ai-assessment) | Free |
| Logo | Midjourney or Canva | Already paid |

**Cost per assessment (marginal):** ~$2–$5 all-in. Revenue: $1,000. Margin: ~99.5%.

---

## Phase 1 — MVP (do this first)

- [ ] Reserve domain
- [ ] Create GitHub repo: `gigamegamania/ai-assessment`
- [ ] Connect to Vercel (auto-deploy on main push)
- [ ] Landing page: value prop, how it works, book free beta call, Stripe link
- [ ] Retell AI agent: structured 20-min intake (see questions below)
- [ ] Claude report generator: takes VAPI transcript → outputs structured report
- [ ] PDF renderer: formats the report
- [ ] Resend: auto-emails PDF to client
- [ ] Make.com: glues Retell → Claude → PDF → Resend
- [ ] Logo + basic brand identity (Canva)
- [ ] Free beta: 2–3 clients from Giga's network for testimonials

---

## Phase 2 — Growth (after first 3 clients)

- [ ] Add testimonials to landing page
- [ ] Google Ads: "AI consulting for small business" (B2B converts better here than Meta)
- [ ] LinkedIn: Giga posts 1 case study after each assessment (agent drafts it)
- [ ] Cold email outreach agent: scrape local SMBs, personalize, send via agent
- [ ] SEO content: agent writes "AI for [industry]" blog posts → targets long-tail queries
- [ ] Upsell flow: after report delivery → automated follow-up email with automation build offer

---

## Retell AI Intake Questions (20–30 min)

These are the structured questions the voice agent asks:

1. What does your business do, and how long have you been operating?
2. How many employees do you have? Are they local or remote?
3. Walk me through your main day-to-day operations — what happens from when a customer reaches out to when you deliver?
4. What software or tools does your team use daily? (CRM, email, scheduling, billing, etc.)
5. Where do most of your leads or customers come from right now?
6. What are your biggest bottlenecks — the things that slow you down or take too much time?
7. Have you tried using AI or automation in your business before? What happened?
8. On a scale of 1–10, how comfortable is your team with new technology?
9. What does success look like for you in the next 12 months?
10. If you could automate one thing in your business tomorrow, what would it be?

---

## Report Structure (Claude generates this)

1. **Executive Summary** — 3 bullet points, plain language
2. **AI Readiness Score** — 1–100, with breakdown by category
3. **Top 3 Quick Wins** — things they can implement in 30 days with low cost
4. **Top 3 Strategic Opportunities** — bigger plays, 3–6 month horizon
5. **Risk Flags** — anything that would block AI adoption (tech debt, process gaps, team resistance)
6. **Recommended Tools** — specific products with pricing, matched to their situation
7. **Next Steps** — what to do first, with Giga's contact info + upsell CTA

---

## First Customer Strategy

**Week 1 (free):**
- Giga posts once on LinkedIn: "Giving away 3 free AI business audits to Quebec SMBs. DM me." (Sam drafts this)
- Reach out to 3–5 people in Giga's existing network
- Run the assessments, collect feedback, refine the report

**Week 2 (paid):**
- Add testimonials to landing page
- Start Stripe link ($997 or $1,000)
- Launch cold email agent (target local service businesses: accountants, dentists, contractors, consultants — all have manual ops)

---

## What Giga Needs to Set Up (day-1 list)

1. Register domain (Namecheap)
2. Create GitHub repo + connect Vercel
3. Create VAPI account + phone number
4. Confirm Resend account (or use existing)
5. Confirm Stripe account (already has one)
6. Create Cal.com account for booking page
7. Approve first 2–3 reports before automating fully

Everything else: Sam builds or delegates.

---

## External Dependencies (needs GitHub/Vercel/etc.)

| Service | Purpose | Status |
|---|---|---|
| GitHub | Source control (`gigamegamania/ai-assessment`) | Create repo |
| Vercel | Hosting + CI/CD | Connect after repo created |
| VAPI | Voice intake agent | Need account + phone number |
| Resend | Email delivery | Need to confirm account |
| Stripe | Payment processing | Giga already has account |
| Cal.com | Booking page | New free account |
| Namecheap | Domain registration | Register domain |
| Make.com | Pipeline automation | Already in stack |

---

## Notes

- Free evaluations for the first 2–3 clients = testimonials + pipeline validation
- Do NOT pitch this as "AI will replace your staff" — frame it as "find hidden time and cost savings"
- Quebec French option: after English MVP works, add French landing page for local market
- Privacy: reports contain business data — store temporarily only, delete after 30 days
- Legal: add disclaimer that this is an advisory report, not legal/financial/regulatory advice

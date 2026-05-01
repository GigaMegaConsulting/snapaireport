# AI Business Assessment — Workflow & Connections

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CLIENT ACQUISITION                                  │
│                                                                               │
│  LinkedIn Post → Existing Network → Cold Email Agent → Google Ads → SEO     │
│         ↓               ↓                    ↓               ↓        ↓      │
│                         Lead Books Call                                      │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ASSESSMENT PIPELINE                                │
│                                                                               │
│  ┌───────────┐      ┌──────────┐      ┌─────────┐      ┌────────────┐      │
│  │   VAPI    │  →   │  Claude  │  →   │  PDF    │  →   │  Resend    │      │
│  │ Discovery │      │ Analysis │      │ Report  │      │   Email    │      │
│  │   Call    │      │          │      │         │      │            │      │
│  └───────────┘      └──────────┘      └─────────┘      └────────────┘      │
│       20 min           30 sec           5 sec             instant            │
│    10 questions     AI Readiness     7 sections       Auto-delivery         │
│                                                                               │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                            UPSELL LAYER                                      │
│                                                                               │
│  Giga Review Call (screen-share + 3 close questions)                        │
│                                                                               │
│  ┌───────────────────┬──────────────────┬────────────────┬─────────────┐   │
│  │ Process Redesign  │ Automation Build │ Knowledge Sys. │   Custom    │   │
│  │     $3–5K         │     $1–3K        │     $3K+       │   $3–5K     │   │
│  └───────────────────┴──────────────────┴────────────────┴─────────────┘   │
│                                                                               │
│                   60% conversion rate expected                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌──────────────┐
│  Client books│
│  call (Cal)  │
└──────┬───────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  VAPI Voice Agent                            │
│                                               │
│  Q1: What does your business do?            │
│  Q2: How many employees?                     │
│  Q3: Walk me through day-to-day ops          │
│  Q4: What software do you use?              │
│  Q5: Where do leads come from?              │
│  Q6: Biggest bottlenecks?                   │
│  Q7: Tried AI/automation before?            │
│  Q8: Tech comfort level (1-10)?             │
│  Q9: Success in 12 months?                  │
│  Q10: One thing to automate tomorrow?        │
│                                               │
└──────┬───────────────────────────────────────┘
       │
       │ Transcript (JSON)
       ↓
┌──────────────────────────────────────────────┐
│  Make.com Glue                               │
│  - Receives VAPI webhook                     │
│  - Passes transcript to Claude API           │
└──────┬───────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  Claude Analysis Engine                      │
│                                               │
│  Input: Transcript                           │
│  Process:                                     │
│    1. Identify pain points                   │
│    2. Match to AI tools (off-the-shelf)     │
│    3. Calculate ROI (time + cost savings)   │
│    4. Generate readiness score (1-100)       │
│    5. Flag risks/blockers                    │
│  Output: Structured JSON                     │
│                                               │
└──────┬───────────────────────────────────────┘
       │
       │ JSON Report Data
       ↓
┌──────────────────────────────────────────────┐
│  Wizard of Oz Gate (Phase 1 only)           │
│  - Giga reviews analysis in Slack            │
│  - Approves or edits before PDF fires        │
│  - Removed in Phase 3 (fully automated)      │
└──────┬───────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  PDF Generator (@react-pdf/renderer)         │
│                                               │
│  Section 1: Executive Summary (3 bullets)    │
│  Section 2: AI Readiness Score (1-100)       │
│  Section 3: Top 3 Quick Wins (30 days)       │
│  Section 4: Top 3 Strategic Opps (3-6mo)     │
│  Section 5: Risk Flags                       │
│  Section 6: Recommended Tools (with pricing) │
│  Section 7: Next Steps + CTA                 │
│                                               │
└──────┬───────────────────────────────────────┘
       │
       │ PDF file
       ↓
┌──────────────────────────────────────────────┐
│  Resend Email Service                        │
│  - Professional email template               │
│  - PDF attached                              │
│  - Giga's contact info                       │
│  - Book review call CTA                      │
└──────┬───────────────────────────────────────┘
       │
       │ Email delivered
       ↓
┌──────────────────────────────────────────────┐
│  Client Reviews Report                       │
│  (opens PDF, reads 7 sections)               │
└──────┬───────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  Giga Review Call (screen-share)             │
│                                               │
│  3 Close Questions:                          │
│  1. What jumped out at you?                  │
│  2. Which opportunity excites you most?      │
│  3. When would you want to start?            │
│                                               │
│  → Upsell to implementation ($3-5K)          │
└──────┬───────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  Implementation Phase                        │
│  - Giga builds automation with existing stack│
│  - Client pays $3-5K                         │
│  - 60% conversion rate                       │
└──────────────────────────────────────────────┘
```

## Tech Stack Connections

```
┌────────────────────────────────────────────────────────────────┐
│                         FRONT-END                               │
│                                                                  │
│  Landing Page (Next.js on Vercel)                              │
│  ├── Value prop                                                 │
│  ├── How it works (4 steps)                                     │
│  ├── Testimonials (after beta)                                  │
│  ├── Cal.com booking widget ────────────────────────┐          │
│  └── Stripe payment link ($1,000) ─────────┐        │          │
│                                              │        │          │
└──────────────────────────────────────────────┼────────┼──────────┘
                                               │        │
┌──────────────────────────────────────────────┼────────┼──────────┐
│                      BOOKING LAYER           │        │          │
│                                              ↓        ↓          │
│  Cal.com (free)                        Stripe (2.9%)            │
│  - Schedules call                      - Collects $1,000        │
│  - Sends confirmation                  - Webhook → Make.com     │
│  - Triggers VAPI call                                            │
└──────────────────────────────────────────────┬──────────────────┘
                                               │
┌──────────────────────────────────────────────┼──────────────────┐
│                      VOICE LAYER             │                  │
│                                              ↓                  │
│  VAPI ($0.05-$0.10/min)                                         │
│  - Calls client at scheduled time                               │
│  - Asks 10 discovery questions                                  │
│  - Records transcript                                            │
│  - Sends webhook to Make.com                                    │
└──────────────────────────────────────────────┬──────────────────┘
                                               │
┌──────────────────────────────────────────────┼──────────────────┐
│                   ORCHESTRATION LAYER        │                  │
│                                              ↓                  │
│  Make.com (already in stack)                                    │
│  - Receives VAPI webhook                                        │
│  - Passes transcript to Claude API                              │
│  - Wizard of Oz: posts to Slack for Giga review (Phase 1)      │
│  - Triggers PDF generation                                      │
│  - Triggers email delivery                                      │
└──────────────────────────────────────────────┬──────────────────┘
                                               │
┌──────────────────────────────────────────────┼──────────────────┐
│                       AI LAYER               │                  │
│                                              ↓                  │
│  Claude API (Sonnet, ~$0.50-$1.00/report)                      │
│  - Analyzes transcript                                          │
│  - Identifies AI opportunities                                  │
│  - Generates readiness score                                    │
│  - Writes 7-section report                                      │
│  - Output: Structured JSON                                      │
└──────────────────────────────────────────────┬──────────────────┘
                                               │
┌──────────────────────────────────────────────┼──────────────────┐
│                      REPORT LAYER            │                  │
│                                              ↓                  │
│  @react-pdf/renderer (free)                                     │
│  - Takes Claude JSON                                            │
│  - Renders professional PDF                                     │
│  - Branded template                                             │
│  - 7 sections                                                   │
└──────────────────────────────────────────────┬──────────────────┘
                                               │
┌──────────────────────────────────────────────┼──────────────────┐
│                      EMAIL LAYER             │                  │
│                                              ↓                  │
│  Resend (free, 100 emails/day)                                  │
│  - Professional email template                                  │
│  - PDF attachment                                               │
│  - Giga's contact info                                          │
│  - Book review call CTA                                         │
└─────────────────────────────────────────────────────────────────┘
```

## Mission Control Integration

```
┌─────────────────────────────────────────────────────────────────┐
│                    MISSION CONTROL DASHBOARD                     │
│                   /projects/ai-business-assessments              │
│                                                                   │
│  ┌───────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │  Stats Overview   │  │  Workflow Diagram│  │  Roadmap      │ │
│  │  - Go-live %      │  │  - 5 steps       │  │  - 15 items   │ │
│  │  - Revenue        │  │  - Visual flow   │  │  - Progress   │ │
│  │  - Upsell         │  │                  │  │    tracker    │ │
│  └───────────────────┘  └──────────────────┘  └───────────────┘ │
│                                                                   │
│  ┌───────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │  Dependencies     │  │  VAPI Questions  │  │  Report Struct│ │
│  │  - Day-1 setup    │  │  - 10 questions  │  │  - 7 sections │ │
│  │  - Giga's tasks   │  │  - Discovery     │  │  - Format     │ │
│  └───────────────────┘  └──────────────────┘  └───────────────┘ │
│                                                                   │
│  ┌───────────────────┐  ┌──────────────────┐                    │
│  │  Outreach Strategy│  │  Tech Stack      │                    │
│  │  - 5 channels     │  │  - 8 tools       │                    │
│  │  - Timeline       │  │  - Costs         │                    │
│  └───────────────────┘  └──────────────────┘                    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                     TASK TRACKER                             │ │
│  │  (reads data/tasks.json)                                     │ │
│  │  - Roadmap items link to tasks by ID                         │ │
│  │  - Shows: backlog / in-progress / done                       │ │
│  │  - Updates in real-time                                      │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## How It All Connects

### 1. **Client Acquisition → Booking**
   - LinkedIn post / cold email / Google Ads → landing page
   - Landing page → Cal.com booking → Stripe payment
   - Cal.com triggers VAPI call at scheduled time

### 2. **Voice Intake → Analysis**
   - VAPI calls client, asks 10 questions, records transcript
   - Webhook fires to Make.com
   - Make.com passes transcript to Claude API

### 3. **Analysis → Report**
   - Claude analyzes transcript, generates structured JSON
   - (Phase 1: Giga reviews in Slack before PDF fires)
   - Make.com triggers PDF generator with Claude JSON
   - @react-pdf/renderer creates branded PDF

### 4. **Report → Delivery**
   - Make.com triggers Resend
   - Resend emails PDF to client
   - Email includes CTA to book review call

### 5. **Review Call → Upsell**
   - Giga screen-shares PDF with client
   - 3 close questions uncover urgency
   - 60% convert to $3–5K implementation

### 6. **Mission Control Tracking**
   - Dashboard shows build progress (0% → 100%)
   - Tasks linked to roadmap items
   - Giga + Sam track dependencies in real-time
   - When roadmap hits 100% → go live

## Summary

This workflow shows:
- ✅ How the client moves through the system (acquisition → assessment → upsell)
- ✅ How the tools connect (VAPI → Make → Claude → PDF → Resend)
- ✅ How Mission Control tracks progress (dashboard → tasks → roadmap)
- ✅ How data flows (transcript → JSON → PDF → email)
- ✅ How the team works (Giga does setup + review calls, Sam builds automation)

Every piece is defined, documented, and ready to build once Giga completes Day-1 setup.

# AI Business Assessment — Mission Control Dashboard

**Dashboard URL:** `/projects/ai-business-assessments`

## Overview

The AI Business Assessment dashboard provides a complete view of the project roadmap, workflow, client outreach strategy, and progress tracking. This is the command center for launching and scaling the automated assessment pipeline.

## Dashboard Sections

### 1. **Stats Overview**

Four key metrics at the top:

- **Go-Live Progress** — % completion of the build roadmap (0% → 100%)
- **Revenue Per Assessment** — $1,000 (free for first 2–3 beta clients)
- **Upsell Potential** — $3–5K automation build after audit
- **Cost Per Assessment** — ~$2–5 (99.5% margin)

**Data source:** Calculated from roadmap completion (`ROADMAP` array in `page.tsx`).

### 2. **Workflow Diagram**

Visual pipeline showing how the system works:

1. **Discovery Call** (VAPI) — 20-min voice intake, structured questions
2. **Analysis** (Claude) — Transcript → AI opportunities, tool recommendations
3. **PDF Report** (@react-pdf) — 7 sections: exec summary, score, wins, tools
4. **Email Delivery** (Resend) — Auto-email PDF to client
5. **Upsell** (Giga) — Follow-up call → $3–5K implementation

**Purpose:** Gives Giga + stakeholders a clear mental model of the entire flow.

### 3. **Build Roadmap**

Left column: 15-step checklist showing what needs to be done to get live.

Each item:
- Checkbox (done/not done)
- Description
- Linked task ID (displayed below if found in `tasks.json`)
- Task status + assignee shown inline

**Data source:** `ROADMAP` array in `page.tsx` + `/api/tasks` for linked task details.

**Progress bar:** Visual % completion based on checked items.

### 4. **Day-1 Setup (Dependencies)**

Right column: what Giga needs to set up before Sam can build.

Shows:
- Service name (Domain, GitHub, Vercel, VAPI, etc.)
- What needs to be done
- Cost
- Status indicator (✓ Ready / ⚠ Needed / ⏸ Pending)
- Assignee

**Data source:** `DEPENDENCIES` array in `page.tsx`.

**Purpose:** Clear action list for Giga — these are blockers. Once done, Sam builds the rest.

### 5. **Voice Agent Discovery Questions**

Left column: the 10 structured questions the voice agent asks during intake.

**Purpose:** Defines the discovery call script. This is the input that drives the entire analysis.

### 6. **PDF Report Sections**

Right column: the 7 sections Claude generates for the PDF report.

**Purpose:** Documents the report structure. This is what the client receives.

### 7. **Client Outreach Strategy**

5 cards showing how to find and acquire clients:

- **LinkedIn** — Giga posts free beta offer (Week 1)
- **Existing Network** — Reach out to 3–5 people (Week 1)
- **Cold Email Agent** — Scrape + personalize + send (Week 2+)
- **Google Ads** — Target B2B keywords (after testimonials)
- **SEO Content** — Agent writes "AI for [industry]" posts (Month 2+)

**Data source:** `OUTREACH_STRATEGY` array in `page.tsx`.

**Purpose:** Shows Giga how to get the first clients, then scale.

### 8. **Tech Stack**

8 cards showing every tool in the stack:

- Landing page → Next.js on Vercel (Free)
- Voice intake → VAPI ($0.05–$0.10/min)
- Report generation → Claude API ($0.50–$1.00/report)
- PDF format → @react-pdf/renderer (Free)
- Email delivery → Resend (Free, 100/day)
- Booking → Cal.com (Free)
- Payment → Stripe (2.9% + $0.30)
- Pipeline glue → Make.com (In stack)

**Purpose:** Full transparency on every piece of the system + costs.

## Data Flow

### How the roadmap items connect to tasks:

1. **Dashboard loads** → fetches `/api/tasks` (reads `data/tasks.json`)
2. **Each roadmap item** has a `taskId` field
3. **Dashboard matches** roadmap item to task by ID
4. **Displays task status** inline: "Task: backlog · Giga" or "Task: in-progress · Sam"

### How to update roadmap progress:

**Option 1 (recommended):** Update the task in Mission Control → task status changes, roadmap shows updated status.

**Option 2 (if needed later):** Edit `ROADMAP` array in `page.tsx` and set `done: true` on completed items.

### How to add a new roadmap step:

1. Add entry to `ROADMAP` array in `page.tsx`
2. Create matching task in `data/tasks.json` with the same `taskId`
3. Refresh dashboard → new step appears with linked task

## Integration Points

### `/api/tasks`

- **GET:** Returns all tasks from `data/tasks.json`
- **POST:** Saves updated tasks (used by task board)

The dashboard filters tasks with `id.startsWith("ai-assessment-")` to show only relevant ones.

### `/api/projects`

- **GET:** Returns all projects from `data/projects.json`
- **PATCH:** Updates a single project (status, description, updatedAt)

The projects list page (`/projects`) shows all projects with a "Dashboard →" button for AI Business Assessments.

## Next Steps (How to Use This)

### For Giga:

1. **Go to `/projects/ai-business-assessments`** in Mission Control
2. **Review "Day-1 Setup"** section — these are your blockers
3. **Complete each item** (register domain, create repo, etc.)
4. **Check tasks in Mission Control** → Sam moves items to "in-progress" as he builds

### For Sam:

1. **Wait for Giga to complete Day-1 Setup** (domain, GitHub, VAPI, etc.)
2. **Pick up tasks** from the backlog (landing page, VAPI script, Claude prompt, etc.)
3. **Update task status** as you work → dashboard auto-reflects progress
4. **Once roadmap hits 100%** → move to beta client acquisition

## Files Changed

- `/mission-control/app/projects/ai-business-assessments/page.tsx` — full dashboard (NEW)
- `/mission-control/data/tasks.json` — 15 new tasks added (UPDATED)
- `/mission-control/data/projects.json` — AI Assessment description updated (UPDATED)
- `/projects/ai-assessment/PROJECT.md` — master project plan (EXISTS)
- `/projects/ai-assessment/DASHBOARD.md` — this file (NEW)

## Summary

You now have a complete Mission Control dashboard for the AI Business Assessment project with:

✅ Visual workflow diagram showing how the system works  
✅ 15-step build roadmap with progress tracking  
✅ All 15 tasks created and linked to roadmap  
✅ Day-1 setup checklist for Giga (7 dependencies)  
✅ VAPI discovery questions documented  
✅ PDF report structure defined  
✅ Client outreach strategy (5 channels)  
✅ Full tech stack with costs  
✅ % completion tracker before go-live  

Everything is linked — update tasks in Mission Control, dashboard auto-reflects progress.

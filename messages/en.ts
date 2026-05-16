const en = {
  common: {
    brand: "SnapReport",
    cta: {
      start: "Start →",
      beginAssessment: "Begin assessment",
      seeProcess: "See the process",
      getOwnReport: "Get your own report",
      claimReport: "Claim your report",
      generateMyReport: "Generate my report",
      continue: "Continue",
      back: "Back",
      backToHome: "Back to home",
      startFreeAssessment: "Start Free Assessment",
      getFreeReport: "Get Your Free Report",
      viewFull: "View full →",
      clickToExpand: "Click to expand",
    },
    nav: {
      process: "Process",
      deliverable: "Deliverable",
      pricing: "Pricing",
    },
    footer: {
      tagline: "Made in Montréal · 2026",
      contactPrompt: "Contact",
      privacy: "Privacy",
    },
    misc: {
      privateNote: "🔒 Private · used only to generate your report",
      version: "Version",
      step: "Step",
    },
  },

  landing: {
    metaTitle: "SnapReport — Your AI Business Assessment in 5 Minutes",
    metaDescription:
      "Find $10K+ in hidden AI opportunities. Spend ~5 minutes on a short form and get a custom AI readiness report by email. Free during our beta.",

    hero: {
      eyebrow: "§ 00 · INTAKE",
      estimate: "est. 5 min",
      headline: ["Map the AI", "opportunities", "hiding in your", "business."],
      headlineItalicIndex: 1,
      lead:
        "Answer a short set of questions about how you operate. Our team reviews them, finds the highest-leverage AI plays for your specific situation, and emails you a tailored report. No call. No pitch. Just clarity.",
      badges: ["~5 min", "PDF in inbox", "Free during beta"],
      specimenLabel: "Specimen",
      specimenCaption: "Fig. 01",
      specimenAction: "Output sample",
    },

    process: {
      sectionNumber: "§ 01 · METHOD",
      title: ["Three steps,", "zero friction."],
      titleItalicIndex: -1,
      lead:
        "Designed to be done in one sitting on your phone or laptop. No software to install. No prep. No follow-up call required to get value out of it.",
      steps: [
        {
          n: "01",
          title: "Fill the short form",
          desc:
            "A short web form covers your operations, team, tools, leads, bottlenecks, AI experience, and 12-month goals.",
          meta: "≈ 5 minutes",
        },
        {
          n: "02",
          title: "Our team reviews it",
          desc:
            "Your answers are reviewed by our specialists and matched against thousands of SMB profiles.",
          meta: "≈ 30 seconds",
        },
        {
          n: "03",
          title: "Report in your inbox",
          desc:
            "PDF arrives at the email you provided. Readiness score, three quick wins, three strategic plays, tool stack, next steps.",
          meta: "≈ 2 minutes",
        },
      ],
    },

    deliverable: {
      sectionNumber: "§ 02 · DELIVERABLE",
      title: ["What you get,", "section by section."],
      titleItalicIndex: 1,
      lead:
        "A 6–8 page PDF. Plain language. Specific to your business. Designed to be readable in 10 minutes and acted on in 30 days.",
      items: [
        { tag: "01", title: "AI Readiness Score", desc: "0–100 with breakdown across 5 dimensions." },
        { tag: "02", title: "Executive Summary", desc: "Three plain-language bullets — what you'd tell a co-founder." },
        { tag: "03", title: "Quick Wins", desc: "Three high-leverage moves you can ship in 30 days." },
        { tag: "04", title: "Strategic Plays", desc: "Three bigger bets for the 3–6 month horizon." },
        { tag: "05", title: "Risk Flags", desc: "What's likely to block adoption and how to defuse it." },
        { tag: "06", title: "Tool Stack", desc: "Specific products with pricing, matched to your situation." },
      ],
    },

    pricing: {
      sectionNumber: "§ 03 · TERMS",
      title: "Free, for now.",
      lead:
        "Reports are free while we're in beta to build case studies. They'll retail at $1,000 once we officially launch.",
      stamp: "Beta · Free",
      price: "$0",
      strikePrice: "$1,000",
      priceCaption: "One-time · No subscription · No card required",
      features: [
        "Custom AI readiness report (PDF)",
        "Top 3 quick wins + 3 strategic plays",
        "Tool recommendations with pricing",
        "Risk flags and 30-day action plan",
        "Delivered to your inbox within minutes",
      ],
      footnote: "Implementation services available separately ($3–5K)",
    },

    closingCta: {
      eyebrow: "// END OF PROSPECTUS",
      headline: "~5 minutes stand between you and a tailored AI roadmap.",
    },
    tailored: {
      sectionNumber: "§ 01b · TAILORED",
      title: ["Tailored versions,", "by profession."],
      titleItalicIndex: 1,
      lead:
        "The questions, the report vocabulary, and the recommended tools all change depending on what you do. Pick the closest fit — or stick with the general assessment.",
      versions: [
        {
          key: "lawyers",
          label: "For law firms",
          desc: "Intake & conflicts, drafting, discovery review, billable capture, trust accounting.",
          href: "/lawyers",
        },
        {
          key: "accountants",
          label: "For accounting practices",
          desc: "Document chase, reconciliation, tax-prep first drafts, audit analytics.",
          href: "/accountants",
        },
        {
          key: "general",
          label: "Anything else",
          desc: "SMB, services, retail, e-commerce, agencies — the general assessment fits most businesses.",
          href: "/assessment",
        },
      ],
    },
  },

  form: {
    metaTitle: "Start your assessment — SnapReport",
    headerStep: "Step",
    sectionPrefix: "Section",
    actions: {
      back: "← Back",
      continue: "Continue",
      generate: "Generate my report",
      generating: "Generating report",
    },
    errors: {
      stepInvalid: "Please fill in the highlighted fields before continuing.",
      submitFailed: "Something went wrong. Please try again.",
      required: "Required",
      invalidEmail: "Enter a valid email address",
    },
    success: {
      eyebrow: "§ END · CONFIRMED",
      headlinePrefix: "You're all set,",
      fallbackName: "friend",
      bodyPrefix: "Your AI Report is being generated. Check",
      bodySuffix:
        "in the next few minutes — it will land with your AI Readiness Score, top quick wins, and tool recommendations specific to",
      fallbackBusiness: "your business",
      nextHeader: "What happens next",
      nextSteps: [
        "Our team reviews your answers",
        "Report is drafted and rendered as PDF",
        "Lands in your inbox — usually under 5 minutes",
        "Reply if you want a follow-up walkthrough",
      ],
    },
    optionalTag: "optional",
    sliderLow: "1 · phobic",
    sliderHigh: "10 · early adopter",
    industrySelector: {
      label: "What kind of practice is this for?",
      helper: "Picking one tailors the next questions and the report. You can keep it general if nothing fits.",
      options: [
        { value: "general", label: "General business", desc: "SMB, services, retail, e-commerce — anything else" },
        { value: "lawyers", label: "Law firm", desc: "Solo, boutique, family, civil, real-estate — any legal practice" },
        { value: "accountants", label: "Accounting firm", desc: "CPA, bookkeeping, tax prep, audit, advisory" },
      ],
    },
    helperOptionalName: "Optional — we'll address the report to you if you give one.",

    steps: [
      {
        number: "00",
        title: "Where should we send your report?",
        subtitle:
          "We'll email your custom AI Report once it's ready. Takes about 5 minutes — no calls, no follow-up sales.",
        fields: [
          {
            key: "email",
            label: "Your email",
            placeholder: "you@yourbusiness.com",
            type: "email" as const,
            required: true,
            helper: undefined as string | undefined,
          },
          {
            key: "fullName",
            label: "Your name",
            placeholder: "Jane Smith",
            type: "text" as const,
            required: false,
            helper: "Optional — we'll address the report to you if you give one.",
          },
        ],
      },
      {
        number: "01",
        title: "Tell us about your business",
        subtitle: undefined as string | undefined,
        fields: [
          {
            key: "businessName",
            label: "Business name",
            placeholder: "Acme Plumbing",
            type: "text" as const,
            required: true,
            helper: undefined as string | undefined,
          },
          {
            key: "businessDescription",
            label: "What does your business do?",
            helper: "One or two sentences. Plain language.",
            placeholder:
              "We're a residential plumbing company serving the Greater Montreal area...",
            type: "textarea" as const,
            required: true,
          },
          {
            key: "yearsOperating",
            label: "How long have you been operating?",
            placeholder: "8 years",
            type: "text" as const,
            required: true,
            helper: undefined as string | undefined,
          },
        ],
      },
      {
        number: "02",
        title: "Your team",
        subtitle: undefined as string | undefined,
        fields: [
          {
            key: "teamSize",
            label: "How many people work in the business?",
            placeholder: "12 (including 2 owners)",
            type: "text" as const,
            required: true,
            helper: undefined as string | undefined,
          },
          {
            key: "teamLocation",
            label: "Are they local, remote, or both?",
            placeholder:
              "Mostly local — office staff on site, field techs in the field",
            type: "text" as const,
            required: true,
            helper: undefined as string | undefined,
          },
        ],
      },
      {
        number: "03",
        title: "How the work flows",
        subtitle: "Walk us through a typical customer journey.",
        fields: [
          {
            key: "operationsWalkthrough",
            label:
              "Walk us through a typical customer journey — from first contact to final delivery.",
            helper:
              "Stream-of-consciousness is fine. More detail → better report.",
            placeholder:
              "Customer calls or fills out our website form → we schedule a quote visit → quote → job booked → tech dispatched → invoice sent → follow-up...",
            type: "textarea" as const,
            required: true,
          },
          {
            key: "toolsInUse",
            label: "What software does your team use day-to-day?",
            helper: "CRM, scheduling, email, billing, anything else.",
            placeholder:
              "QuickBooks for billing, Google Workspace for email, Jobber for scheduling, Excel for tracking...",
            type: "textarea" as const,
            required: true,
          },
        ],
      },
      {
        number: "04",
        title: "Customers and bottlenecks",
        subtitle: undefined as string | undefined,
        fields: [
          {
            key: "leadSources",
            label: "Where do most of your customers come from right now?",
            placeholder:
              "About 60% word of mouth, 30% Google search, 10% Facebook ads...",
            type: "textarea" as const,
            required: true,
            helper: undefined as string | undefined,
          },
          {
            key: "bottlenecks",
            label: "What slows you down? Where do you lose the most time?",
            helper:
              "Be specific — bottlenecks are where AI usually pays off the most.",
            placeholder:
              "Following up on quotes, billing reconciliation, answering the same customer questions...",
            type: "textarea" as const,
            required: true,
          },
        ],
      },
      {
        number: "05",
        title: "AI experience and goals",
        subtitle: undefined as string | undefined,
        fields: [
          {
            key: "priorAiExperience",
            label: "Have you tried AI or automation before? What happened?",
            helper: "If not, just say 'none' — that's useful info too.",
            placeholder:
              "We tried ChatGPT for marketing copy, it was okay but inconsistent. Never tried real automation.",
            type: "textarea" as const,
            required: true,
          },
          {
            key: "techComfortScore",
            label: "How comfortable is your team with new technology?",
            helper: "1 = phobic · 10 = early adopters",
            type: "slider" as const,
            required: true,
            placeholder: undefined as string | undefined,
          },
          {
            key: "twelveMonthGoals",
            label: "What does success look like for you in the next 12 months?",
            placeholder:
              "Hit $1.5M in revenue, hire 2 more techs, less time chasing paperwork...",
            type: "textarea" as const,
            required: true,
            helper: undefined as string | undefined,
          },
          {
            key: "automationWish",
            label: "If you could automate one thing tomorrow, what would it be?",
            placeholder:
              "All the back-and-forth scheduling emails with customers.",
            type: "textarea" as const,
            required: true,
            helper: undefined as string | undefined,
          },
        ],
      },
      {
        number: "06",
        title: "Anything else?",
        subtitle:
          "Optional, but the answer here usually colors the recommendations more than you'd expect. Internal politics, recent failures, ambitions that don't fit a question — dump it all.",
        fields: [
          {
            key: "anythingElse",
            label: "Anything we missed?",
            helper:
              "Constraints, weird quirks, a partner who'll resist, a tool you secretly hate, an experiment that didn't work — whatever might tilt the report toward what's actually useful.",
            placeholder:
              "We're not actually as profitable as the revenue suggests — margins are tight. Also, my brother (co-owner) is reluctant about any kind of AI; whatever you recommend has to be sellable to him too.",
            type: "textarea" as const,
            required: false,
          },
        ],
      },
    ],
  },

  sample: {
    metaTitle: "Specimen — Acme Plumbing · SnapReport",
    badge: "Specimen · Fig. 01",
    eyebrow: "§ ▢ · SPECIMEN",
    eyebrowSuffix: "Public sample",
    heroTitle: ["What a SnapReport", "actually looks like."],
    heroTitleItalicIndex: 1,
    heroLead:
      "Below: a fictional Montreal plumbing company, the answers they gave the form, and the full report our team produced for them. Same process you'll go through. Same kind of report you'll get back.",
    note:
      "Note: Acme Plumbing is invented for demonstration. No real customer data shown.",
    getOwn: "Get your own →",
    contents: "Contents",
    contentsItems: [
      ["A", "Company profile"],
      ["B", "The 10 answers"],
      ["C", "Report — exec summary"],
      ["D", "AI Readiness score"],
      ["E", "Quick wins"],
      ["F", "Strategic plays"],
      ["J", "Effort × Impact"],
      ["K", "Financial impact"],
      ["L", "4-day plan"],
      ["G", "Risk flags"],
      ["H", "Tool stack"],
      ["I", "Next steps"],
    ],

    sectionA: "Company profile",
    sectionB: "The 10 answers they gave",
    sectionC: "Executive summary",
    sectionD: "AI Readiness score",
    sectionE: "Top 3 quick wins (≤30 days)",
    sectionF: "Top 3 strategic plays (3–6 months)",
    sectionG: "Risk flags + mitigations",
    sectionH: "Recommended tool stack",
    sectionI: "Next steps",
    sectionJ: "Effort × Impact",
    sectionK: "Financial impact",
    sectionL: "4-day quick-win plan",
    matrix: {
      sweetSpot: "Quick-win zone",
      effortLabel: "Effort →",
      impactLabel: "↑ Impact",
      effortLevels: { low: "Low", medium: "Medium", high: "High" },
      impactLevels: { low: "Low", medium: "Medium", high: "High" },
      legendQw: "Quick Win",
      legendSp: "Strategic Play",
    },
    financialImpact: {
      eyebrow: "Run the math",
      hoursLabel: "Hours/week reclaimed",
      rateLabel: "Hourly rate assumed",
      toolCostLabel: "Monthly tool cost",
      netLabel: "Net monthly value",
      explainer:
        "(Weekly hours × 4.33 × hourly rate) − monthly tool cost. We use a blended $100/hr unless you tell us otherwise.",
    },
    dayPlan: {
      eyebrow: "If you start tomorrow",
      lead:
        "Each day is one specific action — no more, no less. By Friday you've shipped your first quick win.",
      dayLabel: "Day",
    },
    exploreMore: {
      heading: "Find more AI tools",
      body: "The stack above is what fits Acme today. As the AI landscape moves fast, here's where to keep an eye on what's launching:",
      directories: [
        { name: "There's An AI For That", url: "https://theresanaiforthat.com", desc: "The largest searchable index of AI tools — type a use case, get a sorted list." },
        { name: "Futurepedia", url: "https://www.futurepedia.io", desc: "Curated AI tools with categories, pricing tiers, and weekly updates." },
        { name: "FutureTools", url: "https://www.futuretools.io", desc: "Hand-picked AI tools by Matt Wolfe. Strong filters for free-tier finds." },
      ],
    },
    pause: "↓ Below: what our team produced and emailed them",
    issued: "Issued · 2026.05.13",
    reportHeader: "SnapReport · AI Readiness",
    confidential: "Confidential",
    issuedShort: "Issued",
    confidentialNote: "This report contains business information shared in confidence. Do not forward without the recipient's consent.",
    overall: "Overall",
    breakdown: "Breakdown",
    aboveAvg: "Above SMB average (54)",
    risksHeader: { sev: "Sev", flag: "Flag", mitigation: "Mitigation" },
    toolsHeader: { tool: "Tool", purpose: "Purpose", cost: "Cost" },
    nextThisWeek: "This week",
    nextThirtyDays: "Within 30 days",
    closingEyebrow: "// END OF SPECIMEN",
    closingHeadline: ["This was Acme's.", "What would yours say?"],
    closingHeadlineItalicIndex: 1,

    profile: {
      business: "Acme Plumbing",
      city: "Greater Montréal · QC",
      years: "8 years operating",
      team: "12 employees · 2 owners",
      industry: "Residential plumbing & emergency repair",
      revenue: "≈ $1.1M annual",
      labels: {
        Business: "Business",
        Location: "Location",
        Years: "Years operating",
        Team: "Team",
        Industry: "Industry",
        Revenue: "Approx. revenue",
      },
    },

    answers: [
      {
        q: "What does your business do, and how long have you been operating?",
        a:
          "We're a residential plumbing company in the Greater Montréal area. Mostly emergency repairs (leaks, blocked drains, water-heater failures) and some scheduled installs. Eight years in, second-generation family business — my dad started it.",
      },
      {
        q: "How many employees do you have? Are they local or remote?",
        a:
          "12 people total. Two of us own it (myself and my brother). Five field techs in service trucks, three apprentices, two office staff handling dispatch and billing, plus my brother who runs the field side.",
      },
      {
        q:
          "Walk us through a typical customer journey — from first contact to final delivery.",
        a:
          "Customer calls our main line OR fills out our website form. Office staff (Sylvie) takes the info, decides if it's an emergency or scheduled. For emergencies she radios the nearest tech. For scheduled jobs she books in Jobber. Tech arrives, diagnoses, gives a price verbally or via printed quote. Customer approves, work happens, tech logs hours in Jobber, then we invoice through QuickBooks two days later. Follow-up call from Sylvie a week after for satisfaction.",
      },
      {
        q: "What software or tools does your team use daily?",
        a:
          "Jobber for scheduling and tech dispatch. QuickBooks for billing and accounting. Google Workspace for email and calendar. A WhatsApp group for the field guys to coordinate. Excel for tracking inventory of parts in the trucks. Sylvie also keeps a paper notebook for callbacks.",
      },
      {
        q: "Where do most of your leads or customers come from right now?",
        a:
          "About 50% word of mouth — long-time customers and referrals. 30% Google search (we rank #2 for 'plombier Montréal urgence'). 15% Facebook ads my nephew runs for us. 5% the Yellow Pages still, somehow.",
      },
      {
        q: "What are your biggest bottlenecks?",
        a:
          "Answering the phone is the worst. We lose maybe 4-6 calls a day to voicemail when Sylvie is on another line, and a chunk of those don't call back. Sending quotes also drags — techs handwrite them and Sylvie retypes into Jobber later. Following up on unpaid invoices is a constant headache. Inventory in the trucks is a black box — techs run out of parts, drive back, lose half a day.",
      },
      {
        q: "Have you tried using AI or automation in your business before? What happened?",
        a:
          "Tried ChatGPT to write Facebook ad copy — works fine, saves time, but feels hit or miss. My brother tried a robo-call answering service last year that was terrible (customers hated it). Nothing else.",
      },
      {
        q: "On a scale of 1–10, how comfortable is your team with new technology?",
        a:
          "Office staff: 6. Owners: 7. Field techs: range from 3 to 8 depending on age. As a team, I'd say 5.",
      },
      {
        q: "What does success look like for you in the next 12 months?",
        a:
          "Hit $1.5M in revenue, hire 2 more techs without me working 60-hour weeks. Stop missing calls. Get our quote-to-cash cycle from 5 days down to 2.",
      },
      {
        q: "If you could automate one thing in your business tomorrow, what would it be?",
        a:
          "The back-and-forth scheduling with customers. Sylvie spends maybe 2 hours a day on phone tag — 'is Tuesday at 2pm good? no? how about Wednesday?'. If a customer could just book a slot online with the right tech, that's gold.",
      },
    ],

    report: {
      score: 62,
      breakdown: [
        { label: "Digital foundation", v: 70 },
        { label: "Process maturity", v: 65 },
        { label: "Team readiness", v: 55 },
        { label: "Data quality", v: 50 },
        { label: "Leadership buy-in", v: 75 },
      ],
      summary: [
        "Acme is well-positioned for AI: clear processes, an existing software stack (Jobber, QuickBooks, Google), and ownership that's already experimenting with ChatGPT.",
        "The single biggest leak is the phone — missed calls = lost emergency revenue. An AI receptionist + online booking pays for itself inside a month.",
        "Quote-to-cash cycle compression is the next-largest opportunity. Going from handwritten quotes to AI-drafted PDFs from the truck cuts admin time by ~50%.",
      ],
      quickWins: [
        {
          tag: "QW.01",
          title: "AI receptionist for after-hours and overflow calls",
          desc:
            "Plug a voice agent (Retell, VAPI, or similar) into your main line as overflow. Triages emergencies, books slots in Jobber via API, transcribes the rest. Captures the 4–6 missed calls/day at roughly $200 average ticket.",
          impact: "High",
          effort: "Medium",
          cost: "≈ $80/mo + $0.08/min",
          eta: "2–3 weeks",
        },
        {
          tag: "QW.02",
          title: "Auto-generate quote PDFs from tech voice notes",
          desc:
            "Tech speaks the job + parts into their phone after diagnosis. AI transcribes, generates a branded PDF quote, emails it to the customer and Sylvie within 90 seconds. Eliminates handwriting + Sylvie's retype step.",
          impact: "High",
          effort: "Low",
          cost: "≈ $20/mo (Anthropic API)",
          eta: "1–2 weeks",
        },
        {
          tag: "QW.03",
          title: "Online booking embed on the website",
          desc:
            "Replace the contact form with a Cal.com (or Calendly) embed that respects tech availability + service area. Cuts the phone-tag scheduling that costs Sylvie ~2h/day.",
          impact: "Medium",
          effort: "Low",
          cost: "Free–$15/mo",
          eta: "3 days",
        },
      ],
      strategic: [
        {
          tag: "SP.01",
          title: "Predictive truck inventory from past job patterns",
          desc:
            "Mine 3 years of Jobber + QuickBooks data to predict what parts each tech needs to restock weekly. Cuts return-trips to the warehouse — recovers ~5h/week per tech.",
          roi: "≈ $30K/yr in recovered labor",
          eta: "2–3 months",
        },
        {
          tag: "SP.02",
          title: "AI-drafted invoice follow-ups",
          desc:
            "Auto-draft polite collection emails based on invoice age + customer history. Owner approves with one click. Closes 60-day receivables ~2× faster.",
          roi: "≈ 8% improvement in cash-flow cycle",
          eta: "3–4 weeks",
        },
        {
          tag: "SP.03",
          title: "French-language SEO content engine",
          desc:
            "Agent writes ~4 service-area landing pages per month (\"plombier urgence Laval\", \"chauffe-eau Brossard\"). Pairs with existing Google ranking; long-tail organic should 2× over 6 months.",
          roi: "Organic leads +50–100%",
          eta: "Month 2+",
        },
      ],
      risks: [
        {
          flag: "Field-tech adoption (3 of 5 score themselves under 5/10 on tech comfort).",
          mitigation:
            "Roll out voice-quote tool only after a 2-week pilot with the most tech-comfortable tech. Have him demo to the others. Voice-driven UX (no typing) lowers the barrier.",
          severity: "Medium",
        },
        {
          flag: "Customer pushback on AI receptionist (your brother's previous robo-call attempt failed).",
          mitigation:
            "Position it as 'overflow assistant', not the primary line. Sylvie still picks up first. AI only after 3 rings. Use a natural voice (11labs or similar), not a robo voice.",
          severity: "Medium",
        },
        {
          flag: "Data hygiene — quotes are handwritten, not all flowing into Jobber.",
          mitigation:
            "QW.02 (voice-to-quote) fixes this structurally. Once quotes are AI-drafted they land in Jobber automatically.",
          severity: "Low",
        },
      ],
      tools: [
        { name: "Retell AI", purpose: "AI receptionist + booking voice agent", cost: "$0.08/min", url: "https://retellai.com" },
        { name: "Anthropic Claude", purpose: "Voice-to-quote generation + email drafts", cost: "$0.50/quote avg.", url: "https://anthropic.com" },
        { name: "Cal.com", purpose: "Online booking, embeds in website", cost: "Free–$15/mo", url: "https://cal.com" },
        { name: "Make.com", purpose: "Glue layer: Jobber ↔ QuickBooks ↔ AI tools", cost: "$9–29/mo", url: "https://make.com" },
        { name: "Lindy", purpose: "Invoice follow-up drafts, owner-approves-then-sends", cost: "$30–50/mo", url: "https://lindy.ai" },
      ],
      next: {
        immediate: [
          "Pick one field tech (the most tech-comfortable) for the voice-to-quote pilot.",
          "Set up a Cal.com account and add a basic booking embed to acmeplumbing.ca this week.",
          "Forward the next missed call to a Retell trial agent. Listen to the transcript.",
        ],
        thirtyDays: [
          "Wire Retell as Jobber-aware overflow. Measure missed-call recovery rate.",
          "Voice-to-quote rolled out to all 5 techs after pilot validates.",
          "AI invoice follow-ups running on 30–60 day buckets.",
        ],
      },
      financialImpact: {
        weeklyHoursReclaimed: 14,
        hourlyRateAssumption: 100,
        monthlyToolCost: 115,
        netMonthlySavings: 5947,
      },
      quickWinPlan: [
        { day: 1, action: "Create a Cal.com account and embed a basic booking widget on acmeplumbing.ca. Sylvie reviews on day 2." },
        { day: 2, action: "Sign up for Retell AI trial. Set up an overflow agent to receive calls Sylvie can't answer in 3 rings." },
        { day: 3, action: "Forward 3 missed calls from yesterday into Retell. Review the transcripts — sanity-check the bookings it tried to make." },
        { day: 4, action: "Pick the most tech-comfortable tech, install a voice-quote app on his phone, do 2 real-world quotes with it." },
      ],
    },
  },

  email: {
    subject: "Your AI Business Assessment Report",
    heading: "Your AI Business Assessment is Ready",
    greeting: "Hi",
    intro:
      "Thank you for completing your AI readiness assessment. Your personalized report is attached to this email.",
    bullets: [
      "Your AI Readiness Score",
      "Quick Wins you can implement in 30 days",
      "Strategic AI opportunities for 6–12 months",
      "Specific tool recommendations with pricing",
      "Risk flags and how to address them",
    ],
    tipPrefix: "Start with the Quick Wins section",
    tipBody:
      " — those are the high-ROI, low-effort moves you can begin this week.",
    ctaLabel: "Reply to schedule a review →",
    ctaBookLabel: "Book your review call →",
    closing:
      "Reply to this email if you'd like a walkthrough — we'll go through the report together and identify which opportunity to tackle first.",
    signature: "The SnapReport team",
    sigCompany: "SnapReport",
    sigEmail: "info@snapaireport.com",
  },
};

export default en;

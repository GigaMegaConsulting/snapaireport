import Link from "next/link";
import type { Metadata } from "next";
import { VERSION, VERSION_LABEL } from "@/lib/version";

export const metadata: Metadata = {
  title: "SnapReport · Design Guidelines",
  description: "Visual system reference for SnapReport — palette, typography, components, voice. Internal use.",
  robots: { index: false, follow: false },
};

const PALETTE = [
  { name: "Paper", token: "--paper", hex: "#FAF8F1", use: "Primary background. Warm off-white. Everything sits on this." },
  { name: "Paper 2", token: "--paper-2", hex: "#F3F0E6", use: "Inset cards, specimen frames, subtle nested surfaces." },
  { name: "Ink", token: "--ink", hex: "#0A0A0A", use: "Primary text. Mark. Borders on hover. Ink-button background." },
  { name: "Ink 2", token: "--ink-2", hex: "#525252", use: "Body copy when slightly de-emphasized. Mono labels." },
  { name: "Ink 3", token: "--ink-3", hex: "#A3A3A3", use: "Tertiary text. Placeholders. Metadata. Dividers in legends." },
  { name: "Rule", token: "--rule", hex: "rgba(10,10,10,.12)", use: "Default hairline border. Section dividers." },
  { name: "Rule strong", token: "--rule-strong", hex: "rgba(10,10,10,.28)", use: "Field underlines. Strong dividers. Annotation lines." },
  { name: "Blueprint", token: "--blueprint", hex: "#0040FF", use: "Accent only — focused inputs, hover state on primary CTA. Never as block background." },
  { name: "Stamp", token: "--stamp", hex: "#BF2127", use: "Stamps, required-field markers, validation errors. Used sparingly." },
];

const TYPE_SCALE = [
  { sample: "Map the AI", family: "Instrument Serif · 88/0.95", role: "H1 / hero display", className: "serif text-[88px] leading-[0.95] tracking-tight" },
  { sample: "Three steps, zero friction.", family: "Instrument Serif · 56/1.0", role: "H2 / section heading", className: "serif text-[56px] leading-[1] tracking-tight" },
  { sample: "What you get, section by section.", family: "Instrument Serif · 40/1.05", role: "H3 / sub-section", className: "serif text-[40px] leading-[1.05] tracking-tight" },
  { sample: "AI Readiness Score", family: "Instrument Serif · 24/1.1", role: "H4 / card titles, question labels", className: "serif text-[24px] leading-tight" },
  { sample: "Answer 10 questions about how you operate. Claude reads them.", family: "Inter · 17/1.55", role: "Body copy", className: "text-[17px] leading-[1.55] text-ink-2" },
  { sample: "Custom AI readiness report (PDF)", family: "Inter · 14/1.5", role: "Card body, small copy", className: "text-[14px] leading-[1.5]" },
  { sample: "§ 00 · INTAKE", family: "JetBrains Mono · 11/1.0 · uppercase · 0.12em tracking", role: "Eyebrow / section number", className: "eyebrow" },
  { sample: "≈ 5 minutes", family: "JetBrains Mono · 10/1.0 · uppercase · 0.18em tracking", role: "Meta label", className: "mono text-[10px] uppercase tracking-[0.18em] text-ink-3" },
  { sample: "Q01", family: "JetBrains Mono · 10/1.0 · uppercase · 0.18em tracking", role: "Question / item number", className: "mono text-[10px] uppercase tracking-[0.18em] text-ink-3" },
];

const VOICE = [
  { do_: "Plain language. Talk like a thoughtful advisor.", dont: "Marketing-speak. Synergies. Unlock potential." },
  { do_: "Specific to the reader's situation. \"Auto-generate quote PDFs from intake.\"", dont: "Generic. \"Streamline your workflow.\"" },
  { do_: "Acknowledge trade-offs honestly.", dont: "Hype. \"Game-changing AI for $0.\"" },
  { do_: "Title-case headlines: \"Map the AI opportunities hiding in your business.\"", dont: "ALL CAPS HEADLINES OR ::: shouty :::" },
  { do_: "Use mono for metadata, serif for editorial, sans for body. Always.", dont: "Mix serif headings with sans-serif sub-headings inside the same block." },
  { do_: "Em-dashes — for asides. En-dashes – sparingly.", dont: "Use -- or - in body copy." },
  { do_: "Hairline rules and dot grids to add structure.", dont: "Drop shadows, gradients, glow effects, glassmorphism." },
  { do_: "Inline SVG line marks (≤ 1.5px stroke).", dont: "Emoji. Filled icons. Material icons. Bootstrap icons." },
];

const IMAGE_RULES = [
  "Background is always paper (#FAF8F1) — never white-white, never dark.",
  "Use the 24px dot grid as background texture at 9% opacity max.",
  "Black ink for almost everything. Blueprint blue for one focal accent per composition.",
  "Photography (if used) should be high-contrast, desaturated, document-like. No stock-feel glossy people.",
  "Logos and product specimens get a hairline border, never a drop shadow.",
  "Section numbers (§ 01) and mono breadcrumbs (// PROCESS) appear in headers and corners.",
  "Stamps used sparingly — once per composition max, rotated −2°.",
  "Avoid filling shapes with solid color. Prefer outline + hairline.",
];

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-paper text-ink relative">
      <div className="bp-grid pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="relative z-10">
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Mark />
              <span className="serif text-xl">SnapReport</span>
              <span className="mono text-[10px] tracking-[0.18em] text-ink-3 uppercase border border-rule px-1.5 py-0.5">
                /design
              </span>
            </Link>
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-2" title={VERSION_LABEL}>
              Internal · {VERSION_LABEL}
            </span>
          </div>
        </header>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-5xl px-6 py-24 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <div className="eyebrow mb-6 flex items-center gap-3">
                <span>§ ▢ · DESIGN GUIDELINES</span>
                <span className="annotation flex-1 max-w-xs" />
              </div>
              <h1 className="serif text-[72px] leading-[0.95] tracking-tight mb-8">
                The visual system,<br />
                <em>codified.</em>
              </h1>
              <p className="text-[17px] leading-[1.55] text-ink-2 max-w-xl">
                A single reference for everything we publish under the SnapReport name — landing pages, ads, social posts, email banners, cover images. If it carries our wordmark, it follows this.
              </p>
              <div className="mt-10 flex items-center gap-6 mono text-[11px] uppercase tracking-[0.12em] text-ink-2">
                <span className="flex items-center gap-2"><Dot /> Internal use</span>
                <span className="flex items-center gap-2"><Dot /> Not indexed</span>
                <span className="flex items-center gap-2"><Dot /> Living document</span>
              </div>
            </div>
            <aside className="md:col-span-4 md:border-l md:border-rule md:pl-8">
              <div className="eyebrow mb-4">Sections</div>
              <ol className="space-y-2 mono text-[12px]">
                {[
                  ["01", "Brand identity"],
                  ["02", "Palette"],
                  ["03", "Typography"],
                  ["04", "Structural elements"],
                  ["05", "Components"],
                  ["06", "Voice & tone"],
                  ["07", "Imagery rules"],
                  ["08", "Don'ts"],
                ].map(([n, t]) => (
                  <li key={n}>
                    <a href={`#s${n}`} className="flex items-baseline gap-3 text-ink-2 hover:text-ink transition">
                      <span className="text-ink-3">§ {n}</span>
                      <span className="font-sans text-sm">{t}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        {/* ── § 01 Brand identity ─────────────────────────────────── */}
        <Section id="s01" number="01" title="Brand identity">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-6 space-y-6">
              <Block label="Name" value={<span className="serif text-3xl">SnapReport</span>} />
              <Block label="Domain" value={<span className="mono text-[15px]">snapaireport.com</span>} />
              <Block label="One-line description" value={<span className="text-[15px] leading-relaxed">Your AI Business Assessment in 5 minutes.</span>} />
              <Block label="Long description" value={<span className="text-[15px] leading-relaxed text-ink-2">Free AI readiness report for SMBs. Answer 10 questions via a web form, Claude analyzes them, you get a tailored PDF report by email within minutes.</span>} />
              <Block label="Parent entity" value={<span className="text-[15px]">Giga Mega Consulting Inc. · Montreal</span>} />
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <div className="eyebrow mb-4">Wordmark + symbol</div>
              <div className="border border-rule p-10 bg-paper-2 flex items-center justify-center gap-4 mb-3">
                <Mark size={28} />
                <span className="serif text-3xl">SnapReport</span>
              </div>
              <div className="border border-rule p-10 bg-paper-2 flex items-center justify-center mb-3">
                <Mark size={56} />
              </div>
              <div className="border border-rule p-10 flex items-center justify-center" style={{ background: "var(--ink)", color: "var(--paper)" }}>
                <Mark size={28} />
                <span className="serif text-3xl ml-4">SnapReport</span>
              </div>
              <p className="mt-4 text-[12px] text-ink-2 italic leading-relaxed">
                Mark = a square frame with a rising vertex (the "snap" — analysis spike) and a basepoint dot (the data point). Always paired with the wordmark in the serif. Minimum size 14px square.
              </p>
            </div>
          </div>
        </Section>

        {/* ── § 02 Palette ────────────────────────────────────────── */}
        <Section id="s02" number="02" title="Palette">
          <p className="text-ink-2 leading-relaxed mb-10 max-w-2xl">
            Restrained on purpose. The whole system runs on two values (paper + ink) plus three accents used sparingly. Blueprint blue is the only color that can appear at scale; stamp red is reserved for warnings/stamps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
            {PALETTE.map((c) => (
              <div key={c.token} className="bg-paper p-5">
                <div
                  className="h-20 mb-4 border border-rule"
                  style={{ background: c.hex.startsWith("rgba") ? `linear-gradient(45deg, #FAF8F1 25%, transparent 25%) -10px 0, linear-gradient(-45deg, #FAF8F1 25%, transparent 25%) -10px 0, linear-gradient(45deg, transparent 75%, #FAF8F1 75%), linear-gradient(-45deg, transparent 75%, #FAF8F1 75%) , ${c.hex}` : c.hex, backgroundSize: c.hex.startsWith("rgba") ? "20px 20px" : undefined }}
                />
                <div className="flex items-baseline justify-between mb-1">
                  <span className="serif text-lg">{c.name}</span>
                  <span className="mono text-[10px] text-ink-3 uppercase tracking-[0.12em]">{c.hex}</span>
                </div>
                <div className="mono text-[10px] text-ink-3 uppercase tracking-[0.12em] mb-2">{c.token}</div>
                <p className="text-[12px] text-ink-2 leading-relaxed">{c.use}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── § 03 Typography ─────────────────────────────────────── */}
        <Section id="s03" number="03" title="Typography">
          <div className="grid md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-7">
              <p className="text-ink-2 leading-relaxed">
                Three families, each with one job. Don't substitute. Don't mix arbitrarily — a serif headline never sits next to a sans-serif sub-headline inside the same block.
              </p>
            </div>
            <div className="md:col-span-5 grid grid-cols-3 gap-px bg-rule border border-rule">
              <div className="bg-paper p-4">
                <div className="eyebrow mb-2">Display</div>
                <div className="serif text-3xl mb-1">Aa</div>
                <div className="mono text-[10px] text-ink-3 uppercase tracking-[0.1em]">Instrument Serif</div>
              </div>
              <div className="bg-paper p-4">
                <div className="eyebrow mb-2">Body</div>
                <div className="text-3xl mb-1 font-medium">Aa</div>
                <div className="mono text-[10px] text-ink-3 uppercase tracking-[0.1em]">Inter</div>
              </div>
              <div className="bg-paper p-4">
                <div className="eyebrow mb-2">Mono</div>
                <div className="mono text-3xl mb-1">Aa</div>
                <div className="mono text-[10px] text-ink-3 uppercase tracking-[0.1em]">JetBrains Mono</div>
              </div>
            </div>
          </div>

          <div className="eyebrow mb-4">Scale</div>
          <div className="border border-rule">
            {TYPE_SCALE.map((t, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-6 ${i < TYPE_SCALE.length - 1 ? "border-b border-rule" : ""}`}
              >
                <div className="md:col-span-8 overflow-hidden">
                  <div className={t.className}>{t.sample}</div>
                </div>
                <div className="md:col-span-4 md:border-l md:border-rule md:pl-4 flex flex-col justify-center">
                  <span className="mono text-[10px] uppercase tracking-[0.12em] text-ink-3">{t.role}</span>
                  <span className="mono text-[11px] text-ink-2 mt-1">{t.family}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── § 04 Structural elements ────────────────────────────── */}
        <Section id="s04" number="04" title="Structural elements">
          <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
            <Specimen
              label="Hairline rule"
              note="Section + content dividers. 1px, --rule color."
            >
              <div className="w-full border-b border-rule h-px" />
            </Specimen>

            <Specimen
              label="Strong rule"
              note="Field underlines, annotation baselines. 1px, --rule-strong."
            >
              <div className="w-full border-b border-rule-strong h-px" />
            </Specimen>

            <Specimen
              label="Dot grid (background)"
              note="24px lattice, radial dot, 9% opacity. Use .bp-grid utility."
            >
              <div className="bp-grid h-20 w-full" />
            </Specimen>

            <Specimen
              label="Dashed annotation"
              note="Use to connect labels to objects, or as accent break."
            >
              <div className="annotation w-full" />
            </Specimen>

            <Specimen
              label="Section number"
              note="JetBrains Mono · 11px · 0.12em tracking · uppercase. Always prefixed with §."
            >
              <span className="eyebrow">§ 04 · STRUCTURE</span>
            </Specimen>

            <Specimen
              label="Mono breadcrumb"
              note="For editorial framing. Always // prefixed and uppercase."
            >
              <span className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2">
                // END OF PROSPECTUS
              </span>
            </Specimen>

            <Specimen
              label="Corner tick frame"
              note=".tick-frame on a bordered container. Adds 10×10 corner ticks."
            >
              <div className="tick-frame border border-ink p-6 w-full">
                <span className="mono text-[11px] uppercase tracking-[0.12em]">
                  Framed content
                </span>
              </div>
            </Specimen>

            <Specimen
              label="Stamp"
              note="Rotated −2°, stamp red border + text. Maximum one per composition."
            >
              <span className="stamp">Limited · Cohort 01</span>
            </Specimen>
          </div>
        </Section>

        {/* ── § 05 Components ─────────────────────────────────────── */}
        <Section id="s05" number="05" title="Components">
          <div className="space-y-12">
            {/* Buttons */}
            <div>
              <div className="eyebrow mb-4">Buttons</div>
              <div className="border border-rule p-8 bg-paper-2/40 flex flex-wrap items-center gap-4">
                <button className="btn-ink">
                  <span>Primary action</span>
                  <Arrow />
                </button>
                <button className="btn-ghost">
                  <span>Secondary action</span>
                </button>
                <button className="btn-ink" disabled>
                  <span>Disabled</span>
                </button>
              </div>
              <p className="mt-3 text-[12px] text-ink-2 italic">
                Primary = ink bg, paper text. Hover transitions to blueprint blue. Secondary = paper bg, ink text, rule-strong border.
              </p>
            </div>

            {/* Form field */}
            <div>
              <div className="eyebrow mb-4">Form field</div>
              <div className="border border-rule p-8 bg-paper-2/40">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">Q01</span>
                  <label className="serif text-xl leading-tight">Your business name<span className="text-stamp ml-1">*</span></label>
                </div>
                <p className="text-[13px] text-ink-2 mb-3 italic">Helper text in italic, lower contrast.</p>
                <input className="field" placeholder="Acme Plumbing" />
              </div>
              <p className="mt-3 text-[12px] text-ink-2 italic">
                Underline-only input. Serif placeholder in italic. Focus state: underline becomes blueprint blue.
              </p>
            </div>

            {/* Card */}
            <div>
              <div className="eyebrow mb-4">Card (process step / deliverable)</div>
              <div className="border border-rule p-8 bg-paper-2/40 max-w-sm">
                <div className="bg-paper p-6 border border-rule">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3">Step</span>
                    <span className="serif text-5xl text-ink leading-none">02</span>
                  </div>
                  <h3 className="serif text-xl mb-3 leading-tight">Claude reads them</h3>
                  <p className="text-[13px] text-ink-2 leading-relaxed mb-4">
                    Your answers are analyzed by Claude — pattern-matched against thousands of SMB profiles.
                  </p>
                  <div className="annotation w-full mb-2" />
                  <span className="mono text-[10px] uppercase tracking-[0.12em] text-ink-2">
                    ≈ 30 seconds
                  </span>
                </div>
              </div>
            </div>

            {/* Specimen frame */}
            <div>
              <div className="eyebrow mb-4">Specimen frame (Fig. nn)</div>
              <div className="border border-rule p-8 bg-paper-2/40">
                <div className="max-w-sm">
                  <div className="border border-rule-strong bg-paper-2 p-5">
                    <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-rule">
                      <span className="mono text-[9px] uppercase tracking-[0.18em] text-ink-3">Specimen · 2026.05</span>
                      <span className="mono text-[9px] text-ink-3">PG 01 / 07</span>
                    </div>
                    <div className="serif text-base leading-tight mb-1">Title in serif</div>
                    <div className="mono text-[10px] text-ink-2 uppercase tracking-[0.12em]">Subtitle in mono</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                    <span>Fig. 04</span>
                    <span>Specimen frame</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── § 06 Voice & tone ───────────────────────────────────── */}
        <Section id="s06" number="06" title="Voice & tone">
          <p className="text-ink-2 leading-relaxed mb-10 max-w-2xl">
            We talk like a thoughtful advisor, not a marketer. Specific, not generic. Plain language, not jargon. We acknowledge trade-offs. We don't use exclamation marks.
          </p>

          <div className="border border-rule">
            <div className="grid grid-cols-2 mono text-[10px] uppercase tracking-[0.12em] text-ink-3 border-b border-rule">
              <div className="p-4 border-r border-rule">Do</div>
              <div className="p-4">Don&apos;t</div>
            </div>
            {VOICE.map((v, i) => (
              <div key={i} className={`grid grid-cols-2 ${i < VOICE.length - 1 ? "border-b border-rule" : ""}`}>
                <div className="p-4 border-r border-rule text-[14px] leading-relaxed">
                  <span className="serif italic text-ink-3 mr-2">✓</span>
                  {v.do_}
                </div>
                <div className="p-4 text-[14px] leading-relaxed text-ink-2">
                  <span className="serif italic text-stamp mr-2">×</span>
                  {v.dont}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── § 07 Imagery rules ──────────────────────────────────── */}
        <Section id="s07" number="07" title="Imagery rules — for ads, social, covers">
          <p className="text-ink-2 leading-relaxed mb-10 max-w-2xl">
            Every external image (ad creative, social post, OG image, email banner) follows these rules. If a design doesn&apos;t pass this checklist, redo it.
          </p>

          <ol className="border border-rule">
            {IMAGE_RULES.map((rule, i) => (
              <li
                key={i}
                className={`flex items-start gap-5 px-6 py-5 ${i < IMAGE_RULES.length - 1 ? "border-b border-rule" : ""}`}
              >
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink-3 pt-1 min-w-[28px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-relaxed">{rule}</span>
              </li>
            ))}
          </ol>

          {/* Examples grid */}
          <div className="mt-10">
            <div className="eyebrow mb-4">Reference compositions</div>
            <div className="grid md:grid-cols-3 gap-px bg-rule border border-rule">
              {/* Composition A: hero-style ad */}
              <div className="bg-paper p-6 aspect-[4/5]">
                <div className="bp-grid h-full relative border border-rule p-4 flex flex-col">
                  <div className="flex items-baseline justify-between mb-auto">
                    <Mark size={14} />
                    <span className="mono text-[9px] uppercase tracking-[0.18em] text-ink-3">Fig. 01 · AD</span>
                  </div>
                  <div className="serif text-2xl leading-tight mb-3">
                    Map the AI<br /><em>opportunities</em>
                  </div>
                  <div className="annotation w-2/3 mb-2" />
                  <span className="mono text-[9px] uppercase tracking-[0.12em] text-ink-2">
                    snapaireport.com
                  </span>
                </div>
              </div>

              {/* Composition B: social card */}
              <div className="bg-paper p-6 aspect-[4/5]">
                <div className="h-full border border-rule-strong p-4 flex flex-col bg-paper-2/40 relative">
                  <span className="eyebrow mb-3">§ 01 · WHY NOW</span>
                  <div className="serif text-xl leading-tight mb-auto">
                    Most SMBs are still spending hours on work an AI could do in minutes.
                  </div>
                  <div className="flex items-baseline justify-between mt-4 pt-3 border-t border-rule">
                    <span className="mono text-[9px] uppercase tracking-[0.18em] text-ink-3">SnapReport · v{VERSION}</span>
                    <Arrow />
                  </div>
                </div>
              </div>

              {/* Composition C: data card */}
              <div className="bg-paper p-6 aspect-[4/5]">
                <div className="h-full border border-rule p-4 flex flex-col">
                  <span className="eyebrow mb-4">§ 02 · METRIC</span>
                  <div className="serif text-[64px] leading-none mb-2">68<span className="text-ink-3 text-3xl">/100</span></div>
                  <div className="mono text-[10px] uppercase tracking-[0.12em] text-ink-2 mb-auto">AI readiness · avg.</div>
                  <div className="h-1 bg-rule mb-3">
                    <div className="h-full bg-ink" style={{ width: "68%" }} />
                  </div>
                  <span className="mono text-[9px] uppercase tracking-[0.18em] text-ink-3">Get your score · snapaireport.com</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-[12px] text-ink-2 italic max-w-2xl">
              Each composition has: paper background, dot-grid or hairline frame, one editorial element (serif headline OR big number), mono metadata at top and/or bottom, single accent ratio.
            </p>
          </div>
        </Section>

        {/* ── § 08 Don'ts ─────────────────────────────────────────── */}
        <Section id="s08" number="08" title="Hard don'ts">
          <p className="text-ink-2 leading-relaxed mb-10 max-w-2xl">
            These are non-negotiable. If anything here shows up in a published asset, it&apos;s an error.
          </p>
          <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
            {[
              "Drop shadows on cards, buttons, or text",
              "Gradients (background, button, or overlay)",
              "Emoji in body copy or as icons in components",
              "Dark mode / dark backgrounds (this is a paper brand)",
              "Stock photography of smiling people in offices",
              "More than one accent color per composition",
              "Sans-serif headlines on top of body copy",
              "All-caps headlines or sentences",
              "Filled icons or colorful icon sets (Material, Lucide, etc.)",
              "Glassmorphism / blur effects",
              "Rounded corners larger than 4px on cards",
              "Skeuomorphic textures (paper texture overlays, noise filters)",
            ].map((d) => (
              <div key={d} className="bg-paper p-5 flex items-start gap-3">
                <span className="serif italic text-stamp text-lg leading-none mt-0.5">×</span>
                <span className="text-[14px] leading-relaxed">{d}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="border-t border-rule">
          <div className="mx-auto max-w-5xl px-6 py-8 flex items-center justify-between text-[12px] text-ink-2">
            <div className="flex items-center gap-3">
              <Mark size={14} />
              <span className="mono">SnapReport · /design</span>
              <span className="mono text-ink-3">·</span>
              <span className="mono text-ink-3">Internal reference</span>
            </div>
            <div className="flex items-center gap-6 mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
              <Link href="/" className="hover:text-ink transition">← Home</Link>
              <span title={VERSION_LABEL}>{VERSION_LABEL}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ─── Helpers ──────────────────────────────────────────────────── */

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-3">
            <div className="eyebrow mb-2">§ {number}</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="serif text-4xl md:text-5xl leading-[1.05] tracking-tight">
              {title}
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-12 md:col-start-1">{children}</div>
        </div>
      </div>
    </section>
  );
}

function Block({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-b border-rule pb-4">
      <div className="eyebrow mb-2">{label}</div>
      <div>{value}</div>
    </div>
  );
}

function Specimen({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-paper p-6">
      <div className="eyebrow mb-3">{label}</div>
      <div className="flex items-center min-h-[60px] py-4">{children}</div>
      <p className="mt-3 text-[12px] text-ink-2 italic leading-relaxed">{note}</p>
    </div>
  );
}

function Mark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <rect x="0.5" y="0.5" width="17" height="17" stroke="currentColor" />
      <path d="M4 13 L9 4 L14 13" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="9" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path d="M1 5 H12 M8 1 L12 5 L8 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Dot() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6">
      <circle cx="3" cy="3" r="3" fill="currentColor" />
    </svg>
  );
}

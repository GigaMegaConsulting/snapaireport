import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-white">
            AI Clarity
          </div>
          <nav className="flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm text-slate-300 hover:text-white transition">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm text-slate-300 hover:text-white transition">
              Pricing
            </Link>
            <Link
              href="#book"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
            >
              Book Free Assessment
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="inline-block rounded-full bg-blue-600/10 border border-blue-500/20 px-4 py-1.5 text-sm text-blue-400 mb-6">
          🚀 First 3 assessments are free
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Find $10K+ in Hidden AI Opportunities in Your Business
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          A 20-minute voice call. A custom AI readiness report. Clear, actionable steps to cut costs and save time—without the guesswork.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="#book"
            className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-500 transition shadow-lg shadow-blue-600/20"
          >
            Book Your Free Assessment
          </Link>
          <Link
            href="#how-it-works"
            className="rounded-lg border border-slate-600 px-8 py-4 text-lg font-semibold text-slate-200 hover:bg-slate-800 transition"
          >
            See How It Works
          </Link>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mx-auto max-w-6xl px-6 py-12 text-center border-y border-slate-700/50">
        <p className="text-sm uppercase tracking-wider text-slate-400 mb-6">Trusted by</p>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {["Quebec SMBs", "Service Businesses", "Tech Consultants", "Marketing Agencies"].map((name) => (
            <div key={name} className="text-slate-500 font-medium">
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-lg text-slate-400">Three steps. Zero hassle. Massive clarity.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "20-Minute Voice Call",
              desc: "Our AI agent asks 10 structured questions about your business, operations, and goals. No prep needed.",
              icon: "🎙️",
            },
            {
              step: "2",
              title: "AI Analysis",
              desc: "Claude analyzes your answers and identifies AI opportunities, automation wins, and tool recommendations.",
              icon: "🧠",
            },
            {
              step: "3",
              title: "Custom Report",
              desc: "Get a PDF report with your AI Readiness Score, 3 quick wins, strategic opportunities, and next steps.",
              icon: "📊",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition"
            >
              <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {item.step}
              </div>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="mx-auto max-w-6xl px-6 py-20 bg-slate-800/30 rounded-2xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What You Get</h2>
          <p className="text-lg text-slate-400">A complete AI roadmap tailored to your business</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: "✅", title: "AI Readiness Score", desc: "1–100 score with breakdown by category (operations, marketing, sales, support)" },
            { icon: "🎯", title: "Top 3 Quick Wins", desc: "Low-cost, high-impact automations you can implement in 30 days" },
            { icon: "🚀", title: "Top 3 Strategic Opportunities", desc: "Bigger plays for 3–6 month horizon (e.g., AI sales agent, content pipeline)" },
            { icon: "⚠️", title: "Risk Flags", desc: "Blockers that could prevent AI adoption (tech debt, process gaps, team resistance)" },
            { icon: "🛠️", title: "Recommended Tools", desc: "Specific AI products with pricing, matched to your needs" },
            { icon: "📋", title: "Next Steps", desc: "Clear action plan with priorities and timelines" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <div className="text-3xl flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-slate-400">No setup fees. No hidden costs. Just clarity.</p>
        </div>
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-500 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
              LIMITED TIME
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">AI Business Assessment</h3>
            <div className="text-5xl font-bold text-white mb-6">
              FREE
              <span className="text-lg line-through text-blue-200 ml-3">$1,000</span>
            </div>
            <ul className="text-left text-white space-y-3 mb-8">
              {[
                "20-minute voice intake",
                "Custom AI readiness report",
                "Top 3 quick wins + strategic plays",
                "Tool recommendations",
                "Next steps action plan",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-200 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="#book"
              className="block w-full bg-white text-blue-700 font-bold py-4 rounded-lg hover:bg-blue-50 transition"
            >
              Book Your Free Spot
            </Link>
            <p className="text-blue-100 text-sm mt-4">Only 3 free spots available this month</p>
          </div>
          <div className="text-center mt-8 text-slate-400 text-sm">
            After your assessment, you can optionally hire us to implement the recommendations ($3,000–$5,000).
          </div>
        </div>
      </section>

      {/* CTA / Booking */}
      <section id="book" className="mx-auto max-w-4xl px-6 py-20">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your AI Opportunities?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Book your free 20-minute assessment. No prep, no commitment. Just clear, actionable insights.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="https://cal.com/gigamega/ai-assessment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-500 transition text-lg shadow-lg shadow-blue-600/20"
            >
              Book on Cal.com
            </Link>
            <p className="text-sm text-slate-500">Or email us: hello@gigamega.ca</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between text-sm text-slate-500">
          <div>© 2026 AI Clarity · Giga Mega Consulting Inc.</div>
          <div className="flex items-center gap-6">
            <Link href="mailto:hello@gigamega.ca" className="hover:text-white transition">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

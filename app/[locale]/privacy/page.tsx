import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n";
import { LocaleSwitch } from "@/components/LocaleSwitch";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  return {
    title: loc === "fr" ? "Confidentialité — SnapReport" : "Privacy — SnapReport",
    description:
      loc === "fr"
        ? "Comment SnapReport collecte, utilise et protège vos données."
        : "How SnapReport collects, uses, and protects your data.",
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const c = loc === "fr" ? FR : EN;

  return (
    <div className="min-h-screen bg-paper text-ink bp-grid">
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        {/* Back link + locale toggle */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/${loc}`}
            className="mono text-[11px] uppercase tracking-[0.18em] text-ink-2 hover:text-ink"
          >
            ← {c.back}
          </Link>
          <LocaleSwitch current={loc} />
        </div>

        {/* Title block */}
        <div className="mt-10 mb-12">
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-ink-2 mb-3">
            {c.eyebrow}
          </div>
          <h1 className="serif text-5xl md:text-6xl leading-[1.02] tracking-tight">
            {c.title}
          </h1>
          <p className="text-ink-2 mt-4 leading-relaxed max-w-2xl">
            {c.intro}
          </p>
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-ink-3 mt-6">
            {c.updated}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {c.sections.map((s) => (
            <section key={s.title} className="border-t border-rule pt-8">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  §&nbsp;{s.number}
                </span>
                <h2 className="serif text-2xl leading-tight">{s.title}</h2>
              </div>
              <div className="text-[15px] leading-relaxed text-ink-2 space-y-3">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.list && (
                  <ul className="list-disc pl-6 space-y-1.5 mt-2">
                    {s.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16 pt-8 border-t border-rule">
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-ink-2 mb-2">
            {c.contactEyebrow}
          </div>
          <p className="text-[15px] text-ink-2">
            {c.contactLine}{" "}
            <a
              href="mailto:info@snapaireport.com"
              className="text-ink underline underline-offset-4"
            >
              info@snapaireport.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Copy ────────────────────────────────────────────────────────────

const EN = {
  back: "Back to SnapReport",
  eyebrow: "Privacy notice",
  title: "How we handle your data.",
  intro:
    "SnapReport is a free AI readiness report for small businesses. To produce that report we collect a small amount of information about your business. This page explains what, why, and what you can do about it.",
  updated: "Last updated · May 2026",
  contactEyebrow: "Questions",
  contactLine: "Email us at",
  sections: [
    {
      number: "01",
      title: "What we collect",
      body: [
        "When you fill out the assessment form, we collect the information you submit:",
      ],
      list: [
        "Your name and email address",
        "Your business name and a short description",
        "How long you've been operating, team size, and where your team works",
        "How your customers reach you, your day-to-day tools, and where your leads come from",
        "Your bottlenecks, prior AI experience, and 12-month goals",
        "Anything else you choose to write in the open-ended field",
      ],
    },
    {
      number: "02",
      title: "Why we collect it",
      body: [
        "The only reason we collect this information is to produce your AI readiness report. We feed your answers into an AI model (Anthropic's Claude) that drafts the report; we then render it as a PDF and email it to you.",
        "We also use your email address to send you the finished report, and — only if you click the booking link inside the email — to let you schedule a follow-up call through Cal.com.",
      ],
    },
    {
      number: "03",
      title: "Who can see it",
      body: [
        "Your submission and the generated report are visible only to:",
      ],
      list: [
        "The operator of SnapReport (one person, based in Montréal)",
        "Anthropic, the AI provider whose model drafts your report — under their commercial terms (they do not train on customer data by default)",
        "Resend, the email service that delivers the PDF to your inbox",
        "GitHub, where the encrypted queue of submissions is stored for processing",
        "Vercel, our web host",
      ],
    },
    {
      number: "04",
      title: "How long we keep it",
      body: [
        "We keep your submission and the generated report indefinitely while SnapReport is operating, so we can re-send a copy if you ask. If you want your submission deleted, write to us at the email below and we will remove it within 30 days.",
        "Server logs (IP addresses, timestamps) are retained by Vercel for up to 30 days for security and abuse prevention, then automatically purged.",
      ],
    },
    {
      number: "05",
      title: "What we don't do",
      body: [
        "We don't sell your data. We don't share it with advertising networks. We don't combine it with data from third parties to build a profile of you. We don't use it to train AI models.",
        "Anthropic, the provider whose model generates your report, contractually does not train on customer data under our usage tier.",
      ],
    },
    {
      number: "06",
      title: "Your rights",
      body: [
        "Under Quebec's Law 25 and Canada's PIPEDA you have the right to:",
      ],
      list: [
        "Access the personal information we hold about you",
        "Correct anything that's inaccurate",
        "Ask us to delete your data",
        "Withdraw consent at any time (which means we delete your submission and stop sending you anything)",
        "Lodge a complaint with the Commission d'accès à l'information du Québec",
      ],
    },
    {
      number: "07",
      title: "Cookies and analytics",
      body: [
        "The site uses Google Analytics to measure aggregate traffic (page views, locale, country). Analytics events are anonymised at the IP level. We do not use any advertising cookies.",
        "We do not require you to accept cookies to use the site. Your browser's Do Not Track preference is respected.",
      ],
    },
  ],
};

const FR = {
  back: "Retour à SnapReport",
  eyebrow: "Avis de confidentialité",
  title: "Comment nous traitons vos données.",
  intro:
    "SnapReport est un rapport d'aptitude à l'IA gratuit pour les PME. Pour le produire, nous collectons un peu d'information sur votre entreprise. Cette page explique quoi, pourquoi, et ce que vous pouvez en faire.",
  updated: "Dernière mise à jour · Mai 2026",
  contactEyebrow: "Questions",
  contactLine: "Écrivez-nous à",
  sections: [
    {
      number: "01",
      title: "Ce que nous collectons",
      body: [
        "Quand vous remplissez le formulaire d'évaluation, nous collectons l'information que vous nous soumettez :",
      ],
      list: [
        "Votre nom et courriel",
        "Le nom de votre entreprise et une courte description",
        "Depuis quand vous êtes en activité, la taille de l'équipe, et où elle travaille",
        "Comment vos clients vous contactent, vos outils quotidiens, et d'où viennent vos prospects",
        "Vos freins, votre expérience passée avec l'IA, et vos objectifs sur 12 mois",
        "Tout ce que vous choisissez d'ajouter dans le champ libre",
      ],
    },
    {
      number: "02",
      title: "Pourquoi nous la collectons",
      body: [
        "La seule raison pour laquelle nous collectons cette information, c'est pour produire votre rapport d'aptitude à l'IA. Vos réponses sont envoyées à un modèle IA (Claude, d'Anthropic) qui rédige le rapport ; nous le rendons ensuite en PDF et vous l'envoyons par courriel.",
        "Nous utilisons aussi votre adresse pour vous livrer le rapport et — seulement si vous cliquez sur le lien de réservation dans le courriel — pour vous permettre de planifier un appel via Cal.com.",
      ],
    },
    {
      number: "03",
      title: "Qui peut la voir",
      body: [
        "Votre soumission et le rapport généré ne sont visibles que par :",
      ],
      list: [
        "L'opérateur de SnapReport (une personne, à Montréal)",
        "Anthropic, le fournisseur IA dont le modèle rédige votre rapport — selon ses conditions commerciales (n'entraîne pas par défaut sur les données clients)",
        "Resend, le service courriel qui livre le PDF dans votre boîte",
        "GitHub, où la file de soumissions chiffrée est stockée pour traitement",
        "Vercel, notre hébergeur web",
      ],
    },
    {
      number: "04",
      title: "Combien de temps nous la conservons",
      body: [
        "Nous conservons votre soumission et le rapport généré tant que SnapReport est en activité, afin de pouvoir vous renvoyer une copie sur demande. Si vous voulez que votre soumission soit supprimée, écrivez-nous à l'adresse plus bas et nous la retirerons sous 30 jours.",
        "Les journaux serveur (adresses IP, horodatages) sont conservés par Vercel pendant 30 jours maximum pour la sécurité, puis purgés automatiquement.",
      ],
    },
    {
      number: "05",
      title: "Ce que nous ne faisons pas",
      body: [
        "Nous ne vendons pas vos données. Nous ne les partageons pas avec des réseaux publicitaires. Nous ne les combinons pas avec des sources tierces pour bâtir un profil de vous. Nous ne les utilisons pas pour entraîner des modèles IA.",
        "Anthropic, le fournisseur dont le modèle génère votre rapport, n'entraîne pas sur les données clients selon notre palier d'utilisation.",
      ],
    },
    {
      number: "06",
      title: "Vos droits",
      body: [
        "Selon la Loi 25 du Québec et la LPRPDE du Canada, vous avez le droit de :",
      ],
      list: [
        "Accéder aux renseignements personnels que nous détenons sur vous",
        "Faire corriger toute inexactitude",
        "Demander la suppression de vos données",
        "Retirer votre consentement à tout moment (votre soumission est alors supprimée)",
        "Déposer une plainte auprès de la Commission d'accès à l'information du Québec",
      ],
    },
    {
      number: "07",
      title: "Témoins et analyses",
      body: [
        "Le site utilise Google Analytics pour mesurer le trafic agrégé (pages vues, langue, pays). Les événements sont anonymisés au niveau IP. Nous n'utilisons aucun témoin publicitaire.",
        "Vous n'avez pas à accepter de témoins pour utiliser le site. La préférence « Do Not Track » de votre navigateur est respectée.",
      ],
    },
  ],
};

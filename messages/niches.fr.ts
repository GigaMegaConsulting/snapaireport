import type { NicheMessages } from "./niches.en";

const fr: NicheMessages = {
  lawyers: {
    slug: "lawyers",
    badge: "Pour les avocats",
    eyebrow: "§ 00 · CABINET D'AVOCATS",
    headline: [
      "La feuille de route IA",
      "pour votre cabinet",
      "— en 5 minutes."],
    headlineItalicIndex: 1,
    lead:
      "Sommaires de découverte. Rédaction des requêtes standards. Triage des appels d'admission. Conciliation des heures facturables. Il y a un usage de l'IA pour chaque fuite d'heures facturables dans votre pratique — et 10 questions suffisent pour cartographier les vôtres.",
    badges: [
      "Conçu pour les cabinets de petite taille",
      "Québec et Ontario",
      "Aucun logiciel à installer",
    ],
    bottlenecks: {
      title: ["Les fuites que", "tout petit cabinet a."],
      titleItalicIndex: 1,
      lead:
        "La plupart des avocats à qui nous parlons perdent 8 à 12 heures par semaine sur la même poignée de tâches administratives. L'IA prend en charge le gros volume — vous facturez le travail qui vous demande vraiment.",
      items: [
        {
          tag: "01",
          title: "Admission et vérification de conflits",
          desc:
            "L'IA filtre les premiers appels et courriels, vérifie les conflits d'intérêts contre votre base de dossiers, prend en charge les rendez-vous des leads qualifiés. Fini les pertes de temps avec des curieux.",
        },
        {
          tag: "02",
          title: "Premières versions de plaidoiries et requêtes",
          desc:
            "Requêtes types, lettres de règlement, conventions d'honoraires — rédigées en quelques secondes à partir de vos gabarits de cabinet et des faits propres au dossier. Vous révisez, vous ne rédigez plus.",
        },
        {
          tag: "03",
          title: "Examen de la communication préalable",
          desc:
            "Traitement en lot des productions de la partie adverse. Étiquetage automatique des documents privilégiés, sommaire des courriels clés, signalement des incohérences. Une semaine de travail d'avocat junior → un après-midi.",
        },
        {
          tag: "04",
          title: "Saisie des heures facturables",
          desc:
            "L'IA analyse vos courriels, votre calendrier et vos modifications de documents — reconstitue vos heures facturables a posteriori. Récupère les appels de 15 minutes que vous avez oublié de noter.",
        },
        {
          tag: "05",
          title: "Communication client",
          desc:
            "Mises à jour de dossier auto-rédigées après chaque dépôt ou jalon. Approuvez et envoyez en un clic. Les clients se sentent informés ; vous ne perdez plus une heure par semaine en courriels de suivi.",
        },
        {
          tag: "06",
          title: "Comptabilité en fiducie et révision des factures",
          desc:
            "Conciliation des comptes en fiducie avec les comptes d'exploitation, signalement des entrées suspectes, préparation de rapports conformes au Barreau. Repère les erreurs avant la saison de vérification.",
        },
      ],
    },
    closingHeadline:
      "Dix questions séparent votre cabinet d'une feuille de route IA sur mesure — pensée pour la façon dont les avocats travaillent vraiment.",
  },

  accountants: {
    slug: "accountants",
    badge: "Pour les comptables",
    eyebrow: "§ 00 · COMPTABILITÉ",
    headline: [
      "La feuille de route IA",
      "pour votre firme",
      "— en 5 minutes."],
    headlineItalicIndex: 1,
    lead:
      "Nettoyage de tenue de livres. Relance de documents clients. Premières versions des déclarations. Travail sur le terrain pour vos vérifications. Il y a un usage de l'IA pour chaque heure que votre équipe perd dans le travail répétitif — et 10 questions suffisent pour les cartographier.",
    badges: [
      "Conçu pour les firmes PME",
      "Québec et Ontario",
      "Aucun logiciel à installer",
    ],
    bottlenecks: {
      title: ["Le travail qui", "devrait être automatisé."],
      titleItalicIndex: 1,
      lead:
        "La plupart des firmes comptables à qui nous parlons perdent 30 à 40 % de leurs heures à la saisie de données, à la conciliation et à la relance des clients pour des documents. L'IA prend en charge le volume répétitif — votre équipe se concentre sur le conseil.",
      items: [
        {
          tag: "01",
          title: "Saisie de documents et OCR",
          desc:
            "Le client envoie une pile de reçus et factures — l'IA extrait les montants, fournisseurs, comptes du grand livre, et les inscrit dans QuickBooks/Xero/Sage. Élimine le goulot de saisie.",
        },
        {
          tag: "02",
          title: "Conciliation bancaire et carte de crédit",
          desc:
            "L'IA fait correspondre les transactions aux factures, signale les entrées non appariées, rédige les écritures de journal pour révision. Réduit la fin de mois de 60 à 70 %.",
        },
        {
          tag: "03",
          title: "Premières versions des déclarations fiscales",
          desc:
            "Brouillons préliminaires T1/T2 (ou 1040/1120) générés à partir des documents clients et des déclarations de l'année précédente. Vous révisez et raffinez. Double votre débit en saison des impôts.",
        },
        {
          tag: "04",
          title: "Relance de documents clients",
          desc:
            "L'IA suit quels clients n'ont pas envoyé leurs déclarations de TPS/TVQ, leurs feuillets, ou leurs documents de fin d'année. Rédige les relances polies automatiquement. Vous approuvez et envoyez.",
        },
        {
          tag: "05",
          title: "Travail de vérification sur le terrain",
          desc:
            "L'IA fait tourner des analyses sur les grands livres clients — analyse d'écarts, ratios de référence, entrées inhabituelles. Met en évidence les zones de risque avant le début du terrain. Tests plus ciblés, moins d'heures senior.",
        },
        {
          tag: "06",
          title: "Préparation des notes de conseil",
          desc:
            "Auto-rédaction des lettres mensuelles/trimestrielles aux clients avec indicateurs clés, tendances de trésorerie, comparaison avec l'année précédente. Vous ajoutez l'insight stratégique. Bâtit du revenu-conseil sans gonfler les heures facturables.",
        },
      ],
    },
    closingHeadline:
      "Dix questions séparent votre firme d'une feuille de route IA sur mesure — pensée pour la façon dont les comptables travaillent vraiment.",
  },
};

export default fr;

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
    formIntro:
      "Pensé pour les cabinets d'avocats. Même formulaire de 5 minutes — les questions parlent le langage des dossiers, de l'admission et des heures facturables.",
    formOverrides: {
      businessName: { label: "Nom du cabinet", placeholder: "Tremblay Avocats" },
      businessDescription: {
        label: "Quel est votre domaine de pratique, et depuis combien de temps le cabinet est-il en activité ?",
        helper: "Solo, boutique, droit familial, litige civil, immobilier — une ou deux phrases suffisent.",
        placeholder: "Cabinet de droit familial de 3 avocats à Montréal. Fondé en 2018, surtout pour les résidents du Québec.",
      },
      teamSize: {
        label: "Combien d'avocats et de personnel de soutien dans le cabinet ?",
        placeholder: "3 avocats, 1 parajuriste, 1 gestionnaire de bureau",
      },
      teamLocation: {
        label: "Au bureau, à distance, ou hybride ?",
        placeholder: "Hybride — avocats au bureau 3 jours, personnel de soutien 5 jours",
      },
      operationsWalkthrough: {
        label: "Décrivez un dossier typique — de l'appel d'admission jusqu'à la fermeture.",
        helper: "Vérification de conflits, signature de mandat, rédaction, audiences, facturation, archives. Où passe vraiment le temps ?",
        placeholder: "Le client appelle ou remplit notre formulaire d'admission → vérification de conflits → consultation → mandat signé → dossier ouvert dans Clio → rédaction → audiences → facturation mensuelle → fermeture après l'ordonnance finale...",
      },
      toolsInUse: {
        label: "Quelle est votre pile de gestion de cabinet + techno ?",
        helper: "Gestion de cabinet (Clio, MyCase, PracticePanther), facturation, calendrier, gestion documentaire, signature électronique, dépôt judiciaire électronique.",
        placeholder: "Clio Manage pour la gestion + facturation, Microsoft 365 pour le courriel/docs, DocuSign pour les signatures, dépôt manuel via SOQUIJ...",
      },
      leadSources: {
        label: "D'où viennent les nouveaux clients ?",
        placeholder: "60 % références d'anciens clients + autres avocats, 25 % recherche Google, 10 % annuaires (Lawyers.com), 5 % autre",
      },
      bottlenecks: {
        label: "Où perdez-vous le plus d'heures facturables à de l'administratif ?",
        helper: "Admission/conflits, rédaction des requêtes types, examen de la communication préalable, saisie du temps, relance de factures, mises à jour client.",
        placeholder: "Rédaction des requêtes types (4 à 6 h/semaine par avocat). Saisie du temps — les associés oublient de noter les appels de 15 min. Relance des comptes à recevoir.",
      },
      priorAiExperience: {
        label: "Avez-vous essayé l'IA au cabinet ? Comment ça s'est passé ?",
        helper: "Spellbook, Casetext CoCounsel, Harvey, ChatGPT pour la rédaction, Claude — tout ce qui a touché un dossier.",
        placeholder: "Essayé ChatGPT pour les brouillons de courriels — correct, mais pas assez spécifique. Évalué Spellbook mais jamais déployé. Inquiet pour le secret professionnel sur les outils en ligne.",
      },
      twelveMonthGoals: {
        label: "À quoi ressemble une belle année qui vient pour le cabinet ?",
        placeholder: "Ajouter 1 avocat sans agrandir le personnel de soutien. Passer le taux de réalisation de 82 % à 90 %. Arrêter de travailler le dimanche.",
      },
      automationWish: {
        label: "Si vous pouviez automatiser une seule chose au cabinet demain matin, ce serait quoi ?",
        placeholder: "Mises à jour aux clients après chaque dépôt et audience — ça gruge 30 min/jour à travers les associés.",
      },
    },
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
    formIntro:
      "Pensé pour les firmes comptables et de tenue de livres. Même formulaire de 5 minutes — les questions parlent le langage des balances de vérification, des T1 et de la saison des impôts.",
    formOverrides: {
      businessName: { label: "Nom de la firme", placeholder: "Tremblay CPA" },
      businessDescription: {
        label: "Quelle est la composition de votre pratique, et depuis combien de temps êtes-vous en activité ?",
        helper: "Tenue de livres, prép. d'impôts, vérification, conseil — ou tout ça. Solo, boutique, régional.",
        placeholder: "Firme CPA boutique de 5 personnes à Montréal. ~60 % prép. d'impôts, 30 % tenue de livres, 10 % conseil. Fondée en 2014.",
      },
      teamSize: {
        label: "Combien de personnes au total — associés, comptables, teneurs de livres, admin ?",
        placeholder: "2 associés (CPA), 2 comptables, 1 teneuse de livres, 1 admin",
      },
      teamLocation: {
        label: "Au bureau, à distance, ou hybride ?",
        placeholder: "Surtout à distance depuis 2020, les associés sont au bureau 2 jours/sem, l'admin à temps plein",
      },
      operationsWalkthrough: {
        label: "Décrivez un engagement client typique — de l'intégration à la livraison.",
        helper: "Lettre de mission, collecte des documents, tenue de livres, prép. d'impôts, révision, signature, facturation. Où passe le temps du personnel ?",
        placeholder: "Lettre de mission signée → on les configure dans QBO → tenue mensuelle → révision trimestrielle → collecte des docs de fin d'année → prép. T2 → révision associé → e-dépôt → facturation en 3 versements...",
      },
      toolsInUse: {
        label: "Quelle est votre pile comptable + gestion de pratique ?",
        helper: "Comptabilité (QBO, Xero, Sage), gestion (Karbon, TaxDome, Canopy), impôts (CCH iFirm, ProFile, TaxCycle), gestion documentaire, signature électronique.",
        placeholder: "QBO Accountant pour les livres clients, ProFile pour T1/T2, Karbon pour le flux + portail client, Dext pour la capture de reçus, DocuSign pour les lettres de mission...",
      },
      leadSources: {
        label: "D'où viennent les nouveaux clients ?",
        placeholder: "70 % références d'anciens clients + autres pros (avocats, conseillers financiers), 20 % recherche Google, 10 % autre",
      },
      bottlenecks: {
        label: "Où le temps du personnel est-il englouti ?",
        helper: "Relance des documents clients, saisie de données, conciliation, crunch saison des impôts, prép. des notes de conseil, recouvrement des comptes.",
        placeholder: "Relance des docs fiscaux des clients (fév-avr c'est brutal). Conciliation bancaire sur des fichiers QBO bordéliques. Saisie manuelle pour les clients qui envoient encore des PDF de reçus.",
      },
      priorAiExperience: {
        label: "Avez-vous essayé l'IA à la firme ? Comment ça s'est passé ?",
        helper: "Dext, Hubdoc, Botkeeper, Karbon AI, ChatGPT pour la rédaction, outils de recherche fiscale — tout ce que vous avez testé.",
        placeholder: "On utilise Dext pour l'OCR des reçus — ça marche. Essayé ChatGPT pour les courriels clients, correct mais générique. Inquiet pour la confidentialité, donc on n'est pas allé plus loin.",
      },
      twelveMonthGoals: {
        label: "À quoi ressemble une belle année qui vient pour la firme ?",
        placeholder: "Faire passer le conseil de 10 % à 25 % des revenus. Réduire de moitié les heures sup. en saison des impôts. Embaucher 1 comptable sans perdre de marge.",
      },
      automationWish: {
        label: "Si vous pouviez automatiser une seule chose à la firme demain matin, ce serait quoi ?",
        placeholder: "Relancer les clients qui n'ont pas envoyé leurs docs fiscaux — on dirait un emploi à temps partiel en mars.",
      },
    },
  },
};

export default fr;

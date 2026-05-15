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
      "Sommaires de découverte. Rédaction des requêtes standards. Triage des appels d'admission. Conciliation des heures facturables. Il y a un usage de l'IA pour chaque fuite d'heures facturables dans votre pratique — et ~5 minutes sur un court formulaire suffisent pour les cartographier.",
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
      "~5 minutes séparent votre cabinet d'une feuille de route IA sur mesure — pensée pour la façon dont les avocats travaillent vraiment.",
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
      anythingElse: {
        helper:
          "Contraintes liées au secret professionnel, directives du Barreau à anticiper, un associé qui résistera à tout changement, une migration de système qui a marqué l'équipe — tout ce qui colore le réaliste.",
        placeholder:
          "On est en pleine migration vers Clio depuis un système legacy ; les associés sont épuisés par ça. Le Barreau du Québec resserre ses directives sur l'IA en droit — on veut des recommandations qui vieilliront bien.",
      },
    },
    sample: {
      profile: {
        business: "Tremblay Avocats",
        city: "Montréal · QC",
        years: "6 ans en activité",
        team: "3 avocats + 1 parajuriste + 1 gestionnaire de bureau",
        industry: "Cabinet boutique en droit familial (divorce, garde, séparation)",
        revenue: "≈ 1,6 M$ annuel",
      },
      answers: [
        { q: "Que fait votre cabinet, et depuis combien de temps ?", a: "Cabinet boutique en droit familial à Montréal. Surtout des divorces et des dossiers de garde pour résidents du Québec. 6 ans dans le métier, fondé par Maud Tremblay en 2020 après 12 ans dans un grand cabinet. On vise le règlement à l'amiable d'abord, on plaide quand il faut." },
        { q: "Combien d'avocats et de personnel de soutien, et où travaillent-ils ?", a: "3 avocats — Maud (associée senior), Léo (avocat senior), Émilie (junior). Plus une parajuriste et une gestionnaire de bureau. Surtout au bureau ; les avocats travaillent de la maison les vendredis." },
        { q: "Décrivez un dossier typique — de l'admission à la fermeture.", a: "Le client appelle ou remplit notre formulaire d'admission → la parajuriste fait la vérification de conflits → consultation découverte de 30 min (gratuite) → si ça colle, mandat signé via DocuSign → dossier ouvert dans Clio → travail consigné dans le dossier → dépôts judiciaires via SOQUIJ (manuel), audiences, négociations → facturation aux 2 semaines via Clio → fermeture après le jugement final ou règlement signé." },
        { q: "Quelle est votre pile de gestion + techno ?", a: "Clio Manage pour la gestion, la facturation, la saisie du temps et la gestion documentaire. Microsoft 365 pour courriel et Word. DocuSign pour mandats et règlements. SOQUIJ pour le dépôt judiciaire (toujours manuel). LexisAdvance pour la recherche. Pas d'IA en production pour l'instant." },
        { q: "D'où viennent les nouveaux clients ?", a: "70 % références — anciens clients et autres avocats (on est bien connus en droit familial). 20 % recherche Google (on est bien classés pour « avocat famille Montréal » et « divorce Montréal »). 10 % annuaires (Lawyers.com, Juristes du Québec)." },
        { q: "Où perdez-vous le plus d'heures facturables à de l'administratif ?", a: "Rédaction des requêtes types — demandes de mesures provisoires, ordonnances de séparation, demandes de garde partagée. Chaque requête c'est 80 % de gabarit + 20 % de faits spécifiques. Chaque avocat perd 4 à 6 h/semaine là-dessus. La saisie du temps c'est l'autre fuite — les associés oublient de noter les appels de 15 min et les courriels rapides. Le taux de réalisation reste à 85 % alors qu'il devrait être à 92 %." },
        { q: "Avez-vous essayé l'IA au cabinet ? Comment ça s'est passé ?", a: "Essayé ChatGPT pour les premiers brouillons de courriels à la partie adverse — ça marche, mais ça nous met mal à l'aise sur le secret professionnel. On a regardé Spellbook mais on n'a jamais déployé ; Léo l'utiliserait, les autres non. Prudent sur l'IA en nuage avec des données clients — le Barreau du Québec a des règles." },
        { q: "Sur 1 à 10, à quel point votre équipe est-elle à l'aise avec la nouvelle techno ?", a: "Parajuriste : 8. Léo : 8. Émilie : 7. Maud : 6. Gestionnaire de bureau : 7. Moyenne du cabinet : environ 7." },
        { q: "À quoi ressemble le succès dans les 12 prochains mois ?", a: "Ajouter 1 avocat senior sans augmenter le personnel de soutien. Passer le taux de réalisation de 85 % à 92 %. Arrêter de travailler le dimanche — les associés font 55 h/semaine, on veut être à 45 h." },
        { q: "Si vous pouviez automatiser une seule chose demain matin, ce serait quoi ?", a: "Les mises à jour aux clients après chaque dépôt ou audience. Là, Sarah (gestionnaire) rédige les brouillons et l'avocat de tête révise. Ça gruge 30 min/jour à travers les associés. Les clients demandent constamment « qu'est-ce qui se passe avec mon dossier » parce qu'on n'est pas assez proactifs." },
      ],
      report: {
        score: 71,
        breakdown: [
          { label: "Fondations numériques", v: 78 },
          { label: "Maturité des processus", v: 75 },
          { label: "Préparation de l'équipe", v: 72 },
          { label: "Qualité des données", v: 60 },
          { label: "Adhésion des dirigeants", v: 70 },
        ],
        summary: [
          "Tremblay Avocats est bien positionné pour l'IA : discipline solide sur les processus (Clio + DocuSign), culture menée par les associés, ouverte mais prudente sur le secret professionnel — le bon profil de départ.",
          "La rédaction des requêtes types est la plus grosse fuite — 4 à 6 h/semaine par avocat sur du travail à 80 % gabarit. Spellbook + une bibliothèque de requêtes propres au cabinet récupère 12 à 16 h/semaine au total.",
          "La saisie du temps est la fuite cachée. Les outils Auto-Time (intégré à Clio ou tiers) font passer le taux de réalisation de 85 % à ~92 % sans effort supplémentaire. C'est ~10 000 $/mois d'heures facturables qui existent déjà.",
        ],
        quickWins: [
          {
            tag: "QW.01",
            title: "Spellbook pour les premiers brouillons de requêtes",
            desc: "Spellbook s'intègre à Word. L'avocat ouvre un gabarit de requête, alimente Spellbook avec les faits du dossier depuis Clio, obtient un brouillon en 2 minutes au lieu de 90. Maud révise. Récupère 12 à 16 h/sem au cabinet sur les requêtes types.",
            impact: "Élevé",
            effort: "Faible",
            cost: "≈ 89 $/avocat/mois",
            eta: "2 semaines",
          },
          {
            tag: "QW.02",
            title: "Clio Auto-Time activé pour tout le cabinet",
            desc: "Auto-Time de Clio capture le temps à partir des événements de calendrier, des courriels et des modifications de documents — fini la saisie manuelle. Les associés cessent d'oublier les appels de 15 min. Taux de réalisation : 85 % → ~92 %. Inclus dans votre abonnement Clio actuel.",
            impact: "Élevé",
            effort: "Faible",
            cost: "Inclus dans Clio Suite",
            eta: "1 semaine",
          },
          {
            tag: "QW.03",
            title: "Triage d'admission par IA",
            desc: "Claude filtre les soumissions du formulaire web avant qu'elles arrivent à la parajuriste. Élimine les curieux, signale les conflits potentiels par rapport à la base Clio, suggère bon/mauvais ajustement. La parajuriste ne voit que des prospects préqualifiés. Économise ~3 h/sem.",
            impact: "Moyen",
            effort: "Faible",
            cost: "≈ 30 $/mois (API)",
            eta: "2 semaines",
          },
        ],
        strategic: [
          {
            tag: "SP.01",
            title: "Examen de la communication préalable par IA",
            desc: "Traitement en lot des productions de la partie adverse. Étiquetage automatique des documents privilégiés, sommaire des courriels par sujet, signalement des incohérences avec le témoignage du client. Une semaine de travail junior devient un après-midi. Particulièrement utile en garde contestée.",
            roi: "≈ 20 000 $/an d'heures junior récupérées",
            eta: "2 à 3 mois",
          },
          {
            tag: "SP.02",
            title: "IA pour la comptabilité en fiducie + conformité Barreau",
            desc: "Concilie les comptes en fiducie avec les comptes d'exploitation, signale les entrées suspectes, prépare les rapports conformes au Barreau automatiquement. Repère les erreurs avant la saison de vérification. Le Barreau du Québec a des règles strictes ; un garde-fou IA réduit le risque.",
            roi: "Réduit le risque + 4 h/mois en compta",
            eta: "2 mois",
          },
          {
            tag: "SP.03",
            title: "Moteur SEO en français pour pages de service",
            desc: "L'agent rédige ≈ 4 pages/mois : « avocat divorce Laval », « garde partagée Brossard », « séparation Westmount ». Se combine au positionnement Google existant. L'organique longue traîne devrait doubler sur 6 mois.",
            roi: "Prospects organiques +50 % à 100 % sur 6 mois",
            eta: "Mois 2+",
          },
        ],
        risks: [
          {
            flag: "Préoccupations de secret professionnel sur les outils IA en nuage.",
            mitigation: "Utilisez des fournisseurs SOC 2 avec résidence des données au Canada ou en UE. Spellbook est SOC 2 ; Clio aussi. Ajoutez une clause de divulgation IA aux mandats. Ne collez jamais de contenu confidentiel dans ChatGPT.",
            severity: "Moyen",
          },
          {
            flag: "Adoption par les avocats juniors — Léo utilisera les outils, Émilie + Maud pourraient résister.",
            mitigation: "Déployez Spellbook à Léo d'abord en pilote de 2 semaines. Il fait la démo aux autres avec une vraie requête récente. Positionnez comme « brouillon à 80 % + jugement de l'avocat », pas « l'IA remplace l'avocat ».",
            severity: "Faible",
          },
          {
            flag: "Les directives du Barreau du Québec sur l'IA générative évoluent.",
            mitigation: "Lisez les directives du Barreau de septembre 2024 sur l'IA en pratique. Documentez une politique interne (quelles données dans quels outils). Révisez chaque trimestre.",
            severity: "Moyen",
          },
        ],
        tools: [
          { name: "Spellbook", purpose: "Premiers brouillons de plaidoiries + contrats dans Word", cost: "89 $/avocat/mois", url: "https://spellbook.legal" },
          { name: "Clio Manage", purpose: "Déjà utilisé — activer Auto-Time + fonctions IA", cost: "Inclus", url: "https://clio.com" },
          { name: "Anthropic Claude", purpose: "Triage d'admission, mises à jour clients, prompts sur mesure", cost: "≈ 30 $/mois (API)", url: "https://anthropic.com" },
          { name: "Casetext CoCounsel", purpose: "Recherche jurisprudentielle + rédaction juridique", cost: "110 $/mois", url: "https://casetext.com" },
          { name: "DocuSign", purpose: "Déjà utilisé — ajouter le module de suggestions IA de clauses", cost: "+15 $/utilisateur/mois", url: "https://docusign.com" },
        ],
        next: {
          immediate: [
            "Inscrivez-vous à l'essai Spellbook de 14 jours. Léo fait passer 3 requêtes types côte à côte avec le processus actuel.",
            "Activez Clio Auto-Time pour Maud + Léo. Comparez les heures auto-capturées à leurs entrées manuelles de fin de semaine.",
            "Lisez les directives du Barreau du Québec sur l'IA et rédigez une politique IA interne d'une page.",
          ],
          thirtyDays: [
            "Spellbook déployé pour tout le cabinet sur les premiers brouillons de requêtes et mandats.",
            "Auto-Time actif pour tous les avocats. Taux de réalisation mesuré.",
            "Générateur IA de mises à jour client actif sur 50 % des dossiers actifs.",
          ],
        },
        financialImpact: {
          weeklyHoursReclaimed: 14,
          hourlyRateAssumption: 200,
          monthlyToolCost: 445,
          netMonthlySavings: 11679,
        },
        quickWinPlan: [
          { day: 1, action: "Inscription à l'essai Spellbook de 14 jours. Léo fait passer 3 requêtes types (ordonnance de séparation, demande de garde partagée, mesures provisoires) à travers l'outil. Comparaison côte à côte avec les brouillons actuels." },
          { day: 2, action: "Activer Clio Auto-Time pour Maud + Léo (Paramètres → Suivi du temps → Auto-Time). Laisser tourner toute la journée. Comparer le temps capturé à ce qu'ils auraient consigné manuellement." },
          { day: 3, action: "Rédiger les prompts de triage d'admission par IA dans Claude. Brancher au formulaire web via Zapier — Claude lit la soumission et signale fit/conflits avant que la parajuriste ne voie le dossier." },
          { day: 4, action: "Pilote du générateur de mises à jour client sur 2 dossiers actifs. Sarah révise chaque brouillon avant envoi. Cible : génération en moins de 30 secondes." },
        ],
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
      "Nettoyage de tenue de livres. Relance de documents clients. Premières versions des déclarations. Travail sur le terrain pour vos vérifications. Il y a un usage de l'IA pour chaque heure que votre équipe perd dans le travail répétitif — et ~5 minutes sur un court formulaire suffisent pour les cartographier.",
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
      "~5 minutes séparent votre firme d'une feuille de route IA sur mesure — pensée pour la façon dont les comptables travaillent vraiment.",
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
      anythingElse: {
        helper:
          "Préoccupations de confidentialité, un associé allergique au changement, une migration d'outil qui a laissé des cicatrices, un segment client à développer — tout ce qui façonne le faisable.",
        placeholder:
          "On parle depuis 2 ans de se débarrasser de nos 20 pires clients mais on ne le fait jamais. L'autre associée est allergique à tout outil de plus de 100 $/mois — recommandations économiques ou ROI évident s'il vous plaît.",
      },
    },
    sample: {
      profile: {
        business: "Tremblay CPA",
        city: "Montréal · QC",
        years: "11 ans en activité",
        team: "2 associés + 2 comptables + 1 teneuse de livres + 1 admin",
        industry: "Firme CPA boutique — 55 % impôts, 30 % tenue de livres, 15 % conseil",
        revenue: "≈ 1,4 M$ annuel",
      },
      answers: [
        { q: "Quelle est la composition de votre pratique, et depuis combien de temps ?", a: "Firme CPA boutique à Montréal. ~80 comptes corporatifs et ~200 déclarations personnelles. 55 % préparation d'impôts (T1/T2), 30 % tenue de livres mensuelle, 15 % conseil. Fondée par Marie Tremblay en 2015 après une décennie dans un Big Four." },
        { q: "Combien de personnes au total — associés, comptables, teneuses de livres, admin ?", a: "2 associées CPA, 2 comptables, 1 teneuse de livres, 1 admin. 6 personnes au total." },
        { q: "Au bureau, à distance, ou hybride ?", a: "Surtout à distance depuis 2020. Les associées sont au bureau 2 jours/sem, l'admin est à temps plein au bureau, les comptables et la teneuse de livres travaillent de la maison." },
        { q: "Décrivez un engagement client typique — de l'intégration à la livraison.", a: "Lettre de mission signée via DocuSign → on les configure dans QBO si nécessaire → tenue mensuelle pour les clients retainer → révision trimestrielle avec l'associée → fin d'année : collecte des docs fiscaux, balance de vérification, prép. T1/T2 dans ProFile → révision par l'associée → e-dépôt → facturation en 3 versements. La saison Fév-Avril est brutale — le personnel fait régulièrement 25-30 h sup./sem." },
        { q: "Quelle est votre pile comptable + gestion de pratique ?", a: "QBO Accountant pour les livres clients, ProFile pour T1/T2, Karbon pour le flux + portail client, Dext pour l'OCR des reçus (excellent), DocuSign pour les lettres de mission, Excel pour le conseil, Microsoft 365 pour le reste." },
        { q: "D'où viennent les nouveaux clients ?", a: "70 % références — autres professionnels (avocats, conseillers financiers) et clients existants. 20 % recherche Google pour « comptable Montréal » et « CPA Québec ». 10 % autre (LinkedIn, événements de réseautage)." },
        { q: "Où le temps du personnel est-il englouti ?", a: "Relancer les clients pour les docs fiscaux en mars, c'est un emploi à temps partiel — l'admin passe 6 h/jour pendant 6 semaines sur les suivis. Conciliation bancaire sur les fichiers QBO bordéliques des 10 pires clients : 4-6 h chacun par mois. Saisie manuelle pour les clients qui envoient encore des PDF de reçus. Prép. des lettres-conseils de fin d'année : ~3 jours par client conseil." },
        { q: "Avez-vous essayé l'IA à la firme ? Comment ça s'est passé ?", a: "Dext pour l'OCR — ça marche, on garde. Essayé ChatGPT pour les courriels clients, ça fait générique. Karbon a quelques fonctions IA (suggestions de gabarits) mais on ne les a pas vraiment activées. Inquiet sur la confidentialité avec l'IA en nuage sur des données financières réelles." },
        { q: "Sur 1 à 10, à quel point votre équipe est-elle à l'aise avec la techno ?", a: "Comptables : 7. Marie (associée) : 7. Autre associée : 5. Teneuse de livres : 5. Admin : 7. Moyenne firme : environ 6." },
        { q: "À quoi ressemble le succès dans les 12 prochains mois ?", a: "Faire passer le conseil de 15 % à 30 % des revenus. Réduire de moitié les heures sup. en saison des impôts (présentement 25-30 h sup/personne en mars/avril). Embaucher 1 comptable de plus sans broyer les marges." },
      ],
      report: {
        score: 64,
        breakdown: [
          { label: "Fondations numériques", v: 70 },
          { label: "Maturité des processus", v: 55 },
          { label: "Préparation de l'équipe", v: 62 },
          { label: "Qualité des données", v: 65 },
          { label: "Adhésion des dirigeants", v: 65 },
        ],
        summary: [
          "Tremblay CPA a une pile solide (QBO, ProFile, Karbon, Dext) mais perd 6 h/jour chaque mars-avril sur la relance de documents — c'est 240 h par saison d'impôts récupérables avec le bon outil de flux.",
          "La conciliation est la deuxième fuite. La conciliation assistée par IA gère 70 % des entrées de routine, libérant le personnel pour les 30 % qui demandent du jugement.",
          "La préparation des notes-conseils est la troisième — l'auto-rédaction depuis les données QBO + un gabarit firme coupe la prép. de 3 jours à 4 h par client. Débloque la cible de croissance conseil.",
        ],
        quickWins: [
          {
            tag: "QW.01",
            title: "TaxDome — demande et relance de documents automatisées",
            desc: "TaxDome gère tout le flux de saison des impôts : courriels de demande automatisés, rappels, portail client pour téléverser, suivi de statut. Remplace les relances manuelles de l'admin. Coupe la chasse aux docs de mars de 6 h/jour à 30 min/jour.",
            impact: "Élevé",
            effort: "Moyen",
            cost: "50 $/utilisateur/mois",
            eta: "3 semaines (éviter fév–avril)",
          },
          {
            tag: "QW.02",
            title: "Botkeeper ou conciliation IA dans QBO Accountant",
            desc: "Brancher la conciliation assistée par IA sur les 10 fichiers QBO les plus messy. L'IA apparie les transactions aux factures, signale les entrées non appariées, rédige les écritures de journal pour révision. Coupe la fin de mois de 4-6 h à 1 h par fichier.",
            impact: "Élevé",
            effort: "Faible",
            cost: "99–249 $/mois",
            eta: "2 semaines",
          },
          {
            tag: "QW.03",
            title: "Notes-conseils auto-rédigées (Claude + gabarit firme)",
            desc: "Tirer les données QBO via API, alimenter Claude avec votre gabarit firme, obtenir un brouillon de lettre-conseil en 30 secondes. L'associée ajoute l'insight stratégique. Coupe la prép. de 3 jours à 4 h par client — débloque la croissance conseil.",
            impact: "Moyen",
            effort: "Faible",
            cost: "≈ 20 $/mois (API)",
            eta: "1 semaine",
          },
        ],
        strategic: [
          {
            tag: "SP.01",
            title: "Premiers brouillons de déclarations fiscales depuis docs + année précédente",
            desc: "L'IA construit des brouillons préliminaires de T1/T2 à partir des documents clients et des déclarations de l'année précédente. Le personnel révise et raffine. Double le débit en saison des impôts sans doubler le personnel. La plus grosse opportunité ROI de l'année.",
            roi: "≈ 80 000 $/an de capacité débloquée",
            eta: "2 à 3 mois (déployer mai-jan, pas durant la saison)",
          },
          {
            tag: "SP.02",
            title: "Analyse de vérification — détection d'écarts et de valeurs aberrantes",
            desc: "Faire tourner des analyses sur les grands livres clients : écarts vs année précédente, ratios de référence vs industrie, entrées inhabituelles. Met en évidence les zones de risque avant le début du terrain. Tests plus précis, plus rapides.",
            roi: "≈ 30 % de réduction des heures de terrain",
            eta: "3 mois",
          },
          {
            tag: "SP.03",
            title: "Moteur SEO en français pour pages de service",
            desc: "L'agent rédige 4 pages/mois : « comptable Saint-Henri », « TPS-TVQ Laval », « fiscalité PME Plateau ». Croissance organique longue traîne pour ajouter ~20 % aux prospects entrants sur 6 mois.",
            roi: "Prospects organiques +20 % à 40 % sur 6 mois",
            eta: "2 mois",
          },
        ],
        risks: [
          {
            flag: "Données client sur des outils IA en nuage.",
            mitigation: "Utilisez seulement des fournisseurs SOC 2 (TaxDome, Botkeeper, Anthropic le sont tous). Ajoutez une clause IA/données aux lettres de mission avec consentement explicite. Chiffrement au repos. Ne collez jamais de NAS ou de coordonnées bancaires dans ChatGPT.",
            severity: "Moyen",
          },
          {
            flag: "Teneuse de livres à 5/10 en techno — risque d'adoption.",
            mitigation: "Déployez un outil à la fois. Démo d'abord à la comptable la plus à l'aise. Faites-la s'asseoir avec la teneuse de livres pour la première conciliation. Ne poussez pas durant la saison des impôts.",
            severity: "Moyen",
          },
          {
            flag: "Timing du déploiement vs saison des impôts.",
            mitigation: "Jamais de gros changements de fév à avril. Pilote en mai-jan et verrouillez le flux avant le 1er février. Planifiez QW.01 (TaxDome) pour être terminé au plus tard le 15 janvier.",
            severity: "Élevé",
          },
        ],
        tools: [
          { name: "TaxDome", purpose: "Flux + portail client + relance auto de documents", cost: "50 $/utilisateur/mois", url: "https://taxdome.com" },
          { name: "Botkeeper", purpose: "Tenue de livres et conciliation assistées par IA", cost: "99–249 $/mois", url: "https://botkeeper.com" },
          { name: "Dext", purpose: "Déjà utilisé — étendre à tous les clients retainer", cost: "25 $/client/mois", url: "https://dext.com" },
          { name: "Anthropic Claude", purpose: "Brouillons de notes-conseils, courriels, premiers brouillons T1/T2", cost: "≈ 50 $/mois (API)", url: "https://anthropic.com" },
          { name: "Karbon", purpose: "Déjà utilisé — activer les fonctions IA dans les Paramètres", cost: "Inclus", url: "https://karbonhq.com" },
        ],
        next: {
          immediate: [
            "Inscription à l'essai TaxDome de 14 jours. Piloter 5 clients corporatifs pour tester avant de s'engager.",
            "Brancher Botkeeper sur vos 2 fichiers QBO les plus messy. Faire passer une conciliation — mesurer le gain de temps.",
            "Rédiger la prochaine lettre-conseil d'un client dans Claude avec votre gabarit firme. Marie révise et raffine.",
          ],
          thirtyDays: [
            "TaxDome actif pour tous les clients retainer — relance auto préchargée pour la prochaine saison.",
            "Botkeeper assiste la conciliation sur les 10 fichiers clients les plus messy.",
            "Notes-conseils auto-rédigées par IA sur 20 % des clients conseil.",
          ],
        },
        financialImpact: {
          weeklyHoursReclaimed: 16,
          hourlyRateAssumption: 90,
          monthlyToolCost: 370,
          netMonthlySavings: 5865,
        },
        quickWinPlan: [
          { day: 1, action: "Inscription à l'essai TaxDome de 14 jours. Migrer le flux d'un client retainer de Karbon pour tester le fit." },
          { day: 2, action: "Brancher Botkeeper sur vos 2 fichiers QBO les plus messy (ceux qui grugent 4-6 h/mois chacun). Faire passer une conciliation et mesurer." },
          { day: 3, action: "Choisir votre top client conseil. Tirer ses données QBO, alimenter Claude avec votre gabarit firme, générer un brouillon de lettre mensuelle. Marie révise." },
          { day: 4, action: "Configurer le flux de relance TaxDome pour 5 clients corporatifs. Envoyer le flux de bienvenue + première demande de documents." },
        ],
      },
    },
  },
};

export default fr;

import type en from "./en";

const fr: typeof en = {
  common: {
    brand: "SnapReport",
    cta: {
      start: "Commencer →",
      beginAssessment: "Commencer l'évaluation",
      seeProcess: "Voir le processus",
      getOwnReport: "Obtenez le vôtre",
      claimReport: "Réclamer votre rapport",
      generateMyReport: "Générer mon rapport",
      continue: "Continuer",
      back: "Retour",
      backToHome: "Retour à l'accueil",
      startFreeAssessment: "Évaluation gratuite",
      getFreeReport: "Obtenez votre rapport",
      viewFull: "Voir l'exemple →",
      clickToExpand: "Cliquer pour ouvrir",
    },
    nav: {
      process: "Processus",
      deliverable: "Livrable",
      pricing: "Tarifs",
    },
    footer: {
      tagline: "Giga Mega Consulting Inc.",
      contactPrompt: "Contact",
    },
    misc: {
      privateNote: "🔒 Confidentiel · utilisé uniquement pour générer votre rapport",
      version: "Version",
      step: "Étape",
    },
  },

  landing: {
    metaTitle: "SnapReport — Votre évaluation IA en 5 minutes",
    metaDescription:
      "Découvrez plus de 10 000 $ d'opportunités IA cachées. Répondez à 10 questions et recevez par courriel un rapport sur mesure. Gratuit pour les 3 premières entreprises.",

    hero: {
      eyebrow: "§ 00 · INTAKE",
      estimate: "env. 5 min",
      headline: [
        "Cartographiez les",
        "opportunités",
        "d'IA cachées dans",
        "votre entreprise.",
      ],
      headlineItalicIndex: 1,
      lead:
        "Répondez à 10 questions sur votre façon d'opérer. Claude les lit, identifie les usages d'IA à plus fort levier pour votre situation, et vous envoie un rapport sur mesure par courriel. Pas d'appel. Pas de vente. Juste de la clarté.",
      badges: ["10 questions", "PDF par courriel", "Gratuit pour les 3 premiers"],
      specimenLabel: "Échantillon",
      specimenCaption: "Fig. 01",
      specimenAction: "Exemple de rapport",
    },

    process: {
      sectionNumber: "§ 01 · MÉTHODE",
      title: ["Trois étapes,", "aucune friction."],
      titleItalicIndex: -1,
      lead:
        "Conçu pour être complété d'un trait sur votre téléphone ou ordinateur. Aucun logiciel à installer. Aucune préparation. Aucun appel de suivi requis pour en tirer de la valeur.",
      steps: [
        {
          n: "01",
          title: "Répondez à 10 questions",
          desc:
            "Un court formulaire couvre vos opérations, équipe, outils, sources de clients, freins, expérience avec l'IA et objectifs sur 12 mois.",
          meta: "≈ 5 minutes",
        },
        {
          n: "02",
          title: "Claude les lit",
          desc:
            "Vos réponses sont analysées par Claude (le modèle de pointe d'Anthropic) — comparées à des milliers de profils de PME.",
          meta: "≈ 30 secondes",
        },
        {
          n: "03",
          title: "Rapport dans votre boîte",
          desc:
            "Le PDF arrive à l'adresse que vous avez fournie. Score d'aptitude, trois gains rapides, trois plays stratégiques, pile d'outils, prochaines étapes.",
          meta: "≈ 2 minutes",
        },
      ],
    },

    deliverable: {
      sectionNumber: "§ 02 · LIVRABLE",
      title: ["Ce que vous recevez,", "section par section."],
      titleItalicIndex: 1,
      lead:
        "Un PDF de 6 à 8 pages. Langage simple. Spécifique à votre entreprise. Conçu pour être lu en 10 minutes et mis en action en 30 jours.",
      items: [
        { tag: "01", title: "Score d'aptitude à l'IA", desc: "Note 0–100 avec ventilation sur 5 dimensions." },
        { tag: "02", title: "Sommaire exécutif", desc: "Trois points en langage simple — ce que vous diriez à un cofondateur." },
        { tag: "03", title: "Gains rapides", desc: "Trois actions à fort levier que vous pouvez déployer en 30 jours." },
        { tag: "04", title: "Plays stratégiques", desc: "Trois paris plus ambitieux pour l'horizon 3 à 6 mois." },
        { tag: "05", title: "Drapeaux rouges", desc: "Ce qui risque de bloquer l'adoption — et comment le désamorcer." },
        { tag: "06", title: "Pile d'outils", desc: "Produits spécifiques avec prix, adaptés à votre situation." },
      ],
    },

    pricing: {
      sectionNumber: "§ 03 · CONDITIONS",
      title: "Gratuit, pour l'instant.",
      lead:
        "Nous menons la première cohorte sans frais pour bâtir nos études de cas. Les rapports sont normalement offerts à 1 000 $.",
      stamp: "Première cohorte · Limité",
      price: "0 $",
      strikePrice: "1 000 $",
      priceCaption: "Une fois · Sans abonnement · Sans carte",
      features: [
        "Rapport d'aptitude à l'IA personnalisé (PDF)",
        "3 gains rapides + 3 plays stratégiques",
        "Recommandations d'outils avec tarifs",
        "Drapeaux rouges et plan d'action 30 jours",
        "Livré par courriel en quelques minutes",
      ],
      footnote: "Services d'implémentation disponibles séparément (3 000–5 000 $)",
    },

    closingCta: {
      eyebrow: "// FIN DU PROSPECTUS",
      headline:
        "Dix questions séparent votre entreprise d'une feuille de route IA sur mesure.",
    },
  },

  form: {
    metaTitle: "Démarrer l'évaluation — SnapReport",
    headerStep: "Étape",
    sectionPrefix: "Section",
    actions: {
      back: "← Retour",
      continue: "Continuer",
      generate: "Générer mon rapport",
      generating: "Génération du rapport",
    },
    errors: {
      stepInvalid:
        "Veuillez remplir les champs surlignés avant de continuer.",
      submitFailed: "Une erreur est survenue. Veuillez réessayer.",
      required: "Requis",
      invalidEmail: "Entrez une adresse courriel valide",
    },
    success: {
      eyebrow: "§ FIN · CONFIRMÉ",
      headlinePrefix: "C'est noté,",
      fallbackName: "cher visiteur",
      bodyPrefix: "Votre rapport est en cours de génération. Vérifiez",
      bodySuffix:
        "dans les prochaines minutes — il arrivera avec votre score d'aptitude à l'IA, vos gains rapides prioritaires et des recommandations d'outils spécifiques à",
      fallbackBusiness: "votre entreprise",
      nextHeader: "Ce qui suit",
      nextSteps: [
        "Claude lit vos réponses",
        "Le rapport est rédigé et exporté en PDF",
        "Il arrive dans votre boîte — généralement en moins de 5 minutes",
        "Optionnel : prendre un appel de 30 min avec Giga",
      ],
    },
    optionalTag: "facultatif",
    sliderLow: "1 · réfractaire",
    sliderHigh: "10 · pionnier",
    helperOptionalName:
      "Facultatif — nous vous adresserons le rapport si vous le précisez.",

    steps: [
      {
        number: "00",
        title: "Où devons-nous envoyer votre rapport ?",
        subtitle:
          "Nous vous enverrons le rapport personnalisé dès qu'il est prêt. ≈ 5 minutes — sans appel, sans relance commerciale.",
        fields: [
          {
            key: "email",
            label: "Votre courriel",
            placeholder: "vous@votreentreprise.com",
            type: "email" as const,
            required: true,
            helper: undefined as string | undefined,
          },
          {
            key: "fullName",
            label: "Votre nom",
            placeholder: "Marie Tremblay",
            type: "text" as const,
            required: false,
            helper:
              "Facultatif — nous vous adresserons le rapport si vous le précisez.",
          },
        ],
      },
      {
        number: "01",
        title: "Parlez-nous de votre entreprise",
        subtitle: undefined as string | undefined,
        fields: [
          {
            key: "businessName",
            label: "Nom de l'entreprise",
            placeholder: "Plomberie Acme",
            type: "text" as const,
            required: true,
            helper: undefined as string | undefined,
          },
          {
            key: "businessDescription",
            label: "Que fait votre entreprise ?",
            helper: "Une ou deux phrases. Langage simple.",
            placeholder:
              "Nous sommes une entreprise de plomberie résidentielle desservant la grande région de Montréal...",
            type: "textarea" as const,
            required: true,
          },
          {
            key: "yearsOperating",
            label: "Depuis combien de temps êtes-vous en activité ?",
            placeholder: "8 ans",
            type: "text" as const,
            required: true,
            helper: undefined as string | undefined,
          },
        ],
      },
      {
        number: "02",
        title: "Votre équipe",
        subtitle: undefined as string | undefined,
        fields: [
          {
            key: "teamSize",
            label: "Combien de personnes travaillent dans l'entreprise ?",
            placeholder: "12 (incluant les 2 propriétaires)",
            type: "text" as const,
            required: true,
            helper: undefined as string | undefined,
          },
          {
            key: "teamLocation",
            label: "Sur place, à distance, ou les deux ?",
            placeholder:
              "Surtout sur place — le bureau au siège, les techs sur la route",
            type: "text" as const,
            required: true,
            helper: undefined as string | undefined,
          },
        ],
      },
      {
        number: "03",
        title: "Comment le travail s'enchaîne",
        subtitle: "Décrivez le parcours type d'un client.",
        fields: [
          {
            key: "operationsWalkthrough",
            label:
              "Du premier contact à la livraison du service — que se passe-t-il ?",
            helper:
              "Décrivez librement. Plus c'est détaillé, meilleur sera le rapport.",
            placeholder:
              "Le client appelle ou remplit notre formulaire en ligne → on planifie une soumission → soumission → travail confirmé → tech dépêché → facture → suivi...",
            type: "textarea" as const,
            required: true,
          },
          {
            key: "toolsInUse",
            label: "Quels logiciels votre équipe utilise au quotidien ?",
            helper:
              "CRM, planification, courriel, facturation, et tout le reste.",
            placeholder:
              "QuickBooks pour la facturation, Google Workspace pour le courriel, Jobber pour la planification, Excel pour le suivi...",
            type: "textarea" as const,
            required: true,
          },
        ],
      },
      {
        number: "04",
        title: "Clients et goulots d'étranglement",
        subtitle: undefined as string | undefined,
        fields: [
          {
            key: "leadSources",
            label: "D'où viennent la plupart de vos clients en ce moment ?",
            placeholder:
              "Environ 60 % bouche-à-oreille, 30 % Google, 10 % publicités Facebook...",
            type: "textarea" as const,
            required: true,
            helper: undefined as string | undefined,
          },
          {
            key: "bottlenecks",
            label:
              "Qu'est-ce qui vous ralentit ? Où perdez-vous le plus de temps ?",
            helper:
              "Soyez précis — les goulots sont là où l'IA paie le plus souvent.",
            placeholder:
              "Relance des soumissions, conciliation des factures, répondre aux mêmes questions des clients...",
            type: "textarea" as const,
            required: true,
          },
        ],
      },
      {
        number: "05",
        title: "Expérience avec l'IA et objectifs",
        subtitle: undefined as string | undefined,
        fields: [
          {
            key: "priorAiExperience",
            label:
              "Avez-vous déjà essayé l'IA ou l'automatisation ? Comment ça s'est passé ?",
            helper:
              "Si jamais — écrivez simplement « aucune ». C'est une information utile aussi.",
            placeholder:
              "Nous avons essayé ChatGPT pour la pub Facebook — ça allait, mais inégal. Jamais essayé d'automatisation à proprement parler.",
            type: "textarea" as const,
            required: true,
          },
          {
            key: "techComfortScore",
            label:
              "À quel point votre équipe est-elle à l'aise avec la nouvelle techno ?",
            helper: "1 = réfractaire · 10 = pionniers",
            type: "slider" as const,
            required: true,
            placeholder: undefined as string | undefined,
          },
          {
            key: "twelveMonthGoals",
            label: "À quoi ressemble le succès dans les 12 prochains mois ?",
            placeholder:
              "Atteindre 1,5 M$ de revenus, embaucher 2 techs sans travailler 60 h/semaine, réduire le cycle soumission-paiement...",
            type: "textarea" as const,
            required: true,
            helper: undefined as string | undefined,
          },
          {
            key: "automationWish",
            label:
              "Si vous pouviez automatiser une seule chose demain matin, ce serait quoi ?",
            placeholder:
              "Les allers-retours de planification par courriel avec les clients.",
            type: "textarea" as const,
            required: true,
            helper: undefined as string | undefined,
          },
        ],
      },
    ],
  },

  sample: {
    metaTitle: "Échantillon — Plomberie Acme · SnapReport",
    badge: "Échantillon · Fig. 01",
    eyebrow: "§ ▢ · ÉCHANTILLON",
    eyebrowSuffix: "Exemple public",
    heroTitle: ["À quoi ressemble", "vraiment un SnapReport."],
    heroTitleItalicIndex: 1,
    heroLead:
      "Ci-dessous : une entreprise de plomberie montréalaise fictive, les 10 réponses qu'elle a données au formulaire, et le rapport complet que Claude a généré pour elle. Même processus que vous suivrez. Même genre de rapport que vous recevrez.",
    note:
      "Note : Plomberie Acme est inventée pour la démonstration. Aucune donnée réelle de client n'est affichée.",
    getOwn: "Obtenez le vôtre →",
    contents: "Contenu",
    contentsItems: [
      ["A", "Profil de l'entreprise"],
      ["B", "Les 10 réponses"],
      ["C", "Rapport — sommaire exécutif"],
      ["D", "Score d'aptitude à l'IA"],
      ["E", "Gains rapides"],
      ["F", "Plays stratégiques"],
      ["G", "Drapeaux rouges"],
      ["H", "Pile d'outils"],
      ["I", "Prochaines étapes"],
    ],

    sectionA: "Profil de l'entreprise",
    sectionB: "Les 10 réponses qu'elle a données",
    sectionC: "Sommaire exécutif",
    sectionD: "Score d'aptitude à l'IA",
    sectionE: "3 gains rapides (≤ 30 jours)",
    sectionF: "3 plays stratégiques (3 à 6 mois)",
    sectionG: "Drapeaux rouges + mitigations",
    sectionH: "Pile d'outils recommandée",
    sectionI: "Prochaines étapes",
    pause: "↓ Ci-dessous : ce que Claude a généré et envoyé par courriel",
    issued: "Émis · 2026.05.13",
    reportHeader: "SnapReport · Aptitude à l'IA",
    overall: "Global",
    breakdown: "Ventilation",
    aboveAvg: "Au-dessus de la moyenne PME (54)",
    risksHeader: { sev: "Sév", flag: "Drapeau", mitigation: "Mitigation" },
    toolsHeader: { tool: "Outil", purpose: "Usage", cost: "Coût" },
    nextThisWeek: "Cette semaine",
    nextThirtyDays: "D'ici 30 jours",
    closingEyebrow: "// FIN DE L'ÉCHANTILLON",
    closingHeadline: ["Voilà celui d'Acme.", "Que dirait le vôtre ?"],
    closingHeadlineItalicIndex: 1,

    profile: {
      business: "Plomberie Acme",
      city: "Grand Montréal · QC",
      years: "8 ans en activité",
      team: "12 employés · 2 propriétaires",
      industry: "Plomberie résidentielle et dépannage d'urgence",
      revenue: "≈ 1,1 M$ annuel",
      labels: {
        Business: "Entreprise",
        Location: "Emplacement",
        Years: "Années d'activité",
        Team: "Équipe",
        Industry: "Secteur",
        Revenue: "Revenus annuels approx.",
      },
    },

    answers: [
      {
        q: "Que fait votre entreprise, et depuis combien de temps êtes-vous en activité ?",
        a:
          "Nous sommes une entreprise de plomberie résidentielle dans la grande région de Montréal. Surtout du dépannage d'urgence (fuites, drains bouchés, panne de chauffe-eau) et quelques installations planifiées. 8 ans dans le métier, entreprise familiale de seconde génération — c'est mon père qui l'a démarrée.",
      },
      {
        q: "Combien d'employés avez-vous ? Sur place ou à distance ?",
        a:
          "12 personnes au total. On est deux propriétaires (mon frère et moi). 5 techs sur la route en camion, 3 apprentis, 2 personnes au bureau pour la répartition et la facturation, plus mon frère qui gère le terrain.",
      },
      {
        q:
          "Décrivez vos opérations courantes — du premier contact du client à la livraison du service.",
        a:
          "Le client appelle notre ligne principale OU remplit notre formulaire en ligne. Sylvie au bureau prend l'info et décide si c'est une urgence ou planifié. Pour les urgences, elle joint le tech le plus proche par radio. Pour le planifié, elle réserve dans Jobber. Le tech arrive, diagnostique, donne un prix verbalement ou avec une soumission papier. Le client approuve, le travail se fait, le tech consigne les heures dans Jobber, puis on facture par QuickBooks deux jours plus tard. Sylvie rappelle une semaine après pour le suivi de satisfaction.",
      },
      {
        q: "Quels logiciels ou outils votre équipe utilise au quotidien ?",
        a:
          "Jobber pour la planification et la répartition. QuickBooks pour la facturation et la comptabilité. Google Workspace pour courriel et calendrier. Un groupe WhatsApp pour la coordination des techs sur le terrain. Excel pour le suivi de l'inventaire des camions. Sylvie tient aussi un carnet papier pour les rappels.",
      },
      {
        q: "D'où viennent la plupart de vos clients en ce moment ?",
        a:
          "Environ 50 % bouche-à-oreille — clients fidèles et références. 30 % recherche Google (on est 2e pour « plombier Montréal urgence »). 15 % pubs Facebook que mon neveu gère. 5 % les Pages jaunes, encore, on ne sait pas pourquoi.",
      },
      {
        q: "Quels sont vos plus gros goulots d'étranglement ?",
        a:
          "Répondre au téléphone, c'est le pire. On perd peut-être 4 à 6 appels par jour dans la boîte vocale quand Sylvie est déjà en ligne, et une bonne partie ne rappelle pas. L'envoi de soumissions traîne aussi — les techs les écrivent à la main et Sylvie les retape ensuite dans Jobber. Relancer les factures impayées, c'est un casse-tête constant. L'inventaire dans les camions, c'est une boîte noire — les techs manquent de pièces, font demi-tour, perdent une demi-journée.",
      },
      {
        q: "Avez-vous déjà essayé l'IA ou l'automatisation ? Que s'est-il passé ?",
        a:
          "Essayé ChatGPT pour rédiger les pubs Facebook — ça marche, ça sauve du temps, mais inégal. Mon frère a essayé un service de réponse automatisée l'an dernier — c'était mauvais (les clients détestaient). Rien d'autre.",
      },
      {
        q: "Sur 1 à 10, à quel point votre équipe est-elle à l'aise avec la nouvelle techno ?",
        a:
          "Bureau : 6. Propriétaires : 7. Techs : de 3 à 8 selon l'âge. En équipe, je dirais 5.",
      },
      {
        q: "À quoi ressemble le succès dans les 12 prochains mois ?",
        a:
          "Atteindre 1,5 M$ de revenus, embaucher 2 techs sans travailler 60 h/semaine. Arrêter de manquer des appels. Passer du cycle soumission-paiement de 5 jours à 2.",
      },
      {
        q: "Si vous pouviez automatiser une seule chose demain matin, ce serait quoi ?",
        a:
          "Les allers-retours de planification avec les clients. Sylvie passe peut-être 2 h par jour à se courir après — « mardi 14 h ? non ? mercredi alors ? ». Si le client pouvait juste réserver un créneau en ligne avec le bon tech, ce serait en or.",
      },
    ],

    report: {
      score: 62,
      breakdown: [
        { label: "Fondations numériques", v: 70 },
        { label: "Maturité des processus", v: 65 },
        { label: "Préparation de l'équipe", v: 55 },
        { label: "Qualité des données", v: 50 },
        { label: "Adhésion des dirigeants", v: 75 },
      ],
      summary: [
        "Acme est bien positionnée pour l'IA : processus clairs, pile logicielle existante (Jobber, QuickBooks, Google) et propriétaires qui expérimentent déjà avec ChatGPT.",
        "La plus grosse fuite, c'est le téléphone — appels manqués = revenus d'urgence perdus. Une réceptionniste IA + prise de rendez-vous en ligne s'amortit en moins d'un mois.",
        "La compression du cycle soumission-paiement est la 2e plus grosse opportunité. Passer de soumissions manuscrites à des PDF générés par IA depuis le camion coupe le temps administratif d'environ 50 %.",
      ],
      quickWins: [
        {
          tag: "QW.01",
          title: "Réceptionniste IA pour les appels hors heures et débordements",
          desc:
            "Branchez un agent vocal (Retell, VAPI ou similaire) sur votre ligne principale en débordement. Trie les urgences, réserve des créneaux dans Jobber via API, transcrit le reste. Récupère les 4 à 6 appels manqués/jour à environ 200 $ de ticket moyen.",
          impact: "Élevé",
          effort: "Moyen",
          cost: "≈ 80 $/mois + 0,08 $/min",
          eta: "2 à 3 semaines",
        },
        {
          tag: "QW.02",
          title: "Soumissions PDF auto-générées à partir des notes vocales du tech",
          desc:
            "Le tech dicte le travail et les pièces dans son téléphone après diagnostic. L'IA transcrit, génère un PDF de soumission à votre image et l'envoie au client et à Sylvie en moins de 90 secondes. Élimine l'écriture manuscrite + la re-saisie de Sylvie.",
          impact: "Élevé",
          effort: "Faible",
          cost: "≈ 20 $/mois (API Anthropic)",
          eta: "1 à 2 semaines",
        },
        {
          tag: "QW.03",
          title: "Prise de rendez-vous en ligne intégrée au site",
          desc:
            "Remplacez le formulaire de contact par un module Cal.com (ou Calendly) qui respecte la disponibilité des techs + la zone de service. Élimine les allers-retours téléphoniques qui coûtent à Sylvie ≈ 2 h/jour.",
          impact: "Moyen",
          effort: "Faible",
          cost: "Gratuit–15 $/mois",
          eta: "3 jours",
        },
      ],
      strategic: [
        {
          tag: "SP.01",
          title: "Inventaire prédictif des camions à partir des patrons historiques",
          desc:
            "Exploitez 3 ans de données Jobber + QuickBooks pour prédire les pièces dont chaque tech a besoin pour réapprovisionner chaque semaine. Coupe les retours à l'entrepôt — récupère ≈ 5 h/semaine par tech.",
          roi: "≈ 30 000 $/an de main-d'œuvre récupérée",
          eta: "2 à 3 mois",
        },
        {
          tag: "SP.02",
          title: "Relances de factures rédigées par IA",
          desc:
            "Auto-rédige des courriels de relance polis selon l'âge de la facture + l'historique client. Le propriétaire approuve d'un clic. Réduit les créances à 60 jours environ 2× plus vite.",
          roi: "≈ 8 % d'amélioration du cycle de trésorerie",
          eta: "3 à 4 semaines",
        },
        {
          tag: "SP.03",
          title: "Moteur SEO en français pour pages de service",
          desc:
            "L'agent rédige ≈ 4 pages d'atterrissage par mois (« plombier urgence Laval », « chauffe-eau Brossard »). Se combine au positionnement Google existant ; l'organique de longue traîne devrait doubler sur 6 mois.",
          roi: "Prospects organiques +50 % à 100 %",
          eta: "Mois 2+",
        },
      ],
      risks: [
        {
          flag: "Adoption par les techs sur le terrain (3 sur 5 se notent sous 5/10 en aisance techno).",
          mitigation:
            "Déployez l'outil de soumission vocale d'abord en pilote de 2 semaines avec le tech le plus à l'aise. Demandez-lui de faire la démo aux autres. Une UX vocale (sans écrire) abaisse la barrière.",
          severity: "Moyen",
        },
        {
          flag: "Réaction des clients à la réceptionniste IA (la tentative de votre frère a échoué).",
          mitigation:
            "Positionnez-la comme « assistante de débordement », pas la ligne principale. Sylvie répond en premier. L'IA prend après 3 sonneries. Utilisez une voix naturelle (11labs ou similaire), pas robotique.",
          severity: "Moyen",
        },
        {
          flag: "Qualité des données — les soumissions manuscrites n'arrivent pas toutes dans Jobber.",
          mitigation:
            "QW.02 (voix-à-soumission) règle ce problème structurellement. Une fois rédigées par IA, les soumissions atterrissent automatiquement dans Jobber.",
          severity: "Faible",
        },
      ],
      tools: [
        { name: "Retell AI", purpose: "Réceptionniste IA + agent vocal de prise de rendez-vous", cost: "0,08 $/min" },
        { name: "Anthropic Claude", purpose: "Génération de soumissions vocales + brouillons de courriel", cost: "≈ 0,50 $/soumission" },
        { name: "Cal.com", purpose: "Prise de rendez-vous en ligne, intégrable au site", cost: "Gratuit–15 $/mois" },
        { name: "Make.com", purpose: "Couche de liaison : Jobber ↔ QuickBooks ↔ outils IA", cost: "9–29 $/mois" },
        { name: "Lindy / Magical AI", purpose: "Brouillons de relance, le propriétaire approuve puis envoie", cost: "30–50 $/mois" },
      ],
      next: {
        immediate: [
          "Choisissez un tech sur le terrain (le plus à l'aise) pour le pilote voix-à-soumission.",
          "Créez un compte Cal.com et intégrez la prise de rendez-vous sur plomberieacme.ca cette semaine.",
          "Faites suivre le prochain appel manqué à un agent Retell d'essai. Écoutez la transcription.",
        ],
        thirtyDays: [
          "Branchez Retell comme débordement intégré à Jobber. Mesurez le taux de récupération.",
          "La voix-à-soumission déployée chez les 5 techs après validation du pilote.",
          "Relances IA actives sur les tranches 30 à 60 jours.",
        ],
      },
    },
  },

  email: {
    subject: "Votre rapport d'évaluation IA",
    heading: "Votre évaluation IA est prête",
    greeting: "Bonjour",
    intro:
      "Merci d'avoir complété votre évaluation d'aptitude à l'IA. Votre rapport personnalisé est joint à ce courriel.",
    bullets: [
      "Votre score d'aptitude à l'IA",
      "3 gains rapides à mettre en œuvre en 30 jours",
      "Opportunités IA stratégiques pour 6 à 12 mois",
      "Recommandations d'outils précises avec tarifs",
      "Drapeaux rouges et comment les adresser",
    ],
    tipPrefix: "Commencez par la section Gains rapides",
    tipBody:
      " — ce sont les actions à fort ROI et faible effort que vous pouvez démarrer cette semaine.",
    ctaLabel: "Prendre un appel de révision →",
    closing:
      "Pendant l'appel, on parcourt le rapport ensemble et on identifie par quelle opportunité commencer. La plupart des clients repartent avec une feuille de route IA claire de 90 jours.",
    signature: "Giga",
    sigCompany: "Giga Mega Consulting",
    sigEmail: "info@snapaireport.com",
  },
};

export default fr;

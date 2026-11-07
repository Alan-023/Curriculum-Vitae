export type Language = 'en' | 'es';

export interface PipelineNode {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  tech: string[];
  metric: string;
  detail: string;
  accent: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  role: string;
  category: string;
  stack: string[];
  impactHeadline: string;
  bullets: string[];
  videoUrl?: string;
  shaderTheme: 'pos-prism' | 'bio-pulse' | 'queue-matrix' | 'analytics-wave' | 'cyber-vault';
  accentHex: string;
}

export interface ExperienceItem {
  company: string;
  division: string;
  location: string;
  role: string;
  period: string;
  statusBadge?: string;
  stack: string[];
  highlights: string[];
}

export interface PortfolioContent {
  nav: {
    about: string;
    aumovio: string;
    experience: string;
    projects: string;
    lab3d: string;
    arsenal: string;
    contact: string;
    downloadCv: string;
  };
  hero: {
    liveBadge: string;
    eyebrow: string;
    headlinePrimary: string;
    headlineEditorial: string;
    roleStatement: string;
    summary: string;
    ctaPrimary: string;
    ctaSecondary: string;
    kpis: { value: string; label: string; sub: string }[];
  };
  aumovio: {
    badge: string;
    title: string;
    titleEditorial: string;
    roleLine: string;
    period: string;
    contractNote: string;
    intro: string;
    simulateBtn: string;
    simulatingBtn: string;
    metrics: { value: string; unit: string; label: string; detail: string }[];
    pipelineTitle: string;
    pipelineHint: string;
    nodes: PipelineNode[];
    governanceNote: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    titleEditorial: string;
    items: ExperienceItem[];
  };
  projects: {
    eyebrow: string;
    title: string;
    titleEditorial: string;
    subtitle: string;
    dragHint: string;
    mediaBadge: string;
    items: ProjectItem[];
    labVaultTitle: string;
    labVaultItems: { name: string; stack: string; desc: string }[];
  };
  glbStage: {
    eyebrow: string;
    title: string;
    titleEditorial: string;
    description: string;
    dropHint: string;
    resetModel: string;
    presets: { id: string; label: string; ior: number; dispersion: number; distortion: number }[];
  };
  bento: {
    eyebrow: string;
    title: string;
    titleEditorial: string;
    categories: {
      title: string;
      tag: string;
      description: string;
      skills: string[];
      span: string;
    }[];
    education: {
      school: string;
      campus: string;
      degree: string;
      period: string;
      courseworkLabel: string;
      coursework: string[];
    };
    certifications: {
      title: string;
      items: { name: string; issuer: string; code: string }[];
    };
    languagesAndLeadership: {
      languagesTitle: string;
      languages: { lang: string; level: string }[];
      leadershipTitle: string;
      competencies: string[];
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    titleEditorial: string;
    subtitle: string;
    copyEmail: string;
    copiedEmail: string;
    downloadPdf: string;
    availability: string;
    footerNote: string;
  };
}

export const PORTFOLIO_DATA: Record<Language, PortfolioContent> = {
  en: {
    nav: {
      about: 'Overview',
      aumovio: 'Aumovio',
      experience: 'Trajectory',
      projects: 'Showcase',
      lab3d: '3D Optical Lab',
      arsenal: 'Arsenal',
      contact: 'Contact',
      downloadCv: 'ATS Resume',
    },
    hero: {
      liveBadge: 'ACTIVE @ AUMOVIO · PLANT FINANCIAL CONTROLLING & ENTERPRISE SYSTEMS',
      eyebrow: 'SOFTWARE & AUTOMATION ENGINEER · DISTRIBUTED SYSTEMS · CREATIVE UI/UX',
      headlinePrimary: 'ALAN EMMANUEL',
      headlineEditorial: 'Aviña Venegas',
      roleStatement: '.NET / C# · React.js & Next.js · Distributed Orchestration & Cloud Architecture',
      summary:
        'Engineering mission-critical enterprise automation, collision-free distributed server infrastructures, and next-generation refractive web interfaces that turn complex workflows into effortless one-click experiences.',
      ctaPrimary: 'Explore Aumovio Architecture',
      ctaSecondary: 'Download ATS CV (PDF)',
      kpis: [
        {
          value: '230+ hrs',
          label: 'Saved Annually @ Aumovio',
          sub: '19+ hrs/month · 1+ full work-month/yr',
        },
        {
          value: '0 Collisions',
          label: 'Async Queue + Watchdog',
          sub: 'Docker · ASP.NET APIs · SQL Server',
        },
        {
          value: 'Full-Lifecycle',
          label: 'Headless CLI to WebGL UI',
          sub: 'C# DevWinUI · SAP RPA · React 19',
        },
      ],
    },
    aumovio: {
      badge: 'FLAGSHIP ENTERPRISE ARCHITECTURE · GUADALAJARA, MX',
      title: 'Aumovio',
      titleEditorial: 'Distributed Automation Engine',
      roleLine: 'Software & Automation Engineering Intern — Plant Financial Controlling & Enterprise Systems',
      period: 'Jul 2026 – Present',
      contractNote: 'Enterprise Program · Jul 2026 – Jul 2027',
      intro:
        'Designed, architected, and deployed an end-to-end on-premise enterprise automation ecosystem bridging Financial Controlling and IT Operations—eliminating manual SAP bottlenecks with strict concurrency guarantees.',
      simulateBtn: 'Simulate One-Click SAP Pipeline',
      simulatingBtn: 'Executing Distributed Workload...',
      metrics: [
        {
          value: '230+',
          unit: 'hrs / year',
          label: 'Operational Time Reclaimed',
          detail: '19+ hours saved every single month (>1 full work-month annually) via one-click SAP RPA.',
        },
        {
          value: '100%',
          unit: 'Data Integrity',
          label: 'Zero-Collision Sequencing',
          detail: 'Custom Async Process Queue + Orchestrator + Concurrency Watchdog across massive datasets.',
        },
        {
          value: '0 ms',
          unit: 'UI Overhead',
          label: 'Headless CLI Desktop Engine',
          detail: 'C# / XAML (DevWinUI) runtime executing in headless CLI mode when triggered remotely.',
        },
      ],
      pipelineTitle: 'Interactive On-Premise Distributed Pipeline',
      pipelineHint: 'Hover any architectural node or run a live simulation pulse',
      nodes: [
        {
          id: 'react-portal',
          step: '01 // TRIGGER LAYER',
          title: 'Next-Gen React Web Portal',
          subtitle: 'On-Premise Fluid UI/UX Control Plane',
          tech: ['React.js', 'Modern CSS3', 'Fluid Motion', 'REST Client'],
          metric: 'One-Click UX',
          detail:
            'Crafted an intuitive on-premise web portal with high-craft animations allowing Financial Controlling analysts to trigger complex SAP workflows in a single click and inspect live run telemetry.',
          accent: '#38bdf8',
        },
        {
          id: 'aspnet-api',
          step: '02 // GATEWAY LAYER',
          title: 'ASP.NET C# Web APIs',
          subtitle: 'Typed Enterprise Ingestion & Validation',
          tech: ['C#', 'ASP.NET Core', 'REST APIs', 'JSON Schemas'],
          metric: 'Strict Contracts',
          detail:
            'High-throughput C# Web API layer validating financial parameters, authenticating triggers, and enqueuing deterministic job payloads into the on-premise persistence layer.',
          accent: '#818cf8',
        },
        {
          id: 'orchestrator-watchdog',
          step: '03 // CONCURRENCY CORE',
          title: 'Async Queue + Orchestrator + Watchdog',
          subtitle: 'Collision-Free Workload Sequencer',
          tech: ['Async Queues', 'Custom Orchestrator', 'Watchdog Daemon', 'Concurrency Locks'],
          metric: '0 Process Collisions',
          detail:
            'Custom-engineered asynchronous state machine and Watchdog controller that monitors worker health, prevents overlapping SAP/Excel COM sessions, and recovers stalled processes safely.',
          accent: '#34d399',
        },
        {
          id: 'docker-sql',
          step: '04 // INFRASTRUCTURE LAYER',
          title: 'Docker & SQL Server Cluster',
          subtitle: 'Containerized On-Premise Persistence',
          tech: ['Docker', 'SQL Databases', 'Audit Logs', 'GitHub CI'],
          metric: 'Full Auditability',
          detail:
            'Containerized services backed by relational SQL telemetry tables and automated Excel audit trails, governed via enterprise GitHub CI workflows and Gantt delivery roadmaps.',
          accent: '#f59e0b',
        },
        {
          id: 'devwinui-sap',
          step: '05 // EXECUTION ENGINE',
          title: 'Headless DevWinUI + SAP RPA',
          subtitle: 'C# / XAML · VB.NET · Excel Interop',
          tech: ['C# / .NET', 'DevWinUI (XAML)', 'SAP Scripting', 'VB.NET', 'Excel Interop'],
          metric: '230+ Hrs/Yr Saved',
          detail:
            'Dual-mode C#/XAML desktop engine with headless CLI execution to bypass frontend rendering overhead entirely, driving high-speed SAP RPA and massive dataset transformations.',
          accent: '#f472b6',
        },
      ],
      governanceNote:
        'Delivered in daily Scrum sprints across Financial Controlling & IT teams via enterprise GitHub CI, assertive executive alignment with department heads, and Gantt + automated Excel audit governance.',
    },
    experience: {
      eyebrow: 'CAREER TRAJECTORY & STAKEHOLDER LEADERSHIP',
      title: 'Production',
      titleEditorial: 'Impact & Alliances',
      items: [
        {
          company: 'Aumovio',
          division: 'Plant Financial Controlling & Enterprise Systems',
          location: 'Guadalajara, MX',
          role: 'Software & Automation Engineering Intern',
          period: 'Jul 2026 – Present',
          statusBadge: 'CURRENT',
          stack: ['C# / .NET', 'ASP.NET Web APIs', 'SAP RPA', 'Docker', 'SQL', 'DevWinUI', 'React.js', 'Scrum'],
          highlights: [
            'Engineered mission-critical SAP RPA solutions in C#, .NET, Visual Basic, and Excel Interop transforming manual financial workflows into one-click executions—saving 19+ hrs/month (230+ hrs/year).',
            'Architected on-premise distributed automation infrastructure backed by Docker, SQL databases, and ASP.NET C# Web APIs with custom Orchestrator and concurrency Watchdog.',
            'Built high-performance C# / XAML (DevWinUI) desktop engine with headless CLI execution triggered by an on-premise React.js next-gen Web Portal.',
            'Aligned senior leadership and department heads across Financial Controlling & IT in daily Scrum sprints with enterprise GitHub CI and Gantt governance.',
          ],
        },
        {
          company: 'Guía Cultural Metropolitana “Rinconcito”',
          division: 'State-Wide Strategic Cultural Ecosystem',
          location: 'Guadalajara, MX',
          role: 'Technology Infrastructure Engineer & Full Stack Developer',
          period: 'Feb 2026 – Jun 2026',
          stack: ['Full Stack Web', 'Cloud High-Availability', 'Google Analytics', 'Behavioral Telemetry', 'APIs'],
          highlights: [
            'Led technical architecture and assertive stakeholder communication as primary engineering liaison in a strategic metropolitan alliance backed by Gobierno de Jalisco, SITEUR, Mi Bici, Casa Profunda, and Arte Convergente.',
            'Engineered user-preference pattern tracking and behavioral telemetry pipelines integrated with Google Analytics to deliver actionable audience insights.',
            'Designed and operated high-availability cloud deployments guaranteeing zero downtime during metropolitan launch events.',
          ],
        },
      ],
    },
    projects: {
      eyebrow: 'CURATED ENGINEERING SHOWCASE · 3D CAROUSEL',
      title: 'Selected',
      titleEditorial: 'Systems & Interfaces',
      subtitle:
        'Drag horizontally or use arrow keys to explore full-stack architectures, real-time production queues, and live telemetry visualizations.',
      dragHint: 'DRAG OR USE ARROWS TO ROTATE 3D OPTICS',
      mediaBadge: 'LIVE TELEMETRY',
      items: [
        {
          id: 'restaurant-pos',
          index: '01',
          title: 'Restaurant POS & Real-Time Dashboard',
          role: 'Full Stack Architect & UI Engineer',
          category: 'Microservices Workflow · FinTech Checkout',
          stack: ['Laravel', 'Tailwind CSS', 'RESTful APIs', 'PayPal API', 'Postman'],
          impactHeadline: 'Synchronized waiter terminals, live kitchen queues & PayPal settlement',
          bullets: [
            'Architected a microservices-inspired operational platform orchestrating floor waiters, live kitchen order queues, and encrypted PayPal API checkout.',
            'Engineered a real-time executive dashboard with interactive weekly/monthly revenue telemetry, inventory thresholds, and table state visualizations.',
            'Verified 100% endpoint contract reliability across peak concurrency scenarios with automated Postman test suites.',
          ],
          videoUrl: '/videos/restaurant-pos.mp4',
          shaderTheme: 'pos-prism',
          accentHex: '#38bdf8',
        },
        {
          id: 'mypethealth',
          index: '02',
          title: 'MyPetHealth — Clinical Vet Platform',
          role: 'Project Manager (Scrum) & Lead Full Stack Dev',
          category: 'Healthcare SDLC · Custom SVG Motion',
          stack: ['Python Full Stack', 'Secure Auth', 'Relational DB', 'Custom SVG', 'Scrum'],
          impactHeadline: 'End-to-end clinical record security paired with bespoke tactile UI',
          bullets: [
            'Directed complete SDLC delivery under Scrum, leading sprint velocity while personally engineering encrypted authentication and longitudinal clinical records.',
            'Crafted a tactile interface featuring custom choreographed vector SVG loading sequences and micro-interactive medical workflows.',
          ],
          videoUrl: '/videos/mypethealth.mp4',
          shaderTheme: 'bio-pulse',
          accentHex: '#34d399',
        },
        {
          id: 'erp-paraiso',
          index: '03',
          title: 'ERP & Automated Queue “El Paraíso”',
          role: 'Full Stack Systems Developer',
          category: 'Enterprise ERP · Conversational Automation',
          stack: ['Java Servlets', 'MySQL', 'WhatsApp API', 'Production Queues'],
          impactHeadline: 'Zero-touch WhatsApp order injection straight into kitchen production',
          bullets: [
            'Engineered an integrated administrative ERP unified with a customer ordering portal backed by normalized MySQL transactions.',
            'Built automated WhatsApp API webhooks that inject payment-confirmed web orders directly into the live Kitchen Production Queue without human relay.',
          ],
          videoUrl: '/videos/erp-paraiso.mp4',
          shaderTheme: 'queue-matrix',
          accentHex: '#f59e0b',
        },
        {
          id: 'abarrotes-romero',
          index: '04',
          title: 'Inventory & BI Suite “Abarrotes Romero”',
          role: 'Software Developer',
          category: 'Desktop Operations · Automated Reporting',
          stack: ['Python', 'Tkinter', 'Matplotlib', 'ReportLab PDF', 'SQL'],
          impactHeadline: 'Automated executive PDF intelligence & real-time stock control',
          bullets: [
            'Built a responsive desktop CRUD suite governing high-frequency retail sales, SKU stock movements, and supplier replenishment.',
            'Integrated Matplotlib analytical charts with ReportLab to compile one-click operational PDF reports for data-driven purchasing.',
          ],
          videoUrl: '/videos/abarrotes-romero.mp4',
          shaderTheme: 'analytics-wave',
          accentHex: '#a78bfa',
        },
      ],
      labVaultTitle: 'Additional Systems & Computer Science Lab Vault',
      labVaultItems: [
        {
          name: 'Clínica CONSUYAD (.NET / C#)',
          stack: 'C# · .NET Desktop · SQL',
          desc: 'Clinical dossier digitization platform engineered for medical record governance and paperless operations.',
        },
        {
          name: 'Formal Automata & Turing Machine',
          stack: 'Python · Computation Theory',
          desc: 'Deterministic state-transition simulator processing formal grammars and tape operations visually.',
        },
        {
          name: 'Minimax Game AI & EcoBot',
          stack: 'C++ · Arduino · Adversarial Search',
          desc: 'Decision-tree game theory solver paired with embedded hardware robotics prototyping.',
        },
        {
          name: 'Native Android Suite',
          stack: 'Java · Android Studio',
          desc: 'Mobile biometric health tracking and precision utility applications built with native Android SDKs.',
        },
      ],
    },
    glbStage: {
      eyebrow: 'INTERACTIVE THREE.JS + GLB REFRACTION SANDBOX',
      title: 'Optical',
      titleEditorial: '3D GLB Inspector',
      description:
        'Inspect a binary .glb architectural artifact rendered through physical Index-of-Refraction (IOR) Liquid Glass—or drag & drop any custom 3D .glb file directly onto this stage to refract it live.',
      dropHint: 'Drag & drop any .glb file here or orbit with cursor',
      resetModel: 'Restore Default Prism .GLB',
      presets: [
        { id: 'crown-glass', label: 'Crown Glass (IOR 1.52)', ior: 1.52, dispersion: 0.22, distortion: 0.25 },
        { id: 'liquid-mercury', label: 'Liquid Quartz (IOR 1.64)', ior: 1.64, dispersion: 0.38, distortion: 0.55 },
        { id: 'diamond-prism', label: 'Diamond Prism (IOR 2.42)', ior: 2.42, dispersion: 0.65, distortion: 0.18 },
      ],
    },
    bento: {
      eyebrow: 'TECHNICAL ARSENAL · ACADEMIC FOUNDATION · CREDENTIALS',
      title: 'Full-Spectrum',
      titleEditorial: 'Engineering Stack',
      categories: [
        {
          title: 'Enterprise Backend, Desktop & RPA',
          tag: 'CORE ARCHITECTURE',
          description:
            'Distributed job orchestration, headless desktop runtimes, and high-integrity SAP automation.',
          skills: [
            'C#',
            '.NET',
            'ASP.NET Web APIs',
            'DevWinUI (XAML)',
            'SAP RPA',
            'Process Queues & Orchestration',
            'Watchdog Concurrency',
            'Excel Interop',
            'VB.NET',
            'Laravel',
            'Java Servlets',
          ],
          span: 'md:col-span-7',
        },
        {
          title: 'Next-Gen Frontend, WebGL & Motion',
          tag: 'DESIGN ENGINEERING',
          description:
            'Refractive Liquid Glass interfaces, 60fps scroll choreography, and behavioral telemetry.',
          skills: [
            'React.js',
            'Next.js',
            'TypeScript',
            'Three.js / R3F',
            'GSAP ScrollTrigger',
            'Tailwind CSS',
            'Liquid Glass SVG/GLSL',
            'Google Analytics',
          ],
          span: 'md:col-span-5',
        },
        {
          title: 'Cloud, Containers & Persistence',
          tag: 'INFRASTRUCTURE',
          description:
            'On-premise containerized clusters, relational audit stores, and AWS cloud deployments.',
          skills: [
            'Docker',
            'SQL Server',
            'MySQL',
            'MongoDB',
            'AWS (EC2, S3)',
            'On-Premise Servers',
            'Vercel',
            'Git / GitHub CI',
            'Postman',
          ],
          span: 'md:col-span-5',
        },
        {
          title: 'Polyglot Programming Foundation',
          tag: 'LANGUAGES',
          description:
            'Production fluency across strongly-typed enterprise ecosystems, scripting, and query engines.',
          skills: ['C#', 'Python', 'JavaScript (ES6+)', 'TypeScript', 'SQL', 'PHP', 'Java', 'HTML5 / CSS3', 'XAML'],
          span: 'md:col-span-7',
        },
      ],
      education: {
        school: 'University of Guadalajara (CUTonalá)',
        campus: 'Tonalá, Jalisco, MX',
        degree: 'Bachelor of Science in Computer Science',
        period: '2023 – 2027 (Expected)',
        courseworkLabel: 'Core Systems Coursework',
        coursework: [
          'Data Structures & Algorithms',
          'Software Engineering',
          'Cloud Computing',
          'Database Systems',
          'Theory of Computation',
        ],
      },
      certifications: {
        title: 'Verified Certifications',
        items: [
          { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', code: 'CLOUD // INFRA' },
          { name: 'Scrum Fundamentals Certified (SFPC)', issuer: 'CertiProf / Agile', code: 'AGILE // SDLC' },
        ],
      },
      languagesAndLeadership: {
        languagesTitle: 'Communication',
        languages: [
          { lang: 'Spanish', level: 'Native' },
          { lang: 'English', level: 'B2 Upper-Intermediate' },
        ],
        leadershipTitle: 'Executive Competencies',
        competencies: [
          'Cross-Functional Technical Leadership',
          'Assertive Executive & Stakeholder Alignment',
          'Customer Obsession & Gantt Governance',
        ],
      },
    },
    contact: {
      eyebrow: 'READY FOR HIGH-IMPACT ENGINEERING CHALLENGES',
      title: 'Let’s Build',
      titleEditorial: 'The Extraordinary',
      subtitle:
        'Available for Software Engineering, Distributed Automation, Full Stack & Design Engineering opportunities in Guadalajara, Remote, or International.',
      copyEmail: 'Copy alan.avinav@gmail.com',
      copiedEmail: 'Copied to Clipboard!',
      downloadPdf: 'Download Harvard ATS Resume (PDF)',
      availability: 'Tonalá / Guadalajara, Jalisco, MX',
      footerNote: 'Engineered by Alan Emmanuel Aviña Venegas · Optical Liquid Glass · Three.js · GSAP · React 19',
    },
  },
  es: {
    nav: {
      about: 'Resumen',
      aumovio: 'Aumovio',
      experience: 'Trayectoria',
      projects: 'Proyectos',
      lab3d: 'Lab 3D GLB',
      arsenal: 'Stack',
      contact: 'Contacto',
      downloadCv: 'CV ATS (PDF)',
    },
    hero: {
      liveBadge: 'ACTIVO @ AUMOVIO · PLANT FINANCIAL CONTROLLING & ENTERPRISE SYSTEMS',
      eyebrow: 'INGENIERO DE SOFTWARE Y AUTOMATIZACIÓN · SISTEMAS DISTRIBUIDOS · UI/UX DE ÉLITE',
      headlinePrimary: 'ALAN EMMANUEL',
      headlineEditorial: 'Aviña Venegas',
      roleStatement: '.NET / C# · React.js & Next.js · Orquestación Distribuida y Arquitectura Cloud',
      summary:
        'Ingeniería de automatización empresarial de misión crítica, infraestructuras distribuidas libres de colisiones e interfaces web refractivas de última generación que transforman procesos complejos en ejecuciones de un solo clic.',
      ctaPrimary: 'Explorar Arquitectura en Aumovio',
      ctaSecondary: 'Descargar CV ATS (PDF)',
      kpis: [
        {
          value: '230+ hrs',
          label: 'Ahorradas al Año en Aumovio',
          sub: '19+ hrs/mes · +1 mes laboral completo/año',
        },
        {
          value: '0 Colisiones',
          label: 'Cola Asíncrona + Watchdog',
          sub: 'Docker · ASP.NET APIs · SQL Server',
        },
        {
          value: 'Ciclo Completo',
          label: 'De Headless CLI a WebGL UI',
          sub: 'C# DevWinUI · SAP RPA · React 19',
        },
      ],
    },
    aumovio: {
      badge: 'ARQUITECTURA EMPRESARIAL INSIGNIA · GUADALAJARA, MX',
      title: 'Aumovio',
      titleEditorial: 'Motor de Automatización Distribuida',
      roleLine: 'Software & Automation Engineering Intern — Plant Financial Controlling & Enterprise Systems',
      period: 'Jul 2026 – Presente',
      contractNote: 'Programa Empresarial · Jul 2026 – Jul 2027',
      intro:
        'Diseñé, arquitecté y desplegué un ecosistema on-premise de automatización distribuida uniendo Financial Controlling e Ingeniería de TI, eliminando cuellos de botella manuales en SAP con garantías estrictas de concurrencia.',
      simulateBtn: 'Simular Ejecución SAP One-Click',
      simulatingBtn: 'Ejecutando Carga Distribuida...',
      metrics: [
        {
          value: '230+',
          unit: 'hrs / año',
          label: 'Tiempo Operativo Recuperado',
          detail: '19+ horas ahorradas cada mes (+1 mes laboral completo anual) mediante SAP RPA de un clic.',
        },
        {
          value: '100%',
          unit: 'Integridad',
          label: 'Secuenciación Sin Colisiones',
          detail: 'Cola de procesos asíncrona + Orquestador propio + Watchdog de concurrencia en datasets masivos.',
        },
        {
          value: '0 ms',
          unit: 'Overhead UI',
          label: 'Motor Desktop Headless CLI',
          detail: 'Motor C# / XAML (DevWinUI) ejecutándose por CLI sin renderizado visual al dispararse desde web.',
        },
      ],
      pipelineTitle: 'Pipeline Distribuido On-Premise Interactivo',
      pipelineHint: 'Pasa el cursor sobre cada nodo o dispara una simulación en tiempo real',
      nodes: [
        {
          id: 'react-portal',
          step: '01 // CAPA DISPARADORA',
          title: 'Portal Web Next-Gen en React',
          subtitle: 'Plano de Control On-Premise con UI/UX Fluido',
          tech: ['React.js', 'CSS3 Moderno', 'Animaciones Fluidas', 'REST Client'],
          metric: 'UX One-Click',
          detail:
            'Portal web on-premise diseñado con las últimas tendencias de UI/UX y animaciones fluidas para que Financial Controlling dispare automatizaciones SAP en un clic y monitoree su estado.',
          accent: '#38bdf8',
        },
        {
          id: 'aspnet-api',
          step: '02 // CAPA GATEWAY',
          title: 'ASP.NET C# Web APIs',
          subtitle: 'Ingesta Tipada y Validación Empresarial',
          tech: ['C#', 'ASP.NET Core', 'REST APIs', 'Validación'],
          metric: 'Contratos Estrictos',
          detail:
            'APIs en C# de alto rendimiento que validan parámetros financieros, autentican solicitudes e inyectan trabajos deterministas hacia la infraestructura de colas.',
          accent: '#818cf8',
        },
        {
          id: 'orchestrator-watchdog',
          step: '03 // NÚCLEO DE CONCURRENCIA',
          title: 'Cola Asíncrona + Orquestador + Watchdog',
          subtitle: 'Secuenciador Libre de Colisiones en Servidor',
          tech: ['Async Queues', 'Custom Orchestrator', 'Watchdog Controller', 'Locks'],
          metric: '0 Colisiones',
          detail:
            'Orquestador propio y controlador Watchdog que secuencian cargas del servidor sin colisiones entre sesiones SAP/Excel COM y recuperan procesos automáticamente.',
          accent: '#34d399',
        },
        {
          id: 'docker-sql',
          step: '04 // CAPA DE INFRAESTRUCTURA',
          title: 'Clúster Docker & SQL Server',
          subtitle: 'Persistencia Contenerizada y Auditoría',
          tech: ['Docker', 'SQL Databases', 'Logs Excel', 'GitHub CI'],
          metric: 'Trazabilidad Total',
          detail:
            'Infraestructura contenerizada respaldada por bases SQL y bitácoras automatizadas en Excel, gobernada con flujos CI en GitHub empresarial y cronogramas Gantt.',
          accent: '#f59e0b',
        },
        {
          id: 'devwinui-sap',
          step: '05 // MOTOR DE EJECUCIÓN',
          title: 'DevWinUI Headless CLI + SAP RPA',
          subtitle: 'C# / XAML · VB.NET · Excel Interop',
          tech: ['C# / .NET', 'DevWinUI (XAML)', 'SAP RPA', 'VB.NET', 'Excel Interop'],
          metric: '230+ Hrs/Año',
          detail:
            'Motor de escritorio C#/XAML con modo CLI headless que omite la carga gráfica del frontend para ejecutar automatizaciones SAP RPA masivas a máxima velocidad.',
          accent: '#f472b6',
        },
      ],
      governanceNote:
        'Desarrollado en sprints diarios Scrum entre Financial Controlling y TI vía GitHub empresarial, comunicación ejecutiva asertiva con líderes de área y gobierno mediante roadmaps Gantt.',
    },
    experience: {
      eyebrow: 'TRAYECTORIA PROFESIONAL Y LIDERAZGO TÉCNICO',
      title: 'Impacto en',
      titleEditorial: 'Producción y Alianzas',
      items: [
        {
          company: 'Aumovio',
          division: 'Plant Financial Controlling & Enterprise Systems',
          location: 'Guadalajara, MX',
          role: 'Software & Automation Engineering Intern',
          period: 'Jul 2026 – Presente',
          statusBadge: 'ACTUAL',
          stack: ['C# / .NET', 'ASP.NET Web APIs', 'SAP RPA', 'Docker', 'SQL', 'DevWinUI', 'React.js', 'Scrum'],
          highlights: [
            'Desarrollé soluciones críticas SAP RPA en C#, .NET, Visual Basic y Excel Interop convirtiendo flujos manuales en ejecuciones de un clic, ahorrando 19+ hrs/mes (230+ hrs/año).',
            'Arquitecté infraestructura distribuida on-premise con Docker, bases SQL y ASP.NET C# Web APIs, implementando cola asíncrona, Orquestador propio y Watchdog de concurrencia.',
            'Construí un motor desktop C# / XAML (DevWinUI) con ejecución CLI headless disparado desde un Portal Web React.js de última generación.',
            'Alineé prioridades con jefaturas y liderazgo senior entre Financial Controlling y TI bajo sprints Scrum diarios, GitHub CI y bitácoras Gantt/Excel.',
          ],
        },
        {
          company: 'Guía Cultural Metropolitana “Rinconcito”',
          division: 'Alianza Estratégica Cultural Metropolitana',
          location: 'Guadalajara, MX',
          role: 'Technology Infrastructure Engineer & Full Stack Developer',
          period: 'Feb 2026 – Jun 2026',
          stack: ['Full Stack Web', 'Cloud Alta Disponibilidad', 'Google Analytics', 'Telemetría', 'APIs'],
          highlights: [
            'Lideré la arquitectura técnica y comunicación ejecutiva como enlace principal de ingeniería en alianza respaldada por Gobierno de Jalisco, SITEUR, Mi Bici, Casa Profunda y Arte Convergente.',
            'Implementé rastreo de patrones de preferencia y telemetría conductual integrada con Google Analytics y pipelines backend.',
            'Desplegué infraestructura cloud de alta disponibilidad garantizando estabilidad total durante el lanzamiento metropolitano.',
          ],
        },
      ],
    },
    projects: {
      eyebrow: 'PORTAFOLIO DE INGENIERÍA · CARRUSEL 3D INTERACTIVO',
      title: 'Sistemas e',
      titleEditorial: 'Interfaces Destacadas',
      subtitle:
        'Arrastra horizontalmente o usa las flechas para explorar arquitecturas Full Stack, colas de producción en tiempo real y visualizaciones dinámicas.',
      dragHint: 'ARRASTRA O USA LAS FLECHAS PARA GIRAR EL CARRUSEL 3D',
      mediaBadge: 'TELEMETRÍA VIVA',
      items: [
        {
          id: 'restaurant-pos',
          index: '01',
          title: 'Restaurant POS & Dashboard en Tiempo Real',
          role: 'Arquitecto Full Stack & UI Engineer',
          category: 'Flujo Microservicios · Checkout PayPal',
          stack: ['Laravel', 'Tailwind CSS', 'REST APIs', 'PayPal API', 'Postman'],
          impactHeadline: 'Sincronización de meseros, colas de cocina en vivo y cobro seguro PayPal',
          bullets: [
            'Arquitecté una plataforma inspirada en microservicios orquestando operación de meseros, colas de cocina y pagos con PayPal API.',
            'Construí un dashboard administrativo en tiempo real con gráficas interactivas de ventas semanales/mensuales, inventario y mesas.',
            'Validé la fiabilidad de todos los endpoints REST mediante pruebas exhaustivas en Postman.',
          ],
          videoUrl: '/videos/restaurant-pos.mp4',
          shaderTheme: 'pos-prism',
          accentHex: '#38bdf8',
        },
        {
          id: 'mypethealth',
          index: '02',
          title: 'MyPetHealth — Sistema Clínico Veterinario',
          role: 'Project Manager (Scrum) & Lead Dev',
          category: 'SDLC Clínico · Animación SVG a Medida',
          stack: ['Python Full Stack', 'Auth Seguro', 'BD Relacional', 'SVG Custom', 'Scrum'],
          impactHeadline: 'Expedientes clínicos seguros con interfaz táctil y animaciones vectoriales',
          bullets: [
            'Dirigí el ciclo completo de software (SDLC) bajo Scrum, desarrollando autenticación segura y gestión de historiales médicos.',
            'Diseñé una interfaz de alta fidelidad con secuencias de carga SVG personalizadas y micro-interacciones fluidas.',
          ],
          videoUrl: '/videos/mypethealth.mp4',
          shaderTheme: 'bio-pulse',
          accentHex: '#34d399',
        },
        {
          id: 'erp-paraiso',
          index: '03',
          title: 'ERP y Cola Automatizada “El Paraíso”',
          role: 'Full Stack Developer',
          category: 'ERP Administrativo · Automatización WhatsApp',
          stack: ['Java Servlets', 'MySQL', 'WhatsApp API', 'Production Queue'],
          impactHeadline: 'Inyección automática de pedidos web hacia la cola de producción por WhatsApp API',
          bullets: [
            'Desarrollé un ERP administrativo integrado con portal de pedidos para clientes sobre transacciones MySQL.',
            'Implementé automatización con WhatsApp API que inyecta pedidos confirmados directamente a la Cola de Producción de cocina en tiempo real.',
          ],
          videoUrl: '/videos/erp-paraiso.mp4',
          shaderTheme: 'queue-matrix',
          accentHex: '#f59e0b',
        },
        {
          id: 'abarrotes-romero',
          index: '04',
          title: 'Inventario y Reportes BI “Abarrotes Romero”',
          role: 'Software Developer',
          category: 'Operación Desktop · Reportes PDF Automáticos',
          stack: ['Python', 'Tkinter', 'Matplotlib', 'ReportLab PDF', 'SQL'],
          impactHeadline: 'Control operativo CRUD y generación automatizada de inteligencia en PDF',
          bullets: [
            'Construí una suite de escritorio para control de inventarios, ventas rápidas y trazabilidad de productos.',
            'Integré gráficas analíticas de Matplotlib con ReportLab para emitir reportes ejecutivos en PDF en un clic.',
          ],
          videoUrl: '/videos/abarrotes-romero.mp4',
          shaderTheme: 'analytics-wave',
          accentHex: '#a78bfa',
        },
      ],
      labVaultTitle: 'Bóveda Adicional de Ingeniería y Ciencias Computacionales',
      labVaultItems: [
        {
          name: 'Clínica CONSUYAD (.NET / C#)',
          stack: 'C# · .NET Desktop · SQL',
          desc: 'Sistema de escritorio para digitalización de expedientes clínicos y reducción de papel.',
        },
        {
          name: 'Simulador Máquina de Turing',
          stack: 'Python · Teoría de la Computación',
          desc: 'Implementación formal de autómatas para procesamiento visual de lenguajes y transiciones.',
        },
        {
          name: 'IA Minimax & EcoBot',
          stack: 'C++ · Arduino · Teoría de Juegos',
          desc: 'Algoritmo de búsqueda adversaria combinado con prototipado de robótica inteligente.',
        },
        {
          name: 'Suite Apps Android Nativas',
          stack: 'Java · Android Studio',
          desc: 'Aplicaciones móviles de monitoreo de salud y cálculo desarrolladas con SDK nativo.',
        },
      ],
    },
    glbStage: {
      eyebrow: 'LABORATORIO INTERACTIVO THREE.JS + ARCHIVOS GLB',
      title: 'Inspector',
      titleEditorial: 'Óptico 3D GLB',
      description:
        'Explora un artefacto binario .glb renderizado con Índice de Refracción (IOR) físico de Liquid Glass, o arrastra cualquier modelo 3D .glb directamente al escenario para refractarlo en vivo.',
      dropHint: 'Arrastra cualquier archivo .glb aquí o gira con el mouse',
      resetModel: 'Restaurar Prisma .GLB Base',
      presets: [
        { id: 'crown-glass', label: 'Cristal Óptico (IOR 1.52)', ior: 1.52, dispersion: 0.22, distortion: 0.25 },
        { id: 'liquid-mercury', label: 'Cuarzo Líquido (IOR 1.64)', ior: 1.64, dispersion: 0.38, distortion: 0.55 },
        { id: 'diamond-prism', label: 'Prisma Diamante (IOR 2.42)', ior: 2.42, dispersion: 0.65, distortion: 0.18 },
      ],
    },
    bento: {
      eyebrow: 'ARSENAL TÉCNICO · FORMACIÓN ACADÉMICA · CERTIFICACIONES',
      title: 'Ingeniería de',
      titleEditorial: 'Espectro Completo',
      categories: [
        {
          title: 'Backend Empresarial, Desktop & SAP RPA',
          tag: 'ARQUITECTURA CORE',
          description:
            'Orquestación distribuida de procesos, motores desktop headless y automatización SAP de alta integridad.',
          skills: [
            'C#',
            '.NET',
            'ASP.NET Web APIs',
            'DevWinUI (XAML)',
            'SAP RPA',
            'Colas Asíncronas y Orquestación',
            'Watchdog Concurrency',
            'Excel Interop',
            'VB.NET',
            'Laravel',
            'Java Servlets',
          ],
          span: 'md:col-span-7',
        },
        {
          title: 'Frontend Next-Gen, WebGL & Motion',
          tag: 'DESIGN ENGINEERING',
          description:
            'Interfaces Liquid Glass con refracción cromática, coreografía GSAP a 60fps y analítica conductual.',
          skills: [
            'React.js',
            'Next.js',
            'TypeScript',
            'Three.js / R3F',
            'GSAP ScrollTrigger',
            'Tailwind CSS',
            'Liquid Glass SVG/GLSL',
            'Google Analytics',
          ],
          span: 'md:col-span-5',
        },
        {
          title: 'Cloud, Contenedores y Bases de Datos',
          tag: 'INFRAESTRUCTURA',
          description:
            'Clústeres contenerizados on-premise, auditoría SQL y despliegues de alta disponibilidad en AWS.',
          skills: [
            'Docker',
            'SQL Server',
            'MySQL',
            'MongoDB',
            'AWS (EC2, S3)',
            'Servidores On-Premise',
            'Vercel',
            'Git / GitHub CI',
            'Postman',
          ],
          span: 'md:col-span-5',
        },
        {
          title: 'Dominio Políglota de Lenguajes',
          tag: 'LENGUAJES',
          description:
            'Fluidez productiva en ecosistemas empresariales tipados, scripting de automatización y motores SQL.',
          skills: ['C#', 'Python', 'JavaScript (ES6+)', 'TypeScript', 'SQL', 'PHP', 'Java', 'HTML5 / CSS3', 'XAML'],
          span: 'md:col-span-7',
        },
      ],
      education: {
        school: 'Universidad de Guadalajara (CUTonalá)',
        campus: 'Tonalá, Jalisco, MX',
        degree: 'Ingeniería en Ciencias Computacionales (B.S. in Computer Science)',
        period: '2023 – 2027 (Esperado)',
        courseworkLabel: 'Materias Clave de Ingeniería',
        coursework: [
          'Estructuras de Datos y Algoritmos',
          'Ingeniería de Software',
          'Cómputo en la Nube',
          'Sistemas de Bases de Datos',
          'Teoría de la Computación',
        ],
      },
      certifications: {
        title: 'Certificaciones Oficiales',
        items: [
          { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', code: 'CLOUD // INFRA' },
          { name: 'Scrum Fundamentals Certified (SFPC)', issuer: 'CertiProf / Agile', code: 'AGILE // SDLC' },
        ],
      },
      languagesAndLeadership: {
        languagesTitle: 'Idiomas',
        languages: [
          { lang: 'Español', level: 'Nativo' },
          { lang: 'Inglés', level: 'B2 Intermedio-Alto' },
        ],
        leadershipTitle: 'Liderazgo y Competencias',
        competencies: [
          'Liderazgo Técnico Multifuncional',
          'Comunicación Ejecutiva Asertiva con Stakeholders',
          'Customer Obsession & Gobierno Gantt',
        ],
      },
    },
    contact: {
      eyebrow: 'LISTO PARA RETOS DE INGENIERÍA DE ALTO IMPACTO',
      title: 'Construyamos',
      titleEditorial: 'Lo Extraordinario',
      subtitle:
        'Disponible para posiciones de Software Engineering, Automatización Distribuida, Full Stack y Design Engineering en Guadalajara, Remoto o Internacional.',
      copyEmail: 'Copiar alan.avinav@gmail.com',
      copiedEmail: '¡Correo copiado!',
      downloadPdf: 'Descargar CV Formato Harvard ATS (PDF)',
      availability: 'Tonalá / Guadalajara, Jalisco, MX',
      footerNote: 'Desarrollado por Alan Emmanuel Aviña Venegas · Liquid Glass Óptico · Three.js · GSAP · React 19',
    },
  },
};

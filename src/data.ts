import { MonthData, Technology, SkillProgress, Achievement } from './types';

export const MONTHS_DATA: MonthData[] = [
  {
    monthNumber: 1,
    title: "Security Platform Training",
    theme: "Laying the foundations with Next-Gen EDR, SIEM, and Email Security",
    color: "blue",
    weeks: [
      {
        weekNumber: 1,
        title: "SOC Onboarding & Fundamentals",
        category: "onboarding",
        focusPlatform: "SOC Overview",
        items: [
          "Completed comprehensive SafeAeon corporate & operational onboarding",
          "Acquired working model of modern SecOps workflows & Level 1 tier architecture",
          "Reviewed critical cybersecurity fundamentals and attack vector taxonomy",
          "Learned monitoring telemetry sources across endpoint, cloud, and network logs"
        ]
      },
      {
        weekNumber: 2,
        title: "SentinelOne Endpoint Detection & Response",
        category: "training",
        focusPlatform: "SentinelOne",
        items: [
          "Completed specialized threat-hunting and endpoint behavior training",
          "Analyzed the core mechanics of Endpoint Detection and Response (EDR)",
          "Studied behavior engine indicators, process trees, and threat mitigation",
          "Created mock threat containment scripts and policy exclusion groups"
        ]
      },
      {
        weekNumber: 3,
        title: "Rapid7 InsightIDR - SIEM Deep Dive",
        category: "training",
        focusPlatform: "Rapid7",
        items: [
          "Developed proficiency in Security Information & Event Management (SIEM) systems",
          "Executed advanced log search queries and dashboard customizations",
          "Investigated incident response logic, network sensor feeds, and active alerts",
          "Analyzed credential-abuse and horizontal movement detection patterns"
        ]
      },
      {
        weekNumber: 4,
        title: "Avanan - Email Threat Prevention",
        category: "training",
        focusPlatform: "Avanan",
        items: [
          "Reviewed state-of-the-art API-driven cloud email security architecture",
          "Trained on phishing tactics (spearphishing, brand impersonation, spoofing)",
          "Investigated malware sandboxing, link rewriting, and file-sanitizer actions",
          "Monitored quarantine workflows and analyzed spam classification overrides"
        ]
      }
    ]
  },
  {
    monthNumber: 2,
    title: "SOC Operations Integration",
    theme: "Transitioning to real-time incident analysis and active threat hunting",
    color: "cyan",
    weeks: [
      {
        weekNumber: 5,
        title: "Jira System & Flow Optimization",
        category: "training",
        focusPlatform: "Jira",
        items: [
          "Mastered Jira Service Management ticketing frameworks and workflows",
          "Configured security priority matrix, SLA definitions, and auto-escalation pathways",
          "Built customized SOC tracking dashboards for pending ticket reviews",
          "Drafted operational playbook updates for team-wide handoff efficiency"
        ]
      },
      {
        weekNumber: 6,
        title: "Active Duty - SOC Analyst Shift Operations",
        category: "operations",
        focusPlatform: "Rapid7 & SentinelOne",
        items: [
          "Officially assumed active Shift duty as a SOC Analyst Intern",
          "Conducted real-time monitoring of global enterprise security telemetry",
          "Analyzed SentinelOne malware execution traces on live production systems",
          "Evaluated and triaged Rapid7 InsightIDR alerts for network anomalies"
        ]
      },
      {
        weekNumber: 7,
        title: "Alert Triage, Correlation & Escalation",
        category: "operations",
        focusPlatform: "Incident Triage",
        items: [
          "Synthesized multi-source event correlation to confirm true-positive attacks",
          "Created incident case folders with systematic host, user, and IP investigation logs",
          "Exercised precise escalating routines to Senior Security Engineers",
          "Managed immediate client alerts and security recommendations"
        ]
      },
      {
        weekNumber: 8,
        title: "Forcepoint DLP Fundamentals",
        category: "training",
        focusPlatform: "Forcepoint DLP",
        items: [
          "Initiated intensive training in Enterprise Data Loss Prevention (DLP)",
          "Mastered the rules of data classification, digital fingerprinting, and cryptography",
          "Studied centralized DLP policy architectures and agent hooks",
          "Mapped operational frameworks for protecting Intellectual Property from exfiltration"
        ]
      }
    ]
  },
  {
    monthNumber: 3,
    title: "DLP Operations & Documentation",
    theme: "Drafting corporate policy templates and orchestrating DLP rule architectures",
    color: "indigo",
    weeks: [
      {
        weekNumber: 9,
        title: "Forcepoint DLP Policy Deep Dive",
        category: "dlp",
        focusPlatform: "Forcepoint DLP",
        items: [
          "Examined advanced rules for content classifiers and metadata inspection",
          "Learned the design structure of outbound network content filtering policies",
          "Reviewed strict cloud and peripheral port controls for sensitive documents",
          "Drafted specific file regex structures to isolate custom proprietary data formulas"
        ]
      },
      {
        weekNumber: 10,
        title: "Internal Corporate Policy Execution",
        category: "dlp",
        focusPlatform: "Policy Design",
        items: [
          "Designed and applied tailored security rules within real test networks",
          "Conducted false-positive regression analysis across standard developer environments",
          "Optimized scanner load times by eliminating overly generic inspection schemas",
          "Introduced high-accuracy matching rules for personal identifiers and financial numbers"
        ]
      },
      {
        weekNumber: 11,
        title: "SOC Process Documentation & Reporting",
        category: "operations",
        focusPlatform: "Documentation",
        items: [
          "Authored end-to-end SOP playbooks for incoming team onboarding",
          "Drafted incident forensic response checklists to enforce investigation consistency",
          "Compiled standard template schemas for reporting active threat containment actions",
          "Presented operational roadmap deck to internal engineering leads"
        ]
      },
      {
        weekNumber: 12,
        title: "DLP Operational Incident Management",
        category: "dlp",
        focusPlatform: "Forcepoint DLP",
        items: [
          "Handled active daily data loss alarms and unauthorized cloud transfers",
          "Executed policy tuning loops to streamline real employee file activities",
          "Investigated shadow-IT cloud sync applications and endpoint file transfers",
          "Collaborated directly with corporate HR and compliance on policy triggers"
        ]
      }
    ]
  },
  {
    monthNumber: 4,
    title: "Data Security Posture Management (DSPM)",
    theme: "Exploring state-of-the-art discovery pipelines and proactive risk modeling",
    color: "purple",
    weeks: [
      {
        weekNumber: 13,
        title: "DSPM Domain Mastery & Concepts",
        category: "dspm",
        focusPlatform: "DSPM Theory",
        items: [
          "Acquired fundamental knowledge of cloud-native Data Security Posture Management",
          "Analyzed structural shifts from traditional host DLP to active cloud-state Discovery",
          "Reviewed data inventory models for unstructured buckets (AWS S3, GCP Cloud Storage)",
          "Studied risk vectors (dormant databases, public data exposers, blind storage)"
        ]
      },
      {
        weekNumber: 14,
        title: "Sensitive Data Discovery Pipeline",
        category: "dspm",
        focusPlatform: "Data Discovery",
        items: [
          "Designed dynamic search configurations for identifying stale database backups",
          "Conducted deep assessments of critical unencrypted storage buckets",
          "Analyzed the mapping logic for isolating proprietary software codebases",
          "Formulated structured reports defining cloud-exposure index ratings"
        ]
      },
      {
        weekNumber: 15,
        title: "DSPM Security Platform Exploitation",
        category: "dspm",
        focusPlatform: "DSPM Platforms",
        items: [
          "Participated in active exploration and onboarding of dedicated DSPM consoles",
          "Evaluated data lineage indicators that map active reader and developer flows",
          "Verified access rights and tracked unused administrative accounts to data buckets",
          "Built a dashboard of high-risk assets containing customer identity documents"
        ]
      },
      {
        weekNumber: 16,
        title: "Cloud Data Risk Posture Enforcement",
        category: "dspm",
        focusPlatform: "DSPM Policy",
        items: [
          "Implemented comprehensive rules to block cross-region sensitive data replication",
          "Coauthored multi-cloud risk governance scorecards for executive stakeholders",
          "Validated storage bucket permissions, converting open access links to private roles",
          "Simulated storage breach scenarios to evaluate structural warning latency"
        ]
      }
    ]
  },
  {
    monthNumber: 5,
    title: "Cloud Security (CASB) & Advanced Reporting",
    theme: "Enforcing application sandboxing and crafting standard enterprise audit workflows",
    color: "pink",
    weeks: [
      {
        weekNumber: 17,
        title: "Cloud Access Security Broker (CASB)",
        category: "cloud",
        focusPlatform: "CASB",
        items: [
          "Trained on Cloud Access Security Broker (CASB) proxy and API controls",
          "Explored access control models in modern corporate cloud operations",
          "Studied zero-trust architectural policies applying conditional device access",
          "Calculated cloud risk ratings for third-party plug-ins and marketplace widgets"
        ]
      },
      {
        weekNumber: 18,
        title: "SaaS Application Visibility & Threat Vectoring",
        category: "cloud",
        focusPlatform: "CASB Operations",
        items: [
          "Discovered and mapped Shadow-IT operations across active regional IP endpoints",
          "Investigated compromised tenant alerts involving strange cloud-storage activity",
          "Enforced strict controls blocking non-business SaaS and anonymous uploads",
          "Monitored live SaaS console security parameters to secure user workspaces"
        ]
      },
      {
        weekNumber: 19,
        title: "Secure Web Gateway & Access Rules",
        category: "training",
        focusPlatform: "Web Security",
        items: [
          "Trained in high-throughput Gateway controls and web category routing policies",
          "Optimized DNS filtering to defend production staff from suspicious URLs",
          "Conducted SSL/TLS inspection audits to observe hidden file transfer payloads",
          "Applied geo-blocking variables protecting users from known malicious host regimes"
        ]
      },
      {
        weekNumber: 20,
        title: "Enterprise Excel Analytics & Reporting",
        category: "analytics",
        focusPlatform: "Excel Reports",
        items: [
          "Advanced mastery of advanced data filtering, nested lookup tables, and pivot charts",
          "Automated incoming monthly DLP incident reporting layouts",
          "Built deep event trends dashboards tracking incident classifications in Excel",
          "Designed alert metrics forecasting formulas predicting threat patterns"
        ]
      }
    ]
  },
  {
    monthNumber: 6,
    title: "BI Analytics & Final Certification",
    theme: "Developing advanced indicators and preparing compliance handovers",
    color: "emerald",
    weeks: [
      {
        weekNumber: 21,
        title: "Power BI Data Engineering",
        category: "analytics",
        focusPlatform: "Power BI",
        items: [
          "Learned professional Power BI data modeling workflows",
          "Crafted customized DAX measures calculating real-world SecOps ticket resolution speed",
          "Configured ETL connections integrating security event logs from diverse platforms",
          "Parsed complex semi-structured alert metadata into clean dashboard assets"
        ]
      },
      {
        weekNumber: 22,
        title: "DLP Incident Analytics & BI Dashboards",
        category: "analytics",
        focusPlatform: "Power BI Analytics",
        items: [
          "Constructed high-impact, interactive Power BI layouts for DLP telemetry",
          "Designed visual Heatmaps illustrating critical policy violations by organization department",
          "Linked historical alert occurrences, surfacing peak risk hours and repeating hosts",
          "Automated pipeline data updates using native scheduled gateway refreshing"
        ]
      },
      {
        weekNumber: 23,
        title: "Executive Summaries & Advanced KPI Tracking",
        category: "analytics",
        focusPlatform: "Compliance Reports",
        items: [
          "Structured executive compliance summaries tailored for Board of Directors reading",
          "Selected critical KPI targets representing team mean-time-to-contain (MTTC) rates",
          "Correlated DLP event declines directly with policy training deployment times",
          "Organized strategic risk reports outlining high-exposure software systems"
        ]
      },
      {
        weekNumber: 24,
        title: "Internship Consolidation & Graduation",
        category: "wrap-up",
        focusPlatform: "Internship Review",
        items: [
          "Consolidated all security reports, training folders, and system artifacts",
          "Completed comprehensive SafeAeon internship review with team leads",
          "Conducted knowledge transfer sessions to incoming security interns",
          "Reflected on the career transition from cybersecurity student to professional SOC Analyst"
        ]
      }
    ]
  }
];

export const TECHNOLOGIES: Technology[] = [
  {
    name: "SentinelOne",
    purpose: "Endpoint Detection & Response (EDR)",
    skillsAcquired: ["Threat Analysis", "Endpoint Querying", "Killchain Analysis", "Exclusions"],
    experienceLevel: 92,
    color: "#4F46E5",
    category: "Endpoint Security"
  },
  {
    name: "Rapid7 InsightIDR",
    purpose: "Cloud SIEM & Event Correlation",
    skillsAcquired: ["Log Search", "Alert Triage", "UBA Patterns", "Dashboard Design"],
    experienceLevel: 90,
    color: "#E11D48",
    category: "SIEM & Logging"
  },
  {
    name: "Avanan",
    purpose: "API-based Cloud Email Security",
    skillsAcquired: ["Phishing Analysis", "Quarantine Review", "Rules Optimization", "Malware Analytics"],
    experienceLevel: 85,
    color: "#06B6D4",
    category: "Email Security"
  },
  {
    name: "Jira Service Management",
    purpose: "SOC Workflow & Ticketing",
    skillsAcquired: ["Queue Workflows", "SLA Audits", "Custom Form Queries", "Metrics Logging"],
    experienceLevel: 88,
    color: "#2563EB",
    category: "ITSM Systems"
  },
  {
    name: "Forcepoint DLP",
    purpose: "Enterprise Data Loss Prevention",
    skillsAcquired: ["Data Classification", "Policy Design", "Custom Rule Regex", "Alert Handling"],
    experienceLevel: 95,
    color: "#9333EA",
    category: "Data Loss Prevention"
  },
  {
    name: "DSPM",
    purpose: "Data Security Posture Management",
    skillsAcquired: ["Data Asset Tracking", "Risk Indexing", "Cloud Bucket Audits", "Data Lineage"],
    experienceLevel: 80,
    color: "#EC4899",
    category: "Cloud Data Posture"
  },
  {
    name: "CASB",
    purpose: "Cloud Access Security Broker",
    skillsAcquired: ["Shadow-IT Auditing", "Tenant Security", "API Connectors", "Conditional Access"],
    experienceLevel: 82,
    color: "#F43F5E",
    category: "Cloud Security"
  },
  {
    name: "Web Security",
    purpose: "Secure Web Gateway & DNS Policy",
    skillsAcquired: ["Category Controls", "SSL Decryption Auditing", "DNS Routing", "Geo IP Rules"],
    experienceLevel: 85,
    color: "#059669",
    category: "Network Gateway"
  },
  {
    name: "Excel",
    purpose: "Corporate Data Analytics & Reporting",
    skillsAcquired: ["Pivot tables", "Index-Match Formulas", "Data Modeling", "Dynamic Charts"],
    experienceLevel: 90,
    color: "#10B981",
    category: "Data Analytics"
  },
  {
    name: "Power BI",
    purpose: "Business Intelligence Dashboards",
    skillsAcquired: ["DAX Query Development", "ETL Processing", "Interactive UI Heatmaps", "Direct Gateways"],
    experienceLevel: 84,
    color: "#F59E0B",
    category: "Data Visualization"
  }
];

export const SKILL_GROWTH: SkillProgress[] = [
  {
    name: "Incident Analysis",
    initial: 25,
    peak: 92,
    history: [25, 50, 70, 80, 88, 92],
    color: "from-blue-500 to-indigo-600",
    description: "Ability to trace attack paths, compile security packets, and evaluate true-positive indicators."
  },
  {
    name: "Threat Investigation",
    initial: 30,
    peak: 88,
    history: [30, 48, 65, 75, 82, 88],
    color: "from-cyan-500 to-blue-600",
    description: "Endpoint and cloud threat hunting using SentinelOne behavior engines and correlation telemetry."
  },
  {
    name: "DLP Operations",
    initial: 10,
    peak: 95,
    history: [10, 45, 80, 88, 92, 95],
    color: "from-purple-500 to-pink-600",
    description: "Designing end-to-end data categorization formulas, executing audits, and optimizing agent configurations."
  },
  {
    name: "Security Monitoring",
    initial: 40,
    peak: 94,
    history: [40, 68, 82, 88, 92, 94],
    color: "from-emerald-500 to-teal-600",
    description: "Active oversight of global production networks, logs correlation, and responsive incident routing."
  },
  {
    name: "Documentation",
    initial: 50,
    peak: 90,
    history: [50, 65, 75, 82, 88, 90],
    color: "from-slate-500 to-slate-700",
    description: "Drafting incoming onboarding runbooks (SOPs), investigative checklists, and board summaries."
  },
  {
    name: "Policy Creation",
    initial: 5,
    peak: 89,
    history: [5, 20, 65, 78, 84, 89],
    color: "from-amber-500 to-orange-600",
    description: "Formulating custom network patterns, file metadata filters, and security postures across multi-cloud domains."
  },
  {
    name: "Reporting",
    initial: 35,
    peak: 92,
    history: [35, 50, 68, 78, 86, 92],
    color: "from-green-500 to-emerald-600",
    description: "Converting security raw logs into executive charts, prediction grids, and SLA validation databases."
  },
  {
    name: "Cloud Security",
    initial: 15,
    peak: 85,
    history: [15, 28, 45, 68, 80, 85],
    color: "from-sky-500 to-blue-600",
    description: "Establishing safe CASB rules, Shadow-IT scanning, tenant audits, and access sandboxing."
  },
  {
    name: "Data Security",
    initial: 20,
    peak: 90,
    history: [20, 38, 55, 76, 85, 90],
    color: "from-violet-500 to-purple-600",
    description: "Executing Data Security Posture Management (DSPM), discovering cloud backups, and checking bucket configurations."
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "SOC Alert Handling Optimization",
    metric: "400+ Alerts resolved",
    description: "Assumed active role in SafeAeon center tracking Rapid7 SIEM alerts and SentinelOne endpoint events, reducing average triage lag by 15%.",
    iconName: "ShieldAlert",
    category: "SOC Operations",
    technologies: ["Rapid7 InsightIDR", "SentinelOne"]
  },
  {
    id: "ach-2",
    title: "Forcepoint DLP Policy Development",
    metric: "5 Core Policies Installed",
    description: "Formulated robust classifiers protecting corporate intellectual property and personally identifiable data, reducing internal policy-falsing instances by 20%.",
    iconName: "Lock",
    category: "Data Loss Prevention",
    technologies: ["Forcepoint DLP", "Policy Optimization"]
  },
  {
    id: "ach-3",
    title: "DSPM Cloud Risk Assessment",
    metric: "12 Cloud Buckets Secured",
    description: "Cataloged unencrypted databases and closed unauthorized public access vectors across complex server assets leading to zero sensitive data leak incidents.",
    iconName: "CloudLightning",
    category: "Cloud Security",
    technologies: ["DSPM", "Cloud Storage Tracking"]
  },
  {
    id: "ach-4",
    title: "Power BI Security Reporting Systems",
    metric: "Weekly Executive BI Delivery",
    description: "Re-engineered raw incident spreadsheets into elegant, automated visual dashboards, saving management over 8 analyst hours of weekly generation work.",
    iconName: "BarChart3",
    category: "Security BI Analytics",
    technologies: ["Power BI", "Excel", "Data Modeling"]
  },
  {
    id: "ach-5",
    title: "Comprehensive Security Documentation",
    metric: "3 Unified SOP Playbooks",
    description: "Authored end-to-end incident analysis checklists, enabling a 30% speedup in the onboarding time of newly joined junior operations staff.",
    iconName: "FileSpreadsheet",
    category: "Process Engineering",
    technologies: ["Jira", "Excel", "SOP Checklists"]
  },
  {
    id: "ach-6",
    title: "CASB Shadow-IT Discovery Audit",
    metric: "45 Suspicious Platforms Audited",
    description: "Successfully identified high-load unapproved SaaS storage links throughout production networks, protecting central client secrets and ensuring client data compliance.",
    iconName: "Eye",
    category: "Network Gateway Security",
    technologies: ["CASB", "Web Gateway Security"]
  }
];

export const STATS = [
  { label: "Duration", value: "6 Months", icon: "Clock", detail: "Continuous active service" },
  { label: "Platforms Learned", value: "10 Security Suites", icon: "Sliders", detail: "End-to-end coverage" },
  { label: "Alerts Assessed", value: "850+ Events Triaged", icon: "ShieldCheck", detail: "True Incident Triage" },
  { label: "Frameworks Configured", value: "DLP, DSPM & CASB", icon: "TrendingUp", detail: "Advanced cloud-data posture" },
  { label: "Corporate Role", value: "SOC Analyst Intern", icon: "Activity", detail: "Trained at SafeAeon Operations" }
];

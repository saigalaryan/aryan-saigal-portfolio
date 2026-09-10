import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CircleDollarSign,
  Cloud,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Mic,
  Network,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { AmbientWave } from "@/components/landing/ambient-wave";
import { AnimatedSphere } from "@/components/landing/animated-sphere";
import { AnimatedWave } from "@/components/landing/animated-wave";
import { CountUp } from "@/components/landing/count-up";
import { ScrollProgress } from "@/components/landing/scroll-progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollEffects } from "@/components/landing/scroll-effects";
import { InteractiveAI } from "@/components/landing/interactive-ai";
import { TrackedLink } from "@/components/tracked-link";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";

// Icon components cannot be serialised in lib/projects.ts (it is shared with
// the case-study route), so the icon name is resolved here.
const PROJECT_ICONS = {
  BrainCircuit,
  CircleDollarSign,
  Database,
  Mic,
  ShieldCheck,
  Network,
  Code2,
} as const;

const experience = [
  {
    role: "Solutions Architect Intern",
    org: "EMB Global (Incuspaze)",
    location: "Gurgaon, India",
    type: "Internship",
    date: "May 2026 - Present",
    duration: "Current",
    current: true,
    focus:
      "Owning AI/ML product delivery end to end across four verticals, from architecture and retrieval design through to containerised release.",
    stack: ["LangChain", "FastAPI", "Next.js", "GCP Cloud Run", "MCP", "Docker", "GitHub Actions"],
    areas: [
      { title: "Chatbots", detail: "RAG assistants built on LangChain and ChromaDB." },
      { title: "Document intelligence", detail: "Multi-engine OCR with page-level extraction." },
      { title: "Interview automation", detail: "Real-time voice interviewing with proctoring signals." },
      { title: "SQL interfaces", detail: "Natural-language querying over live databases." },
    ],
    points: [
      "Designed and built AI/ML-powered tools across four project verticals — chatbots, document intelligence, interview automation, and SQL interfaces — using LangChain, FastAPI, Next.js, and GCP Cloud Run.",
      "Integrated MCP (Model Context Protocol) servers for multi-modal AI generation, and deployed production services via Docker, GitHub Actions CI/CD, and GCP Cloud Run.",
      "Completed 8 Anthropic AI courses alongside project delivery, including Building with the Claude API, AI Fluency Framework, and Model Context Protocol: Advanced Topics.",
    ],
  },
  {
    role: "ML Intern",
    org: "Innovate",
    location: "Remote",
    type: "Internship",
    date: "Aug 2025 - Oct 2025",
    duration: "3 months",
    current: false,
    focus:
      "Built a predictive traffic model end to end and turned its output into decisions non-technical stakeholders could act on.",
    stack: ["Python", "Regression", "Classification", "Feature engineering", "Matplotlib", "Seaborn"],
    areas: [
      { title: "Data pipeline", detail: "Collection, cleaning, and feature engineering." },
      { title: "Modelling", detail: "Regression and classification trained on the engineered features." },
      { title: "Evaluation", detail: "Hyperparameter tuning and performance scoring across both model types." },
      { title: "Communication", detail: "Matplotlib and Seaborn reporting for non-technical stakeholders." },
    ],
    points: [
      "Developed a machine learning model for road traffic management, titled “Predictive Modeling for Road Traffic Management: A Data-Driven Approach”, targeting congestion reduction through predictive analytics.",
      "Built an end-to-end ML pipeline covering data collection, cleaning, feature engineering, model training across regression and classification, hyperparameter tuning, and performance evaluation.",
      "Visualized model outputs and traffic patterns with Matplotlib and Seaborn, producing charts and reports that communicated insights to non-technical stakeholders.",
    ],
  },
  {
    role: "Cloud Infrastructure Intern",
    org: "CloudSphere",
    location: "Noida, India (Hybrid)",
    type: "Internship",
    date: "May 2025 - Jul 2025",
    duration: "3 months",
    current: false,
    focus:
      "Mapped and audited multi-cloud estates, then turned the findings into cost savings and closed security gaps.",
    stack: ["AWS", "GCP", "IAM policy review", "Cost analysis", "Monitoring & alerting"],
    areas: [
      { title: "Asset audit", detail: "Inventory and dependency mapping across AWS and GCP." },
      { title: "Cost optimisation", detail: "Usage analysis and underutilised-resource reporting." },
      { title: "Security review", detail: "Misconfigurations, IAM policy gaps, and exposure risks." },
      { title: "Monitoring", detail: "Performance monitoring alerts configured across services." },
    ],
    points: [
      "Audited and documented cloud resources and dependencies across multi-cloud environments (AWS, GCP), mapping asset inventories and inter-service relationships.",
      "Analyzed compute, storage, and network usage patterns to identify cost-saving opportunities, preparing optimization reports that highlighted underutilized resources.",
      "Assisted senior engineers in security assessments, identifying misconfigurations, IAM policy gaps, and exposure risks, and configured performance monitoring alerts.",
    ],
  },
  {
    role: "Social Media & Content Intern",
    org: "The Cocoa Counter",
    location: "New Delhi, India",
    type: "Internship",
    date: "May 2024 - Jun 2024",
    duration: "2 months",
    current: false,
    focus:
      "Ran brand content end to end and iterated on it from engagement data rather than instinct.",
    stack: ["Content strategy", "Copywriting", "Engagement analytics", "Brand collaboration"],
    areas: [
      { title: "Content", detail: "Monthly calendars, captions, and design collaboration." },
      { title: "Analytics", detail: "Engagement monitoring and feedback-driven iteration." },
    ],
    points: [
      "Managed brand social media accounts across platforms, developed monthly content calendars, wrote captions, and collaborated with designers on visuals aligned to brand identity.",
      "Monitored platform engagement metrics, responded to customer inquiries, and implemented feedback-driven changes that improved audience response rates.",
    ],
  },
];

const skills = [
  "LangChain",
  "LangGraph",
  "FastAPI",
  "Next.js",
  "React",
  "ChromaDB",
  "MCP servers",
  "GCP Cloud Run",
  "Docker",
  "GitHub Actions",
  "Python",
  "Machine Learning",
  "NLP",
  "RAG",
  "Text-to-SQL",
  "Power BI",
  "Cyber Security",
];

const skillGroups = [
  {
    category: "AI / ML",
    items: [
      "LangChain",
      "LangGraph",
      "RAG pipelines",
      "ChromaDB",
      "OpenRouter",
      "MCP servers",
      "LlamaParse",
      "Docling",
      "spaCy",
      "NLTK",
      "XGBoost",
      "MLflow",
      "Generative AI",
      "Prompt & agent design",
    ],
  },
  {
    category: "Backend",
    items: ["Python", "FastAPI", "Node.js", "REST APIs", "SQL", "PostgreSQL", "SQLite", "Supabase"],
  },
  {
    category: "Frontend",
    items: ["Next.js 14", "React 18", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Cloud & DevOps",
    items: ["GCP Cloud Run", "AWS", "Docker", "GitHub Actions CI/CD", "Vercel", "Cloudflare Workers"],
  },
  {
    category: "Data & Analytics",
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Excel"],
  },
  {
    category: "Security & Networking",
    items: ["Cybersecurity fundamentals", "IAM policy review", "TCP/IP", "IPv4", "Routing"],
  },
];

const languages = [
  { name: "English", level: "Full professional" },
  { name: "Hindi", level: "Native" },
  { name: "French", level: "Read / write" },
];

// Headline capabilities, each tied to where it was actually shipped so the
// claim is backed by something a reader can go and look at.
const coreSkills = [
  {
    name: "RAG pipelines",
    icon: BrainCircuit,
    proof:
      "Chunked and embedded PDF, DOC, and PPT into ChromaDB with OpenRouter retrieval in ConversAge AI, and grounded an 11-language Indian legal corpus in KANOON to cut hallucination.",
    tags: ["LangChain", "ChromaDB", "OpenRouter"],
  },
  {
    name: "LLM agents & MCP servers",
    icon: Network,
    proof:
      "Integrated Model Context Protocol servers to add five capabilities behind one chat interface: blog generation, image creation, video generation, campaign generation, and live web search.",
    tags: ["MCP", "Tool use", "Agent design"],
  },
  {
    name: "Document intelligence & OCR",
    icon: Database,
    proof:
      "Built a platform with four OCR engines selectable per request (LlamaParse, Docling, LiteParser, Document AI), plus page-level extraction and an admin dashboard for model config.",
    tags: ["LlamaParse", "Docling", "FastAPI"],
  },
  {
    name: "Real-time voice AI",
    icon: Mic,
    proof:
      "Browser-based AI interviewer on the OpenAI Realtime Voice API that listens live and generates follow-up questions, with WebRTC screen share and webcam proctoring signals.",
    tags: ["Realtime Voice API", "WebRTC"],
  },
  {
    name: "Text-to-SQL interfaces",
    icon: Code2,
    proof:
      "Schema-aware prompt context turning plain English into validated SQL against a live database, then summarising rows and aggregations back into plain language.",
    tags: ["LangChain", "PostgreSQL", "SQLite"],
  },
  {
    name: "Cloud deployment & CI/CD",
    icon: Cloud,
    proof:
      "Containerised services on GCP Cloud Run with GitHub Actions build-and-release pipelines, plus Vercel and Cloudflare Workers for edge delivery.",
    tags: ["GCP Cloud Run", "Docker", "GitHub Actions"],
  },
  {
    name: "MLOps & model delivery",
    icon: BadgeCheck,
    proof:
      "XGBoost churn pipeline with MLflow experiment tracking and model registry, served from a containerised FastAPI endpoint with retraining automated on AWS.",
    tags: ["MLflow", "XGBoost", "AWS"],
  },
  {
    name: "Cloud security & cost review",
    icon: ShieldCheck,
    proof:
      "Audited multi-cloud AWS and GCP estates for misconfigurations and IAM policy gaps, and produced cost-optimisation reports flagging underutilised resources.",
    tags: ["IAM review", "Cost analysis", "Monitoring"],
  },
];

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    detail: "Cloud concepts, core services, security, architecture, pricing, and support models.",
  },
  {
    name: "Building with the Claude API",
    issuer: "Anthropic",
    detail: "API-based AI product development, prompting patterns, and application integration.",
  },
  {
    name: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    detail: "Advanced MCP patterns for connecting AI systems to external tools and workflows.",
  },
  {
    name: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    detail: "MCP fundamentals: servers, transports, and tool exposure to AI clients.",
  },
  {
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    detail: "Practical AI concepts, model capabilities, responsible usage, and effective collaboration.",
  },
  {
    name: "Introduction to Agent Skills",
    issuer: "Anthropic",
    detail: "Agent workflows, tool use, and skill design for more capable AI assistants.",
  },
  {
    name: "AI Capabilities and Limitations",
    issuer: "Anthropic",
    detail: "Where current models perform well, where they fail, and how to design around both.",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    detail: "Security fundamentals covering threats, risk awareness, and network protection.",
  },
  {
    name: "Python Essentials 1 & 2",
    issuer: "Cisco Networking Academy",
    detail: "Python foundations including control flow, functions, data structures, and OOP.",
  },
];

// Derived from the list itself so the counts cannot drift out of sync with it,
// ordered most-issued first.
const certificationsByIssuer = Object.entries(
  certifications.reduce<Record<string, number>>((acc, cert) => {
    acc[cert.issuer] = (acc[cert.issuer] ?? 0) + 1;
    return acc;
  }, {}),
).sort((a, b) => b[1] - a[1]);

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-foreground noise-overlay">
      <ScrollEffects />
      <ScrollProgress />
      <div className="pointer-events-none fixed inset-0 -z-20 page-backdrop" />
      <AmbientWave />
      <div className="pointer-events-none fixed inset-0 -z-10 page-grid" />

      {/* Single row at every width. It previously wrapped to two rows below
          ~640px, making a ~250px fixed bar that permanently covered content. */}
      <header className="site-header fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
        <div className="w-full max-w-[1180px] rounded-none border border-foreground/10 bg-card/90 px-3 py-2 shadow-card backdrop-blur-xl sm:px-4 sm:py-3">
          <div className="flex flex-nowrap items-center justify-between gap-2">
            <a href="#top" aria-label="Back to top" className="flex shrink-0 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60">
              <span className="grid h-8 w-8 place-items-center bg-foreground font-mono text-xs font-bold tracking-[0.08em] text-background sm:h-9 sm:w-9 sm:text-sm">AS</span>
              <span className="hidden font-mono text-sm font-semibold uppercase tracking-[0.16em] sm:inline">Aryan Saigal</span>
            </a>
            <nav aria-label="Sections" className="flex flex-nowrap items-center gap-0.5 text-xs font-medium text-muted-foreground sm:gap-2 sm:text-sm">
              <a className="nav-link rounded-md px-2 py-1.5 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 sm:px-3 sm:py-2" href="#projects">Projects</a>
              <a className="nav-link rounded-md px-2 py-1.5 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 sm:px-3 sm:py-2" href="#experience">Experience</a>
              <a className="nav-link rounded-md px-2 py-1.5 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 sm:px-3 sm:py-2" href="#skills">Skills</a>
              <a className="nav-link hidden rounded-md px-3 py-2 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 md:inline" href="#education">Education</a>
              <a className="nav-link hidden rounded-md px-3 py-2 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 sm:inline" href="#contact">Contact</a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <section id="top" className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-[min(1180px,calc(100%-24px))] grid-cols-1 items-center gap-8 pb-6 pt-20 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          {/* The three chips that sat here repeated the headline verbatim
              ("AI-powered products / cloud-native systems / scalable web
              applications"), so they added clutter and no information. */}
          <p className="mb-6 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span aria-hidden="true" className="inline-block h-2.5 w-8 accent-rule" />
            Available for roles
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-normal leading-[1.08] tracking-tight drop-shadow-[0_12px_30px_rgba(255,255,255,0.85)] sm:text-5xl lg:text-6xl">
            Building AI-powered products, cloud-native systems, and scalable web applications.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            AI/ML engineer and solutions architect who ships production AI systems end to end, from
            RAG pipelines and LLM agent integrations to the full-stack products built around them.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Solutions Architect Intern at EMB Global · B.Tech CSE, Amity University (2022 - 2026) ·
            AWS Certified Cloud Practitioner · New Delhi, India
          </p>

          {/* One primary action. The social links were previously four
              equally-weighted buttons, which left the hero with no clear
              next step; they are now compact icon links. */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-none">
              <TrackedLink
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                eventName="resume_download"
                eventProperties={{ location: "hero" }}
              >
                <Download aria-hidden="true" className="size-4" /> Resume
              </TrackedLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none bg-background/70">
              <a href="#projects">
                View projects <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </Button>

            <div className="ml-1 flex items-center gap-1 border-l border-foreground/15 pl-3">
              {[
                { href: "https://github.com/saigalaryan", label: "GitHub", channel: "github", Icon: Github },
                {
                  href: "https://www.linkedin.com/in/aryan-saigal-88644976/",
                  label: "LinkedIn",
                  channel: "linkedin",
                  Icon: Linkedin,
                },
                { href: "https://leetcode.com/u/saigalaryan/", label: "LeetCode", channel: "leetcode", Icon: Code2 },
              ].map(({ href, label, channel, Icon }) => (
                <TrackedLink
                  key={channel}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  eventName="contact_interaction"
                  eventProperties={{ channel, location: "hero" }}
                  className="grid size-10 place-items-center border border-transparent text-muted-foreground transition hover:border-foreground/15 hover:bg-background/70 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                >
                  <Icon aria-hidden="true" className="size-5" />
                </TrackedLink>
              ))}
            </div>
          </div>
          {/* Two columns, not four: these sit inside the narrow hero column,
              where four tracked-out labels wrapped to four lines each. */}
          <div className="mt-10 grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
            {[
              { value: "4", label: "Internships", detail: "AI, ML, cloud, and content" },
              { value: "8", label: "Shipped projects", detail: "RAG, agents, OCR, MLOps" },
              { value: "11", label: "Indian languages", detail: "Legal retrieval in KANOON" },
              { value: "9", label: "Certifications", detail: "AWS, Anthropic, Cisco" },
            ].map((metric) => (
              <div key={metric.label} className="flex items-baseline gap-4 bg-card/90 px-5 py-4">
                <span className="font-mono text-3xl font-bold leading-none">
                  <CountUp value={Number(metric.value)} />
                </span>
                <span>
                  <span className="block text-sm font-semibold leading-tight">{metric.label}</span>
                  <span className="mt-1 block text-xs leading-snug text-muted-foreground">{metric.detail}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-console relative min-h-[520px]" data-parallax="-0.06">
          <div className="absolute inset-0 border border-foreground/10 bg-card/90 shadow-raised backdrop-blur-md" />
          <div className="absolute inset-4 overflow-hidden border border-foreground/10 bg-background/85">
            <AnimatedSphere skills={skills} />
          </div>
        </div>
      </section>

      {/* Full-bleed tech rail. Duplicated content plus a -50% shift makes the
          loop seamless; hovering pauses it so labels stay readable. */}
      <div className="marquee-rail relative overflow-hidden border-y border-foreground/10 bg-card/50 py-3">
        <div className="marquee flex w-max gap-3">
          {[...skills, ...skills].map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              aria-hidden={index >= skills.length}
              className="whitespace-nowrap border border-foreground/10 bg-background/70 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto w-[min(1180px,calc(100%-24px))] py-6 sm:py-8" id="work">
        <div className="mb-5 max-w-2xl" data-reveal="slide-right">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Work highlights</p>
          <h2 className="mt-3 font-display text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl">
            What I build, end to end.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Architecture and data pipelines through to containerized deployment, owned as one
            delivery path rather than handed off in pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[
            {
              icon: BrainCircuit,
              title: "AI application delivery",
              description: "Building legal AI chatbots, text-to-SQL assistants, and OCR processing platforms for product use.",
              items: [
                "RAG and agent-driven workflows",
                "Secure data ingestion and fast API delivery",
              ],
            },
            {
              icon: Cloud,
              title: "Cloud deployment & automation",
              description: "Shipping containerized services on AWS and GCP with CI/CD, monitoring, and release automation.",
              items: [
                "Docker + GitHub Actions pipelines",
                "Stable rollout, cost-aware hosting, and observability",
              ],
            },
            {
              icon: Database,
              title: "Data systems & MLOps",
              description: "Creating model delivery pipelines, analytics dashboards, and operational data tooling.",
              items: [
                "ETL, monitoring, and reporting",
                "Dashboards and business-focused insights",
              ],
            },
          ].map((card) => (
            <article key={card.title} className="group relative overflow-hidden rounded-none border border-foreground/10 bg-card/95 p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-raised min-h-[360px]">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-none bg-foreground/10 text-foreground shadow-card">
                <card.icon aria-hidden="true" className="size-7" />
              </div>
              <h3 className="text-3xl font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{card.description}</p>
              <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto w-[min(1180px,calc(100%-24px))] scroll-mt-28 py-20">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal="slide-right">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <a href="#top" aria-label="Back to top" className="flex shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-foreground p-3 text-sm font-semibold uppercase tracking-[0.18em] text-background shadow-hard focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60">
                AS
              </a>
              <div>
                <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Selected repositories</p>
                <h2 className="mt-3 max-w-3xl font-display text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl">
                  Featured project work and production-style systems.
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="w-fit rounded-none bg-background/70 shadow-hard">
              <TrackedLink
                href="https://github.com/saigalaryan"
                target="_blank"
                rel="noreferrer"
                eventName="contact_interaction"
                eventProperties={{ channel: "github", location: "projects_header" }}
              >
                <Github aria-hidden="true" className="size-4" /> GitHub profile
              </TrackedLink>
            </Button>
            <Button asChild variant="outline" className="w-fit rounded-none bg-background/70 shadow-hard">
              <TrackedLink
                href="https://leetcode.com/u/saigalaryan/"
                target="_blank"
                rel="noreferrer"
                eventName="contact_interaction"
                eventProperties={{ channel: "leetcode", location: "projects_header" }}
              >
                <Code2 aria-hidden="true" className="size-4" /> LeetCode profile
              </TrackedLink>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const ProjectIcon = PROJECT_ICONS[project.icon];
            return (
            <Link
              key={project.repo}
              href={`/projects/${project.slug}`}
              className="project-card-3d group flex min-h-[340px] flex-col overflow-hidden border border-foreground/10 bg-card/70 p-5 backdrop-blur transition duration-300 hover:border-foreground/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
              data-reveal="rise"
            >
              <div className="project-visual relative mb-8 h-28 overflow-hidden border border-foreground/10 bg-background/70">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(17,17,17,0.08),transparent_45%),radial-gradient(circle_at_75%_20%,rgba(215,255,102,0.55),transparent_25%)]" />
                <ProjectIcon aria-hidden="true" className="absolute left-5 top-5 size-8" />
                {/* Domain label rather than a 01/02/03 counter: these projects
                    are not a sequence, so a number encoded nothing. */}
                <span className="absolute bottom-4 right-4 font-mono text-sm font-bold uppercase tracking-[0.18em] text-foreground/45">
                  {project.domain}
                </span>
              </div>
              <div className="mt-auto">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{project.repo}</p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">{project.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{project.summary}</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-foreground/10 pt-4">
                  <span className="text-sm font-medium text-muted-foreground">{project.stack}</span>
                  <span className="flex shrink-0 items-center gap-1 text-sm font-semibold">
                    Case study
                    <ArrowUpRight aria-hidden="true" className="size-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      <section id="experience" className="mx-auto w-[min(1180px,calc(100%-24px))] scroll-mt-28 py-20">
        <div className="mb-10" data-reveal="slide-right">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Experience Timeline</p>
          <h2 className="mt-3 font-display text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl">
            Professional milestones and AI/cloud systems experience.
          </h2>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4" data-reveal="rise">
          {[
            { value: "4", label: "Roles across AI, ML, cloud, and content" },
            { value: "3", label: "Technical internships since 2025" },
            { value: "4", label: "Product verticals owned at EMB Global" },
            { value: "2", label: "Clouds worked in production (AWS, GCP)" },
          ].map((stat) => (
            <div key={stat.label} className="border border-foreground/10 bg-card/80 p-4 backdrop-blur">
              <p className="font-mono text-3xl font-semibold">
                <CountUp value={Number(stat.value)} />
              </p>
              <p className="mt-2 text-sm leading-5 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Single spine timeline. The previous layout rendered every role twice
            (a summary panel plus a collapsed <details> panel), which duplicated
            the content and hid the detail behind a click. */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-2 hidden w-px bg-foreground/15 sm:block"
          />
          <ol className="space-y-4">
            {experience.map((exp) => (
              <li key={`${exp.role}-${exp.org}`} className="relative sm:pl-10" data-reveal="rise">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-7 hidden h-4 w-4 rounded-full border-2 border-background sm:block ${
                    exp.current
                      ? "bg-[var(--lime-deep)] ring-4 ring-[var(--lime)]/45"
                      : "bg-foreground/40"
                  }`}
                />
                <article className="rounded-none border border-foreground/10 bg-card/90 p-6 shadow-card sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-2xl font-semibold tracking-tight">{exp.role}</h3>
                        {exp.current && (
                          <span className="border border-foreground/25 bg-[var(--lime)] px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-foreground">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-base font-medium">{exp.org}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {exp.type} · {exp.location}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-mono text-sm font-semibold uppercase tracking-[0.12em]">{exp.date}</p>
                      {/* Duration is omitted for the current role: the badge and
                          "Present" in the date already say it. */}
                      {!exp.current && (
                        <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                          {exp.duration}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="mt-5 border-l-2 border-foreground/20 pl-4 text-sm font-medium leading-6">
                    {exp.focus}
                  </p>

                  <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                    {exp.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      Focus areas
                    </p>
                    <div className="mt-3 grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
                      {exp.areas.map((area, areaIndex) => (
                        <div
                          key={area.title}
                          // An odd count would otherwise leave a filled blank
                          // cell in the two-column grid.
                          className={`bg-card px-4 py-3 ${
                            exp.areas.length % 2 === 1 && areaIndex === exp.areas.length - 1
                              ? "sm:col-span-2"
                              : ""
                          }`}
                        >
                          <p className="text-sm font-semibold">{area.title}</p>
                          <p className="mt-1 text-xs leading-5 text-muted-foreground">{area.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-foreground/10 pt-4">
                    {exp.stack.map((item) => (
                      <span
                        key={item}
                        className="border border-foreground/10 bg-background/70 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="skills" className="mx-auto w-[min(1180px,calc(100%-24px))] scroll-mt-28 py-20">
        <div className="mb-10 max-w-3xl" data-reveal="slide-right">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Core capabilities</p>
          <h2 className="mt-3 font-display text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl">
            The skills I actually ship with.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Each capability below is tied to a system I built and shipped, not just a
            technology I have read about. The full stack breakdown follows underneath.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {coreSkills.map((skill) => (
            <article
              key={skill.name}
              className="cert-card flex flex-col border border-foreground/10 bg-card/80 p-6 backdrop-blur"
              data-reveal="rise"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-foreground/10 text-foreground">
                  <skill.icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="text-xl font-semibold tracking-tight">{skill.name}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{skill.proof}</p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-foreground/10 pt-4">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-foreground/10 bg-background/70 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="glass-panel mt-6 border border-foreground/10 bg-card/70 p-6 backdrop-blur" data-reveal="rise">
          <div className="mb-8 flex items-center gap-3">
            <BriefcaseBusiness aria-hidden="true" className="size-7" />
            <h3 className="text-3xl font-semibold tracking-tight">Full technical stack</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="skill-chip border border-foreground/10 bg-background/70 px-3 py-2 text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="mx-auto w-[min(1180px,calc(100%-24px))] scroll-mt-28 py-20">
        <div className="glass-panel border border-foreground/10 bg-card/70 p-6 backdrop-blur sm:p-8" data-reveal="rise">
          <div className="mb-8 flex items-center gap-3">
            <GraduationCap aria-hidden="true" className="size-7" />
            <h2 className="text-4xl font-semibold tracking-tight">Education & languages</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <div>
                <p className="text-xl font-semibold">B.Tech, Computer Science & Engineering</p>
                <p className="mt-1 text-muted-foreground">Amity University, Noida · 2022 - 2026</p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="border border-foreground/10 p-4">
                  <p className="font-mono text-2xl font-semibold">7.2</p>
                  <p className="mt-1 text-sm text-muted-foreground">GPA / 10</p>
                </div>
                <div className="border border-foreground/10 p-4">
                  <p className="font-mono text-2xl font-semibold">91%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Class XII, CBSE (2022)</p>
                </div>
                <div className="border border-foreground/10 p-4">
                  <p className="font-mono text-2xl font-semibold">85%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Class X, CBSE (2020)</p>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="border border-foreground/10 bg-background/70 p-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Awards</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Academic Excellence Award, Grades 9 to 12 — awarded in each academic year.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Languages</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <span key={language.name} className="border border-foreground/10 bg-background/70 px-3 py-2 text-sm">
                      <span className="font-semibold">{language.name}</span>
                      <span className="text-muted-foreground"> · {language.level}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hire-me" className="mx-auto w-[min(1180px,calc(100%-24px))] py-20">
        <div className="mb-10" data-reveal="slide-right">
          <h2 className="font-display text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl">
            Why hire me and what I am building now.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6">
            <div className="rounded-none border border-foreground/10 bg-card/90 p-8 shadow-card" data-reveal="slide-right">
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Why Hire Me</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "AI Development",
                  "Cloud Deployment",
                  "Solution Architecture",
                  "Full-Stack Development",
                  "Fast Learner",
                  "Product Thinking",
                ].map((item) => (
                  <div key={item} className="rounded-none border border-foreground/10 bg-background/70 p-4 text-sm font-semibold text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-none border border-foreground/10 bg-card/90 p-8 shadow-card" data-reveal="slide-left">
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Currently Building</p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                {[
                  "AI Agents",
                  "RAG Systems",
                  "Cloud Deployments",
                  "QA Testing Frameworks",
                ].map((item) => (
                  <div key={item} className="rounded-none border border-foreground/10 bg-background/70 p-4 font-semibold text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Replaces a generic one-line testimonial. Every figure here is
                checkable against the case studies and the repos they link to,
                which carries more weight than an unverifiable quote. */}
            <div className="rounded-none border border-foreground/10 bg-card/90 p-8 shadow-card" data-reveal="slide-left">
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Track record
              </p>
              <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight">
                Judge the work, not the adjectives.
              </p>
              <dl className="mt-6 border-t border-foreground/10">
                {[
                  { value: "7", label: "systems shipped", detail: "each with a full case study" },
                  { value: "4", label: "product verticals", detail: "owned end to end at EMB Global" },
                  { value: "11", label: "languages supported", detail: "in KANOON's legal retrieval" },
                  { value: "4", label: "OCR engines", detail: "swappable per request in the parser platform" },
                ].map((row) => (
                  <div key={row.label} className="flex items-baseline gap-4 border-b border-foreground/10 py-3">
                    <dt className="w-8 shrink-0 font-mono text-2xl font-bold leading-none">
                      <CountUp value={Number(row.value)} />
                    </dt>
                    <dd>
                      <span className="block text-sm font-semibold">{row.label}</span>
                      <span className="block text-xs leading-5 text-muted-foreground">{row.detail}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div data-reveal="rise">
              <InteractiveAI />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-24px))] py-20">
        <div className="grid grid-cols-1 overflow-hidden border border-foreground/10 bg-card/70 shadow-raised backdrop-blur lg:grid-cols-[0.8fr_1.2fr]" data-reveal="zoom">
          {/* This column used to hold a decorative ASCII canvas that stretched
              to the full height of the list beside it and read as empty space.
              It now carries the actual shape of the certification set. */}
          <div className="flex flex-col gap-8 border-b border-foreground/10 p-6 sm:p-10 lg:border-b-0 lg:border-r">
            <div>
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                At a glance
              </p>
              <p className="mt-5 font-mono text-6xl font-bold leading-none">
                <CountUp value={certifications.length} />
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                certifications completed across cloud, applied AI, security, and programming
                foundations.
              </p>
            </div>

            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                By issuer
              </p>
              <dl className="mt-4 border-t border-foreground/10">
                {certificationsByIssuer.map(([issuer, count]) => (
                  <div key={issuer} className="flex items-baseline justify-between gap-4 border-b border-foreground/10 py-3">
                    <dt className="text-sm font-semibold">{issuer}</dt>
                    <dd className="font-mono text-lg font-bold">{count}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Themes
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Cloud fundamentals", "Claude API", "MCP", "Agent design", "Cybersecurity", "Python"].map((theme) => (
                  <span
                    key={theme}
                    className="border border-foreground/10 bg-background/70 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Fills the column's remaining height rather than leaving dead
                space, and pauses whenever it is offscreen or hidden. */}
            <div className="mt-auto h-32 overflow-hidden border-t border-foreground/10 pt-4">
              <AnimatedWave />
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Courses & certifications</p>
            <h2 className="mt-3 font-display text-4xl font-normal leading-[1.1] tracking-tight">
              Certifications that support engineering, cloud, AI, and data work.
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {certifications.map((cert, index) => (
                <div
                  key={cert.name}
                  // An odd-length list leaves a hole in a two-column grid, so
                  // the final item spans the full width when the count is odd.
                  className={`cert-card flex items-start gap-3 border border-foreground/10 bg-background/70 p-4 ${
                    certifications.length % 2 === 1 && index === certifications.length - 1
                      ? "sm:col-span-2"
                      : ""
                  }`}
                >
                  <BadgeCheck aria-hidden="true" className="mt-1 size-4 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{cert.name}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">{cert.issuer}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{cert.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto w-[min(1180px,calc(100%-24px))] scroll-mt-28 pb-8 pt-20">
        <div className="relative overflow-hidden border border-foreground/10 bg-foreground p-6 text-background shadow-raised sm:p-10" data-reveal="rise">
          <div className="absolute right-0 top-0 h-56 w-56 translate-x-1/3 -translate-y-1/3 rounded-full bg-background/10 blur-3xl" />
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-background/60">Contact</p>
          <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-3xl font-display text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl">
                Aryan Saigal is open to internships, full-time roles, and project opportunities.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-background/70">
                Interested in software engineering, full-stack development, cloud, data, AI,
                solutions architecture, and product engineering roles. Based in New Delhi and
                available for teams building practical, user-focused technology.
              </p>
              <div className="mt-6 grid max-w-2xl grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                <div className="border border-background/15 p-3">
                  <p className="font-mono uppercase tracking-[0.14em] text-background/50">Name</p>
                  <p className="mt-2 font-semibold">Aryan Saigal</p>
                </div>
                <div className="border border-background/15 p-3">
                  <p className="font-mono uppercase tracking-[0.14em] text-background/50">Phone</p>
                  <p className="mt-2 font-semibold">+91 98108 07911</p>
                </div>
                <div className="border border-background/15 p-3">
                  <p className="font-mono uppercase tracking-[0.14em] text-background/50">Location</p>
                  <p className="mt-2 font-semibold">New Delhi, India</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild variant="secondary" size="lg" className="rounded-none">
                <TrackedLink
                  href="mailto:saigalaryan03@gmail.com"
                  eventName="contact_interaction"
                  eventProperties={{ channel: "email", location: "contact" }}
                >
                  <Mail aria-hidden="true" className="size-4" /> saigalaryan03@gmail.com
                </TrackedLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none bg-background/70">
                <TrackedLink
                  href="https://www.linkedin.com/in/aryan-saigal-88644976/"
                  target="_blank"
                  rel="noreferrer"
                  eventName="contact_interaction"
                  eventProperties={{ channel: "linkedin", location: "contact" }}
                >
                  <Linkedin aria-hidden="true" className="size-4" /> LinkedIn
                </TrackedLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none bg-background/70">
                <TrackedLink
                  href="https://leetcode.com/u/saigalaryan/"
                  target="_blank"
                  rel="noreferrer"
                  eventName="contact_interaction"
                  eventProperties={{ channel: "leetcode", location: "contact" }}
                >
                  <Code2 aria-hidden="true" className="size-4" /> LeetCode
                </TrackedLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none border-background/20 bg-transparent text-background hover:bg-background hover:text-foreground">
                <TrackedLink
                  href="tel:+919810807911"
                  eventName="contact_interaction"
                  eventProperties={{ channel: "phone", location: "contact" }}
                >
                  <Phone aria-hidden="true" className="size-4" /> +91 98108 07911
                </TrackedLink>
              </Button>
            </div>
          </div>
        </div>
        <footer className="flex flex-col justify-between gap-4 py-6 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:flex-row">
          <span>Aryan Saigal · Portfolio</span>
          <span>Full-stack · Cloud · AI · Data</span>
        </footer>
      </section>
    </main>
  );
}

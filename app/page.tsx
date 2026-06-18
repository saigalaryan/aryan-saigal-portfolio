import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Mic,
  Network,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { AnimatedSphere } from "@/components/landing/animated-sphere";
import { AnimatedTetrahedron } from "@/components/landing/animated-tetrahedron";
import { AnimatedWave } from "@/components/landing/animated-wave";
import { PortfolioThreeScene } from "@/components/landing/portfolio-three-scene";
import { ScrollEffects } from "@/components/landing/scroll-effects";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "KANOON - AI Legal Decision Support",
    repo: "kanoon-A-legal-decison-making-algorithm",
    href: "https://github.com/saigalaryan/kanoon-A-legal-decison-making-algorithm",
    icon: ShieldCheck,
    stack: "Python, FastAPI, ChromaDB, React, spaCy, NLTK",
    summary:
      "RAG-based legal chatbot that simplifies IPC sections, FIR procedures, and cyber laws across Indian languages.",
  },
  {
    title: "OCR Multi-Model Parser Platform",
    repo: "ocr-parse-extract",
    href: "https://github.com/saigalaryan/ocr-parse-extract",
    icon: Database,
    stack: "FastAPI, LlamaParse, Docling, GCP Cloud Run, Docker",
    summary:
      "Document parsing platform with multi-engine OCR, extract-page routes, admin tooling, docs, CLI, and CI/CD.",
  },
  {
    title: "Ollama Qwen Code Assistant",
    repo: "ollama-qwen-code-assistant",
    href: "https://github.com/saigalaryan/ollama-qwen-code-assistant",
    icon: Code2,
    stack: "Ollama, Qwen Coder, local AI agents",
    summary:
      "Local coding assistant workflow built around Qwen Coder for private, fast, machine-local development help.",
  },
  {
    title: "Customer Churn MLOps Pipeline",
    repo: "customer-churn-mlops-pipeline",
    href: "https://github.com/saigalaryan/customer-churn-mlops-pipeline",
    icon: Network,
    stack: "Machine Learning, MLOps, monitoring, pipelines",
    summary:
      "End-to-end churn prediction pipeline focused on repeatable training, model delivery, and operational visibility.",
  },
  {
    title: "AI Web Interview System",
    repo: "AI-detected-web-interview-systems",
    href: "https://github.com/saigalaryan/AI-detected-web-interview-systems",
    icon: Mic,
    stack: "Next.js, FastAPI, WebRTC, realtime voice",
    summary:
      "Interview platform with admin panel, realtime voice interaction, fullscreen, screen-share, and proctoring signals.",
  },
  {
    title: "Text-to-SQL Chatbot",
    repo: "text-to-sql-chatbot",
    href: "https://github.com/saigalaryan/text-to-sql-chatbot",
    icon: Database,
    stack: "FastAPI, LangChain, SQL, Next.js",
    summary:
      "Natural-language interface that generates SQL, executes backend queries, and explains results in plain language.",
  },
  {
    title: "RAG Chatbot - AI Marketing Suite",
    repo: "RAG-based-chatbot",
    href: "https://github.com/saigalaryan/RAG-based-chatbot",
    icon: BrainCircuit,
    stack: "LangChain, FastAPI, Next.js, ChromaDB, MCP",
    summary:
      "Production-style RAG app with document ingestion, blog generation, media generation, web search, and auth.",
  },
];

const experience = [
  {
    role: "Trainee Solutions Architect",
    org: "EMB Global (Incuspaze), Gurgaon",
    date: "May 2026 - Present",
    points: [
      "Built full-stack RAG, Text-to-SQL, OCR, and AI interview systems using LangChain, FastAPI, Next.js, ChromaDB, MCP servers, and cloud deployment workflows.",
      "Designed GCP Cloud Run deployments, GitHub Actions CI/CD, admin dashboards, document ingestion, authentication, and live web-search integrations.",
    ],
  },
  {
    role: "ML Intern",
    org: "Innovate, Remote",
    date: "Aug 2025 - Oct 2025",
    points: [
      "Developed predictive modeling for road traffic management with preprocessing, training, evaluation, and visualization on real-world data.",
    ],
  },
  {
    role: "Cloud Infrastructure Intern",
    org: "CloudSphere, Remote",
    date: "May 2025 - Jul 2025",
    points: [
      "Worked on cloud asset discovery, cost analysis, security assessment, performance monitoring, and optimization reporting.",
    ],
  },
  {
    role: "Social Media & Content Intern",
    org: "The Cocoa Counter, New Delhi",
    date: "May 2024 - Jun 2024",
    points: [
      "Created content calendars, captions, campaign visuals, and customer engagement workflows for social platforms.",
    ],
  },
];

const skills = [
  "LangChain",
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

const certifications = [
  {
    name: "Anthropic AI Fluency",
    detail: "Practical AI concepts, model capabilities, responsible usage, and effective collaboration with AI systems.",
  },
  {
    name: "Anthropic Advanced MCP",
    detail: "Covered Model Context Protocol concepts for connecting AI systems with external tools and workflows.",
  },
  {
    name: "Anthropic Claude API",
    detail: "Learned API-based AI product development, prompting patterns, and application integration practices.",
  },
  {
    name: "Anthropic Agent Skills & AI Capabilities",
    detail: "Studied agent workflows, tool use, skill design, and ways to build more capable AI assistants.",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    detail: "Foundational AWS certification covering cloud concepts, core services, security, architecture, pricing, and support models.",
  },
  {
    name: "Cisco Python Essentials 1 & 2",
    detail: "Python programming foundations including control flow, functions, data structures, and OOP concepts.",
  },
  {
    name: "Introduction To Cybersecurity",
    detail: "Security fundamentals covering threats, risk awareness, network protection, and safe system practices.",
  },
  {
    name: "Introduction To Generative AI",
    detail: "Core GenAI concepts, use cases, limitations, and practical applications in modern software products.",
  },
  {
    name: "Introduction To Data Science",
    detail: "Data analysis foundations, statistics-driven thinking, and extracting useful insight from datasets.",
  },
  {
    name: "Introduction To Probability And Statistics",
    detail: "Probability, statistical reasoning, and quantitative methods used in analytics and machine learning.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground noise-overlay">
      <ScrollEffects />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[linear-gradient(120deg,#f7f4ec_0%,#edf4ec_42%,#f9f0df_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(17,17,17,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-3">
        <div className="w-full max-w-[1180px] rounded-3xl border border-foreground/10 bg-white/90 px-4 py-3 shadow-[0_14px_50px_rgba(20,20,20,0.07)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-end gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
              <a className="px-3 py-2 hover:text-foreground" href="#projects">Projects</a>
              <a className="px-3 py-2 hover:text-foreground" href="#experience">Experience</a>
              <a className="hidden px-3 py-2 hover:text-foreground sm:inline" href="#contact">Contact</a>
            </div>
            <a href="#top" className="flex shrink-0 items-center gap-3 border border-foreground/10 bg-background/80 px-3 py-2 font-mono text-sm font-semibold uppercase tracking-[0.18em]">
              <span className="grid h-9 w-9 place-items-center bg-foreground text-background shadow-[8px_8px_0_rgba(17,17,17,0.12)]">AS</span>
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-[min(1180px,calc(100%-24px))] grid-cols-1 items-center gap-8 pb-6 pt-24 lg:grid-cols-[1.05fr_0.95fr]">
        <PortfolioThreeScene />
        <div className="relative z-10" data-reveal="slide-right">
          <div className="mb-6 flex flex-wrap gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span className="rounded-full border border-foreground/10 bg-background/70 px-3 py-2 backdrop-blur">Full-stack</span>
            <span className="rounded-full border border-foreground/10 bg-background/70 px-3 py-2 backdrop-blur">Cloud</span>
            <span className="rounded-full border border-foreground/10 bg-background/70 px-3 py-2 backdrop-blur">AI</span>
            <span className="rounded-full border border-foreground/10 bg-background/70 px-3 py-2 backdrop-blur">Data</span>
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight drop-shadow-[0_12px_30px_rgba(255,255,255,0.85)] sm:text-5xl lg:text-6xl xl:text-7xl">
            Aryan Saigal — Full-stack, cloud, and AI engineer focused on building practical, product-ready solutions.
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-none">
              <a href="#projects">
                View repositories <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none bg-background/70">
              <a href="#contact">
                <Mail className="size-4" /> Contact details
              </a>
            </Button>
          </div>
        </div>

        <div className="hero-console relative min-h-[520px]" data-reveal="zoom" data-parallax="-0.06">
          <div className="absolute inset-0 border border-foreground/10 bg-card/55 shadow-[0_40px_120px_rgba(20,20,20,0.16)] backdrop-blur-md" />
          <div className="absolute inset-4 overflow-hidden border border-foreground/10 bg-background/70">
            <AnimatedSphere skills={skills} />
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-24px))] py-6 sm:py-8" id="work">
        <div className="mb-5 max-w-2xl" data-reveal="slide-right">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Work highlights</p>
          <h2 className="mt-3 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Three high-impact engineering cards
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Clear, practical outcomes that show what I build and how it delivers value.
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
            <article key={card.title} className="group relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-card/95 p-8 shadow-[0_28px_90px_rgba(17,17,17,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_36px_110px_rgba(17,17,17,0.18)] min-h-[360px]">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-foreground/10 text-foreground shadow-[0_10px_30px_rgba(17,17,17,0.08)]">
                <card.icon className="size-7" />
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

      <section id="projects" className="mx-auto w-[min(1180px,calc(100%-24px))] py-20">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal="slide-right">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <a href="#top" className="flex shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-foreground p-3 text-sm font-semibold uppercase tracking-[0.18em] text-background shadow-[8px_8px_0_rgba(17,17,17,0.12)]">
                AS
              </a>
              <div>
                <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Selected repositories</p>
                <h2 className="mt-3 max-w-3xl text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
                  Featured project work and production-style systems.
                </h2>
              </div>
            </div>
          </div>
          <Button asChild variant="outline" className="w-fit rounded-none bg-background/70 shadow-[8px_8px_0_rgba(17,17,17,0.08)]">
            <a href="https://github.com/saigalaryan" target="_blank" rel="noreferrer">
              <Github className="size-4" /> GitHub profile
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <a
              key={project.repo}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="project-card-3d group flex min-h-[340px] flex-col overflow-hidden border border-foreground/10 bg-card/70 p-5 backdrop-blur transition duration-300 hover:border-foreground/30"
              data-reveal="rise"
            >
              <div className="project-visual relative mb-8 h-28 overflow-hidden border border-foreground/10 bg-background/70">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(17,17,17,0.08),transparent_45%),radial-gradient(circle_at_75%_20%,rgba(215,255,102,0.55),transparent_25%)]" />
                <project.icon className="absolute left-5 top-5 size-8" />
                <span className="absolute bottom-4 right-4 font-mono text-5xl font-semibold text-foreground/10">0{index + 1}</span>
              </div>
              <div className="mt-auto">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{project.repo}</p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">{project.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{project.summary}</p>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-foreground/10 pt-4">
                  <span className="text-sm font-medium text-muted-foreground">{project.stack}</span>
                  <ArrowUpRight className="size-5 shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto grid w-[min(1180px,calc(100%-24px))] grid-cols-1 gap-8 py-20 lg:grid-cols-[0.75fr_1.25fr]">
        <div data-reveal="slide-right">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Experience</p>
          <h2 className="mt-3 text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
            Trainee architect with hands-on product builds.
          </h2>
          <div className="hero-console mt-8 h-80 border border-foreground/10 bg-card/60 shadow-[0_30px_90px_rgba(20,20,20,0.12)]" data-parallax="-0.04">
            <AnimatedTetrahedron />
          </div>
        </div>
        <div className="border border-foreground/10 bg-card/70 shadow-[0_28px_90px_rgba(20,20,20,0.08)] backdrop-blur">
          {experience.map((item) => (
            <article key={`${item.role}-${item.org}`} className="grid gap-6 border-b border-foreground/10 p-6 last:border-b-0 md:grid-cols-[180px_1fr]" data-reveal="slide-left">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.date}</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{item.role}</h3>
                <p className="mt-1 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <MapPin className="size-4" /> {item.org}
                </p>
                {item.points.map((point) => (
                  <p key={point} className="mt-4 leading-7 text-muted-foreground">{point}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-[min(1180px,calc(100%-24px))] grid-cols-1 gap-4 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel border border-foreground/10 bg-card/70 p-6 backdrop-blur" data-reveal="rise">
          <div className="mb-10 flex items-center gap-3">
            <BriefcaseBusiness className="size-7" />
            <h2 className="text-4xl font-semibold tracking-tight">Technical stack</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="skill-chip border border-foreground/10 bg-background/70 px-3 py-2 text-sm font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="glass-panel border border-foreground/10 bg-card/70 p-6 backdrop-blur" data-reveal="rise">
          <div className="mb-8 flex items-center gap-3">
            <GraduationCap className="size-7" />
            <h2 className="text-4xl font-semibold tracking-tight">Education</h2>
          </div>
          <div className="space-y-5">
            <div>
              <p className="text-xl font-semibold">B.Tech, Computer Science & Engineering</p>
              <p className="mt-1 text-muted-foreground">Amity University, Noida · 2022 - 2026</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="border border-foreground/10 p-4">
                <p className="font-mono text-2xl font-semibold">91%</p>
                <p className="mt-1 text-sm text-muted-foreground">Class XII, CBSE</p>
              </div>
              <div className="border border-foreground/10 p-4">
                <p className="font-mono text-2xl font-semibold">85%</p>
                <p className="mt-1 text-sm text-muted-foreground">Class X, CBSE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-24px))] py-20">
        <div className="grid grid-cols-1 overflow-hidden border border-foreground/10 bg-card/70 shadow-[0_30px_100px_rgba(20,20,20,0.1)] backdrop-blur lg:grid-cols-[0.8fr_1.2fr]" data-reveal="zoom">
          <div className="min-h-[340px] border-b border-foreground/10 lg:border-b-0 lg:border-r" data-parallax="-0.03">
            <AnimatedWave />
          </div>
          <div className="p-6 sm:p-10">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Courses & certifications</p>
            <h2 className="mt-3 text-5xl font-semibold leading-none tracking-tight">
              Certifications that support engineering, cloud, AI, and data work.
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div key={cert.name} className="cert-card flex items-start gap-3 border border-foreground/10 bg-background/70 p-4">
                  <BadgeCheck className="mt-1 size-4 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{cert.name}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{cert.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto w-[min(1180px,calc(100%-24px))] pb-8 pt-20">
        <div className="relative overflow-hidden border border-foreground/10 bg-foreground p-6 text-background shadow-[0_40px_120px_rgba(20,20,20,0.18)] sm:p-10" data-reveal="rise">
          <div className="absolute right-0 top-0 h-56 w-56 translate-x-1/3 -translate-y-1/3 rounded-full bg-background/10 blur-3xl" />
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-background/60">Contact</p>
          <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
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
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild variant="secondary" size="lg" className="rounded-none">
                <a href="mailto:saigalaryan03@gmail.com">
                  <Mail className="size-4" /> saigalaryan03@gmail.com
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none border-background/20 bg-transparent text-background hover:bg-background hover:text-foreground">
                <a href="tel:+919810807911">
                  <Phone className="size-4" /> +91 98108 07911
                </a>
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

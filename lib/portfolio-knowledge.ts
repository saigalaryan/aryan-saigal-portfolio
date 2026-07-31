/**
 * Local answer set for the portfolio assistant.
 *
 * This runs with no API key and no external request: a question is scored
 * against each entry's keywords and the best match is returned verbatim.
 * Every answer is hand-written from the resume, so nothing here is generated
 * or inferred at runtime.
 */

export type KnowledgeEntry = {
  id: string;
  /** Lowercase terms to match against the question. */
  keywords: string[];
  /** Shown as the suggested-question label where relevant. */
  question: string;
  answer: string;
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "overview",
    question: "Who is Aryan Saigal?",
    // Deliberately excludes generic framing like "tell me about" and "about":
    // those describe how a question is asked, not what it is about, and would
    // hijack every "tell me about <topic>" question away from its real topic.
    keywords: [
      "who", "summary", "overview", "introduce", "yourself", "background",
      "profile", "bio", "who is he", "himself", "saigal",
    ],
    answer:
      "Aryan Saigal is an AI/ML engineer and solutions architect who designs and ships production AI systems end to end, from RAG pipelines and LLM agent integrations to the full-stack products built around them.\n\nHe currently works as a Solutions Architect Intern at EMB Global (Incuspaze) in Gurgaon, and is completing a B.Tech in Computer Science & Engineering at Amity University, Noida (2022-2026). He is an AWS Certified Cloud Practitioner, based in New Delhi, India.\n\nHis delivery path covers architecture and data pipelines through to containerised deployment on GCP Cloud Run with GitHub Actions CI/CD.",
  },
  {
    id: "cloud",
    question: "What is Aryan's cloud experience?",
    keywords: [
      "cloud", "aws", "gcp", "google cloud", "devops", "deploy", "deployment",
      "docker", "container", "ci/cd", "cicd", "vercel", "cloudflare",
      "infrastructure", "cloud run", "kubernetes", "hosting",
      // Bare "pipeline" is omitted on purpose: RAG pipelines, ML pipelines and
      // CI/CD pipelines all use the word, so it is matched as a phrase instead.
      "ci/cd pipeline", "deployment pipeline", "build pipeline",
    ],
    answer:
      "Cloud & DevOps stack: GCP Cloud Run, AWS, Docker, GitHub Actions CI/CD, Vercel, and Cloudflare Workers.\n\nAt EMB Global he deploys production services via Docker, GitHub Actions CI/CD, and GCP Cloud Run. As a Cloud Infrastructure Intern at CloudSphere (May-Jul 2025) he audited and documented resources across multi-cloud AWS and GCP environments, mapped asset inventories and inter-service relationships, analysed compute/storage/network usage to find cost savings, and assisted security assessments covering misconfigurations and IAM policy gaps.\n\nShipped examples: the OCR Parser Platform runs containerised on GCP Cloud Run with CI/CD, and ConversAge AI serves its frontend on Vercel with the backend on Cloudflare Workers.",
  },
  {
    id: "kanoon",
    question: "How does KANOON work?",
    keywords: [
      "kanoon", "legal", "law", "ipc", "fir", "cyber law", "multilingual",
      "indian language", "hallucination", "legal tech",
    ],
    answer:
      "KANOON is an AI-powered legal decision support system built with Python, FastAPI, ChromaDB, React 18, spaCy, and NLTK.\n\nIt runs a RAG pipeline over a curated Indian legal corpus covering IPC sections, FIR procedures, and cyber laws. Chunks are embedded and retrieved from ChromaDB so responses are grounded in actual legal text, which reduces hallucination.\n\nIt supports 11 Indian languages using spaCy and NLTK for tokenisation, transliteration, and language detection, making legal information accessible to non-English speakers. The full stack is a React 18 frontend with a FastAPI backend, plus a CLI for dataset ingestion. Aryan also authored an accompanying research paper on AI/ML in Indian legal technology.\n\nRepo: github.com/saigalaryan/kanoon-A-legal-decison-making-algorithm",
  },
  {
    id: "rag",
    question: "What RAG experience does Aryan have?",
    keywords: [
      "rag", "retrieval", "vector", "embedding", "chromadb", "chroma", "langchain",
      "chunk", "openrouter", "semantic search", "knowledge base",
    ],
    answer:
      "RAG is Aryan's core specialism, built with LangChain, ChromaDB, and OpenRouter.\n\nIn ConversAge AI he architected a full-stack RAG pipeline where .pdf, .doc, and .ppt documents are chunked, embedded, and stored as vectors, and each query retrieves the most relevant context before being passed to the LLM via OpenRouter.\n\nIn KANOON he applied the same approach to a curated Indian legal corpus, grounding answers in real legal text across 11 Indian languages to reduce hallucination.\n\nHe also works with LlamaParse and Docling for document ingestion, and MCP servers to extend retrieval systems with external tools.",
  },
  {
    id: "conversage",
    question: "What is ConversAge AI?",
    keywords: [
      "conversage", "conversage ai", "marketing", "content suite", "blog generation",
      "image generation", "video generation", "campaign", "web search", "jwt", "mcp",
    ],
    answer:
      "ConversAge AI is a RAG marketing and content suite built with LangChain, FastAPI, Next.js, ChromaDB, MCP, OpenRouter, Vercel, and Cloudflare.\n\nDocuments (.pdf, .doc, .ppt) are chunked, embedded, and stored as vectors; queries retrieve the most relevant context before hitting the LLM via OpenRouter.\n\nVia MCP server integration it adds five capabilities behind a single Next.js chat interface: AI blog generation, image creation, video generation, a marketing campaign generator, and live web search.\n\nIt is secured with JWT-based authentication and session management, with the frontend on Vercel and the backend on Cloudflare Workers, end-to-end tested across all file formats and generation pipelines.\n\nRepo: github.com/saigalaryan/conversage-ai",
  },
  {
    id: "ocr",
    question: "Tell me about the OCR platform",
    keywords: [
      "ocr", "document intelligence", "parser", "parse", "llamaparse", "docling",
      "liteparser", "document ai", "extract", "pdf parsing", "admin dashboard",
      "ocr platform", "parser platform", "document",
    ],
    answer:
      "The OCR Multi-Model Parser Platform is a document intelligence system built with FastAPI, LlamaParse, Docling, LiteParser, GCP Cloud Run, Docker, and GitHub Actions.\n\nIt supports four OCR engines (LlamaParse, Docling, LiteParser, Document AI) selectable per request, so extraction quality can be compared across document types and layouts.\n\nIt adds an extract-page route for targeted page-level parsing, an admin dashboard for model configuration and usage monitoring, and full settings and documentation pages covering every parser's parameters.\n\nIt is containerised with Docker, deployed to GCP Cloud Run for auto-scaling, with GitHub Actions CI/CD for automated build and release. A standalone CLI for running OCR locally is also published.\n\nRepo: github.com/saigalaryan/ocr-parse-extract",
  },
  {
    id: "interview",
    question: "Tell me about the AI interview platform",
    keywords: [
      "interview", "voice", "realtime", "real-time", "webrtc", "proctoring",
      "screen share", "webcam", "speech", "audio", "openai realtime",
    ],
    answer:
      "The AI Web Interview Platform is a browser-based AI interviewer built with Next.js, FastAPI, the OpenAI Realtime Voice API, and WebRTC.\n\nIt conducts spoken interviews, listens to candidate responses in real time, and generates follow-up questions dynamically based on answers.\n\nWebRTC handles screen sharing, with fullscreen enforcement and webcam-based activity analysis providing proctoring signals to detect suspicious behaviour during sessions.\n\nAn admin panel handles creating and configuring sessions, including question sets, time limits, and candidate access controls, with session recordings and activity logs stored for post-interview review.\n\nRepo: github.com/saigalaryan/AI-detected-web-interview-systems",
  },
  {
    id: "sql",
    question: "How does the Text-to-SQL chatbot work?",
    keywords: [
      "sql", "text-to-sql", "text to sql", "database", "query", "postgres",
      "postgresql", "sqlite", "schema", "natural language",
    ],
    answer:
      "The Text-to-SQL Chatbot is built with FastAPI, LangChain, SQLite/PostgreSQL, and Next.js.\n\nUsers ask questions in plain English, the LLM generates the corresponding SQL query, and the query is validated and executed against a live database backend.\n\nA result-formatting layer converts raw output (rows, counts, aggregations) into plain-language summaries. Table structure is injected into the prompt context to handle multi-step queries, ambiguous phrasing, and schema awareness, which reduces invalid SQL.\n\nRepo: github.com/saigalaryan/text-to-sql-chatbot",
  },
  {
    id: "mlops",
    question: "What MLOps and machine learning work has Aryan done?",
    keywords: [
      "mlops", "ml", "machine learning", "model", "xgboost", "mlflow", "churn",
      "training", "retraining", "experiment", "registry", "traffic", "prediction",
      "regression", "classification", "data science",
      "churn pipeline", "mlops pipeline", "ml pipeline", "model pipeline",
    ],
    answer:
      "Machine learning and MLOps span a shipped pipeline and an internship project.\n\nCustomer Churn MLOps Pipeline (Python, XGBoost, MLflow, FastAPI, Docker, GitHub Actions, AWS): an end-to-end pipeline covering preprocessing, feature engineering, training, hyperparameter tuning, and evaluation. MLflow handles experiment tracking and the model registry, predictions are served from a containerised FastAPI endpoint, and retraining and deployment are automated with GitHub Actions on AWS.\n\nAs an ML Intern at Innovate (Aug-Oct 2025) he developed \"Predictive Modeling for Road Traffic Management: A Data-Driven Approach\", targeting congestion reduction. He built the full pipeline from data collection and cleaning through feature engineering, regression and classification training, tuning, and evaluation, then visualised outputs with Matplotlib and Seaborn for non-technical stakeholders.",
  },
  {
    id: "mcp",
    question: "What has Aryan built with MCP and AI agents?",
    keywords: [
      "mcp", "model context protocol", "agent", "agents", "tool use", "anthropic",
      "claude", "multimodal", "multi-modal",
    ],
    answer:
      "Aryan works with the Model Context Protocol to extend AI systems with external tools.\n\nAt EMB Global he integrated MCP servers for multi-modal AI generation across production services. In ConversAge AI, MCP integration adds five capabilities behind one chat interface: blog generation, image creation, video generation, a marketing campaign generator, and live web search.\n\nHe has completed 8 Anthropic AI courses alongside project delivery, including Building with the Claude API, Model Context Protocol: Advanced Topics, Introduction to Model Context Protocol, AI Fluency: Framework & Foundations, Introduction to Agent Skills, and AI Capabilities and Limitations.",
  },
  {
    id: "experience",
    question: "What is Aryan's work experience?",
    keywords: [
      "experience", "work", "job", "internship", "intern", "role", "career",
      "emb", "incuspaze", "innovate", "cloudsphere", "cocoa counter", "employment",
      "current", "where does he work",
    ],
    answer:
      "Four roles to date:\n\nSolutions Architect Intern, EMB Global (Incuspaze), Gurgaon, May 2026-Present. Built AI/ML tools across four verticals (chatbots, document intelligence, interview automation, SQL interfaces) with LangChain, FastAPI, Next.js, and GCP Cloud Run. Integrated MCP servers for multi-modal generation and deployed via Docker and GitHub Actions CI/CD. Completed 8 Anthropic AI courses in parallel.\n\nML Intern, Innovate, Remote, Aug-Oct 2025. Built a road traffic management model and full ML pipeline, with Matplotlib/Seaborn reporting for non-technical stakeholders.\n\nCloud Infrastructure Intern, CloudSphere, Noida (Hybrid), May-Jul 2025. Multi-cloud AWS and GCP audits, cost optimisation reports, security assessments, and IAM policy gap review.\n\nSocial Media & Content Intern, The Cocoa Counter, New Delhi, May-Jun 2024. Content calendars, captions, and engagement-metric iteration.",
  },
  {
    id: "skills",
    question: "What are Aryan's technical skills?",
    keywords: [
      "skill", "skills", "stack", "tech", "technology", "technologies", "language",
      "framework", "tools", "python", "fastapi", "next.js", "nextjs", "react",
      "node", "typescript", "javascript", "tailwind", "supabase", "frontend",
      "backend", "full stack", "full-stack",
    ],
    answer:
      "AI / ML: LangChain, RAG pipelines, ChromaDB, OpenRouter, MCP servers, LlamaParse, Docling, spaCy, NLTK, XGBoost, MLflow, generative AI, prompt and agent design.\n\nBackend: Python, FastAPI, Node.js, REST APIs, SQL, PostgreSQL, SQLite, Supabase.\n\nFrontend: Next.js 14, React 18, JavaScript, HTML5, CSS3, Tailwind CSS.\n\nCloud & DevOps: GCP Cloud Run, AWS, Docker, GitHub Actions CI/CD, Vercel, Cloudflare Workers.\n\nData & Analytics: Pandas, NumPy, Matplotlib, Seaborn, Power BI, Excel.\n\nSecurity & Networking: cybersecurity fundamentals, IAM policy review, TCP/IP, IPv4, routing.",
  },
  {
    id: "education",
    question: "What is Aryan's education?",
    keywords: [
      "education", "degree", "college", "university", "amity", "b.tech", "btech",
      "gpa", "cgpa", "grade", "school", "cbse", "class", "study", "studied",
      "academic", "award",
    ],
    answer:
      "B.Tech, Computer Science & Engineering at Amity University, Noida (2022-2026), GPA 7.2/10.\n\nClass XII, CBSE: 91% (2022). Class X, CBSE: 85% (2020).\n\nAwards: Academic Excellence Award, Grades 9 to 12, awarded in each academic year.",
  },
  {
    id: "certifications",
    question: "What certifications does Aryan hold?",
    keywords: [
      "certification", "certifications", "certificate", "certified", "course",
      "courses", "aws certified", "cisco", "cloud practitioner", "credential",
    ],
    answer:
      "Nine certifications:\n\nAWS Certified Cloud Practitioner (Amazon Web Services).\n\nAnthropic: Building with the Claude API; Model Context Protocol: Advanced Topics; Introduction to Model Context Protocol; AI Fluency: Framework & Foundations; Introduction to Agent Skills; AI Capabilities and Limitations.\n\nCisco Networking Academy: Introduction to Cybersecurity; Python Essentials 1 & 2.",
  },
  {
    id: "projects",
    question: "What projects has Aryan built?",
    keywords: [
      "project", "projects", "built", "build", "portfolio", "github", "repo",
      "repository", "work samples", "what has he made",
    ],
    answer:
      "Seven shipped projects, each with a full case study on this site covering the problem, how the system works step by step, and why the stack was chosen:\n\n1. ConversAge AI - RAG marketing and content suite with five MCP capabilities. /projects/conversage-ai\n2. OCR Multi-Model Parser Platform - four selectable OCR engines with page-level extraction. /projects/ocr-parser-platform\n3. AI Web Interview Platform - real-time voice interviewer with WebRTC proctoring. /projects/ai-interview-platform\n4. KANOON - legal decision support with RAG across 11 Indian languages. /projects/kanoon\n5. Text-to-SQL Chatbot - schema-aware natural language to validated SQL. /projects/text-to-sql-chatbot\n6. Customer Churn MLOps Pipeline - XGBoost with MLflow and automated AWS retraining. /projects/customer-churn-mlops\n7. Local AI Coding Assistant - fully on-device Ollama and Qwen2.5-Coder. /projects/local-ai-coding-assistant\n\nAll source is on GitHub: github.com/saigalaryan",
  },
  {
    id: "case-studies",
    question: "Where can I read more about a project?",
    // "read more" and "more about" are deliberately excluded: they describe
    // how a question is framed, not its topic, and would hijack questions
    // that name a specific project ("read more about KANOON").
    keywords: [
      "case study", "case studies", "deep dive", "write up", "writeup",
      "architecture", "how it works", "walkthrough",
    ],
    answer:
      "Every project has a case study on this site. Each one covers the problem it solves, a step-by-step walkthrough of how a request moves through the system, why each technology was chosen, and the headline outcomes.\n\n· /projects/conversage-ai\n· /projects/ocr-parser-platform\n· /projects/ai-interview-platform\n· /projects/kanoon\n· /projects/text-to-sql-chatbot\n· /projects/customer-churn-mlops\n· /projects/local-ai-coding-assistant",
  },
  {
    id: "local-ai",
    question: "Tell me about the local AI coding assistant",
    keywords: [
      "ollama", "qwen", "local ai", "on-device", "offline", "privacy", "coding assistant",
      "local model", "zero cost",
    ],
    answer:
      "The Local AI Coding Assistant runs entirely on-device using Ollama and the Qwen2.5-Coder model, with no external API calls, full privacy, and zero inference cost.\n\nIt has a Node.js backend with streaming responses and a browser-based UI, plus Supabase authentication and chat history persisted across sessions.\n\nStack: Ollama, Qwen2.5-Coder, Node.js, Supabase, JavaScript.\n\nRepo: github.com/saigalaryan/ollama-qwen-code-assistant",
  },
  {
    id: "security",
    question: "What security experience does Aryan have?",
    keywords: [
      "security", "cybersecurity", "cyber", "iam", "policy", "tcp/ip", "networking",
      "network", "misconfiguration", "audit", "risk", "vulnerability",
      // Phrases so a topical question outranks the generic experience entry,
      // which also matches the bare word "experience".
      "security experience", "security background", "security work",
    ],
    answer:
      "Security and networking: cybersecurity fundamentals, IAM policy review, TCP/IP, IPv4, and routing.\n\nAt CloudSphere he assisted senior engineers in security assessments, identifying misconfigurations, IAM policy gaps, and exposure risks, and configured performance monitoring alerts.\n\nOn the product side, ConversAge AI is secured with JWT-based authentication and session management. He also holds Cisco's Introduction to Cybersecurity certification.",
  },
  {
    id: "contact",
    question: "How can I contact Aryan?",
    keywords: [
      "contact", "email", "phone", "reach", "hire", "hiring", "linkedin", "github",
      "leetcode", "call", "message", "get in touch", "available", "resume", "cv",
      "download", "location", "based", "where",
    ],
    answer:
      "Email: saigalaryan03@gmail.com\nPhone: +91 98108 07911\nLocation: New Delhi, India\n\nLinkedIn: linkedin.com/in/aryan-saigal-88644976\nGitHub: github.com/saigalaryan\nLeetCode: leetcode.com/u/saigalaryan\n\nHis resume is downloadable from the Resume button at the top of this page. He is open to internships, full-time roles, and project opportunities in software engineering, full-stack, cloud, data, AI, and solutions architecture.",
  },
  {
    id: "languages",
    question: "What languages does Aryan speak?",
    keywords: ["speak", "spoken", "language spoken", "english", "hindi", "french", "fluent"],
    answer:
      "English (full professional), Hindi (native), and French (read / write).",
  },
  {
    id: "why-hire",
    question: "Why should we hire Aryan?",
    keywords: [
      "why hire", "why should", "strength", "strengths", "good fit", "value",
      "bring", "stand out", "differentiator", "best",
    ],
    answer:
      "He owns the full delivery path rather than a single slice of it: architecture, data pipelines, the application layer, and containerised deployment with CI/CD.\n\nConcretely, that has meant shipping AI/ML tools across four project verticals at EMB Global, running RAG systems in two different domains (marketing content and Indian legal text), building real-time voice AI with proctoring, and automating model retraining on AWS.\n\nHe pairs that with formal grounding: AWS Certified Cloud Practitioner, 8 Anthropic AI courses covering the Claude API, MCP, and agent design, and a B.Tech in Computer Science.",
  },
];

/** Stop words excluded from scoring so common filler does not sway matches. */
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being", "do", "does",
  "did", "of", "in", "on", "at", "to", "for", "with", "by", "from", "about", "and",
  // "who" is deliberately absent: it is the primary signal for the overview
  // intent ("who is he", "who is Aryan Saigal").
  "or", "but", "if", "as", "what", "which", "whom", "this", "that", "these",
  "those", "i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us",
  "them", "his", "hers", "its", "our", "their", "my", "your", "can", "could",
  "would", "should", "will", "shall", "may", "might", "must", "have", "has", "had",
  "tell", "give", "show", "know", "any", "some", "how", "please", "aryan", "aryans",
]);

const FALLBACK_ANSWER =
  "I answer from Aryan's resume, so I can only cover what is on it. Try asking about:\n\n" +
  "· His experience, current role, or a specific internship\n" +
  "· A project by name: ConversAge AI, OCR Parser, KANOON, Text-to-SQL, AI Interview Platform, Churn Pipeline, Local Coding Assistant\n" +
  "· A topic: RAG, MCP and agents, cloud and DevOps, MLOps, security\n" +
  "· Skills, education, certifications, or contact details";

export type AnswerResult = {
  answer: string;
  matchedId: string | null;
};

/**
 * Scores the question against every entry and returns the best answer.
 *
 * Multi-word keywords matched as a phrase score highest, single tokens score
 * lower, so "text to sql" beats a generic "sql" mention. Returns a guidance
 * message rather than a wrong answer when nothing clears the threshold.
 */
export function answerQuestion(rawQuestion: string): AnswerResult {
  const question = rawQuestion.toLowerCase().trim();
  if (!question) return { answer: FALLBACK_ANSWER, matchedId: null };

  const tokens = new Set(
    question
      // Keep . + # / - so "next.js", "ci/cd" and "text-to-sql" survive as one
      // token; everything else becomes a separator.
      .replace(/[^a-z0-9\s.+#/-]/g, " ")
      .split(/\s+/)
      // ...but strip those characters when they only bracket a word, so
      // "...cloud" and "sql." match the plain keyword.
      .map((token) => token.replace(/^[.+#/-]+/, "").replace(/[.+#/-]+$/, ""))
      .filter((token) => token.length > 1 && !STOP_WORDS.has(token)),
  );

  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;

    for (const keyword of entry.keywords) {
      if (keyword.includes(" ")) {
        // Phrase hit: strong signal that this is the right topic.
        if (question.includes(keyword)) score += 5;
        continue;
      }
      if (tokens.has(keyword)) score += 2;
      else if (question.includes(keyword)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (!best || bestScore < 2) return { answer: FALLBACK_ANSWER, matchedId: null };
  return { answer: best.answer, matchedId: best.id };
}

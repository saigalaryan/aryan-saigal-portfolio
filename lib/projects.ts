/**
 * Single source of truth for project data.
 *
 * Consumed by the portfolio page (cards) and by /projects/[slug] (case
 * studies). Every field is drawn from the resume; nothing here is inferred.
 */

export type Project = {
  slug: string;
  /** Short domain label shown on the card. Encodes what the project is,
   *  which a sequential 01/02/03 marker did not. */
  domain: string;
  title: string;
  /** Short label used on the card and as the case-study eyebrow. */
  tagline: string;
  repo: string;
  href: string;
  /** Lucide icon name, resolved by the consumer to avoid importing icons here. */
  icon: "BrainCircuit" | "Database" | "Mic" | "ShieldCheck" | "Network" | "Code2";
  stack: string;
  stackList: string[];
  summary: string;
  highlights: string[];
  /** Ordered path a request takes through the system. Each step names a real
   *  component described in the resume; nothing here is inferred. */
  flow: { step: string; detail: string }[];
  /** What each major technology actually does in this system. */
  stackRationale: { tech: string; role: string }[];
  /** Case-study body. Each section is a heading plus paragraphs. */
  caseStudy: {
    context: string;
    sections: { heading: string; body: string[] }[];
  };
};

export const projects: Project[] = [
  {
    slug: "conversage-ai",
    domain: "RAG",
    title: "ConversAge AI - RAG Marketing & Content Suite",
    tagline: "Retrieval-augmented content platform",
    repo: "conversage-ai",
    href: "https://github.com/saigalaryan/conversage-ai",
    icon: "BrainCircuit",
    stack: "LangChain, FastAPI, Next.js, ChromaDB, MCP, OpenRouter, Vercel, Cloudflare",
    stackList: [
      "LangChain",
      "FastAPI",
      "Next.js",
      "ChromaDB",
      "MCP",
      "OpenRouter",
      "Vercel",
      "Cloudflare Workers",
      "JWT",
    ],
    summary:
      "Full-stack RAG pipeline that chunks and embeds PDF, DOC, and PPT uploads into ChromaDB, then retrieves the most relevant context before each LLM call via OpenRouter.",
    highlights: [
      "Five MCP-server capabilities in one chat UI: blog generation, image creation, video generation, campaign generator, and live web search",
      "JWT auth and session management, frontend on Vercel and backend on Cloudflare Workers",
    ],
    flow: [
      { step: "Upload", detail: "A .pdf, .doc, or .ppt is submitted through the Next.js chat interface." },
      { step: "Chunk", detail: "The document is split into passages small enough to embed and retrieve independently." },
      { step: "Embed & store", detail: "Each chunk is converted to a vector and written to ChromaDB." },
      { step: "Retrieve", detail: "An incoming question is matched against those vectors to pull the most relevant passages." },
      { step: "Generate", detail: "Retrieved context and the question go to the model via OpenRouter, so the answer is grounded in the uploaded material." },
      { step: "Extend", detail: "MCP servers expose blog, image, video, campaign, and web-search tools to the same interface." },
    ],
    stackRationale: [
      { tech: "LangChain", role: "Orchestrates the chunk, embed, retrieve, and generate chain." },
      { tech: "ChromaDB", role: "Vector store holding the embedded document chunks." },
      { tech: "OpenRouter", role: "Single gateway to the language model, so the model can change without touching the pipeline." },
      { tech: "MCP", role: "Standard protocol exposing the five generation tools to the chat client." },
      { tech: "FastAPI", role: "Python backend serving retrieval and generation endpoints." },
      { tech: "Next.js", role: "The chat interface all five capabilities are reached from." },
      { tech: "JWT", role: "Authentication and session management." },
      { tech: "Vercel + Cloudflare Workers", role: "Frontend and backend hosting respectively." },
    ],
    caseStudy: {
      context:
        "Marketing teams sit on documents they cannot easily query, and general-purpose chatbots answer without grounding in that material. ConversAge AI closes both gaps: it retrieves from the team's own documents, and it generates the assets they actually need.",
      sections: [
        {
          heading: "Retrieval pipeline",
          body: [
            "Uploaded documents in .pdf, .doc, and .ppt format are chunked, embedded, and stored as vectors in ChromaDB.",
            "On each query the most relevant chunks are retrieved and passed as context to the language model through OpenRouter, so responses are grounded in the source material rather than in the model's parametric memory.",
          ],
        },
        {
          heading: "Extending the assistant through MCP",
          body: [
            "Rather than bolting on separate tools, capabilities are exposed through Model Context Protocol server integration. That keeps the surface uniform: the chat interface calls tools the same way regardless of what they do.",
            "Five capabilities ship behind a single Next.js chat interface: AI blog generation, image creation, video generation, a marketing campaign generator, and live web search.",
          ],
        },
        {
          heading: "Security and deployment",
          body: [
            "The application is secured with JWT-based authentication and session management.",
            "The frontend deploys to Vercel and the backend to Cloudflare Workers, with end-to-end testing across every supported file format and generation pipeline.",
          ],
        },
      ],
    },
  },
  {
    slug: "ocr-parser-platform",
    domain: "OCR",
    title: "OCR Multi-Model Parser Platform",
    tagline: "Document intelligence with swappable engines",
    repo: "ocr-parse-extract",
    href: "https://github.com/saigalaryan/ocr-parse-extract",
    icon: "Database",
    stack: "FastAPI, LlamaParse, Docling, LiteParser, GCP Cloud Run, Docker, GitHub Actions",
    stackList: [
      "FastAPI",
      "LlamaParse",
      "Docling",
      "LiteParser",
      "Document AI",
      "Docker",
      "GCP Cloud Run",
      "GitHub Actions",
    ],
    summary:
      "Document intelligence platform with four OCR engines selectable per request, so extraction quality can be compared across document types and layouts.",
    highlights: [
      "Page-level extract route, admin dashboard for model config and usage monitoring, plus full parser documentation",
      "Dockerized on GCP Cloud Run with GitHub Actions CI/CD, and a standalone CLI for local OCR runs",
    ],
    flow: [
      { step: "Submit", detail: "A document is posted to the FastAPI service with the desired engine named in the request." },
      { step: "Route", detail: "The request is dispatched to one of four parsers: LlamaParse, Docling, LiteParser, or Document AI." },
      { step: "Parse", detail: "The chosen engine extracts text and structure from the document." },
      { step: "Target pages", detail: "The extract-page route parses specific pages only, so large files need not be reprocessed whole." },
      { step: "Monitor", detail: "The admin dashboard records model configuration and usage across requests." },
    ],
    stackRationale: [
      { tech: "FastAPI", role: "Request handling and the per-request engine routing layer." },
      { tech: "LlamaParse", role: "Parser tuned for complex, layout-heavy documents." },
      { tech: "Docling", role: "Parser for structured document conversion." },
      { tech: "LiteParser", role: "Lightweight option for simpler documents where full OCR is overkill." },
      { tech: "Document AI", role: "Managed Google parser, available as a fourth comparison point." },
      { tech: "Docker", role: "Packages the service so local and Cloud Run runs are identical." },
      { tech: "GCP Cloud Run", role: "Auto-scaling host; parsing load is bursty rather than steady." },
      { tech: "GitHub Actions", role: "Automated build and release on every change." },
    ],
    caseStudy: {
      context:
        "No single OCR engine wins across every document type. Scanned invoices, multi-column reports, and slide decks each favour a different parser, so committing to one engine means accepting poor extraction on whole categories of input.",
      sections: [
        {
          heading: "Engine selection per request",
          body: [
            "The platform supports four OCR engines — LlamaParse, Docling, LiteParser, and Document AI — selectable per request.",
            "That turns engine choice into a runtime parameter instead of an architectural commitment, and makes it possible to compare extraction quality across document types and layouts directly.",
          ],
        },
        {
          heading: "Operational tooling",
          body: [
            "An extract-page route handles targeted page-level parsing, so large documents do not have to be reprocessed in full.",
            "An admin dashboard covers model configuration and usage monitoring, backed by settings and documentation pages describing every parser's parameters.",
          ],
        },
        {
          heading: "Delivery",
          body: [
            "The service is containerised with Docker and deployed to GCP Cloud Run for auto-scaling.",
            "GitHub Actions CI/CD automates build and release. A standalone CLI is also published for running OCR locally without the hosted service.",
          ],
        },
      ],
    },
  },
  {
    slug: "ai-interview-platform",
    domain: "VOICE",
    title: "AI Web Interview Platform",
    tagline: "Real-time voice interviewer with proctoring",
    repo: "AI-detected-web-interview-systems",
    href: "https://github.com/saigalaryan/AI-detected-web-interview-systems",
    icon: "Mic",
    stack: "Next.js, FastAPI, OpenAI Realtime Voice API, WebRTC",
    stackList: ["Next.js", "FastAPI", "OpenAI Realtime Voice API", "WebRTC", "Webcam analysis"],
    summary:
      "Browser-based AI interviewer that conducts spoken interviews, listens in real time, and generates follow-up questions dynamically from candidate answers.",
    highlights: [
      "WebRTC screen sharing, fullscreen enforcement, and webcam activity analysis for proctoring signals",
      "Admin panel for question sets, time limits, and candidate access, with recordings and activity logs retained for review",
    ],
    flow: [
      { step: "Configure", detail: "An admin creates a session with its question set, time limit, and candidate access rules." },
      { step: "Join", detail: "The candidate opens the session in the browser; fullscreen is enforced for the duration." },
      { step: "Converse", detail: "The OpenAI Realtime Voice API conducts the interview, listening to answers as they are spoken." },
      { step: "Adapt", detail: "Follow-up questions are generated from the candidate's actual answers rather than read from a fixed script." },
      { step: "Observe", detail: "WebRTC screen sharing and webcam activity analysis produce proctoring signals during the session." },
      { step: "Review", detail: "Recordings and activity logs are stored for a human to review after the interview." },
    ],
    stackRationale: [
      { tech: "OpenAI Realtime Voice API", role: "Speech-to-speech conversation with low enough latency to feel like a dialogue." },
      { tech: "WebRTC", role: "Carries screen share and live media between the candidate and the platform." },
      { tech: "Next.js", role: "Candidate-facing session UI and the admin panel." },
      { tech: "FastAPI", role: "Session management, question sets, and activity log storage." },
      { tech: "Webcam analysis", role: "Produces proctoring signals for human review, not automated verdicts." },
    ],
    caseStudy: {
      context:
        "Screening interviews are expensive to run at volume and inconsistent between interviewers. Automating them only works if the conversation feels responsive and the session can be trusted.",
      sections: [
        {
          heading: "Conversational core",
          body: [
            "The interviewer is built on OpenAI's Realtime Voice API. It conducts spoken interviews, listens to candidate responses as they speak, and generates follow-up questions dynamically based on the answers given.",
            "Because follow-ups are derived from the response rather than read from a fixed script, the interview adapts to each candidate.",
          ],
        },
        {
          heading: "Session integrity",
          body: [
            "WebRTC handles screen sharing. Fullscreen enforcement and webcam-based activity analysis provide proctoring signals that surface suspicious behaviour during a session.",
            "These are signals for human review rather than automated judgements.",
          ],
        },
        {
          heading: "Administration",
          body: [
            "An admin panel handles creating and configuring interview sessions, covering question sets, time limits, and candidate access controls.",
            "Session recordings and activity logs are stored for post-interview review.",
          ],
        },
      ],
    },
  },
  {
    slug: "kanoon",
    domain: "RAG / NLP",
    title: "KANOON - AI Legal Decision Support",
    tagline: "Multilingual legal retrieval across 11 languages",
    repo: "kanoon-A-legal-decison-making-algorithm",
    href: "https://github.com/saigalaryan/kanoon-A-legal-decison-making-algorithm",
    icon: "ShieldCheck",
    stack: "Python, FastAPI, ChromaDB, React 18, spaCy, NLTK, multilingual NLP",
    stackList: [
      "Python",
      "FastAPI",
      "ChromaDB",
      "React 18",
      "spaCy",
      "NLTK",
      "Multilingual NLP",
    ],
    summary:
      "RAG pipeline over a curated Indian legal corpus covering IPC sections, FIR procedures, and cyber laws, grounding every response in actual legal text to reduce hallucination.",
    highlights: [
      "Multilingual support across 11 Indian languages using spaCy and NLTK for tokenization, transliteration, and language detection",
      "React 18 and FastAPI full-stack build with a dataset-ingestion CLI, plus an accompanying research paper on AI/ML in Indian legal tech",
    ],
    flow: [
      { step: "Curate", detail: "A legal corpus is assembled covering IPC sections, FIR procedures, and cyber laws." },
      { step: "Ingest", detail: "A CLI tool loads and chunks the corpus for indexing." },
      { step: "Embed", detail: "Chunks are embedded and stored in ChromaDB for retrieval." },
      { step: "Detect language", detail: "spaCy and NLTK handle language detection, tokenization, and transliteration across 11 Indian languages." },
      { step: "Retrieve", detail: "The question pulls the passages of actual legal text most relevant to it." },
      { step: "Answer", detail: "The response is generated against that retrieved text, so it stays anchored to the statute rather than to model memory." },
    ],
    stackRationale: [
      { tech: "ChromaDB", role: "Vector store for the embedded legal corpus." },
      { tech: "spaCy", role: "Tokenization and language detection across the supported languages." },
      { tech: "NLTK", role: "Transliteration and supporting text processing." },
      { tech: "FastAPI", role: "Serves retrieval and answer generation." },
      { tech: "React 18", role: "The public-facing interface." },
      { tech: "Python CLI", role: "Repeatable dataset ingestion, so the corpus can be rebuilt." },
    ],
    caseStudy: {
      context:
        "Legal information in India is dense, procedural, and largely published in English, which puts it out of reach for many of the people it governs. A general chatbot is actively unsafe here: a confidently wrong answer about an IPC section or an FIR procedure has real consequences.",
      sections: [
        {
          heading: "Grounding over generation",
          body: [
            "A RAG pipeline runs over a curated Indian legal corpus covering IPC sections, FIR procedures, and cyber laws.",
            "Chunks are embedded and retrieved from ChromaDB so that responses are grounded in actual legal text. This is the central design decision: the retrieval step is what reduces hallucination, and in this domain that matters more than fluency.",
          ],
        },
        {
          heading: "Reaching non-English speakers",
          body: [
            "Multilingual NLP support spans 11 Indian languages, implemented with spaCy and NLTK for tokenization, transliteration, and language detection.",
            "The goal was accessibility rather than breadth for its own sake: legal information is only useful to someone who can read it.",
          ],
        },
        {
          heading: "System and research",
          body: [
            "The full stack pairs a React 18 frontend with a FastAPI backend, plus a CLI tool for dataset ingestion.",
            "The work is accompanied by an authored research paper on AI/ML in Indian legal technology.",
          ],
        },
      ],
    },
  },
  {
    slug: "text-to-sql-chatbot",
    domain: "TEXT-TO-SQL",
    title: "Text-to-SQL Chatbot",
    tagline: "Schema-aware natural language querying",
    repo: "text-to-sql-chatbot",
    href: "https://github.com/saigalaryan/text-to-sql-chatbot",
    icon: "Database",
    stack: "FastAPI, LangChain, SQLite/PostgreSQL, Next.js",
    stackList: ["FastAPI", "LangChain", "SQLite", "PostgreSQL", "Next.js"],
    summary:
      "Natural-language-to-SQL interface where plain-English questions become validated SQL, executed against a live database backend.",
    highlights: [
      "Result-formatting layer turns raw rows, counts, and aggregations into plain-language summaries",
      "Table structure injected into prompt context to handle multi-step queries, ambiguous phrasing, and schema awareness",
    ],
    flow: [
      { step: "Ask", detail: "The user types a question in plain English." },
      { step: "Ground in schema", detail: "Table structure is injected into the prompt context so the model knows what actually exists." },
      { step: "Generate", detail: "The model produces the corresponding SQL query." },
      { step: "Validate", detail: "The query is checked before it is allowed near the database." },
      { step: "Execute", detail: "The validated query runs against the live backend." },
      { step: "Summarise", detail: "Rows, counts, and aggregations are converted back into a plain-language answer." },
    ],
    stackRationale: [
      { tech: "LangChain", role: "Builds the prompt, including the injected schema context." },
      { tech: "FastAPI", role: "Validates and executes generated SQL, keeping that step server-side." },
      { tech: "SQLite / PostgreSQL", role: "The live databases queries run against." },
      { tech: "Next.js", role: "Question input and formatted answer display." },
    ],
    caseStudy: {
      context:
        "Most people who need answers from a database cannot write SQL, and most naive text-to-SQL attempts fail on the same things: they do not know the schema, they mishandle ambiguity, and they emit queries that will not run.",
      sections: [
        {
          heading: "Generation and validation",
          body: [
            "Users ask questions in plain English. The model generates the corresponding SQL query, which is then validated before being executed against a live database backend.",
            "Validation before execution is what makes the loop safe to expose to non-technical users.",
          ],
        },
        {
          heading: "Schema awareness",
          body: [
            "Table structure is injected into the prompt context. This is what lets the system handle multi-step queries, ambiguous phrasing, and schema-dependent questions, and it measurably reduces invalid SQL.",
          ],
        },
        {
          heading: "Answers, not result sets",
          body: [
            "A result-formatting layer converts raw query output — rows, counts, aggregations — into plain-language summaries.",
            "The output is an answer to the original question rather than a table the user then has to interpret.",
          ],
        },
      ],
    },
  },
  {
    slug: "customer-churn-mlops",
    domain: "MLOPS",
    title: "Customer Churn MLOps Pipeline",
    tagline: "Tracked, containerised, automatically retrained",
    repo: "customer-churn-mlops-pipeline",
    href: "https://github.com/saigalaryan/customer-churn-mlops-pipeline",
    icon: "Network",
    stack: "Python, XGBoost, MLflow, FastAPI, Docker, GitHub Actions, AWS",
    stackList: ["Python", "XGBoost", "MLflow", "FastAPI", "Docker", "GitHub Actions", "AWS"],
    summary:
      "End-to-end MLOps pipeline for churn prediction with XGBoost, covering preprocessing, feature engineering, training, tuning, and evaluation.",
    highlights: [
      "MLflow for experiment tracking and model registry, predictions served from a containerized FastAPI endpoint",
      "Retraining and deployment automated with GitHub Actions on AWS infrastructure",
    ],
    flow: [
      { step: "Preprocess", detail: "Raw customer data is cleaned and prepared for modelling." },
      { step: "Engineer features", detail: "Predictive features are derived from the cleaned data." },
      { step: "Train", detail: "An XGBoost classifier is fitted to predict churn." },
      { step: "Tune & evaluate", detail: "Hyperparameters are searched and the resulting model is scored." },
      { step: "Track", detail: "Runs, parameters, and metrics are logged to MLflow and the winning model is registered." },
      { step: "Serve", detail: "The registered model is served from a containerised FastAPI inference endpoint." },
      { step: "Retrain", detail: "GitHub Actions automates retraining and redeployment on AWS." },
    ],
    stackRationale: [
      { tech: "XGBoost", role: "Gradient-boosted trees, a strong default for tabular churn data." },
      { tech: "MLflow", role: "Experiment tracking and model registry, so the deployed version is always identifiable." },
      { tech: "FastAPI", role: "Inference endpoint exposing predictions to callers." },
      { tech: "Docker", role: "Pins the runtime so training and serving environments match." },
      { tech: "GitHub Actions", role: "Removes the manual step that usually causes model staleness." },
      { tech: "AWS", role: "Hosts the training and inference infrastructure." },
    ],
    caseStudy: {
      context:
        "A churn model that lives in a notebook is not a product. The harder problem is everything around the model: knowing which version is deployed, reproducing a result, and retraining without a manual checklist.",
      sections: [
        {
          heading: "The model",
          body: [
            "Churn prediction is built on XGBoost, with the pipeline covering data preprocessing, feature engineering, model training, hyperparameter tuning, and evaluation.",
          ],
        },
        {
          heading: "Tracking and registry",
          body: [
            "MLflow provides experiment tracking and a model registry, so runs are comparable and the deployed version is always identifiable.",
          ],
        },
        {
          heading: "Serving and automation",
          body: [
            "Predictions are exposed through a containerised FastAPI inference endpoint.",
            "Retraining and deployment are automated with GitHub Actions on AWS infrastructure, which removes the manual step that usually causes model staleness.",
          ],
        },
      ],
    },
  },
  {
    slug: "local-ai-coding-assistant",
    domain: "LOCAL LLM",
    title: "Local AI Coding Assistant",
    tagline: "Fully on-device, zero inference cost",
    repo: "ollama-qwen-code-assistant",
    href: "https://github.com/saigalaryan/ollama-qwen-code-assistant",
    icon: "Code2",
    stack: "Ollama, Qwen2.5-Coder, Node.js, Supabase, JavaScript",
    stackList: ["Ollama", "Qwen2.5-Coder", "Node.js", "Supabase", "JavaScript"],
    summary:
      "Coding assistant running entirely on-device via Ollama and Qwen2.5-Coder, with no external API calls, full privacy, and zero inference cost.",
    highlights: [
      "Node.js backend with streaming responses and a browser-based UI",
      "Supabase authentication with chat history persisted across sessions",
    ],
    flow: [
      { step: "Authenticate", detail: "Supabase signs the user in and links the session to their chat history." },
      { step: "Prompt", detail: "A coding question is sent from the browser UI to the Node.js backend." },
      { step: "Infer locally", detail: "Ollama runs Qwen2.5-Coder on the machine itself; no request leaves the device." },
      { step: "Stream", detail: "Tokens are streamed back as they are produced rather than held until completion." },
      { step: "Persist", detail: "The exchange is written to Supabase so history survives across sessions." },
    ],
    stackRationale: [
      { tech: "Ollama", role: "Local model runtime, which is what makes zero external calls possible." },
      { tech: "Qwen2.5-Coder", role: "Code-specialised model small enough to run on consumer hardware." },
      { tech: "Node.js", role: "Backend bridging the browser UI and the local runtime, with streaming responses." },
      { tech: "Supabase", role: "Authentication and persistent chat history." },
    ],
    caseStudy: {
      context:
        "Cloud coding assistants mean sending source code to a third party and paying per token. For proprietary or client work, neither is always acceptable.",
      sections: [
        {
          heading: "Running locally",
          body: [
            "The assistant runs entirely on-device using Ollama and the Qwen2.5-Coder model, making no external API calls at all.",
            "That yields three properties at once: complete privacy, zero inference cost, and no dependency on network availability.",
          ],
        },
        {
          heading: "Interface and persistence",
          body: [
            "A Node.js backend provides streaming responses to a browser-based UI, so output appears as it is produced rather than after a full completion.",
            "Supabase handles authentication and persists chat history across sessions.",
          ],
        },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

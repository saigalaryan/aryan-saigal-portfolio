import { NextResponse } from "next/server";

import { answerQuestion } from "@/lib/portfolio-knowledge";

const GEMINI_MODELS = [
  process.env.GEMINI_MODEL || "gemini-3.5-flash",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
].filter((model, index, models) => models.indexOf(model) === index);

const portfolioContext = `
You are Aryan Saigal's portfolio assistant. Answer questions about Aryan's work,
skills, education, projects, and contact details using concise, recruiter-friendly
language. If asked for something unrelated to Aryan's portfolio, briefly connect
the answer back to Aryan's AI, cloud, full-stack, data, and product engineering work.

Portfolio facts:
- Positioning: AI/ML Engineer, Solutions Architect, and Full-Stack Developer. Designs and ships
  production AI systems end to end, from RAG pipelines and LLM agent integrations to the
  full-stack products built around them.
- Based in New Delhi, India. AWS Certified Cloud Practitioner.

Experience:
- Solutions Architect Intern, EMB Global (Incuspaze), Gurgaon, May 2026 - Present. Built AI/ML
  tools across four verticals (chatbots, document intelligence, interview automation, SQL
  interfaces) with LangChain, FastAPI, Next.js, GCP Cloud Run. Integrated MCP servers for
  multi-modal generation. Completed 8 Anthropic AI courses alongside delivery.
- ML Intern, Innovate, Remote, Aug 2025 - Oct 2025. Built "Predictive Modeling for Road Traffic
  Management: A Data-Driven Approach" with a full pipeline and Matplotlib/Seaborn reporting.
- Cloud Infrastructure Intern, CloudSphere, Noida (Hybrid), May 2025 - Jul 2025. Multi-cloud
  (AWS, GCP) asset audits, cost optimization reports, security assessments and IAM policy gaps.
- Social Media & Content Intern, The Cocoa Counter, New Delhi, May 2024 - Jun 2024.

Skills:
- AI/ML: LangChain, RAG pipelines, ChromaDB, OpenRouter, MCP servers, LlamaParse, Docling,
  spaCy, NLTK, XGBoost, MLflow, generative AI, prompt and agent design.
- Backend: Python, FastAPI, Node.js, REST APIs, SQL, PostgreSQL, SQLite, Supabase.
- Frontend: Next.js 14, React 18, JavaScript, HTML5, CSS3, Tailwind CSS.
- Cloud/DevOps: GCP Cloud Run, AWS, Docker, GitHub Actions CI/CD, Vercel, Cloudflare Workers.
- Data: Pandas, NumPy, Matplotlib, Seaborn, Power BI, Excel.
- Security/Networking: cybersecurity fundamentals, IAM policy review, TCP/IP, IPv4, routing.

Projects:
- ConversAge AI (RAG marketing and content suite): LangChain + ChromaDB RAG over PDF/DOC/PPT,
  five MCP capabilities (blog, image, video, campaign generator, web search), JWT auth,
  Vercel frontend and Cloudflare Workers backend.
- OCR Multi-Model Parser Platform: four selectable OCR engines (LlamaParse, Docling, LiteParser,
  Document AI), page-level extract route, admin dashboard, Docker on GCP Cloud Run, CI/CD, CLI.
- AI Web Interview Platform: OpenAI Realtime Voice API interviewer with dynamic follow-ups,
  WebRTC screen share, fullscreen enforcement, webcam proctoring signals, admin panel.
- KANOON (AI legal decision support): RAG over Indian legal corpus (IPC sections, FIR
  procedures, cyber laws), 11 Indian languages via spaCy/NLTK, React 18 + FastAPI, research paper.
- Text-to-SQL Chatbot: plain English to validated SQL, plain-language result summaries,
  schema injected into prompt context.
- Customer Churn MLOps Pipeline: XGBoost, MLflow tracking and registry, FastAPI inference,
  automated retraining via GitHub Actions on AWS.
- Local AI Coding Assistant: fully on-device Ollama + Qwen2.5-Coder, streaming Node.js backend,
  Supabase auth and persistent history, zero inference cost.

Education: B.Tech Computer Science & Engineering, Amity University, Noida, 2022 - 2026, GPA 7.2/10.
  Class XII CBSE 91% (2022), Class X CBSE 85% (2020). Academic Excellence Award, grades 9-12.
Certifications: AWS Certified Cloud Practitioner; Anthropic (Building with the Claude API, MCP
  Advanced Topics, Introduction to MCP, AI Fluency, Introduction to Agent Skills, AI Capabilities
  and Limitations); Cisco (Introduction to Cybersecurity, Python Essentials 1 & 2).
Languages: English (full professional), Hindi (native), French (read/write).
Contact: saigalaryan03@gmail.com, phone +91 98108 07911, LinkedIn
  https://www.linkedin.com/in/aryan-saigal-88644976/, GitHub https://github.com/saigalaryan,
  LeetCode https://leetcode.com/u/saigalaryan/.
`;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const MAX_PROMPT_LENGTH = 600;

/**
 * Fixed-window request counter kept in module memory.
 *
 * Serverless instances are per-region and recycle, so this throttles casual
 * abuse and runaway clients rather than enforcing a hard global quota. If the
 * key needs a guaranteed ceiling, move this to a shared store (Upstash Redis,
 * Vercel KV) so every instance sees the same counters.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string) {
  const now = Date.now();

  // Opportunistic sweep so abandoned keys cannot grow the map without bound.
  if (hits.size > 5_000) {
    for (const [existing, entry] of hits) {
      if (now > entry.resetAt) hits.delete(existing);
    }
  }

  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
  }

  return { allowed: true, retryAfter: 0 };
}

function clientKey(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(req: Request) {
  try {
    const { allowed, retryAfter } = checkRateLimit(clientKey(req));
    if (!allowed) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${retryAfter}s.` },
        { status: 429, headers: { "Retry-After": `${retryAfter}` } },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const rawPrompt = (body as { prompt?: unknown } | null)?.prompt;
    if (typeof rawPrompt !== "string") {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const prompt = rawPrompt.trim();
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { error: `Prompt is too long. Keep it under ${MAX_PROMPT_LENGTH} characters.` },
        { status: 413 },
      );
    }

    // Default path: answer locally from the resume knowledge base. No API key,
    // no external request, no model call. The Gemini path below stays dormant
    // unless GEMINI_API_KEY is set, so adding a key later upgrades this
    // endpoint without any code change.
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      const { answer, matchedId } = answerQuestion(prompt);
      return NextResponse.json({ reply: answer, source: "local", matchedId });
    }

    let lastError = "";

    for (const model of GEMINI_MODELS) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": geminiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: portfolioContext }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 700,
            temperature: 0.4,
          },
        }),
      });

      if (!res.ok) {
        // Kept server-side only: upstream bodies can echo request details.
        lastError = `${model} -> ${res.status} ${await res.text()}`;

        if ([429, 500, 502, 503, 504].includes(res.status)) {
          continue;
        }

        console.error("[api/ai] upstream error:", lastError);
        // Degrade to the local knowledge base rather than showing an error.
        const { answer, matchedId } = answerQuestion(prompt);
        return NextResponse.json({ reply: answer, source: "local", matchedId });
      }

      const data = await res.json();
      const assistant = data.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("")
        .trim();

      if (assistant) {
        return NextResponse.json({ reply: assistant, model });
      }

      lastError = `${model} returned no text`;
    }

    if (lastError) console.error("[api/ai] all models failed:", lastError);
    // Every model failed; still answer from the resume rather than failing.
    const { answer, matchedId } = answerQuestion(prompt);
    return NextResponse.json({ reply: answer, source: "local", matchedId });
  } catch (err) {
    console.error("[api/ai] unhandled error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

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
- Aryan Saigal builds AI-powered products, cloud-native systems, and scalable web applications.
- Trainee Solutions Architect at EMB Global (Incuspaze), Gurgaon, May 2026 - Present.
- Experience includes RAG systems, OCR platforms, Text-to-SQL tools, AI interview systems,
  FastAPI, Next.js, LangChain, ChromaDB, Docker, GitHub Actions, and GCP Cloud Run.
- Projects include KANOON legal decision support, OCR Multi-Model Parser Platform,
  Ollama Qwen Code Assistant, Customer Churn MLOps Pipeline, AI Web Interview System,
  Text-to-SQL Chatbot, and RAG Chatbot - AI Marketing Suite.
- Education: B.Tech Computer Science & Engineering, Amity University, Noida, 2022 - 2026,
  college CGPA 7.2.
- Contact: saigalaryan03@gmail.com, LinkedIn profile, phone +91 98108 07911.
`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Missing prompt" }, { status: 400 });

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return NextResponse.json({ error: "Server not configured: set GEMINI_API_KEY in environment" }, { status: 501 });
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
        lastError = await res.text();

        if ([429, 500, 502, 503, 504].includes(res.status)) {
          continue;
        }

        return NextResponse.json({ error: lastError || "Gemini error" }, { status: res.status });
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

    return NextResponse.json(
      { error: lastError || "Gemini is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { trackInteraction } from "@/lib/analytics";

const SUGGESTED = [
  "What is Aryan's cloud experience?",
  "How does KANOON work?",
  "What RAG experience does he have?",
  "Why should we hire him?",
];

const INTRO =
  "Ask about Aryan's experience, projects, skills, or education and I'll answer straight from his resume. Try one of the questions below.";

export function InteractiveAI() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<Array<{ sender: "user" | "assistant"; text: string }>>([
    { sender: "assistant", text: INTRO },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitQuery = async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed || loading) return;

    setError(null);
    setHistory((cur) => [...cur, { sender: "user", text: trimmed }]);
    setQuery("");
    setLoading(true);
    trackInteraction("assistant_question", { question: trimmed.slice(0, 100) });

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        const message = data.error || "Something went wrong. Please try again.";
        setError(message);
        setHistory((cur) => [...cur, { sender: "assistant", text: message }]);
      } else {
        setHistory((cur) => [
          ...cur,
          { sender: "assistant", text: data.reply || "No answer available." },
        ]);
      }
    } catch {
      const message = "Could not reach the assistant. Check your connection and try again.";
      setError(message);
      setHistory((cur) => [...cur, { sender: "assistant", text: message }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitQuery(query);
  };

  return (
    <div className="rounded-none border border-foreground/10 bg-card/90 p-6 shadow-card">
      <div className="mb-6">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Portfolio assistant
        </p>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight">Ask about my work</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Instant answers sourced directly from my resume — experience, projects, stack,
          and contact details.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {SUGGESTED.map((suggestion) => (
          <Button
            key={suggestion}
            onClick={() => submitQuery(suggestion)}
            disabled={loading}
            variant="outline"
            size="sm"
            className="rounded-none"
          >
            {suggestion}
          </Button>
        ))}
      </div>

      <div
        className="mb-4 max-h-[320px] space-y-4 overflow-y-auto rounded-none border border-foreground/10 bg-background/80 p-5 text-sm text-muted-foreground shadow-inner"
        aria-live="polite"
      >
        {history.map((message, index) => (
          <div key={index} className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {message.sender === "user" ? "You" : "Assistant"}
            </p>
            <div
              className={`whitespace-pre-line break-words rounded-none p-4 ${
                message.sender === "assistant"
                  ? "bg-foreground text-background"
                  : "bg-background/90 text-foreground"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-sm italic text-muted-foreground">Looking that up...</div>}
      </div>

      {error && (
        <div role="alert" className="mb-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ask a question..."
          maxLength={600}
          aria-label="Ask a question about Aryan's work"
          className="w-full break-words rounded-none border border-foreground/10 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-foreground/60 focus:ring-2 focus:ring-foreground/10"
        />
        <Button type="submit" size="lg" className="rounded-none" disabled={loading || !query.trim()}>
          {loading ? "..." : "Ask"}
        </Button>
      </form>
    </div>
  );
}

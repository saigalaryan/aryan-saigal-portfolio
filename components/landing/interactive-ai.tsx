"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export function InteractiveAI() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<Array<{ sender: "user" | "assistant"; text: string }>>([
    {
      sender: "assistant",
      text: "Ask any question about Aryan's work or projects. This portfolio chatbot uses Aryan's portfolio context to generate concise answers.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitQuery = async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    setError(null);
    setHistory((cur) => [...cur, { sender: "user", text: trimmed }]);
    setQuery("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "AI error");
        setHistory((cur) => [...cur, { sender: "assistant", text: data.error || "AI error" }]);
      } else {
        setHistory((cur) => [...cur, { sender: "assistant", text: data.reply || "No reply" }]);
      }
    } catch (err) {
      const msg = String(err);
      setError(msg);
      setHistory((cur) => [...cur, { sender: "assistant", text: msg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitQuery(query);
  };

  return (
    <div className="rounded-[2rem] border border-foreground/10 bg-card/90 p-6 shadow-[0_28px_90px_rgba(17,17,17,0.12)]">
      <div className="mb-6">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Interactive AI features</p>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight">Resume Chat + Project Q&A</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Ask any question and receive a generated answer using Aryan's portfolio context.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <Button onClick={() => submitQuery("Tell me about Aryan's cloud experience")} variant="outline" size="sm" className="rounded-3xl">
          Tell me about Aryan's cloud experience
        </Button>
        <Button onClick={() => submitQuery("How does Kanoon work?")} variant="outline" size="sm" className="rounded-3xl">
          How does Kanoon work?
        </Button>
      </div>

      <div className="mb-4 max-h-[320px] space-y-4 overflow-y-auto rounded-[1.75rem] border border-foreground/10 bg-background/80 p-5 text-sm text-muted-foreground shadow-inner">
        {history.map((message, idx) => (
          <div key={idx} className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{message.sender === "user" ? "You" : "Assistant"}</p>
            <div className={`break-words rounded-3xl p-4 ${message.sender === "assistant" ? "bg-slate-950/70 text-slate-100" : "bg-background/90 text-foreground"}`}>
              {message.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-sm italic text-muted-foreground">Thinking...</div>}
      </div>

      {error && <div className="mb-3 text-sm text-destructive">{error}</div>}

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          className="w-full break-words rounded-3xl border border-foreground/10 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-foreground/60 focus:ring-2 focus:ring-foreground/10"
        />
        <Button type="submit" size="lg" className="rounded-3xl" disabled={loading}>
          {loading ? "..." : "Ask"}
        </Button>
      </form>
    </div>
  );
}

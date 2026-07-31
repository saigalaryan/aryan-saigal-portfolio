import { describe, expect, it } from "vitest";

import { answerQuestion, knowledgeBase } from "@/lib/portfolio-knowledge";

describe("answerQuestion", () => {
  it("routes topic questions to the right entry", () => {
    const cases: [string, string][] = [
      ["what cloud experience does Aryan have", "cloud"],
      ["how does kanoon work", "kanoon"],
      ["what is conversage ai", "conversage"],
      ["what is his education", "education"],
      ["why should we hire him", "why-hire"],
      ["how do I contact him", "contact"],
      ["what are his technical skills", "skills"],
      ["what certifications does he have", "certifications"],
      ["does he do text to sql", "sql"],
      ["what languages does he speak", "languages"],
      ["what is the local coding assistant", "local-ai"],
      ["tell me about the interview platform", "interview"],
      ["what about MCP and agents", "mcp"],
      ["what rag experience", "rag"],
      ["what projects has he built", "projects"],
    ];

    for (const [question, expected] of cases) {
      expect(answerQuestion(question).matchedId, question).toBe(expected);
    }
  });

  // Each of these was a real mis-routing found by manual testing.
  describe("regressions", () => {
    it("does not let 'tell me about' hijack the topic", () => {
      // "tell me about" used to be an overview keyword, so every
      // "tell me about <topic>" question resolved to the overview entry.
      expect(answerQuestion("tell me about the OCR platform").matchedId).toBe("ocr");
      expect(answerQuestion("tell me about conversage").matchedId).toBe("conversage");
      expect(answerQuestion("tell me about churn pipeline").matchedId).toBe("mlops");
    });

    it("matches the overview for who-is questions", () => {
      // "who" was a stop word, so these scored below the match threshold.
      expect(answerQuestion("who is aryan saigal").matchedId).toBe("overview");
      expect(answerQuestion("who is he").matchedId).toBe("overview");
    });

    it("prefers the topical entry over the generic experience entry", () => {
      expect(answerQuestion("what security experience").matchedId).toBe("security");
      expect(answerQuestion("what is his work experience").matchedId).toBe("experience");
    });

    it("lets a named project beat the generic case-study entry", () => {
      // "read more" / "more about" used to be case-study keywords and
      // outranked the project actually named in the question.
      expect(answerQuestion("where can I read more about kanoon").matchedId).toBe("kanoon");
      expect(answerQuestion("more about the OCR platform").matchedId).toBe("ocr");
      expect(answerQuestion("is there a case study").matchedId).toBe("case-studies");
    });

    it("disambiguates 'pipeline' by context", () => {
      // Bare "pipeline" is ambiguous across RAG, ML and CI/CD.
      expect(answerQuestion("what ci/cd pipeline does he use").matchedId).toBe("cloud");
      expect(answerQuestion("tell me about his rag pipeline").matchedId).toBe("rag");
      expect(answerQuestion("tell me about the mlops pipeline").matchedId).toBe("mlops");
    });
  });

  describe("declining gracefully", () => {
    it("falls back rather than inventing an answer", () => {
      for (const question of [
        "what is his favourite pizza topping",
        "what car does he drive",
        "asdfghjkl",
      ]) {
        const result = answerQuestion(question);
        expect(result.matchedId, question).toBeNull();
        expect(result.answer).toContain("I answer from Aryan's resume");
      }
    });

    it("falls back on empty or whitespace input", () => {
      expect(answerQuestion("").matchedId).toBeNull();
      expect(answerQuestion("    ").matchedId).toBeNull();
    });

    it("is not thrown off by punctuation or casing", () => {
      expect(answerQuestion("HOW DOES KANOON WORK?!").matchedId).toBe("kanoon");
      expect(answerQuestion("...cloud???").matchedId).toBe("cloud");
    });
  });
});

describe("knowledgeBase integrity", () => {
  it("has unique ids", () => {
    const ids = knowledgeBase.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has a non-empty answer, question and keywords for every entry", () => {
    for (const entry of knowledgeBase) {
      expect(entry.answer.trim().length, entry.id).toBeGreaterThan(0);
      expect(entry.question.trim().length, entry.id).toBeGreaterThan(0);
      expect(entry.keywords.length, entry.id).toBeGreaterThan(0);
    }
  });

  it("keeps keywords lowercase so matching is case-insensitive", () => {
    for (const entry of knowledgeBase) {
      for (const keyword of entry.keywords) {
        expect(keyword, `${entry.id}: "${keyword}"`).toBe(keyword.toLowerCase());
      }
    }
  });

  it("can answer every entry's own suggested question", () => {
    for (const entry of knowledgeBase) {
      expect(answerQuestion(entry.question).matchedId, entry.question).not.toBeNull();
    }
  });
});

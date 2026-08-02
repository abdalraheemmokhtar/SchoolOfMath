import { describe, expect, it } from "vitest";
import { evaluateAnswer } from "../lib/evaluation";
import type { Question, QuestionKind } from "../lib/types";

function question(kind: QuestionKind, answer: string | string[], options?: string[]): Question {
  return {
    id: `test-${kind}`,
    prompt: "Test question",
    kind,
    answer,
    options,
    skill: "Test skill",
    hints: ["Hint one", "Hint two", "Hint three"],
    explanation: "Explanation",
    misconception: "test-misconception",
  };
}

describe("evaluateAnswer", () => {
  it("accepts exact numeric answers and decimal tolerance", () => {
    expect(evaluateAnswer(question("numeric", "7"), "7").correct).toBe(true);
    expect(evaluateAnswer({ ...question("numeric", "0.333"), tolerance: 0.001 }, "0.3334").correct).toBe(true);
  });

  it("accepts equivalent fractions", () => {
    expect(evaluateAnswer(question("fraction", "1/2"), "3/6").correct).toBe(true);
  });

  it("accepts equivalent constrained algebraic expressions", () => {
    expect(evaluateAnswer(question("expression", "7*x+5"), "5 + 7x").correct).toBe(true);
    expect(evaluateAnswer(question("expression", "4*(x+3)"), "4x + 12").correct).toBe(true);
  });

  it("does not execute arbitrary JavaScript-like input", () => {
    const result = evaluateAnswer(question("expression", "x+1"), "globalThis.process.exit()");
    expect(result.correct).toBe(false);
    expect(result.hintEligible).toBe(true);
  });

  it("supports choice, multiple select, ordering, and normalized text", () => {
    expect(evaluateAnswer(question("choice", "x + 4"), "x + 4").correct).toBe(true);
    expect(evaluateAnswer(question("multi-select", ["a", "b"], ["a", "b", "c"]), ["b", "a"]).correct).toBe(true);
    expect(evaluateAnswer(question("ordering", ["first", "second"], ["first", "second"]), ["second", "first"]).correct).toBe(false);
    expect(evaluateAnswer(question("text", "Variable"), "  variable  ").correct).toBe(true);
  });

  it("returns structured feedback and misconception metadata", () => {
    const result = evaluateAnswer(question("numeric", "8"), "9");
    expect(result).toMatchObject({
      correct: false,
      normalizedAnswer: "9",
      expectedAnswer: "8",
      explanation: "Explanation",
      hintEligible: true,
      misconceptionId: "test-misconception",
    });
  });
});


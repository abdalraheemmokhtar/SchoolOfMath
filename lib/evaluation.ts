import { evaluate as evaluateMath } from "mathjs";
import type { EvaluationResult, Question } from "./types";

const safeExpression = /^[0-9a-zA-Z+\-*/^().\s]+$/;
const forbiddenNames = /\b(import|createUnit|evaluate|parse|simplify|derivative|help)\b/i;

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[−–]/g, "-")
    .replace(/\s+/g, " ");
}

function normalizeExpression(value: string): string {
  return normalizeText(value)
    .replace(/(\d)([a-z])/g, "$1*$2")
    .replace(/([a-z])(\d)/g, "$1*$2")
    .replace(/\s+/g, "");
}

function finiteNumber(value: unknown): number | null {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

function safeMathValue(expression: string, scope: Record<string, number> = {}): number | null {
  const normalized = normalizeExpression(expression);
  if (!safeExpression.test(normalized) || forbiddenNames.test(normalized)) return null;
  try {
    return finiteNumber(evaluateMath(normalized, scope));
  } catch {
    return null;
  }
}

function equivalentExpressions(actual: string, expected: string): boolean {
  const actualNormalized = normalizeExpression(actual);
  const expectedNormalized = normalizeExpression(expected);
  if (actualNormalized === expectedNormalized) return true;
  if (!safeExpression.test(actualNormalized) || !safeExpression.test(expectedNormalized)) return false;

  const samples = [-3.25, -1, 0.5, 2, 5.75];
  return samples.every((x, index) => {
    const scope = { x, y: x + 1.25, a: x - 0.5, b: 2 - x, m: x, n: x + 2, p: x, q: index + 1, d: x + 4 };
    const left = safeMathValue(actualNormalized, scope);
    const right = safeMathValue(expectedNormalized, scope);
    return left !== null && right !== null && Math.abs(left - right) < 1e-8;
  });
}

function arraysEqual(actual: string[], expected: string[], ordered: boolean): boolean {
  const left = actual.map(normalizeText);
  const right = expected.map(normalizeText);
  if (!ordered) {
    left.sort();
    right.sort();
  }
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export function evaluateAnswer(question: Question, learnerAnswer: string | string[]): EvaluationResult {
  const expected = Array.isArray(question.answer) ? question.answer : [question.answer];
  const actual = Array.isArray(learnerAnswer) ? learnerAnswer : [learnerAnswer];
  let correct = false;

  if (question.kind === "numeric" || question.kind === "fraction") {
    const actualNumber = safeMathValue(actual[0] ?? "");
    const expectedNumber = safeMathValue(expected[0] ?? "");
    correct =
      actualNumber !== null &&
      expectedNumber !== null &&
      Math.abs(actualNumber - expectedNumber) <= (question.tolerance ?? 1e-9);
  } else if (question.kind === "expression") {
    correct = equivalentExpressions(actual[0] ?? "", expected[0] ?? "");
  } else if (question.kind === "multi-select") {
    correct = arraysEqual(actual, expected, false);
  } else if (question.kind === "ordering") {
    correct = arraysEqual(actual, expected, true);
  } else {
    correct = normalizeText(actual[0] ?? "") === normalizeText(expected[0] ?? "");
  }

  return {
    correct,
    normalizedAnswer: Array.isArray(learnerAnswer)
      ? learnerAnswer.map(normalizeText).join(" → ")
      : normalizeText(learnerAnswer),
    expectedAnswer: expected.join(question.kind === "ordering" ? " → " : ", "),
    explanation: question.explanation,
    hintEligible: !correct,
    misconceptionId: !correct ? question.misconception : undefined,
  };
}


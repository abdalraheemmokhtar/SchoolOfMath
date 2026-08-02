import { describe, expect, it } from "vitest";
import { algebraUnits, getLesson, questionBank } from "../lib/curriculum";
import { evaluateAnswer } from "../lib/evaluation";
import { calculateMastery } from "../lib/mastery";

describe("Algebra Foundations curriculum", () => {
  it("contains seven complete units with three to five lessons each", () => {
    expect(algebraUnits).toHaveLength(7);
    for (const unit of algebraUnits) {
      expect(unit.lessons.length).toBeGreaterThanOrEqual(3);
      expect(unit.lessons.length).toBeLessThanOrEqual(5);
      expect(unit.objectives.length).toBeGreaterThanOrEqual(3);
      expect(unit.quizQuestionIds.length).toBeGreaterThanOrEqual(3);
    }
  });

  it.each(["understanding-variables", "simplifying-algebraic-expressions", "solving-one-step-equations"])("%s is deeply implemented", (id) => {
    const lesson = getLesson(id);
    expect(lesson?.explanation?.length).toBeGreaterThanOrEqual(3);
    expect(lesson?.examples).toHaveLength(2);
    expect(lesson?.checks).toHaveLength(3);
    expect(lesson?.practice).toHaveLength(5);
    expect(lesson?.mastery?.length).toBeGreaterThanOrEqual(1);
    for (const questionId of [...(lesson?.checks ?? []), ...(lesson?.practice ?? []), ...(lesson?.mastery ?? [])]) {
      expect(questionBank[questionId]).toBeDefined();
      expect(questionBank[questionId].hints).toHaveLength(3);
    }
  });
});

describe("learner journey integration", () => {
  it("turns lesson evidence into a useful mastery level", () => {
    const lesson = getLesson("solving-one-step-equations");
    const question = questionBank[lesson?.mastery?.[0] ?? ""];
    const evaluation = evaluateAnswer(question, "-7");
    expect(evaluation.correct).toBe(true);
    const mastery = calculateMastery({
      recentAccuracy: 0.86,
      attempts: 7,
      hintRate: 0.14,
      assessmentScore: 0.82,
      daysSincePractice: 0,
      averageDifficulty: 0.6,
    });
    expect(["Proficient", "Mastered"]).toContain(mastery.level);
  });
});


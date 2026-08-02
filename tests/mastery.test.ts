import { describe, expect, it } from "vitest";
import { calculateMastery } from "../lib/mastery";

describe("calculateMastery", () => {
  it("returns not started without evidence", () => {
    expect(calculateMastery({ recentAccuracy: 0, attempts: 0, hintRate: 0, assessmentScore: 0, daysSincePractice: 0, averageDifficulty: 0 })).toEqual({ score: 0, level: "Not started" });
  });

  it("rewards accurate, independent, repeated evidence", () => {
    const result = calculateMastery({ recentAccuracy: 0.95, attempts: 10, hintRate: 0.05, assessmentScore: 0.9, daysSincePractice: 2, averageDifficulty: 0.85 });
    expect(result.level).toBe("Mastered");
    expect(result.score).toBeGreaterThanOrEqual(86);
  });

  it("keeps sparse evidence below mastery", () => {
    const result = calculateMastery({ recentAccuracy: 1, attempts: 1, hintRate: 0, assessmentScore: 0.5, daysSincePractice: 1, averageDifficulty: 0.4 });
    expect(["Introduced", "Developing", "Proficient"]).toContain(result.level);
    expect(result.level).not.toBe("Mastered");
  });

  it("marks stale developed skills for review", () => {
    const result = calculateMastery({ recentAccuracy: 0.88, attempts: 9, hintRate: 0.1, assessmentScore: 0.82, daysSincePractice: 45, averageDifficulty: 0.7 });
    expect(result.level).toBe("Needs review");
    expect(result.reviewReason).toMatch(/recently/i);
  });
});


import type { MasteryInput, MasteryLevel } from "./types";

export type MasteryResult = {
  score: number;
  level: MasteryLevel;
  reviewReason?: string;
};

export function calculateMastery(input: MasteryInput): MasteryResult {
  if (input.attempts === 0) return { score: 0, level: "Not started" };

  const evidence = Math.min(1, input.attempts / 8);
  const difficultyBoost = 0.9 + Math.min(1, input.averageDifficulty) * 0.1;
  const weighted =
    input.recentAccuracy * 0.42 +
    input.assessmentScore * 0.3 +
    evidence * 0.16 +
    (1 - input.hintRate) * 0.12;
  const decay = input.daysSincePractice <= 14 ? 0 : Math.min(0.22, (input.daysSincePractice - 14) * 0.006);
  const score = Math.max(0, Math.min(100, Math.round((weighted * difficultyBoost - decay) * 100)));

  if (input.daysSincePractice > 30 && score >= 55) {
    return { score, level: "Needs review", reviewReason: "This skill has not been practised recently." };
  }
  if (score >= 86 && input.attempts >= 6) return { score, level: "Mastered" };
  if (score >= 70) return { score, level: "Proficient" };
  if (score >= 42) return { score, level: "Developing" };
  return { score, level: "Introduced" };
}


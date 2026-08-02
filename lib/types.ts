export type QuestionKind =
  | "numeric"
  | "fraction"
  | "expression"
  | "choice"
  | "multi-select"
  | "ordering"
  | "text";

export type Question = {
  id: string;
  prompt: string;
  kind: QuestionKind;
  answer: string | string[];
  options?: string[];
  tolerance?: number;
  skill: string;
  hints: [string, string, string];
  explanation: string;
  misconception?: string;
};

export type WorkedExample = {
  title: string;
  prompt: string;
  steps: string[];
  takeaway: string;
};

export type Lesson = {
  id: string;
  title: string;
  objective: string;
  duration: number;
  status: "available" | "locked" | "complete" | "review";
  summary: string;
  explanation?: string[];
  keyIdea?: string;
  commonMistake?: string;
  examples?: WorkedExample[];
  checks?: string[];
  practice?: string[];
  mastery?: string[];
  tutorContext?: string;
};

export type Unit = {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  lessons: Lesson[];
  quizQuestionIds: string[];
};

export type Course = {
  id: string;
  title: string;
  level: string;
  description: string;
  duration: string;
  unitCount: number;
  prerequisites: string[];
  skills: string[];
  progress?: number;
  featured?: boolean;
};

export type MasteryLevel =
  | "Not started"
  | "Introduced"
  | "Developing"
  | "Proficient"
  | "Mastered"
  | "Needs review";

export type MasteryInput = {
  recentAccuracy: number;
  attempts: number;
  hintRate: number;
  assessmentScore: number;
  daysSincePractice: number;
  averageDifficulty: number;
};

export type EvaluationResult = {
  correct: boolean;
  normalizedAnswer: string;
  expectedAnswer: string;
  explanation: string;
  hintEligible: boolean;
  misconceptionId?: string;
};


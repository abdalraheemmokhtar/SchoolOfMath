export type TutorMode =
  | "Explain this concept"
  | "Give me a hint"
  | "Check my reasoning"
  | "Show another example"
  | "Create a similar problem"
  | "Make it easier"
  | "Make it harder"
  | "Summarize this lesson";

export type TutorRequest = {
  mode: TutorMode;
  lessonTitle: string;
  lessonContext: string;
  questionPrompt?: string;
  learnerMessage?: string;
  hintLevel?: number;
};

export interface TutorProvider {
  respond(request: TutorRequest): Promise<string>;
}

export class RuleBasedTutor implements TutorProvider {
  async respond(request: TutorRequest): Promise<string> {
    const tried = request.learnerMessage?.trim();
    if (request.mode === "Give me a hint") {
      if (!tried) return "What have you tried so far? Even your first instinct will help me choose the right hint.";
      if (request.hintLevel === 0) return "Look for the operation attached to the variable. Which inverse operation would undo it?";
      if (request.hintLevel === 1) return "Keep the equation balanced: apply that inverse operation to both sides.";
      return "Write the same operation under both sides, simplify, and then substitute your result back into the original equation.";
    }
    if (request.mode === "Check my reasoning") {
      return tried
        ? `Your plan should preserve equality at every step. Check this part carefully: “${tried.slice(0, 120)}”. Did you perform the same operation on both sides?`
        : "Share one or two steps of your reasoning and I’ll check where the logic changes.";
    }
    if (request.mode === "Show another example") {
      return request.lessonTitle.includes("Equation")
        ? "Try x + 9 = 14. Subtract 9 from both sides, so x = 5. The check 5 + 9 = 14 confirms it."
        : "If 4a + 2a appears, the terms are alike. Add the coefficients and keep a: 6a.";
    }
    if (request.mode === "Create a similar problem") return "Try this next: simplify 3(2x + 4) − x. Start by distributing 3. I’ll check your next step.";
    if (request.mode === "Make it easier") return "Let’s use smaller numbers and one decision: in x + 3 = 7, what operation undoes +3?";
    if (request.mode === "Make it harder") return "Challenge: explain why doing the same nonzero division to both sides preserves the solution set.";
    if (request.mode === "Summarize this lesson") return `${request.lessonTitle}: ${request.lessonContext} Focus on naming the operation, showing a valid step, and checking the result.`;
    return `${request.lessonTitle} is about ${request.lessonContext.toLowerCase()} I’ll keep the explanation brief: identify what each symbol represents, follow the operation order, and justify each transformation. Generated guidance can make mistakes, so verify it against the worked examples.`;
  }
}

export const soma = new RuleBasedTutor();

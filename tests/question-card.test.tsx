import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuestionCard } from "../components/question-card";
import { getQuestion } from "../lib/curriculum";

describe("QuestionCard", () => {
  it("provides progressive hints and correct feedback", () => {
    const onComplete = vi.fn();
    render(<QuestionCard question={getQuestion("eq-check-1")} onComplete={onComplete} />);

    fireEvent.click(screen.getByRole("button", { name: /give me a hint/i }));
    expect(screen.getByText(/undo the addition/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/your answer/i), { target: { value: "7" } });
    fireEvent.click(screen.getByRole("button", { name: /check answer/i }));
    expect(screen.getByText(/that reasoning works/i)).toBeInTheDocument();
    expect(onComplete).toHaveBeenCalledWith(true, 1);
  });

  it("does not reveal the full solution after the first wrong attempt", () => {
    render(<QuestionCard question={getQuestion("eq-check-1")} />);
    fireEvent.change(screen.getByLabelText(/your answer/i), { target: { value: "8" } });
    fireEvent.click(screen.getByRole("button", { name: /check answer/i }));
    expect(screen.getByText(/review your operation/i)).toBeInTheDocument();
    expect(screen.queryByText(/x = 7/i)).not.toBeInTheDocument();
  });
});


"use client";

import { Check, GripVertical, Lightbulb, RotateCcw, X } from "lucide-react";
import { useMemo, useState } from "react";
import { evaluateAnswer } from "../lib/evaluation";
import type { EvaluationResult, Question } from "../lib/types";

export function QuestionCard({
  question,
  compact = false,
  onComplete,
}: {
  question: Question;
  compact?: boolean;
  onComplete?: (correct: boolean, hintsUsed: number) => void;
}) {
  const [answer, setAnswer] = useState<string>("");
  const [selections, setSelections] = useState<string[]>([]);
  const [ordered, setOrdered] = useState<string[]>(question.options ?? []);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [hintLevel, setHintLevel] = useState(0);

  const submittedAnswer = useMemo(() => {
    if (question.kind === "multi-select") return selections;
    if (question.kind === "ordering") return ordered;
    return answer;
  }, [answer, ordered, question.kind, selections]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = evaluateAnswer(question, submittedAnswer);
    setResult(next);
    onComplete?.(next.correct, hintLevel);
  }

  function retry() {
    setResult(null);
    setAnswer("");
    setSelections([]);
    setOrdered(question.options ?? []);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= ordered.length) return;
    const next = [...ordered];
    [next[index], next[target]] = [next[target], next[index]];
    setOrdered(next);
  }

  const canSubmit =
    question.kind === "multi-select" ? selections.length > 0
      : question.kind === "ordering" ? ordered.length > 0
        : answer.trim().length > 0;

  return (
    <section className={compact ? "question-card question-card-compact" : "question-card"} aria-labelledby={`${question.id}-title`}>
      <div className="question-topline">
        <span className="eyebrow">{compact ? "Try it" : question.skill}</span>
        {!compact && <span className="question-count">Immediate feedback</span>}
      </div>
      <h3 id={`${question.id}-title`}>{question.prompt}</h3>
      <form onSubmit={submit}>
        {question.kind === "choice" && (
          <div className="option-grid">
            {question.options?.map((option) => (
              <label className={answer === option ? "choice-option selected" : "choice-option"} key={option}>
                <input type="radio" name={question.id} value={option} checked={answer === option} onChange={() => setAnswer(option)} />
                <span className="choice-radio" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
        {question.kind === "multi-select" && (
          <div className="option-grid">
            {question.options?.map((option) => (
              <label className={selections.includes(option) ? "choice-option selected" : "choice-option"} key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={selections.includes(option)}
                  onChange={() => setSelections((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option])}
                />
                <span className="choice-checkbox">{selections.includes(option) && <Check size={13} />}</span>
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
        {question.kind === "ordering" && (
          <ol className="ordering-list" aria-label="Ordered solution steps">
            {ordered.map((item, index) => (
              <li key={item}>
                <GripVertical size={17} />
                <span>{index + 1}. {item}</span>
                <span className="order-buttons">
                  <button type="button" disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Move ${item} up`}>↑</button>
                  <button type="button" disabled={index === ordered.length - 1} onClick={() => move(index, 1)} aria-label={`Move ${item} down`}>↓</button>
                </span>
              </li>
            ))}
          </ol>
        )}
        {!["choice", "multi-select", "ordering"].includes(question.kind) && (
          <label className="answer-label">
            <span>Your answer</span>
            <input
              className="answer-input"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder={question.kind === "expression" ? "e.g. 3x + 2" : "Type your answer"}
              aria-describedby={result ? `${question.id}-feedback` : undefined}
            />
          </label>
        )}
        {hintLevel > 0 && !result?.correct && (
          <div className="hint-box" role="status">
            <Lightbulb size={17} />
            <div>
              <strong>Hint {hintLevel} of 3</strong>
              <p>{question.hints[hintLevel - 1]}</p>
            </div>
          </div>
        )}
        {result && (
          <div id={`${question.id}-feedback`} className={result.correct ? "feedback correct" : "feedback incorrect"} role="status">
            {result.correct ? <Check size={19} /> : <X size={19} />}
            <div>
              <strong>{result.correct ? "That reasoning works." : "Not quite yet."}</strong>
              <p>{result.correct || hintLevel >= 3 ? result.explanation : "Review your operation, then try again or reveal a hint."}</p>
            </div>
          </div>
        )}
        <div className="question-actions">
          <button
            className="button button-ghost"
            type="button"
            disabled={hintLevel >= 3 || Boolean(result?.correct)}
            onClick={() => setHintLevel((level) => Math.min(3, level + 1))}
          >
            <Lightbulb size={16} /> {hintLevel === 0 ? "Give me a hint" : "Stronger hint"}
          </button>
          {result ? (
            <button className="button button-secondary" type="button" onClick={retry}><RotateCcw size={16} /> Try again</button>
          ) : (
            <button className="button button-primary" type="submit" disabled={!canSubmit}>Check answer</button>
          )}
        </div>
      </form>
    </section>
  );
}


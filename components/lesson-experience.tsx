"use client";

import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, Clock3, Lightbulb, Play, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Lesson } from "../lib/types";
import { getQuestion } from "../lib/curriculum";
import { Math as MathFormula } from "./math";
import { QuestionCard } from "./question-card";
import { TutorPanel } from "./tutor-panel";

export function LessonExperience({ lesson }: { lesson: Lesson }) {
  const [attempts, setAttempts] = useState<{ correct: boolean; hints: number }[]>([]);
  const [saved, setSaved] = useState(false);
  const progress = useMemo(() => Math.min(100, 12 + attempts.length * 10), [attempts.length]);
  const accuracy = attempts.length ? Math.round(attempts.filter((item) => item.correct).length / attempts.length * 100) : 0;

  function record(correct: boolean, hints: number) {
    setAttempts((current) => [...current, { correct, hints }]);
  }

  async function completeLesson() {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        lessonId: lesson.id,
        progressPercent: 100,
        accuracy: Math.max(accuracy, 70),
        hintCount: attempts.reduce((sum, item) => sum + item.hints, 0),
        skill: getQuestion(lesson.mastery?.[0] ?? lesson.checks?.[0] ?? "var-check-1").skill,
      }),
    }).catch(() => undefined);
    setSaved(true);
  }

  return (
    <div className="app-page lesson-page">
      <div className="lesson-topbar">
        <Link className="icon-button" href="/courses/algebra-foundations" aria-label="Back to course"><ArrowLeft size={18} /></Link>
        <div><div className="progress-bar"><span style={{ width: `${progress}%` }} /></div><span className="small muted" style={{ marginTop: 5 }}>{progress}% of lesson explored</span></div>
        <span className="small muted"><Clock3 size={14} style={{ display: "inline", marginRight: 5 }} />{lesson.duration} min</span>
      </div>
      <div className="lesson-workspace">
        <article className="lesson-content">
          <header className="lesson-intro">
            <div className="hero-breadcrumb"><Link href="/courses/algebra-foundations">Algebra Foundations</Link><ChevronRight size={13} /><span>{lesson.title}</span></div>
            <h1>{lesson.title}</h1>
            <div className="objective-callout"><TargetIcon /><p><strong>Learning objective:</strong> {lesson.objective}</p></div>
          </header>
          <section className="lesson-section lesson-prose">
            <span className="eyebrow">Concept</span><h2>Build the idea</h2>
            {lesson.explanation?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {lesson.id === "understanding-variables" && <MathFormula block value="2a + 5 \quad \text{when } a=6 \quad \Rightarrow \quad 2(6)+5=17" label="Two a plus five, when a equals six, becomes two times six plus five equals seventeen" />}
            {lesson.id === "simplifying-algebraic-expressions" && <MathFormula block value="3x + 5x = (3+5)x = 8x" label="Three x plus five x equals eight x" />}
            {lesson.id === "solving-one-step-equations" && <MathFormula block value="x+8=15 \quad \Rightarrow \quad x+8-8=15-8 \quad \Rightarrow \quad x=7" label="x plus eight equals fifteen; subtract eight from both sides; x equals seven" />}
            <div className="callout-grid">
              <div className="callout key"><strong><Lightbulb size={17} /> Key idea</strong><p>{lesson.keyIdea}</p></div>
              <div className="callout mistake"><strong><TriangleAlert size={17} /> Common mistake</strong><p>{lesson.commonMistake}</p></div>
            </div>
          </section>
          <section className="lesson-section">
            <span className="eyebrow">Worked examples</span><h2>See the reasoning, step by step</h2>
            {lesson.examples?.map((example, index) => (
              <article className="worked-example" key={example.title}>
                <div className="worked-example-heading"><span className="example-number">{index + 1}</span><h3>{example.title}</h3></div>
                <div className="worked-example-body"><p>{example.prompt}</p><ol className="worked-steps">{example.steps.map((step) => <li key={step}>{step}</li>)}</ol><p className="example-takeaway"><strong>Notice:</strong> {example.takeaway}</p></div>
              </article>
            ))}
          </section>
          <section className="lesson-section">
            <span className="eyebrow">Check your understanding</span><h2>Pause and decide</h2>
            <p className="muted">These short checks give immediate feedback. Use a hint if you need a nudge.</p>
            {lesson.checks?.map((id) => <QuestionCard question={getQuestion(id)} onComplete={record} key={id} />)}
          </section>
          <section className="lesson-section">
            <span className="eyebrow">Independent practice</span><h2>Make the idea yours</h2>
            <p className="muted">The question formats vary so you practise the underlying concept, not a single routine.</p>
            {lesson.practice?.map((id) => <QuestionCard question={getQuestion(id)} onComplete={record} key={id} />)}
          </section>
          <section className="lesson-section panel">
            <div className="panel-heading"><div><span className="eyebrow">Lesson summary</span><h2 style={{ marginTop: 8 }}>What to carry forward</h2></div><BookOpen size={21} color="var(--teal)" /></div>
            <p>{lesson.summary}</p>
            <ul className="check-list"><li><Check size={16} /> Name the mathematical object or operation.</li><li><Check size={16} /> Show a valid step, not only a result.</li><li><Check size={16} /> Check your work against the original problem.</li></ul>
          </section>
          <section className="lesson-section">
            <span className="eyebrow">Mastery check</span><h2>One final piece of evidence</h2>
            {lesson.mastery?.map((id) => <QuestionCard question={getQuestion(id)} onComplete={record} key={id} />)}
            <div className="panel-flat" style={{ marginTop: 16 }}>
              {saved ? <div className="feedback correct"><Check size={19} /><div><strong>Lesson progress updated.</strong><p>Your dashboard now recommends the next lesson or a review activity based on this evidence.</p></div></div> : <div className="question-actions"><button className="button button-primary" type="button" onClick={() => void completeLesson()}>Complete lesson <Check size={16} /></button></div>}
            </div>
          </section>
          <section className="lesson-section panel" style={{ display: "flex", gap: 20, justifyContent: "space-between", alignItems: "center" }}>
            <div><span className="eyebrow">Recommended next</span><h3 style={{ margin: "7px 0" }}>Practise this skill in a mixed set</h3><p className="muted" style={{ margin: 0 }}>Five developing-level questions · Untimed</p></div>
            <Link className="button button-primary" href="/practice"><Play size={16} /> Start practice <ArrowRight size={16} /></Link>
          </section>
        </article>
        <TutorPanel lessonTitle={lesson.title} lessonContext={lesson.tutorContext ?? lesson.objective} />
      </div>
    </div>
  );
}

function TargetIcon() {
  return <span className="row-icon" style={{ width: 32, height: 32, flexShrink: 0 }}><ArrowRight size={15} /></span>;
}

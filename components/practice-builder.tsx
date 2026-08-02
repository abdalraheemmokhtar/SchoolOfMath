"use client";

import { ArrowRight, Check, Clock3, RefreshCw, Target, Timer } from "lucide-react";
import { useState } from "react";
import { getQuestion } from "../lib/curriculum";
import { QuestionCard } from "./question-card";

const topics = ["Variables", "Like terms", "Distributive property", "One-step equations", "Inequalities", "Coordinate plane"];
const difficulties = ["Foundation", "Developing", "Proficient", "Challenge"];

export function PracticeBuilder() {
  const [topic, setTopic] = useState("Distributive property");
  const [difficulty, setDifficulty] = useState("Developing");
  const [mode, setMode] = useState("Untimed");
  const [count, setCount] = useState(5);
  const [adaptive, setAdaptive] = useState(true);
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);
  const questionId = topic === "Variables" ? "var-practice-3" : topic === "One-step equations" ? "eq-practice-4" : "expr-practice-3";

  if (started) {
    return (
      <div className="practice-builder">
        <section>
          <div className="panel-heading"><div><span className="eyebrow">Question 1 of {count}</span><h2>{topic} practice</h2></div><span className="status-pill">{mode === "Timed" ? <><Timer size={13} /> 08:00</> : "Untimed"}</span></div>
          <QuestionCard question={getQuestion(questionId)} onComplete={(correct) => { if (correct) setComplete(true); }} />
          {complete && <div className="panel-flat"><div className="feedback correct"><Check size={18} /><div><strong>First question complete.</strong><p>The full session would continue with adaptive items. This seeded demo records the interaction and shows how immediate feedback works.</p></div></div><div className="question-actions"><button className="button button-primary" type="button" onClick={() => { setStarted(false); setComplete(false); }}>Review setup <RefreshCw size={15} /></button></div></div>}
        </section>
        <aside className="practice-summary"><span className="eyebrow" style={{ color: "#72cfbf" }}>Session in progress</span><h3>{difficulty} · {topic}</h3><ul className="check-list"><li><Check size={16} /> Feedback after each answer</li><li><Check size={16} /> Progressive hints enabled</li><li><Check size={16} /> {adaptive ? "Difficulty adapts to evidence" : "Fixed difficulty"}</li></ul></aside>
      </div>
    );
  }

  return (
    <div className="practice-builder">
      <section className="panel">
        <div className="panel-heading"><div><span className="eyebrow">Build a session</span><h2>What should we practise?</h2></div><Target size={20} color="var(--teal)" /></div>
        <div className="field-grid">
          <fieldset className="field"><legend>Topic</legend><div className="topic-select-grid">{topics.map((item) => <button type="button" className={topic === item ? "topic-option selected" : "topic-option"} key={item} onClick={() => setTopic(item)}><span className="choice-radio" style={topic === item ? { border: "5px solid var(--teal)" } : undefined} />{item}</button>)}</div></fieldset>
          <fieldset className="field"><legend>Difficulty</legend><div className="segmented">{difficulties.map((item) => <button type="button" className={difficulty === item ? "segment active" : "segment"} key={item} onClick={() => setDifficulty(item)}>{item}</button>)}</div></fieldset>
          <div className="field-grid two">
            <label className="field"><span>Session mode</span><select value={mode} onChange={(event) => setMode(event.target.value)}><option>Untimed</option><option>Timed</option><option>Assessment</option></select></label>
            <label className="field"><span>Number of questions</span><select value={count} onChange={(event) => setCount(Number(event.target.value))}><option value="5">5 questions</option><option value="10">10 questions</option><option value="15">15 questions</option></select></label>
          </div>
          <div className="setting-row"><div><strong>Adaptive practice</strong><span>Adjust difficulty using recent answers and hint use.</span></div><button type="button" className={adaptive ? "switch on" : "switch"} aria-pressed={adaptive} onClick={() => setAdaptive((value) => !value)}><span className="sr-only">Toggle adaptive practice</span></button></div>
        </div>
      </section>
      <aside className="practice-summary">
        <span className="eyebrow" style={{ color: "#72cfbf" }}>Session preview</span><h2>{topic}</h2><p>{difficulty} questions with {mode.toLowerCase()} pacing.</p>
        <ul className="check-list"><li><Clock3 size={16} /> About {count * 2} minutes</li><li><Check size={16} /> {count} questions</li><li><Check size={16} /> Review incorrect answers</li><li><Check size={16} /> Immediate feedback {mode === "Assessment" ? "after the session" : "after each answer"}</li></ul>
        <button className="button" type="button" onClick={() => setStarted(true)}>Start practice <ArrowRight size={16} /></button>
      </aside>
    </div>
  );
}


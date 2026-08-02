"use client";

import { ArrowRight, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Brand } from "./brand";

export function OnboardingForm() {
  const [level, setLevel] = useState("Lower secondary");
  const [topics, setTopics] = useState<string[]>(["Algebra"]);
  const [confidence, setConfidence] = useState(3);
  const [goal, setGoal] = useState(120);
  const recommendation = useMemo(() => level.includes("secondary") || topics.includes("Algebra") ? "Algebra Foundations" : "Arithmetic Foundations", [level, topics]);

  const toggleTopic = (topic: string) => {
    setTopics((current) => current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]);
  };

  return (
    <main className="auth-page">
      <div className="onboarding-layout">
        <aside className="onboarding-aside">
          <Brand />
          <h1>Let’s shape a path that fits you.</h1>
          <p>These preferences create a recommendation. You can change everything later.</p>
          <div className="onboarding-step active"><span><Check size={14} /></span>About your learning</div>
          <div className="onboarding-step active"><span>2</span>Interests and confidence</div>
          <div className="onboarding-step active"><span>3</span>Your weekly rhythm</div>
          <div className="onboarding-step"><span>4</span>Recommended path</div>
        </aside>
        <section className="auth-card" style={{ width: "100%" }}>
          <span className="eyebrow">Onboarding · 3 minutes</span>
          <h1>Tell us how you learn.</h1>
          <p>We’ll use this to put the next useful action first.</p>
          <form
            className="field-grid"
            action="/dashboard"
            method="get"
            onSubmit={(event) => {
              event.preventDefault();
              window.location.href = "/dashboard";
            }}
          >
            <div className="field-grid two">
              <label className="field"><span>Display name</span><input defaultValue="Amina" required /></label>
              <label className="field"><span>Learning level</span><select value={level} onChange={(event) => setLevel(event.target.value)}><option>Upper primary</option><option>Lower secondary</option><option>Upper secondary</option><option>University preparation</option><option>Independent learner</option></select></label>
            </div>
            <label className="field"><span>Curriculum preference</span><select defaultValue="General mathematics"><option>General mathematics</option><option>University of Khartoum pathway</option><option>International curriculum</option><option>Skill-focused practice</option></select></label>
            <fieldset className="field"><legend>Topics you want to strengthen</legend><div className="topic-select-grid">{["Arithmetic", "Algebra", "Geometry", "Statistics"].map((topic) => <button className={topics.includes(topic) ? "topic-option selected" : "topic-option"} type="button" key={topic} onClick={() => toggleTopic(topic)}><span className="choice-checkbox">{topics.includes(topic) && <Check size={13} />}</span>{topic}</button>)}</div></fieldset>
            <label className="field"><span>Current confidence: {confidence}/5</span><div className="range-row"><input type="range" min="1" max="5" value={confidence} onChange={(event) => setConfidence(Number(event.target.value))} /><strong>{confidence < 3 ? "Building" : confidence === 3 ? "Mixed" : "Confident"}</strong></div></label>
            <div className="field-grid two">
              <label className="field"><span>Weekly goal</span><select value={goal} onChange={(event) => setGoal(Number(event.target.value))}><option value="60">60 minutes</option><option value="120">120 minutes</option><option value="180">180 minutes</option><option value="240">240 minutes</option></select></label>
              <label className="field"><span>Preferred pace</span><select defaultValue="Steady"><option>Gentle</option><option>Steady</option><option>Intensive</option></select></label>
            </div>
            <div className="demo-banner"><Check size={17} /><p><strong>Recommended: {recommendation}.</strong> Your algebra interest and learning level make this a strong place to begin.</p></div>
            <button className="button button-primary" type="submit">Use this learning path <ArrowRight size={16} /></button>
          </form>
        </section>
      </div>
    </main>
  );
}

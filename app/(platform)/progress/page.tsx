import type { Metadata } from "next";
import { Award, BookOpenCheck, Brain, CalendarDays, Check, Clock3, Flame, RotateCcw, Target } from "lucide-react";
import { ActivityChart } from "../../../components/activity-chart";
import { ProgressRing } from "../../../components/progress-ring";

export const metadata: Metadata = { title: "Progress" };

const skills = [
  { name: "Evaluating expressions", score: 91, level: "Mastered", detail: "12 attempts · 92% recent accuracy" },
  { name: "Variables", score: 84, level: "Proficient", detail: "8 attempts · 1 hint" },
  { name: "Combining like terms", score: 73, level: "Proficient", detail: "7 attempts · 78% recent accuracy" },
  { name: "One-step equations", score: 62, level: "Developing", detail: "4 attempts · 2 hints" },
  { name: "Distributive property", score: 48, level: "Needs review", detail: "Last practised 34 days ago" },
];

export default function ProgressPage() {
  return (
    <div className="app-page">
      <header className="page-heading"><div><span className="eyebrow">Learner analytics</span><h1>Your progress, with the story behind it.</h1><p>Mastery combines accuracy, attempts, hint use, assessment evidence, difficulty, and how recently you practised.</p></div><span className="status-pill"><CalendarDays size={14} /> Last 30 days</span></header>
      <div className="metric-row" style={{ marginBottom: 22 }}><article className="metric-card"><span>Time learning</span><strong>8h 42m</strong><small>+94 min this week</small></article><article className="metric-card"><span>Lessons completed</span><strong>9</strong><small>of 27 in course</small></article><article className="metric-card"><span>Practice accuracy</span><strong>78%</strong><small>on 64 attempts</small></article></div>
      <div className="dashboard-grid">
        <div className="dashboard-column">
          <section className="panel"><div className="panel-heading"><div><span className="eyebrow">Consistency</span><h2>Weekly activity</h2></div><span className="muted small">239 minutes · 6 active days</span></div><ActivityChart /></section>
          <section className="panel"><div className="panel-heading"><div><span className="eyebrow">Skill evidence</span><h2>Algebra mastery</h2></div><Brain size={19} color="var(--teal)" /></div><div className="mastery-list">{skills.map((skill) => <div className="mastery-row" key={skill.name}><div className="mastery-name"><strong>{skill.name}</strong><span>{skill.detail}</span></div><div className="progress-bar"><span style={{ width: `${skill.score}%` }} /></div><span className={skill.level === "Needs review" ? "mastery-level review" : "mastery-level"}>{skill.level}</span></div>)}</div></section>
          <section className="panel"><div className="panel-heading"><div><span className="eyebrow">Assessment evidence</span><h2>Recent performance</h2></div><BookOpenCheck size={19} color="var(--teal)" /></div><div className="recommendation-list"><div className="recommendation-row"><span className="row-icon"><Check size={17} /></span><span><strong>Numbers & Variables quiz</strong><span>80% · 28 July · 9 minutes</span></span><span className="mastery-level">Proficient</span></div><div className="recommendation-row"><span className="row-icon"><Target size={17} /></span><span><strong>Expressions mastery check</strong><span>75% · 23 July · 6 minutes</span></span><span className="mastery-level">Developing</span></div></div></section>
        </div>
        <aside className="dashboard-column">
          <section className="panel goal-card"><ProgressRing value={38} /><div><span className="eyebrow">Course progress</span><h3>Algebra Foundations</h3><p className="small muted">9 lessons · 3 units active</p></div></section>
          <section className="panel"><div className="panel-heading"><h3>Learning consistency</h3><Flame size={18} color="var(--coral)" /></div><div className="metric-row" style={{ gridTemplateColumns: "1fr 1fr" }}><div className="metric-card"><span>Current streak</span><strong>6</strong><small>days</small></div><div className="metric-card"><span>Best streak</span><strong>9</strong><small>days</small></div></div><p className="small muted" style={{ marginTop: 15 }}>Streaks are informational. Missing a day does not remove progress or trigger punitive messages.</p></section>
          <section className="panel"><div className="panel-heading"><h3>Needs review</h3><RotateCcw size={18} color="var(--coral)" /></div><div className="recommendation-row"><span className="row-icon"><RotateCcw size={17} /></span><span><strong>Distributive property</strong><span>Evidence is 34 days old</span></span></div><p className="small muted">A 5-question review will refresh the evidence without restarting the unit.</p></section>
          <section className="panel"><div className="panel-heading"><h3>Recent achievements</h3><Award size={18} color="var(--gold)" /></div><div className="recommendation-list"><div className="recommendation-row"><span className="row-icon"><Clock3 size={17} /></span><span><strong>Focused hour</strong><span>60 learning minutes this week</span></span></div><div className="recommendation-row"><span className="row-icon"><Check size={17} /></span><span><strong>Careful checker</strong><span>Verified 5 solutions</span></span></div></div></section>
        </aside>
      </div>
    </div>
  );
}


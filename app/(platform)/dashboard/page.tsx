import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  Lightbulb,
  MessageCircle,
  Play,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { ActivityChart } from "../../../components/activity-chart";
import { ProgressRing } from "../../../components/progress-ring";

export const metadata: Metadata = { title: "Today" };

const mastery = [
  { name: "Variables", detail: "8 activities", score: 84, level: "Proficient" },
  { name: "Like terms", detail: "6 activities", score: 73, level: "Proficient" },
  { name: "Distributive property", detail: "4 activities", score: 48, level: "Needs review" },
  { name: "One-step equations", detail: "3 activities", score: 62, level: "Developing" },
];

export default function DashboardPage() {
  return (
    <div className="app-page">
      <header className="page-heading">
        <div><span className="eyebrow">Sunday, 2 August</span><h1>Good evening, Amina.</h1><p>You’re 22 minutes from this week’s goal. The next lesson strengthens a skill you recently introduced.</p></div>
        <div className="page-actions"><Link className="button button-ghost" href="/practice"><Target size={16} /> Quick practice</Link><Link className="button button-primary" href="/learn/solving-one-step-equations"><Play size={16} /> Continue</Link></div>
      </header>
      <div className="dashboard-grid">
        <div className="dashboard-column">
          <section className="continue-card">
            <span className="eyebrow" style={{ color: "#7ad7c6" }}>Continue learning · Unit 3</span>
            <h2>Solving One-Step Equations</h2>
            <p>Use inverse operations to isolate a variable, preserve equality, and check your result.</p>
            <Link className="button" href="/learn/solving-one-step-equations">Continue lesson <ArrowRight size={16} /></Link>
            <div className="continue-meta"><span><Clock3 size={15} /> 22 minutes</span><span><BookOpen size={15} /> Lesson 2 of 4</span><span><Sparkles size={15} /> Soma ready</span></div>
          </section>
          <div className="metric-row">
            <article className="metric-card"><span>Learning streak</span><strong>6 days</strong><small><Flame size={12} /> Personal best: 9</small></article>
            <article className="metric-card"><span>Lessons complete</span><strong>9</strong><small>+2 this week</small></article>
            <article className="metric-card"><span>Practice accuracy</span><strong>78%</strong><small>+5% over 30 days</small></article>
          </div>
          <section className="panel">
            <div className="panel-heading"><div><span className="eyebrow">Evidence by skill</span><h2>Algebra mastery</h2></div><Link className="button button-text" href="/progress">Full progress <ArrowRight size={15} /></Link></div>
            <div className="mastery-list">
              {mastery.map((skill) => <div className="mastery-row" key={skill.name}><div className="mastery-name"><strong>{skill.name}</strong><span>{skill.detail}</span></div><div className="progress-bar"><span style={{ width: `${skill.score}%` }} /></div><span className={skill.level === "Needs review" ? "mastery-level review" : "mastery-level"}>{skill.level}</span></div>)}
            </div>
          </section>
          <section className="panel">
            <div className="panel-heading"><div><span className="eyebrow">7-day rhythm</span><h2>Learning activity</h2></div><span className="muted small">239 minutes</span></div>
            <ActivityChart />
          </section>
        </div>
        <aside className="dashboard-column">
          <section className="panel goal-card">
            <ProgressRing value={82} />
            <div><span className="eyebrow">Weekly goal</span><h3>98 of 120 minutes</h3><p className="small muted">One focused session will complete it.</p></div>
          </section>
          <section className="panel">
            <div className="panel-heading"><h3>Recommended next</h3><Lightbulb size={18} color="var(--gold)" /></div>
            <div className="recommendation-list">
              <Link className="recommendation-row" href="/learn/solving-one-step-equations"><span className="row-icon"><Play size={17} /></span><span><strong>Continue your lesson</strong><span>One-step equations · 22 min</span></span><ArrowRight size={16} /></Link>
              <Link className="recommendation-row" href="/practice"><span className="row-icon"><RotateCcw size={17} /></span><span><strong>Review distribution</strong><span>Weak-topic practice · 8 min</span></span><ArrowRight size={16} /></Link>
              <Link className="recommendation-row" href="/assessments"><span className="row-icon"><CheckCircle2 size={17} /></span><span><strong>Expressions mastery check</strong><span>5 questions · Untimed</span></span><ArrowRight size={16} /></Link>
            </div>
          </section>
          <section className="panel">
            <div className="panel-heading"><h3>Recent with Soma</h3><MessageCircle size={18} color="var(--teal)" /></div>
            <div className="recommendation-list">
              <Link className="recommendation-row" href="/tutor"><span className="soma-orb"><Sparkles size={16} /></span><span><strong>Why subtract on both sides?</strong><span>One-step equations · Yesterday</span></span></Link>
              <Link className="recommendation-row" href="/tutor"><span className="soma-orb"><Sparkles size={16} /></span><span><strong>Like terms, another example</strong><span>Expressions · 3 days ago</span></span></Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}


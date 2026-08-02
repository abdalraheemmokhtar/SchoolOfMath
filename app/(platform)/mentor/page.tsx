import type { Metadata } from "next";
import { BookOpen, CalendarDays, CheckCircle2, Clock3, EyeOff, RotateCcw, Target, TrendingUp } from "lucide-react";
import { ActivityChart } from "../../../components/activity-chart";
import { ProgressRing } from "../../../components/progress-ring";

export const metadata: Metadata = { title: "Mentor view" };

export default function MentorPage() {
  return (
    <div className="app-page">
      <header className="page-heading"><div><span className="eyebrow">Parent or mentor view · Demo</span><h1>Support the learner without taking over.</h1><p>A calm summary of learning activity, evidence, and places where encouragement may help.</p></div><span className="status-pill"><CalendarDays size={14} /> Week of 27 Jul</span></header>
      <div className="dashboard-grid">
        <div className="dashboard-column">
          <section className="panel"><div className="panel-heading"><div><span className="eyebrow">Learner</span><h2>Amina’s current path</h2></div><span className="avatar">AM</span></div><div className="goal-card"><ProgressRing value={38} /><div><h3>Algebra Foundations</h3><p className="muted">9 of 27 lessons · Unit 3 in progress</p><div className="course-meta"><span><BookOpen size={14} /> Last lesson yesterday</span><span><Clock3 size={14} /> 98 minutes this week</span></div></div></div></section>
          <section className="panel"><div className="panel-heading"><div><span className="eyebrow">Weekly learning</span><h2>Activity</h2></div><TrendingUp size={19} color="var(--teal)" /></div><ActivityChart /></section>
          <section className="panel"><div className="panel-heading"><div><span className="eyebrow">Skill evidence</span><h2>Where support helps</h2></div><Target size={19} color="var(--teal)" /></div><div className="mastery-list"><div className="mastery-row"><div className="mastery-name"><strong>Evaluating expressions</strong><span>Consistent independent work</span></div><div className="progress-bar"><span style={{ width: "91%" }} /></div><span className="mastery-level">Mastered</span></div><div className="mastery-row"><div className="mastery-name"><strong>One-step equations</strong><span>Building current evidence</span></div><div className="progress-bar"><span style={{ width: "62%" }} /></div><span className="mastery-level">Developing</span></div><div className="mastery-row"><div className="mastery-name"><strong>Distributive property</strong><span>Not practised recently</span></div><div className="progress-bar"><span style={{ width: "48%" }} /></div><span className="mastery-level review">Needs review</span></div></div></section>
        </div>
        <aside className="dashboard-column">
          <section className="panel"><div className="panel-heading"><h3>Study consistency</h3><CheckCircle2 size={18} color="var(--teal)" /></div><div className="metric-row" style={{ gridTemplateColumns: "1fr 1fr" }}><div className="metric-card"><span>Active days</span><strong>6</strong><small>this week</small></div><div className="metric-card"><span>Goal</span><strong>82%</strong><small>98 / 120 min</small></div></div></section>
          <section className="panel"><div className="panel-heading"><h3>Recent results</h3><BookOpen size={18} color="var(--teal)" /></div><div className="recommendation-list"><div className="recommendation-row"><span className="row-icon"><CheckCircle2 size={17} /></span><span><strong>Numbers & Variables</strong><span>80% · Proficient</span></span></div><div className="recommendation-row"><span className="row-icon"><RotateCcw size={17} /></span><span><strong>Expressions check</strong><span>75% · Review one skill</span></span></div></div></section>
          <section className="panel"><div className="panel-heading"><h3>Conversation privacy</h3><EyeOff size={18} color="var(--teal)" /></div><p className="small muted">Soma tutor conversations are not visible in mentor view. Learners can choose to share an explanation or practice result themselves.</p></section>
          <section className="panel"><span className="eyebrow">Suggested support</span><h3 style={{ marginTop: 8 }}>Ask for an explanation, not a score.</h3><p className="small muted">Try: “Can you show me why the distributive property reaches every term?” This invites reasoning without pressure.</p></section>
        </aside>
      </div>
    </div>
  );
}


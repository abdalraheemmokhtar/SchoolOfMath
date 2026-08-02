import type { Metadata } from "next";
import { ArrowRight, BarChart3, CheckCircle2, ClipboardCheck, Clock3, FileQuestion, Gauge, RotateCcw } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Assessments" };

const assessmentRows = [
  { icon: CheckCircle2, title: "Numbers & Variables mastery quiz", detail: "Completed 28 Jul · 9 minutes", result: "8 / 10", action: "Review", href: "/learn/understanding-variables" },
  { icon: RotateCcw, title: "Expressions unit quiz", detail: "Ready · 8 mixed questions", result: "Start", action: "Begin", href: "/learn/simplifying-algebraic-expressions" },
  { icon: ClipboardCheck, title: "One-Step Equations mastery check", detail: "Recommended after current lesson", result: "Locked", action: "Continue lesson", href: "/learn/solving-one-step-equations" },
];

export default function AssessmentsPage() {
  return (
    <div className="app-page">
      <header className="page-heading"><div><span className="eyebrow">Assessments</span><h1>Use assessments to decide what comes next.</h1><p>Results show skill evidence and a constructive review path—not just a score.</p></div><Link className="button button-primary" href="/practice"><Gauge size={16} /> Start diagnostic</Link></header>
      <div className="dashboard-grid">
        <div className="dashboard-column">
          <section className="panel">
            <div className="panel-heading"><div><span className="eyebrow">Algebra Foundations</span><h2>Current course assessments</h2></div><FileQuestion size={20} color="var(--teal)" /></div>
            <div className="assessment-list">
              {assessmentRows.map(({ icon: Icon, title, detail, result, action, href }) => <Link className="assessment-row" href={href} key={title}><span className="row-icon"><Icon size={17} /></span><span><strong>{title}</strong><span>{detail}</span></span><span style={{ textAlign: "right" }}><strong>{result}</strong><span style={{ color: "var(--teal-dark)" }}>{action} <ArrowRight size={13} style={{ display: "inline" }} /></span></span></Link>)}
            </div>
          </section>
          <section className="panel">
            <div className="panel-heading"><div><span className="eyebrow">Latest result</span><h2>Numbers & Variables</h2></div><span className="mastery-level">80% · Proficient</span></div>
            <div className="metric-row"><div className="metric-card"><span>Score</span><strong>8/10</strong><small>Constructive pass</small></div><div className="metric-card"><span>Time spent</span><strong>9m</strong><small>Within target</small></div><div className="metric-card"><span>Hints used</span><strong>1</strong><small>Independent evidence</small></div></div>
            <div className="mastery-list" style={{ marginTop: 18 }}><div className="mastery-row"><div className="mastery-name"><strong>Identify variables</strong><span>3 of 3 correct</span></div><div className="progress-bar"><span style={{ width: "92%" }} /></div><span className="mastery-level">Mastered</span></div><div className="mastery-row"><div className="mastery-name"><strong>Translate phrases</strong><span>2 of 3 correct</span></div><div className="progress-bar"><span style={{ width: "68%" }} /></div><span className="mastery-level">Developing</span></div><div className="mastery-row"><div className="mastery-name"><strong>Evaluate expressions</strong><span>3 of 4 correct</span></div><div className="progress-bar"><span style={{ width: "78%" }} /></div><span className="mastery-level">Proficient</span></div></div>
            <div className="demo-banner"><RotateCcw size={17} /><p><strong>Recommended review:</strong> translate “less than” phrases, then retry two similar questions.</p></div>
          </section>
        </div>
        <aside className="dashboard-column">
          <section className="panel">
            <div className="panel-heading"><h3>Assessment types</h3><BarChart3 size={18} color="var(--teal)" /></div>
            <div className="recommendation-list"><div className="recommendation-row"><span className="row-icon"><Gauge size={17} /></span><span><strong>Diagnostic</strong><span>Find a useful starting point</span></span></div><div className="recommendation-row"><span className="row-icon"><CheckCircle2 size={17} /></span><span><strong>Mastery checks</strong><span>Short lesson evidence</span></span></div><div className="recommendation-row"><span className="row-icon"><ClipboardCheck size={17} /></span><span><strong>Unit quizzes</strong><span>Mixed, cumulative practice</span></span></div></div>
          </section>
          <section className="panel"><span className="eyebrow">Assessment mode</span><h3 style={{ marginTop: 8 }}>Feedback waits until the end.</h3><p className="muted small">Timed or graded assessments do not reveal correctness or tutor hints during the attempt. Review becomes available after submission.</p><div className="course-meta"><span><Clock3 size={14} /> Timers are optional</span></div></section>
        </aside>
      </div>
    </div>
  );
}


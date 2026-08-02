import type { Metadata } from "next";
import { BookOpen, Check, Lightbulb, MessageCircleQuestion, Sparkles } from "lucide-react";
import { TutorPanel } from "../../../components/tutor-panel";

export const metadata: Metadata = { title: "Ask Soma" };

export default function TutorPage() {
  return (
    <div className="app-page">
      <header className="page-heading"><div><span className="eyebrow">Soma · School of Math Assistant</span><h1>Think it through with a tutor beside you.</h1><p>Soma’s built-in demo provider is concise, lesson-aware, and designed to guide before it explains.</p></div><span className="status-pill"><Sparkles size={14} /> Guided mode</span></header>
      <div className="dashboard-grid">
        <TutorPanel compact lessonTitle="Solving One-Step Equations" lessonContext="Equation balance, inverse operations, isolating a variable, and checking a solution." />
        <aside className="dashboard-column">
          <section className="panel"><div className="panel-heading"><h3>Current lesson context</h3><BookOpen size={18} color="var(--teal)" /></div><span className="eyebrow">Algebra Foundations · Unit 3</span><h2 style={{ fontFamily: "var(--font-display)", margin: "9px 0" }}>Solving One-Step Equations</h2><p className="small muted">Use inverse operations to isolate a variable and verify the result.</p><ul className="check-list"><li><Check size={15} /> Keep both sides balanced</li><li><Check size={15} /> Name the inverse operation</li><li><Check size={15} /> Check in the original equation</li></ul></section>
          <section className="panel"><div className="panel-heading"><h3>Good ways to ask</h3><MessageCircleQuestion size={18} color="var(--teal)" /></div><div className="recommendation-list"><div className="recommendation-row"><span className="row-icon"><Lightbulb size={16} /></span><span><strong>“Give me a first hint.”</strong><span>Points without revealing</span></span></div><div className="recommendation-row"><span className="row-icon"><MessageCircleQuestion size={16} /></span><span><strong>“Check this step…”</strong><span>Share your reasoning</span></span></div><div className="recommendation-row"><span className="row-icon"><Sparkles size={16} /></span><span><strong>“Use smaller numbers.”</strong><span>Adjust the explanation</span></span></div></div></section>
          <div className="demo-banner"><Check size={17} /><p><strong>Honest limitation:</strong> generated or scripted explanations can be wrong. Compare guidance with the lesson and verify each algebra step.</p></div>
        </aside>
      </div>
    </div>
  );
}

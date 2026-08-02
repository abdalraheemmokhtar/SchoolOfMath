"use client";

import { Blocks, BookOpen, Check, FileQuestion, GripVertical, Plus, Save, Users } from "lucide-react";
import { useState } from "react";

const baseRows = [
  { title: "Understanding Variables", unit: "Numbers & Variables", blocks: 14, status: "Published" },
  { title: "Simplifying Algebraic Expressions", unit: "Expressions", blocks: 16, status: "Published" },
  { title: "Solving One-Step Equations", unit: "One-Step Equations", blocks: 15, status: "Published" },
  { title: "Equations with Negative Numbers", unit: "One-Step Equations", blocks: 5, status: "Draft" },
];

const blockTypes = ["Heading", "Paragraph", "Formula", "Worked example", "Definition", "Key idea", "Common mistake", "Image", "Diagram", "Table", "Interactive question", "Practice set", "Summary"];

export function AdminDashboard() {
  const [rows, setRows] = useState(baseRows);
  const [editor, setEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [saved, setSaved] = useState(false);

  function addDraft(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    setRows((current) => [...current, { title: title.trim(), unit: "Expressions", blocks: 1, status: "Draft" }]);
    setTitle("");
    setEditor(false);
  }

  return (
    <>
      <div className="admin-stats"><article className="metric-card"><span>Courses</span><strong>10</strong><small>1 fully authored</small></article><article className="metric-card"><span>Lessons</span><strong>27</strong><small>3 deep lessons</small></article><article className="metric-card"><span>Questions</span><strong>27</strong><small>7 evaluation types</small></article><article className="metric-card"><span>Learners</span><strong>1</strong><small>seeded demo</small></article></div>
      <div className="admin-layout">
        <section className="panel">
          <div className="panel-heading"><div><span className="eyebrow">Content management</span><h2>Algebra Foundations lessons</h2></div><button className="button button-primary" type="button" onClick={() => setEditor((value) => !value)}><Plus size={16} /> New lesson</button></div>
          {editor && <form className="panel-flat field-grid" onSubmit={addDraft} style={{ marginBottom: 18 }}><label className="field"><span>Lesson title</span><input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Factoring simple expressions" /></label><label className="field"><span>Unit</span><select defaultValue="Expressions"><option>Numbers & Variables</option><option>Expressions</option><option>One-Step Equations</option></select></label><button className="button button-secondary" type="submit">Create draft</button></form>}
          <table className="admin-table"><thead><tr><th>Lesson</th><th>Unit</th><th>Blocks</th><th>Status</th></tr></thead><tbody>{rows.map((row) => <tr key={row.title}><td><strong>{row.title}</strong></td><td>{row.unit}</td><td>{row.blocks}</td><td><span className={row.status === "Draft" ? "mastery-level review" : "mastery-level"}>{row.status}</span></td></tr>)}</tbody></table>
        </section>
        <aside className="dashboard-column">
          <section className="panel"><div className="panel-heading"><h3>Lesson block editor</h3><Blocks size={18} color="var(--teal)" /></div><div className="block-type-grid">{blockTypes.map((type) => <button className="block-type" type="button" key={type} onClick={() => setSaved(false)}><GripVertical size={14} />{type}</button>)}</div><button className="button button-ghost" type="button" style={{ width: "100%", marginTop: 15 }} onClick={() => setSaved(true)}><Save size={16} /> Save block order</button>{saved && <p className="small" style={{ color: "var(--success)", marginTop: 9 }}><Check size={13} style={{ display: "inline" }} /> Editor changes saved for this demo session.</p>}</section>
          <section className="panel"><div className="recommendation-list"><div className="recommendation-row"><span className="row-icon"><BookOpen size={17} /></span><span><strong>Courses</strong><span>Structure and outcomes</span></span></div><div className="recommendation-row"><span className="row-icon"><FileQuestion size={17} /></span><span><strong>Question bank</strong><span>Hints and solutions</span></span></div><div className="recommendation-row"><span className="row-icon"><Users size={17} /></span><span><strong>Learner progress</strong><span>Role-protected records</span></span></div></div></section>
          <div className="demo-banner"><Check size={17} /><p><strong>Internal demo:</strong> this interface creates local draft rows. Production content mutations require server-side admin authorization.</p></div>
        </aside>
      </div>
    </>
  );
}


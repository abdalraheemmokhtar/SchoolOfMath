"use client";

import { Download, Moon, Save, ShieldAlert, Sun, Trash2 } from "lucide-react";
import { useState } from "react";

export function SettingsPanel() {
  const [tab, setTab] = useState("Profile");
  const [reminders, setReminders] = useState(true);
  const [summary, setSummary] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  function exportData() {
    const payload = { learner: { name: "Amina", email: "learner@schoolofmath.demo" }, course: "Algebra Foundations", progress: 38, exportedAt: new Date().toISOString() };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "school-of-math-demo-data.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="tabs" role="tablist">{["Profile", "Learning", "Accessibility", "Notifications", "Account"].map((item) => <button type="button" role="tab" aria-selected={tab === item} className={tab === item ? "active" : ""} onClick={() => { setTab(item); setSaved(false); }} key={item}>{item}</button>)}</div>
      <div className="settings-layout">
        <section className="panel">
          {tab === "Profile" && <><div className="panel-heading"><div><span className="eyebrow">Personal information</span><h2>Profile</h2></div></div><div className="field-grid two"><label className="field"><span>Display name</span><input defaultValue="Amina" /></label><label className="field"><span>Email address</span><input type="email" defaultValue="learner@schoolofmath.demo" /></label><label className="field"><span>Learning level</span><select defaultValue="Lower secondary"><option>Upper primary</option><option>Lower secondary</option><option>Upper secondary</option><option>Independent learner</option></select></label><label className="field"><span>Curriculum</span><select defaultValue="General mathematics"><option>General mathematics</option><option>University of Khartoum pathway</option><option>Skill-focused</option></select></label></div></>}
          {tab === "Learning" && <><div className="panel-heading"><div><span className="eyebrow">Learning preferences</span><h2>Your study rhythm</h2></div></div><div className="field-grid"><label className="field"><span>Weekly goal</span><select defaultValue="120"><option value="60">60 minutes</option><option value="120">120 minutes</option><option value="180">180 minutes</option></select></label><label className="field"><span>Preferred pace</span><select defaultValue="Steady"><option>Gentle</option><option>Steady</option><option>Intensive</option></select></label><label className="field"><span>Default tutor depth</span><select defaultValue="Concise"><option>Concise</option><option>Balanced</option><option>Detailed</option></select></label></div></>}
          {tab === "Accessibility" && <><div className="panel-heading"><div><span className="eyebrow">Accessibility</span><h2>Reading and motion</h2></div></div><div className="setting-row"><div><strong>Reduced motion</strong><span>Minimize transitions and animated chart changes.</span></div><button type="button" className={reducedMotion ? "switch on" : "switch"} aria-pressed={reducedMotion} onClick={() => setReducedMotion((value) => !value)} /></div><div className="setting-row"><div><strong>Higher contrast</strong><span>Strengthen panel borders and supporting text.</span></div><button type="button" className={highContrast ? "switch on" : "switch"} aria-pressed={highContrast} onClick={() => setHighContrast((value) => !value)} /></div><label className="field" style={{ marginTop: 18 }}><span>Text size</span><select defaultValue="Comfortable"><option>Default</option><option>Comfortable</option><option>Large</option></select></label></>}
          {tab === "Notifications" && <><div className="panel-heading"><div><span className="eyebrow">Notifications</span><h2>Useful reminders only</h2></div></div><div className="setting-row"><div><strong>Learning reminders</strong><span>A calm reminder on chosen study days.</span></div><button type="button" className={reminders ? "switch on" : "switch"} aria-pressed={reminders} onClick={() => setReminders((value) => !value)} /></div><div className="setting-row"><div><strong>Weekly summary</strong><span>Progress, review topics, and a recommended next step.</span></div><button type="button" className={summary ? "switch on" : "switch"} aria-pressed={summary} onClick={() => setSummary((value) => !value)} /></div></>}
          {tab === "Account" && <><div className="panel-heading"><div><span className="eyebrow">Account data</span><h2>Export or remove data</h2></div></div><div className="setting-row"><div><strong>Export learner data</strong><span>Download profile, enrollment, progress, and assessment records as JSON.</span></div><button className="button button-ghost" type="button" onClick={exportData}><Download size={16} /> Export</button></div><div className="panel-flat danger-zone" style={{ marginTop: 20 }}><h3><ShieldAlert size={18} style={{ display: "inline", marginRight: 7 }} />Delete account</h3><p className="muted small">This demo interface never deletes hosted identity. In a configured production app, deletion would remove app-owned progress after a confirmation period.</p>{confirmDelete ? <div className="feedback incorrect"><Trash2 size={18} /><div><strong>Demo deletion requested.</strong><p>No identity data was removed because this is a seeded demo account.</p></div></div> : <button className="button button-danger" type="button" onClick={() => setConfirmDelete(true)}><Trash2 size={16} /> Request deletion</button>}</div></>}
          {tab !== "Account" && <div className="question-actions">{saved && <span className="small" style={{ color: "var(--success)" }}>Preferences saved for this session.</span>}<button className="button button-primary" type="button" onClick={() => setSaved(true)}><Save size={16} /> Save changes</button></div>}
        </section>
        <aside className="dashboard-column">
          <section className="panel"><span className="eyebrow">Theme</span><h3 style={{ marginTop: 8 }}>Calm in light or dark.</h3><div className="field-grid two" style={{ marginTop: 18 }}><button className="topic-option selected" type="button" onClick={() => { document.documentElement.dataset.theme = "light"; localStorage.setItem("som-theme", "light"); }}><Sun size={17} /> Light</button><button className="topic-option" type="button" onClick={() => { document.documentElement.dataset.theme = "dark"; localStorage.setItem("som-theme", "dark"); }}><Moon size={17} /> Dark</button></div></section>
          <section className="panel"><span className="eyebrow">Privacy</span><h3 style={{ marginTop: 8 }}>Tutor conversations stay private.</h3><p className="small muted">Mentors can see courses, activity, skills, and results. They cannot read Soma conversations by default.</p></section>
        </aside>
      </div>
    </>
  );
}


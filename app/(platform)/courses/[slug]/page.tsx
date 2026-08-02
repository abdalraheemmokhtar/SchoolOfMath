import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, Clock3, Lock, Play, RotateCcw } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { algebraCourse, algebraUnits, courses } from "../../../../lib/curriculum";
import { ProgressRing } from "../../../../components/progress-ring";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.id === slug);
  return { title: course?.title ?? "Course" };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  if (slug !== "algebra-foundations") {
    const course = courses.find((item) => item.id === slug);
    if (!course) notFound();
    return (
      <div className="app-page">
        <Link className="button button-text" href="/courses"><ArrowLeft size={15} /> All courses</Link>
        <section className="panel" style={{ marginTop: 20 }}>
          <span className="eyebrow">{course.level} · Roadmap course</span><h1 className="display-title" style={{ fontSize: "3.5rem", margin: "12px 0" }}>{course.title}</h1><p className="muted">{course.description}</p>
          <div className="demo-banner"><BookOpen size={17} /><p>This course is part of the preserved curriculum roadmap. Interactive lesson content is intentionally limited in this release; Algebra Foundations demonstrates the full course model.</p></div>
          <div className="skill-chips">{course.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
          <Link className="button button-primary" href="/courses/algebra-foundations" style={{ marginTop: 24 }}>Open complete demo course <ArrowRight size={16} /></Link>
        </section>
      </div>
    );
  }

  return (
    <div className="app-page">
      <Link className="button button-text" href="/courses"><ArrowLeft size={15} /> All courses</Link>
      <section className="course-hero">
        <div><span className="eyebrow" style={{ color: "#78d3c3" }}>{algebraCourse.level}</span><h1>{algebraCourse.title}</h1><p>{algebraCourse.description}</p><div className="skill-chips">{algebraCourse.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div><Link className="button" href="/learn/solving-one-step-equations" style={{ background: "#fff", color: "#17313a", marginTop: 24 }}>Continue course <ArrowRight size={16} /></Link></div>
        <aside className="course-summary-card"><ProgressRing value={38} /><div><strong>38% complete</strong><span>9 of 27 lessons</span><span>Next: One-Step Equations</span></div></aside>
      </section>
      <div className="course-layout">
        <section>
          <div className="panel-heading"><div><span className="eyebrow">Curriculum</span><h2>7 units · 27 lessons</h2></div><span className="muted small">8–10 weeks</span></div>
          {algebraUnits.map((unit, unitIndex) => (
            <details className="unit-accordion" open={unitIndex < 3} key={unit.id}>
              <summary><span className="unit-number">{unitIndex + 1}</span><span><strong>{unit.title}</strong><span>{unit.description}</span></span><span>{unit.lessons.length} lessons</span></summary>
              <div className="lesson-list">
                {unit.lessons.map((lesson) => {
                  const linkable = Boolean(lesson.explanation);
                  const Icon = lesson.status === "complete" ? CheckCircle2 : lesson.status === "review" ? RotateCcw : lesson.status === "locked" ? Lock : Play;
                  return (
                    <Link className={`lesson-row ${lesson.status === "locked" ? "locked" : ""}`} href={linkable ? `/learn/${lesson.id}` : "/courses/algebra-foundations"} key={lesson.id} aria-disabled={!linkable}>
                      <span className={`lesson-status-icon ${lesson.status}`}><Icon size={15} /></span><span><strong>{lesson.title}</strong><span>{lesson.objective}</span></span><span>{lesson.duration} min</span>
                    </Link>
                  );
                })}
                <Link className="lesson-row" href="/assessments"><span className="lesson-status-icon"><Check size={15} /></span><span><strong>Unit mastery quiz</strong><span>{unit.quizQuestionIds.length} mixed questions</span></span><span>Untimed</span></Link>
              </div>
            </details>
          ))}
        </section>
        <aside>
          <section className="panel sticky-card">
            <div className="panel-heading"><h3>What you’ll learn</h3><BookOpen size={18} color="var(--teal)" /></div>
            <ul className="outcome-list">{algebraCourse.skills.map((skill) => <li key={skill}><Check size={16} /> Explain and apply {skill.toLowerCase()}</li>)}</ul>
            <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "22px 0" }} />
            <span className="eyebrow">Prerequisites</span><p className="small muted" style={{ marginTop: 8 }}>{algebraCourse.prerequisites.join(" · ")}</p>
            <div className="course-meta"><span><Clock3 size={14} /> {algebraCourse.duration}</span><span><BookOpen size={14} /> {algebraCourse.unitCount} units</span></div>
            <div className="demo-banner"><Check size={17} /><p><strong>Platform note:</strong> Lessons prioritize reasoning and gradual support. Move at a pace that leaves time to explain your steps.</p></div>
          </section>
        </aside>
      </div>
    </div>
  );
}


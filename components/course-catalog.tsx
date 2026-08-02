"use client";

import { ArrowRight, BookOpen, Clock3, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { courses } from "../lib/curriculum";

export function CourseCatalog() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All levels");
  const filtered = useMemo(() => courses.filter((course) => {
    const matchesSearch = `${course.title} ${course.description} ${course.skills.join(" ")}`.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = level === "All levels" || course.level.toLowerCase().includes(level.toLowerCase());
    return matchesSearch && matchesLevel;
  }), [level, search]);

  return (
    <>
      <div className="filter-bar">
        <label className="search-field"><Search size={18} /><span className="sr-only">Search courses</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search topics, skills, or courses…" /></label>
        <select className="select-field" value={level} onChange={(event) => setLevel(event.target.value)} aria-label="Filter by level"><option>All levels</option><option>Foundation</option><option>Intermediate</option><option>Advanced</option><option>University</option></select>
      </div>
      {filtered.length > 0 ? (
        <div className="course-grid">
          {filtered.map((course) => (
            <Link className={course.featured ? "course-card featured" : "course-card"} href={course.id === "algebra-foundations" ? "/courses/algebra-foundations" : `/courses/${course.id}`} key={course.id}>
              <span className="eyebrow">{course.level}</span>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="skill-chips">{course.skills.slice(0, 3).map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
              <div className="course-card-footer">
                <div className="course-meta"><span><Clock3 size={14} /> {course.duration}</span><span><BookOpen size={14} /> {course.unitCount} units</span>{typeof course.progress === "number" && <span>{course.progress}% complete</span>}</div>
                {typeof course.progress === "number" && <div className="progress-bar"><span style={{ width: `${course.progress}%` }} /></div>}
                <span className="button button-text">{course.id === "algebra-foundations" ? "Open course" : "View roadmap"} <ArrowRight size={15} /></span>
              </div>
            </Link>
          ))}
        </div>
      ) : <div className="panel"><h2>No courses match yet</h2><p className="muted">Try a broader topic or choose “All levels.”</p><button className="button button-ghost" type="button" onClick={() => { setSearch(""); setLevel("All levels"); }}>Clear filters</button></div>}
    </>
  );
}


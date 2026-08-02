import type { Metadata } from "next";
import { CourseCatalog } from "../../../components/course-catalog";

export const metadata: Metadata = { title: "Course catalog" };
export default function CoursesPage() {
  return <div className="app-page"><header className="page-heading"><div><span className="eyebrow">Course catalog</span><h1>Choose a path with a clear next step.</h1><p>Search by topic or skill. Algebra Foundations is fully interactive; the wider catalog preserves the breadth of the original School of Math curriculum as a transparent roadmap.</p></div></header><CourseCatalog /></div>;
}


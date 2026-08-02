import type { Metadata } from "next";
import { PracticeBuilder } from "../../../components/practice-builder";

export const metadata: Metadata = { title: "Practice center" };
export default function PracticePage() {
  return <div className="app-page"><header className="page-heading"><div><span className="eyebrow">Practice center</span><h1>Target the skill that needs attention.</h1><p>Choose a topic, difficulty, and pacing. Recommended weak-topic practice is preselected from your recent mastery evidence.</p></div></header><PracticeBuilder /></div>;
}

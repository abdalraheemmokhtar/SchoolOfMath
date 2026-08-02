import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonExperience } from "../../../../components/lesson-experience";
import { getLesson } from "../../../../lib/curriculum";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return { title: lesson?.title ?? "Lesson" };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson?.explanation) notFound();
  return <LessonExperience lesson={lesson} />;
}


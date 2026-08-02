import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { courses, enrollments, lessonProgress, skillMastery, userProfiles, users } from "../../../db/schema";

const updateSchema = z.object({
  lessonId: z.string().min(1).max(100),
  progressPercent: z.number().int().min(0).max(100),
  accuracy: z.number().int().min(0).max(100),
  hintCount: z.number().int().min(0).max(20),
  skill: z.string().min(1).max(100),
});

async function identity() {
  const user = await getChatGPTUser();
  return user ?? {
    userId: "demo-learner",
    email: "learner@schoolofmath.demo",
    displayName: "Amina",
    fullName: "Amina",
  };
}

async function ensureDemoUser() {
  const person = await identity();
  const db = getDb();
  await db
    .insert(users)
    .values({ id: person.userId, email: person.email, displayName: person.displayName })
    .onConflictDoNothing();
  await db
    .insert(userProfiles)
    .values({ userId: person.userId })
    .onConflictDoNothing();
  await db
    .insert(courses)
    .values({
      id: "algebra-foundations",
      title: "Algebra Foundations",
      level: "Foundation",
      description: "A structured path from variables to linear relationships.",
      durationMinutes: 960,
      featured: true,
      published: true,
    })
    .onConflictDoNothing();
  await db
    .insert(enrollments)
    .values({
      id: `${person.userId}-algebra`,
      userId: person.userId,
      courseId: "algebra-foundations",
      progressPercent: 38,
    })
    .onConflictDoNothing();
  return person;
}

export async function GET() {
  try {
    const person = await ensureDemoUser();
    const db = getDb();
    const [enrollment, lessons, mastery] = await Promise.all([
      db.select().from(enrollments).where(and(eq(enrollments.userId, person.userId), eq(enrollments.courseId, "algebra-foundations"))).limit(1),
      db.select().from(lessonProgress).where(eq(lessonProgress.userId, person.userId)).orderBy(desc(lessonProgress.updatedAt)).limit(20),
      db.select().from(skillMastery).where(eq(skillMastery.userId, person.userId)).limit(20),
    ]);
    return Response.json({
      mode: person.userId === "demo-learner" ? "demo" : "persistent",
      learner: { name: person.displayName, email: person.email },
      courseProgress: enrollment[0]?.progressPercent ?? 38,
      lessons,
      mastery,
    });
  } catch {
    return Response.json({
      mode: "seeded-demo",
      learner: { name: "Amina", email: "learner@schoolofmath.demo" },
      courseProgress: 38,
      lessons: [],
      mastery: [],
    });
  }
}

export async function POST(request: Request) {
  try {
    const payload = updateSchema.parse(await request.json());
    const person = await ensureDemoUser();
    const db = getDb();
    const status = payload.progressPercent === 100 ? "complete" : "in_progress";

    await db
      .insert(lessonProgress)
      .values({
        id: `${person.userId}-${payload.lessonId}`,
        userId: person.userId,
        lessonId: payload.lessonId,
        status,
        progressPercent: payload.progressPercent,
        accuracy: payload.accuracy,
        hintCount: payload.hintCount,
        completedAt: status === "complete" ? new Date().toISOString() : null,
        updatedAt: new Date().toISOString(),
      })
      .onConflictDoUpdate({
        target: [lessonProgress.userId, lessonProgress.lessonId],
        set: {
          status,
          progressPercent: payload.progressPercent,
          accuracy: payload.accuracy,
          hintCount: payload.hintCount,
          completedAt: status === "complete" ? new Date().toISOString() : null,
          updatedAt: new Date().toISOString(),
        },
      });

    const masteryScore = Math.round(payload.accuracy * 0.78 + (payload.hintCount === 0 ? 18 : 8));
    await db
      .insert(skillMastery)
      .values({
        id: `${person.userId}-${payload.skill}`,
        userId: person.userId,
        skillId: payload.skill,
        level: masteryScore >= 86 ? "Mastered" : masteryScore >= 70 ? "Proficient" : "Developing",
        score: masteryScore,
        attempts: 1,
        lastPracticedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .onConflictDoUpdate({
        target: [skillMastery.userId, skillMastery.skillId],
        set: {
          level: masteryScore >= 86 ? "Mastered" : masteryScore >= 70 ? "Proficient" : "Developing",
          score: masteryScore,
          lastPracticedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    return Response.json({ saved: true, masteryScore });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid progress data", details: error.flatten() }, { status: 400 });
    }
    return Response.json({ saved: false, mode: "seeded-demo" }, { status: 200 });
  }
}

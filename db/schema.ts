import { sql } from "drizzle-orm";
import { index, integer, primaryKey, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
};

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    displayName: text("display_name").notNull(),
    role: text("role", { enum: ["learner", "mentor", "admin"] }).notNull().default("learner"),
    ...timestamps,
  },
  (table) => [uniqueIndex("idx_users_email").on(table.email)],
);

export const userProfiles = sqliteTable("user_profiles", {
  userId: text("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  learningLevel: text("learning_level").notNull().default("Secondary"),
  curriculum: text("curriculum").notNull().default("General mathematics"),
  topics: text("topics").notNull().default("Algebra"),
  confidence: integer("confidence").notNull().default(3),
  weeklyGoalMinutes: integer("weekly_goal_minutes").notNull().default(120),
  studyPace: text("study_pace").notNull().default("Steady"),
  theme: text("theme").notNull().default("system"),
  accessibilityJson: text("accessibility_json").notNull().default("{}"),
  ...timestamps,
});

export const courses = sqliteTable("courses", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  level: text("level").notNull(),
  description: text("description").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

export const units = sqliteTable(
  "units",
  {
    id: text("id").primaryKey(),
    courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    position: integer("position").notNull(),
    ...timestamps,
  },
  (table) => [index("idx_units_course_position").on(table.courseId, table.position)],
);

export const lessons = sqliteTable(
  "lessons",
  {
    id: text("id").primaryKey(),
    unitId: text("unit_id").notNull().references(() => units.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    objective: text("objective").notNull(),
    durationMinutes: integer("duration_minutes").notNull(),
    position: integer("position").notNull(),
    published: integer("published", { mode: "boolean" }).notNull().default(false),
    ...timestamps,
  },
  (table) => [index("idx_lessons_unit_position").on(table.unitId, table.position)],
);

export const lessonBlocks = sqliteTable(
  "lesson_blocks",
  {
    id: text("id").primaryKey(),
    lessonId: text("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
    blockType: text("block_type", {
      enum: ["heading", "paragraph", "formula", "worked_example", "definition", "key_idea", "common_mistake", "image", "diagram", "table", "interactive_question", "practice_set", "summary"],
    }).notNull(),
    contentJson: text("content_json").notNull(),
    position: integer("position").notNull(),
    ...timestamps,
  },
  (table) => [index("idx_lesson_blocks_lesson_position").on(table.lessonId, table.position)],
);

export const skills = sqliteTable("skills", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  ...timestamps,
});

export const courseSkills = sqliteTable(
  "course_skills",
  {
    courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
    skillId: text("skill_id").notNull().references(() => skills.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.courseId, table.skillId] })],
);

export const lessonSkills = sqliteTable(
  "lesson_skills",
  {
    lessonId: text("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
    skillId: text("skill_id").notNull().references(() => skills.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.lessonId, table.skillId] })],
);

export const enrollments = sqliteTable(
  "enrollments",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
    status: text("status", { enum: ["active", "paused", "complete"] }).notNull().default("active"),
    progressPercent: integer("progress_percent").notNull().default(0),
    enrolledAt: text("enrolled_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("idx_enrollments_user_course").on(table.userId, table.courseId),
    index("idx_enrollments_user_status").on(table.userId, table.status),
  ],
);

export const lessonProgress = sqliteTable(
  "lesson_progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id").notNull(),
    status: text("status", { enum: ["not_started", "in_progress", "complete", "review"] }).notNull().default("not_started"),
    progressPercent: integer("progress_percent").notNull().default(0),
    accuracy: integer("accuracy").notNull().default(0),
    hintCount: integer("hint_count").notNull().default(0),
    completedAt: text("completed_at"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("idx_lesson_progress_user_lesson").on(table.userId, table.lessonId),
    index("idx_lesson_progress_user_status").on(table.userId, table.status),
  ],
);

export const skillMastery = sqliteTable(
  "skill_mastery",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    skillId: text("skill_id").notNull(),
    level: text("level").notNull().default("Introduced"),
    score: integer("score").notNull().default(0),
    attempts: integer("attempts").notNull().default(0),
    lastPracticedAt: text("last_practiced_at"),
    ...timestamps,
  },
  (table) => [uniqueIndex("idx_skill_mastery_user_skill").on(table.userId, table.skillId)],
);

export const questions = sqliteTable(
  "questions",
  {
    id: text("id").primaryKey(),
    lessonId: text("lesson_id"),
    skillId: text("skill_id"),
    kind: text("kind").notNull(),
    prompt: text("prompt").notNull(),
    answerJson: text("answer_json").notNull(),
    difficulty: integer("difficulty").notNull().default(1),
    explanation: text("explanation").notNull(),
    misconceptionId: text("misconception_id"),
    ...timestamps,
  },
  (table) => [index("idx_questions_lesson").on(table.lessonId), index("idx_questions_skill").on(table.skillId)],
);

export const questionOptions = sqliteTable(
  "question_options",
  {
    id: text("id").primaryKey(),
    questionId: text("question_id").notNull().references(() => questions.id, { onDelete: "cascade" }),
    label: text("label").notNull(),
    value: text("value").notNull(),
    position: integer("position").notNull(),
  },
  (table) => [index("idx_question_options_question_position").on(table.questionId, table.position)],
);

export const hints = sqliteTable(
  "hints",
  {
    id: text("id").primaryKey(),
    questionId: text("question_id").notNull().references(() => questions.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    level: integer("level").notNull(),
  },
  (table) => [index("idx_hints_question_level").on(table.questionId, table.level)],
);

export const solutionSteps = sqliteTable(
  "solution_steps",
  {
    id: text("id").primaryKey(),
    questionId: text("question_id").notNull().references(() => questions.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    position: integer("position").notNull(),
  },
  (table) => [index("idx_solution_steps_question_position").on(table.questionId, table.position)],
);

export const practiceSessions = sqliteTable(
  "practice_sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    mode: text("mode").notNull(),
    difficulty: text("difficulty").notNull(),
    startedAt: text("started_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    completedAt: text("completed_at"),
  },
  (table) => [index("idx_practice_sessions_user_started").on(table.userId, table.startedAt)],
);

export const practiceAttempts = sqliteTable(
  "practice_attempts",
  {
    id: text("id").primaryKey(),
    sessionId: text("session_id").notNull().references(() => practiceSessions.id, { onDelete: "cascade" }),
    questionId: text("question_id").notNull(),
    answerJson: text("answer_json").notNull(),
    correct: integer("correct", { mode: "boolean" }).notNull(),
    hintsUsed: integer("hints_used").notNull().default(0),
    durationSeconds: integer("duration_seconds").notNull().default(0),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_practice_attempts_session").on(table.sessionId)],
);

export const assessments = sqliteTable("assessments", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull(),
  unitId: text("unit_id"),
  title: text("title").notNull(),
  kind: text("kind").notNull(),
  timeLimitMinutes: integer("time_limit_minutes"),
  ...timestamps,
});

export const assessmentQuestions = sqliteTable(
  "assessment_questions",
  {
    assessmentId: text("assessment_id").notNull().references(() => assessments.id, { onDelete: "cascade" }),
    questionId: text("question_id").notNull().references(() => questions.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.assessmentId, table.questionId] }),
    index("idx_assessment_questions_position").on(table.assessmentId, table.position),
  ],
);

export const assessmentAttempts = sqliteTable(
  "assessment_attempts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    assessmentId: text("assessment_id").notNull().references(() => assessments.id, { onDelete: "cascade" }),
    score: integer("score").notNull(),
    durationSeconds: integer("duration_seconds").notNull(),
    breakdownJson: text("breakdown_json").notNull().default("{}"),
    completedAt: text("completed_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_assessment_attempts_user_completed").on(table.userId, table.completedAt)],
);

export const tutorConversations = sqliteTable(
  "tutor_conversations",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id"),
    title: text("title").notNull(),
    ...timestamps,
  },
  (table) => [index("idx_tutor_conversations_user_updated").on(table.userId, table.updatedAt)],
);

export const tutorMessages = sqliteTable(
  "tutor_messages",
  {
    id: text("id").primaryKey(),
    conversationId: text("conversation_id").notNull().references(() => tutorConversations.id, { onDelete: "cascade" }),
    role: text("role", { enum: ["learner", "assistant", "system"] }).notNull(),
    content: text("content").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_tutor_messages_conversation_created").on(table.conversationId, table.createdAt)],
);

export const achievements = sqliteTable("achievements", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  ...timestamps,
});

export const userAchievements = sqliteTable(
  "user_achievements",
  {
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    achievementId: text("achievement_id").notNull().references(() => achievements.id, { onDelete: "cascade" }),
    earnedAt: text("earned_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [primaryKey({ columns: [table.userId, table.achievementId] })],
);

export const learningGoals = sqliteTable(
  "learning_goals",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    weeklyMinutes: integer("weekly_minutes").notNull(),
    currentMinutes: integer("current_minutes").notNull().default(0),
    weekStart: text("week_start").notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("idx_learning_goals_user_week").on(table.userId, table.weekStart)],
);

export const notificationPreferences = sqliteTable("notification_preferences", {
  userId: text("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  learningReminders: integer("learning_reminders", { mode: "boolean" }).notNull().default(true),
  weeklySummary: integer("weekly_summary", { mode: "boolean" }).notNull().default(true),
  mentorUpdates: integer("mentor_updates", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

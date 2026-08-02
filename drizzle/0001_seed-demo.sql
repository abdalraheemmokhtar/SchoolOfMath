-- Custom SQL migration file, put your code below! --
INSERT OR IGNORE INTO users (id, email, display_name, role)
VALUES
  ('demo-learner', 'learner@schoolofmath.demo', 'Amina', 'learner'),
  ('demo-mentor', 'mentor@schoolofmath.demo', 'Samira', 'mentor'),
  ('demo-admin', 'admin@schoolofmath.demo', 'School of Math Admin', 'admin');

INSERT OR IGNORE INTO user_profiles (user_id, learning_level, curriculum, topics, confidence, weekly_goal_minutes, study_pace)
VALUES ('demo-learner', 'Lower secondary', 'General mathematics', 'Algebra,Geometry', 3, 120, 'Steady');

INSERT OR IGNORE INTO courses (id, title, level, description, duration_minutes, featured, published)
VALUES ('algebra-foundations', 'Algebra Foundations', 'Foundation', 'A structured path from variables and expressions to equations, inequalities, and linear relationships.', 960, 1, 1);

INSERT OR IGNORE INTO units (id, course_id, title, description, position)
VALUES
  ('numbers-variables', 'algebra-foundations', 'Numbers and Variables', 'Build the language of algebra.', 1),
  ('expressions', 'algebra-foundations', 'Expressions', 'Read, build, and simplify expressions.', 2),
  ('one-step-equations', 'algebra-foundations', 'One-Step Equations', 'Use inverse operations and preserve equality.', 3),
  ('multi-step-equations', 'algebra-foundations', 'Multi-Step Equations', 'Plan several valid solution steps.', 4),
  ('inequalities', 'algebra-foundations', 'Inequalities', 'Describe and solve ranges of values.', 5),
  ('coordinate-plane', 'algebra-foundations', 'Coordinate Plane', 'Locate and compare points.', 6),
  ('linear-relationships', 'algebra-foundations', 'Linear Relationships', 'Connect rates, tables, graphs, and equations.', 7);

INSERT OR IGNORE INTO lessons (id, unit_id, title, objective, duration_minutes, position, published)
VALUES
  ('understanding-variables', 'numbers-variables', 'Understanding Variables', 'Identify variables, translate phrases, and evaluate expressions.', 18, 1, 1),
  ('number-systems', 'numbers-variables', 'The Number System', 'Classify integers, rational numbers, and real numbers.', 16, 2, 1),
  ('translating-phrases', 'numbers-variables', 'Translating Words into Algebra', 'Represent everyday quantities with expressions.', 16, 3, 1),
  ('evaluating-expressions', 'numbers-variables', 'Evaluating Expressions', 'Substitute values in the correct order.', 16, 4, 1),
  ('terms-and-coefficients', 'expressions', 'Terms, Factors, and Coefficients', 'Describe the parts of an expression.', 16, 1, 1),
  ('simplifying-algebraic-expressions', 'expressions', 'Simplifying Algebraic Expressions', 'Combine like terms and distribute accurately.', 24, 2, 1),
  ('order-of-operations', 'expressions', 'Order of Operations', 'Evaluate grouped expressions.', 16, 3, 1),
  ('equivalent-expressions', 'expressions', 'Equivalent Expressions', 'Compare expressions for equivalence.', 16, 4, 1),
  ('balance-model', 'one-step-equations', 'The Balance Model', 'Explain equality as balance.', 16, 1, 1),
  ('solving-one-step-equations', 'one-step-equations', 'Solving One-Step Equations', 'Use inverse operations and verify solutions.', 22, 2, 1),
  ('negative-equations', 'one-step-equations', 'Equations with Negative Numbers', 'Reason about negative coefficients.', 16, 3, 1),
  ('equation-word-problems', 'one-step-equations', 'One-Step Word Problems', 'Model situations with equations.', 16, 4, 1);

INSERT OR IGNORE INTO skills (id, name, description)
VALUES
  ('identify-variables', 'Identify variables', 'Recognize changing or unknown quantities.'),
  ('simplify-expressions', 'Simplify expressions', 'Combine like terms and distribute.'),
  ('solve-equations', 'Solve equations', 'Use inverse operations while preserving equality.');

INSERT OR IGNORE INTO questions (id, lesson_id, skill_id, kind, prompt, answer_json, difficulty, explanation)
VALUES
  ('var-check-2', 'understanding-variables', 'identify-variables', 'numeric', 'If m = 5, what is 3m + 2?', '"17"', 1, 'Substitute 5 for m: 3(5) + 2 = 17.'),
  ('expr-mastery', 'simplifying-algebraic-expressions', 'simplify-expressions', 'expression', 'Simplify 5(2x + 1) - 3x.', '"7*x+5"', 2, 'Distribute, then combine like terms.'),
  ('eq-mastery', 'solving-one-step-equations', 'solve-equations', 'numeric', 'Solve -3x = 21.', '"-7"', 2, 'Divide both sides by -3.');

INSERT OR IGNORE INTO hints (id, question_id, content, level)
VALUES
  ('eq-hint-1', 'eq-mastery', 'Identify the coefficient attached to x.', 1),
  ('eq-hint-2', 'eq-mastery', 'Divide both sides by -3.', 2),
  ('eq-hint-3', 'eq-mastery', 'Compute 21 divided by -3.', 3);

INSERT OR IGNORE INTO enrollments (id, user_id, course_id, status, progress_percent)
VALUES ('demo-learner-algebra', 'demo-learner', 'algebra-foundations', 'active', 38);

INSERT OR IGNORE INTO lesson_progress (id, user_id, lesson_id, status, progress_percent, accuracy, hint_count, completed_at)
VALUES
  ('demo-vars-progress', 'demo-learner', 'understanding-variables', 'complete', 100, 86, 1, '2026-07-28T16:00:00Z'),
  ('demo-expression-progress', 'demo-learner', 'simplifying-algebraic-expressions', 'complete', 100, 78, 2, '2026-07-30T16:00:00Z'),
  ('demo-equation-progress', 'demo-learner', 'solving-one-step-equations', 'in_progress', 42, 75, 1, NULL);

INSERT OR IGNORE INTO skill_mastery (id, user_id, skill_id, level, score, attempts, last_practiced_at)
VALUES
  ('demo-vars-mastery', 'demo-learner', 'identify-variables', 'Proficient', 84, 8, '2026-07-30T16:00:00Z'),
  ('demo-expr-mastery', 'demo-learner', 'simplify-expressions', 'Developing', 73, 7, '2026-07-30T16:00:00Z'),
  ('demo-eq-mastery', 'demo-learner', 'solve-equations', 'Developing', 62, 4, '2026-08-01T16:00:00Z');

INSERT OR IGNORE INTO tutor_conversations (id, user_id, lesson_id, title)
VALUES ('demo-conversation', 'demo-learner', 'solving-one-step-equations', 'Why subtract on both sides?');

INSERT OR IGNORE INTO tutor_messages (id, conversation_id, role, content)
VALUES
  ('demo-message-1', 'demo-conversation', 'learner', 'Why subtract on both sides?'),
  ('demo-message-2', 'demo-conversation', 'assistant', 'Think of the equation as a balanced scale. What changes if only one side loses 8?');

INSERT OR IGNORE INTO achievements (id, title, description, icon)
VALUES ('careful-checker', 'Careful checker', 'Verified five solutions in the original equation.', 'check');

INSERT OR IGNORE INTO user_achievements (user_id, achievement_id)
VALUES ('demo-learner', 'careful-checker');

INSERT OR IGNORE INTO learning_goals (id, user_id, weekly_minutes, current_minutes, week_start)
VALUES ('demo-goal-2026-07-27', 'demo-learner', 120, 98, '2026-07-27');

INSERT OR IGNORE INTO notification_preferences (user_id, learning_reminders, weekly_summary, mentor_updates)
VALUES ('demo-learner', 1, 1, 0);

PRAGMA optimize;

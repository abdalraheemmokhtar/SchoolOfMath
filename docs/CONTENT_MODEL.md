# Content model

School of Math keeps curriculum content structured and reviewable.

## Hierarchy

`Course → Unit → Lesson → Lesson block`

A course owns level, duration, prerequisites, outcomes, and skills. A unit owns objectives, ordered lessons, and a unit quiz. A lesson owns one objective, time estimate, summary, tutor context, and ordered blocks.

## Lesson blocks

Supported block types are heading, paragraph, formula, worked example, definition, key idea, common mistake, image, diagram, table, interactive question, practice set, and summary.

The current seeded content uses typed fields for ergonomic authoring; the D1 schema represents the same ideas through `lesson_blocks.block_type` and validated JSON content. The admin roadmap is to edit this canonical block representation and compile it into the learner view.

## Questions

Each question includes:

- stable ID and kind;
- prompt and expected answer;
- options or numeric tolerance when relevant;
- skill identifier;
- exactly three progressive hints;
- a complete explanation;
- an optional misconception identifier.

Kinds: numeric, fraction, expression, choice, multi-select, ordering, and normalized text.

The UI shows full explanation only after a correct answer or the strongest hint. Graded assessment mode delays all feedback until submission.

## Editorial quality

Every published lesson should have a single observable objective, at least two worked examples for a deep lesson, meaningful question variation, common-mistake guidance, mathematically checked explanations, useful alt text or semantic notation, and a next-step recommendation.


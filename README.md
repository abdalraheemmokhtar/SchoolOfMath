# School of Math

School of Math is a structured online mathematics academy with interactive lessons, progressive practice support, learner analytics, and **Soma**, a guided math tutor. It revives the original repository’s open mission—organizing a broad mathematics curriculum—while turning its course index into a coherent learning product.

The current release deeply implements **Algebra Foundations** and supplies a transparent roadmap for the wider curriculum. It runs without paid services: seeded curriculum and learner data, safe answer evaluation, and Soma’s rule-based provider all work without external API keys.

## Screenshots

Real screenshots should be captured from the deployed site after each major visual release:

- `docs/screenshots/homepage.png` — public homepage
- `docs/screenshots/dashboard.png` — learner dashboard
- `docs/screenshots/lesson.png` — focused lesson workspace
- `docs/screenshots/mobile-lesson.png` — mobile lesson and Soma access

The repository includes `public/og.png`, a generated social preview matching the current visual identity. It is not a product screenshot.

## What is implemented

- Public homepage with an interactive algebra check, featured paths, Soma and progress previews, demo testimonials, FAQ, and complete navigation.
- Demo sign-up, sign-in, password recovery, guest access, and multi-factor onboarding recommendation.
- Learner dashboard focused on the next useful action.
- Searchable, filterable ten-course catalog.
- Algebra Foundations with seven units and 27 lessons in its curriculum map.
- Deep lesson experiences for:
  - Understanding Variables
  - Simplifying Algebraic Expressions
  - Solving One-Step Equations
- Each deep lesson includes at least two worked examples, three checks, five practice questions, progressive hints, full feedback, a mastery check, a summary, and Soma context.
- Reusable evaluation for numeric, tolerance, fraction, algebraic-expression, multiple-choice, multiple-select, ordered-step, and normalized-text answers.
- Soma tutor modes with a no-key guided fallback.
- Practice builder, assessment center, learner progress, settings, mentor view, and functional internal admin demo.
- Light and dark themes, reduced-motion support, keyboard focus, semantic controls, responsive layouts, MathML-enabled KaTeX, loading, empty, 404, and global error states.
- D1/Drizzle relational schema with migrations and hosted learner progress persistence.
- Unit, curriculum, interaction, integration, and Playwright learner-journey tests.

Roadmap-only catalog courses are intentionally marked as limited rather than presented as complete.

## Technology

- Vinext with the Next.js App Router model
- React 19 and strict TypeScript
- Tailwind CSS 4 plus a reusable custom component system
- Lucide icons
- KaTeX with MathML output
- Recharts
- Framer Motion dependency available for future subtle motion; the current UI primarily uses CSS and respects reduced motion
- Drizzle ORM with Cloudflare D1
- Zod validation
- Math.js behind a constrained expression boundary
- Vitest, Testing Library, and Playwright
- Cloudflare Worker-compatible Sites output

## Architecture

```text
app/
  (platform)/                 learner, mentor, and admin routes
  api/progress/               validated persistent progress endpoint
  api/tutor/                  provider-neutral Soma endpoint
components/                   reusable UI and interaction components
db/                           Drizzle access and 27-table relational schema
drizzle/                      generated schema and demo seed migrations
lib/
  curriculum.ts               structured course, unit, lesson, and question seed
  evaluation.ts               safe answer evaluation
  mastery.ts                  documented mastery calculation
  tutor.ts                    Soma provider contract and fallback
tests/                        unit, curriculum, integration, and component tests
e2e/                          primary learner journey
worker/                       Cloudflare Worker entry
```

### Data strategy

Curriculum content is versioned TypeScript data so it can be reviewed, tested, and deployed with no database. Hosted learner state uses D1 through a narrow API boundary. If D1 is unavailable, the UI remains useful with the seeded demo and API responses degrade to `seeded-demo` mode.

The hosted private site uses OpenAI workspace identity headers when available. Local development and previews use `demo-learner`. The in-product email/password forms are an explicitly limited demo interface; app-owned public OAuth and outbound recovery email are not claimed.

### Soma provider abstraction

`TutorProvider` accepts a lesson-aware `TutorRequest`. `RuleBasedTutor` is the default provider and applies the product’s teaching rules:

- ask what the learner tried;
- hint before answering;
- justify operations;
- avoid shame and “this is easy” language;
- stay concise;
- disclose that generated or scripted guidance may need checking.

An OpenAI-compatible provider can replace this class behind the `/api/tutor` contract. Rate limiting should be enforced at the API/edge layer before enabling a paid provider.

### Security decisions

- Zod validates tutor and progress writes on the server.
- Learner identity comes from trusted request headers or the explicit demo identity, never client-submitted user IDs.
- D1 uses prepared queries through Drizzle.
- Algebraic answers are limited to mathematical characters and blocked names before Math.js evaluation. Candidate expressions are sampled in controlled numeric scopes; arbitrary JavaScript is never evaluated.
- Tutor and admin production writes require server-side identity and role checks before they move beyond demo state.
- Secrets stay in environment configuration and are never sent to the browser.

## Local setup

Requirements:

- Node.js 22.13 or newer
- npm

```bash
npm install
npm run db:setup
npm run dev
```

Open the local URL printed by the development server.

`db:setup` generates migrations from the checked-in schema. Sites applies the checked-in D1 migrations to the hosted database. Curriculum content and the demo learner remain available without D1.

## Environment variables

Copy `.env.example` to `.env.local` only if configuring a real tutor provider:

| Variable | Required | Purpose |
| --- | --- | --- |
| `AI_BASE_URL` | No | OpenAI-compatible API base URL |
| `AI_API_KEY` | No | Server-only provider credential |
| `AI_MODEL` | No | Provider model name |

The current release intentionally uses Soma’s rule-based provider even when these variables are present. Add the external provider implementation before expecting outbound AI calls. Hosted values should be configured through Sites, not committed.

## Database and seed data

`db/schema.ts` defines 27 relational tables covering users, profiles, courses, units, lesson blocks, skills, enrollment, progress, practice, assessments, tutoring, goals, achievements, and preferences.

```bash
npm run db:generate
```

Migrations:

- `0000_spotty_argent.sql` creates the schema and indexes.
- `0001_seed-demo.sql` seeds demo users, Algebra Foundations structure, representative questions and hints, progress, mastery, tutor history, achievement, goal, and notification records.

The API also uses idempotent inserts for the current identity, course, profile, and enrollment so a fresh hosted environment remains recoverable.

## Demo access

- Email: `learner@schoolofmath.demo`
- Password: `demo1234`

The password is UI demo data, not a production credential. Select **Enter as demo learner** to skip the form.

## Mastery model

The mastery score is a bounded weighted value:

```text
raw =
  recent accuracy × 0.42
  + assessment score × 0.30
  + evidence volume × 0.16
  + independent work × 0.12

score = clamp((raw × difficulty boost) − recency decay, 0, 1) × 100
```

- Evidence volume reaches full weight at eight attempts.
- Independent work is `1 − hint rate`.
- Difficulty supplies a modest `0.90–1.00` multiplier.
- Decay begins after 14 days and is capped so old evidence is reduced, not erased.
- A developed skill with no practice for more than 30 days becomes **Needs review**.
- Mastered requires a score of at least 86 and at least six attempts.

Levels: Not started, Introduced, Developing, Proficient, Mastered, and Needs review.

See `lib/mastery.ts` and `tests/mastery.test.ts` for the executable definition.

## Testing and verification

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Run the browser journey separately:

```bash
npx playwright install chromium
npm run test:e2e
```

The Playwright flow covers homepage → onboarding/demo access → dashboard → Algebra Foundations → lesson → answer → hint → Soma.

## Deployment

The project is configured for OpenAI Sites and Cloudflare Worker-compatible output:

```bash
npm run build
```

The Sites publishing workflow packages `dist/`, `.openai/hosting.json`, and D1 migrations, saves a source-linked version, then deploys the saved version. D1 is declared as the logical `DB` binding in `.openai/hosting.json`.

For another Cloudflare environment, provide equivalent Worker, Assets, Images, and D1 bindings and apply the migration files before serving write-enabled APIs.

## Content model

Lessons are composed from typed content plus structured block concepts:

- heading, paragraph, formula;
- worked example, definition, key idea, common mistake;
- image, diagram, table;
- interactive question, practice set, summary.

Questions carry kind, expected answer, optional options/tolerance, skill, three progressive hints, explanation, and optional misconception identifier. This structure drives the lesson UI, tutor context, evaluation, tests, and future admin persistence.

## Known limitations

- Only three Algebra Foundations lessons are deeply authored; other lesson titles and wider courses are structured roadmap content.
- Email/password, recovery email, OAuth, and destructive account deletion are demo interfaces. Hosted private identity is supplied by the platform.
- Soma uses the rule-based provider; the environment variables document the intended OpenAI-compatible integration but do not enable it by themselves.
- The admin editor saves draft rows only in its demo session. Production mutations still need role-protected API routes, content sanitization, review, and publishing workflow.
- The expression checker is appropriate for constrained school-algebra inputs, not symbolic proof or arbitrary advanced functions.
- The Playwright suite requires a one-time local browser installation.

## Roadmap

1. Add role-protected content mutation APIs and review/publish history.
2. Finish every Algebra Foundations lesson and unit quiz.
3. Add real public account authentication and verified mentor invitations.
4. Implement an OpenAI-compatible Soma provider with rate limits, observability, and evaluation.
5. Add durable practice-session and assessment-attempt writes.
6. Author Arithmetic Foundations, Geometry, and the University Mathematics pathway.
7. Add localization and curriculum-standard mappings.
8. Conduct formal WCAG audit and learner usability studies.

## Contributing

1. Open an issue describing the learning need or content correction.
2. Keep mathematical claims and worked steps verifiable.
3. Add or update tests for evaluation, mastery, and interaction changes.
4. Run `npm run verify`.
5. Do not add external resources without checking accuracy, licensing, stability, and duplication.

Content contributions should follow the typed structures in `lib/curriculum.ts`; major editor features should preserve the lesson-block contract in `db/schema.ts`.

## License

The original project used the GNU General Public License v3. This rebuild retains `LICENSE` and remains GPL-3.0. The generated social preview and new project code are distributed as part of this GPL-3.0 project. Third-party packages retain their respective licenses.


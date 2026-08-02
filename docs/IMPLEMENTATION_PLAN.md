# School of Math rebuild plan

## Repository audit

The original repository contained 48 Markdown course outlines and a five-year curriculum map for the Faculty of Mathematical Science and Informatics at the University of Khartoum. It had no web framework, package manifest, routes, components, application state, authentication, database, tests, or deployment setup. Most resource links were placeholders, and the curriculum table contained broken relative paths and incomplete Markdown rows.

The rebuild preserves:

- The **School of Math** name and open educational mission.
- The aim of unifying a broad, structured mathematics curriculum.
- The subject breadth of the original university course map, represented in the expanded catalog.
- The original GPL-3.0 license.

The rebuild replaces placeholder links and flat course files with structured TypeScript curriculum data, interactive learning flows, a persistent progress model, and a deployable application.

## Delivery plan

1. Establish an accessible light/dark design system and reusable application shell.
2. Build the public site, demo authentication, onboarding, catalog, dashboard, settings, mentor, and admin surfaces.
3. Seed Algebra Foundations with seven units and deeply implement three core lessons.
4. Add safe answer evaluation, progressive hints, mastery scoring, and the Soma tutor fallback.
5. Persist learner records in D1 where available and retain a complete seeded demo when it is not.
6. Add unit, component, integration, and learner-journey tests.
7. Verify type safety, linting, tests, production output, responsive behavior, and documentation.

## Architectural choices

- **Vinext + Next.js App Router:** preserves the familiar Next.js programming model while producing Cloudflare Worker-compatible output for Sites.
- **Strict TypeScript and structured curriculum modules:** lesson content is data, not hard-coded into route components.
- **D1 + Drizzle:** durable relational learner progress on the hosted product, with seeded in-memory demo data if the binding is unavailable.
- **Workspace identity + guest demo:** hosted private deployments use authenticated workspace headers; local development and public previews can enter a clearly labelled demo learner flow.
- **Rule-based Soma provider:** a pedagogically safe fallback works without paid AI. The provider contract can be replaced with an OpenAI-compatible service later.
- **Constrained expression evaluation:** math expressions are parsed as mathematics and sampled for equivalence; arbitrary JavaScript is never executed.


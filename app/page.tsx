import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Bot,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Lightbulb,
  LineChart,
  MessageCircleQuestion,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { courses } from "../lib/curriculum";
import { ActivityChart } from "../components/activity-chart";
import { HomePreview } from "../components/home-preview";
import { ProgressRing } from "../components/progress-ring";
import { PublicHeader, SiteFooter } from "../components/site-chrome";

const steps = [
  { icon: Compass, number: "01", title: "Follow a clear path", text: "Start at the right level and see how each idea connects to the next." },
  { icon: BookOpenCheck, number: "02", title: "Learn through examples", text: "Read concise explanations, inspect worked steps, and notice common mistakes." },
  { icon: Target, number: "03", title: "Practise with feedback", text: "Answer varied questions and reveal stronger hints only when you need them." },
  { icon: LineChart, number: "04", title: "Review what matters", text: "Mastery reflects evidence over time, so weak skills return at useful moments." },
];

export default function Home() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="home-hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="hero-kicker"><Sparkles size={15} /> Structured learning, guided by Soma</span>
              <h1>Learn mathematics with <em>structure, practice,</em> and a tutor that explains every step.</h1>
              <p>Build real understanding through organized courses, purposeful questions, progressive hints, and progress that shows what to learn next.</p>
              <div className="hero-actions">
                <Link className="button button-primary button-large" href="/onboarding">Start learning <ArrowRight size={18} /></Link>
                <Link className="button button-ghost button-large" href="/courses">Explore courses</Link>
              </div>
              <div className="hero-trust">
                <span><Check size={15} /> No card required</span>
                <span><Check size={15} /> Full demo access</span>
                <span><Check size={15} /> Built-in tutor fallback</span>
              </div>
            </div>
            <div className="hero-product" aria-label="Algebra lesson preview">
              <div className="hero-card-top">
                <span className="hero-breadcrumb">Algebra Foundations <ChevronRight size={13} /> One-Step Equations</span>
                <span className="hero-progress">3 of 8</span>
              </div>
              <div className="hero-equation">
                <span className="eyebrow">Your next check</span>
                <p>x + 8 = 15</p>
                <span>What operation would isolate x?</span>
              </div>
              <div className="hero-options">
                <span>+ 8</span>
                <span className="chosen">− 8 <Check size={15} /></span>
                <span>× 8</span>
              </div>
              <div className="hero-feedback">
                <Lightbulb size={18} />
                <p><strong>Good choice.</strong> Subtracting 8 undoes the addition. Apply it to both sides to keep the equation balanced.</p>
              </div>
              <div className="hero-card-footer">
                <span><Bot size={16} /> Ask Soma why</span>
                <button type="button" aria-label="Continue preview"><ArrowRight size={18} /></button>
              </div>
              <span className="geometry-note note-one">y</span>
              <span className="geometry-note note-two">x</span>
            </div>
          </div>
        </section>

        <section className="home-section value-strip">
          <div className="container value-grid">
            <div><span className="value-icon"><BookOpenCheck size={21} /></span><strong>Structured curriculum</strong><p>Lessons build deliberately from foundations to fluent reasoning.</p></div>
            <div><span className="value-icon"><MessageCircleQuestion size={21} /></span><strong>Help at the right moment</strong><p>Soma asks what you tried, then offers progressively stronger support.</p></div>
            <div><span className="value-icon"><BarChart3 size={21} /></span><strong>Mastery you can use</strong><p>See strengths, weak areas, recent evidence, and the next useful action.</p></div>
          </div>
        </section>

        <section className="home-section" id="how-it-works">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">A better learning loop</span>
              <h2>Every session has a clear purpose.</h2>
              <p>School of Math connects explanation, practice, feedback, tutoring, and review instead of leaving you with disconnected exercises.</p>
            </div>
            <div className="steps-grid">
              {steps.map(({ icon: Icon, number, title, text }) => (
                <article className="step-card" key={number}>
                  <div className="step-top"><span className="step-icon"><Icon size={21} /></span><span>{number}</span></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section demo-section">
          <div className="container demo-grid">
            <div className="demo-copy">
              <span className="eyebrow">Try a real interaction</span>
              <h2>Practise first. Reveal support gradually.</h2>
              <p>You stay in control of the learning. A gentle hint points you in the right direction; stronger hints expose one step at a time; the full explanation appears only when it is useful.</p>
              <ul className="check-list">
                <li><Check size={17} /> Immediate, specific feedback</li>
                <li><Check size={17} /> Multiple question formats</li>
                <li><Check size={17} /> Misconception-aware review</li>
              </ul>
            </div>
            <HomePreview />
          </div>
        </section>

        <section className="home-section soma-section" id="soma">
          <div className="container soma-home-grid">
            <div className="soma-visual">
              <div className="soma-visual-heading">
                <span className="soma-orb large"><Sparkles size={18} /></span>
                <div><span className="eyebrow">Your math-thinking partner</span><strong>Soma</strong></div>
                <span className="status-pill"><span /> Lesson aware</span>
              </div>
              <div className="soma-demo-chat">
                <div className="chat-message learner"><p>I know I should undo +8, but why subtract on both sides?</p></div>
                <div className="chat-message soma"><Bot size={16} /><p>Think of the equation as a balanced scale. If you remove 8 from only one side, are the two sides still equal?</p></div>
                <div className="chat-message learner"><p>No—the left side would change by itself.</p></div>
                <div className="chat-message soma"><Bot size={16} /><p>Exactly. Subtracting 8 from both sides changes each side equally, so the balance—and the solution—stays intact.</p></div>
              </div>
              <div className="mode-scroller">
                <span className="mode-chip active">Give me a hint</span>
                <span className="mode-chip">Check my reasoning</span>
                <span className="mode-chip">Another example</span>
              </div>
            </div>
            <div className="soma-copy">
              <span className="eyebrow">Meet Soma</span>
              <h2>A tutor designed to strengthen reasoning—not replace it.</h2>
              <p>Soma sees the current lesson, asks what you have tried, adapts the explanation, and encourages you to justify each step.</p>
              <div className="soma-feature-list">
                <div><span><Lightbulb size={18} /></span><div><strong>Hints before answers</strong><p>Support grows only when you ask.</p></div></div>
                <div><span><MessageCircleQuestion size={18} /></span><div><strong>Level-aware explanations</strong><p>Make it simpler, deeper, or more visual.</p></div></div>
                <div><span><ShieldCheck size={18} /></span><div><strong>Honest demo mode</strong><p>A scripted fallback works with no external AI key.</p></div></div>
              </div>
              <Link className="button button-primary" href="/tutor">Talk with Soma <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="container progress-preview-grid">
            <div>
              <span className="eyebrow">Progress with context</span>
              <h2>Know what you understand—and what to revisit.</h2>
              <p className="muted">Accuracy alone is not mastery. School of Math considers attempts, hints, assessment evidence, difficulty, and how recently you practised.</p>
              <div className="progress-callouts">
                <div><strong>7-day activity</strong><span>239 minutes</span></div>
                <div><strong>Strongest skill</strong><span>Evaluating expressions</span></div>
                <div><strong>Review next</strong><span>Distributive property</span></div>
              </div>
              <Link className="button button-ghost" href="/progress">Explore learner analytics <ArrowRight size={16} /></Link>
            </div>
            <div className="panel progress-demo-card">
              <div className="panel-heading"><div><span className="eyebrow">This week</span><h3>Learning activity</h3></div><ProgressRing value={68} size={76} /></div>
              <ActivityChart compact />
            </div>
          </div>
        </section>

        <section className="home-section course-home-section">
          <div className="container">
            <div className="section-heading split">
              <div><span className="eyebrow">Featured learning paths</span><h2>Start where you are. Build from there.</h2></div>
              <Link className="button button-ghost" href="/courses">View all courses <ArrowRight size={16} /></Link>
            </div>
            <div className="course-home-grid">
              {courses.filter((course) => course.featured).map((course, index) => (
                <Link className={`home-course-card tone-${index + 1}`} href={course.id === "algebra-foundations" ? "/courses/algebra-foundations" : "/courses"} key={course.id}>
                  <span className="eyebrow">{course.level}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div><span><Clock3 size={15} /> {course.duration}</span><span>{course.unitCount} units</span><ArrowRight size={18} /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section testimonial-section">
          <div className="container">
            <div className="section-heading centered"><span className="eyebrow">Demo learner stories</span><h2>Designed for the moments when maths feels stuck.</h2><p>These sample quotes illustrate the intended experience; they are not claims from real customers.</p></div>
            <div className="testimonial-grid">
              <blockquote><p>“The hints helped me see the first move without taking the problem away from me.”</p><footer><span className="avatar">LN</span><span><strong>Layla N.</strong><small>Demo learner · Algebra</small></span></footer></blockquote>
              <blockquote><p>“I like seeing one next action instead of a dashboard full of numbers I don’t understand.”</p><footer><span className="avatar">MK</span><span><strong>Musa K.</strong><small>Demo learner · Geometry</small></span></footer></blockquote>
              <blockquote><p>“The mentor view tells me where to offer support without exposing private tutor chats.”</p><footer><span className="avatar">SA</span><span><strong>Samira A.</strong><small>Demo mentor</small></span></footer></blockquote>
            </div>
          </div>
        </section>

        <section className="home-section faq-section">
          <div className="container faq-grid">
            <div><span className="eyebrow">Frequently asked</span><h2>Good questions deserve clear answers.</h2><p className="muted">Try the full learner journey in demo mode—no database or AI key is required locally.</p></div>
            <div className="faq-list">
              <details open><summary>Who is School of Math for?<ChevronRight size={17} /></summary><p>School students and independent learners who want a structured curriculum, careful explanations, guided practice, and useful progress feedback.</p></details>
              <details><summary>Does Soma give away graded answers?<ChevronRight size={17} /></summary><p>No. In guided mode, Soma asks what you tried and uses progressively stronger hints before a full explanation.</p></details>
              <details><summary>Can I use the platform without an AI key?<ChevronRight size={17} /></summary><p>Yes. The demo contains a rule-based Soma provider with lesson-aware responses for common learning interactions.</p></details>
              <details><summary>How is mastery calculated?<ChevronRight size={17} /></summary><p>It combines recent accuracy, assessment evidence, attempts, hint use, difficulty, and recency. Old evidence can move a skill to “Needs review.”</p></details>
              <details><summary>Is the whole curriculum complete?<ChevronRight size={17} /></summary><p>Algebra Foundations demonstrates the complete product model. Three lessons are deeply authored; later courses are roadmap content and clearly presented as such.</p></details>
            </div>
          </div>
        </section>

        <section className="home-cta">
          <div className="container cta-inner">
            <div><span className="eyebrow">Your next step is ready</span><h2>Make today’s maths session count.</h2><p>Begin with a short onboarding and a recommended path, or open Algebra Foundations directly.</p></div>
            <div><Link className="button button-primary button-large" href="/onboarding">Start learning <ArrowRight size={18} /></Link><Link className="button button-ghost button-large" href="/courses/algebra-foundations"><Play size={17} /> Preview Algebra</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}


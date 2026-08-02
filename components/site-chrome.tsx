import { ArrowRight, Github, Mail } from "lucide-react";
import Link from "next/link";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";

export function PublicHeader() {
  return (
    <header className="public-header">
      <div className="container header-inner">
        <Brand />
        <nav className="public-nav" aria-label="Main navigation">
          <Link href="/courses">Courses</Link>
          <Link href="/practice">Practice</Link>
          <Link href="/#how-it-works">How it works</Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="button button-ghost hide-mobile" href="/sign-in">Sign in</Link>
          <Link className="button button-primary" href="/onboarding">
            Start learning <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          <p className="muted footer-note">A structured mathematics academy built for careful thinking, useful practice, and steady progress.</p>
          <p className="eyebrow">GPL-3.0 · Open learning mission</p>
        </div>
        <div>
          <strong>Learn</strong>
          <Link href="/courses">Course catalog</Link>
          <Link href="/practice">Practice center</Link>
          <Link href="/assessments">Assessments</Link>
        </div>
        <div>
          <strong>Product</strong>
          <Link href="/#soma">Soma tutor</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/mentor">Mentor view</Link>
        </div>
        <div>
          <strong>Project</strong>
          <a href="https://github.com/abdalraheemmokhtar/SchoolOfMath"><Github size={15} /> Source</a>
          <a href="mailto:hello@schoolofmath.example"><Mail size={15} /> Contact</a>
          <Link href="/admin">Content admin</Link>
        </div>
      </div>
    </footer>
  );
}


"use client";

import {
  BarChart3,
  BookOpen,
  Bot,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";

const learnerNav = [
  { href: "/dashboard", label: "Today", icon: LayoutDashboard },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: Target },
  { href: "/assessments", label: "Assessments", icon: ClipboardCheck },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/tutor", label: "Ask Soma", icon: Bot },
];

const accountNav = [
  { href: "/mentor", label: "Mentor view", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (items: typeof learnerNav) =>
    items.map(({ href, label, icon: Icon }) => {
      const active = pathname === href || (href === "/courses" && pathname.startsWith("/courses"));
      return (
        <Link key={href} href={href} className={active ? "app-nav-link active" : "app-nav-link"} onClick={() => setMobileOpen(false)}>
          <Icon size={19} />
          <span>{label}</span>
          {active && <span className="nav-dot" aria-hidden="true" />}
        </Link>
      );
    });

  return (
    <div className="app-layout">
      <button className="mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation" type="button">
        <Menu size={22} />
      </button>
      {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <aside className={mobileOpen ? "app-sidebar open" : "app-sidebar"}>
        <div className="app-sidebar-top">
          <Brand />
          <button className="icon-button close-mobile" onClick={() => setMobileOpen(false)} aria-label="Close navigation" type="button"><X size={19} /></button>
        </div>
        <div className="sidebar-course">
          <span className="course-mini-icon"><GraduationCap size={19} /></span>
          <div>
            <span className="eyebrow">Current path</span>
            <strong>Algebra Foundations</strong>
            <span className="small muted">38% complete</span>
          </div>
          <ChevronRight size={17} />
        </div>
        <nav className="app-nav" aria-label="Learner navigation">
          <span className="nav-label">Learn</span>
          {nav(learnerNav)}
          <span className="nav-label nav-label-spaced">Account</span>
          {nav(accountNav)}
        </nav>
        <div className="sidebar-soma">
          <span className="soma-orb"><Sparkles size={17} /></span>
          <div>
            <strong>Soma is here</strong>
            <span>Ask for a hint, not just an answer.</span>
          </div>
          <Link href="/tutor" aria-label="Open Soma"><ChevronRight size={17} /></Link>
        </div>
        <div className="sidebar-profile">
          <span className="avatar">AM</span>
          <div>
            <strong>Amina</strong>
            <span>Demo learner</span>
          </div>
          <ThemeToggle />
        </div>
      </aside>
      <main className="app-main">{children}</main>
    </div>
  );
}


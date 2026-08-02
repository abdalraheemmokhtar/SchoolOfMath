"use client";

import { ArrowRight, Eye, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Brand } from "./brand";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" | "forgot" }) {
  const [sent, setSent] = useState(false);
  const title = mode === "sign-in" ? "Welcome back" : mode === "sign-up" ? "Create your learner account" : "Reset your password";
  const description = mode === "forgot" ? "Enter your email and we’ll show the recovery confirmation." : "Continue your learning path with focused practice and guided support.";

  if (sent && mode === "forgot") {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <Brand />
          <span className="soma-orb large"><ShieldCheck size={19} /></span>
          <h1>Check your inbox</h1>
          <p>For privacy, we show this confirmation whether or not the demo address exists. In production, your email provider would send the recovery link.</p>
          <Link className="button button-primary" href="/sign-in">Return to sign in</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Brand />
        <span className="eyebrow">{mode === "sign-up" ? "Begin your path" : "Learner access"}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <form
          className="field-grid"
          action={mode === "sign-up" ? "/onboarding" : mode === "sign-in" ? "/dashboard" : undefined}
          method={mode === "forgot" ? undefined : "get"}
          onSubmit={(event) => {
            event.preventDefault();
            if (mode === "forgot") setSent(true);
            else window.location.href = mode === "sign-up" ? "/onboarding" : "/dashboard";
          }}
        >
          {mode === "sign-up" && <label className="field"><span>Display name</span><input required autoComplete="name" placeholder="How should we greet you?" /></label>}
          <label className="field"><span>Email address</span><input required type="email" autoComplete="email" placeholder="you@example.com" defaultValue={mode === "sign-in" ? "learner@schoolofmath.demo" : ""} /></label>
          {mode !== "forgot" && (
            <label className="field">
              <span>Password</span>
              <div className="password-field"><input required type="password" autoComplete={mode === "sign-in" ? "current-password" : "new-password"} defaultValue={mode === "sign-in" ? "demo1234" : ""} minLength={8} /><Eye size={17} /></div>
            </label>
          )}
          {mode === "sign-in" && <Link className="auth-link" href="/forgot-password">Forgot your password?</Link>}
          <button className="button button-primary" type="submit">{mode === "forgot" ? "Send recovery link" : mode === "sign-up" ? "Create account" : "Sign in"} <ArrowRight size={16} /></button>
        </form>
        {mode !== "forgot" && (
          <div className="demo-banner"><ShieldCheck size={17} /><p><strong>Demo access:</strong> use learner@schoolofmath.demo and demo1234, or open the demo directly.</p></div>
        )}
        {mode === "sign-in" && <Link className="button button-ghost" href="/dashboard" style={{ width: "100%" }}>Enter as demo learner</Link>}
        <div className="form-footer">
          <span className="muted small">{mode === "sign-up" ? "Already learning with us?" : "New to School of Math?"}</span>
          <Link className="auth-link" href={mode === "sign-up" ? "/sign-in" : "/sign-up"}>{mode === "sign-up" ? "Sign in" : "Create an account"}</Link>
        </div>
      </section>
    </main>
  );
}

import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";
import { Brand } from "../components/brand";

export default function NotFound() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Brand />
        <span className="soma-orb large"><Compass size={19} /></span>
        <span className="eyebrow" style={{ display: "block", marginTop: 20 }}>404 · Path not found</span>
        <h1>This lesson path doesn’t exist.</h1>
        <p>The course map may have changed, or the link may be incomplete. Your saved progress is unaffected.</p>
        <Link className="button button-primary" href="/dashboard"><ArrowLeft size={16} /> Return to today</Link>
      </section>
    </main>
  );
}


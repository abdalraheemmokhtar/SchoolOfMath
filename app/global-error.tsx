"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="auth-page">
          <section className="auth-card">
            <span className="soma-orb large"><TriangleAlert size={19} /></span>
            <span className="eyebrow" style={{ display: "block", marginTop: 20 }}>A temporary problem</span>
            <h1>This page needs another try.</h1>
            <p>Your learning records were not changed. Retry the page, or return later if the connection is unavailable.</p>
            <button className="button button-primary" type="button" onClick={reset}><RefreshCw size={16} /> Try again</button>
          </section>
        </main>
      </body>
    </html>
  );
}

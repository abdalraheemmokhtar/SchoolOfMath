import { Brand } from "../components/brand";

export default function Loading() {
  return (
    <main className="auth-page" aria-busy="true" aria-live="polite">
      <section className="auth-card">
        <Brand />
        <span className="eyebrow">Preparing your next step</span>
        <h1>Loading School of Math…</h1>
        <div className="progress-bar"><span style={{ width: "62%" }} /></div>
      </section>
    </main>
  );
}


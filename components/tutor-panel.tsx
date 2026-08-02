"use client";

import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import type { TutorMode } from "../lib/tutor";

const modes: TutorMode[] = [
  "Give me a hint",
  "Explain this concept",
  "Check my reasoning",
  "Show another example",
  "Create a similar problem",
  "Make it easier",
  "Make it harder",
  "Summarize this lesson",
];

type ChatMessage = { role: "soma" | "learner"; content: string };

export function TutorPanel({
  lessonTitle,
  lessonContext,
  compact = false,
}: {
  lessonTitle: string;
  lessonContext: string;
  compact?: boolean;
}) {
  const [mode, setMode] = useState<TutorMode>("Give me a hint");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([
    { role: "soma", content: `I’m with you for ${lessonTitle}. I’ll help you reason through it without rushing to the answer.` },
  ]);
  const [loading, setLoading] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  async function send() {
    if (loading) return;
    const learnerMessage = message.trim();
    if (learnerMessage) setChat((current) => [...current, { role: "learner", content: learnerMessage }]);
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode, lessonTitle, lessonContext, learnerMessage, hintLevel }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      setChat((current) => [...current, { role: "soma", content: data.reply ?? data.error ?? "Let’s try a different question." }]);
      if (mode === "Give me a hint") setHintLevel((level) => Math.min(3, level + 1));
    } catch {
      setChat((current) => [...current, { role: "soma", content: "I’m having trouble connecting. Start by naming the operation you need to undo." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className={compact ? "tutor-panel compact" : "tutor-panel"} aria-label="Soma math tutor">
      <div className="tutor-heading">
        <span className="soma-orb large"><Sparkles size={18} /></span>
        <div>
          <span className="eyebrow">School of Math Assistant</span>
          <h2>Soma</h2>
        </div>
        <span className="status-pill"><span /> Guided mode</span>
      </div>
      <div className="mode-scroller" aria-label="Tutor mode">
        {modes.slice(0, compact ? 4 : modes.length).map((item) => (
          <button type="button" key={item} className={mode === item ? "mode-chip active" : "mode-chip"} onClick={() => setMode(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="chat-log" aria-live="polite">
        {chat.map((item, index) => (
          <div className={`chat-message ${item.role}`} key={`${item.role}-${index}`}>
            {item.role === "soma" && <Bot size={16} />}
            <p>{item.content}</p>
          </div>
        ))}
        {loading && <div className="chat-message soma"><Bot size={16} /><p>Soma is thinking about the next useful step…</p></div>}
      </div>
      <div className="tutor-input">
        <label className="sr-only" htmlFor="soma-message">Message Soma</label>
        <textarea
          id="soma-message"
          rows={2}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={mode === "Check my reasoning" ? "Show me what you tried…" : "Ask about this lesson…"}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void send();
            }
          }}
        />
        <button className="icon-button icon-button-solid" type="button" onClick={() => void send()} aria-label="Send to Soma" disabled={loading}>
          <Send size={18} />
        </button>
      </div>
      <p className="tutor-note">Soma’s demo guidance is scripted and may need checking. It gives hints before solutions.</p>
    </aside>
  );
}


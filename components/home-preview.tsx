"use client";

import { useState } from "react";
import { getQuestion } from "../lib/curriculum";
import { QuestionCard } from "./question-card";

export function HomePreview() {
  const [complete, setComplete] = useState(false);
  return (
    <div>
      <QuestionCard
        compact
        question={getQuestion("eq-check-1")}
        onComplete={(correct) => {
          if (correct) setComplete(true);
        }}
      />
      {complete && <p className="preview-success">Nice work. A real lesson would now update your equation mastery and recommend the next check.</p>}
    </div>
  );
}


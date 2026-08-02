"use client";

import katex from "katex";

export function Math({ value, block = false, label }: { value: string; block?: boolean; label?: string }) {
  const html = katex.renderToString(value, {
    displayMode: block,
    throwOnError: false,
    output: "htmlAndMathml",
  });
  const Element = block ? "div" : "span";
  return (
    <Element
      className={block ? "math-display" : "math-inline"}
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}


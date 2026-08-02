"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", minutes: 18 },
  { day: "Tue", minutes: 32 },
  { day: "Wed", minutes: 24 },
  { day: "Thu", minutes: 46 },
  { day: "Fri", minutes: 29 },
  { day: "Sat", minutes: 52 },
  { day: "Sun", minutes: 38 },
];

export function ActivityChart({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "chart-wrap compact" : "chart-wrap"} role="img" aria-label="Weekly learning minutes: Monday 18, Tuesday 32, Wednesday 24, Thursday 46, Friday 29, Saturday 52, Sunday 38">
      <ResponsiveContainer width="100%" height={compact ? 190 : 260}>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: compact ? -28 : -16 }}>
          <defs>
            <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.24} />
              <stop offset="100%" stopColor="var(--teal)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--line)" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} />
          <Tooltip contentStyle={{ borderRadius: 12, borderColor: "var(--line)", background: "var(--surface)", color: "var(--ink)" }} />
          <Area type="monotone" dataKey="minutes" stroke="var(--teal)" strokeWidth={2.5} fill="url(#activityFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}


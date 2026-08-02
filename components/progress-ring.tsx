export function ProgressRing({ value, label, size = 92 }: { value: number; label?: string; size?: number }) {
  return (
    <div
      className="progress-ring"
      style={{ "--progress": `${value * 3.6}deg`, width: size, height: size } as React.CSSProperties}
      role="img"
      aria-label={`${label ?? "Progress"}: ${value}%`}
    >
      <span>{value}%</span>
    </div>
  );
}


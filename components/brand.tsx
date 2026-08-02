import Link from "next/link";

export function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "logo-mark logo-mark-small" : "logo-mark"} aria-hidden="true">
      <span className="logo-axis logo-axis-x" />
      <span className="logo-axis logo-axis-y" />
      <span className="logo-curve">S</span>
    </span>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="School of Math home">
      <LogoMark small={compact} />
      <span>
        <strong>School of Math</strong>
        {!compact && <small>Learn with purpose</small>}
      </span>
    </Link>
  );
}


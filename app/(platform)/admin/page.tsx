import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { AdminDashboard } from "../../../components/admin-dashboard";

export const metadata: Metadata = { title: "Content admin" };
export default function AdminPage() {
  return <div className="app-page"><header className="page-heading"><div><span className="eyebrow">Protected internal interface · Demo</span><h1>Content administration</h1><p>Manage structured courses, lessons, question support, and featured content. Production writes require an administrator role.</p></div><span className="status-pill"><ShieldCheck size={14} /> Admin demo</span></header><AdminDashboard /></div>;
}


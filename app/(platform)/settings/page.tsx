import type { Metadata } from "next";
import { SettingsPanel } from "../../../components/settings-panel";

export const metadata: Metadata = { title: "Settings" };
export default function SettingsPage() {
  return <div className="app-page"><header className="page-heading"><div><span className="eyebrow">Profile and settings</span><h1>Make the learning space work for you.</h1><p>Manage personal details, study preferences, accessibility, notifications, and account data.</p></div></header><SettingsPanel /></div>;
}


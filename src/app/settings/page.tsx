import AppShell from "@/components/app/AppShell";
import SettingsClient from "./SettingsClient";

export const metadata = { title: "Settings — Scrubbed In" };

export default function SettingsPage() {
  return (
    <AppShell sidebar={false}>
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-extrabold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your account, privacy and safety preferences.</p>
        </div>
        <SettingsClient />
      </div>
    </AppShell>
  );
}

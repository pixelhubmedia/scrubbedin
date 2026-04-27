import AppShell from "@/components/app/AppShell";
import Badge from "@/components/ui/Badge";

export const metadata = { title: "Hospitals — Scrubbed In" };

export default function HospitalsPage() {
  return (
    <AppShell>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 text-center">
        <span className="text-4xl block mb-3">🏥</span>
        <Badge variant="slate" className="mb-3">Milestone 6</Badge>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Hospital Directory</h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Browse UK hospitals and their departments. View staff networks, submit your hospital for admin approval, and track current and previous rotations.
        </p>
        <p className="text-xs text-slate-400 mt-4">Coming in Milestone 6.</p>
      </div>
    </AppShell>
  );
}

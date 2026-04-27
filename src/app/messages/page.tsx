import AppShell from "@/components/app/AppShell";
import Badge from "@/components/ui/Badge";

export const metadata = { title: "Messages — Scrubbed In" };

export default function MessagesPage() {
  return (
    <AppShell>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 text-center">
        <span className="text-4xl block mb-3">💬</span>
        <Badge variant="slate" className="mb-3">Milestone 5</Badge>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Messages</h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Private messaging with your connections. Send a message with your connection request, and keep conversations professional. No file attachments for safety.
        </p>
        <p className="text-xs text-slate-400 mt-4">Coming in Milestone 5.</p>
      </div>
    </AppShell>
  );
}

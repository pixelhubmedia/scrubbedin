import AppShell from "@/components/app/AppShell";
import ProfileEditForm from "./ProfileEditForm";

export const metadata = { title: "Edit Profile — Scrubbed In" };

export default function ProfileEditPage() {
  return (
    <AppShell sidebar={false}>
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-extrabold text-slate-900">Edit profile</h1>
          <p className="text-sm text-slate-500 mt-1">
            Your profile is how colleagues find and connect with you on Scrubbed In.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7">
          <ProfileEditForm />
        </div>
      </div>
    </AppShell>
  );
}

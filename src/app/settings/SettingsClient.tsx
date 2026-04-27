"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/authContext";
import { profileService } from "@/lib/services/profileService";
import Toggle from "@/components/ui/Toggle";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { ProfileVisibility } from "@/types";

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public — visible to everyone" },
  { value: "connections_only", label: "Connections only" },
  { value: "hidden", label: "Hidden — only you can see your profile" },
];

interface PrivacyState {
  profileVisibility: ProfileVisibility;
  showCurrentHospital: boolean;
  showFutureRotations: boolean;
  searchEngineIndexing: boolean;
}

export default function SettingsClient() {
  const { profile, refreshProfile, logout } = useAuth();
  const [privacy, setPrivacy] = useState<PrivacyState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setPrivacy({ ...profile.privacy });
  }, [profile]);

  if (!profile || !privacy) {
    return <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  function setP<K extends keyof PrivacyState>(k: K, v: PrivacyState[K]) {
    setPrivacy((p) => p ? { ...p, [k]: v } : p);
    setSaved(false);
  }

  async function savePrivacy() {
    if (!privacy) return;
    setSaving(true);
    // TODO (Supabase): supabase.from('profiles').update({ privacy }).eq('id', profile.id)
    profileService.updateProfile(profile!.id, {
      privacy: {
        ...privacy,
        searchEngineIndexing: privacy.profileVisibility === "public" ? privacy.searchEngineIndexing : false,
      },
    });
    refreshProfile();
    setSaving(false);
    setSaved(true);
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">

      {/* Privacy section */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <h2 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
          <span>🔒</span> Privacy Settings
        </h2>
        <p className="text-xs text-slate-500 mb-5">Control who can see your profile and information.</p>

        <div className="flex flex-col gap-5">
          <Select
            label="Profile visibility"
            options={VISIBILITY_OPTIONS}
            value={privacy.profileVisibility}
            onChange={(e) => setP("profileVisibility", e.target.value as ProfileVisibility)}
            hint={
              privacy.profileVisibility === "hidden"
                ? "Your profile will not appear in any search results."
                : privacy.profileVisibility === "connections_only"
                ? "Only your connections can view your full profile."
                : "Your profile is visible to all Scrubbed In users."
            }
          />

          {privacy.profileVisibility === "hidden" && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex gap-2 items-start">
              <span className="text-amber-600 text-base flex-shrink-0">⚠</span>
              <p className="text-xs text-amber-700">
                <strong>Hidden profile:</strong> You will not appear in any search results. Other users cannot find or connect with you while this setting is active.
              </p>
            </div>
          )}

          <div className="space-y-4 pt-1">
            <Toggle
              label="Show current hospital on profile"
              description="When disabled, your hospital is hidden even if it's set on your profile."
              checked={privacy.showCurrentHospital}
              onChange={(v) => setP("showCurrentHospital", v)}
            />
            <Toggle
              label="Show future rotations"
              description="Allow your connections to see upcoming placements on your profile."
              checked={privacy.showFutureRotations}
              onChange={(v) => setP("showFutureRotations", v)}
            />
            <Toggle
              label="Allow search engine indexing"
              description="Permit Google and other search engines to index your public profile. Only applies to public profiles."
              checked={privacy.profileVisibility === "public" ? privacy.searchEngineIndexing : false}
              onChange={(v) => setP("searchEngineIndexing", v)}
              disabled={privacy.profileVisibility !== "public"}
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Button onClick={savePrivacy} disabled={saving} size="md">
              {saving ? "Saving…" : "Save privacy settings"}
            </Button>
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Saved
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Account section */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <h2 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
          <span>👤</span> Account
        </h2>
        <p className="text-xs text-slate-500 mb-4">Manage your account details.</p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="text-sm font-medium text-slate-700">Email address</p>
              <p className="text-xs text-slate-400 mt-0.5">{profile.privacy.profileVisibility}</p>
            </div>
            <Badge variant="slate">Coming soon</Badge>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <p className="text-sm font-medium text-slate-700">Change password</p>
            <Badge variant="slate">Coming soon</Badge>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <p className="text-sm font-medium text-slate-700">Notifications</p>
            <Badge variant="slate">Coming soon</Badge>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <p className="text-sm font-medium text-slate-700">Delete account</p>
            <Badge variant="slate">Coming soon</Badge>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <h2 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
          <span>🛡</span> Safety &amp; Moderation
        </h2>
        <p className="text-xs text-slate-500 mb-4">Report issues and manage blocked users.</p>

        <div className="flex flex-col gap-3">
          {["Blocked users", "Report a profile", "Moderation appeals"].map((item) => (
            <div key={item} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <p className="text-sm font-medium text-slate-700">{item}</p>
              <Badge variant="slate">Coming soon</Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Sign out */}
      <div>
        <button
          onClick={logout}
          className="text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors border border-red-200"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

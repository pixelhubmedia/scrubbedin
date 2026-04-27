"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Toggle from "@/components/ui/Toggle";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { profileService, isUsernameAvailable } from "@/lib/services/profileService";
import type { ProfileEditFormData, ProfileVisibility } from "@/types";

const PROFESSIONS = [
  { value: "doctor", label: "Doctor" }, { value: "nurse", label: "Nurse" },
  { value: "pharmacist", label: "Pharmacist" }, { value: "physiotherapist", label: "Physiotherapist" },
  { value: "occupational-therapist", label: "Occupational Therapist" },
  { value: "radiographer", label: "Radiographer" }, { value: "paramedic", label: "Paramedic" },
  { value: "midwife", label: "Midwife" }, { value: "healthcare-assistant", label: "Healthcare Assistant" },
  { value: "admin", label: "Administrative / Managerial" }, { value: "other", label: "Other healthcare professional" },
];

const POSITIONS = [
  { value: "student", label: "Student" }, { value: "fy1", label: "FY1" }, { value: "fy2", label: "FY2" },
  { value: "ct1", label: "CT1 / ST1" }, { value: "ct2", label: "CT2 / ST2" }, { value: "st3", label: "ST3" },
  { value: "st4", label: "ST4" }, { value: "st5", label: "ST5" }, { value: "st6", label: "ST6" },
  { value: "st7", label: "ST7" }, { value: "registrar", label: "Registrar" }, { value: "fellow", label: "Fellow" },
  { value: "consultant", label: "Consultant" }, { value: "band-5", label: "Band 5" },
  { value: "band-6", label: "Band 6" }, { value: "band-7", label: "Band 7" },
  { value: "band-8", label: "Band 8" }, { value: "other", label: "Other" },
];

const REGIONS = [
  { value: "london", label: "London" }, { value: "south-east", label: "South East" },
  { value: "south-west", label: "South West" }, { value: "east-of-england", label: "East of England" },
  { value: "east-midlands", label: "East Midlands" }, { value: "west-midlands", label: "West Midlands" },
  { value: "north-west", label: "North West" }, { value: "north-east", label: "North East" },
  { value: "yorkshire", label: "Yorkshire & the Humber" }, { value: "wales", label: "Wales" },
  { value: "scotland", label: "Scotland" }, { value: "northern-ireland", label: "Northern Ireland" },
];

const SECTORS = [
  { value: "nhs", label: "NHS" }, { value: "private", label: "Private" }, { value: "both", label: "Both" },
];

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public — visible to everyone" },
  { value: "connections_only", label: "Connections only — visible to your connections" },
  { value: "hidden", label: "Hidden — only you can see your profile" },
];

type Errors = Partial<Record<keyof ProfileEditFormData, string>>;

export default function ProfileEditForm() {
  const { profile, session, refreshProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isWelcome = searchParams.get("welcome") === "1";

  const [form, setForm] = useState<ProfileEditFormData | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [usernameChecking, setUsernameChecking] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setForm({
      fullName: profile.fullName,
      username: profile.username,
      currentPosition: profile.currentPosition,
      roleProfession: profile.roleProfession,
      bio: profile.bio ?? "",
      currentHospital: profile.currentHospital ?? "",
      currentDepartment: profile.currentDepartment ?? "",
      region: profile.region ?? "",
      sector: profile.sector ?? "",
      profileVisibility: profile.privacy.profileVisibility,
      showCurrentHospital: profile.privacy.showCurrentHospital,
      showFutureRotations: profile.privacy.showFutureRotations,
      searchEngineIndexing: profile.privacy.searchEngineIndexing,
    });
  }, [profile]);

  if (!form || !profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  function set<K extends keyof ProfileEditFormData>(field: K, value: ProfileEditFormData[K]) {
    setForm((prev) => prev ? { ...prev, [field]: value } : prev);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSaved(false);
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form!.fullName.trim()) e.fullName = "Full name is required.";
    if (!form!.username.trim()) e.username = "Username is required.";
    else if (!/^[a-z0-9-]{3,40}$/.test(form!.username))
      e.username = "Username must be 3–40 characters: lowercase letters, numbers and hyphens only.";
    else if (profile && !isUsernameAvailable(form!.username, profile.id))
      e.username = "This username is already taken.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !form) return;
    setSaving(true);
    if (!profile) { setSaving(false); return; }

    // TODO (Supabase): replace with supabase.from('profiles').update(data).eq('id', profile.id)
    profileService.updateProfile(profile.id, {
      fullName: form.fullName,
      username: form.username.toLowerCase().trim(),
      currentPosition: form.currentPosition,
      roleProfession: form.roleProfession,
      bio: form.bio,
      currentHospital: form.currentHospital || undefined,
      currentDepartment: form.currentDepartment || undefined,
      region: form.region || undefined,
      sector: (form.sector as import("@/types").HealthcareSector) || undefined,
      privacy: {
        profileVisibility: form.profileVisibility as ProfileVisibility,
        showCurrentHospital: form.showCurrentHospital,
        showFutureRotations: form.showFutureRotations,
        searchEngineIndexing: form.profileVisibility === "public" ? form.searchEngineIndexing : false,
      },
    });

    refreshProfile();
    setSaving(false);
    setSaved(true);

    if (isWelcome) {
      setTimeout(() => router.push("/feed"), 1200);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {isWelcome && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 flex gap-3 items-start">
          <span className="text-xl">👋</span>
          <div>
            <p className="font-semibold text-blue-800 text-sm">Welcome to Scrubbed In!</p>
            <p className="text-xs text-blue-600 mt-0.5">Complete your profile so colleagues can find and connect with you.</p>
          </div>
        </div>
      )}

      {/* Avatar preview */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <Avatar name={form.fullName || "?"} size="xl" />
        <div>
          <p className="font-semibold text-slate-800 text-sm">{form.fullName || "Your name"}</p>
          <p className="text-xs text-slate-500">@{form.username || "username"}</p>
          <button
            type="button"
            disabled
            className="mt-2 text-xs font-medium text-slate-400 cursor-not-allowed"
            title="Photo upload coming in a later milestone"
          >
            Upload photo (coming soon)
          </button>
        </div>
      </div>

      {/* Basic info */}
      <section className="space-y-4 mb-6">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Basic Information</h2>

        <Input label="Full name" value={form.fullName}
          onChange={(e) => set("fullName", e.target.value)} error={errors.fullName}
          placeholder="Dr Sarah Chen" />

        <div>
          <Input
            label="Username"
            value={form.username}
            onChange={(e) => set("username", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            error={errors.username}
            placeholder="sarah-chen"
            hint="Your profile URL: scrubbedin.co.uk/profile/username"
          />
        </div>

        <Textarea label="Bio" optional value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          placeholder="Tell colleagues about your specialty, interests and experience…"
          rows={4} maxLength={500} currentLength={form.bio.length} />

        <div className="grid grid-cols-2 gap-3">
          <Select label="Current position" options={POSITIONS} value={form.currentPosition}
            onChange={(e) => set("currentPosition", e.target.value)} placeholder="Select…" />
          <Select label="Profession" options={PROFESSIONS} value={form.roleProfession}
            onChange={(e) => set("roleProfession", e.target.value)} placeholder="Select…" />
        </div>
      </section>

      {/* Workplace */}
      <section className="space-y-4 mb-6">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Workplace</h2>
        <Input label="Current hospital" optional value={form.currentHospital}
          onChange={(e) => set("currentHospital", e.target.value)} placeholder="Royal Free Hospital" />
        <Input label="Current department" optional value={form.currentDepartment}
          onChange={(e) => set("currentDepartment", e.target.value)} placeholder="Cardiology" />
        <div className="grid grid-cols-2 gap-3">
          <Select label="Region" optional options={REGIONS} value={form.region}
            onChange={(e) => set("region", e.target.value)} placeholder="Select…" />
          <Select label="Sector" optional options={SECTORS} value={form.sector}
            onChange={(e) => set("sector", e.target.value)} placeholder="Select…" />
        </div>
      </section>

      {/* Privacy */}
      <section className="space-y-4 mb-8">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Privacy</h2>

        <Select
          label="Profile visibility"
          options={VISIBILITY_OPTIONS}
          value={form.profileVisibility}
          onChange={(e) => set("profileVisibility", e.target.value as ProfileVisibility)}
        />

        {form.profileVisibility === "hidden" && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-700 flex gap-2">
            <span>⚠</span>
            <span>Hidden profiles do not appear in search results and cannot be found by other users.</span>
          </div>
        )}

        <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <Toggle
            label="Show current hospital on profile"
            description="When off, your hospital is hidden from your profile even if it's set."
            checked={form.showCurrentHospital}
            onChange={(v) => set("showCurrentHospital", v)}
          />
          <Toggle
            label="Show future rotations"
            description="Allow connections to see upcoming placements on your profile."
            checked={form.showFutureRotations}
            onChange={(v) => set("showFutureRotations", v)}
          />
          <Toggle
            label="Allow search engine indexing"
            description="Only applies to public profiles. Allow Google to index your profile page."
            checked={form.searchEngineIndexing}
            onChange={(v) => set("searchEngineIndexing", v)}
            disabled={form.profileVisibility !== "public"}
          />
        </div>
      </section>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" disabled={saving} className="flex-1 sm:flex-none sm:min-w-[140px]">
          {saving ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving…
            </span>
          ) : "Save profile"}
        </Button>

        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Saved
            {isWelcome && " — taking you to the feed…"}
          </span>
        )}
      </div>
    </form>
  );
}

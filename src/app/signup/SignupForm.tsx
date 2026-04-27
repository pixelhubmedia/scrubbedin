"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { authService } from "@/lib/services/authService";
import { profileService } from "@/lib/services/profileService";

const PROFESSIONS = [
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "pharmacist", label: "Pharmacist" },
  { value: "physiotherapist", label: "Physiotherapist" },
  { value: "occupational-therapist", label: "Occupational Therapist" },
  { value: "radiographer", label: "Radiographer" },
  { value: "paramedic", label: "Paramedic" },
  { value: "midwife", label: "Midwife" },
  { value: "healthcare-assistant", label: "Healthcare Assistant" },
  { value: "admin", label: "Administrative / Managerial" },
  { value: "other", label: "Other healthcare professional" },
];

const POSITIONS = [
  { value: "student", label: "Student" },
  { value: "fy1", label: "FY1" }, { value: "fy2", label: "FY2" },
  { value: "ct1", label: "CT1 / ST1" }, { value: "ct2", label: "CT2 / ST2" },
  { value: "st3", label: "ST3" }, { value: "st4", label: "ST4" },
  { value: "st5", label: "ST5" }, { value: "st6", label: "ST6" },
  { value: "st7", label: "ST7" }, { value: "registrar", label: "Registrar" },
  { value: "fellow", label: "Fellow" }, { value: "consultant", label: "Consultant" },
  { value: "band-2", label: "Band 2" }, { value: "band-3", label: "Band 3" },
  { value: "band-4", label: "Band 4" }, { value: "band-5", label: "Band 5" },
  { value: "band-6", label: "Band 6" }, { value: "band-7", label: "Band 7" },
  { value: "band-8", label: "Band 8" }, { value: "other", label: "Other" },
];

interface FormData {
  fullName: string; email: string; password: string; confirmPassword: string;
  currentPosition: string; roleProfession: string; phone: string;
}

type Errors = Partial<Record<keyof FormData | "submit", string>>;

const EMPTY: FormData = {
  fullName: "", email: "", password: "", confirmPassword: "",
  currentPosition: "", roleProfession: "", phone: "",
};

export default function SignupForm() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function set(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!data.fullName.trim()) e.fullName = "Full name is required.";
    if (!data.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid email address.";
    if (!data.password) e.password = "Password is required.";
    else if (data.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (!data.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (data.password !== data.confirmPassword) e.confirmPassword = "Passwords do not match.";
    if (!data.currentPosition) e.currentPosition = "Please select your current position.";
    if (!data.roleProfession) e.roleProfession = "Please select your profession.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // TODO (Supabase): replace with supabase.auth.signUp() then supabase.from('profiles').insert()
    const result = await authService.signup(data.email, data.password, { fullName: data.fullName });

    if (result.error) {
      setErrors({ submit: result.error.message });
      setLoading(false);
      return;
    }

    profileService.createProfile(result.data.user.id, {
      fullName: data.fullName,
      currentPosition: data.currentPosition,
      roleProfession: data.roleProfession,
    });

    router.push("/profile/edit?welcome=1");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {errors.submit}
        </div>
      )}

      <Input label="Full name" placeholder="Dr Sarah Chen" value={data.fullName}
        onChange={(e) => set("fullName", e.target.value)} error={errors.fullName} autoComplete="name" />

      <Input label="Email address" type="email" placeholder="sarah@example.com" value={data.email}
        onChange={(e) => set("email", e.target.value)} error={errors.email} autoComplete="email"
        hint="Use any personal or work email. NHS email not required." />

      <Input label="Password" type="password" placeholder="At least 8 characters" value={data.password}
        onChange={(e) => set("password", e.target.value)} error={errors.password} autoComplete="new-password" />

      <Input label="Confirm password" type="password" placeholder="Repeat your password" value={data.confirmPassword}
        onChange={(e) => set("confirmPassword", e.target.value)} error={errors.confirmPassword} autoComplete="new-password" />

      <Select label="Current position" placeholder="Select your position…" options={POSITIONS}
        value={data.currentPosition} onChange={(e) => set("currentPosition", e.target.value)} error={errors.currentPosition} />

      <Select label="Role / profession" placeholder="Select your profession…" options={PROFESSIONS}
        value={data.roleProfession} onChange={(e) => set("roleProfession", e.target.value)} error={errors.roleProfession} />

      <Input label="Phone number" type="tel" optional placeholder="+44 7700 900000" value={data.phone}
        onChange={(e) => set("phone", e.target.value)}
        hint="Optional. May be used for account verification and launch updates." autoComplete="tel" />

      <div className="pt-1">
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating account…
            </span>
          ) : "Create account →"}
        </Button>
        <p className="text-center text-xs text-slate-400 mt-3">
          By signing up you agree to our{" "}
          <span className="text-slate-500 underline cursor-not-allowed">Terms of Use</span> and{" "}
          <span className="text-slate-500 underline cursor-not-allowed">Community Guidelines</span>.
        </p>
      </div>

      <div className="text-center text-sm text-slate-500 border-t border-slate-100 pt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
      </div>
    </form>
  );
}

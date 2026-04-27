"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

interface FormData {
  fullName: string;
  email: string;
  currentPosition: string;
  profession: string;
  phone: string;
  hospital: string;
  department: string;
  region: string;
  sector: string;
  wantsModerator: string;
}

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
  { value: "porter", label: "Porter / Support Staff" },
  { value: "admin", label: "Administrative / Managerial" },
  { value: "other", label: "Other healthcare professional" },
];

const POSITIONS = [
  { value: "student", label: "Student" },
  { value: "fy1", label: "FY1" },
  { value: "fy2", label: "FY2" },
  { value: "ct1", label: "CT1 / ST1" },
  { value: "ct2", label: "CT2 / ST2" },
  { value: "st3", label: "ST3" },
  { value: "st4", label: "ST4" },
  { value: "st5", label: "ST5" },
  { value: "st6", label: "ST6" },
  { value: "st7", label: "ST7" },
  { value: "registrar", label: "Registrar" },
  { value: "fellow", label: "Fellow" },
  { value: "consultant", label: "Consultant" },
  { value: "band-2", label: "Band 2" },
  { value: "band-3", label: "Band 3" },
  { value: "band-4", label: "Band 4" },
  { value: "band-5", label: "Band 5" },
  { value: "band-6", label: "Band 6" },
  { value: "band-7", label: "Band 7" },
  { value: "band-8", label: "Band 8" },
  { value: "band-8a", label: "Band 8a" },
  { value: "band-9", label: "Band 9" },
  { value: "other", label: "Other" },
];

const REGIONS = [
  { value: "london", label: "London" },
  { value: "south-east", label: "South East" },
  { value: "south-west", label: "South West" },
  { value: "east-of-england", label: "East of England" },
  { value: "east-midlands", label: "East Midlands" },
  { value: "west-midlands", label: "West Midlands" },
  { value: "north-west", label: "North West" },
  { value: "north-east", label: "North East" },
  { value: "yorkshire", label: "Yorkshire & the Humber" },
  { value: "wales", label: "Wales" },
  { value: "scotland", label: "Scotland" },
  { value: "northern-ireland", label: "Northern Ireland" },
];

const SECTORS = [
  { value: "nhs", label: "NHS" },
  { value: "private", label: "Private" },
  { value: "both", label: "Both NHS and private" },
];

function generateReferralCode(name: string, email: string): string {
  const base = name.split(" ")[0].toLowerCase().replace(/[^a-z]/g, "");
  const suffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${base}-${suffix}`;
}

interface ConfirmationProps {
  name: string;
  referralCode: string;
}

function Confirmation({ name, referralCode }: ConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const firstName = name.split(" ")[0];
  const referralUrl = `${typeof window !== "undefined" ? window.location.origin : "https://scrubbedin.co.uk"}/waitlist?ref=${referralCode}`;

  function copyLink() {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="text-center">
      {/* Success icon */}
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <Badge variant="green" dot className="mb-4">
        Early profile created
      </Badge>

      <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
        You&apos;re on the list, {firstName}.
      </h2>
      <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
        We&apos;ll be in touch when Scrubbed In launches. In the meantime, invite colleagues to unlock
        your <strong className="text-slate-700">Founding Referrer badge</strong>.
      </p>

      {/* Referral box */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 text-white mb-6 text-left">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🏅</span>
          <div>
            <p className="font-extrabold text-base">Founding Referrer Badge</p>
            <p className="text-blue-200 text-xs mt-0.5">Invite 5 colleagues to unlock</p>
          </div>
        </div>

        <p className="text-sm text-blue-100 leading-relaxed mb-5">
          Share your unique link. When <strong className="text-white">5 colleagues</strong> sign up
          using your link, you earn the Founding Referrer badge — a permanent mark on your profile.
        </p>

        {/* Referral link */}
        <div className="bg-blue-950/60 border border-blue-700 rounded-xl overflow-hidden">
          <div className="px-4 py-2 border-b border-blue-700/50">
            <p className="text-xs font-semibold text-blue-300 uppercase tracking-wide">Your referral link</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-3">
            <p className="text-sm text-blue-100 truncate flex-1 font-mono text-xs">{referralUrl}</p>
            <button
              onClick={copyLink}
              className="flex-shrink-0 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-blue-300 mb-1.5">
            <span>Colleagues signed up</span>
            <span>0 / 5</span>
          </div>
          <div className="h-2 bg-blue-950/60 rounded-full border border-blue-700/50 overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: "0%" }} />
          </div>
        </div>
      </div>

      {/* Share suggestions */}
      <p className="text-sm text-slate-500 mb-4">Share with</p>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`Join me on Scrubbed In — the professional network for UK healthcare staff. Create your early profile: ${referralUrl}`)}`, color: "bg-green-600 hover:bg-green-700" },
          { label: "Email", href: `mailto:?subject=${encodeURIComponent("Join Scrubbed In — professional network for healthcare")}&body=${encodeURIComponent(`I've just created my early profile on Scrubbed In, a new professional network for UK healthcare staff.\n\nCreate yours here: ${referralUrl}`)}`, color: "bg-slate-600 hover:bg-slate-700" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.color} text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors`}
          >
            Share via {s.label}
          </a>
        ))}
        <button
          onClick={copyLink}
          className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          {copied ? "Copied ✓" : "Copy link"}
        </button>
      </div>

      <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
        ← Back to home
      </Link>
    </div>
  );
}

const EMPTY: FormData = {
  fullName: "",
  email: "",
  currentPosition: "",
  profession: "",
  phone: "",
  hospital: "",
  department: "",
  region: "",
  sector: "",
  wantsModerator: "",
};

type Errors = Partial<Record<keyof FormData, string>>;

export default function WaitlistForm() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  function set(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!data.fullName.trim()) next.fullName = "Full name is required.";
    if (!data.email.trim()) next.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "Enter a valid email address.";
    if (!data.currentPosition) next.currentPosition = "Please select your current position.";
    if (!data.profession) next.profession = "Please select your profession.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate async submission — replace with Supabase insert in Milestone 3
    setTimeout(() => {
      const code = generateReferralCode(data.fullName, data.email);
      setReferralCode(code);
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return <Confirmation name={data.fullName} referralCode={referralCode} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Required fields */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Required</p>
      </div>

      <Input
        label="Full name"
        placeholder="Dr Sarah Chen"
        value={data.fullName}
        onChange={(e) => set("fullName", e.target.value)}
        error={errors.fullName}
        autoComplete="name"
      />

      <Input
        label="Email address"
        type="email"
        placeholder="sarah.chen@nhs.net"
        value={data.email}
        onChange={(e) => set("email", e.target.value)}
        error={errors.email}
        autoComplete="email"
      />

      <Select
        label="Current position"
        placeholder="Select your position…"
        options={POSITIONS}
        value={data.currentPosition}
        onChange={(e) => set("currentPosition", e.target.value)}
        error={errors.currentPosition}
      />

      <Select
        label="Role / profession"
        placeholder="Select your profession…"
        options={PROFESSIONS}
        value={data.profession}
        onChange={(e) => set("profession", e.target.value)}
        error={errors.profession}
      />

      {/* Optional fields */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Optional — helps us improve</p>
      </div>

      <Input
        label="Phone number"
        type="tel"
        optional
        placeholder="+44 7700 900000"
        value={data.phone}
        onChange={(e) => set("phone", e.target.value)}
        hint="May be used for launch updates by SMS or WhatsApp. We will never share your number."
        autoComplete="tel"
      />

      <Input
        label="Current hospital"
        optional
        placeholder="Royal Free Hospital"
        value={data.hospital}
        onChange={(e) => set("hospital", e.target.value)}
      />

      <Input
        label="Current department"
        optional
        placeholder="Cardiology"
        value={data.department}
        onChange={(e) => set("department", e.target.value)}
      />

      <Select
        label="Region"
        optional
        placeholder="Select your region…"
        options={REGIONS}
        value={data.region}
        onChange={(e) => set("region", e.target.value)}
      />

      <Select
        label="NHS, private, or both?"
        optional
        placeholder="Select…"
        options={SECTORS}
        value={data.sector}
        onChange={(e) => set("sector", e.target.value)}
      />

      <Select
        label="Interested in becoming a hospital moderator?"
        optional
        placeholder="Select…"
        options={[
          { value: "yes", label: "Yes — I'd like to know more" },
          { value: "no", label: "No" },
        ]}
        value={data.wantsModerator}
        onChange={(e) => set("wantsModerator", e.target.value)}
        hint="Hospital moderators help keep hospital pages accurate and safe. Not a paid role."
      />

      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={submitting}
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating your profile…
            </span>
          ) : (
            "Create my early profile →"
          )}
        </Button>
        <p className="text-center text-xs text-slate-400 mt-3">
          Free to join. No card required. UK healthcare staff only.
        </p>
      </div>
    </form>
  );
}

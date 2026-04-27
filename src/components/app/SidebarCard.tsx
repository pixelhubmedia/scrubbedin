"use client";

import Link from "next/link";
import { useAuth } from "@/lib/authContext";
import Avatar from "@/components/ui/Avatar";

const POSITION_LABELS: Record<string, string> = {
  fy1: "FY1", fy2: "FY2", st3: "ST3", st4: "ST4", st5: "ST5",
  st6: "ST6", st7: "ST7", registrar: "Registrar", consultant: "Consultant",
  fellow: "Fellow", student: "Student", "band-5": "Band 5", "band-6": "Band 6",
  "band-7": "Band 7", "band-8": "Band 8",
};

const PROFESSION_LABELS: Record<string, string> = {
  doctor: "Doctor", nurse: "Nurse", pharmacist: "Pharmacist",
  physiotherapist: "Physiotherapist", paramedic: "Paramedic",
  midwife: "Midwife", radiographer: "Radiographer", other: "Healthcare Professional",
};

export default function SidebarCard() {
  const { profile } = useAuth();
  if (!profile) return null;

  const posLabel = POSITION_LABELS[profile.currentPosition] ?? profile.currentPosition;
  const profLabel = PROFESSION_LABELS[profile.roleProfession] ?? profile.roleProfession;

  return (
    <aside className="hidden md:block w-60 flex-shrink-0">
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm sticky top-20">
        {/* Cover gradient */}
        <div className="h-12 bg-gradient-to-br from-blue-700 to-blue-500" />

        {/* Avatar */}
        <div className="px-4 pb-4">
          <div className="-mt-6 mb-3">
            <Avatar name={profile.fullName} photoUrl={profile.profilePhotoUrl} size="lg" className="ring-2 ring-white" />
          </div>

          <Link
            href={`/profile/${profile.username}`}
            className="block font-bold text-slate-900 text-sm hover:text-blue-700 transition-colors leading-snug"
          >
            {profile.fullName}
          </Link>
          <p className="text-xs text-slate-500 mt-0.5">
            {posLabel} · {profLabel}
          </p>
          {profile.currentHospital && profile.privacy.showCurrentHospital && (
            <p className="text-xs text-slate-400 mt-0.5 truncate">{profile.currentHospital}</p>
          )}

          <div className="border-t border-slate-100 mt-4 pt-3 flex flex-col gap-1">
            {[
              { href: "/profile/edit", label: "Edit profile" },
              { href: "/settings", label: "Privacy settings" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors py-0.5"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

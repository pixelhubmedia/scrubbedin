"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/authContext";
import { profileService } from "@/lib/services/profileService";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import type { Profile } from "@/types";

const POSITION_LABELS: Record<string, string> = {
  fy1: "FY1", fy2: "FY2", st3: "ST3", st4: "ST4", st5: "ST5", st6: "ST6", st7: "ST7",
  registrar: "Registrar", consultant: "Consultant", fellow: "Fellow", student: "Student",
  "band-5": "Band 5", "band-6": "Band 6", "band-7": "Band 7", "band-8": "Band 8",
  "ct1": "CT1/ST1", "ct2": "CT2/ST2",
};

const PROFESSION_LABELS: Record<string, string> = {
  doctor: "Doctor", nurse: "Nurse", pharmacist: "Pharmacist",
  physiotherapist: "Physiotherapist", paramedic: "Paramedic", midwife: "Midwife",
  radiographer: "Radiographer", "occupational-therapist": "Occupational Therapist",
  "healthcare-assistant": "Healthcare Assistant", admin: "Administrative", other: "Healthcare Professional",
};

function PlaceholderSection({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2 mb-3">
        <span>{icon}</span>{title}
      </h3>
      <p className="text-xs text-slate-400 italic">Coming in a future milestone.</p>
    </div>
  );
}

export default function ProfileView({ username }: { username: string }) {
  const { session, profile: currentProfile } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // TODO (Supabase): replace with supabase.from('profiles').select().eq('username', username).single()
    const p = profileService.getProfileByUsername(username);
    if (!p) { setNotFound(true); setLoading(false); return; }

    // Visibility check — hidden profiles only visible to owner
    if (p.privacy.profileVisibility === "hidden") {
      const isOwner = session?.userId === p.userId;
      if (!isOwner) { setNotFound(true); setLoading(false); return; }
    }

    setProfile(p);
    setLoading(false);
  }, [username, session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 shadow-sm text-center">
        <p className="text-4xl mb-3">👤</p>
        <h2 className="font-bold text-slate-800 mb-2">Profile not found</h2>
        <p className="text-sm text-slate-500">
          This profile doesn&apos;t exist or is set to hidden.
        </p>
        <Link href="/feed" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
          ← Back to feed
        </Link>
      </div>
    );
  }

  const isOwnProfile = session?.userId === profile.userId;
  const posLabel = POSITION_LABELS[profile.currentPosition] ?? profile.currentPosition;
  const profLabel = PROFESSION_LABELS[profile.roleProfession] ?? profile.roleProfession;
  const isConnectionsOnly = profile.privacy.profileVisibility === "connections_only";

  return (
    <div className="flex flex-col gap-4">
      {/* Profile card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Cover */}
        <div className="h-24 sm:h-32 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500" />

        {/* Header */}
        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <Avatar
              name={profile.fullName}
              photoUrl={profile.profilePhotoUrl}
              size="xl"
              className="ring-4 ring-white"
            />
            <div className="flex gap-2 items-center mb-1">
              {isOwnProfile ? (
                <Link
                  href="/profile/edit"
                  className="text-sm font-semibold text-blue-700 border border-blue-300 px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors"
                >
                  Edit profile
                </Link>
              ) : (
                <>
                  {isConnectionsOnly && !isOwnProfile ? (
                    <span className="text-xs text-slate-400 italic">Sign in to connect</span>
                  ) : (
                    <button
                      disabled
                      className="text-sm font-semibold text-blue-700 border border-blue-300 px-4 py-1.5 rounded-full opacity-50 cursor-not-allowed"
                      title="Connections coming in Milestone 5"
                    >
                      Connect
                    </button>
                  )}
                  <button
                    disabled
                    className="text-sm font-semibold text-slate-600 border border-slate-300 px-4 py-1.5 rounded-full opacity-50 cursor-not-allowed"
                    title="Messaging coming in Milestone 5"
                  >
                    Message
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Name & titles */}
          <h1 className="text-xl font-extrabold text-slate-900 leading-tight">{profile.fullName}</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {posLabel} · {profLabel}
          </p>

          {profile.privacy.showCurrentHospital && profile.currentHospital && (
            <p className="text-sm text-slate-500 mt-0.5">
              {profile.currentHospital}
              {profile.currentDepartment && ` · ${profile.currentDepartment}`}
            </p>
          )}

          {profile.region && (
            <p className="text-xs text-slate-400 mt-1 capitalize">{profile.region.replace(/-/g, " ")}</p>
          )}

          {/* Visibility badge */}
          {isOwnProfile && profile.privacy.profileVisibility !== "public" && (
            <div className="mt-3">
              <Badge variant={profile.privacy.profileVisibility === "hidden" ? "amber" : "slate"}>
                {profile.privacy.profileVisibility === "hidden" ? "⚠ Hidden profile" : "🔒 Connections only"}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* About */}
      {profile.bio && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 text-sm mb-3">About</h3>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{profile.bio}</p>
        </div>
      )}

      {/* Placeholders for future milestones */}
      <PlaceholderSection title="Rotations" icon="🔄" />
      <PlaceholderSection title="Endorsements" icon="⭐" />
      <PlaceholderSection title="Connections" icon="🤝" />
    </div>
  );
}

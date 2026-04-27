// Mock profile service.
// TODO (Supabase): replace each function with a Supabase query:
//   getProfile       → supabase.from('profiles').select().eq('user_id', userId).single()
//   getProfileByUsername → supabase.from('profiles').select().eq('username', username).single()
//   createProfile    → supabase.from('profiles').insert(data)
//   updateProfile    → supabase.from('profiles').update(data).eq('id', id)
//   getAllProfiles    → supabase.from('profiles').select() (with RLS filtering hidden)

import type { Profile, PrivacySettings } from "@/types";
import { STORAGE_KEYS } from "./storageKeys";

// ─── Storage helpers ─────────────────────────────────────────────────────────

function readProfiles(): Profile[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILES) ?? "[]");
  } catch {
    return [];
  }
}

function write(profiles: Profile[]): void {
  localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
}

// ─── Username helpers ─────────────────────────────────────────────────────────

export function generateUsername(fullName: string): string {
  const base = fullName
    .toLowerCase()
    .replace(/^(dr|mr|mrs|ms|prof|nurse)\s+/i, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 30);
  const suffix = Math.floor(Math.random() * 900 + 100);
  return `${base}-${suffix}`;
}

export function isUsernameAvailable(username: string, excludeProfileId?: string): boolean {
  const profiles = readProfiles();
  return !profiles.some(
    (p) => p.username === username && p.id !== excludeProfileId
  );
}

// ─── Profile API ─────────────────────────────────────────────────────────────

export const profileService = {
  /** Get profile by userId. Returns null if not found. */
  getProfile(userId: string): Profile | null {
    return readProfiles().find((p) => p.userId === userId) ?? null;
  },

  /** Get profile by username. Returns null if not found. */
  getProfileByUsername(username: string): Profile | null {
    return readProfiles().find((p) => p.username === username) ?? null;
  },

  /** Get all profiles (used for seeding and admin). Hidden profiles included. */
  getAllProfiles(): Profile[] {
    return readProfiles();
  },

  /** Get all public profiles visible to strangers (excludes hidden). */
  getPublicProfiles(): Profile[] {
    return readProfiles().filter(
      (p) => p.privacy.profileVisibility !== "hidden"
    );
  },

  /** Save a profile directly (used by seeding). */
  saveProfile(profile: Profile): void {
    const profiles = readProfiles();
    const idx = profiles.findIndex((p) => p.id === profile.id);
    if (idx >= 0) {
      profiles[idx] = profile;
    } else {
      profiles.push(profile);
    }
    write(profiles);
  },

  /** Create a brand-new profile after signup. */
  createProfile(
    userId: string,
    data: {
      fullName: string;
      currentPosition: string;
      roleProfession: string;
    }
  ): Profile {
    const username = generateUsername(data.fullName);
    const now = new Date().toISOString();

    const defaultPrivacy: PrivacySettings = {
      profileVisibility: "public",
      showCurrentHospital: true,
      showFutureRotations: true,
      searchEngineIndexing: false,
    };

    const profile: Profile = {
      id: `profile-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      userId,
      fullName: data.fullName,
      username,
      currentPosition: data.currentPosition,
      roleProfession: data.roleProfession,
      bio: "",
      privacy: defaultPrivacy,
      createdAt: now,
      updatedAt: now,
    };

    const profiles = readProfiles();
    write([...profiles, profile]);
    return profile;
  },

  /** Update an existing profile. Merges partial data. */
  updateProfile(profileId: string, updates: Partial<Profile>): Profile | null {
    const profiles = readProfiles();
    const idx = profiles.findIndex((p) => p.id === profileId);
    if (idx < 0) return null;

    const updated: Profile = {
      ...profiles[idx],
      ...updates,
      id: profiles[idx].id,
      userId: profiles[idx].userId,
      updatedAt: new Date().toISOString(),
    };

    profiles[idx] = updated;
    write(profiles);
    return updated;
  },
};

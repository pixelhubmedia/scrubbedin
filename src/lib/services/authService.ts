// Mock authentication service.
// All functions use localStorage to simulate a backend.
// TODO (Supabase): replace each function body with the corresponding Supabase Auth call:
//   signup   → supabase.auth.signUp()
//   login    → supabase.auth.signInWithPassword()
//   logout   → supabase.auth.signOut()
//   getSession → supabase.auth.getSession()

import type { User, Session } from "@/types";
import { STORAGE_KEYS } from "./storageKeys";
import { MOCK_USERS, MOCK_PROFILES } from "./mockData";

// ─── Storage helpers ─────────────────────────────────────────────────────────

function readUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) ?? "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function hashPassword(password: string): string {
  // Toy hash — NOT secure. Supabase Auth handles real password hashing.
  let h = 0;
  for (let i = 0; i < password.length; i++) {
    h = (Math.imul(31, h) + password.charCodeAt(i)) | 0;
  }
  return String(Math.abs(h));
}

// ─── Seed demo data once ─────────────────────────────────────────────────────

export function seedMockData(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(STORAGE_KEYS.SEEDED)) return;

  // Import here to avoid circular deps
  const { profileService } = require("./profileService");

  const existingUsers = readUsers();
  const existingIds = new Set(existingUsers.map((u: User) => u.id));

  const newUsers = MOCK_USERS.filter((u) => !existingIds.has(u.id));
  writeUsers([...existingUsers, ...newUsers]);

  const existingProfiles = profileService.getAllProfiles();
  const existingProfileIds = new Set(existingProfiles.map((p: { userId: string }) => p.userId));

  MOCK_PROFILES.forEach((p) => {
    if (!existingProfileIds.has(p.userId)) {
      profileService.saveProfile(p);
    }
  });

  localStorage.setItem(STORAGE_KEYS.SEEDED, "1");
}

// ─── Auth API ────────────────────────────────────────────────────────────────

export type AuthError = { message: string };
export type AuthResult<T> = { data: T; error: null } | { data: null; error: AuthError };

export const authService = {
  /**
   * Create a new account and session.
   * TODO (Supabase): replace with supabase.auth.signUp({ email, password })
   */
  async signup(
    email: string,
    password: string,
    meta: { fullName: string }
  ): Promise<AuthResult<{ user: User; session: Session }>> {
    const users = readUsers();
    const normalised = email.toLowerCase().trim();

    if (users.find((u) => u.email === normalised)) {
      return { data: null, error: { message: "An account with this email already exists." } };
    }

    const user: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      email: normalised,
      _mockPasswordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    writeUsers([...users, user]);

    const session: Session = {
      userId: user.id,
      email: user.email,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));

    void meta; // will be used by profile creation caller
    return { data: { user, session }, error: null };
  },

  /**
   * Sign in with email + password.
   * TODO (Supabase): replace with supabase.auth.signInWithPassword({ email, password })
   */
  async login(
    email: string,
    password: string
  ): Promise<AuthResult<{ user: User; session: Session }>> {
    const users = readUsers();
    const normalised = email.toLowerCase().trim();
    const user = users.find((u) => u.email === normalised);

    if (!user) {
      return { data: null, error: { message: "No account found with that email address." } };
    }

    if (user._mockPasswordHash !== hashPassword(password)) {
      return { data: null, error: { message: "Incorrect password." } };
    }

    const session: Session = {
      userId: user.id,
      email: user.email,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));

    return { data: { user, session }, error: null };
  },

  /**
   * Sign out the current user.
   * TODO (Supabase): replace with supabase.auth.signOut()
   */
  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  /**
   * Get the current session, or null if not logged in.
   * TODO (Supabase): replace with (await supabase.auth.getSession()).data.session
   */
  getSession(): Session | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  },
};

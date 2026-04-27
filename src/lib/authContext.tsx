"use client";

// TODO (Supabase): replace the entire mock implementation in this file with
//   Supabase's useUser() / useSession() hooks from @supabase/ssr.
//   The context shape (AuthContextValue) stays the same — only the implementation changes.

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { Session, Profile } from "@/types";
import { authService, seedMockData } from "./services/authService";
import { profileService } from "./services/profileService";

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  /** Refresh profile from storage (call after editing profile) */
  refreshProfile: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadSession = useCallback(() => {
    seedMockData();
    const s = authService.getSession();
    setSession(s);

    if (s) {
      const p = profileService.getProfile(s.userId);
      setProfile(p);
    } else {
      setProfile(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const refreshProfile = useCallback(() => {
    if (!session) return;
    const p = profileService.getProfile(session.userId);
    setProfile(p);
  }, [session]);

  const logout = useCallback(() => {
    authService.logout();
    setSession(null);
    setProfile(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ session, profile, loading, refreshProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

/** Use in protected pages: redirects to /login if not authenticated. */
export function useRequireAuth(): AuthContextValue & { ready: boolean } {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading && !auth.session) {
      router.push("/login");
    }
  }, [auth.loading, auth.session, router]);

  return { ...auth, ready: !auth.loading && !!auth.session };
}

"use client";

// Redirects the current user to their own profile by username.
// TODO (Supabase): same approach — read profile from Supabase, then redirect.

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import AppShell from "@/components/app/AppShell";

function ProfileRedirect() {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && profile) {
      router.replace(`/profile/${profile.username}`);
    }
  }, [loading, profile, router]);

  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AppShell>
      <ProfileRedirect />
    </AppShell>
  );
}

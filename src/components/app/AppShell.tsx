"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/authContext";
import AppNav from "./AppNav";
import MobileNav from "./MobileNav";
import SidebarCard from "./SidebarCard";

interface AppShellInnerProps {
  children: ReactNode;
  sidebar?: boolean;
}

function AppShellInner({ children, sidebar = true }: AppShellInnerProps) {
  const { loading, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [loading, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading…</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />
      <div className="max-w-5xl mx-auto px-4 py-5">
        <div className={`flex gap-5 items-start ${sidebar ? "md:grid md:grid-cols-[240px_1fr]" : ""}`}>
          {sidebar && <SidebarCard />}
          <main className="min-w-0 w-full pb-24 md:pb-6">{children}</main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}

interface AppShellProps extends AppShellInnerProps {}

export default function AppShell({ children, sidebar }: AppShellProps) {
  return (
    <AuthProvider>
      <AppShellInner sidebar={sidebar}>{children}</AppShellInner>
    </AuthProvider>
  );
}

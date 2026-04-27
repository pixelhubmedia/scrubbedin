"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import Avatar from "@/components/ui/Avatar";
import { useState, useRef, useEffect } from "react";

const NAV_ITEMS = [
  {
    href: "/feed",
    label: "Feed",
    icon: (active: boolean) => (
      <svg className={`w-5 h-5 ${active ? "fill-blue-700" : "fill-none stroke-current"}`} viewBox="0 0 24 24" strokeWidth={active ? 0 : 1.75}>
        {active
          ? <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          : <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>
        }
      </svg>
    ),
  },
  {
    href: "/search",
    label: "Search",
    icon: (active: boolean) => (
      <svg className={`w-5 h-5 ${active ? "stroke-blue-700" : "stroke-current"}`} fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.5 : 1.75}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    href: "/hospitals",
    label: "Hospitals",
    icon: (active: boolean) => (
      <svg className={`w-5 h-5 ${active ? "stroke-blue-700" : "stroke-current"}`} fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.5 : 1.75}>
        <path d="M3 21h18M9 21V7l3-4 3 4v14M12 11h.01" /><path d="M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
      </svg>
    ),
  },
  {
    href: "/messages",
    label: "Messages",
    icon: (active: boolean) => (
      <svg className={`w-5 h-5 ${active ? "stroke-blue-700" : "stroke-current"}`} fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.5 : 1.75}>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

export default function AppNav() {
  const pathname = usePathname();
  const { profile, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/feed" className="flex items-center gap-0.5 flex-shrink-0">
          <span className="text-lg font-extrabold text-blue-700">S</span>
          <span className="text-lg font-extrabold text-slate-800">crubbed In</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  active ? "text-blue-700" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {item.icon(active)}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Profile dropdown */}
        <div className="relative flex-shrink-0" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors"
          >
            {profile && <Avatar name={profile.fullName} size="sm" />}
            <span className="hidden sm:block text-xs font-medium text-slate-700 max-w-[120px] truncate">
              {profile?.fullName ?? "Me"}
            </span>
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
              {profile && (
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800 truncate">{profile.fullName}</p>
                  <p className="text-xs text-slate-500 truncate">@{profile.username}</p>
                </div>
              )}
              <Link
                href={`/profile/${profile?.username}`}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                View profile
              </Link>
              <Link
                href="/profile/edit"
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
                Settings
              </Link>
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button
                  onClick={() => { setMenuOpen(false); logout(); }}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

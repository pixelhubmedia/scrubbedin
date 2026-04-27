"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import Avatar from "@/components/ui/Avatar";

const ITEMS = [
  {
    href: "/feed",
    label: "Feed",
    icon: (a: boolean) => (
      <svg className={`w-5 h-5`} fill={a ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={a ? 0 : 1.75}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        {!a && <polyline points="9 22 9 12 15 12 15 22" />}
      </svg>
    ),
  },
  {
    href: "/search",
    label: "Search",
    icon: (a: boolean) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={a ? 2.5 : 1.75}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    href: "/hospitals",
    label: "Hospitals",
    icon: (a: boolean) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={a ? 2.5 : 1.75}>
        <path d="M3 21h18M9 21V7l3-4 3 4v14M12 11h.01" />
      </svg>
    ),
  },
  {
    href: "/messages",
    label: "Messages",
    icon: (a: boolean) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={a ? 2.5 : 1.75}>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { profile } = useAuth();
  const isProfile = pathname.startsWith("/profile") || pathname.startsWith("/settings");

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 flex">
      {ITEMS.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
              active ? "text-blue-700" : "text-slate-500"
            }`}
          >
            {item.icon(active)}
            {item.label}
          </Link>
        );
      })}
      {/* Profile tab */}
      <Link
        href={profile ? `/profile/${profile.username}` : "/profile"}
        className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
          isProfile ? "text-blue-700" : "text-slate-500"
        }`}
      >
        {profile ? (
          <Avatar name={profile.fullName} size="xs" className={isProfile ? "ring-2 ring-blue-700" : ""} />
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        )}
        Profile
      </Link>
    </nav>
  );
}

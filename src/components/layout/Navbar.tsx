"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-xl font-extrabold text-blue-700 tracking-tight group-hover:text-blue-800 transition-colors">
            S
          </span>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight">crubbed In</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/#how-it-works" className="hover:text-slate-900 transition-colors">
            How it works
          </Link>
          <Link href="/#features" className="hover:text-slate-900 transition-colors">
            Features
          </Link>
          <Link href="/#safety" className="hover:text-slate-900 transition-colors">
            Safety
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
          >
            Sign in
          </Link>
          <Link
            href="/waitlist"
            className="text-sm font-semibold bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Create early profile
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-3">
          <Link href="/#how-it-works" className="text-sm font-medium text-slate-700 py-2" onClick={() => setOpen(false)}>
            How it works
          </Link>
          <Link href="/#features" className="text-sm font-medium text-slate-700 py-2" onClick={() => setOpen(false)}>
            Features
          </Link>
          <Link href="/#safety" className="text-sm font-medium text-slate-700 py-2" onClick={() => setOpen(false)}>
            Safety
          </Link>
          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            <Link href="/login" className="text-sm font-semibold text-slate-700 py-2" onClick={() => setOpen(false)}>
              Sign in
            </Link>
            <Link
              href="/waitlist"
              className="text-sm font-semibold bg-blue-700 text-white px-4 py-2.5 rounded-lg text-center hover:bg-blue-800 transition-colors"
              onClick={() => setOpen(false)}
            >
              Create early profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

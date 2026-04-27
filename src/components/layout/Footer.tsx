import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-lg font-extrabold text-blue-400">S</span>
              <span className="text-lg font-extrabold text-white">crubbed In</span>
            </div>
            <p className="text-sm leading-relaxed">
              The UK professional network built exclusively for healthcare staff.
            </p>
            <p className="text-xs mt-3 text-slate-500">
              Independent platform. Not affiliated with the NHS.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-semibold text-slate-200 mb-3">Product</p>
              <ul className="flex flex-col gap-2">
                <li><Link href="/#how-it-works" className="hover:text-slate-200 transition-colors">How it works</Link></li>
                <li><Link href="/#features" className="hover:text-slate-200 transition-colors">Features</Link></li>
                <li><Link href="/waitlist" className="hover:text-slate-200 transition-colors">Early access</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-200 mb-3">Account</p>
              <ul className="flex flex-col gap-2">
                <li><Link href="/signup" className="hover:text-slate-200 transition-colors">Sign up</Link></li>
                <li><Link href="/login" className="hover:text-slate-200 transition-colors">Sign in</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-200 mb-3">Legal</p>
              <ul className="flex flex-col gap-2">
                <li><span className="text-slate-600 cursor-not-allowed">Privacy Policy</span></li>
                <li><span className="text-slate-600 cursor-not-allowed">Terms of Use</span></li>
                <li><span className="text-slate-600 cursor-not-allowed">Community Guidelines</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Scrubbed In. All rights reserved.</p>
          <p>Built for UK healthcare professionals.</p>
        </div>
      </div>
    </footer>
  );
}

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import WaitlistForm from "./WaitlistForm";

export const metadata = {
  title: "Create your early profile — Scrubbed In",
  description:
    "Join the Scrubbed In waitlist. Be among the first UK healthcare professionals to create a profile and earn your Founding Referrer badge.",
};

const trustSignals = [
  { icon: "🔒", text: "Your data is never sold" },
  { icon: "🛡", text: "No patient data ever posted" },
  { icon: "🇬🇧", text: "UK healthcare staff only" },
  { icon: "🆓", text: "Free during early access" },
];

export default function WaitlistPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left — copy */}
            <div className="md:pt-4">
              <Badge variant="blue" dot className="mb-5">
                Early access open
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Create your early<br />
                <span className="text-blue-700">Scrubbed In profile.</span>
              </h1>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Scrubbed In is the professional network being built for UK healthcare staff.
                Sign up now to secure your place, get early access, and earn your Founding
                Referrer badge when you invite 5 colleagues.
              </p>

              {/* What you get */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">What you get</p>
                <ul className="flex flex-col gap-3">
                  {[
                    ["🎯", "Early access before public launch"],
                    ["🏅", "Opportunity to earn Founding Referrer badge"],
                    ["🔗", "Your own referral link to share with colleagues"],
                    ["📣", "Launch updates and platform news"],
                    ["💬", "Influence over features as we build"],
                  ].map(([icon, text]) => (
                    <li key={text} className="flex items-center gap-3 text-sm text-slate-700">
                      <span className="text-base">{icon}</span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-2 gap-2">
                {trustSignals.map((s) => (
                  <div key={s.text} className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{s.icon}</span>
                    {s.text}
                  </div>
                ))}
              </div>

              {/* Founding Referrer callout */}
              <div className="mt-6 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-5 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏅</span>
                  <p className="font-bold text-sm">Founding Referrer Badge</p>
                </div>
                <p className="text-blue-100 text-xs leading-relaxed">
                  Invite 5 colleagues using your personal referral link after signing up.
                  When they create their early profiles, your Founding Referrer badge is awarded
                  automatically and displayed permanently on your profile.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Your details</h2>
              <p className="text-sm text-slate-500 mb-6">Takes about 2 minutes.</p>
              <WaitlistForm />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import Section from "@/components/ui/Section";

const features = [
  {
    icon: "👤",
    title: "Professional Profile",
    description:
      "Build a verified healthcare profile with your specialty, roles, and career history — visible to the colleagues you choose.",
  },
  {
    icon: "📰",
    title: "Professional Feed",
    description:
      "Share updates, insights, and milestones with your network. Patient-data checks run before every post.",
  },
  {
    icon: "🏥",
    title: "Hospital Pages",
    description:
      "Explore hospitals across the UK, see who works there, and follow departments relevant to your specialty.",
  },
  {
    icon: "🔬",
    title: "Department Discovery",
    description:
      "Find colleagues in specific departments — from A&E to cardiothoracics — across trusts and regions.",
  },
  {
    icon: "🔄",
    title: "Rotations Timeline",
    description:
      "Log current, past and upcoming placements so colleagues always know where you are in your training.",
  },
  {
    icon: "⭐",
    title: "Public Endorsements",
    description:
      "Give and receive structured endorsements from verified connections — visible on your public profile.",
  },
  {
    icon: "💬",
    title: "Connections & Messaging",
    description:
      "Connect with colleagues and message privately. Connections-only messaging keeps conversations professional.",
  },
  {
    icon: "🔒",
    title: "Privacy Controls",
    description:
      "Choose who sees your profile, your rotations, and your connections — full control, always.",
  },
];

const problemPoints = [
  {
    icon: "🔄",
    heading: "Healthcare staff rotate constantly",
    body: "Doctors, nurses, and allied health professionals move between hospitals, departments and trusts throughout their careers — often every few months.",
  },
  {
    icon: "📵",
    heading: "Professional relationships get lost",
    body: "When a rotation ends, there is no professional way to stay connected. Contact details get lost and it becomes hard to reach colleagues you worked closely with.",
  },
  {
    icon: "📱",
    heading: "Staff rely on consumer platforms",
    body: "Healthcare teams currently coordinate through WhatsApp groups, personal phone numbers, Instagram and Facebook — platforms not built for professional healthcare use.",
  },
  {
    icon: "🚫",
    heading: "No dedicated healthcare network exists",
    body: "LinkedIn is too generic. There is no professional network that understands rotations, NHS banding, specialties, trusts, or the realities of a healthcare career.",
  },
];

const solutionPoints = [
  { icon: "✅", text: "Create a professional healthcare profile in minutes" },
  { icon: "✅", text: "Add current, past and future hospital rotations" },
  { icon: "✅", text: "Connect with colleagues across hospitals and trusts" },
  { icon: "✅", text: "Share professional updates on a dedicated feed" },
  { icon: "✅", text: "Give and receive structured peer endorsements" },
  { icon: "✅", text: "Discover who you know before starting somewhere new" },
];

const safetyPoints = [
  {
    icon: "🛡",
    heading: "No patient-identifiable information",
    body: "Patient data must never be shared. Automated checks scan posts before they are published and flag anything that could identify a patient.",
  },
  {
    icon: "👔",
    heading: "Professional use only",
    body: "Scrubbed In is built for professional healthcare networking. Community guidelines set clear expectations for respectful, professional conduct.",
  },
  {
    icon: "🔒",
    heading: "You control your visibility",
    body: "Choose who can see your profile, your workplace history, and your connections. Public, connections-only or private — it is always your choice.",
  },
  {
    icon: "🚩",
    heading: "Report fake profiles",
    body: "Any user can report a suspected fake or impersonation account. Reports are reviewed by platform moderators and hospital moderators.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
          <Badge variant="blue" dot className="mb-6 bg-blue-800 text-blue-200 border-blue-700">
            Early access — create your profile now
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
            Stay connected through{" "}
            <span className="text-blue-300">every rotation.</span>
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Scrubbed In is a professional network for UK healthcare staff to build trusted connections,
            track hospital placements, share updates and discover who they know before starting somewhere new.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl text-base hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/30"
            >
              Create your early profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 border border-blue-500 text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-blue-800/50 transition-colors"
            >
              See how it works
            </a>
          </div>

          {/* Social proof strip */}
          <div className="mt-14 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              Built for UK healthcare
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              Independent of the NHS
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              Patient safety by design
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
              Free during early access
            </span>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ──────────────────────────────── */}
      <Section id="how-it-works" className="bg-slate-50 border-b border-slate-200">
        <div className="text-center mb-12">
          <Badge variant="slate" className="mb-4">The problem</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Healthcare careers don&apos;t fit generic networks.
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-base">
            Professional networking in healthcare has always been an afterthought — and it shows.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {problemPoints.map((point) => (
            <div
              key={point.heading}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex gap-4"
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{point.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1.5">{point.heading}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{point.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── SOLUTION ─────────────────────────────── */}
      <Section className="bg-white border-b border-slate-200">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="blue" className="mb-4">The solution</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              A professional network that understands how healthcare actually works.
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Scrubbed In is designed around the rhythms of a healthcare career — rotations,
              departments, specialties, trusts. It gives you the tools to maintain your professional
              identity wherever you work.
            </p>
            <ul className="flex flex-col gap-3">
              {solutionPoints.map((point) => (
                <li key={point.text} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="text-base flex-shrink-0">{point.icon}</span>
                  {point.text}
                </li>
              ))}
            </ul>
            <Link
              href="/waitlist"
              className="mt-8 inline-flex items-center gap-2 bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors text-sm"
            >
              Create your early profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Illustration card stack */}
          <div className="hidden md:flex flex-col gap-3">
            {[
              { label: "Dr Sarah Chen", sub: "ST4 · Cardiology · Barts Health", badge: "Connected" },
              { label: "James O'Brien", sub: "FY2 · General Surgery · Royal Free", badge: "2 mutual connections" },
              { label: "Priya Sharma", sub: "Charge Nurse · ITU · UCLH", badge: "Same hospital" },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                  {card.label[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{card.label}</p>
                  <p className="text-xs text-slate-500 truncate">{card.sub}</p>
                </div>
                <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {card.badge}
                </span>
              </div>
            ))}
            <div className="bg-blue-700 rounded-xl p-4 text-white flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">Royal Free Hospital</p>
                <p className="text-xs text-blue-200 mt-0.5">47 connections work here</p>
              </div>
              <span className="text-2xl">🏥</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── FEATURES ─────────────────────────────── */}
      <Section id="features" className="bg-slate-50 border-b border-slate-200">
        <div className="text-center mb-12">
          <Badge variant="slate" className="mb-4">Features</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything your healthcare career needs.
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-base">
            Built around how healthcare professionals actually work — not adapted from a generic platform.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
            >
              <span className="text-2xl block mb-3">{feature.icon}</span>
              <h3 className="font-semibold text-slate-900 text-sm mb-2">{feature.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── REFERRAL ─────────────────────────────── */}
      <Section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-4xl block mb-4">🏅</span>
          <Badge variant="blue" className="mb-5 bg-blue-800 text-blue-200 border-blue-700">
            Founding Referrer
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Help build the network.<br />Earn your badge.
          </h2>
          <p className="text-blue-100 text-base leading-relaxed mb-3">
            The Founding Referrer badge is a permanent mark of recognition on your profile — awarded
            to the healthcare professionals who helped Scrubbed In grow from the start.
          </p>
          <p className="text-white font-semibold text-lg mb-8">
            Invite 5 colleagues and unlock your Founding Referrer badge.
          </p>

          <div className="bg-blue-800/60 border border-blue-700 rounded-xl p-6 text-left mb-8">
            <p className="text-sm font-semibold text-blue-200 mb-3">How it works</p>
            <ol className="flex flex-col gap-3 text-sm text-blue-100">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                Create your early profile on Scrubbed In
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                Share your unique referral link with colleagues
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                When 5 colleagues sign up using your link, your badge is awarded automatically
              </li>
            </ol>
          </div>

          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/30"
          >
            Create your early profile
          </Link>
        </div>
      </Section>

      {/* ─── SAFETY ───────────────────────────────── */}
      <Section id="safety" className="bg-white border-b border-slate-200">
        <div className="text-center mb-12">
          <Badge variant="green" className="mb-4">Safety first</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Patient safety is non-negotiable.
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-base">
            Scrubbed In is designed with healthcare professionals in mind. That means patient data
            protection is built into the platform — not bolted on afterwards.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          {safetyPoints.map((point) => (
            <div
              key={point.heading}
              className="border border-slate-200 rounded-xl p-6 bg-slate-50 flex gap-4"
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{point.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1.5">{point.heading}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{point.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex gap-4 items-start">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <div>
            <p className="font-semibold text-red-800 text-sm mb-1">
              Patient-identifiable data must never be posted publicly.
            </p>
            <p className="text-sm text-red-700">
              This is a core rule of the platform. Any post, comment or message that contains
              patient-identifiable information will be blocked or removed. Repeat violations result
              in account suspension. If you are ever unsure, do not post it.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── FINAL CTA ────────────────────────────── */}
      <Section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white" padY="xl">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Create your early Scrubbed In profile.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-8">
            Join now to get early access, secure your Founding Referrer badge opportunity,
            and help shape the professional network that UK healthcare actually needs.
          </p>
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-500 transition-colors text-base"
          >
            Create your early profile
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-slate-500">Free to join. No card required. UK healthcare staff only.</p>
        </div>
      </Section>

      <Footer />
    </>
  );
}

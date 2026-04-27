import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignupForm from "./SignupForm";

export const metadata = {
  title: "Create Account — Scrubbed In",
  description: "Join Scrubbed In — the UK professional network for healthcare staff.",
};

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Create your account</h1>
            <p className="text-slate-500 text-sm">
              Join the UK professional network for healthcare staff.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
            <SignupForm />
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">
            Already on the waitlist?{" "}
            <Link href="/waitlist" className="text-blue-600 hover:underline">View your early profile</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

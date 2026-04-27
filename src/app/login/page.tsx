import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Sign In — Scrubbed In",
  description: "Sign in to your Scrubbed In account.",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-500 text-sm">Sign in to your Scrubbed In account.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
            <LoginForm />
          </div>
          <div className="text-center mt-6 space-y-2">
            <p className="text-xs text-slate-400">
              New to Scrubbed In?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">Create an account</Link>
            </p>
            <p className="text-xs text-slate-400">
              Signed up on the waitlist?{" "}
              <Link href="/waitlist" className="text-blue-600 hover:underline">View your early profile</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

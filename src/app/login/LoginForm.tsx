"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { authService } from "@/lib/services/authService";
import { seedMockData } from "@/lib/services/authService";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; submit?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function validate(): boolean {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Email address is required.";
    if (!password) e.password = "Password is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    seedMockData(); // ensure demo data is present
    // TODO (Supabase): replace with supabase.auth.signInWithPassword({ email, password })
    const result = await authService.login(email, password);

    if (result.error) {
      setErrors({ submit: result.error.message });
      setLoading(false);
      return;
    }

    router.push("/feed");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {errors.submit}
        </div>
      )}

      <Input label="Email address" type="email" placeholder="sarah@example.com" value={email}
        onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined, submit: undefined })); }}
        error={errors.email} autoComplete="email" />

      <Input label="Password" type="password" placeholder="Your password" value={password}
        onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined, submit: undefined })); }}
        error={errors.password} autoComplete="current-password" />

      <div className="flex justify-end -mt-1">
        <span className="text-xs text-slate-400 cursor-not-allowed">Forgot password? (coming soon)</span>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in…
          </span>
        ) : "Sign in →"}
      </Button>

      <div className="text-center text-sm text-slate-500 border-t border-slate-100 pt-4">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 font-semibold hover:underline">Create one</Link>
      </div>
    </form>
  );
}

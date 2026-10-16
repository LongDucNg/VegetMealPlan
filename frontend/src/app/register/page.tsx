"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Leaf, Loader2, Lock, Mail, User } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useAuth, authService, DietOption } from "@/features/auth";
import { ApiError } from "@/lib/apiClient";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [diet, setDiet] = useState("vegan");
  const [dietOptions, setDietOptions] = useState<DietOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    authService.getDietOptions().then((options) => {
      if (mounted && options.length > 0) {
        setDietOptions(options);
        // Default to first option or vegan
        if (options.some((o) => o.id === "vegan")) {
          setDiet("vegan");
        } else {
          setDiet(options[0].id);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 8) {
      setErrorMsg("Mật khẩu phải từ 8 ký tự trở lên.");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        full_name: name,
        email,
        password,
        diet_type: diet,
      });
      router.push("/me");
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.code === "AUTH_EMAIL_TAKEN") {
          setErrorMsg("Email này đã được đăng ký tài khoản. Vui lòng đăng nhập hoặc dùng email khác.");
        } else if (err.details && err.details.length > 0) {
          setErrorMsg(err.details.join(", "));
        } else {
          setErrorMsg(err.message);
        }
      } else {
        setErrorMsg("Đăng ký không thành công. Vui lòng thử lại sau.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <AppShell showRightRail={false}>
      <div className="w-full flex justify-center py-10">
        <Card className="max-w-md w-full p-8 shadow-sm">
          {/* Logo Brand Header */}
          <div className="flex flex-col items-center text-center mb-7 select-none">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm flex items-center justify-center text-white mb-3">
              <Leaf className="w-6 h-6 text-white" strokeWidth={1.75} />
            </div>
            <h1 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Create your VeggieHub account
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Personalized weekly meal planner & AI nutrition access — free forever.
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMsg}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Full name
              </label>
              <Input
                type="text"
                required
                icon={<User className="w-4 h-4" />}
                placeholder="Linh Nguyen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Email address
              </label>
              <Input
                type="email"
                required
                icon={<Mail className="w-4 h-4" />}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Password
              </label>
              <Input
                type="password"
                required
                icon={<Lock className="w-4 h-4" />}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Diet preference
              </label>
              <Select
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                disabled={isLoading}
                options={dietOptions.map((d) => ({
                  value: d.id,
                  label: d.label,
                }))}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Join free
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-stone-400 font-semibold tracking-wider">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Google Signup Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full h-11 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-sm font-semibold transition-all flex items-center justify-center gap-3 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            Sign up with Google
          </button>

          {/* Footer Link */}
          <div className="mt-6 pt-5 border-t border-stone-100 text-center text-sm text-stone-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Log in
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

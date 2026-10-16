"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Flame,
  Heart,
  Leaf,
  Loader2,
  Lock,
  Mail,
  Ruler,
  Scale,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useAuth, authService, DietOption, AllergenGroup } from "@/features/auth";
import { ApiError } from "@/lib/apiClient";

const HEALTH_GOALS = [
  { id: 1, label: "Giảm cân", desc: "Thâm hụt calo khoa học, đốt mỡ" },
  { id: 2, label: "Tăng cơ", desc: "Tối ưu hóa đạm thực vật, phát triển cơ" },
  { id: 3, label: "Duy trì vóc dáng", desc: "Cân bằng năng lượng và vi chất" },
];

const ACTIVITY_LEVELS = [
  { id: "sedentary", label: "Ít vận động", desc: "Công việc văn phòng, ngồi nhiều" },
  { id: "light", label: "Vận động nhẹ", desc: "Tập luyện 1 - 3 ngày/tuần" },
  { id: "moderate", label: "Vừa phải", desc: "Tập thể thao 3 - 5 ngày/tuần" },
  { id: "active", label: "Nhiều", desc: "Tập luyện cường độ cao 6 - 7 ngày/tuần" },
];

const GENDER_OPTIONS = [
  { id: "male", label: "Nam" },
  { id: "female", label: "Nữ" },
  { id: "other", label: "Khác" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  // Wizard Step: 1 = Tài khoản, 2 = Hồ sơ thể trạng
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: Thông tin cơ bản
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2: Hồ sơ sức khỏe & dinh dưỡng
  const [diet, setDiet] = useState("vegan");
  const [dietOptions, setDietOptions] = useState<DietOption[]>([]);
  const [goalId, setGoalId] = useState<number>(1);
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [gender, setGender] = useState("female");
  const [age, setAge] = useState<string>("25");
  const [height, setHeight] = useState<string>("165");
  const [weight, setWeight] = useState<string>("55");

  // Dị ứng
  const [allergenGroups, setAllergenGroups] = useState<AllergenGroup[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([authService.getDietOptions(), authService.getAllergenGroups()]).then(
      ([options, allergens]) => {
        if (!mounted) return;
        if (options.length > 0) {
          setDietOptions(options);
          if (options.some((o) => o.id === "vegan")) {
            setDiet("vegan");
          } else {
            setDiet(options[0].id);
          }
        }
        if (allergens.length > 0) {
          setAllergenGroups(allergens);
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  const toggleAllergen = (code: string) => {
    setSelectedAllergens((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  // Tính BMI tham khảo nhanh nếu người dùng nhập chiều cao và cân nặng
  const numHeight = parseFloat(height);
  const numWeight = parseFloat(weight);
  const bmi =
    numHeight > 0 && numWeight > 0
      ? (numWeight / ((numHeight / 100) * (numHeight / 100))).toFixed(1)
      : null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg("Vui lòng nhập họ và tên của bạn.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Mật khẩu phải từ 8 ký tự trở lên.");
      return;
    }

    setStep(2);
  };

  const handleRegisterSubmit = async (withProfile: boolean) => {
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const payload: any = {
        full_name: name.trim(),
        email: email.trim(),
        password,
      };

      if (withProfile) {
        payload.diet_type = diet;
        payload.current_goal_id = goalId;
        payload.activity_level = activityLevel;
        payload.gender = gender;
        if (age && parseInt(age, 10)) payload.age = parseInt(age, 10);
        if (height && parseFloat(height)) payload.height_cm = parseFloat(height);
        if (weight && parseFloat(weight)) payload.weight_kg = parseFloat(weight);
        if (selectedAllergens.length > 0) {
          payload.allergen_groups = selectedAllergens;
        }
      }

      await register(payload);
      router.push("/me");
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.code === "AUTH_EMAIL_TAKEN") {
          setErrorMsg("Email này đã được đăng ký tài khoản. Vui lòng đăng nhập hoặc dùng email khác.");
          setStep(1);
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
    window.location.href = authService.getGoogleLoginUrl();
  };

  return (
    <AppShell showRightRail={false}>
      <div className="w-full flex justify-center py-8">
        <Card className="max-w-xl w-full p-6 sm:p-8 shadow-sm">
          {/* Logo Brand Header */}
          <div className="flex flex-col items-center text-center mb-6 select-none">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm flex items-center justify-center text-white mb-3">
              <Leaf className="w-6 h-6 text-white" strokeWidth={1.75} />
            </div>
            <h1 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Tạo tài khoản VeggieHub
            </h1>
            <p className="text-sm text-stone-500 mt-1 max-w-sm">
              Lập thực đơn cá nhân hóa và tính toán calo dinh dưỡng AI — hoàn toàn miễn phí.
            </p>

            {/* Stepper Indicator */}
            <div className="flex items-center gap-2 mt-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  step === 1
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                  1
                </span>
                Tài khoản
              </button>
              <div className="w-6 h-0.5 bg-stone-200" />
              <button
                type="button"
                onClick={() => {
                  if (name && email && password.length >= 8) setStep(2);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                  step === 2
                    ? "bg-emerald-700 text-white shadow-xs cursor-pointer"
                    : "bg-stone-100 text-stone-400 cursor-not-allowed"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px]">
                  2
                </span>
                Hồ sơ sức khỏe & Thể trạng
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMsg}</div>
            </div>
          )}

          {/* ============================================================== */}
          {/* BƯỚC 1: THÔNG TIN TÀI KHOẢN ĐĂNG NHẬP                           */}
          {/* ============================================================== */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Họ và tên
                </label>
                <Input
                  type="text"
                  required
                  icon={<User className="w-4 h-4" />}
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Địa chỉ Email
                </label>
                <Input
                  type="email"
                  required
                  icon={<Mail className="w-4 h-4" />}
                  placeholder="nguyenvana@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Mật khẩu
                </label>
                <Input
                  type="password"
                  required
                  icon={<Lock className="w-4 h-4" />}
                  placeholder="Tối thiểu 8 ký tự"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  Tiếp tục thiết lập hồ sơ dinh dưỡng
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleRegisterSubmit(false)}
                  className="w-full h-9 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Đang đăng ký...
                    </>
                  ) : (
                    "Bỏ qua hồ sơ, tạo tài khoản ngay"
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-stone-400 font-semibold tracking-wider">
                    Hoặc đăng ký bằng
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
                Đăng ký với Google
              </button>
            </form>
          )}

          {/* ============================================================== */}
          {/* BƯỚC 2: HỒ SƠ THỂ TRẠNG & DINH DƯỠNG                           */}
          {/* ============================================================== */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Chế độ ăn chay */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Trường phái ăn chay của bạn
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

              {/* Mục tiêu sức khỏe */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Mục tiêu sức khỏe
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {HEALTH_GOALS.map((g) => {
                    const isSelected = goalId === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGoalId(g.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-xs"
                            : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold text-xs mb-0.5">
                          <span>{g.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                        <p className="text-[10px] text-stone-500 leading-tight">{g.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mức độ vận động */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Mức độ vận động hàng ngày
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ACTIVITY_LEVELS.map((al) => {
                    const isSelected = activityLevel === al.id;
                    return (
                      <button
                        key={al.id}
                        type="button"
                        onClick={() => setActivityLevel(al.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-50/70 text-emerald-950"
                            : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                        }`}
                      >
                        <p className="font-semibold text-xs mb-0.5">{al.label}</p>
                        <p className="text-[10px] text-stone-500 leading-tight">{al.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Thông số cơ thể: Giới tính, Tuổi, Chiều cao, Cân nặng */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                  Chỉ số thể trạng cá nhân
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="block text-[11px] text-stone-500 mb-1 font-medium">Giới tính</span>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full h-10 rounded-xl border border-stone-200 bg-white px-3 text-xs focus:border-emerald-600 outline-none"
                    >
                      {GENDER_OPTIONS.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="block text-[11px] text-stone-500 mb-1 font-medium">Tuổi</span>
                    <Input
                      type="number"
                      min={5}
                      max={120}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="25"
                      className="h-10 text-xs"
                    />
                  </div>

                  <div>
                    <span className="block text-[11px] text-stone-500 mb-1 font-medium">Chiều cao (cm)</span>
                    <Input
                      type="number"
                      min={50}
                      max={250}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="165"
                      className="h-10 text-xs"
                    />
                  </div>

                  <div>
                    <span className="block text-[11px] text-stone-500 mb-1 font-medium">Cân nặng (kg)</span>
                    <Input
                      type="number"
                      min={20}
                      max={250}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="55"
                      className="h-10 text-xs"
                    />
                  </div>
                </div>

                {/* BMI Preview Banner */}
                {bmi && (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>
                        Chỉ số BMI ước tính: <strong>{bmi}</strong>
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      {parseFloat(bmi) < 18.5
                        ? "Hơi gầy"
                        : parseFloat(bmi) < 23
                        ? "Chuẩn cân đối"
                        : parseFloat(bmi) < 25
                        ? "Tiền béo phì"
                        : "Cần giảm mỡ"}
                    </span>
                  </div>
                )}
              </div>

              {/* Nhóm dị ứng thực phẩm */}
              {allergenGroups.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Nhóm nguyên liệu dị ứng (AI tự động loại trừ)
                  </label>
                  <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
                    {allergenGroups.map((ag) => {
                      const isSelected = selectedAllergens.includes(ag.code);
                      return (
                        <button
                          key={ag.code}
                          type="button"
                          onClick={() => toggleAllergen(ag.code)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? "bg-amber-600 text-white shadow-xs"
                              : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                          {ag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                  className="h-11 px-5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleRegisterSubmit(true)}
                  className="flex-1 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-sm font-semibold transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Đang hoàn tất đăng ký...
                    </>
                  ) : (
                    <>
                      Hoàn tất đăng ký tài khoản
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Footer Link */}
          <div className="mt-6 pt-5 border-t border-stone-100 text-center text-sm text-stone-500">
            Đã có tài khoản VeggieHub?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

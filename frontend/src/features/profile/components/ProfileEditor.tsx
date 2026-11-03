"use client";

import React, { useState, useEffect } from "react";
import { UserProfile, Gender, ActivityLevel, HealthGoal, VegetarianType, formatAllergy } from "../types";
import { useProfile } from "../hooks/useProfile";
import {
  ALLERGY_MASTER_LIST,
  HEALTH_GOAL_OPTIONS,
  VEGETARIAN_TYPE_OPTIONS,
  ACTIVITY_LEVEL_OPTIONS,
} from "../data/mockProfile";
import { SYSTEM_INGREDIENTS, SYSTEM_ALLERGEN_GROUPS } from "@/features/recipes/data/systemIngredients";
import { profileService, ALLERGEN_MAP_TO_BACKEND } from "../services/profileService";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { calculateBMI } from "@/features/nutrition/utils/bmi";
import {
  nutritionService,
  ServerNutritionSummary,
  NutritionWarnings,
  CalorieExplanationSection,
} from "@/features/nutrition";
import { Modal } from "@/components/ui/Modal";
import {
  CheckCircle2,
  RotateCcw,
  Target,
  Activity,
  Plus,
  X,
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function ProfileEditor() {
  const { profile, updateProfile, resetProfile } = useProfile();

  const [name, setName] = useState(profile.name || "");
  const [age, setAge] = useState<number | string>(profile.age ?? "");
  const [gender, setGender] = useState<Gender | "">(profile.gender || "");
  const [height, setHeight] = useState<number | string>(profile.height ?? "");
  const [weight, setWeight] = useState<number | string>(profile.weight ?? "");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | "">(profile.activityLevel || "");
  const [healthGoal, setHealthGoal] = useState<HealthGoal | "">(profile.healthGoal || "");
  const [vegetarianType, setVegetarianType] = useState<VegetarianType | "">(profile.vegetarianType || "");
  const [allergies, setAllergies] = useState<string[]>(profile.allergies || []);

  // Free-form allergy input with validation (Cô #13)
  const [customAllergyInput, setCustomAllergyInput] = useState("");
  const [customAllergyError, setCustomAllergyError] = useState<string | null>(null);

  // Server Nutrition Summary (warnings, explanation, target_goal)
  const [serverSummary, setServerSummary] = useState<ServerNutritionSummary | null>(null);

  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveErrors, setSaveErrors] = useState<string[]>([]);
  const setSaveError = (err: string | string[] | null) => {
    if (!err) {
      setSaveErrors([]);
    } else if (Array.isArray(err)) {
      setSaveErrors(err);
    } else {
      setSaveErrors([err]);
    }
  };
  const [showResetModal, setShowResetModal] = useState(false);

  // Helper kiểm tra dị ứng trứng và sữa (hỗ trợ cả mã code lẫn tiếng Việt và text tự do)
  const isEggAllergyItem = (item: string) => {
    const s = item.toLowerCase().trim();
    return (
      s === "egg" ||
      s === "trứng" ||
      s === "trung" ||
      s.includes("trứng") ||
      s.includes("trung")
    );
  };

  const isDairyAllergyItem = (item: string) => {
    const s = item.toLowerCase().trim();
    return (
      s === "dairy" ||
      s === "sữa" ||
      s === "sua" ||
      s === "lactose" ||
      s.includes("sữa") ||
      s.includes("sua") ||
      s.includes("lactose")
    );
  };

  // Loại bỏ số 0 đứng ở đầu khi nhập số (VD: "001" -> "1", "0170" -> "170")
  const cleanNumberInput = (raw: string) => {
    if (!raw) return "";
    if (raw === "0") return "";
    return raw.replace(/^0+(?=\d)/, "");
  };

  // Sync state when profile is fetched from server
  useEffect(() => {
    setName(profile.name || "");
    setAge(profile.age ?? "");
    setGender(profile.gender || "");
    setHeight(profile.height ?? "");
    setWeight(profile.weight ?? "");
    setActivityLevel(profile.activityLevel || "");
    setHealthGoal(profile.healthGoal || "");
    setVegetarianType(profile.vegetarianType || "");

    let baseAllergies = [...(profile.allergies || [])];
    // Nếu đang ở các chế độ tự động né Trứng/Sữa, loại bỏ khỏi danh sách dị ứng hiển thị (không mặc định chọn vào dị ứng)
    if (profile.vegetarianType === "vegan") {
      baseAllergies = baseAllergies.filter((a) => !isEggAllergyItem(a) && !isDairyAllergyItem(a));
    } else if (profile.vegetarianType === "lacto_vegetarian") {
      baseAllergies = baseAllergies.filter((a) => !isEggAllergyItem(a) && !isDairyAllergyItem(a));
    } else if (profile.vegetarianType === "ovo_vegetarian") {
      baseAllergies = baseAllergies.filter((a) => !isEggAllergyItem(a) && !isDairyAllergyItem(a));
    }
    setAllergies(baseAllergies);
  }, [profile]);

  // Load server nutrition summary on mount and when profile changes
  const refreshNutritionSummary = () => {
    nutritionService
      .getServerNutritionSummary()
      .then((data) => setServerSummary(data))
      .catch((err) => {
        console.warn("[ProfileEditor] Could not fetch server nutrition summary:", err);
      });
  };

  useEffect(() => {
    refreshNutritionSummary();
  }, [profile]);

  // Real-time live calculations based on current inputs
  const hasPhysicalMetrics = Number(height) > 0 && Number(weight) > 0;
  const bmiInfo = hasPhysicalMetrics ? calculateBMI(Number(weight), Number(height)) : null;

  const liveProfile: UserProfile = {
    ...profile,
    name,
    age: age ? Number(age) : null,
    gender,
    height: height ? Number(height) : null,
    weight: weight ? Number(weight) : null,
    activityLevel,
    healthGoal,
    vegetarianType,
    allergies,
    target_weight_kg: null,
    target_date: null,
  };

  const hasEggAllergy = allergies.some(isEggAllergyItem);
  const hasDairyAllergy = allergies.some(isDairyAllergyItem);

  // 1. Chiều 1: Kiểm tra dị ứng có bị vô hiệu hóa hoặc mâu thuẫn bởi trường phái ăn chay hiện tại hay không
  // Chế độ Thuần chay làm mờ cả Trứng và Sữa; Chay có sữa làm mờ Trứng; Chay có trứng làm mờ Sữa
  const isAllergyDisabledByDiet = (allergyId: string) => {
    const isEgg = isEggAllergyItem(allergyId);
    const isDairy = isDairyAllergyItem(allergyId);

    // Thuần chay (Vegan): Tự động né cả Trứng và Sữa -> Làm mờ cả hai, không cho chọn vào dị ứng
    if (vegetarianType === "vegan") {
      if (isEgg) return "Chế độ Thuần chay (Vegan) đã tự động né Trứng";
      if (isDairy) return "Chế độ Thuần chay (Vegan) đã tự động né Sữa & Chế phẩm sữa";
    }

    // Chay có sữa (Lacto): Tự động né Trứng -> Làm mờ Trứng; và không cho chọn Sữa vì đang theo chế độ uống sữa
    if (vegetarianType === "lacto_vegetarian") {
      if (isEgg) return "Chế độ Chay có sữa (Lacto) đã tự động né Trứng";
      if (isDairy) return "Bạn đang theo trường phái Chay có sữa (Lacto). Nếu dị ứng Sữa, hãy chuyển sang Thuần chay (Vegan).";
    }

    // Chay có trứng (Ovo): Tự động né Sữa -> Làm mờ Sữa; và không cho chọn Trứng vì đang theo chế độ ăn trứng
    if (vegetarianType === "ovo_vegetarian") {
      if (isDairy) return "Chế độ Chay có trứng (Ovo) đã tự động né Sữa & Chế phẩm sữa";
      if (isEgg) return "Bạn đang theo trường phái Chay có trứng (Ovo). Nếu dị ứng Trứng, hãy chuyển sang Thuần chay (Vegan).";
    }

    if (vegetarianType === "lacto_ovo_vegetarian") {
      // Chay có trứng & sữa: Dùng được cả trứng và sữa, không tự động khóa dị ứng nào
      return null;
    }
    return null;
  };

  // 2. Chiều 2: Kiểm tra trường phái ăn chay có bị vô hiệu hóa do đã chọn dị ứng tương ứng hay không
  // Chuyển chế độ luôn được cho phép vì handleSelectVegetarianType sẽ tự động cân bằng né Trứng/Sữa tương ứng
  const isDietDisabledByAllergy = (_type: VegetarianType | "") => {
    return null;
  };

  // Khi người dùng chọn trường phái ăn chay: Tự động dọn sạch Trứng / Sữa khỏi mảng dị ứng vì hệ thống đã tự động né theo trường phái ăn chay
  const handleSelectVegetarianType = (type: VegetarianType | "") => {
    setVegetarianType(type);
    // Tự động dọn sạch Trứng và Sữa khỏi mảng dị ứng để không bị mặc định chọn
    if (type === "vegan") {
      setAllergies((prev) => prev.filter((a) => !isEggAllergyItem(a) && !isDairyAllergyItem(a)));
    } else if (type === "lacto_vegetarian") {
      setAllergies((prev) => prev.filter((a) => !isEggAllergyItem(a) && !isDairyAllergyItem(a)));
    } else if (type === "ovo_vegetarian") {
      setAllergies((prev) => prev.filter((a) => !isEggAllergyItem(a) && !isDairyAllergyItem(a)));
    } else if (type === "lacto_ovo_vegetarian") {
      setAllergies((prev) => prev.filter((a) => !isEggAllergyItem(a) && !isDairyAllergyItem(a)));
    }
  };

  // Helper lấy các tên nguyên liệu con thuộc một nhóm dị ứng
  const getGroupMemberNames = (groupId: string): string[] => {
    const lower = groupId.toLowerCase();
    const code = ALLERGEN_MAP_TO_BACKEND[lower] || groupId.toUpperCase();
    const groupDef = SYSTEM_ALLERGEN_GROUPS.find(
      (g) => g.code === code || g.code.toLowerCase() === lower
    );
    if (!groupDef) return [];
    return groupDef.ingredient_ids
      .map((id) => SYSTEM_INGREDIENTS.find((i) => i.id === id)?.name.toLowerCase())
      .filter((n): n is string => Boolean(n));
  };

  const toggleAllergy = (allergyId: string) => {
    // Nếu dị ứng bị vô hiệu hóa / làm mờ bởi trường phái ăn chay thì không cho chọn
    const conflictMsg = isAllergyDisabledByDiet(allergyId);
    if (conflictMsg) {
      setSaveError(conflictMsg);
      return;
    }

    const lowerId = allergyId.toLowerCase();
    const memberNames = getGroupMemberNames(lowerId);
    const targetCode = ALLERGEN_MAP_TO_BACKEND[lowerId] || lowerId.toUpperCase();

    setAllergies((prev) => {
      const exists = prev.some((a) => {
        const aLower = a.toLowerCase();
        const aCode = ALLERGEN_MAP_TO_BACKEND[aLower] || aLower.toUpperCase();
        return aLower === lowerId || (targetCode && aCode === targetCode);
      });

      if (exists) {
        // Bỏ chọn nhóm: loại bỏ mã nhóm và bất kỳ nguyên liệu con nào của nhóm đó
        return prev.filter((a) => {
          const aLower = a.toLowerCase();
          const aCode = ALLERGEN_MAP_TO_BACKEND[aLower] || aLower.toUpperCase();
          if (aLower === lowerId) return false;
          if (targetCode && aCode === targetCode) return false;
          if (memberNames.includes(aLower)) return false;
          return true;
        });
      } else {
        // Chọn nhóm: thêm mã nhóm vào và dọn dẹp các nguyên liệu con lẻ (nếu có) để chỉ giữ đúng tên nhóm
        const filtered = prev.filter((a) => {
          const aLower = a.toLowerCase();
          const aCode = ALLERGEN_MAP_TO_BACKEND[aLower] || aLower.toUpperCase();
          if (targetCode && aCode === targetCode) return false;
          if (memberNames.includes(aLower)) return false;
          return true;
        });
        return [...filtered, allergyId];
      }
    });
  };

  // Thêm dị ứng tự do có kiểm tra (phải thuộc danh mục nguyên liệu hệ thống)
  const handleAddCustomAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomAllergyError(null);

    const trimmed = customAllergyInput.trim();
    if (!trimmed) {
      setCustomAllergyError("Vui lòng nhập tên nguyên liệu bạn bị dị ứng.");
      return;
    }

    if (trimmed.length < 2) {
      setCustomAllergyError("Tên nguyên liệu phải có ít nhất 2 ký tự.");
      return;
    }

    if (trimmed.length > 50) {
      setCustomAllergyError("Tên nguyên liệu không được vượt quá 50 ký tự.");
      return;
    }

    const lower = trimmed.toLowerCase();

    // 1. Kiểm tra theo nhóm chuẩn có sẵn (VD gõ "Nấm", "Trứng", "Bắp")
    const matchedMaster = ALLERGY_MASTER_LIST.find(
      (m) => m.label.toLowerCase() === lower || m.id.toLowerCase() === lower
    );

    // 2. Kiểm tra theo danh mục 190 nguyên liệu của hệ thống
    const matchedIngExact = SYSTEM_INGREDIENTS.find((ing) => ing.name.toLowerCase() === lower);
    const matchedIngPrefix = SYSTEM_INGREDIENTS.find((ing) => ing.name.toLowerCase().startsWith(lower));
    const matchedIngSub = SYSTEM_INGREDIENTS.find((ing) => ing.name.toLowerCase().includes(lower));
    const matchedIng = matchedIngExact || (!matchedMaster ? (matchedIngPrefix || matchedIngSub) : null);

    if (!matchedIng && !matchedMaster) {
      setCustomAllergyError(
        `Nguyên liệu "${trimmed}" không có trong danh mục nguyên liệu của hệ thống. Vui lòng chọn nguyên liệu có sẵn.`
      );
      return;
    }

    const canonicalName = matchedIng ? matchedIng.name : matchedMaster!.label;
    const itemToAdd = matchedIng ? matchedIng.name : matchedMaster!.id;

    // Chặn thêm dị ứng mâu thuẫn hoặc đã được tự động né bởi trường phái ăn chay đã chọn
    const isEgg = isEggAllergyItem(canonicalName);
    const isDairy = isDairyAllergyItem(canonicalName);

    if (vegetarianType === "vegan" && (isEgg || isDairy)) {
      setCustomAllergyError("Chế độ Thuần chay (Vegan) đã tự động né cả Trứng và Sữa, bạn không cần thêm vào danh sách dị ứng.");
      return;
    }
    if (vegetarianType === "lacto_vegetarian") {
      if (isEgg) {
        setCustomAllergyError("Chế độ Chay có sữa (Lacto) đã tự động né Trứng, bạn không cần thêm vào danh sách dị ứng.");
        return;
      }
      if (isDairy) {
        setCustomAllergyError("Bạn đang chọn trường phái Chay có sữa (Lacto), không thể chọn dị ứng Sữa.");
        return;
      }
    }
    if (vegetarianType === "ovo_vegetarian") {
      if (isDairy) {
        setCustomAllergyError("Chế độ Chay có trứng (Ovo) đã tự động né Sữa, bạn không cần thêm vào danh sách dị ứng.");
        return;
      }
      if (isEgg) {
        setCustomAllergyError("Bạn đang chọn trường phái Chay có trứng (Ovo), không thể chọn dị ứng Trứng.");
        return;
      }
    }
    if (vegetarianType === "lacto_ovo_vegetarian" && (isEgg || isDairy)) {
      setCustomAllergyError("Bạn đang chọn trường phái Chay có trứng & sữa, không thể chọn dị ứng Trứng/Sữa.");
      return;
    }

    const isExisted = allergies.some((a) => {
      const aLower = a.toLowerCase();
      return aLower === itemToAdd.toLowerCase() || aLower === canonicalName.toLowerCase();
    });
    if (isExisted) {
      setCustomAllergyError(`"${canonicalName}" đã có trong danh sách dị ứng của bạn.`);
      return;
    }

    setAllergies((prev) => [...prev, itemToAdd]);
    setCustomAllergyInput("");
  };

  const handleRemoveAllergy = (item: string) => {
    const lower = item.toLowerCase();
    const memberNames = getGroupMemberNames(lower);
    const targetCode = ALLERGEN_MAP_TO_BACKEND[lower] || lower.toUpperCase();

    setAllergies((prev) =>
      prev.filter((a) => {
        const aLower = a.toLowerCase();
        const aCode = ALLERGEN_MAP_TO_BACKEND[aLower] || aLower.toUpperCase();
        if (aLower === lower) return false;
        if (targetCode && aCode === targetCode) return false;
        if (memberNames.includes(aLower)) return false;
        return true;
      })
    );
  };

  const getAllergyDisplayLabel = (item: string) => {
    const lower = item.toLowerCase();
    const code = ALLERGEN_MAP_TO_BACKEND[lower];

    // 1. Kiểm tra theo danh sách nhóm chuẩn
    const foundMaster = ALLERGY_MASTER_LIST.find((m) => {
      const mLower = m.id.toLowerCase();
      const mCode = ALLERGEN_MAP_TO_BACKEND[mLower];
      return (
        mLower === lower ||
        m.label.toLowerCase() === lower ||
        (code && mCode === code)
      );
    });
    if (foundMaster) return foundMaster.label;

    // 2. Format theo từ điển formatAllergy (tiếng Việt chuẩn)
    const formatted = formatAllergy(item);
    if (formatted && formatted.toLowerCase() !== lower) return formatted;

    // 3. Kiểm tra theo 190 nguyên liệu của hệ thống
    const foundIng = SYSTEM_INGREDIENTS.find(
      (ing) => ing.name.toLowerCase() === lower || String(ing.id) === item
    );
    if (foundIng) return foundIng.name;

    return item;
  };

  const handleDeclareNoAllergies = () => {
    // Nếu chưa chọn dị ứng nào thì không làm gì cả
    if (!allergies || allergies.length === 0) {
      return;
    }
    // Xóa hết dị ứng người dùng đã chọn
    setAllergies([]);
    setCustomAllergyInput("");
    setCustomAllergyError(null);
  };

  const removeEggAllergies = () => {
    setAllergies((prev) => prev.filter((a) => !isEggAllergyItem(a)));
  };

  const removeDairyAllergies = () => {
    setAllergies((prev) => prev.filter((a) => !isDairyAllergyItem(a)));
  };

  const removeBothEggAndDairyAllergies = () => {
    setAllergies((prev) => prev.filter((a) => !isEggAllergyItem(a) && !isDairyAllergyItem(a)));
  };

  // Xác định mâu thuẫn giữa Trường phái ăn chay và Dị ứng kèm giải pháp 1-click
  const vegetarianConflict = (() => {
    if (vegetarianType === "ovo_vegetarian" && hasEggAllergy) {
      return {
        type: "ovo_egg",
        title: "Mâu thuẫn: Chọn ăn chay có trứng nhưng lại chọn dị ứng Trứng",
        description:
          "Bạn đã chọn trường phái 'Chay có trứng (Ovo)' nhưng lại chọn dị ứng 'Trứng'. Người dị ứng trứng không thể tiêu thụ các món chứa trứng gà/vịt.",
        actions: [
          {
            label: "Chuyển sang Thuần chay (Vegan)",
            onClick: () => setVegetarianType("vegan"),
            primary: true,
          },
          {
            label: "Bỏ chọn dị ứng Trứng",
            onClick: removeEggAllergies,
            primary: false,
          },
        ],
      };
    }

    if (vegetarianType === "lacto_vegetarian" && hasDairyAllergy) {
      return {
        type: "lacto_dairy",
        title: "Mâu thuẫn: Chọn ăn chay có sữa nhưng lại chọn dị ứng Sữa",
        description:
          "Bạn đã chọn trường phái 'Chay có sữa (Lacto)' nhưng lại chọn dị ứng 'Sữa & Chế phẩm sữa'. Người dị ứng sữa/lactose không thể tiêu thụ các sản phẩm từ sữa.",
        actions: [
          {
            label: "Chuyển sang Thuần chay (Vegan)",
            onClick: () => setVegetarianType("vegan"),
            primary: true,
          },
          {
            label: "Bỏ chọn dị ứng Sữa",
            onClick: removeDairyAllergies,
            primary: false,
          },
        ],
      };
    }

    if (vegetarianType === "lacto_ovo_vegetarian") {
      if (hasEggAllergy && hasDairyAllergy) {
        return {
          type: "lacto_ovo_both",
          title: "Mâu thuẫn: Chay trứng sữa nhưng dị ứng cả Trứng & Sữa",
          description:
            "Bạn chọn 'Chay có trứng & sữa' nhưng lại dị ứng cả Trứng và Sữa. Chế độ ăn này thực chất tương đương với Thuần chay (Vegan).",
          actions: [
            {
              label: "Chuyển sang Thuần chay (Vegan)",
              onClick: () => setVegetarianType("vegan"),
              primary: true,
            },
            {
              label: "Bỏ chọn dị ứng Trứng & Sữa",
              onClick: removeBothEggAndDairyAllergies,
              primary: false,
            },
          ],
        };
      }
      if (hasEggAllergy) {
        return {
          type: "lacto_ovo_egg",
          title: "Mâu thuẫn: Chay trứng sữa nhưng dị ứng Trứng",
          description:
            "Bạn chọn 'Chay có trứng & sữa' nhưng bị dị ứng Trứng. Vì không thể ăn trứng nhưng vẫn dùng được sữa, trường phái phù hợp nhất của bạn là 'Chay có sữa (Lacto)'.",
          actions: [
            {
              label: "Chuyển sang Chay có sữa (Lacto)",
              onClick: () => setVegetarianType("lacto_vegetarian"),
              primary: true,
            },
            {
              label: "Bỏ chọn dị ứng Trứng",
              onClick: removeEggAllergies,
              primary: false,
            },
          ],
        };
      }
      if (hasDairyAllergy) {
        return {
          type: "lacto_ovo_dairy",
          title: "Mâu thuẫn: Chay trứng sữa nhưng dị ứng Sữa",
          description:
            "Bạn chọn 'Chay có trứng & sữa' nhưng bị dị ứng Sữa. Vì không thể dùng sữa nhưng vẫn ăn được trứng, trường phái phù hợp nhất của bạn là 'Chay có trứng (Ovo)'.",
          actions: [
            {
              label: "Chuyển sang Chay có trứng (Ovo)",
              onClick: () => setVegetarianType("ovo_vegetarian"),
              primary: true,
            },
            {
              label: "Bỏ chọn dị ứng Sữa",
              onClick: removeDairyAllergies,
              primary: false,
            },
          ],
        };
      }
    }

    return null;
  })();

  const isUnderweight = Boolean(bmiInfo && bmiInfo.category === "Underweight");
  const isSevereUnderweight = Boolean(bmiInfo && bmiInfo.bmi < 16.5);
  const isOverweight = Boolean(bmiInfo && bmiInfo.category === "Overweight");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);

    const errors: string[] = [];

    if (!age || Number(age) < 10 || Number(age) > 120) {
      errors.push("Vui lòng nhập độ tuổi hợp lệ (10 - 120 năm).");
    }
    if (!gender) {
      errors.push("Vui lòng chọn giới tính.");
    }
    if (!height || Number(height) < 50 || Number(height) > 250) {
      errors.push("Vui lòng nhập chiều cao hợp lệ (50 - 250 cm).");
    }
    if (!weight || Number(weight) < 20 || Number(weight) > 300) {
      errors.push("Vui lòng nhập cân nặng hợp lệ (20 - 300 kg).");
    }
    if (!activityLevel) {
      errors.push("Vui lòng chọn mức độ vận động.");
    }
    if (!healthGoal) {
      errors.push("Vui lòng chọn mục tiêu sức khỏe.");
    }
    if (!vegetarianType) {
      errors.push("Vui lòng chọn trường phái ăn chay.");
    }

    // Chặn mâu thuẫn thiếu cân nghiêm trọng vs giảm cân
    if (isSevereUnderweight && healthGoal === "lose_weight") {
      errors.push(
        `Chỉ số BMI của bạn là ${bmiInfo?.formattedBMI} (Thiếu cân nghiêm trọng). Hệ thống từ chối áp dụng chế độ Giảm cân vì nguy cơ suy kiệt nguy hiểm đến tính mạng. Vui lòng chuyển sang Tăng cân hoặc Duy trì.`
      );
    } else if (isUnderweight && healthGoal === "lose_weight") {
      errors.push(
        `Chỉ số BMI của bạn là ${bmiInfo?.formattedBMI} (Thiếu cân). Không thể chọn mục tiêu Giảm cân khi đang thiếu cân. Vui lòng chuyển sang Tăng cân hoặc Duy trì vóc dáng để bảo vệ sức khỏe.`
      );
    }

    // Chặn mâu thuẫn giữa trường phái ăn chay và dị ứng
    if (vegetarianConflict) {
      errors.push(
        `Mâu thuẫn chế độ ăn: ${vegetarianConflict.title}. Vui lòng giải quyết mâu thuẫn trước khi lưu.`
      );
    }

    if (errors.length > 0) {
      setSaveErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile(liveProfile);
      setSaved(true);
      refreshNutritionSummary();
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      if (err?.code === "USER_TARGET_DATE_INVALID") {
        setSaveError("Ngày mục tiêu không hợp lệ (phải sau ngày hôm nay).");
      } else if (err?.details && Array.isArray(err.details) && err.details.length > 0) {
        setSaveError(err.details.join(", "));
      } else {
        setSaveError(err?.message || "Không thể cập nhật hồ sơ. Vui lòng kiểm tra lại thông tin.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    // Giữ nguyên tên hiển thị của người dùng
    const currentName = name || profile.name || "";
    setName(currentName);
    setAge("");
    setGender("");
    setHeight("");
    setWeight("");
    setActivityLevel("");
    setHealthGoal("");
    setVegetarianType("");
    setAllergies([]);
    setCustomAllergyInput("");
    setCustomAllergyError(null);
    setSaveError(null);
    setShowResetModal(false);
  };

  const BMI_LABEL_MAP: Record<string, string> = {
    Balanced: "Cân đối",
    Underweight: "Nhẹ cân",
    Overweight: "Thừa cân",
    Obese: "Béo phì",
  };

  const getBmiCategoryLabel = (cat?: string) => {
    if (!cat) return "Chưa đủ chỉ số";
    return BMI_LABEL_MAP[cat] || cat;
  };

  const displayBmi = bmiInfo ? bmiInfo.formattedBMI : (hasPhysicalMetrics && serverSummary?.bmi ? serverSummary.bmi : "—");
  const displayCategory = bmiInfo ? bmiInfo.category : (hasPhysicalMetrics && serverSummary?.bmi_category ? serverSummary.bmi_category : undefined);

  // Calo và macro LẤY TỪ BACKEND (GET /users/me/nutrition-summary), cùng một hàm tính với lúc lập thực đơn,
  // nên số trên trang hồ sơ khớp với thực đơn. Trước đây FE tự tính bằng công thức riêng (sàn 1350 kcal)
  // nên cùng một người có thể thấy hai con số khác nhau. Số mới cập nhật sau khi bấm Lưu.
  const displayCalories =
    hasPhysicalMetrics && serverSummary?.target_calories
      ? `~${serverSummary.target_calories.toLocaleString("vi-VN")} kcal/ngày`
      : "—";

  const displayMacros = serverSummary?.macros;

  return (
    <div className="space-y-6">
      {/* 1. Warnings outside the form (Cô #1, #6, BE update) */}
      {hasPhysicalMetrics && serverSummary?.warnings && serverSummary.warnings.length > 0 && (
        <NutritionWarnings warnings={serverSummary.warnings} />
      )}

      {/* 2. Target Goal & Explanation Breakdown Card */}
      {hasPhysicalMetrics && (
        <CalorieExplanationSection
          explanation={serverSummary?.explanation}
          targetGoal={serverSummary?.target_goal}
          targetCalories={serverSummary?.target_calories}
        />
      )}

      {/* 3. Main Profile Edit Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Live Health Target Highlight */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                CHỈ SỐ TRAO ĐỔI CHẤT & MỤC TIÊU NĂNG LƯỢNG
              </span>
              <div className="flex flex-wrap items-baseline gap-4 mt-1">
                <div>
                  <span className="text-xs text-emerald-200">BMI: </span>
                  <span className="font-serif font-bold text-2xl text-white">
                    {displayBmi}
                  </span>
                  <span className="ml-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-700 text-emerald-100">
                    {getBmiCategoryLabel(displayCategory)}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-emerald-200">Mục tiêu calo: </span>
                  <span className="font-serif font-bold text-2xl text-amber-300">
                    {displayCalories}
                  </span>
                </div>
              </div>

              {hasPhysicalMetrics && displayMacros ? (
                <p className="text-xs text-emerald-100 mt-2">
                  Phân bổ dinh dưỡng:{" "}
                  <strong className="text-white">{displayMacros.protein_g}g Đạm</strong>,{" "}
                  <strong className="text-white">{displayMacros.carbs_g}g Tinh bột</strong>,{" "}
                  <strong className="text-white">{displayMacros.fat_g}g Chất béo</strong>
                </p>
              ) : (
                <p className="text-xs text-emerald-200/90 mt-2 italic">
                  Vui lòng nhập chiều cao, cân nặng và các mục tiêu bên dưới để hệ thống tính toán chỉ số dinh dưỡng.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 1: Physical Metrics */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-600" />
              1. Chỉ số thể trạng cá nhân
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên của bạn"
                  className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tuổi (10 - 120 năm) *
                </label>
                <input
                  type="number"
                  min="10"
                  max="120"
                  required
                  placeholder="VD: 25"
                  value={age}
                  onChange={(e) => setAge(cleanNumberInput(e.target.value))}
                  className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Giới tính *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  required
                  className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                >
                  <option value="">-- Chọn giới tính --</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Chiều cao (50 - 250 cm) *
                </label>
                <input
                  type="number"
                  min="50"
                  max="250"
                  required
                  placeholder="VD: 165"
                  value={height}
                  onChange={(e) => setHeight(cleanNumberInput(e.target.value))}
                  className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Cân nặng hiện tại (20 - 300 kg) *
                </label>
                <input
                  type="number"
                  min="20"
                  max="300"
                  step="any"
                  required
                  placeholder="VD: 55"
                  value={weight}
                  onChange={(e) => setWeight(cleanNumberInput(e.target.value))}
                  className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Mức độ vận động *
              </label>
              <div className="space-y-1.5">
                {ACTIVITY_LEVEL_OPTIONS.map((lvl) => (
                  <label
                    key={lvl.id}
                    className={`flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer transition-all ${activityLevel === lvl.id
                      ? "border-emerald-600 bg-emerald-50/70"
                      : "border-stone-200 hover:bg-stone-50"
                      }`}
                  >
                    <input
                      type="radio"
                      name="activityLevel"
                      value={lvl.id}
                      checked={activityLevel === lvl.id}
                      onChange={() => setActivityLevel(lvl.id)}
                      className="mt-1 accent-emerald-600"
                    />
                    <div>
                      <span className="text-xs font-semibold text-stone-900">{lvl.label}</span>
                      <p className="text-[11px] text-stone-500">{lvl.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Dietary Preferences, Target Goal & Allergies */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-2 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-600" />
              2. Mục tiêu & Chế độ ăn uống
            </h3>

            {/* Health Goal */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Mục tiêu sức khỏe *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {HEALTH_GOAL_OPTIONS.map((g) => {
                  const isLoseWeight = g.id === "lose_weight";
                  const isGainWeight = g.id === "gain_weight";
                  const isMaintainWeight = g.id === "maintain_weight";
                  const isSelected = healthGoal === g.id;

                  // Chỉ hiển thị trạng thái cảnh báo khi mục tiêu đó ĐƯỢC CHỌN (tránh cảnh báo mặc định khi chưa chọn)
                  let badge = null;
                  let cardStyle = "border-stone-200 text-stone-700 hover:bg-stone-50";

                  if (isSelected) {
                    if (isLoseWeight && isSevereUnderweight) {
                      cardStyle = "border-red-500 bg-red-50 text-red-950 font-bold";
                      badge = (
                        <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded shrink-0">
                          Nguy hiểm
                        </span>
                      );
                    } else if (isLoseWeight && isUnderweight) {
                      cardStyle = "border-amber-500 bg-amber-50 text-amber-950 font-bold";
                      badge = (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                          Không khuyên dùng
                        </span>
                      );
                    } else if (isGainWeight && isOverweight) {
                      cardStyle = "border-amber-500 bg-amber-50 text-amber-950 font-bold";
                      badge = (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                          Không phù hợp
                        </span>
                      );
                    } else if (isMaintainWeight && isSevereUnderweight) {
                      cardStyle = "border-red-500 bg-red-50 text-red-950 font-bold";
                      badge = (
                        <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded shrink-0">
                          Không an toàn
                        </span>
                      );
                    } else if (isMaintainWeight && isUnderweight) {
                      cardStyle = "border-amber-500 bg-amber-50 text-amber-950 font-bold";
                      badge = (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                          Không phù hợp
                        </span>
                      );
                    } else if (isMaintainWeight && isOverweight) {
                      cardStyle = "border-amber-500 bg-amber-50 text-amber-950 font-bold";
                      badge = (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                          Không phù hợp
                        </span>
                      );
                    } else {
                      cardStyle = "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold";
                      if (isGainWeight && isUnderweight) {
                        badge = (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                            Khuyên dùng
                          </span>
                        );
                      } else if (isLoseWeight && isOverweight) {
                        badge = (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                            Khuyên dùng
                          </span>
                        );
                      } else if (g.id === "healthy_eating") {
                        badge = (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                            Cân bằng
                          </span>
                        );
                      }
                    }
                  }

                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setHealthGoal(g.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer relative ${cardStyle}`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-semibold">{g.label}</p>
                        {badge}
                      </div>
                      <p className="text-[10px] text-stone-500 mt-0.5">{g.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cảnh báo mâu thuẫn trực tiếp giữa BMI và mục tiêu sức khỏe kèm 1-click giải pháp */}
            {bmiInfo && (() => {
              const hasConflict =
                (isUnderweight && healthGoal === "lose_weight") ||
                (isUnderweight && healthGoal === "maintain_weight") ||
                (isOverweight && healthGoal === "gain_weight") ||
                (isOverweight && healthGoal === "maintain_weight");

              if (!hasConflict) return null;

              // Trường hợp 1: Thiếu cân nghiêm trọng (BMI < 16.5) mà chọn Giảm cân
              if (isSevereUnderweight && healthGoal === "lose_weight") {
                return (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-950 space-y-2.5 animate-in fade-in">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="space-y-1.5 flex-1">
                        <span className="text-xs font-bold text-red-900 block">
                          Báo động sức khỏe: Thể trạng thiếu cân nghiêm trọng (BMI {bmiInfo.formattedBMI} &lt; 16.5)
                        </span>
                        <p className="text-[11px] leading-relaxed text-red-800">
                          Chỉ số BMI hiện tại của bạn là <strong>{bmiInfo.formattedBMI}</strong> (Mức suy dinh dưỡng nặng, dưới ngưỡng an toàn 18.5 rất nhiều). Việc nạp thâm hụt calo để <strong>Giảm cân</strong> lúc này sẽ làm suy kiệt cơ bắp, rối loạn trao đổi chất và suy giảm miễn dịch nghiêm trọng. Hệ thống yêu cầu bạn chọn chế độ dinh dưỡng an toàn hơn để bảo vệ sức khỏe.
                        </p>
                        <div className="pt-1">

                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Trường hợp 2: Thiếu cân nhẹ/vừa (16.5 <= BMI < 18.5) mà chọn Giảm cân
              if (isUnderweight && healthGoal === "lose_weight") {
                return (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2 animate-in fade-in">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1.5 flex-1">
                        <span className="text-xs font-bold text-amber-900 block">
                          Cảnh báo dinh dưỡng: Đang thiếu cân nhưng chọn Giảm cân
                        </span>
                        <p className="text-[11px] leading-relaxed text-amber-800">
                          Chỉ số BMI hiện tại của bạn là <strong>{bmiInfo.formattedBMI}</strong> (Thiếu cân). Thâm hụt calo trong lúc thiếu cân có thể gây mệt mỏi, suy nhược và thiếu hụt vi chất. Khuyến nghị bạn nên chuyển sang mục tiêu <strong>Tăng cơ / Tăng cân</strong> để đạt thể trạng cân đối trước.
                        </p>
                        <div className="pt-1">

                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Trường hợp 3: Quá nhẹ cân / Thiếu cân nghiêm trọng (BMI < 16.5) mà chọn Duy trì vóc dáng
              if (isSevereUnderweight && healthGoal === "maintain_weight") {
                return (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-950 space-y-2.5 animate-in fade-in">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="space-y-1.5 flex-1">
                        <span className="text-xs font-bold text-red-900 block">
                          Cảnh báo sức khỏe: Thể trạng quá nhẹ cân (BMI {bmiInfo.formattedBMI} &lt; 16.5) không nên chọn Duy trì vóc dáng
                        </span>
                        <p className="text-[11px] leading-relaxed text-red-800">
                          Chỉ số BMI hiện tại của bạn là <strong>{bmiInfo.formattedBMI}</strong> (Mức thiếu cân nghiêm trọng, thấp hơn nhiều so với ngưỡng an toàn 18.5). Việc chọn <strong>Duy trì vóc dáng</strong> ở mức thể trạng này là không hợp lý và không an toàn vì cơ thể đang trong tình trạng suy kiệt dinh dưỡng, giảm sức đề kháng và có nguy cơ ảnh hưởng xấu đến sức khỏe lâu dài. Khuyến nghị bạn nên chọn mục tiêu <strong>Tăng cơ / Tăng cân</strong> để nạp đủ năng lượng và hồi phục thể trạng an toàn.
                        </p>
                        <div className="pt-1">

                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Trường hợp 4: Thiếu cân (16.5 <= BMI < 18.5) mà chọn Duy trì vóc dáng
              if (isUnderweight && healthGoal === "maintain_weight") {
                return (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2 animate-in fade-in">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1.5 flex-1">
                        <span className="text-xs font-bold text-amber-900 block">
                          Cảnh báo dinh dưỡng: Thể trạng nhẹ cân nhưng chọn Duy trì vóc dáng
                        </span>
                        <p className="text-[11px] leading-relaxed text-amber-800">
                          Chỉ số BMI hiện tại của bạn là <strong>{bmiInfo.formattedBMI}</strong> (Thể trạng thiếu cân, dưới mức chuẩn 18.5). Việc chọn <strong>Duy trì vóc dáng</strong> ở mức này không thực sự hợp lý vì cơ thể cần đạt ngưỡng cân đối (BMI từ 18.5 - 22.9) để đảm bảo mật độ xương, cơ bắp và hệ miễn dịch tối ưu. Bạn nên chuyển sang mục tiêu <strong>Tăng cơ / Tăng cân</strong> để xây dựng thực đơn giàu dinh dưỡng hơn.
                        </p>
                        <div className="pt-1">

                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Trường hợp 5: Thừa cân nhưng chọn Tăng cân
              if (isOverweight && healthGoal === "gain_weight") {
                return (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2 animate-in fade-in">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1.5 flex-1">
                        <span className="text-xs font-bold text-amber-900 block">
                          Cảnh báo dinh dưỡng: Thể trạng thừa cân nhưng chọn Tăng cân
                        </span>
                        <p className="text-[11px] leading-relaxed text-amber-800">
                          Chỉ số BMI hiện tại của bạn là <strong>{bmiInfo.formattedBMI}</strong> (Thừa cân / Béo phì). Việc nạp calo thặng dư để tăng cân có thể gia tăng mỡ nội tạng và áp lực lên tim mạch.
                        </p>
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setHealthGoal("lose_weight")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                            Chuyển sang mục tiêu: Giảm cân lành mạnh
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Trường hợp 6: Thừa cân nhưng chọn Duy trì vóc dáng
              if (isOverweight && healthGoal === "maintain_weight") {
                return (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2 animate-in fade-in">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1.5 flex-1">
                        <span className="text-xs font-bold text-amber-900 block">
                          Cảnh báo dinh dưỡng: Thể trạng thừa cân nhưng chọn Duy trì vóc dáng
                        </span>
                        <p className="text-[11px] leading-relaxed text-amber-800">
                          Chỉ số BMI hiện tại của bạn là <strong>{bmiInfo.formattedBMI}</strong> (Thừa cân / Béo phì). Việc duy trì mức cân nặng này không phù hợp vì có thể duy trì áp lực lên hệ xương khớp, tim mạch và nguy cơ rối loạn chuyển hóa. Khuyến nghị bạn nên chọn mục tiêu <strong>Giảm cân lành mạnh</strong> để đưa cân nặng về ngưỡng chuẩn an toàn (BMI 18.5 - 22.9).
                        </p>
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setHealthGoal("lose_weight")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                            Chuyển sang mục tiêu: Giảm cân lành mạnh
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })()}

            {/* Vegetarian Type */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Trường phái ăn chay *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {VEGETARIAN_TYPE_OPTIONS.map((v) => {
                  const isSelected = vegetarianType === v.id;
                  const disabledReason = isDietDisabledByAllergy(v.id);
                  const isDisabled = Boolean(disabledReason);

                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={isDisabled}
                      title={disabledReason || undefined}
                      onClick={() => !isDisabled && handleSelectVegetarianType(v.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all relative ${isDisabled
                        ? "border-stone-200 bg-stone-100/70 text-stone-400 cursor-not-allowed opacity-50"
                        : isSelected
                          ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold cursor-pointer"
                          : "border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <p className={`font-semibold ${isDisabled ? "text-stone-400" : ""}`}>{v.label}</p>
                        {isDisabled && (
                          <span className="text-[10px] font-semibold text-stone-500 bg-stone-200/80 px-1.5 py-0.5 rounded shrink-0">
                            Khóa do dị ứng
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-500 mt-0.5">{v.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Thông báo quy tắc né Trứng / Sữa theo trường phái ăn chay */}
              {vegetarianType && (
                <div className="mt-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs space-y-1 animate-in fade-in">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      {vegetarianType === "vegan" && (
                        <>
                          <p className="font-bold text-emerald-900">
                            Thuần chay (Vegan): Tự động né Trứng và Sữa
                          </p>
                          <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
                            Hệ thống tự động loại trừ mọi món ăn và nguyên liệu có chứa Trứng, Sữa hoặc chế phẩm từ sữa khi gợi ý món và tạo thực đơn. Bạn không cần chọn Trứng / Sữa ở mục dị ứng.
                          </p>
                        </>
                      )}
                      {vegetarianType === "lacto_vegetarian" && (
                        <>
                          <p className="font-bold text-emerald-900">
                            Chay có sữa (Lacto): Tự động né Trứng — Dùng được Sữa
                          </p>
                          <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
                            Hệ thống tự động loại trừ mọi món ăn có chứa Trứng gà / vịt; cho phép bạn tiêu thụ sữa tươi, sữa chua, phô mai và các chế phẩm từ sữa.
                          </p>
                        </>
                      )}
                      {vegetarianType === "ovo_vegetarian" && (
                        <>
                          <p className="font-bold text-emerald-900">
                            Chay có trứng (Ovo): Tự động né Sữa — Dùng được Trứng
                          </p>
                          <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
                            Hệ thống tự động loại trừ mọi món ăn có chứa Sữa &amp; chế phẩm từ sữa; cho phép bạn tiêu thụ trứng gà, trứng vịt.
                          </p>
                        </>
                      )}
                      {vegetarianType === "lacto_ovo_vegetarian" && (
                        <>
                          <p className="font-bold text-emerald-900">
                            Chay có trứng &amp; sữa (Ovo-Lacto): Dùng được cả Trứng và Sữa
                          </p>
                          <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
                            Chế độ này cho phép tiêu thụ cả Trứng và Sữa (không cần né gì mặc định). Nếu bạn có dị ứng thực phẩm cụ thể (đậu phộng, đậu nành, gluten...), hệ thống vẫn né theo danh sách dị ứng bên dưới.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Hộp thông báo mâu thuẫn giữa Trường phái ăn chay và Dị ứng kèm giải pháp 1-click */}
              {vegetarianConflict && (
                <div className="mt-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2 animate-in fade-in">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <span className="text-xs font-bold text-amber-900">
                        {vegetarianConflict.title}
                      </span>
                      <p className="text-[11px] leading-relaxed text-amber-800">
                        {vegetarianConflict.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Allergies & Free text input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-stone-700">
                  Dị ứng thực phẩm / Cần tránh
                </label>
                <button
                  type="button"
                  onClick={handleDeclareNoAllergies}
                  className={`text-[11px] font-semibold transition-colors ${allergies && allergies.length > 0
                    ? "text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                    : "text-stone-400 cursor-default"
                    }`}
                  title={allergies && allergies.length > 0 ? "Bỏ chọn tất cả dị ứng" : "Chưa chọn dị ứng nào"}
                >
                  Tôi không dị ứng gì
                </button>
              </div>
              <p className="text-[11px] text-stone-500 mb-2">
                Chọn các nhóm có sẵn hoặc nhập tự do nguyên liệu bạn dị ứng để AI tự động loại trừ.
              </p>

              {/* Master allergy list tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {ALLERGY_MASTER_LIST.map((item) => {
                  const itemCode = ALLERGEN_MAP_TO_BACKEND[item.id.toLowerCase()];
                  const isSelected = allergies.some((a) => {
                    const aLower = a.toLowerCase();
                    const aCode = ALLERGEN_MAP_TO_BACKEND[aLower];
                    return (
                      aLower === item.id.toLowerCase() ||
                      aLower === item.label.toLowerCase() ||
                      (itemCode && aCode === itemCode)
                    );
                  });
                  const disabledReason = isAllergyDisabledByDiet(item.id);
                  const isDisabled = Boolean(disabledReason);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isDisabled}
                      title={disabledReason || undefined}
                      onClick={() => !isDisabled && toggleAllergy(item.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${isDisabled
                        ? "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed opacity-50"
                        : isSelected
                          ? "bg-amber-100 text-amber-900 border border-amber-300 ring-1 ring-amber-300 shadow-2xs cursor-pointer"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200 cursor-pointer"
                        }`}
                    >
                      {isDisabled ? `${item.label} (Không khả dụng)` : isSelected ? `⚠ ${item.label}` : item.label}
                    </button>
                  );
                })}
              </div>

              {/* Free-form allergy input form (Cô #13) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customAllergyInput}
                    onChange={(e) => {
                      setCustomAllergyInput(e.target.value);
                      if (customAllergyError) setCustomAllergyError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomAllergy(e);
                      }
                    }}
                    placeholder="Nhập tên nguyên liệu dị ứng (VD: Muối, Cà chua, Nấm rơm...)"
                    className="flex-1 h-9 rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs focus:bg-white focus:border-emerald-600 outline-none"
                  />

                  <button
                    type="button"
                    onClick={handleAddCustomAllergy}
                    className="h-9 px-3.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Thêm
                  </button>
                </div>

                {customAllergyError && (
                  <p className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {customAllergyError}
                  </p>
                )}

                {/* Danh sách dị ứng tự do đã thêm */}
                {allergies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="text-[11px] text-stone-400 self-center mr-1">Đã chọn:</span>
                    {allergies.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200"
                      >
                        ⚠ {getAllergyDisplayLabel(item)}
                        <button
                          type="button"
                          onClick={() => handleRemoveAllergy(item)}
                          className="hover:text-red-700 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Actions Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Làm trống để nhập lại
          </button>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
            {saveErrors.length > 0 && (
              <div className="flex flex-col gap-1 items-end sm:items-start text-xs text-red-600 font-semibold animate-in fade-in max-w-xl">
                {saveErrors.map((err, idx) => (
                  <span key={idx} className="flex items-start gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{err}</span>
                  </span>
                ))}
              </div>
            )}
            {saved && (
              <span className="flex items-center gap-1 text-xs text-emerald-700 font-bold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Đã cập nhật hồ sơ & tính toán lại dinh dưỡng!
              </span>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="h-11 px-8 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              {isSaving ? "Đang lưu thay đổi..." : "Lưu hồ sơ & Cập nhật kế hoạch"}
            </button>
          </div>
        </div>

        {/* Modal xác nhận làm trống thông tin */}
        <Modal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          title="Làm trống thông tin hồ sơ"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900 text-sm">
                  Bạn có chắc chắn muốn làm trống các chỉ số thể trạng?
                </p>
                <p className="mt-1 text-amber-800">
                  Tất cả các thông số như độ tuổi, giới tính, chiều cao, cân nặng, mức vận động, mục tiêu và dị ứng sẽ được xóa trống để bạn nhập lại từ đầu.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={confirmReset}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors cursor-pointer"
              >
                Xác nhận làm trống
              </button>
            </div>
          </div>
        </Modal>
      </form>
    </div>
  );
}

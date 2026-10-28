(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/profile/components/ProfileEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfileEditor",
    ()=>ProfileEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/hooks/useProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$data$2f$mockProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/data/mockProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$bmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/utils/bmi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/nutrition/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$services$2f$nutritionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/services/nutritionService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$components$2f$NutritionWarnings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/components/NutritionWarnings.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$components$2f$CalorieExplanationSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/components/CalorieExplanationSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.mjs [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.mjs [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function ProfileEditor() {
    _s();
    const { profile, updateProfile, resetProfile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"])();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile.name || "");
    const [age, setAge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile.age ?? "");
    const [gender, setGender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile.gender || "");
    const [height, setHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile.height ?? "");
    const [weight, setWeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile.weight ?? "");
    const [activityLevel, setActivityLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile.activityLevel || "");
    const [healthGoal, setHealthGoal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile.healthGoal || "");
    const [vegetarianType, setVegetarianType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile.vegetarianType || "");
    const [allergies, setAllergies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile.allergies || []);
    // New fields from BE: Target weight and target date
    const [targetWeightKg, setTargetWeightKg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile.target_weight_kg ?? "");
    const [targetDate, setTargetDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(profile.target_date ? profile.target_date.split("T")[0] : "");
    // Free-form allergy input with validation (Cô #13)
    const [customAllergyInput, setCustomAllergyInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [customAllergyError, setCustomAllergyError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Server Nutrition Summary (warnings, explanation, target_goal)
    const [serverSummary, setServerSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveErrors, setSaveErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const setSaveError = (err)=>{
        if (!err) {
            setSaveErrors([]);
        } else if (Array.isArray(err)) {
            setSaveErrors(err);
        } else {
            setSaveErrors([
                err
            ]);
        }
    };
    const [showResetModal, setShowResetModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Tomorrow's date for target_date min attribute (YYYY-MM-DD)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minTargetDate = tomorrow.toISOString().split("T")[0];
    // Loại bỏ số 0 đứng ở đầu khi nhập số (VD: "001" -> "1", "0170" -> "170")
    const cleanNumberInput = (raw)=>{
        if (!raw) return "";
        if (raw === "0") return "";
        return raw.replace(/^0+(?=\d)/, "");
    };
    // Sync state when profile is fetched from server
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfileEditor.useEffect": ()=>{
            setName(profile.name || "");
            setAge(profile.age ?? "");
            setGender(profile.gender || "");
            setHeight(profile.height ?? "");
            setWeight(profile.weight ?? "");
            setActivityLevel(profile.activityLevel || "");
            setHealthGoal(profile.healthGoal || "");
            setVegetarianType(profile.vegetarianType || "");
            setAllergies(profile.allergies || []);
            setTargetWeightKg(profile.target_weight_kg ?? "");
            setTargetDate(profile.target_date ? profile.target_date.split("T")[0] : "");
        }
    }["ProfileEditor.useEffect"], [
        profile
    ]);
    // Load server nutrition summary on mount and when profile changes
    const refreshNutritionSummary = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$services$2f$nutritionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nutritionService"].getServerNutritionSummary().then((data)=>setServerSummary(data)).catch((err)=>{
            console.warn("[ProfileEditor] Could not fetch server nutrition summary:", err);
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfileEditor.useEffect": ()=>{
            refreshNutritionSummary();
        }
    }["ProfileEditor.useEffect"], [
        profile
    ]);
    // Real-time live calculations based on current inputs
    const hasPhysicalMetrics = Number(height) > 0 && Number(weight) > 0;
    const bmiInfo = hasPhysicalMetrics ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$bmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateBMI"])(Number(weight), Number(height)) : null;
    const liveProfile = {
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
        target_weight_kg: targetWeightKg ? Number(targetWeightKg) : null,
        target_date: targetDate ? targetDate : null
    };
    // Helper kiểm tra dị ứng trứng và sữa (hỗ trợ cả mã code lẫn tiếng Việt và text tự do)
    const isEggAllergyItem = (item)=>{
        const s = item.toLowerCase().trim();
        return s === "egg" || s === "trứng" || s === "trung" || s.includes("trứng") || s.includes("trung");
    };
    const isDairyAllergyItem = (item)=>{
        const s = item.toLowerCase().trim();
        return s === "dairy" || s === "sữa" || s === "sua" || s === "lactose" || s.includes("sữa") || s.includes("sua") || s.includes("lactose");
    };
    const hasEggAllergy = allergies.some(isEggAllergyItem);
    const hasDairyAllergy = allergies.some(isDairyAllergyItem);
    // 1. Chiều 1: Kiểm tra dị ứng có bị vô hiệu hóa bởi trường phái ăn chay hiện tại hay không
    const isAllergyDisabledByDiet = (allergyId)=>{
        const isEgg = isEggAllergyItem(allergyId);
        const isDairy = isDairyAllergyItem(allergyId);
        if (vegetarianType === "ovo_vegetarian" && isEgg) {
            return "Không thể chọn do bạn đang theo trường phái Chay có trứng (Ovo)";
        }
        if (vegetarianType === "lacto_vegetarian" && isDairy) {
            return "Không thể chọn do bạn đang theo trường phái Chay có sữa (Lacto)";
        }
        if (vegetarianType === "lacto_ovo_vegetarian") {
            if (isEgg) return "Không thể chọn do bạn đang theo trường phái Chay có trứng & sữa";
            if (isDairy) return "Không thể chọn do bạn đang theo trường phái Chay có trứng & sữa";
        }
        return null;
    };
    // 2. Chiều 2: Kiểm tra trường phái ăn chay có bị vô hiệu hóa do đã chọn dị ứng tương ứng hay không
    const isDietDisabledByAllergy = (type)=>{
        if (type === "ovo_vegetarian" && hasEggAllergy) {
            return "Không thể chọn do bạn đã chọn dị ứng Trứng";
        }
        if (type === "lacto_vegetarian" && hasDairyAllergy) {
            return "Không thể chọn do bạn đã chọn dị ứng Sữa & Chế phẩm sữa";
        }
        if (type === "lacto_ovo_vegetarian") {
            if (hasEggAllergy && hasDairyAllergy) {
                return "Không thể chọn do bạn đã chọn dị ứng cả Trứng và Sữa";
            }
            if (hasEggAllergy) {
                return "Không thể chọn do bạn đã chọn dị ứng Trứng";
            }
            if (hasDairyAllergy) {
                return "Không thể chọn do bạn đã chọn dị ứng Sữa & Chế phẩm sữa";
            }
        }
        return null;
    };
    // Khi người dùng chọn trường phái ăn chay: tự động loại bỏ các dị ứng bị mâu thuẫn để tránh xung đột
    const handleSelectVegetarianType = (type)=>{
        if (isDietDisabledByAllergy(type)) {
            return;
        }
        setVegetarianType(type);
        if (type === "ovo_vegetarian") {
            setAllergies((prev)=>prev.filter((a)=>!isEggAllergyItem(a)));
        } else if (type === "lacto_vegetarian") {
            setAllergies((prev)=>prev.filter((a)=>!isDairyAllergyItem(a)));
        } else if (type === "lacto_ovo_vegetarian") {
            setAllergies((prev)=>prev.filter((a)=>!isEggAllergyItem(a) && !isDairyAllergyItem(a)));
        }
    };
    const toggleAllergy = (allergyId)=>{
        // Nếu dị ứng bị vô hiệu hóa bởi trường phái ăn chay thì không cho chọn
        if (isAllergyDisabledByDiet(allergyId)) {
            return;
        }
        setAllergies((prev)=>{
            const exists = prev.some((a)=>a.toLowerCase() === allergyId.toLowerCase());
            if (exists) {
                return prev.filter((a)=>a.toLowerCase() !== allergyId.toLowerCase());
            } else {
                return [
                    ...prev,
                    allergyId
                ];
            }
        });
    };
    // Thêm dị ứng tự do có kiểm tra (Cô #13)
    const handleAddCustomAllergy = (e)=>{
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
        if (!/^[\p{L}\p{N}\s,\-_]+$/u.test(trimmed)) {
            setCustomAllergyError("Tên nguyên liệu chỉ được chứa chữ cái, số và khoảng trắng.");
            return;
        }
        // Chặn thêm dị ứng mâu thuẫn với trường phái ăn chay đã chọn
        if (isEggAllergyItem(trimmed) && (vegetarianType === "ovo_vegetarian" || vegetarianType === "lacto_ovo_vegetarian")) {
            setCustomAllergyError("Bạn đang chọn trường phái ăn chay có trứng, không thể chọn dị ứng Trứng.");
            return;
        }
        if (isDairyAllergyItem(trimmed) && (vegetarianType === "lacto_vegetarian" || vegetarianType === "lacto_ovo_vegetarian")) {
            setCustomAllergyError("Bạn đang chọn trường phái ăn chay có sữa, không thể chọn dị ứng Sữa.");
            return;
        }
        const lower = trimmed.toLowerCase();
        const isExisted = allergies.some((a)=>a.toLowerCase() === lower);
        if (isExisted) {
            setCustomAllergyError(`"${trimmed}" đã có trong danh sách dị ứng của bạn.`);
            return;
        }
        setAllergies((prev)=>[
                ...prev,
                trimmed
            ]);
        setCustomAllergyInput("");
    };
    const handleRemoveAllergy = (item)=>{
        setAllergies((prev)=>prev.filter((a)=>!item || a.toLowerCase() !== item.toLowerCase()));
    };
    const getAllergyDisplayLabel = (item)=>{
        const found = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$data$2f$mockProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALLERGY_MASTER_LIST"].find((m)=>m.id.toLowerCase() === item.toLowerCase() || m.label.toLowerCase() === item.toLowerCase());
        return found ? found.label : item;
    };
    const handleDeclareNoAllergies = ()=>{
        setAllergies([]);
        setCustomAllergyInput("");
        setCustomAllergyError(null);
    };
    const removeEggAllergies = ()=>{
        setAllergies((prev)=>prev.filter((a)=>!isEggAllergyItem(a)));
    };
    const removeDairyAllergies = ()=>{
        setAllergies((prev)=>prev.filter((a)=>!isDairyAllergyItem(a)));
    };
    const removeBothEggAndDairyAllergies = ()=>{
        setAllergies((prev)=>prev.filter((a)=>!isEggAllergyItem(a) && !isDairyAllergyItem(a)));
    };
    // Xác định mâu thuẫn giữa Trường phái ăn chay và Dị ứng kèm giải pháp 1-click
    const vegetarianConflict = (()=>{
        if (vegetarianType === "ovo_vegetarian" && hasEggAllergy) {
            return {
                type: "ovo_egg",
                title: "Mâu thuẫn: Chọn ăn chay có trứng nhưng lại chọn dị ứng Trứng",
                description: "Bạn đã chọn trường phái 'Chay có trứng (Ovo)' nhưng lại chọn dị ứng 'Trứng'. Người dị ứng trứng không thể tiêu thụ các món chứa trứng gà/vịt.",
                actions: [
                    {
                        label: "Chuyển sang Thuần chay (Vegan)",
                        onClick: ()=>setVegetarianType("vegan"),
                        primary: true
                    },
                    {
                        label: "Bỏ chọn dị ứng Trứng",
                        onClick: removeEggAllergies,
                        primary: false
                    }
                ]
            };
        }
        if (vegetarianType === "lacto_vegetarian" && hasDairyAllergy) {
            return {
                type: "lacto_dairy",
                title: "Mâu thuẫn: Chọn ăn chay có sữa nhưng lại chọn dị ứng Sữa",
                description: "Bạn đã chọn trường phái 'Chay có sữa (Lacto)' nhưng lại chọn dị ứng 'Sữa & Chế phẩm sữa'. Người dị ứng sữa/lactose không thể tiêu thụ các sản phẩm từ sữa.",
                actions: [
                    {
                        label: "Chuyển sang Thuần chay (Vegan)",
                        onClick: ()=>setVegetarianType("vegan"),
                        primary: true
                    },
                    {
                        label: "Bỏ chọn dị ứng Sữa",
                        onClick: removeDairyAllergies,
                        primary: false
                    }
                ]
            };
        }
        if (vegetarianType === "lacto_ovo_vegetarian") {
            if (hasEggAllergy && hasDairyAllergy) {
                return {
                    type: "lacto_ovo_both",
                    title: "Mâu thuẫn: Chay trứng sữa nhưng dị ứng cả Trứng & Sữa",
                    description: "Bạn chọn 'Chay có trứng & sữa' nhưng lại dị ứng cả Trứng và Sữa. Chế độ ăn này thực chất tương đương với Thuần chay (Vegan).",
                    actions: [
                        {
                            label: "Chuyển sang Thuần chay (Vegan)",
                            onClick: ()=>setVegetarianType("vegan"),
                            primary: true
                        },
                        {
                            label: "Bỏ chọn dị ứng Trứng & Sữa",
                            onClick: removeBothEggAndDairyAllergies,
                            primary: false
                        }
                    ]
                };
            }
            if (hasEggAllergy) {
                return {
                    type: "lacto_ovo_egg",
                    title: "Mâu thuẫn: Chay trứng sữa nhưng dị ứng Trứng",
                    description: "Bạn chọn 'Chay có trứng & sữa' nhưng bị dị ứng Trứng. Vì không thể ăn trứng nhưng vẫn dùng được sữa, trường phái phù hợp nhất của bạn là 'Chay có sữa (Lacto)'.",
                    actions: [
                        {
                            label: "Chuyển sang Chay có sữa (Lacto)",
                            onClick: ()=>setVegetarianType("lacto_vegetarian"),
                            primary: true
                        },
                        {
                            label: "Bỏ chọn dị ứng Trứng",
                            onClick: removeEggAllergies,
                            primary: false
                        }
                    ]
                };
            }
            if (hasDairyAllergy) {
                return {
                    type: "lacto_ovo_dairy",
                    title: "Mâu thuẫn: Chay trứng sữa nhưng dị ứng Sữa",
                    description: "Bạn chọn 'Chay có trứng & sữa' nhưng bị dị ứng Sữa. Vì không thể dùng sữa nhưng vẫn ăn được trứng, trường phái phù hợp nhất của bạn là 'Chay có trứng (Ovo)'.",
                    actions: [
                        {
                            label: "Chuyển sang Chay có trứng (Ovo)",
                            onClick: ()=>setVegetarianType("ovo_vegetarian"),
                            primary: true
                        },
                        {
                            label: "Bỏ chọn dị ứng Sữa",
                            onClick: removeDairyAllergies,
                            primary: false
                        }
                    ]
                };
            }
        }
        return null;
    })();
    const isUnderweight = Boolean(bmiInfo && bmiInfo.category === "Underweight");
    const isSevereUnderweight = Boolean(bmiInfo && bmiInfo.bmi < 16.5);
    const isOverweight = Boolean(bmiInfo && bmiInfo.category === "Overweight");
    const targetWeightNum = targetWeightKg ? Number(targetWeightKg) : null;
    const currentWeightNum = weight ? Number(weight) : null;
    // Kiểm tra mâu thuẫn giữa cân nặng mục tiêu, mục tiêu sức khỏe và thể trạng
    const targetWeightConflictInfo = (()=>{
        if (!targetWeightNum || !currentWeightNum || targetWeightNum <= 0 || currentWeightNum <= 0) {
            return null;
        }
        // 1. Mâu thuẫn khi chọn mục tiêu Tăng cân nhưng cân nặng mục tiêu <= cân nặng hiện tại
        if (healthGoal === "gain_weight" && targetWeightNum <= currentWeightNum) {
            return {
                title: "Mục tiêu cân nặng mâu thuẫn với mục tiêu Tăng cân",
                message: `Bạn đang chọn mục tiêu "Tăng cơ / Tăng cân" nhưng cân nặng mục tiêu (${targetWeightNum} kg) lại không lớn hơn cân nặng hiện tại (${currentWeightNum} kg). Để tăng cân, cân nặng mục tiêu phải lớn hơn ${currentWeightNum} kg.`
            };
        }
        // 2. Mâu thuẫn khi chọn mục tiêu Giảm cân nhưng cân nặng mục tiêu >= cân nặng hiện tại
        if (healthGoal === "lose_weight" && targetWeightNum >= currentWeightNum) {
            return {
                title: "Mục tiêu cân nặng mâu thuẫn với mục tiêu Giảm cân",
                message: `Bạn đang chọn mục tiêu "Giảm cân" nhưng cân nặng mục tiêu (${targetWeightNum} kg) lại không nhỏ hơn cân nặng hiện tại (${currentWeightNum} kg). Để giảm cân, cân nặng mục tiêu phải nhỏ hơn ${currentWeightNum} kg.`
            };
        }
        // 3. Mâu thuẫn khi thể trạng đang thiếu cân nhưng cân nặng mục tiêu lại muốn giảm thêm
        if (isUnderweight && targetWeightNum < currentWeightNum) {
            return {
                title: "Mục tiêu cân nặng nguy hiểm cho thể trạng thiếu cân",
                message: `Bạn đang ở thể trạng thiếu cân (BMI ${bmiInfo?.formattedBMI}) nhưng cân nặng mục tiêu (${targetWeightNum} kg) lại thấp hơn cân nặng hiện tại (${currentWeightNum} kg). Giảm thêm cân sẽ gây suy nhược cơ thể nghiêm trọng.`
            };
        }
        // 4. Mâu thuẫn khi mục tiêu cân nặng hướng tới thể trạng thiếu cân nghiêm trọng (BMI < 16.5)
        if (height && Number(height) > 0) {
            const heightM = Number(height) / 100;
            const targetBmi = targetWeightNum / (heightM * heightM);
            if (targetBmi < 16.5) {
                return {
                    title: "Cân nặng mục tiêu gây suy dinh dưỡng nghiêm trọng",
                    message: `Cân nặng mục tiêu (${targetWeightNum} kg) tương ứng với chỉ số BMI ${targetBmi.toFixed(1)} (Thiếu cân nghiêm trọng). Hệ thống không cho phép đặt mục tiêu gây nguy hiểm đến tính mạng.`
                };
            }
        }
        // 5. Mâu thuẫn khi thể trạng đang thừa cân nhưng cân nặng mục tiêu lại cao hơn hiện tại
        if (isOverweight && targetWeightNum > currentWeightNum) {
            return {
                title: "Mục tiêu cân nặng không phù hợp với thể trạng thừa cân",
                message: `Bạn đang ở thể trạng thừa cân / béo phì (BMI ${bmiInfo?.formattedBMI}) nhưng cân nặng mục tiêu (${targetWeightNum} kg) lại cao hơn cân nặng hiện tại (${currentWeightNum} kg).`
            };
        }
        return null;
    })();
    const handleSave = async (e)=>{
        e.preventDefault();
        setSaveError(null);
        const errors = [];
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
        // Frontend validation for target_date if targetWeightKg is specified
        if (targetDate && new Date(targetDate) <= new Date()) {
            errors.push("Ngày mục tiêu phải sau ngày hôm nay.");
        }
        // Chặn mâu thuẫn thiếu cân nghiêm trọng vs giảm cân
        if (isSevereUnderweight && healthGoal === "lose_weight") {
            errors.push(`Chỉ số BMI của bạn là ${bmiInfo?.formattedBMI} (Thiếu cân nghiêm trọng). Hệ thống từ chối áp dụng chế độ Giảm cân vì nguy cơ suy kiệt nguy hiểm đến tính mạng. Vui lòng chuyển sang Tăng cân hoặc Duy trì.`);
        } else if (isUnderweight && healthGoal === "lose_weight") {
            errors.push(`Chỉ số BMI của bạn là ${bmiInfo?.formattedBMI} (Thiếu cân). Không thể chọn mục tiêu Giảm cân khi đang thiếu cân. Vui lòng chuyển sang Tăng cân hoặc Duy trì vóc dáng để bảo vệ sức khỏe.`);
        }
        // Chặn mâu thuẫn giữa trường phái ăn chay và dị ứng
        if (vegetarianConflict) {
            errors.push(`Mâu thuẫn chế độ ăn: ${vegetarianConflict.title}. Vui lòng giải quyết mâu thuẫn trước khi lưu.`);
        }
        // Chặn mâu thuẫn mục tiêu cân nặng cụ thể
        if (targetWeightConflictInfo) {
            errors.push(`${targetWeightConflictInfo.title}: ${targetWeightConflictInfo.message}`);
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
            setTimeout(()=>setSaved(false), 3000);
        } catch (err) {
            if (err?.code === "USER_TARGET_DATE_INVALID") {
                setSaveError("Ngày mục tiêu không hợp lệ (phải sau ngày hôm nay).");
            } else if (err?.details && Array.isArray(err.details) && err.details.length > 0) {
                setSaveError(err.details.join(", "));
            } else {
                setSaveError(err?.message || "Không thể cập nhật hồ sơ. Vui lòng kiểm tra lại thông tin.");
            }
        } finally{
            setIsSaving(false);
        }
    };
    const handleReset = ()=>{
        setShowResetModal(true);
    };
    const confirmReset = ()=>{
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
        setTargetWeightKg("");
        setTargetDate("");
        setCustomAllergyInput("");
        setCustomAllergyError(null);
        setSaveError(null);
        setShowResetModal(false);
    };
    const BMI_LABEL_MAP = {
        Balanced: "Cân đối",
        Underweight: "Nhẹ cân",
        Overweight: "Thừa cân",
        Obese: "Béo phì"
    };
    const getBmiCategoryLabel = (cat)=>{
        if (!cat) return "Chưa đủ chỉ số";
        return BMI_LABEL_MAP[cat] || cat;
    };
    const displayBmi = bmiInfo ? bmiInfo.formattedBMI : hasPhysicalMetrics && serverSummary?.bmi ? serverSummary.bmi : "—";
    const displayCategory = bmiInfo ? bmiInfo.category : hasPhysicalMetrics && serverSummary?.bmi_category ? serverSummary.bmi_category : undefined;
    // Calo và macro LẤY TỪ BACKEND (GET /users/me/nutrition-summary), cùng một hàm tính với lúc lập thực đơn,
    // nên số trên trang hồ sơ khớp với thực đơn. Trước đây FE tự tính bằng công thức riêng (sàn 1350 kcal)
    // nên cùng một người có thể thấy hai con số khác nhau. Số mới cập nhật sau khi bấm Lưu.
    const displayCalories = hasPhysicalMetrics && serverSummary?.target_calories ? `~${serverSummary.target_calories.toLocaleString("vi-VN")} kcal/ngày` : "—";
    const displayMacros = serverSummary?.macros;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            hasPhysicalMetrics && serverSummary?.warnings && serverSummary.warnings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$components$2f$NutritionWarnings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NutritionWarnings"], {
                warnings: serverSummary.warnings
            }, void 0, false, {
                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                lineNumber: 617,
                columnNumber: 9
            }, this),
            hasPhysicalMetrics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$components$2f$CalorieExplanationSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalorieExplanationSection"], {
                explanation: serverSummary?.explanation,
                targetGoal: serverSummary?.target_goal,
                targetCalories: serverSummary?.target_calories
            }, void 0, false, {
                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                lineNumber: 622,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSave,
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-3xl p-6 shadow-sm relative overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center justify-between gap-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] font-bold uppercase tracking-wider text-emerald-200",
                                        children: "CHỈ SỐ TRAO ĐỔI CHẤT & MỤC TIÊU NĂNG LƯỢNG"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 635,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-baseline gap-4 mt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-emerald-200",
                                                        children: "BMI: "
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 640,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-serif font-bold text-2xl text-white",
                                                        children: displayBmi
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-700 text-emerald-100",
                                                        children: getBmiCategoryLabel(displayCategory)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 644,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 639,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-emerald-200",
                                                        children: "Mục tiêu calo: "
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-serif font-bold text-2xl text-amber-300",
                                                        children: displayCalories
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 650,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 648,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 638,
                                        columnNumber: 15
                                    }, this),
                                    hasPhysicalMetrics && displayMacros ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-emerald-100 mt-2",
                                        children: [
                                            "Phân bổ dinh dưỡng:",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-white",
                                                children: [
                                                    displayMacros.protein_g,
                                                    "g Đạm"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 659,
                                                columnNumber: 19
                                            }, this),
                                            ",",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-white",
                                                children: [
                                                    displayMacros.carbs_g,
                                                    "g Tinh bột"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 660,
                                                columnNumber: 19
                                            }, this),
                                            ",",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-white",
                                                children: [
                                                    displayMacros.fat_g,
                                                    "g Chất béo"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 661,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 657,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-emerald-200/90 mt-2 italic",
                                        children: "Vui lòng nhập chiều cao, cân nặng và các mục tiêu bên dưới để hệ thống tính toán chỉ số dinh dưỡng."
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 664,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                lineNumber: 634,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                            lineNumber: 633,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                        lineNumber: 632,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-2 flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                className: "w-4 h-4 text-emerald-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 676,
                                                columnNumber: 15
                                            }, this),
                                            "1. Chỉ số thể trạng cá nhân"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 675,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "col-span-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-stone-700 mb-1",
                                                        children: "Tên hiển thị"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 682,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: name,
                                                        onChange: (e)=>setName(e.target.value),
                                                        placeholder: "Nhập tên của bạn",
                                                        className: "w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 685,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 681,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-stone-700 mb-1",
                                                        children: "Tuổi (10 - 120 năm) *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 695,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "10",
                                                        max: "120",
                                                        required: true,
                                                        placeholder: "VD: 25",
                                                        value: age,
                                                        onChange: (e)=>setAge(cleanNumberInput(e.target.value)),
                                                        className: "w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 698,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 694,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-stone-700 mb-1",
                                                        children: "Giới tính *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 711,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: gender,
                                                        onChange: (e)=>setGender(e.target.value),
                                                        required: true,
                                                        className: "w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "-- Chọn giới tính --"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 720,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "male",
                                                                children: "Nam (Sàn 1.500 kcal)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 721,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "female",
                                                                children: "Nữ (Sàn 1.200 kcal)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 722,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "other",
                                                                children: "Khác"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 714,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 710,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-stone-700 mb-1",
                                                        children: "Chiều cao (50 - 250 cm) *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 728,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "50",
                                                        max: "250",
                                                        required: true,
                                                        placeholder: "VD: 165",
                                                        value: height,
                                                        onChange: (e)=>setHeight(cleanNumberInput(e.target.value)),
                                                        className: "w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 731,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 727,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-stone-700 mb-1",
                                                        children: "Cân nặng hiện tại (20 - 300 kg) *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 744,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "20",
                                                        max: "300",
                                                        step: "any",
                                                        required: true,
                                                        placeholder: "VD: 55",
                                                        value: weight,
                                                        onChange: (e)=>setWeight(cleanNumberInput(e.target.value)),
                                                        className: "w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 747,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 743,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 680,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-semibold text-stone-700 mb-1.5",
                                                children: "Mức độ vận động *"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 762,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$data$2f$mockProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTIVITY_LEVEL_OPTIONS"].map((lvl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: `flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer transition-all ${activityLevel === lvl.id ? "border-emerald-600 bg-emerald-50/70" : "border-stone-200 hover:bg-stone-50"}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: "activityLevel",
                                                                value: lvl.id,
                                                                checked: activityLevel === lvl.id,
                                                                onChange: ()=>setActivityLevel(lvl.id),
                                                                className: "mt-1 accent-emerald-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 774,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-semibold text-stone-900",
                                                                        children: lvl.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 783,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[11px] text-stone-500",
                                                                        children: lvl.desc
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 784,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 782,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, lvl.id, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 767,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 765,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 761,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                lineNumber: 674,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-2 flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                                className: "w-4 h-4 text-emerald-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 795,
                                                columnNumber: 15
                                            }, this),
                                            "2. Mục tiêu & Chế độ ăn uống"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 794,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-semibold text-stone-700 mb-1.5",
                                                children: "Mục tiêu sức khỏe *"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 801,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$data$2f$mockProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEALTH_GOAL_OPTIONS"].map((g)=>{
                                                    const isLoseWeightDisabled = isSevereUnderweight && g.id === "lose_weight";
                                                    const isSelected = healthGoal === g.id;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setHealthGoal(g.id),
                                                        className: `p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer relative ${isSelected ? isLoseWeightDisabled ? "border-red-500 bg-red-50 text-red-950 font-bold" : "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold" : isLoseWeightDisabled ? "border-red-200 bg-red-50/40 text-stone-500 hover:bg-red-50/60" : "border-stone-200 text-stone-700 hover:bg-stone-50"}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold",
                                                                        children: g.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 824,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    isLoseWeightDisabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded shrink-0",
                                                                        children: "Nguy hiểm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 826,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    !isSevereUnderweight && isUnderweight && g.id === "lose_weight" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0",
                                                                        children: "Không khuyên dùng"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 831,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    isUnderweight && g.id === "gain_weight" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0",
                                                                        children: "Khuyên dùng"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 836,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 823,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-stone-500 mt-0.5",
                                                                children: g.desc
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 841,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, g.id, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 804,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 800,
                                        columnNumber: 13
                                    }, this),
                                    bmiInfo && (()=>{
                                        const hasConflict = isUnderweight && healthGoal === "lose_weight" || isOverweight && healthGoal === "gain_weight";
                                        if (!hasConflict && !targetWeightConflictInfo) return null;
                                        // Trường hợp 1: Thiếu cân nghiêm trọng (BMI < 16.5) mà chọn Giảm cân
                                        if (isSevereUnderweight && healthGoal === "lose_weight") {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 rounded-2xl bg-red-50 border border-red-300 text-red-950 space-y-2.5 animate-in fade-in",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                            className: "w-5 h-5 text-red-600 shrink-0 mt-0.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                            lineNumber: 861,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1 flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold text-red-900",
                                                                    children: [
                                                                        "🚨 Báo động sức khỏe: Thể trạng thiếu cân nghiêm trọng (BMI ",
                                                                        bmiInfo.formattedBMI,
                                                                        " < 16.5)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                    lineNumber: 863,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[11px] leading-relaxed text-red-800",
                                                                    children: [
                                                                        "Chỉ số BMI hiện tại của bạn là ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            children: bmiInfo.formattedBMI
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                            lineNumber: 867,
                                                                            columnNumber: 58
                                                                        }, this),
                                                                        " (Mức suy dinh dưỡng nặng, dưới ngưỡng an toàn 18.5 rất nhiều). Việc nạp thâm hụt calo để ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            children: "Giảm cân"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                            lineNumber: 867,
                                                                            columnNumber: 187
                                                                        }, this),
                                                                        " lúc này sẽ làm suy kiệt cơ bắp, rối loạn trao đổi chất và suy giảm miễn dịch nghiêm trọng. Hệ thống yêu cầu bạn chọn chế độ dinh dưỡng an toàn hơn để bảo vệ sức khỏe."
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                    lineNumber: 866,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                            lineNumber: 862,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                    lineNumber: 860,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 859,
                                                columnNumber: 19
                                            }, this);
                                        }
                                        // Trường hợp 2: Thiếu cân nhẹ/vừa (16.5 <= BMI < 18.5) mà chọn Giảm cân
                                        if (isUnderweight && healthGoal === "lose_weight") {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2 animate-in fade-in",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 882,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1 flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-bold text-amber-900",
                                                                        children: "Cảnh báo dinh dưỡng: Đang thiếu cân nhưng chọn Giảm cân"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 884,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[11px] leading-relaxed text-amber-800",
                                                                        children: [
                                                                            "Chỉ số BMI hiện tại của bạn là ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: bmiInfo.formattedBMI
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                                lineNumber: 888,
                                                                                columnNumber: 58
                                                                            }, this),
                                                                            " (Thiếu cân). Thâm hụt calo trong lúc thiếu cân có thể gây mệt mỏi, suy nhược và thiếu hụt vi chất. Khuyến nghị bạn nên chuyển sang mục tiêu ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: "Tăng cân"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                                lineNumber: 888,
                                                                                columnNumber: 238
                                                                            }, this),
                                                                            " hoặc ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: "Duy trì"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                                lineNumber: 888,
                                                                                columnNumber: 269
                                                                            }, this),
                                                                            " để đạt thể trạng cân đối trước."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 887,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 883,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 881,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200/80",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-bold text-amber-900",
                                                                children: "Giải pháp gợi ý:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 894,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setHealthGoal("gain_weight"),
                                                                className: "text-xs px-2.5 py-1 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer",
                                                                children: "Chuyển sang: Tăng cân (+400 kcal)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 895,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setHealthGoal("maintain_weight"),
                                                                className: "text-xs px-2.5 py-1 rounded-lg font-semibold bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 cursor-pointer",
                                                                children: "Chuyển sang: Duy trì vóc dáng"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 902,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 893,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 880,
                                                columnNumber: 19
                                            }, this);
                                        }
                                        // Trường hợp 3: Thừa cân nhưng chọn Tăng cân
                                        if (isOverweight && healthGoal === "gain_weight") {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2 animate-in fade-in",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 919,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1 flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-bold text-amber-900",
                                                                        children: "Cảnh báo dinh dưỡng: Thể trạng thừa cân nhưng chọn Tăng cân"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 921,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[11px] leading-relaxed text-amber-800",
                                                                        children: [
                                                                            "Chỉ số BMI hiện tại của bạn là ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: bmiInfo.formattedBMI
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                                lineNumber: 925,
                                                                                columnNumber: 58
                                                                            }, this),
                                                                            " (Thừa cân / Béo phì). Việc nạp calo thặng dư để tăng cân có thể gia tăng mỡ nội tạng và áp lực lên tim mạch."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 924,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 920,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 918,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200/80",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-bold text-amber-900",
                                                                children: "Giải pháp gợi ý:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 931,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setHealthGoal("lose_weight"),
                                                                className: "text-xs px-2.5 py-1 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer",
                                                                children: "Chuyển sang: Giảm cân lành mạnh"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 932,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setHealthGoal("maintain_weight"),
                                                                className: "text-xs px-2.5 py-1 rounded-lg font-semibold bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 cursor-pointer",
                                                                children: "Chuyển sang: Duy trì vóc dáng"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 939,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 930,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 917,
                                                columnNumber: 19
                                            }, this);
                                        }
                                        // Trường hợp 4: Cân nặng mục tiêu mâu thuẫn
                                        if (targetWeightConflictInfo) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1.5 animate-in fade-in",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                className: "w-4 h-4 text-amber-600 shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 956,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold text-amber-900",
                                                                children: targetWeightConflictInfo.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 957,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 955,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] leading-relaxed text-amber-800",
                                                        children: targetWeightConflictInfo.message
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 961,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 954,
                                                columnNumber: 19
                                            }, this);
                                        }
                                        return null;
                                    })(),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                                        className: "w-4 h-4 text-emerald-700"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 974,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold text-stone-900",
                                                        children: "Mục tiêu cân nặng cụ thể (Tuỳ chọn)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 975,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 973,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-stone-500",
                                                children: "Nhập số cân nặng mục tiêu và ngày bạn muốn đạt được. Để trống nếu muốn xoá mục tiêu."
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 979,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-[11px] font-semibold text-stone-700 mb-1",
                                                                children: "Cân nặng mục tiêu (20 - 300 kg)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 985,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "20",
                                                                max: "300",
                                                                step: "any",
                                                                value: targetWeightKg,
                                                                onChange: (e)=>setTargetWeightKg(cleanNumberInput(e.target.value)),
                                                                placeholder: "VD: 58",
                                                                className: "w-full h-10 rounded-xl border border-stone-200 bg-white px-3 text-xs focus:border-emerald-600 outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 988,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 984,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-[11px] font-semibold text-stone-700 mb-1",
                                                                children: "Thời hạn dự kiến (sau hôm nay)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 1001,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "date",
                                                                min: minTargetDate,
                                                                value: targetDate,
                                                                onChange: (e)=>setTargetDate(e.target.value),
                                                                className: "w-full h-10 rounded-xl border border-stone-200 bg-white px-3 text-xs focus:border-emerald-600 outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 1004,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 1000,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 983,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 972,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-semibold text-stone-700 mb-1.5",
                                                children: "Trường phái ăn chay *"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 1017,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$data$2f$mockProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VEGETARIAN_TYPE_OPTIONS"].map((v)=>{
                                                    const isSelected = vegetarianType === v.id;
                                                    const disabledReason = isDietDisabledByAllergy(v.id);
                                                    const isDisabled = Boolean(disabledReason);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        disabled: isDisabled,
                                                        title: disabledReason || undefined,
                                                        onClick: ()=>!isDisabled && handleSelectVegetarianType(v.id),
                                                        className: `p-2.5 rounded-xl border text-left text-xs transition-all relative ${isDisabled ? "border-stone-200 bg-stone-100/70 text-stone-400 cursor-not-allowed opacity-50" : isSelected ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold cursor-pointer" : "border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: `font-semibold ${isDisabled ? "text-stone-400" : ""}`,
                                                                        children: v.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 1041,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    isDisabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-semibold text-stone-500 bg-stone-200/80 px-1.5 py-0.5 rounded shrink-0",
                                                                        children: "Khóa do dị ứng"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 1043,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 1040,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-stone-500 mt-0.5",
                                                                children: v.desc
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 1048,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, v.id, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 1027,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 1020,
                                                columnNumber: 15
                                            }, this),
                                            vegetarianConflict && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2 animate-in fade-in",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                            className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                            lineNumber: 1058,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 space-y-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold text-amber-900",
                                                                    children: vegetarianConflict.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                    lineNumber: 1060,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[11px] leading-relaxed text-amber-800",
                                                                    children: vegetarianConflict.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                    lineNumber: 1063,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                            lineNumber: 1059,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                    lineNumber: 1057,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 1056,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 1016,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-stone-700",
                                                        children: "Dị ứng thực phẩm / Cần tránh"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 1075,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: handleDeclareNoAllergies,
                                                        className: "text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold underline cursor-pointer",
                                                        children: "Tôi không dị ứng gì"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 1078,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 1074,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-stone-500 mb-2",
                                                children: "Chọn các nhóm có sẵn hoặc nhập tự do nguyên liệu bạn dị ứng để AI tự động loại trừ."
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 1086,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-1.5 mb-3",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$data$2f$mockProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALLERGY_MASTER_LIST"].map((item)=>{
                                                    const isSelected = allergies.some((a)=>a.toLowerCase() === item.id.toLowerCase() || a.toLowerCase() === item.label.toLowerCase());
                                                    const disabledReason = isAllergyDisabledByDiet(item.id);
                                                    const isDisabled = Boolean(disabledReason);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        disabled: isDisabled,
                                                        title: disabledReason || undefined,
                                                        onClick: ()=>!isDisabled && toggleAllergy(item.id),
                                                        className: `px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${isDisabled ? "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed opacity-50" : isSelected ? "bg-amber-100 text-amber-900 border border-amber-300 ring-1 ring-amber-300 shadow-2xs cursor-pointer" : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200 cursor-pointer"}`,
                                                        children: isDisabled ? `${item.label} (Không khả dụng)` : isSelected ? `⚠ ${item.label}` : item.label
                                                    }, item.id, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 1100,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 1091,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5 pt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: customAllergyInput,
                                                                onChange: (e)=>{
                                                                    setCustomAllergyInput(e.target.value);
                                                                    if (customAllergyError) setCustomAllergyError(null);
                                                                },
                                                                placeholder: "Nhập tên dị ứng khác (VD: đậu phộng, kiwi, mè đen...)",
                                                                className: "flex-1 h-9 rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs focus:bg-white focus:border-emerald-600 outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 1122,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: handleAddCustomAllergy,
                                                                className: "h-9 px-3.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer shrink-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                        className: "w-3.5 h-3.5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                        lineNumber: 1137,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    "Thêm"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 1132,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 1121,
                                                        columnNumber: 17
                                                    }, this),
                                                    customAllergyError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] text-red-600 font-medium flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 1144,
                                                                columnNumber: 21
                                                            }, this),
                                                            customAllergyError
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 1143,
                                                        columnNumber: 19
                                                    }, this),
                                                    allergies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-1.5 pt-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] text-stone-400 self-center mr-1",
                                                                children: "Đã chọn:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                lineNumber: 1152,
                                                                columnNumber: 21
                                                            }, this),
                                                            allergies.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200",
                                                                    children: [
                                                                        "⚠ ",
                                                                        getAllergyDisplayLabel(item),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>handleRemoveAllergy(item),
                                                                            className: "hover:text-red-700 cursor-pointer",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                                className: "w-3 h-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                                lineNumber: 1164,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                            lineNumber: 1159,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, item, true, {
                                                                    fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                                    lineNumber: 1154,
                                                                    columnNumber: 23
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 1151,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 1120,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 1073,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                lineNumber: 793,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                        lineNumber: 672,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleReset,
                                className: "text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 flex items-center gap-1 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 1182,
                                        columnNumber: 13
                                    }, this),
                                    "Làm trống để nhập lại"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                lineNumber: 1177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row items-end sm:items-center gap-3",
                                children: [
                                    saveErrors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1 items-end sm:items-start text-xs text-red-600 font-semibold animate-in fade-in max-w-xl",
                                        children: saveErrors.map((err, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-start gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                        className: "w-3.5 h-3.5 shrink-0 mt-0.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 1191,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: err
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                        lineNumber: 1192,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 1190,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 1188,
                                        columnNumber: 15
                                    }, this),
                                    saved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-xs text-emerald-700 font-bold animate-in fade-in",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                lineNumber: 1199,
                                                columnNumber: 17
                                            }, this),
                                            "Đã cập nhật hồ sơ & tính toán lại dinh dưỡng!"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 1198,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isSaving,
                                        className: "h-11 px-8 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer flex items-center gap-2",
                                        children: isSaving ? "Đang lưu thay đổi..." : "Lưu hồ sơ & Cập nhật kế hoạch"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                        lineNumber: 1203,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                lineNumber: 1186,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                        lineNumber: 1176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                        isOpen: showResetModal,
                        onClose: ()=>setShowResetModal(false),
                        title: "Làm trống thông tin hồ sơ",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            className: "w-5 h-5 text-amber-600 shrink-0 mt-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                            lineNumber: 1221,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold text-amber-900 text-sm",
                                                    children: "Bạn có chắc chắn muốn làm trống các chỉ số thể trạng?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                    lineNumber: 1223,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-amber-800",
                                                    children: "Tất cả các thông số như độ tuổi, giới tính, chiều cao, cân nặng, mức vận động, mục tiêu và dị ứng sẽ được xóa trống để bạn nhập lại từ đầu."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                                    lineNumber: 1226,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                            lineNumber: 1222,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                    lineNumber: 1220,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-end gap-2 pt-2 border-t border-stone-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowResetModal(false),
                                            className: "px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer",
                                            children: "Hủy"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                            lineNumber: 1233,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: confirmReset,
                                            className: "px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors cursor-pointer",
                                            children: "Xác nhận làm trống"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                            lineNumber: 1240,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                                    lineNumber: 1232,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                            lineNumber: 1219,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                        lineNumber: 1214,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
                lineNumber: 630,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/profile/components/ProfileEditor.tsx",
        lineNumber: 614,
        columnNumber: 5
    }, this);
}
_s(ProfileEditor, "kL9Mz1SsQg47Wd3oZGOUGm4Lan0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"]
    ];
});
_c = ProfileEditor;
var _c;
__turbopack_context__.k.register(_c, "ProfileEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/profile/data/mockProfile.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIVITY_LEVEL_OPTIONS",
    ()=>ACTIVITY_LEVEL_OPTIONS,
    "ALLERGY_MASTER_LIST",
    ()=>ALLERGY_MASTER_LIST,
    "DEFAULT_MOCK_PROFILE",
    ()=>DEFAULT_MOCK_PROFILE,
    "HEALTH_GOAL_OPTIONS",
    ()=>HEALTH_GOAL_OPTIONS,
    "VEGETARIAN_TYPE_OPTIONS",
    ()=>VEGETARIAN_TYPE_OPTIONS
]);
const DEFAULT_MOCK_PROFILE = {
    id: "guest",
    name: "Thành viên VeggieHub",
    age: null,
    gender: "",
    height: null,
    weight: null,
    activityLevel: "",
    healthGoal: "",
    vegetarianType: "",
    allergies: [],
    email: "",
    handle: "member",
    bio: ""
};
const ALLERGY_MASTER_LIST = [
    {
        id: "peanut",
        label: "Đậu phộng (Lạc)"
    },
    {
        id: "soy",
        label: "Đậu nành & Đậu hũ"
    },
    {
        id: "gluten",
        label: "Gluten / Lúa mì"
    },
    {
        id: "dairy",
        label: "Sữa & Chế phẩm sữa (Lactose)"
    },
    {
        id: "treenut",
        label: "Hạt cây (Điều, Hạnh nhân, Óc chó)"
    },
    {
        id: "sesame",
        label: "Mè & Hạt gieo (Vừng, Hướng dương, Bí)"
    },
    {
        id: "corn",
        label: "Bắp (Ngô)"
    },
    {
        id: "egg",
        label: "Trứng"
    },
    {
        id: "legume",
        label: "Họ Đậu khác (Đậu đen, xanh, đỏ, gà...)"
    },
    {
        id: "fungi",
        label: "Nấm"
    },
    {
        id: "allium",
        label: "Họ hành tỏi (Ngũ vị tân)"
    }
];
const VEGETARIAN_TYPE_OPTIONS = [
    {
        id: "vegan",
        label: "Thuần chay (Vegan)",
        desc: "100% nguồn gốc thực vật, không dùng sản phẩm động vật"
    },
    {
        id: "lacto_vegetarian",
        label: "Chay có sữa (Lacto)",
        desc: "Ăn thực vật + các chế phẩm từ sữa"
    },
    {
        id: "ovo_vegetarian",
        label: "Chay có trứng (Ovo)",
        desc: "Ăn thực vật + trứng gà/vịt"
    },
    {
        id: "lacto_ovo_vegetarian",
        label: "Chay có trứng & sữa (Ovo-Lacto)",
        desc: "Ăn thực vật + trứng + sữa"
    }
];
const HEALTH_GOAL_OPTIONS = [
    {
        id: "lose_weight",
        label: "Giảm cân",
        desc: "Thâm hụt ~500 kcal giúp đốt mỡ đều đặn"
    },
    {
        id: "maintain_weight",
        label: "Duy trì vóc dáng",
        desc: "Cân bằng năng lượng phù hợp chỉ số TDEE"
    },
    {
        id: "gain_weight",
        label: "Tăng cơ / Tăng cân",
        desc: "Dư thừa ~400 kcal + tối ưu đạm thực vật"
    },
    {
        id: "healthy_eating",
        label: "Ăn uống lành mạnh",
        desc: "Đa dạng vi chất dinh dưỡng và tiêu hóa khỏe"
    }
];
const ACTIVITY_LEVEL_OPTIONS = [
    {
        id: "sedentary",
        label: "Ít vận động",
        factor: 1.2,
        desc: "Hầu như không tập luyện, công việc văn phòng"
    },
    {
        id: "light",
        label: "Vận động nhẹ",
        factor: 1.375,
        desc: "Tập luyện nhẹ nhàng / thể thao 1 - 3 ngày/tuần"
    },
    {
        id: "moderate",
        label: "Vận động vừa phải",
        factor: 1.55,
        desc: "Tập luyện thể thao 3 - 5 ngày/tuần"
    },
    {
        id: "active",
        label: "Vận động nhiều",
        factor: 1.725,
        desc: "Tập luyện cường độ cao 6 - 7 ngày/tuần"
    },
    {
        id: "very_active",
        label: "Vận động rất nhiều",
        factor: 1.9,
        desc: "Lao động thể lực nặng hoặc tập 2 buổi/ngày"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/profile/hooks/useProfile.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProfile",
    ()=>useProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/services/profileService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage/storage.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useProfile() {
    _s();
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useProfile.useState": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].getProfile()
    }["useProfile.useState"]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProfile.useCallback[fetchProfile]": async ()=>{
            setLoading(true);
            setError(null);
            try {
                const serverProfile = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].fetchServerProfile();
                setProfile(serverProfile);
                return serverProfile;
            } catch (err) {
                setError(err?.message || "Không thể tải hồ sơ người dùng");
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].getProfile();
            } finally{
                setLoading(false);
            }
        }
    }["useProfile.useCallback[fetchProfile]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProfile.useEffect": ()=>{
            fetchProfile();
            // Subscribe to cross-component and external storage changes
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].subscribe({
                "useProfile.useEffect.unsubscribe": (event)=>{
                    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].USER_PROFILE) {
                        setProfile(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].getProfile());
                    }
                }
            }["useProfile.useEffect.unsubscribe"]);
            return unsubscribe;
        }
    }["useProfile.useEffect"], [
        fetchProfile
    ]);
    const updateProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProfile.useCallback[updateProfile]": async (updates)=>{
            setLoading(true);
            setError(null);
            try {
                const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].updateProfile(updates);
                setProfile(updated);
                return updated;
            } catch (err) {
                setError(err?.message || "Không thể cập nhật hồ sơ");
                throw err;
            } finally{
                setLoading(false);
            }
        }
    }["useProfile.useCallback[updateProfile]"], []);
    const resetProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProfile.useCallback[resetProfile]": ()=>{
            const reset = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].resetProfile();
            setProfile(reset);
            return reset;
        }
    }["useProfile.useCallback[resetProfile]"], []);
    return {
        profile,
        loading,
        error,
        refetch: fetchProfile,
        updateProfile,
        resetProfile
    };
}
_s(useProfile, "f8ZEmVXPIpEfCYF32WFadiCnnM4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/profile/services/profileService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "profileService",
    ()=>profileService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tokenStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$data$2f$mockProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/data/mockProfile.ts [app-client] (ecmascript)");
;
;
;
;
const ALLERGEN_MAP_TO_BACKEND = {
    peanut: "PEANUT",
    PEANUT: "PEANUT",
    soy: "SOY",
    SOY: "SOY",
    gluten: "GLUTEN",
    GLUTEN: "GLUTEN",
    dairy: "DAIRY",
    DAIRY: "DAIRY",
    treenut: "TREE_NUT",
    tree_nut: "TREE_NUT",
    nuts: "TREE_NUT",
    TREE_NUT: "TREE_NUT",
    sesame: "SEED",
    seed: "SEED",
    SEED: "SEED",
    egg: "EGG",
    EGG: "EGG",
    fungi: "FUNGI",
    mushroom: "FUNGI",
    FUNGI: "FUNGI",
    allium: "ALLIUM",
    ALLIUM: "ALLIUM",
    legume: "LEGUME",
    LEGUME: "LEGUME",
    corn: "CORN",
    CORN: "CORN"
};
const ALLERGEN_MAP_FROM_BACKEND = {
    PEANUT: "peanut",
    SOY: "soy",
    GLUTEN: "gluten",
    DAIRY: "dairy",
    TREE_NUT: "treenut",
    SEED: "sesame",
    EGG: "egg",
    FUNGI: "fungi",
    ALLIUM: "allium",
    LEGUME: "legume",
    CORN: "corn"
};
function mapBackendDietToFrontend(diet) {
    if (!diet) return "vegan";
    const d = diet.toLowerCase();
    if (d === "lacto") return "lacto_vegetarian";
    if (d === "ovo") return "ovo_vegetarian";
    if (d === "ovo_lacto" || d === "lacto_ovo") return "lacto_ovo_vegetarian";
    return "vegan";
}
function mapFrontendDietToBackend(diet) {
    if (!diet) return "vegan";
    if (diet === "lacto_vegetarian") return "lacto";
    if (diet === "ovo_vegetarian") return "ovo";
    if (diet === "lacto_ovo_vegetarian") return "ovo_lacto";
    return "vegan";
}
function mapBackendGoalToFrontend(goal) {
    if (!goal) return "maintain_weight";
    const g = goal.toLowerCase();
    if (g.includes("lose")) return "lose_weight";
    if (g.includes("gain") || g.includes("muscle")) return "gain_weight";
    return "maintain_weight";
}
function mapFrontendGoalToId(goal) {
    if (goal === "lose_weight") return 1;
    if (goal === "gain_weight") return 2;
    return 3; // maintain
}
function mapBackendProfileToUserProfile(backend, existingCustomAllergies = []) {
    const allergenGroups = backend.allergies?.allergen_groups || [];
    const mappedAllergies = allergenGroups.map((code)=>ALLERGEN_MAP_FROM_BACKEND[code] || code.toLowerCase());
    // Giữ lại các dị ứng tự do / nguyên liệu riêng lẻ không thuộc nhóm chuẩn
    for (const custom of existingCustomAllergies){
        if (!mappedAllergies.some((m)=>m.toLowerCase() === custom.toLowerCase())) {
            mappedAllergies.push(custom);
        }
    }
    return {
        id: backend.user_id,
        name: backend.full_name,
        age: backend.age ?? null,
        gender: backend.gender || "",
        height: backend.height_cm ?? null,
        weight: backend.weight_kg ?? null,
        activityLevel: backend.activity_level || "",
        healthGoal: backend.current_goal?.name ? mapBackendGoalToFrontend(backend.current_goal?.name) : "",
        vegetarianType: backend.diet_type ? mapBackendDietToFrontend(backend.diet_type) : "",
        allergies: mappedAllergies,
        email: backend.email,
        bmi: backend.bmi ?? null,
        bmiCategory: backend.bmi_category,
        isPremium: backend.is_premium,
        allergenGroups: allergenGroups,
        target_weight_kg: backend.target_weight_kg ?? null,
        target_date: backend.target_date ?? null,
        profile_complete: backend.profile_complete,
        missing_profile_fields: backend.missing_profile_fields || [],
        allergies_declared: backend.allergies_declared
    };
}
let inFlightProfilePromise = null;
const profileService = {
    /**
   * Lấy hồ sơ người dùng hiện tại (đồng bộ tức thì từ cache)
   */ getProfile () {
        const raw = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].USER_PROFILE, null);
        const authUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getUser();
        // If cache contains legacy mock data, purge it
        if (raw && (raw.name === "Demo User" || raw.email === "demo@veggiehub.vn" || raw.handle === "demouser")) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].USER_PROFILE);
        } else if (raw) {
            if (authUser && (raw.id === "guest" || raw.id === 1 || raw.id === authUser.user_id)) {
                raw.id = authUser.user_id;
                raw.name = authUser.full_name || raw.name;
                raw.email = authUser.email || raw.email;
                raw.handle = authUser.email ? authUser.email.split("@")[0] : raw.handle;
                // Xóa giá trị mặc định giả mạo nếu tài khoản chưa hoàn thiện hồ sơ
                if (raw.profile_complete === false || !raw.profile_complete && (!authUser.height_cm || !authUser.weight_kg)) {
                    if (!authUser.height_cm) raw.height = null;
                    if (!authUser.weight_kg) raw.weight = null;
                    if (!authUser.age) raw.age = null;
                    if (!authUser.gender) raw.gender = "";
                    if (!authUser.activity_level) raw.activityLevel = "";
                }
            }
            return raw;
        }
        if (authUser) {
            const userProfile = {
                id: authUser.user_id,
                name: authUser.full_name || "Thành viên VeggieHub",
                email: authUser.email,
                handle: authUser.email ? authUser.email.split("@")[0] : "member",
                age: authUser.age ?? null,
                gender: authUser.gender || "",
                height: authUser.height_cm ?? null,
                weight: authUser.weight_kg ?? null,
                activityLevel: authUser.activity_level || "",
                healthGoal: "",
                vegetarianType: authUser.diet_type ? mapBackendDietToFrontend(authUser.diet_type) : "",
                allergies: authUser.allergies || [],
                isPremium: authUser.is_premium,
                target_weight_kg: authUser.target_weight_kg ?? null,
                target_date: authUser.target_date ?? null,
                profile_complete: authUser.profile_complete ?? false,
                missing_profile_fields: authUser.missing_profile_fields || [],
                allergies_declared: authUser.allergies_declared ?? false
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].USER_PROFILE, userProfile);
            return userProfile;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$data$2f$mockProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_MOCK_PROFILE"];
    },
    getStoredProfile () {
        return this.getProfile();
    },
    /**
   * Lấy hồ sơ cá nhân từ backend:
   * GET /users/me/profile
   * Nếu có JWT, gọi backend lấy hồ sơ thật và cập nhật vào LocalStorage cache.
   * Nếu chưa đăng nhập hoặc offline, trả về cached profile.
   */ async fetchServerProfile () {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getToken();
        if (!token) {
            return this.getProfile();
        }
        if (inFlightProfilePromise) {
            return inFlightProfilePromise;
        }
        inFlightProfilePromise = (async ()=>{
            try {
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/users/me/profile");
                const mapped = mapBackendProfileToUserProfile(data);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].USER_PROFILE, mapped);
                return mapped;
            } catch (err) {
                // 401 UNAUTHORIZED là trạng thái bình thường khi phiên hết hạn hoặc chưa đăng nhập
                if (err?.status !== 401 && err?.code !== "AUTH_UNAUTHORIZED") {
                    console.warn("[profileService] Failed to fetch server profile, using cache:", err);
                }
                return this.getProfile();
            } finally{
                inFlightProfilePromise = null;
            }
        })();
        return inFlightProfilePromise;
    },
    /**
   * Cập nhật hồ sơ cá nhân:
   * PUT /users/me/profile
   * PUT /users/me/allergies
   */ async updateProfile (updates) {
        const current = this.getProfile();
        const updatedLocal = {
            ...current,
            ...updates,
            height: updates.height !== undefined ? Number(updates.height) : current.height,
            weight: updates.weight !== undefined ? Number(updates.weight) : current.weight,
            age: updates.age !== undefined ? Number(updates.age) : current.age,
            allergies: updates.allergies ?? current.allergies
        };
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getToken();
        if (!token) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].USER_PROFILE, updatedLocal);
            return updatedLocal;
        }
        // Prepare payload for backend
        const payload = {};
        if (updates.name !== undefined) payload.full_name = updates.name;
        if (updates.age !== undefined) payload.age = Number(updates.age);
        if (updates.gender !== undefined) payload.gender = updates.gender;
        if (updates.height !== undefined) payload.height_cm = Number(updates.height);
        if (updates.weight !== undefined) payload.weight_kg = Number(updates.weight);
        if (updates.activityLevel !== undefined) {
            payload.activity_level = updates.activityLevel === "very_active" ? "active" : updates.activityLevel;
        }
        if (updates.vegetarianType !== undefined) {
            payload.diet_type = mapFrontendDietToBackend(updates.vegetarianType);
        }
        if (updates.healthGoal !== undefined) {
            payload.current_goal_id = mapFrontendGoalToId(updates.healthGoal);
        }
        if (updates.target_weight_kg !== undefined) {
            const val = updates.target_weight_kg;
            payload.target_weight_kg = val === null || val === undefined || val === "" || Number.isNaN(Number(val)) ? null : Number(val);
        }
        if (updates.target_date !== undefined) {
            payload.target_date = updates.target_date ? String(updates.target_date).trim() : null;
        }
        try {
            // 1. Cập nhật metrics & thông tin hồ sơ
            const serverProfile = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put("/users/me/profile", payload);
            // 2. Cập nhật dị ứng nếu có
            const customAllergies = [];
            if (updates.allergies !== undefined) {
                const validGroupCodes = new Set([
                    "SOY",
                    "TREE_NUT",
                    "PEANUT",
                    "SEED",
                    "GLUTEN",
                    "LEGUME",
                    "EGG",
                    "DAIRY",
                    "FUNGI",
                    "ALLIUM",
                    "CORN"
                ]);
                const allergenGroups = [];
                for (const raw of updates.allergies){
                    const item = String(raw).trim();
                    if (!item) continue;
                    const mapped = ALLERGEN_MAP_TO_BACKEND[item] || ALLERGEN_MAP_TO_BACKEND[item.toLowerCase()] || (validGroupCodes.has(item.toUpperCase()) ? item.toUpperCase() : null);
                    if (mapped && validGroupCodes.has(mapped)) {
                        if (!allergenGroups.includes(mapped)) {
                            allergenGroups.push(mapped);
                        }
                    } else {
                        if (!customAllergies.some((c)=>c.toLowerCase() === item.toLowerCase())) {
                            customAllergies.push(item);
                        }
                    }
                }
                // BE: Chỉ gửi các allergen_groups hợp lệ (ngăn lỗi class-validator 400 nếu có dị ứng nhập tự do)
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put("/users/me/allergies", {
                    allergen_groups: allergenGroups,
                    ingredient_ids: []
                });
                if (serverProfile.allergies) {
                    serverProfile.allergies.allergen_groups = allergenGroups;
                }
                serverProfile.allergies_declared = true;
            }
            const mapped = mapBackendProfileToUserProfile(serverProfile, customAllergies);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].USER_PROFILE, mapped);
            return mapped;
        } catch (err) {
            console.warn("[profileService] Server update failed:", err);
            throw err;
        }
    },
    /**
   * Đánh dấu người dùng không có dị ứng thực phẩm:
   * PUT /users/me/allergies với {}
   */ async declareNoAllergies () {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put("/users/me/allergies", {});
        const current = this.getProfile();
        const updated = {
            ...current,
            allergies: [],
            allergenGroups: [],
            allergies_declared: true
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].USER_PROFILE, updated);
    },
    /**
   * Lấy danh sách dị ứng:
   * GET /users/me/allergies
   */ async getAllergies () {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/users/me/allergies");
        } catch  {
            return {
                allergen_groups: [],
                ingredients: []
            };
        }
    },
    /**
   * Cập nhật danh sách dị ứng:
   * PUT /users/me/allergies
   */ async setAllergies (allergenGroups, ingredientIds = []) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put("/users/me/allergies", {
            allergen_groups: allergenGroups,
            ingredient_ids: ingredientIds
        });
    },
    /**
   * Khôi phục hồ sơ mặc định
   */ resetProfile () {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].USER_PROFILE, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$data$2f$mockProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_MOCK_PROFILE"]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$data$2f$mockProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_MOCK_PROFILE"];
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/profile/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALLERGEN_LABELS_VI",
    ()=>ALLERGEN_LABELS_VI,
    "VEGETARIAN_TYPE_LABELS",
    ()=>VEGETARIAN_TYPE_LABELS,
    "formatAllergies",
    ()=>formatAllergies,
    "formatAllergy",
    ()=>formatAllergy,
    "formatVegetarianType",
    ()=>formatVegetarianType
]);
const VEGETARIAN_TYPE_LABELS = {
    vegan: "Thuần chay (Vegan)",
    lacto_vegetarian: "Chay có sữa (Lacto)",
    ovo_vegetarian: "Chay có trứng (Ovo)",
    lacto_ovo_vegetarian: "Chay có trứng & sữa (Ovo-Lacto)"
};
function formatVegetarianType(type) {
    if (!type) return "Thuần chay (Vegan)";
    return VEGETARIAN_TYPE_LABELS[type] || type.replace(/_/g, " ");
}
const ALLERGEN_LABELS_VI = {
    peanut: "Đậu phộng (lạc)",
    PEANUT: "Đậu phộng (lạc)",
    soy: "Đậu nành & đậu hũ",
    SOY: "Đậu nành & đậu hũ",
    gluten: "Gluten (lúa mì)",
    GLUTEN: "Gluten (lúa mì)",
    dairy: "Sữa & chế phẩm sữa",
    DAIRY: "Sữa & chế phẩm sữa",
    treenut: "Hạt cây",
    tree_nut: "Hạt cây",
    TREE_NUT: "Hạt cây",
    nuts: "Hạt cây",
    sesame: "Mè & hạt gieo",
    seed: "Mè & hạt gieo",
    SEED: "Mè & hạt gieo",
    corn: "Bắp (ngô)",
    CORN: "Bắp (ngô)",
    egg: "Trứng",
    EGG: "Trứng",
    legume: "Họ đậu khác",
    LEGUME: "Họ đậu khác",
    fungi: "Nấm",
    mushroom: "Nấm",
    FUNGI: "Nấm",
    allium: "Hành tỏi (ngũ vị tân)",
    ALLIUM: "Hành tỏi (ngũ vị tân)"
};
function formatAllergy(allergy) {
    if (!allergy) return "";
    const trimmed = allergy.trim();
    const lower = trimmed.toLowerCase();
    return ALLERGEN_LABELS_VI[trimmed] || ALLERGEN_LABELS_VI[lower] || ALLERGEN_LABELS_VI[trimmed.toUpperCase()] || trimmed;
}
function formatAllergies(allergies) {
    if (!allergies || !allergies.length) return "";
    return allergies.map(formatAllergy).join(", ");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_features_profile_1g42an2._.js.map
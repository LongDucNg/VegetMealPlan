(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/recipes/create/CreateRecipeClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateRecipeClient",
    ()=>CreateRecipeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chef$2d$hat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChefHat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chef-hat.mjs [app-client] (ecmascript) <export default as ChefHat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.mjs [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.mjs [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/utensils-crossed.mjs [app-client] (ecmascript) <export default as UtensilsCrossed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.mjs [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/recipeApiService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$ingredientApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/ingredientApiService.ts [app-client] (ecmascript)");
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
;
;
const SAMPLE_PRESET_IMAGES = [
    {
        name: "Bún nấm thanh đạm",
        url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
    },
    {
        name: "Salad rau củ sốt mè",
        url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
    },
    {
        name: "Cơm xào nấm đậu hũ",
        url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
    },
    {
        name: "Canh củ quả hầm sen",
        url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80"
    },
    {
        name: "Phở cuốn rau thơm",
        url: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop&q=80"
    }
];
function normalizeText(text) {
    return (text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").trim();
}
/**
 * Kiểm tra nguyên liệu có phù hợp với chế độ ăn chay đang chọn không:
 * - vegan: không trứng, không sữa bò / bơ / phô mai / kem tươi / sữa đặc / sữa chua.
 * - lacto: cho phép sữa, không trứng.
 * - ovo: cho phép trứng, không sữa.
 * - ovo_lacto: cho phép cả hai.
 */ function isIngredientAllowedForDiet(ing, diet) {
    const name = (ing.ingredient_name || "").toLowerCase();
    const isEgg = /trứng/i.test(name);
    const isDairy = /sữa tươi|sữa đặc|bơ lạt|phô mai|kem tươi|sữa chua|whey/i.test(name) || Array.isArray(ing.allergens) && ing.allergens.includes("DAIRY");
    if (diet === "vegan") {
        if (ing.vegan_flag === false) return false;
        if (isEgg || isDairy) return false;
        return true;
    }
    if (diet === "lacto") {
        if (isEgg) return false;
        return true;
    }
    if (diet === "ovo") {
        if (isDairy) return false;
        return true;
    }
    return true;
}
function CreateRecipeClient({ isAdminMode: propAdminMode } = {}) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { user, isAuthenticated, isAdmin, ready } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const isActuallyAdmin = propAdminMode ?? (pathname.startsWith("/admin") || isAdmin);
    // Master Data from DB
    const [availableIngredients, setAvailableIngredients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dataLoading, setDataLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Form Fields - Unfilled numeric parts start at 0
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [imageUrl, setImageUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(SAMPLE_PRESET_IMAGES[0].url);
    // Gộp trưa/tối thành 1 lựa chọn "any" (Trưa & Tối)
    const [mealType, setMealType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("any");
    const [dietType, setDietType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("vegan");
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("easy");
    const [prepTime, setPrepTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cookTime, setCookTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [servings, setServings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedCategoryIds, setSelectedCategoryIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Category Dropdown State (thay vì show ra 1 đống)
    const [categoryDropdownOpen, setCategoryDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [categorySearchQuery, setCategorySearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const categoryDropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Ingredients Form - Starts with 1 empty row, quantity = 0
    const [ingredients, setIngredients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            keyId: "init-1",
            ingredient_id: 0,
            name: "",
            quantity: 0,
            unit: "g",
            note: "",
            is_optional: false,
            avg_price_per_unit: 0,
            calories_per_100g: 0,
            protein_per_100g: 0,
            carb_per_100g: 0,
            fat_per_100g: 0,
            fiber_per_100g: 0
        }
    ]);
    // Instructions Form - Steps start empty
    const [steps, setSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        ""
    ]);
    // UI States
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [successData, setSuccessData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Active searching ingredient dropdown
    const [activeSearchIndex, setActiveSearchIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const ingredientDropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Load backend master data (ingredients & categories) from Database
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateRecipeClient.useEffect": ()=>{
            let isMounted = true;
            async function loadMasterData() {
                try {
                    const [ingRes, catRes] = await Promise.allSettled([
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$ingredientApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ingredientApiService"].getIngredients(),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeApiService"].getCategories()
                    ]);
                    if (ingRes.status === "fulfilled") {
                        const list = Array.isArray(ingRes.value) ? ingRes.value : ingRes.value?.data || [];
                        if (isMounted) setAvailableIngredients(list);
                    }
                    if (catRes.status === "fulfilled") {
                        const list = Array.isArray(catRes.value) ? catRes.value : catRes.value?.data || [];
                        if (isMounted) setCategories(list);
                    }
                } catch (err) {
                    console.error("Error loading master data for recipe creation:", err);
                } finally{
                    if (isMounted) setDataLoading(false);
                }
            }
            loadMasterData();
            return ({
                "CreateRecipeClient.useEffect": ()=>{
                    isMounted = false;
                }
            })["CreateRecipeClient.useEffect"];
        }
    }["CreateRecipeClient.useEffect"], []);
    // Close dropdowns when clicked outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateRecipeClient.useEffect": ()=>{
            function handleClickOutside(e) {
                if (ingredientDropdownRef.current && !ingredientDropdownRef.current.contains(e.target)) {
                    setActiveSearchIndex(null);
                }
                if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
                    setCategoryDropdownOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "CreateRecipeClient.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["CreateRecipeClient.useEffect"];
        }
    }["CreateRecipeClient.useEffect"], []);
    // Filtered ingredients for autocomplete (chỉ gợi ý các nguyên liệu phù hợp với dietType đã chọn)
    const filteredSuggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CreateRecipeClient.useMemo[filteredSuggestions]": ()=>{
            // Lọc theo chế độ ăn chay trước: thuần chay thì không hiện trứng, sữa
            const allowed = availableIngredients.filter({
                "CreateRecipeClient.useMemo[filteredSuggestions].allowed": (item)=>isIngredientAllowedForDiet(item, dietType)
            }["CreateRecipeClient.useMemo[filteredSuggestions].allowed"]);
            if (!searchQuery.trim()) {
                return allowed.slice(0, 15);
            }
            const q = normalizeText(searchQuery);
            return allowed.filter({
                "CreateRecipeClient.useMemo[filteredSuggestions]": (item)=>normalizeText(item.ingredient_name || "").includes(q)
            }["CreateRecipeClient.useMemo[filteredSuggestions]"]).slice(0, 20);
        }
    }["CreateRecipeClient.useMemo[filteredSuggestions]"], [
        availableIngredients,
        searchQuery,
        dietType
    ]);
    // Categories filtered for category dropdown search
    const filteredCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CreateRecipeClient.useMemo[filteredCategories]": ()=>{
            if (!categorySearchQuery.trim()) return categories;
            const q = normalizeText(categorySearchQuery);
            return categories.filter({
                "CreateRecipeClient.useMemo[filteredCategories]": (c)=>normalizeText(c.category_name || "").includes(q)
            }["CreateRecipeClient.useMemo[filteredCategories]"]);
        }
    }["CreateRecipeClient.useMemo[filteredCategories]"], [
        categories,
        categorySearchQuery
    ]);
    // Live estimated cost
    const estimatedCost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CreateRecipeClient.useMemo[estimatedCost]": ()=>{
            return ingredients.reduce({
                "CreateRecipeClient.useMemo[estimatedCost]": (sum, item)=>{
                    if (!item.ingredient_id || !item.quantity) return sum;
                    const price = Number(item.avg_price_per_unit || 0);
                    const qty = Number(item.quantity || 0);
                    const cost = price / 1000 * qty;
                    return sum + Math.round(cost);
                }
            }["CreateRecipeClient.useMemo[estimatedCost]"], 0);
        }
    }["CreateRecipeClient.useMemo[estimatedCost]"], [
        ingredients
    ]);
    // Dynamic Kcal and nutrition calculated based on input ingredients and grams
    const nutrition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CreateRecipeClient.useMemo[nutrition]": ()=>{
            let calories = 0;
            let protein = 0;
            let carbs = 0;
            let fat = 0;
            let fiber = 0;
            for (const item of ingredients){
                if (!item.ingredient_id || !item.quantity || item.is_optional) continue;
                const qty = Number(item.quantity) || 0;
                const ratio = qty / 100;
                calories += ratio * (Number(item.calories_per_100g) || 0);
                protein += ratio * (Number(item.protein_per_100g) || 0);
                carbs += ratio * (Number(item.carb_per_100g) || 0);
                fat += ratio * (Number(item.fat_per_100g) || 0);
                fiber += ratio * (Number(item.fiber_per_100g) || 0);
            }
            const numServings = Number(servings) > 0 ? Number(servings) : 1;
            return {
                totalCalories: Math.round(calories),
                caloriesPerServing: Math.round(calories / numServings),
                totalProtein: Math.round(protein * 10) / 10,
                proteinPerServing: Math.round(protein / numServings * 10) / 10,
                totalCarbs: Math.round(carbs * 10) / 10,
                carbsPerServing: Math.round(carbs / numServings * 10) / 10,
                totalFat: Math.round(fat * 10) / 10,
                fatPerServing: Math.round(fat / numServings * 10) / 10,
                totalFiber: Math.round(fiber * 10) / 10,
                fiberPerServing: Math.round(fiber / numServings * 10) / 10
            };
        }
    }["CreateRecipeClient.useMemo[nutrition]"], [
        ingredients,
        servings
    ]);
    // Handle Ingredient Selection from DB suggestions
    const handleSelectIngredient = (index, selected)=>{
        setIngredients((prev)=>{
            const updated = [
                ...prev
            ];
            updated[index] = {
                ...updated[index],
                ingredient_id: selected.ingredient_id,
                name: selected.ingredient_name,
                unit: "g",
                avg_price_per_unit: Number(selected.avg_price_per_unit || 0),
                calories_per_100g: Number(selected.calories_per_100g || 0),
                protein_per_100g: Number(selected.protein_per_100g || 0),
                carb_per_100g: Number(selected.carb_per_100g || 0),
                fat_per_100g: Number(selected.fat_per_100g || 0),
                fiber_per_100g: Number(selected.fiber_per_100g || 0)
            };
            return updated;
        });
        setActiveSearchIndex(null);
        setSearchQuery("");
    };
    const handleAddIngredientRow = ()=>{
        setIngredients((prev)=>[
                ...prev,
                {
                    keyId: `row-${Date.now()}-${Math.random()}`,
                    ingredient_id: 0,
                    name: "",
                    quantity: 0,
                    unit: "g",
                    note: "",
                    is_optional: false,
                    avg_price_per_unit: 0,
                    calories_per_100g: 0,
                    protein_per_100g: 0,
                    carb_per_100g: 0,
                    fat_per_100g: 0,
                    fiber_per_100g: 0
                }
            ]);
    };
    const handleRemoveIngredientRow = (index)=>{
        if (activeSearchIndex === index) {
            setActiveSearchIndex(null);
            setSearchQuery("");
        }
        if (ingredients.length <= 1) {
            setIngredients([
                {
                    keyId: `init-${Date.now()}`,
                    ingredient_id: 0,
                    name: "",
                    quantity: 0,
                    unit: "g",
                    note: "",
                    is_optional: false,
                    avg_price_per_unit: 0,
                    calories_per_100g: 0,
                    protein_per_100g: 0,
                    carb_per_100g: 0,
                    fat_per_100g: 0,
                    fiber_per_100g: 0
                }
            ]);
            return;
        }
        setIngredients((prev)=>prev.filter((_, i)=>i !== index));
    };
    // Handle Steps
    const handleAddStep = ()=>{
        setSteps((prev)=>[
                ...prev,
                ""
            ]);
    };
    const handleRemoveStep = (index)=>{
        if (steps.length <= 1) {
            setSteps([
                ""
            ]);
            return;
        }
        setSteps((prev)=>prev.filter((_, i)=>i !== index));
    };
    const handleStepChange = (index, val)=>{
        setSteps((prev)=>{
            const updated = [
                ...prev
            ];
            updated[index] = val;
            return updated;
        });
    };
    // Handle Category Toggle
    const handleToggleCategory = (catId)=>{
        setSelectedCategoryIds((prev)=>prev.includes(catId) ? prev.filter((id)=>id !== catId) : [
                ...prev,
                catId
            ]);
    };
    // Handle Reset Form to 0 / Empty
    const handleResetForm = ()=>{
        if (!window.confirm("Bạn có chắc muốn đặt lại toàn bộ form về ban đầu?")) return;
        setTitle("");
        setDescription("");
        setImageUrl(SAMPLE_PRESET_IMAGES[0].url);
        setPrepTime(0);
        setCookTime(0);
        setServings(0);
        setSelectedCategoryIds([]);
        setIngredients([
            {
                keyId: `init-${Date.now()}`,
                ingredient_id: 0,
                name: "",
                quantity: 0,
                unit: "g",
                note: "",
                is_optional: false,
                avg_price_per_unit: 0,
                calories_per_100g: 0,
                protein_per_100g: 0,
                carb_per_100g: 0,
                fat_per_100g: 0,
                fiber_per_100g: 0
            }
        ]);
        setSteps([
            ""
        ]);
        setErrorMsg(null);
    };
    // Handle Submit Form
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErrorMsg(null);
        if (!title.trim()) {
            setErrorMsg("Vui lòng nhập tên công thức món ăn.");
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            return;
        }
        const validIngredients = ingredients.filter((ing)=>ing.ingredient_id > 0 && Number(ing.quantity) > 0);
        if (validIngredients.length === 0) {
            setErrorMsg("Vui lòng chọn ít nhất một nguyên liệu từ kho hệ thống và nhập số lượng (g) lớn hơn 0.");
            return;
        }
        // Kiểm tra tính tương thích giữa nguyên liệu đã chọn và chế độ ăn chay
        for (const ing of validIngredients){
            if (!isIngredientAllowedForDiet(ing, dietType)) {
                setErrorMsg(`Nguyên liệu "${ing.name}" không phù hợp với chế độ ăn "${dietType}". Vui lòng đổi chế độ ăn hoặc bỏ nguyên liệu này.`);
                return;
            }
        }
        const validSteps = steps.map((s)=>s.trim()).filter((s)=>s.length > 0);
        if (validSteps.length === 0) {
            setErrorMsg("Vui lòng nhập ít nhất một bước hướng dẫn chế biến.");
            return;
        }
        const instructionsText = validSteps.map((step, idx)=>`${idx + 1}. ${step}`).join("\n");
        const payload = {
            title: title.trim(),
            description: description.trim() || undefined,
            instructions: instructionsText,
            image_url: imageUrl.trim() || undefined,
            prep_time: Math.max(0, Number(prepTime) || 0),
            cook_time: Math.max(0, Number(cookTime) || 0),
            servings: Math.max(1, Number(servings) || 1),
            difficulty,
            meal_type: mealType,
            diet_type: dietType,
            estimated_cost: estimatedCost > 0 ? estimatedCost : undefined,
            ingredients: validIngredients.map((ing)=>({
                    ingredient_id: ing.ingredient_id,
                    quantity: Number(ing.quantity),
                    unit: ing.unit || "g",
                    note: ing.note.trim() || undefined,
                    is_optional: ing.is_optional
                })),
            category_ids: selectedCategoryIds.length > 0 ? selectedCategoryIds : undefined
        };
        setIsSubmitting(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeApiService"].createRecipe(payload);
            const data = res?.data || res;
            setSuccessData(data);
        } catch (err) {
            const msg = err?.message || err?.response?.data?.message || "Có lỗi xảy ra khi tạo công thức. Vui lòng kiểm tra lại thông tin.";
            setErrorMsg(typeof msg === "string" ? msg : JSON.stringify(msg));
        } finally{
            setIsSubmitting(false);
        }
    };
    // Helper label for meal type
    const mealTypeDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CreateRecipeClient.useMemo[mealTypeDisplay]": ()=>{
            if (mealType === "breakfast") return "Bữa sáng";
            if (mealType === "snack") return "Bữa phụ";
            return "Trưa / Tối";
        }
    }["CreateRecipeClient.useMemo[mealTypeDisplay]"], [
        mealType
    ]);
    // SUCCESS STATE VIEW
    if (successData) {
        const isApproved = successData.status === "approved" || isActuallyAdmin;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppShell"], {
            showRightRail: false,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-2xl mx-auto py-16 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-md text-center space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                className: "w-9 h-9"
                            }, void 0, false, {
                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                lineNumber: 532,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 531,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold uppercase tracking-wider text-emerald-700",
                                    children: isApproved ? "Đã duyệt công khai (APPROVED)" : "Đang chờ kiểm duyệt (Pending Review)"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 536,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-serif font-bold text-2xl sm:text-3xl text-stone-900",
                                    children: [
                                        "Công thức “",
                                        successData.title || title,
                                        "” đã được tạo thành công!"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 539,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-stone-600 max-w-lg mx-auto leading-relaxed",
                                    children: isApproved ? "Bạn đã tạo công thức thành công với quyền Quản trị viên. Món ăn đã được tự động duyệt và đồng bộ ngay trên Thư viện công thức & Kế hoạch thực đơn!" : "Cảm ơn bạn đã đóng góp công thức món chay cho VeggieHub! Công thức đang được chuyển tới Ban quản trị để kiểm duyệt trước khi đưa lên Thư viện công thức."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 542,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 535,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 rounded-2xl bg-stone-50 border border-stone-100 text-xs text-stone-600 space-y-2 text-left max-w-md mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-stone-400",
                                            children: "Mã công thức:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 551,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono font-bold text-stone-800",
                                            children: [
                                                "#",
                                                successData.recipe_id || successData.id || "Mới tạo"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 552,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 550,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-stone-400",
                                            children: "Trạng thái:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 557,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `font-semibold uppercase tracking-wider ${isApproved ? "text-emerald-700" : "text-amber-700"}`,
                                            children: successData.status || (isApproved ? "APPROVED" : "pending_review")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 558,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 556,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-stone-400",
                                            children: "Năng lượng ước tính:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 567,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-amber-700",
                                            children: [
                                                nutrition.totalCalories,
                                                " kcal (",
                                                nutrition.caloriesPerServing,
                                                " kcal/phần)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 568,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 566,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-stone-400",
                                            children: "Số nguyên liệu:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 573,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-stone-800",
                                            children: [
                                                ingredients.filter((i)=>i.ingredient_id > 0).length,
                                                " thành phần"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 574,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 572,
                                    columnNumber: 15
                                }, this),
                                estimatedCost > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-stone-400",
                                            children: "Ước tính chi phí:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 580,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-emerald-800",
                                            children: [
                                                estimatedCost.toLocaleString("vi-VN"),
                                                " đ"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 581,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 579,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 549,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center justify-center gap-3 pt-2",
                            children: [
                                isActuallyAdmin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin/recipes",
                                    className: "px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm",
                                    children: "← Về Quản trị công thức"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 590,
                                    columnNumber: 17
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/recipes",
                                    className: "px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all",
                                    children: "Xem trên Thư viện công thức"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 598,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setSuccessData(null);
                                        handleResetForm();
                                    },
                                    className: "px-6 py-2.5 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-all cursor-pointer",
                                    children: "Tạo thêm công thức khác"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 605,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 588,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                    lineNumber: 530,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                lineNumber: 529,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
            lineNumber: 528,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppShell"], {
        showRightRail: false,
        fullWidth: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1440px] w-full mx-auto py-6 sm:py-8 px-2 sm:px-4 space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: isActuallyAdmin ? "/admin/recipes" : "/recipes",
                            className: "inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-emerald-700 transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 631,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: isActuallyAdmin ? "Quay lại Quản trị công thức" : "Quay lại Thư viện công thức"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 632,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 627,
                            columnNumber: 11
                        }, this),
                        isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 640,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Đang đăng với tư cách:",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "font-bold text-emerald-950",
                                            children: user?.full_name || user?.email || "Quản trị viên VeggieHub"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 643,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        "(",
                                        isActuallyAdmin ? "Quản trị viên" : "Thành viên",
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 641,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 639,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "w-3.5 h-3.5 text-amber-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 651,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Bạn chưa đăng nhập.",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login?redirect=/admin/recipes/create",
                                            className: "font-bold underline text-amber-950 hover:text-emerald-700",
                                            children: "Đăng nhập ngay"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 654,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 652,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 650,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                    lineNumber: 626,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] font-bold uppercase tracking-wider text-emerald-700",
                            children: isActuallyAdmin ? "QUẢN TRỊ CÔNG THỨC HỆ THỐNG" : "ĐÓNG GÓP CỘNG ĐỒNG"
                        }, void 0, false, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 667,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "font-serif font-bold text-2xl sm:text-3xl text-stone-900",
                            children: "Đăng công thức món chay mới"
                        }, void 0, false, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 670,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs sm:text-sm text-stone-500 max-w-2xl",
                            children: isActuallyAdmin ? "Thêm công thức chuẩn vào hệ thống VeggieHub. Công thức tạo bởi Quản trị viên sẽ được tự động kích hoạt trạng thái ĐÃ DUYỆT (APPROVED) và hiển thị trực tiếp trên Thư viện công thức và Kế hoạch thực đơn." : "Chia sẻ những món chay thơm ngon, tốt cho sức khoẻ và môi trường. Công thức sẽ được kiểm duyệt trước khi xuất hiện trên hệ thống VeggieHub."
                        }, void 0, false, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 673,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                    lineNumber: 666,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3 text-xs text-emerald-950",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                            className: "w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                        }, void 0, false, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 682,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-0.5 leading-relaxed",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-emerald-900",
                                    children: "Quy trình kiểm duyệt công thức:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 684,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-stone-600",
                                    children: isActuallyAdmin ? "Tài khoản Quản trị viên: Công thức tạo bởi quản trị viên sẽ được tự động kích hoạt trạng thái APPROVED." : "Công thức của bạn sẽ được lưu ở trạng thái PENDING_REVIEW để ban quản trị kiểm tra tính an toàn dinh dưỡng và tiêu chuẩn chay. Sau khi được duyệt, món ăn sẽ hiển thị công khai trên toàn hệ thống."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 685,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 683,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                    lineNumber: 681,
                    columnNumber: 9
                }, this),
                errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                            className: "w-4 h-4 text-rose-600 shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 696,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: errorMsg
                        }, void 0, false, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 697,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                    lineNumber: 695,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-8 space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between pb-3 border-b border-stone-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chef$2d$hat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChefHat$3e$__["ChefHat"], {
                                                            className: "w-5 h-5 text-emerald-700"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 709,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-serif font-bold text-base text-stone-900",
                                                            children: "1. Thông tin chung món ăn"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 710,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 708,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleResetForm,
                                                    className: "text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1 font-medium cursor-pointer",
                                                    title: "Đặt lại form",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 720,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Làm mới"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 721,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 714,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 707,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-bold text-stone-700",
                                                    children: [
                                                        "Tên công thức món ăn ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-rose-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 728,
                                                            columnNumber: 40
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 727,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: title,
                                                    onChange: (e)=>setTitle(e.target.value),
                                                    placeholder: "Ví dụ: Bún nấm chay chua cay, Đậu hũ sốt cà chua nấm...",
                                                    className: "w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 transition-all font-medium text-stone-800",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 730,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 726,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-bold text-stone-700",
                                                    children: "Giới thiệu & Mẹo từ đầu bếp"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 742,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    value: description,
                                                    onChange: (e)=>setDescription(e.target.value),
                                                    placeholder: "Chia sẻ lý do bạn thích món này, hương vị đặc trưng, hoặc mẹo nhỏ khi nấu...",
                                                    rows: 3,
                                                    className: "w-full px-4 py-2.5 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 transition-all font-medium text-stone-800 resize-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 745,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 741,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-bold text-stone-700 flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Ảnh món ăn (URL)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 757,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] font-normal text-stone-400",
                                                            children: "Chọn nhanh ảnh mẫu bên dưới hoặc nhập link"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 758,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 756,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "url",
                                                    value: imageUrl,
                                                    onChange: (e)=>setImageUrl(e.target.value),
                                                    placeholder: "https://images.unsplash.com/photo-...",
                                                    className: "w-full px-4 py-2 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 transition-all font-mono text-stone-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 762,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 overflow-x-auto py-1",
                                                    children: SAMPLE_PRESET_IMAGES.map((preset, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setImageUrl(preset.url),
                                                            className: `relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${imageUrl === preset.url ? "border-emerald-600 ring-2 ring-emerald-600/30" : "border-stone-200 hover:border-emerald-400 opacity-70 hover:opacity-100"}`,
                                                            title: preset.name,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: preset.url,
                                                                alt: preset.name,
                                                                fill: true,
                                                                className: "object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 784,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, idx, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 773,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 771,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 755,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-xs font-bold text-stone-700",
                                                            children: "Bữa ăn phù hợp"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 799,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: mealType,
                                                            onChange: (e)=>setMealType(e.target.value),
                                                            className: "w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 font-medium text-stone-800",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "breakfast",
                                                                    children: "Bữa sáng (Breakfast)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 807,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "any",
                                                                    children: "Bữa trưa / tối (Trưa & Tối)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 808,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "snack",
                                                                    children: "Bữa phụ / Ăn vặt (Snack)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 809,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 802,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 798,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-xs font-bold text-stone-700 flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Chế độ ăn chay"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 816,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-emerald-700 font-semibold",
                                                                    children: dietType === "vegan" ? "Không trứng & sữa" : dietType === "lacto" ? "Có sữa" : dietType === "ovo" ? "Có trứng" : "Trứng & sữa"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 817,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 815,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: dietType,
                                                            onChange: (e)=>setDietType(e.target.value),
                                                            className: "w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 font-medium text-stone-800",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "vegan",
                                                                    children: "Thuần chay (Vegan — Không trứng & sữa)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 826,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "lacto",
                                                                    children: "Chay có sữa (Lacto — Dùng sữa, không trứng)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 827,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "ovo",
                                                                    children: "Chay có trứng (Ovo — Dùng trứng, không sữa)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 828,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "ovo_lacto",
                                                                    children: "Chay trứng & sữa (Lacto-Ovo)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 829,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 821,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 814,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 796,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] font-semibold text-stone-500 uppercase",
                                                            children: "Chuẩn bị (phút)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 837,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "0",
                                                            value: prepTime === "" ? "" : prepTime,
                                                            onChange: (e)=>{
                                                                const v = e.target.value;
                                                                setPrepTime(v === "" ? "" : Math.max(0, Number(v)));
                                                            },
                                                            onBlur: ()=>{
                                                                if (prepTime === "") setPrepTime(0);
                                                            },
                                                            placeholder: "0",
                                                            className: "w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-emerald-600 font-bold text-stone-800 text-center"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 840,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 836,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] font-semibold text-stone-500 uppercase",
                                                            children: "Nấu chín (phút)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 857,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "0",
                                                            value: cookTime === "" ? "" : cookTime,
                                                            onChange: (e)=>{
                                                                const v = e.target.value;
                                                                setCookTime(v === "" ? "" : Math.max(0, Number(v)));
                                                            },
                                                            onBlur: ()=>{
                                                                if (cookTime === "") setCookTime(0);
                                                            },
                                                            placeholder: "0",
                                                            className: "w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-emerald-600 font-bold text-stone-800 text-center"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 860,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 856,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] font-semibold text-stone-500 uppercase",
                                                            children: "Khẩu phần (người)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 877,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "0",
                                                            value: servings === "" ? "" : servings,
                                                            onChange: (e)=>{
                                                                const v = e.target.value;
                                                                setServings(v === "" ? "" : Math.max(0, Number(v)));
                                                            },
                                                            onBlur: ()=>{
                                                                if (servings === "") setServings(0);
                                                            },
                                                            placeholder: "0",
                                                            className: "w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-emerald-600 font-bold text-stone-800 text-center"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 880,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 876,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] font-semibold text-stone-500 uppercase",
                                                            children: "Độ khó"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 897,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: difficulty,
                                                            onChange: (e)=>setDifficulty(e.target.value),
                                                            className: "w-full px-2 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-emerald-600 font-bold text-stone-800 text-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "easy",
                                                                    children: "Dễ"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 905,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "medium",
                                                                    children: "Vừa"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 906,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "hard",
                                                                    children: "Khó"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 907,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 900,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 896,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 835,
                                            columnNumber: 15
                                        }, this),
                                        categories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 pt-2 border-t border-stone-100 relative",
                                            ref: categoryDropdownRef,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-bold text-stone-700 flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Danh mục món ăn"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 916,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] font-medium text-stone-500",
                                                            children: selectedCategoryIds.length > 0 ? `Đã chọn: ${selectedCategoryIds.length} danh mục` : "Chưa chọn danh mục"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 917,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 915,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>setCategoryDropdownOpen(!categoryDropdownOpen),
                                                    className: "w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 focus:border-emerald-600 flex items-center justify-between cursor-pointer transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 truncate pr-2 text-stone-700 font-medium",
                                                            children: selectedCategoryIds.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-stone-400",
                                                                children: "Nhấn để chọn danh mục món ăn..."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 931,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: selectedCategoryIds.map((id)=>categories.find((c)=>c.category_id === id)?.category_name).filter(Boolean).join(", ")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 933,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 929,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                            className: `w-4 h-4 text-stone-400 transition-transform ${categoryDropdownOpen ? "rotate-180" : ""}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 941,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 925,
                                                    columnNumber: 19
                                                }, this),
                                                categoryDropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute z-30 left-0 right-0 mt-1 bg-white border border-stone-200 rounded-2xl shadow-xl p-3 space-y-2 animate-in fade-in-50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: categorySearchQuery,
                                                                    onChange: (e)=>setCategorySearchQuery(e.target.value),
                                                                    placeholder: "Tìm danh mục món...",
                                                                    className: "w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:border-emerald-600 outline-none"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 953,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                                    className: "w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 960,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 952,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "max-h-52 overflow-y-auto space-y-1 pr-1",
                                                            children: filteredCategories.length > 0 ? filteredCategories.map((cat)=>{
                                                                const isSelected = selectedCategoryIds.includes(cat.category_id);
                                                                const count = Number(cat.recipe_count ?? 0);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    onClick: ()=>handleToggleCategory(cat.category_id),
                                                                    className: `px-3 py-2 rounded-xl text-xs font-medium cursor-pointer flex items-center justify-between transition-colors ${isSelected ? "bg-emerald-50 text-emerald-950 font-semibold" : "hover:bg-stone-50 text-stone-700"}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-2.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: `w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${isSelected ? "bg-emerald-700 border-emerald-700 text-white" : "border-stone-300 bg-white"}`,
                                                                                    children: isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                        className: "w-3 h-3 stroke-[3]"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                                        lineNumber: 987,
                                                                                        columnNumber: 52
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                                    lineNumber: 980,
                                                                                    columnNumber: 35
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: cat.category_name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                                    lineNumber: 989,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                            lineNumber: 979,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 font-mono",
                                                                            children: [
                                                                                count,
                                                                                " món"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                            lineNumber: 991,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, cat.category_id, true, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 970,
                                                                    columnNumber: 31
                                                                }, this);
                                                            }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-3 text-center text-xs text-stone-400",
                                                                children: "Không tìm thấy danh mục phù hợp"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 998,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 964,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between pt-2 border-t border-stone-100 text-[11px]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setSelectedCategoryIds([]),
                                                                    className: "text-stone-400 hover:text-stone-700 font-medium cursor-pointer",
                                                                    children: "Bỏ chọn tất cả"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1006,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setCategoryDropdownOpen(false),
                                                                    className: "px-3 py-1 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 cursor-pointer",
                                                                    children: "Xong"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1013,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1005,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 950,
                                                    columnNumber: 21
                                                }, this),
                                                selectedCategoryIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1.5 pt-1",
                                                    children: selectedCategoryIds.map((id)=>{
                                                        const cat = categories.find((c)=>c.category_id === id);
                                                        if (!cat) return null;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-900 text-[11px] font-semibold border border-emerald-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: cat.category_name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1035,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleToggleCategory(id),
                                                                    className: "text-emerald-700 hover:text-rose-600 cursor-pointer",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                        className: "w-3 h-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                        lineNumber: 1041,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1036,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, id, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1031,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1026,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 914,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 706,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between pb-3 border-b border-stone-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__["UtensilsCrossed"], {
                                                            className: "w-5 h-5 text-emerald-700"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1056,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-serif font-bold text-base text-stone-900",
                                                            children: "2. Thành phần nguyên liệu & Dinh dưỡng"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1057,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1055,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                    className: "w-3.5 h-3.5 text-amber-500 fill-amber-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1063,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        nutrition.totalCalories,
                                                                        " kcal"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1064,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1062,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-stone-500 font-medium",
                                                            children: [
                                                                ingredients.filter((i)=>i.ingredient_id > 0).length,
                                                                " nguyên liệu"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1066,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1061,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 1054,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between text-xs text-stone-500",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Nguyên liệu hiển thị được tự động lọc theo chế độ ăn ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: dietType
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1074,
                                                        columnNumber: 72
                                                    }, this),
                                                    " (thuần chay sẽ không có trứng & sữa)."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1073,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 1072,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden sm:grid grid-cols-[32px_1fr_96px_48px_96px_80px_36px] gap-2.5 px-3 py-2 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: "STT"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1080,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: "Tên nguyên liệu (Gợi ý DB)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1081,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: "Số lượng"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1082,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: "Đơn vị"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1083,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: "Năng lượng"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1084,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: "Tùy chọn"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1085,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: "Xóa"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1086,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 1079,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            ref: ingredientDropdownRef,
                                            children: ingredients.map((item, idx)=>{
                                                const rowKcal = Math.round((Number(item.quantity) || 0) / 100 * (Number(item.calories_per_100g) || 0));
                                                const rowCost = Math.round((Number(item.quantity) || 0) / 1000 * (Number(item.avg_price_per_unit) || 0));
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-[32px_1fr_96px_48px_96px_80px_36px] gap-2.5 p-2 rounded-2xl bg-stone-50/70 border border-stone-200/80 hover:border-emerald-300 transition-colors items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-7 h-7 rounded-lg bg-stone-200/80 text-stone-600 font-bold text-[11px] flex items-center justify-center shrink-0 mx-auto",
                                                            children: idx + 1
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1105,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: item.name,
                                                                    onFocus: ()=>{
                                                                        setActiveSearchIndex(idx);
                                                                        setSearchQuery(item.name);
                                                                    },
                                                                    onChange: (e)=>{
                                                                        const val = e.target.value;
                                                                        setIngredients((prev)=>{
                                                                            const updated = [
                                                                                ...prev
                                                                            ];
                                                                            updated[idx] = {
                                                                                ...updated[idx],
                                                                                name: val,
                                                                                ...val.trim() === "" ? {
                                                                                    ingredient_id: 0,
                                                                                    avg_price_per_unit: 0,
                                                                                    calories_per_100g: 0,
                                                                                    protein_per_100g: 0,
                                                                                    carb_per_100g: 0,
                                                                                    fat_per_100g: 0,
                                                                                    fiber_per_100g: 0
                                                                                } : {}
                                                                            };
                                                                            return updated;
                                                                        });
                                                                        setActiveSearchIndex(idx);
                                                                        setSearchQuery(val);
                                                                    },
                                                                    placeholder: "Gõ để tìm nguyên liệu...",
                                                                    className: "w-full pl-3 pr-8 py-1.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-hidden focus:border-emerald-600 font-medium text-stone-800"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1111,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                                    className: "w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1145,
                                                                    columnNumber: 25
                                                                }, this),
                                                                activeSearchIndex === idx && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute z-20 left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white border border-stone-200 rounded-2xl shadow-xl p-1.5 space-y-1",
                                                                    children: filteredSuggestions.length > 0 ? filteredSuggestions.map((sug)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            onClick: ()=>handleSelectIngredient(idx, sug),
                                                                            className: "px-3 py-1.5 text-xs rounded-xl hover:bg-emerald-50 hover:text-emerald-950 cursor-pointer flex items-center justify-between transition-colors border-b border-stone-50 last:border-0",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-semibold block text-stone-900",
                                                                                            children: sug.ingredient_name
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                                            lineNumber: 1158,
                                                                                            columnNumber: 37
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-[10px] text-amber-700 font-medium",
                                                                                            children: [
                                                                                                sug.calories_per_100g || 0,
                                                                                                " kcal/100g"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                                            lineNumber: 1161,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                                    lineNumber: 1157,
                                                                                    columnNumber: 35
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-right",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-[11px] font-bold text-emerald-800 block",
                                                                                            children: [
                                                                                                Number(sug.avg_price_per_unit || 0).toLocaleString("vi-VN"),
                                                                                                " đ/kg"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                                            lineNumber: 1166,
                                                                                            columnNumber: 37
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-[10px] text-stone-400",
                                                                                            children: "Đơn vị: g"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                                            lineNumber: 1169,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                                    lineNumber: 1165,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            ]
                                                                        }, sug.ingredient_id, true, {
                                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                            lineNumber: 1152,
                                                                            columnNumber: 33
                                                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "p-3 text-center text-xs text-stone-400",
                                                                        children: [
                                                                            "Không tìm thấy nguyên liệu (hoặc không phù hợp với chế độ ",
                                                                            dietType,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                        lineNumber: 1174,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1149,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1110,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "0",
                                                                step: "any",
                                                                value: item.quantity === "" ? "" : item.quantity,
                                                                onChange: (e)=>{
                                                                    const val = e.target.value === "" ? "" : Math.max(0, Number(e.target.value));
                                                                    setIngredients((prev)=>{
                                                                        const updated = [
                                                                            ...prev
                                                                        ];
                                                                        updated[idx] = {
                                                                            ...updated[idx],
                                                                            quantity: val
                                                                        };
                                                                        return updated;
                                                                    });
                                                                },
                                                                onBlur: ()=>{
                                                                    if (item.quantity === "") {
                                                                        setIngredients((prev)=>{
                                                                            const updated = [
                                                                                ...prev
                                                                            ];
                                                                            updated[idx] = {
                                                                                ...updated[idx],
                                                                                quantity: 0
                                                                            };
                                                                            return updated;
                                                                        });
                                                                    }
                                                                },
                                                                placeholder: "0",
                                                                className: "w-full px-2 py-1.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-hidden focus:border-emerald-600 font-bold text-stone-800 text-center"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1184,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1183,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-center text-xs font-semibold text-stone-500 bg-stone-100/80 py-1.5 rounded-xl border border-stone-200 select-none",
                                                            children: "g"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1212,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-center",
                                                            children: item.ingredient_id > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-bold text-amber-800 bg-amber-100/90 px-2 py-1 rounded-lg inline-flex items-center gap-0.5 whitespace-nowrap",
                                                                title: `Chi phí ước tính: ~${rowCost.toLocaleString("vi-VN")} đ`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                        className: "w-2.5 h-2.5 text-amber-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                        lineNumber: 1223,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    rowKcal,
                                                                    " kcal"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1219,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-stone-400 font-mono",
                                                                children: "0 kcal"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1227,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1217,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: item.is_optional,
                                                                    onChange: (e)=>{
                                                                        const checked = e.target.checked;
                                                                        setIngredients((prev)=>{
                                                                            const updated = [
                                                                                ...prev
                                                                            ];
                                                                            updated[idx] = {
                                                                                ...updated[idx],
                                                                                is_optional: checked
                                                                            };
                                                                            return updated;
                                                                        });
                                                                    },
                                                                    className: "rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer",
                                                                    title: "Đánh dấu nguyên liệu tùy chọn"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1233,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-stone-400 select-none hidden sm:inline",
                                                                    children: "Tùy chọn"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1247,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1232,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleRemoveIngredientRow(idx),
                                                                className: "text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer",
                                                                title: ingredients.length > 1 ? "Xóa dòng nguyên liệu này" : "Xóa / Làm sạch nguyên liệu đã chọn",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1262,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1252,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1251,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, item.keyId, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1100,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 1090,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleAddIngredientRow,
                                            className: "w-full py-2.5 rounded-2xl border-2 border-dashed border-stone-200 hover:border-emerald-400 text-emerald-700 text-xs font-bold transition-all flex items-center justify-center gap-2 hover:bg-emerald-50/50 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1276,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Thêm dòng nguyên liệu"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1277,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 1271,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                    className: "w-4 h-4 text-amber-600 fill-amber-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1284,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold text-amber-950 uppercase tracking-wider",
                                                                    children: "Dinh dưỡng & Năng lượng tính tự động"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1285,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1283,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] font-black text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full",
                                                            children: [
                                                                nutrition.totalCalories,
                                                                " kcal tổng món"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1289,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1282,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-stone-500 font-medium block",
                                                                    children: "Năng lượng / phần"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1296,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-black text-amber-600",
                                                                    children: [
                                                                        nutrition.caloriesPerServing,
                                                                        " ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-normal text-stone-500",
                                                                            children: "kcal"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                            lineNumber: 1298,
                                                                            columnNumber: 54
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1297,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1295,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-stone-500 font-medium block",
                                                                    children: "Chất đạm (Protein)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1303,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-black text-emerald-700",
                                                                    children: [
                                                                        nutrition.totalProtein,
                                                                        " ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-normal text-stone-500",
                                                                            children: "g"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                            lineNumber: 1305,
                                                                            columnNumber: 48
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1304,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1302,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-stone-500 font-medium block",
                                                                    children: "Tinh bột (Carbs)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1310,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-black text-blue-700",
                                                                    children: [
                                                                        nutrition.totalCarbs,
                                                                        " ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-normal text-stone-500",
                                                                            children: "g"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                            lineNumber: 1312,
                                                                            columnNumber: 46
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1311,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1309,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-stone-500 font-medium block",
                                                                    children: "Chất béo (Fat)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1317,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-black text-rose-700",
                                                                    children: [
                                                                        nutrition.totalFat,
                                                                        " ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-normal text-stone-500",
                                                                            children: "g"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                            lineNumber: 1319,
                                                                            columnNumber: 44
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                    lineNumber: 1318,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1316,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1294,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-stone-500 italic",
                                                    children: "* Lượng calo (kcal) và các chỉ số dinh dưỡng được tự động tính toán dựa trên khối lượng (g) nguyên liệu bạn chọn từ cơ sở dữ liệu VeggieHub."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1324,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 1281,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 1053,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between pb-3 border-b border-stone-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                            className: "w-5 h-5 text-amber-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1334,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-serif font-bold text-base text-stone-900",
                                                            children: "3. Hướng dẫn chế biến (Từng bước)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1335,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1333,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-stone-500 font-medium",
                                                    children: [
                                                        steps.filter((s)=>s.trim().length > 0).length,
                                                        " bước đã nhập"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1339,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 1332,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: steps.map((step, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-1 shadow-2xs",
                                                            children: idx + 1
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1347,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 relative",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                rows: 2,
                                                                value: step,
                                                                onChange: (e)=>handleStepChange(idx, e.target.value),
                                                                placeholder: `Mô tả bước ${idx + 1} (để trống nếu chưa nhập)...`,
                                                                className: "w-full px-3.5 py-2 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 transition-all font-medium text-stone-800 resize-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1351,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1350,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>handleRemoveStep(idx),
                                                            className: "text-stone-400 hover:text-rose-600 p-2 transition-colors mt-0.5 cursor-pointer",
                                                            title: steps.length > 1 ? "Xóa bước này" : "Xóa / Làm trống bước này",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1365,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1359,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1346,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 1344,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleAddStep,
                                            className: "w-full py-2.5 rounded-2xl border-2 border-dashed border-stone-200 hover:border-emerald-400 text-emerald-700 text-xs font-bold transition-all flex items-center justify-center gap-2 hover:bg-emerald-50/50 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1376,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Thêm bước thực hiện"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1377,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                            lineNumber: 1371,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                    lineNumber: 1331,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 704,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-4 space-y-6 sticky top-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between pb-2 border-b border-stone-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                        className: "w-3.5 h-3.5 text-amber-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1388,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Xem trước hiển thị (Live Preview)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1387,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200",
                                                children: isActuallyAdmin ? "Sẽ duyệt (APPROVED)" : "Chờ duyệt (PENDING)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1390,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                        lineNumber: 1386,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl overflow-hidden border border-stone-100 bg-stone-50 space-y-3 pb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative aspect-[16/10] w-full bg-stone-200",
                                                children: [
                                                    imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: imageUrl,
                                                        alt: title || "Công thức món",
                                                        fill: true,
                                                        className: "object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1399,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full h-full flex items-center justify-center text-stone-400 text-xs",
                                                        children: "Chưa có ảnh"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1406,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-3 left-3 flex flex-wrap gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-700 text-white shadow-xs uppercase",
                                                                children: mealTypeDisplay
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1411,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-stone-800 border border-white/50",
                                                                children: dietType
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1414,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1410,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1397,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-serif font-bold text-base text-stone-900 leading-snug line-clamp-1",
                                                        children: title || "Tên món ăn của bạn sẽ hiển thị ở đây"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1421,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-stone-500 line-clamp-2",
                                                        children: description || "Giới thiệu ngắn gọn về hương vị và cách thưởng thức món chay này."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1424,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between text-xs text-stone-600 pt-2 border-t border-stone-200/60",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1 text-stone-500",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                        className: "w-3.5 h-3.5 text-emerald-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                        lineNumber: 1430,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            (Number(prepTime) || 0) + (Number(cookTime) || 0),
                                                                            " phút"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                        lineNumber: 1431,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1429,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1 text-stone-500",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                        className: "w-3.5 h-3.5 text-violet-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                        lineNumber: 1435,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            Number(servings) || 0,
                                                                            " người"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                        lineNumber: 1436,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1434,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1 font-bold text-amber-700",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                        className: "w-3.5 h-3.5 text-amber-500 fill-amber-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                        lineNumber: 1440,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            nutrition.caloriesPerServing || 0,
                                                                            " kcal"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                        lineNumber: 1441,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1439,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-bold text-emerald-800",
                                                                children: estimatedCost > 0 ? `${estimatedCost.toLocaleString("vi-VN")} đ` : "0 đ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                                lineNumber: 1444,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1428,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1420,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                        lineNumber: 1396,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2 text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-stone-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Số nguyên liệu đã chọn:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1454,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: [
                                                            ingredients.filter((i)=>i.ingredient_id > 0).length,
                                                            " thành phần"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1455,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1453,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-stone-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Số bước chế biến:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1460,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: [
                                                            steps.filter((s)=>s.trim().length > 0).length,
                                                            " bước"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1461,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1459,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-stone-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Tổng năng lượng món ăn:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1466,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-amber-800",
                                                        children: [
                                                            nutrition.totalCalories,
                                                            " kcal (",
                                                            nutrition.caloriesPerServing,
                                                            " kcal/phần)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1467,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1465,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-stone-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Chỉ số dinh dưỡng:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1472,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-stone-800",
                                                        children: [
                                                            nutrition.totalProtein,
                                                            "g đạm • ",
                                                            nutrition.totalCarbs,
                                                            "g carbs • ",
                                                            nutrition.totalFat,
                                                            "g béo"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1473,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1471,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-emerald-950 font-bold pt-1 border-t border-emerald-200/60 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Chi phí nguyên liệu ước tính:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1478,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            estimatedCost.toLocaleString("vi-VN"),
                                                            " đ"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                        lineNumber: 1479,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1477,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-stone-400 italic",
                                                children: "* Năng lượng (kcal) và chi phí được tính toán tự động dựa trên nguyên liệu và khối lượng bạn chọn từ hệ thống."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1481,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                        lineNumber: 1452,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 pt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: isSubmitting,
                                                className: "w-full py-3.5 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer",
                                                children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1494,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1497,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: isActuallyAdmin ? "Tạo & Phê duyệt công thức ngay (Admin)" : "Gửi duyệt công thức (Member)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                            lineNumber: 1498,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                    lineNumber: 1496,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1488,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-center text-[11px] text-stone-400",
                                                children: isActuallyAdmin ? "Công thức tạo bởi Quản trị viên sẽ được tự động kích hoạt trạng thái APPROVED." : "Nhấn gửi đồng nghĩa bạn đồng ý với tiêu chuẩn cộng đồng VeggieHub."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                                lineNumber: 1503,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                        lineNumber: 1487,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                                lineNumber: 1385,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                            lineNumber: 1383,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
                    lineNumber: 702,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
            lineNumber: 624,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/recipes/create/CreateRecipeClient.tsx",
        lineNumber: 623,
        columnNumber: 5
    }, this);
}
_s(CreateRecipeClient, "8Nv1pPpBsQHb4Fh3z1BwzVnQWTA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = CreateRecipeClient;
var _c;
__turbopack_context__.k.register(_c, "CreateRecipeClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/AppShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppShell",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$RightRail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/RightRail.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ProfileIncompleteBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ProfileIncompleteBanner.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function AppShell({ children, showRightRail = true, rightRail, fullWidth = false }) {
    _s();
    const [mobileSidebarOpen, setMobileSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-100 selection:text-emerald-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/AppShell.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden fixed bottom-5 right-5 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setMobileSidebarOpen(!mobileSidebarOpen),
                    className: "w-12 h-12 rounded-full bg-emerald-700 text-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-emerald-800 transition-colors",
                    "aria-label": "Toggle Navigation",
                    children: mobileSidebarOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-6 h-6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/AppShell.tsx",
                        lineNumber: 38,
                        columnNumber: 32
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                        className: "w-6 h-6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/AppShell.tsx",
                        lineNumber: 38,
                        columnNumber: 60
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/AppShell.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AppShell.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:block shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {}, void 0, false, {
                            fileName: "[project]/src/components/layout/AppShell.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/AppShell.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    mobileSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:hidden fixed inset-0 z-40 flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity",
                                onClick: ()=>setMobileSidebarOpen(false)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/AppShell.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-50 w-[270px] bg-white h-full shadow-2xl overflow-y-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {}, void 0, false, {
                                    fileName: "[project]/src/components/layout/AppShell.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/AppShell.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/AppShell.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: `flex-1 min-w-0 p-6 md:p-9 flex flex-col ${showRightRail ? "xl:flex-row gap-9 justify-center items-start" : "items-center"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `min-w-0 w-full ${showRightRail ? "flex-1 max-w-[1150px]" : fullWidth ? "max-w-[1440px]" : "max-w-[1240px]"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ProfileIncompleteBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfileIncompleteBanner"], {}, void 0, false, {
                                        fileName: "[project]/src/components/layout/AppShell.tsx",
                                        lineNumber: 80,
                                        columnNumber: 13
                                    }, this),
                                    children
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/AppShell.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            showRightRail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shrink-0 w-full xl:w-[360px]",
                                children: rightRail || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$RightRail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RightRail"], {}, void 0, false, {
                                    fileName: "[project]/src/components/layout/AppShell.tsx",
                                    lineNumber: 87,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/AppShell.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/AppShell.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/AppShell.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/AppShell.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(AppShell, "QmCnUfcaPHeTVJMrGrD+f7lhJlc=");
_c = AppShell;
var _c;
__turbopack_context__.k.register(_c, "AppShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$leaf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Leaf$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/leaf.mjs [app-client] (ecmascript) <export default as Leaf>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/context/RoleContext.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/RoleContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/notification/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$components$2f$NotificationBell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/notification/components/NotificationBell.tsx [app-client] (ecmascript)");
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
;
function Header() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isGuest, role, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"])();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSearchKeyDown = (e)=>{
        if (e.key === "Enter" && searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 h-[72px] w-full bg-white border-b border-stone-200 flex items-center justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[270px] h-full flex items-center pl-[26px] gap-2.5 shrink-0 border-r border-stone-200 lg:border-r-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "flex items-center gap-2.5 select-none group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm flex items-center justify-center text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$leaf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Leaf$3e$__["Leaf"], {
                                className: "w-5 h-5 text-white",
                                strokeWidth: 1.75
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Header.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-serif font-bold text-2xl tracking-tight leading-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-stone-900",
                                    children: "Veggie"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-emerald-700",
                                    children: "Hub"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Header.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 max-w-[646px] ml-2 mr-4 hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-11 bg-stone-50 border border-stone-200 rounded-full px-4 flex items-center gap-3 focus-within:border-emerald-600 focus-within:bg-white transition-all shadow-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "w-[18px] h-[18px] text-stone-400 shrink-0",
                            strokeWidth: 1.75
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: searchQuery,
                            onChange: (e)=>setSearchQuery(e.target.value),
                            onKeyDown: handleSearchKeyDown,
                            placeholder: "Tìm món ăn, bài viết, quán chay…",
                            className: "w-full bg-transparent text-base text-stone-900 placeholder:text-stone-400 outline-none"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Header.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-5 pr-7 shrink-0 ml-auto md:ml-0",
                children: isGuest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/login",
                            className: "text-base font-medium text-stone-800 hover:text-stone-950 transition-colors cursor-pointer",
                            children: "Đăng nhập"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/register",
                            className: "h-9 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
                            children: "Đăng ký"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Header.tsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$components$2f$NotificationBell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotificationBell"], {}, void 0, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/me",
                            className: "flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-stone-50 transition-colors group cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                    initials: user?.full_name ? user.full_name.split(" ").map((n)=>n[0]).join("").slice(0, 2).toUpperCase() : role === "Admin" ? "AD" : "ME",
                                    verified: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden sm:flex flex-col text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors",
                                                    children: user?.full_name || (role === "Admin" ? "Admin User" : "Member")
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Header.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: role === "Admin" ? "flagged" : "success",
                                                    className: "text-[10px] px-1.5 py-0",
                                                    children: role
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Header.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Header.tsx",
                                            lineNumber: 97,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-stone-500",
                                            children: user?.email || (role === "Admin" ? "System Operator" : "@member")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Header.tsx",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Header.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Header.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Header.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(Header, "2mQdICqRC9ZraS3v2i/xVqvuOu8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/RightRail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RightRail",
    ()=>RightRail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/places/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$components$2f$PlaceRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/places/components/PlaceRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$data$2f$mockPlaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/places/data/mockPlaces.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/community/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$data$2f$mockForum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/data/mockForum.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/context/RoleContext.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/RoleContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function MapTeardropPin({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 30",
        width: "24",
        height: "30",
        className: className,
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 0C5.373 0 0 5.373 0 12C0 19.5 12 30 12 30C12 30 24 19.5 24 12C24 5.373 18.627 0 12 0Z",
                className: "fill-emerald-600 drop-shadow-sm"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/RightRail.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "11",
                r: "4.5",
                className: "fill-white"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/RightRail.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/RightRail.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = MapTeardropPin;
function RightRail() {
    _s();
    const { isGuest } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-[360px] shrink-0 space-y-[22px] select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "w-[18px] h-[18px] text-emerald-600",
                                strokeWidth: 2
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/RightRail.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-serif font-bold text-xl text-stone-900 tracking-tight",
                                children: "Trending topics"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/RightRail.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/RightRail.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col divide-y divide-stone-100",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$data$2f$mockForum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRENDING_TOPICS"].map((topic)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/forum",
                                className: "py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-sm transition-colors hover:bg-stone-50 px-1 -mx-1 rounded group cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-stone-900 group-hover:text-emerald-700",
                                        children: topic.tag
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/RightRail.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-stone-500",
                                        children: topic.posts
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/RightRail.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, topic.tag, true, {
                                fileName: "[project]/src/components/layout/RightRail.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/RightRail.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/RightRail.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden rounded-[20px] border border-stone-200 bg-white shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-[127px] w-full bg-gradient-to-br from-map-from to-map-to overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "absolute inset-0 w-full h-full pointer-events-none",
                                viewBox: "0 0 360 127",
                                fill: "none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M-20 45 C 70 85, 170 15, 380 95",
                                        stroke: "white",
                                        strokeWidth: "10",
                                        strokeLinecap: "round",
                                        strokeOpacity: "0.9"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/RightRail.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M100 -20 C 145 65, 215 85, 290 150",
                                        stroke: "white",
                                        strokeWidth: "8",
                                        strokeLinecap: "round",
                                        strokeOpacity: "0.9"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/RightRail.tsx",
                                        lineNumber: 80,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/RightRail.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -translate-x-1/2 -translate-y-full",
                                style: {
                                    left: "102px",
                                    top: "35px"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapTeardropPin, {}, void 0, false, {
                                    fileName: "[project]/src/components/layout/RightRail.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/RightRail.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -translate-x-1/2 -translate-y-full",
                                style: {
                                    left: "274px",
                                    top: "25px"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapTeardropPin, {}, void 0, false, {
                                    fileName: "[project]/src/components/layout/RightRail.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/RightRail.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -translate-x-1/2 -translate-y-full",
                                style: {
                                    left: "210px",
                                    top: "61px"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapTeardropPin, {}, void 0, false, {
                                    fileName: "[project]/src/components/layout/RightRail.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/RightRail.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/RightRail.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif font-bold text-xl text-stone-900 tracking-tight",
                                        children: "Vegan spots near you"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/RightRail.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-stone-400",
                                        children: "Ho Chi Minh City"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/RightRail.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/RightRail.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col space-y-0.5",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$data$2f$mockPlaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VEGAN_PLACES"].slice(0, 3).map((place)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$components$2f$PlaceRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaceRow"], {
                                        name: place.name,
                                        sub: `${place.district} · ${place.distance}`,
                                        rating: place.rating
                                    }, place.id, false, {
                                        fileName: "[project]/src/components/layout/RightRail.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/RightRail.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/shops",
                                className: "mt-4 w-full h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-base font-medium transition-colors inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Open map"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/RightRail.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "w-4 h-4",
                                        strokeWidth: 1.75
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/RightRail.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/RightRail.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/RightRail.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/RightRail.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/RightRail.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(RightRail, "Z0/ZxOGJ22OM7cyteCjy0lsFads=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"]
    ];
});
_c1 = RightRail;
var _c, _c1;
__turbopack_context__.k.register(_c, "MapTeardropPin");
__turbopack_context__.k.register(_c1, "RightRail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/compass.mjs [app-client] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CirclePlay$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.mjs [app-client] (ecmascript) <export default as CirclePlay>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/messages-square.mjs [app-client] (ecmascript) <export default as MessagesSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.mjs [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.mjs [app-client] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.mjs [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.mjs [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.mjs [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cpu.mjs [app-client] (ecmascript) <export default as Cpu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scan-line.mjs [app-client] (ecmascript) <export default as ScanLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.mjs [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/utensils-crossed.mjs [app-client] (ecmascript) <export default as UtensilsCrossed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$carrot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Carrot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/carrot.mjs [app-client] (ecmascript) <export default as Carrot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.mjs [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.mjs [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/context/RoleContext.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/RoleContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Sidebar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { role, isGuest, isAdmin, user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"])();
    const isAdminRoute = pathname.startsWith("/admin");
    // Navigation for Normal User App
    const exploreNavItems = [
        {
            label: "Discover",
            href: "/",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"],
            active: pathname === "/"
        },
        {
            label: "Công thức món",
            href: "/recipes",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__["UtensilsCrossed"],
            active: pathname === "/recipes" || pathname.startsWith("/recipes/")
        },
        {
            label: "Video nấu ăn",
            href: "/videos",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CirclePlay$3e$__["CirclePlay"],
            active: pathname === "/videos" || pathname.startsWith("/videos/")
        },
        {
            label: "Quản lý tủ lạnh & Quét AI",
            href: "/planner/scan",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__["ScanLine"],
            active: pathname.startsWith("/planner/scan"),
            badge: "AI Match"
        }
    ];
    const wellnessNavItems = [
        {
            label: "Kế hoạch thực đơn",
            href: "/planner",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"],
            active: pathname === "/planner",
            lock: isGuest
        },
        {
            label: "Tư vấn dinh dưỡng AI",
            href: "/ai",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
            active: pathname === "/ai" || pathname.startsWith("/ai/"),
            badge: "Beta"
        },
        {
            label: "Diễn đàn cộng đồng",
            href: "/forum",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__["MessagesSquare"],
            active: pathname === "/forum" || pathname.startsWith("/forum/")
        },
        {
            label: "Điểm ăn chay lân cận",
            href: "/shops",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
            active: pathname === "/shops" || pathname.startsWith("/shops/")
        }
    ];
    const mySpaceNavItems = [
        {
            label: "Hồ sơ & Yêu thích",
            href: "/me",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
            active: pathname === "/me"
        },
        {
            label: "Cài đặt & Dị ứng",
            href: "/me/settings",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
            active: pathname === "/me/settings"
        }
    ];
    // Navigation Dedicated to Admin Management (/admin/*)
    const adminDashboardItems = [
        {
            label: "Tổng quan quản trị",
            href: "/admin",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
            active: pathname === "/admin"
        }
    ];
    const adminContentItems = [
        {
            label: "Danh mục món ăn",
            href: "/admin/categories",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"],
            active: pathname.startsWith("/admin/categories")
        },
        {
            label: "Nguyên liệu hệ thống",
            href: "/admin/ingredients",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$carrot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Carrot$3e$__["Carrot"],
            active: pathname.startsWith("/admin/ingredients")
        },
        {
            label: "Quản trị công thức",
            href: "/admin/recipes",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__["UtensilsCrossed"],
            active: pathname.startsWith("/admin/recipes")
        },
        {
            label: "Hàng đợi kiểm duyệt",
            href: "/admin/moderation",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"],
            active: pathname.startsWith("/admin/moderation")
        },
        {
            label: "Thư viện nội dung",
            href: "/admin/content",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
            active: pathname === "/admin/content"
        }
    ];
    const adminSystemItems = [
        {
            label: "Thành viên & Phân quyền",
            href: "/admin/members",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
            active: pathname.startsWith("/admin/members")
        },
        {
            label: "Mô hình AI & Nhật ký",
            href: "/admin/ai",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__["Cpu"],
            active: pathname.startsWith("/admin/ai")
        }
    ];
    const renderNavGroup = (items)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "flex flex-col space-y-1",
            children: items.map((item)=>{
                const Icon = item.icon;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: item.href,
                    className: `min-h-[44px] px-3 py-1.5 rounded-xl flex items-center justify-between text-[14px] font-medium transition-all group ${item.active ? "bg-emerald-50 text-emerald-950 font-semibold shadow-xs border border-emerald-100" : "text-stone-600 hover:bg-stone-100/80 hover:text-stone-900"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${item.active ? "bg-emerald-600 text-white shadow-xs" : "bg-stone-100 text-stone-500 group-hover:bg-stone-200/80 group-hover:text-stone-800"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "w-3.5 h-3.5",
                                        strokeWidth: item.active ? 2.25 : 1.75
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 201,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate",
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, this),
                        item.lock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                            className: "w-3.5 h-3.5 text-stone-300 shrink-0 ml-2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 210,
                            columnNumber: 15
                        }, this),
                        item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: "beta",
                            className: "ml-2 shrink-0 text-[10px] px-1.5 py-0",
                            children: item.badge
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 213,
                            columnNumber: 15
                        }, this),
                        item.flagCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: "flagged",
                            className: "ml-2 shrink-0 text-[10px] px-1.5 py-0",
                            children: item.flagCount
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 218,
                            columnNumber: 15
                        }, this)
                    ]
                }, item.label, true, {
                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                    lineNumber: 186,
                    columnNumber: 11
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/src/components/layout/Sidebar.tsx",
            lineNumber: 182,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "sticky top-[72px] w-[275px] h-[calc(100vh-72px)] overflow-y-auto bg-white border-r border-stone-200 p-4 flex flex-col justify-between shrink-0 select-none scrollbar-thin",
        children: isAdminRoute ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors group border border-stone-200/80 hover:border-emerald-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-stone-400 group-hover:text-emerald-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 241,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Quay lại VeggieHub"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-xl bg-gradient-to-br from-emerald-800 to-stone-900 text-white shadow-xs",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 rounded-md bg-emerald-600/60 flex items-center justify-center shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                            className: "w-3.5 h-3.5 text-emerald-300"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 249,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 248,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-xs font-bold uppercase tracking-wider text-emerald-100",
                                                children: "Admin Portal"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 252,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-emerald-300/80 truncate",
                                                children: "Quản trị & Kiểm duyệt"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 255,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 251,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 247,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 246,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5",
                                    children: "DASHBOARD"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, this),
                                renderNavGroup(adminDashboardItems)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 263,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-3 border-t border-stone-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5",
                                    children: "NỘI DUNG & DANH MỤC"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 272,
                                    columnNumber: 15
                                }, this),
                                renderNavGroup(adminContentItems)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 271,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-3 border-t border-stone-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5",
                                    children: "THÀNH VIÊN & HỆ THỐNG"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 280,
                                    columnNumber: 15
                                }, this),
                                renderNavGroup(adminSystemItems)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 279,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                    lineNumber: 235,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-4 border-t border-stone-100 mt-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0",
                                        children: user?.full_name ? user.full_name.charAt(0).toUpperCase() : "A"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 291,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold text-stone-900 truncate",
                                                children: user?.full_name || "Admin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 295,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-emerald-700 font-medium truncate flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Administrator"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 298,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 294,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 290,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: logout,
                                title: "Đăng xuất",
                                className: "w-7 h-7 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 311,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 305,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 289,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                    lineNumber: 288,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/Sidebar.tsx",
            lineNumber: 234,
            columnNumber: 9
        }, this) : /* ============================================================== */ /* VIEW MODE 2: CLIENT USER APP SIDEBAR (Normal user pages)        */ /* ============================================================== */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5",
                                    children: "KHÁM PHÁ"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 324,
                                    columnNumber: 15
                                }, this),
                                renderNavGroup(exploreNavItems)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 323,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4 border-t border-stone-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5",
                                    children: "DINH DƯỠNG & CỘNG ĐỒNG"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 332,
                                    columnNumber: 15
                                }, this),
                                renderNavGroup(wellnessNavItems)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 331,
                            columnNumber: 13
                        }, this),
                        !isGuest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4 border-t border-stone-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5",
                                    children: "CÁ NHÂN"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 341,
                                    columnNumber: 17
                                }, this),
                                renderNavGroup(mySpaceNavItems)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 340,
                            columnNumber: 15
                        }, this),
                        isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4 border-t border-stone-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5",
                                    children: "QUẢN TRỊ VIÊN"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 351,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin",
                                    className: "min-h-[44px] px-3.5 py-2 rounded-xl flex items-center justify-between text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-all shadow-xs group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                    className: "w-4 h-4 text-emerald-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Vào trang Quản trị"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                    lineNumber: 360,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 358,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30",
                                            children: "Admin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 362,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 354,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 350,
                            columnNumber: 15
                        }, this),
                        isGuest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 rounded-2xl bg-emerald-800 relative overflow-hidden text-white shadow-sm mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-24 rounded-full bg-emerald-700 absolute -top-6 -right-6 pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 372,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-20 rounded-full bg-amber-400/20 absolute -bottom-6 -right-6 pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 373,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "w-5 h-5 text-amber-400"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 376,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "mt-2 font-serif font-bold text-base leading-snug text-white",
                                            children: "Kế hoạch món chay & AI thông minh."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 377,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-emerald-200/85",
                                            children: "Đăng ký miễn phí ngay hôm nay."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 380,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/register",
                                            className: "mt-3.5 w-full h-8 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-semibold transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center",
                                            children: "Tạo tài khoản miễn phí"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                                            lineNumber: 383,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 375,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 371,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                    lineNumber: 321,
                    columnNumber: 11
                }, this),
                !isGuest && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-3 border-t border-stone-100 mt-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0",
                                        children: user.full_name ? user.full_name.charAt(0).toUpperCase() : "U"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 399,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-medium text-stone-900 truncate",
                                                children: user.full_name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 403,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-stone-500 truncate",
                                                children: user.email
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                                lineNumber: 406,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 402,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 398,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: logout,
                                title: "Đăng xuất",
                                className: "w-6 h-6 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                                    lineNumber: 415,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 409,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 397,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                    lineNumber: 396,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/Sidebar.tsx",
            lineNumber: 320,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Sidebar.tsx",
        lineNumber: 229,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "M52bI02W59zXhCsx3hJ6AgKH9Ko=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
;
;
function Avatar({ initials, verified = true, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative inline-block ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center ring-2 ring-white select-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-semibold text-amber-800 tracking-wider",
                    children: initials
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Avatar.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Avatar.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-600 ring-2 ring-emerald-900 flex items-center justify-center text-white",
                title: "Verified creator",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    className: "w-2.5 h-2.5 stroke-[3]"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Avatar.tsx",
                    lineNumber: 28,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Avatar.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Avatar.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = Avatar;
var _c;
__turbopack_context__.k.register(_c, "Avatar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Badge({ variant = "info", className = "", children, ...props }) {
    const variantStyles = {
        beta: "rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800",
        recipeOfDay: "h-8 px-3 rounded-full bg-amber-400 text-amber-950 text-sm font-semibold inline-flex items-center gap-1.5",
        info: "rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800",
        success: "rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-800",
        flagged: "rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-50 text-red-700"
    }[variant];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center ${variantStyles} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Badge.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Card({ className = "", children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-white border border-stone-200 rounded-[20px] shadow-sm p-6 overflow-hidden ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/ProfileIncompleteBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfileIncompleteBanner",
    ()=>ProfileIncompleteBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/auth/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/hooks/useProfile.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const FIELD_LABEL_MAP = {
    height_cm: "chiều cao",
    weight_kg: "cân nặng",
    age: "độ tuổi",
    gender: "giới tính",
    activity_level: "mức độ vận động",
    diet_type: "chế độ ăn chay",
    current_goal_id: "mục tiêu"
};
function ProfileIncompleteBanner() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { profile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"])();
    const [dismissed, setDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfileIncompleteBanner.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== "undefined" && window.sessionStorage.getItem("dismissed_profile_banner") === "true") {
                setDismissed(true);
            }
        }
    }["ProfileIncompleteBanner.useEffect"], []);
    // Không hiển thị nếu chưa đăng nhập, đã đóng, hoặc đang ở trang /me/settings
    if (!isAuthenticated || dismissed || pathname === "/me/settings") {
        return null;
    }
    // Nếu profile_complete rõ ràng là true thì không hiện
    if (profile?.profile_complete === true) return null;
    // Nếu profile đã có đủ height và weight và không có missing_profile_fields thì coi như đầy đủ
    const hasBasicMetrics = Number(profile?.height) > 0 && Number(profile?.weight) > 0 && Number(profile?.age) > 0;
    if (profile?.profile_complete === undefined && hasBasicMetrics) {
        return null;
    }
    const missingFields = profile?.missing_profile_fields || [];
    const missingText = missingFields.length > 0 ? missingFields.map((f)=>FIELD_LABEL_MAP[f] || f).join(", ") : "chiều cao, cân nặng, độ tuổi, mục tiêu dinh dưỡng";
    const handleUpdateClick = ()=>{
        setDismissed(true);
        if ("TURBOPACK compile-time truthy", 1) {
            window.sessionStorage.setItem("dismissed_profile_banner", "true");
        }
        router.push("/me/settings");
    };
    const handleDismiss = ()=>{
        setDismissed(true);
        if ("TURBOPACK compile-time truthy", 1) {
            window.sessionStorage.setItem("dismissed_profile_banner", "true");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full mb-6 animate-in fade-in slide-in-from-top-2 duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-950",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                className: "w-5 h-5 text-amber-600"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-bold text-amber-900",
                                    children: "Hãy cập nhật hồ sơ để nhận thực đơn chính xác"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-amber-800/90 mt-0.5",
                                    children: [
                                        "Hồ sơ của bạn còn thiếu ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-amber-950",
                                            children: missingText
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                                            lineNumber: 80,
                                            columnNumber: 39
                                        }, this),
                                        ". Hệ thống cần các chỉ số này để tính calo chuẩn và lập thực đơn khoa học."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 self-end sm:self-auto shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleUpdateClick,
                            className: "h-9 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer",
                            children: [
                                "Cập nhật ngay",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleDismiss,
                            className: "p-1.5 rounded-lg text-amber-700/70 hover:text-amber-900 hover:bg-amber-100/50 transition-colors cursor-pointer",
                            title: "Đóng thông báo",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/ProfileIncompleteBanner.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(ProfileIncompleteBanner, "UmW72o2q0w4izCNapW6PNdht6Sw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"]
    ];
});
_c = ProfileIncompleteBanner;
var _c;
__turbopack_context__.k.register(_c, "ProfileIncompleteBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Rating.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Rating",
    ()=>Rating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.mjs [app-client] (ecmascript) <export default as Star>");
;
;
function Rating({ score, reviewsCount, variant = "placeRow", className = "" }) {
    if (variant === "hero") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `inline-flex items-center gap-1.5 font-semibold text-base text-white ${className}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                    className: "w-[18px] h-[18px] fill-amber-400 text-amber-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Rating.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: score.toFixed(1)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Rating.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                reviewsCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-emerald-300 font-semibold",
                    children: [
                        "(",
                        reviewsCount,
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/Rating.tsx",
                    lineNumber: 23,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/Rating.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `inline-flex items-center gap-1 text-[15px] font-semibold text-stone-700 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                className: "w-4 h-4 fill-amber-400 text-amber-400"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Rating.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: score.toFixed(1)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Rating.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Rating.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = Rating;
var _c;
__turbopack_context__.k.register(_c, "Rating");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/RoleContext.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/RoleContext.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/auth/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$data$2f$mockAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/data/mockAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/services/authService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/RoleContext.tsx [app-client] (ecmascript)");
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/auth/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/community/components/ForumRightRail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ForumRightRail",
    ()=>ForumRightRail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.mjs [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.mjs [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.mjs [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$data$2f$mockForum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/data/mockForum.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$services$2f$forumService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/services/forumService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function ForumRightRail({ onSelectTag }) {
    _s();
    const [topPosts, setTopPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ForumRightRail.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$services$2f$forumService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forumService"].listPosts({
                sort: "most_viewed",
                limit: 3
            }).then({
                "ForumRightRail.useEffect": (res)=>{
                    setTopPosts(res.data);
                }
            }["ForumRightRail.useEffect"]).catch({
                "ForumRightRail.useEffect": (err)=>{
                    console.warn("Error fetching top forum posts:", err);
                }
            }["ForumRightRail.useEffect"]);
        }
    }["ForumRightRail.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-[360px] shrink-0 space-y-[22px] select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-5 border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif font-bold text-lg text-stone-900 tracking-tight leading-tight",
                                        children: "Nội quy diễn đàn"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 38,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-stone-500",
                                        children: "Cộng đồng ăn chay văn minh"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-2 text-xs text-stone-600 leading-relaxed pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-emerald-600 font-bold shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tôn trọng ý kiến khác biệt, chia sẻ trên tinh thần tích cực và hòa nhã."
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-emerald-600 font-bold shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Chia sẻ kiến thức dinh dưỡng, công thức và quán chay rõ ràng, có căn cứ."
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-emerald-600 font-bold shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Nghiêm cấm hành vi spam, chèo kéo bán hàng trái phép hoặc tin sai lệch."
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5 mb-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif font-bold text-lg text-stone-900 tracking-tight leading-tight",
                                        children: "Chủ đề thịnh hành"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-stone-500",
                                        children: "Hashtags được quan tâm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col divide-y divide-stone-100",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$data$2f$mockForum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRENDING_TOPICS"].map((topic)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onSelectTag?.(topic.tag),
                                className: "py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-sm transition-colors hover:bg-stone-50 px-1 -mx-1 rounded group cursor-pointer text-left w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-emerald-800 group-hover:text-emerald-900 transition-colors",
                                        children: topic.tag
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-stone-500 font-medium",
                                        children: topic.posts
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, topic.tag, true, {
                                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5 mb-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif font-bold text-lg text-stone-900 tracking-tight leading-tight",
                                        children: "Xem nhiều nhất"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-stone-500",
                                        children: "Bài thảo luận nổi bật"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 divide-y divide-stone-100",
                        children: [
                            topPosts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/forum/${post.id}`,
                                    className: "pt-2.5 first:pt-0 block group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug",
                                            children: post.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-1 flex items-center gap-3 text-[11px] text-stone-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: post.author
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                            className: "w-3 h-3 text-stone-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 19
                                                        }, this),
                                                        post.views ?? 0
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                            className: "w-3 h-3 text-stone-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                                            lineNumber: 125,
                                                            columnNumber: 19
                                                        }, this),
                                                        post.commentsCount
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, post.id, true, {
                                    fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this)),
                            topPosts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-stone-400 py-2",
                                children: "Đang tải danh sách bài thảo luận..."
                            }, void 0, false, {
                                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/community/components/ForumRightRail.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(ForumRightRail, "ZEO45hMyamrW2whruZ+y4fq9fwg=");
_c = ForumRightRail;
var _c;
__turbopack_context__.k.register(_c, "ForumRightRail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/community/data/mockForum.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FORUM_CATEGORIES",
    ()=>FORUM_CATEGORIES,
    "FORUM_POSTS",
    ()=>FORUM_POSTS,
    "TRENDING_TOPICS",
    ()=>TRENDING_TOPICS
]);
const FORUM_CATEGORIES = [
    "Tất cả thảo luận",
    "Công thức & Mẹo bếp",
    "Dinh dưỡng & Sức khỏe",
    "Quán chay ngon",
    "Dành cho người mới",
    "Giao lưu cộng đồng"
];
const TRENDING_TOPICS = [
    {
        tag: "#monchay",
        posts: "Công thức món chay"
    },
    {
        tag: "#dinhduong",
        posts: "Dinh dưỡng khoa học"
    },
    {
        tag: "#nguoimoi",
        posts: "Người mới bắt đầu"
    },
    {
        tag: "#quanchay",
        posts: "Quán chay ngon"
    },
    {
        tag: "#protein",
        posts: "Đạm thực vật"
    }
];
const FORUM_POSTS = [];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/community/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$data$2f$mockForum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/data/mockForum.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$services$2f$forumService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/services/forumService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$components$2f$ForumRightRail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/components/ForumRightRail.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$utils$2f$forumDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/utils/forumDate.ts [app-client] (ecmascript)");
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/community/services/forumService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "forumService",
    ()=>forumService,
    "getAdminStatusOverrides",
    ()=>getAdminStatusOverrides,
    "getUserSubmittedPosts",
    ()=>getUserSubmittedPosts,
    "mapBackendCommentToCommentItem",
    ()=>mapBackendCommentToCommentItem,
    "mapBackendPostToForumPost",
    ()=>mapBackendPostToForumPost,
    "saveUserSubmittedPost",
    ()=>saveUserSubmittedPost,
    "setAdminPostStatus",
    ()=>setAdminPostStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$data$2f$mockForum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/data/mockForum.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$utils$2f$forumDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/utils/forumDate.ts [app-client] (ecmascript)");
;
;
;
function getUserSubmittedPosts() {
    return [];
}
function saveUserSubmittedPost(_post) {
// Không lưu mock vào localStorage, dữ liệu được đồng bộ trực tiếp từ Backend
}
function getAdminStatusOverrides() {
    return {};
}
function setAdminPostStatus(_postId, _status) {
    if ("TURBOPACK compile-time truthy", 1) {
        window.dispatchEvent(new Event("forum_status_changed"));
    }
}
function mapBackendPostToForumPost(p) {
    const rawContent = "content" in p && p.content ? p.content : "excerpt" in p && p.excerpt ? p.excerpt : "";
    const content = rawContent || "";
    const excerpt = "excerpt" in p && p.excerpt ? p.excerpt : content.length > 200 ? `${content.slice(0, 200)}…` : content;
    return {
        id: String(p.blog_id),
        numericId: p.blog_id,
        title: p.title || "",
        excerpt: excerpt || "",
        content: content || "",
        author: p.author?.full_name || "Thành viên Veggie",
        authorHandle: p.author ? `@user_${p.author.user_id}` : "@veggie.user",
        authorInitials: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$utils$2f$forumDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitials"])(p.author?.full_name),
        verified: true,
        category: p.category?.category_name || "Chung",
        categoryId: p.category?.category_id ?? null,
        tags: Array.isArray(p.tags) ? p.tags.map((t)=>t.startsWith("#") ? t : `#${t}`) : [],
        votes: p.rating ?? 0,
        commentsCount: p.comment_count ?? 0,
        timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$utils$2f$forumDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatForumDate"])(p.created_at),
        comments: [],
        status: p.status || "approved",
        views: p.views ?? 0,
        createdAt: p.created_at,
        userId: p.author?.user_id
    };
}
function mapBackendCommentToCommentItem(c) {
    return {
        id: String(c.comment_id),
        numericId: c.comment_id,
        author: c.author?.full_name || "Thành viên",
        authorInitials: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$utils$2f$forumDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitials"])(c.author?.full_name),
        verified: false,
        content: c.content || "",
        timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$utils$2f$forumDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatForumDate"])(c.created_at),
        votes: 0,
        createdAt: c.created_at
    };
}
const forumService = {
    /**
   * 1. Lấy danh sách danh mục diễn đàn thực tế
   * GET /api/v1/forum/categories
   */ async listCategories () {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/forum/categories");
            return Array.isArray(res) ? res : res?.data || [];
        } catch (err) {
            console.warn("[forumService] listCategories error:", err);
            return [];
        }
    },
    /**
   * 2. Lấy danh sách bài viết diễn đàn (lọc theo danh mục, từ khóa, tag, sắp xếp, phân trang)
   * GET /api/v1/forum/posts
   */ async listPosts (query) {
        try {
            const params = {};
            if (query?.page) params.page = query.page;
            if (query?.limit) params.limit = query.limit;
            if (query?.category_id) params.category_id = query.category_id;
            if (query?.q && query.q.trim()) {
                const trimmed = query.q.trim();
                if (trimmed.startsWith("#")) {
                    params.tag = trimmed.replace(/^#/, "");
                } else {
                    params.q = trimmed;
                }
            }
            if (query?.tag && query.tag.trim()) {
                params.tag = query.tag.trim().replace(/^#/, "");
            }
            if (query?.sort) params.sort = query.sort;
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/forum/posts", {
                params
            });
            const rawList = Array.isArray(res) ? res : res?.data || [];
            const rawPagination = res?.pagination;
            const pagination = {
                page: rawPagination?.page ?? query?.page ?? 1,
                limit: rawPagination?.limit ?? query?.limit ?? 10,
                total: rawPagination?.total ?? rawList.length,
                total_pages: rawPagination?.total_pages ?? 1
            };
            let mappedPosts = rawList.map(mapBackendPostToForumPost);
            if (query?.isMyPostsOnly && query.currentUserId) {
                mappedPosts = mappedPosts.filter((p)=>p.userId === query.currentUserId);
            }
            return {
                data: mappedPosts,
                pagination
            };
        } catch (err) {
            console.warn("[forumService] listPosts error:", err);
            return {
                data: [],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 0,
                    total_pages: 0
                }
            };
        }
    },
    /**
   * 3. Lấy chi tiết bài viết và tăng lượt xem
   * GET /api/v1/forum/posts/:id
   */ async getPostDetail (id) {
        const numericId = Number(id);
        if (!numericId || isNaN(numericId)) {
            return null;
        }
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/forum/posts/${numericId}`);
            const postData = res?.data || res;
            if (!postData || !postData.blog_id) return null;
            return mapBackendPostToForumPost(postData);
        } catch (err) {
            console.warn(`[forumService] getPostDetail error for #${numericId}:`, err);
            return null;
        }
    },
    /**
   * 4. Đăng bài viết mới (thành viên chờ duyệt, admin duyệt luôn)
   * POST /api/v1/forum/posts
   */ async createPost (dto, _currentUser) {
        const payload = {
            title: dto.title.trim(),
            content: dto.content.trim()
        };
        if (dto.category_id !== undefined && dto.category_id !== null) {
            payload.category_id = Number(dto.category_id);
        }
        if (dto.tags && dto.tags.length > 0) {
            payload.tags = dto.tags.map((t)=>t.trim().replace(/^#/, "")).filter(Boolean);
        }
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/forum/posts", payload);
        return res?.data || res;
    },
    /**
   * 5. Lấy danh sách comment của bài viết
   * GET /api/v1/forum/posts/:id/comments
   */ async listComments (postId, query) {
        const numericId = Number(postId);
        if (!numericId || isNaN(numericId)) {
            return {
                data: [],
                pagination: {
                    page: 1,
                    limit: 20,
                    total: 0,
                    total_pages: 0
                }
            };
        }
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/forum/posts/${numericId}/comments`, {
                params: query
            });
            const rawList = Array.isArray(res) ? res : res?.data || [];
            const rawPagination = res?.pagination;
            const pagination = {
                page: rawPagination?.page ?? query?.page ?? 1,
                limit: rawPagination?.limit ?? query?.limit ?? 20,
                total: rawPagination?.total ?? rawList.length,
                total_pages: rawPagination?.total_pages ?? 1
            };
            const mappedComments = rawList.map(mapBackendCommentToCommentItem);
            return {
                data: mappedComments,
                pagination
            };
        } catch (err) {
            console.warn("[forumService] listComments error:", err);
            return {
                data: [],
                pagination: {
                    page: 1,
                    limit: 20,
                    total: 0,
                    total_pages: 0
                }
            };
        }
    },
    /**
   * 6. Gửi comment mới vào bài viết đã duyệt
   * POST /api/v1/forum/posts/:id/comments
   */ async createComment (postId, dto) {
        const numericId = Number(postId);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/forum/posts/${numericId}/comments`, {
            content: dto.content.trim()
        });
        const commentData = res?.data || res;
        return mapBackendCommentToCommentItem(commentData);
    },
    /**
   * 7. Lấy danh sách bài viết của người dùng hiện tại (bao gồm cả chờ duyệt)
   * GET /api/v1/forum/my-posts
   */ async listMyPosts (query) {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/forum/my-posts", {
                params: query
            });
            const rawList = Array.isArray(res) ? res : res?.data || [];
            const rawPagination = res?.pagination;
            const pagination = {
                page: rawPagination?.page ?? query?.page ?? 1,
                limit: rawPagination?.limit ?? query?.limit ?? 20,
                total: rawPagination?.total ?? rawList.length,
                total_pages: rawPagination?.total_pages ?? 1
            };
            const mappedPosts = rawList.map((p)=>{
                const item = mapBackendPostToForumPost(p);
                if (p.status) item.status = p.status;
                return item;
            });
            return {
                data: mappedPosts,
                pagination
            };
        } catch (err) {
            console.warn("[forumService] listMyPosts error:", err);
            return {
                data: [],
                pagination: {
                    page: 1,
                    limit: 20,
                    total: 0,
                    total_pages: 0
                }
            };
        }
    },
    /**
   * 8. Admin: Lấy danh sách toàn bộ bài viết (có lọc theo status)
   * GET /api/v1/admin/forum/posts
   */ async adminListPosts (query) {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/admin/forum/posts", {
                params: query
            });
            const rawList = Array.isArray(res) ? res : res?.data || [];
            const rawPagination = res?.pagination;
            const pagination = {
                page: rawPagination?.page ?? query?.page ?? 1,
                limit: rawPagination?.limit ?? query?.limit ?? 20,
                total: rawPagination?.total ?? rawList.length,
                total_pages: rawPagination?.total_pages ?? 1
            };
            const mappedPosts = rawList.map((p)=>{
                const item = mapBackendPostToForumPost(p);
                if (p.status) item.status = p.status;
                return item;
            });
            return {
                data: mappedPosts,
                pagination
            };
        } catch (err) {
            console.warn("[forumService] adminListPosts error:", err);
            return {
                data: [],
                pagination: {
                    page: 1,
                    limit: 20,
                    total: 0,
                    total_pages: 0
                }
            };
        }
    },
    /**
   * 9. Admin: Lấy danh sách hàng đợi các bài viết đang chờ duyệt
   * GET /api/v1/admin/forum/moderation/pending
   */ async adminGetPendingModeration (query) {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/admin/forum/moderation/pending", {
                params: query
            });
            const rawList = Array.isArray(res) ? res : res?.data || [];
            const rawPagination = res?.pagination;
            const pagination = {
                page: rawPagination?.page ?? query?.page ?? 1,
                limit: rawPagination?.limit ?? query?.limit ?? 20,
                total: rawPagination?.total ?? rawList.length,
                total_pages: rawPagination?.total_pages ?? 1
            };
            const mappedPosts = rawList.map((p)=>{
                const item = mapBackendPostToForumPost(p);
                item.status = "pending_review";
                return item;
            });
            return {
                data: mappedPosts,
                pagination
            };
        } catch (err) {
            console.warn("[forumService] adminGetPendingModeration error:", err);
            return {
                data: [],
                pagination: {
                    page: 1,
                    limit: 20,
                    total: 0,
                    total_pages: 0
                }
            };
        }
    },
    /**
   * 10. Admin: Đếm số lượng bài viết đang chờ duyệt
   * GET /api/v1/admin/forum/moderation/count
   */ async adminGetPendingCount () {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/admin/forum/moderation/count");
            return res?.count ?? res?.data?.count ?? 0;
        } catch (err) {
            console.warn("[forumService] adminGetPendingCount error:", err);
            return 0;
        }
    },
    /**
   * 11. Admin: Phê duyệt / Từ chối / Gỡ bài viết thật trong cơ sở dữ liệu
   * PUT /api/v1/admin/forum/posts/:id/status
   */ async adminUpdatePostStatus (id, status) {
        const numericId = Number(id);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/admin/forum/posts/${numericId}/status`, {
            status
        });
        const postData = res?.data || res;
        return mapBackendPostToForumPost(postData);
    },
    /**
   * 12. Admin: Xoá hẳn bài viết khỏi hệ thống
   * DELETE /api/v1/admin/forum/posts/:id
   */ async adminDeletePost (id) {
        const numericId = Number(id);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/admin/forum/posts/${numericId}`);
        return res?.data || res;
    },
    /**
   * Admin Helpers: Lấy danh sách nội dung bài viết thật cho trang Quản lý Nội dung
   */ async getAdminContentList () {
        const { data: posts } = await this.adminListPosts({
            limit: 50
        });
        return posts.map((p)=>{
            let status = "Published";
            if (p.status === "pending_review") status = "Under Review";
            else if (p.status === "rejected" || p.status === "removed") status = "Removed";
            return {
                id: p.id,
                title: p.title,
                type: "Blog",
                author: p.author,
                date: p.timestamp,
                reports: 0,
                status
            };
        });
    },
    /**
   * Admin Helpers: Lấy danh sách hàng đợi kiểm duyệt bài viết thật (bao gồm chờ duyệt và đã xử lý)
   */ async getAdminModerationQueue () {
        const { data: posts } = await this.adminListPosts({
            limit: 50
        });
        return posts.map((p)=>{
            let modStatus = "Pending";
            if (p.status === "approved") modStatus = "Approved";
            else if (p.status === "removed" || p.status === "rejected") modStatus = "Removed";
            else modStatus = "Pending";
            return {
                id: `mod-post-${p.id}`,
                contentId: p.id,
                contentType: "Post",
                author: p.author,
                title: p.title,
                category: p.category,
                excerpt: p.excerpt || p.content,
                tags: p.tags,
                snippet: p.title ? `${p.title}${p.excerpt ? ` — ${p.excerpt}` : ""}` : p.excerpt || p.content.slice(0, 150),
                flagReasons: [],
                aiConfidence: p.status === "approved" ? 0.98 : 0.88,
                reportedAt: p.timestamp || "Gần đây",
                status: modStatus
            };
        });
    },
    // ---- Backward compatibility helpers ----
    getPosts () {
        return [];
    },
    getPostById (_id) {
        return undefined;
    },
    getCategories () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$data$2f$mockForum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORUM_CATEGORIES"];
    },
    getTrendingTopics () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$data$2f$mockForum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRENDING_TOPICS"];
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/community/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/community/utils/forumDate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatForumDate",
    ()=>formatForumDate,
    "getInitials",
    ()=>getInitials
]);
function getInitials(name) {
    if (!name || !name.trim()) return "VG";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function formatForumDate(dateStr) {
    if (!dateStr) return "Vừa xong";
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        const now = new Date();
        const diffMs = now.getTime() - d.getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHours = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays > 7) {
            return d.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
        }
        if (diffDays >= 1) return `${diffDays} ngày trước`;
        if (diffHours >= 1) return `${diffHours} giờ trước`;
        if (diffMin >= 1) return `${diffMin} phút trước`;
        return "Vừa xong";
    } catch  {
        return dateStr;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/notification/components/NotificationBell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NotificationBell",
    ()=>NotificationBell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.mjs [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/notification/hooks/useNotifications.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function NotificationBell() {
    _s();
    const { notifications, unreadCount, markAsRead } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close dropdown on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationBell.useEffect": ()=>{
            function handleClickOutside(event) {
                if (containerRef.current && !containerRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "NotificationBell.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["NotificationBell.useEffect"];
        }
    }["NotificationBell.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: containerRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setIsOpen((prev)=>!prev),
                className: "w-10 h-10 rounded-full border border-stone-200 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors relative cursor-pointer shadow-2xs",
                "aria-label": "Notifications",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white animate-pulse",
                        children: unreadCount > 9 ? "9+" : unreadCount
                    }, void 0, false, {
                        fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-stone-200 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50/70",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-semibold text-stone-900 text-sm",
                                children: "Notifications"
                            }, void 0, false, {
                                fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800",
                                children: [
                                    unreadCount,
                                    " unread"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                lineNumber: 49,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-80 overflow-y-auto divide-y divide-stone-100 scrollbar-thin",
                        children: notifications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 text-center text-stone-400 text-xs",
                            children: "Không có thông báo mới nào"
                        }, void 0, false, {
                            fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                            lineNumber: 57,
                            columnNumber: 15
                        }, this) : notifications.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>{
                                    if (!item.is_read) {
                                        markAsRead(item.notification_id);
                                    }
                                },
                                className: `p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${item.is_read ? "bg-white hover:bg-stone-50/80" : "bg-emerald-50/40 hover:bg-emerald-50/70"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.is_read ? "bg-transparent" : "bg-emerald-600"}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                        lineNumber: 75,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-xs leading-snug ${item.is_read ? "font-medium text-stone-800" : "font-bold text-stone-900"}`,
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                                lineNumber: 81,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-stone-500 mt-0.5 line-clamp-2",
                                                children: item.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                                lineNumber: 90,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 text-[11px] text-stone-400 mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: new Date(item.created_at).toLocaleDateString("vi-VN", {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                                lineNumber: 93,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                        lineNumber: 80,
                                        columnNumber: 19
                                    }, this),
                                    !item.is_read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            markAsRead(item.notification_id);
                                        },
                                        className: "p-1 rounded-md text-stone-400 hover:text-emerald-700 hover:bg-white transition-colors",
                                        title: "Đánh dấu đã đọc",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                            lineNumber: 113,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                        lineNumber: 104,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, item.notification_id, true, {
                                fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                                lineNumber: 62,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/notification/components/NotificationBell.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(NotificationBell, "FHyiAiv2/MXr8c7XD/GHPhsmcSI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"]
    ];
});
_c = NotificationBell;
var _c;
__turbopack_context__.k.register(_c, "NotificationBell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/notification/hooks/useNotifications.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNotifications",
    ()=>useNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$services$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/notification/services/notificationService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/auth/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/AuthContext.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useNotifications() {
    _s();
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNotifications.useCallback[fetchNotifications]": async ()=>{
            if (!isAuthenticated) {
                setNotifications([]);
                return;
            }
            setLoading(true);
            try {
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$services$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationService"].getNotifications();
                setNotifications(data);
            } catch  {
                setNotifications([]);
            } finally{
                setLoading(false);
            }
        }
    }["useNotifications.useCallback[fetchNotifications]"], [
        isAuthenticated
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useNotifications.useEffect": ()=>{
            fetchNotifications();
        }
    }["useNotifications.useEffect"], [
        fetchNotifications
    ]);
    const markAsRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNotifications.useCallback[markAsRead]": async (id)=>{
            // Optimistic update
            setNotifications({
                "useNotifications.useCallback[markAsRead]": (prev)=>prev.map({
                        "useNotifications.useCallback[markAsRead]": (n)=>n.notification_id === id ? {
                                ...n,
                                is_read: true
                            } : n
                    }["useNotifications.useCallback[markAsRead]"])
            }["useNotifications.useCallback[markAsRead]"]);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$services$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationService"].markAsRead(id);
        }
    }["useNotifications.useCallback[markAsRead]"], []);
    const unreadCount = notifications.filter((n)=>!n.is_read).length;
    return {
        notifications,
        unreadCount,
        loading,
        refetch: fetchNotifications,
        markAsRead
    };
}
_s(useNotifications, "nym1QgXBQWVc/ce6bchfPUs9jCs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/notification/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/notification/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$services$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/notification/services/notificationService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/notification/hooks/useNotifications.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$notification$2f$components$2f$NotificationBell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/notification/components/NotificationBell.tsx [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/notification/services/notificationService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "notificationService",
    ()=>notificationService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
;
const notificationService = {
    /**
   * Lấy danh sách thông báo của người dùng hiện tại
   * GET /users/me/notifications hoặc fallback /notifications
   */ async getNotifications () {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/users/me/notifications");
            return Array.isArray(res) ? res : [];
        } catch  {
            // Try fallback to /notifications
            try {
                const fallback = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/notifications");
                return Array.isArray(fallback) ? fallback : [];
            } catch (err) {
                console.warn("[notificationService] Failed to fetch notifications:", err);
                return [];
            }
        }
    },
    /**
   * Đánh dấu thông báo đã đọc
   * PATCH /users/me/notifications/:id/read hoặc fallback /notifications/:id/read
   */ async markAsRead (id) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/users/me/notifications/${id}/read`);
        } catch  {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/notifications/${id}/read`).catch(()=>{});
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/notification/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/places/components/PlaceRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlaceRow",
    ()=>PlaceRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Rating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Rating.tsx [app-client] (ecmascript)");
;
;
function PlaceRow({ name, sub, rating, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `h-[52px] flex items-center justify-between py-1 transition-colors hover:bg-stone-50/75 rounded-lg px-1.5 -mx-1.5 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col min-w-0 pr-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-base font-semibold text-stone-900 truncate leading-snug",
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/src/features/places/components/PlaceRow.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-stone-500 truncate leading-normal",
                        children: sub
                    }, void 0, false, {
                        fileName: "[project]/src/features/places/components/PlaceRow.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/places/components/PlaceRow.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Rating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rating"], {
                score: rating,
                variant: "placeRow"
            }, void 0, false, {
                fileName: "[project]/src/features/places/components/PlaceRow.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/places/components/PlaceRow.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = PlaceRow;
var _c;
__turbopack_context__.k.register(_c, "PlaceRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/places/data/mockPlaces.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SHOP_FILTERS",
    ()=>SHOP_FILTERS,
    "SUGGESTED_FOOD_SPOTS",
    ()=>SUGGESTED_FOOD_SPOTS,
    "VEGAN_PLACES",
    ()=>VEGAN_PLACES
]);
const VEGAN_PLACES = [
    {
        id: "p1",
        name: "Hum Vegetarian Café & Restaurant",
        district: "District 3",
        address: "32 Võ Văn Tần, Ward 6, District 3, HCMC",
        distance: "1.2 km",
        rating: 4.8,
        reviewsCount: 1420,
        type: "Vegetarian",
        openingHours: "10:00 - 22:00",
        popularDish: "Pineapple Fried Rice & Lotus Leaf Salad",
        x: 28,
        y: 36
    },
    {
        id: "p2",
        name: "Organik Grocer & Herb Kitchen",
        district: "Thảo Điền",
        address: "11B Thảo Điền, District 2, Thu Duc City",
        distance: "3.8 km",
        rating: 4.6,
        reviewsCount: 512,
        type: "Grocer",
        openingHours: "08:00 - 20:30",
        popularDish: "Fresh Organic Produce & Artisanal Tempeh",
        x: 76,
        y: 24
    },
    {
        id: "p3",
        name: "Loving Hut Hoa Đăng",
        district: "District 1",
        address: "38 Huỳnh Khương Ninh, Đa Kao, District 1, HCMC",
        distance: "2.1 km",
        rating: 4.7,
        reviewsCount: 890,
        type: "Vegan",
        openingHours: "09:30 - 21:30",
        popularDish: "Mushroom Claypot & Veggie Pho",
        x: 48,
        y: 42
    },
    {
        id: "p4",
        name: "Zero Waste Saigon Grocer",
        district: "Bình Thạnh",
        address: "24 Nguyễn Cửu Vân, Ward 17, Bình Thạnh",
        distance: "2.7 km",
        rating: 4.5,
        reviewsCount: 340,
        type: "Grocer",
        openingHours: "09:00 - 21:00",
        popularDish: "Bulk Nuts, Seeds & Nutritional Yeast",
        x: 58,
        y: 58
    },
    {
        id: "p5",
        name: "The Green Box Botanical Café",
        district: "District 1",
        address: "85 Pasteur, Bến Nghé, District 1, HCMC",
        distance: "1.5 km",
        rating: 4.7,
        reviewsCount: 670,
        type: "Café",
        openingHours: "07:30 - 22:00",
        popularDish: "Cold-pressed Green Juice & Acai Bowls",
        x: 42,
        y: 68
    },
    {
        id: "p6",
        name: "Bếp Chay An Lạc",
        district: "Phú Nhuận",
        address: "142 Phan Xích Long, Ward 2, Phú Nhuận",
        distance: "3.2 km",
        rating: 4.8,
        reviewsCount: 420,
        type: "Vegan",
        openingHours: "08:00 - 21:00",
        popularDish: "Lemongrass Tofu Rice & Steamed Dumplings",
        x: 22,
        y: 62
    }
];
const SHOP_FILTERS = [
    "All",
    "Vegan",
    "Vegetarian",
    "Grocer",
    "Café"
];
const SUGGESTED_FOOD_SPOTS = [
    {
        dish: "Crispy Lemongrass Tofu Bowl",
        places: [
            {
                name: "Hum Vegetarian Café",
                distance: "1.2 km",
                price: "85,000 VNĐ"
            },
            {
                name: "Bếp Chay An Lạc",
                distance: "3.2 km",
                price: "55,000 VNĐ"
            }
        ]
    },
    {
        dish: "Creamy Coconut Lime Noodle Soup",
        places: [
            {
                name: "Loving Hut Hoa Đăng",
                distance: "2.1 km",
                price: "70,000 VNĐ"
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/places/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/places/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$data$2f$mockPlaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/places/data/mockPlaces.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$services$2f$placeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/places/services/placeService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$components$2f$PlaceRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/places/components/PlaceRow.tsx [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/places/services/placeService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "placeService",
    ()=>placeService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$data$2f$mockPlaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/places/data/mockPlaces.ts [app-client] (ecmascript)");
;
;
const placeService = {
    getPlaces () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$data$2f$mockPlaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VEGAN_PLACES"];
    },
    getPlaceById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$data$2f$mockPlaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VEGAN_PLACES"].find((p)=>p.id === id);
    },
    getShopFilters () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$data$2f$mockPlaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHOP_FILTERS"];
    },
    getSuggestedFoodSpots () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$data$2f$mockPlaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUGGESTED_FOOD_SPOTS"];
    },
    /**
   * Lấy danh sách quán chay từ backend (Endpoint 29: GET /places)
   */ async fetchPlaces (filter, query) {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/places", {
                params: {
                    type: filter && filter !== "All" ? filter : undefined,
                    q: query ? query.trim() : undefined
                }
            });
            if (Array.isArray(res) && res.length > 0) return res;
        } catch  {}
        return this.filterPlaces(filter || "All", query);
    },
    /**
   * Chi tiết quán (Endpoint 30: GET /places/:id)
   */ async fetchPlaceById (id) {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/places/${id}`);
            if (res && res.id) return res;
        } catch  {}
        return this.getPlaceById(id);
    },
    /**
   * Bộ lọc loại quán (Endpoint 31: GET /places/filters)
   */ async fetchShopFilters () {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/places/filters");
            if (Array.isArray(res) && res.length > 0) return res;
        } catch  {}
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$data$2f$mockPlaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHOP_FILTERS"];
    },
    /**
   * Gợi ý điểm ăn theo món (Endpoint 32: GET /places/food-spots/suggested)
   */ async fetchSuggestedFoodSpots () {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/places/food-spots/suggested");
            if (Array.isArray(res) && res.length > 0) return res;
        } catch  {}
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$data$2f$mockPlaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUGGESTED_FOOD_SPOTS"];
    },
    /**
   * Thêm quán mới - Admin (Endpoint 33: POST /places)
   */ async createPlace (data) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/places", data);
    },
    /**
   * Sửa quán - Admin (Endpoint 34: PUT /places/:id)
   */ async updatePlace (id, data) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/places/${id}`, data);
    },
    /**
   * Xóa quán - Admin (Endpoint 35: DELETE /places/:id)
   */ async deletePlace (id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/places/${id}`);
    },
    filterPlaces (filter, query) {
        let result = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$places$2f$data$2f$mockPlaces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VEGAN_PLACES"];
        if (filter && filter !== "All") {
            result = result.filter((p)=>p.type === filter);
        }
        if (query && query.trim()) {
            const q = query.toLowerCase().trim();
            result = result.filter((p)=>p.name.toLowerCase().includes(q) || p.district.toLowerCase().includes(q) || p.address.toLowerCase().includes(q) || p.popularDish.toLowerCase().includes(q));
        }
        return result;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/places/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
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
"[project]/src/features/recipes/services/ingredientApiService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ingredientApiService",
    ()=>ingredientApiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/api/client.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
;
const ingredientApiService = {
    // API #9: GET /ingredients - Danh sách 190+ nguyên liệu kèm giá chuẩn & dinh dưỡng
    getIngredients () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/ingredients");
    },
    // API #10: GET /ingredients/:id - Chi tiết nguyên liệu
    getIngredientById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/ingredients/${id}`);
    },
    // API #11: POST /admin/ingredients - Admin thêm nguyên liệu
    adminCreateIngredient (data) {
        const payload = {
            ingredient_name: (data.ingredient_name || data.name || "").trim(),
            unit: data.unit ? data.unit.trim() : "kg",
            description: data.description?.trim() || undefined,
            vegan_flag: data.vegan_flag ?? true,
            avg_price_per_unit: data.avg_price_per_unit !== undefined ? Number(data.avg_price_per_unit) : data.price_per_unit !== undefined ? Number(data.price_per_unit) : undefined,
            calories_per_100g: data.calories_per_100g !== undefined ? Number(data.calories_per_100g) : undefined,
            protein_per_100g: data.protein_per_100g !== undefined ? Number(data.protein_per_100g) : undefined,
            carb_per_100g: data.carb_per_100g !== undefined ? Number(data.carb_per_100g) : data.carbs_per_100g !== undefined ? Number(data.carbs_per_100g) : undefined,
            fat_per_100g: data.fat_per_100g !== undefined ? Number(data.fat_per_100g) : undefined,
            fiber_per_100g: data.fiber_per_100g !== undefined ? Number(data.fiber_per_100g) : undefined,
            is_seasonal: data.is_seasonal ?? false,
            season_months: data.season_months || undefined,
            status: data.status || "active"
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/admin/ingredients", payload);
    },
    // API #12: PUT /admin/ingredients/:id - Admin sửa nguyên liệu, gồm giá chuẩn & dinh dưỡng
    adminUpdateIngredient (id, data) {
        const payload = {};
        if (data.ingredient_name !== undefined || data.name !== undefined) {
            payload.ingredient_name = (data.ingredient_name || data.name || "").trim();
        }
        if (data.unit !== undefined) payload.unit = data.unit.trim();
        if (data.description !== undefined) payload.description = data.description.trim() || undefined;
        if (data.vegan_flag !== undefined) payload.vegan_flag = data.vegan_flag;
        if (data.avg_price_per_unit !== undefined) {
            payload.avg_price_per_unit = Number(data.avg_price_per_unit);
        } else if (data.price_per_unit !== undefined) {
            payload.avg_price_per_unit = Number(data.price_per_unit);
        }
        if (data.calories_per_100g !== undefined) {
            payload.calories_per_100g = Number(data.calories_per_100g);
        }
        if (data.protein_per_100g !== undefined) {
            payload.protein_per_100g = Number(data.protein_per_100g);
        }
        if (data.carb_per_100g !== undefined) {
            payload.carb_per_100g = Number(data.carb_per_100g);
        } else if (data.carbs_per_100g !== undefined) {
            payload.carb_per_100g = Number(data.carbs_per_100g);
        }
        if (data.fat_per_100g !== undefined) {
            payload.fat_per_100g = Number(data.fat_per_100g);
        }
        if (data.fiber_per_100g !== undefined) {
            payload.fiber_per_100g = Number(data.fiber_per_100g);
        }
        if (data.is_seasonal !== undefined) payload.is_seasonal = data.is_seasonal;
        if (data.season_months !== undefined) payload.season_months = data.season_months;
        if (data.status !== undefined) payload.status = data.status;
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/admin/ingredients/${id}`, payload);
    },
    // API #16: PUT /ingredients/:id/my-price - User tự đặt giá nguyên liệu
    setMyIngredientPrice (id, price_per_unit) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/ingredients/${id}/my-price`, {
            price_per_unit
        });
    },
    // API #17: GET /users/me/recipe-prices - Giá tự đặt theo công thức
    getMyRecipePrices () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/users/me/recipe-prices");
    },
    // API #18: PUT /users/me/recipe-prices/:recipeId - Đặt giá công thức
    setMyRecipePrice (recipeId, actual_price) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/users/me/recipe-prices/${recipeId}`, {
            actual_price
        });
    },
    // API #19: DELETE /users/me/recipe-prices/:recipeId - Xoá giá tự đặt
    removeMyRecipePrice (recipeId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/users/me/recipe-prices/${recipeId}`);
    },
    // Admin Quản lý nguyên liệu kỵ nhau (Phần 10)
    getIngredientConflicts () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/admin/ingredients/conflicts");
    },
    createIngredientConflict (ingredient_id_1, ingredient_id_2, reason) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/admin/ingredients/conflicts", {
            ingredient_id_1,
            ingredient_id_2,
            reason
        });
    },
    deleteIngredientConflict (ingredient_id_1, ingredient_id_2) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/admin/ingredients/conflicts/${ingredient_id_1}/${ingredient_id_2}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/recipes/services/recipeApiService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recipeApiService",
    ()=>recipeApiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/api/client.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
;
const recipeApiService = {
    // API #1: GET /recipes - Lọc theo status, mealType, vegetarianType, category, q, maxCalories, excludeAllergens, phân trang
    getRecipes (params) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/recipes", params);
    },
    // API #2: GET /recipes/:id - Chi tiết kèm nguyên liệu, dinh dưỡng
    getRecipeById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/recipes/${id}`);
    },
    // API #3: GET /recipes/recommendations - Gợi ý theo hồ sơ
    getRecommendations (params) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/recipes/recommendations", params);
    },
    // API #4: GET /recipes/:id/replacements - Món thay thế cùng mealType, hợp chế độ chay
    getReplacements (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/recipes/${id}/replacements`);
    },
    // API #5: GET /recipes/:id/cost - Chi phí ước tính theo giá nguyên liệu
    getRecipeCost (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/recipes/${id}/cost`);
    },
    // API: GET /recipes/my-recipes - Công thức do chính user tạo
    getMyRecipes () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/recipes/my-recipes");
    },
    // API #6: POST /recipes - Member tạo -> pending_review, admin tạo -> approved
    createRecipe (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/recipes", data);
    },
    // API #7: PUT /recipes/:id - Sửa công thức (chủ sở hữu hoặc admin)
    updateRecipe (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/recipes/${id}`, data);
    },
    // API #8: DELETE /recipes/:id - Đổi status thành removed (soft delete)
    deleteRecipe (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/recipes/${id}`);
    },
    // API GET /categories - Danh mục công thức
    getCategories () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/categories");
    },
    // API GET /categories/:id - Chi tiết một danh mục
    getCategoryById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/categories/${id}`);
    },
    // API Admin: GET /admin/recipes - Lấy danh sách công thức cho admin (kèm status)
    getAdminRecipes (status) {
        const query = status ? `?status=${status}` : "";
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/admin/recipes${query}`);
    },
    // API Admin: PUT /admin/recipes/:id/status - Duyệt hoặc từ chối công thức
    reviewRecipe (id, status, reason) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/admin/recipes/${id}/status`, {
            status,
            reason
        });
    },
    // API Export: GET /recipes/export - Xuất dữ liệu công thức ra file CSV
    exportRecipes (params) {
        return __turbopack_context__.A("[project]/src/features/admin/services/adminRecipeApiService.ts [app-client] (ecmascript, async loader)").then((m)=>m.adminRecipeApiService.exportRecipes(params));
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/api/client.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthToken",
    ()=>getAuthToken,
    "setAuthToken",
    ()=>setAuthToken
]);
/**
 * Re-exporting from unified apiClient in @/lib/apiClient and tokenStorage in @/lib/tokenStorage
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tokenStorage.ts [app-client] (ecmascript)");
;
;
const getAuthToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("vh_access_token") || localStorage.getItem("vh_token");
};
const setAuthToken = (token)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (token) {
        localStorage.setItem("vh_access_token", token);
    } else {
        localStorage.removeItem("vh_access_token");
        localStorage.removeItem("vh_token");
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/storage/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Centralized Local Storage utility
 * Handles safe SSR checks and custom change events for real-time reactivity
 */ __turbopack_context__.s([
    "STORAGE_KEYS",
    ()=>STORAGE_KEYS,
    "storage",
    ()=>storage
]);
const STORAGE_KEYS = {
    USER_PROFILE: "app_user_profile",
    SUBSCRIPTION: "app_subscription",
    RECIPES: "app_recipes",
    MEAL_PLANS: "app_meal_plans",
    FAVORITES: "app_user_favorites",
    RECIPE_PRICES: "app_user_recipe_prices",
    GENERATED_PLAN: "app_generated_plan",
    ADMIN_INGREDIENT_PRICES: "app_admin_ingredient_prices",
    IMPORT_PENDING: "app_import_pending_recipes"
};
const memoryStore = new Map();
const storage = {
    getItem (key, defaultValue) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const item = window.localStorage.getItem(key);
            if (item === null || item === undefined) {
                return defaultValue;
            }
            return JSON.parse(item);
        } catch (err) {
            console.warn(`[storage] Error reading key "${key}":`, err);
            return defaultValue;
        }
    },
    setItem (key, value) {
        const serialized = JSON.stringify(value);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            window.localStorage.setItem(key, serialized);
            // Dispatch an event so hooks in the same window can re-render immediately
            window.dispatchEvent(new CustomEvent("app-storage-change", {
                detail: {
                    key,
                    value
                }
            }));
        } catch (err) {
            console.warn(`[storage] Error setting key "${key}":`, err);
        }
    },
    removeItem (key) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            window.localStorage.removeItem(key);
            window.dispatchEvent(new CustomEvent("app-storage-change", {
                detail: {
                    key,
                    value: null
                }
            }));
        } catch (err) {
            console.warn(`[storage] Error removing key "${key}":`, err);
        }
    },
    /**
   * Subscribe to storage change events across same-window or cross-tab
   */ subscribe (callback) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const handleCustomEvent = (e)=>{
            const custom = e;
            if (custom.detail) {
                callback(custom.detail);
            }
        };
        const handleStorageEvent = (e)=>{
            if (e.key) {
                try {
                    callback({
                        key: e.key,
                        value: e.newValue ? JSON.parse(e.newValue) : null
                    });
                } catch  {
                    callback({
                        key: e.key,
                        value: e.newValue
                    });
                }
            }
        };
        window.addEventListener("app-storage-change", handleCustomEvent);
        window.addEventListener("storage", handleStorageEvent);
        return ()=>{
            window.removeEventListener("app-storage-change", handleCustomEvent);
            window.removeEventListener("storage", handleStorageEvent);
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0i4ohqx._.js.map
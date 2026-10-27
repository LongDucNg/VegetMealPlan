(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/allergy/data/mockAllergies.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COMMON_ALLERGENS",
    ()=>COMMON_ALLERGENS
]);
const COMMON_ALLERGENS = [
    {
        id: "peanut",
        name: "Đậu phộng (lạc)",
        keywords: [
            "peanut",
            "peanuts",
            "peanut butter",
            "đậu phộng",
            "lạc"
        ]
    },
    {
        id: "soy",
        name: "Đậu nành & đậu hũ",
        keywords: [
            "soy",
            "soya",
            "tofu",
            "tempeh",
            "edamame",
            "soy sauce",
            "soy milk",
            "đậu nành",
            "đậu phụ",
            "tàu hũ"
        ]
    },
    {
        id: "gluten",
        name: "Gluten (lúa mì)",
        keywords: [
            "gluten",
            "wheat",
            "flour",
            "bread",
            "seitan",
            "lúa mì",
            "bột mì"
        ]
    },
    {
        id: "dairy",
        name: "Sữa & chế phẩm sữa",
        keywords: [
            "dairy",
            "milk",
            "cheese",
            "butter",
            "yogurt",
            "sữa bò",
            "phô mai",
            "bơ sữa"
        ]
    },
    {
        id: "treenut",
        name: "Hạt cây",
        keywords: [
            "cashew",
            "almond",
            "walnut",
            "pecan",
            "hazelnut",
            "macadamia",
            "hạt điều",
            "hạnh nhân",
            "óc chó"
        ]
    },
    {
        id: "sesame",
        name: "Mè (vừng) & hạt gieo",
        keywords: [
            "sesame",
            "sesame oil",
            "tahini",
            "mè",
            "vừng",
            "dầu mè"
        ]
    },
    {
        id: "corn",
        name: "Bắp (ngô)",
        keywords: [
            "corn",
            "maize",
            "cornstarch",
            "bắp",
            "ngô"
        ]
    },
    {
        id: "egg",
        name: "Trứng",
        keywords: [
            "egg",
            "eggs",
            "egg white",
            "egg yolk",
            "trứng"
        ]
    },
    {
        id: "legume",
        name: "Họ đậu khác",
        keywords: [
            "đậu đen",
            "đậu xanh",
            "đậu đỏ",
            "đậu gà",
            "đậu lăng",
            "đậu hà lan",
            "legume",
            "lentil",
            "chickpea"
        ]
    },
    {
        id: "fungi",
        name: "Nấm",
        keywords: [
            "nấm",
            "nấm rơm",
            "nấm hương",
            "nấm đông cô",
            "nấm đùi gà",
            "nấm mỡ",
            "nấm kim châm",
            "mushroom",
            "fungi"
        ]
    },
    {
        id: "allium",
        name: "Hành tỏi (ngũ vị tân)",
        keywords: [
            "hành",
            "tỏi",
            "hẹ",
            "kiệu",
            "hành tây",
            "hành lá",
            "ngũ vị tân",
            "garlic",
            "onion",
            "shallot",
            "leek",
            "chive"
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/allergy/utils/checkRecipeAllergy.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkAllergies",
    ()=>checkAllergies,
    "checkRecipeAllergy",
    ()=>checkRecipeAllergy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$data$2f$mockAllergies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/allergy/data/mockAllergies.ts [app-client] (ecmascript)");
;
function checkAllergies(recipe, profile) {
    const userAllergies = profile?.allergies || [];
    if (!userAllergies.length) {
        return {
            hasAllergy: false,
            allergens: [],
            isSafe: true
        };
    }
    // 1. Check explicit recipe.allergens array if present
    const explicitAllergens = (recipe.allergens || []).map((a)=>a.toLowerCase().trim());
    // 2. Flatten recipe text into normalized string for comprehensive detection
    const ingredientNames = (recipe.ingredients || []).map((ing)=>typeof ing === "string" ? ing.toLowerCase() : (ing.name || "").toLowerCase());
    const fullText = [
        recipe.name || "",
        recipe.title || "",
        recipe.description || "",
        ...ingredientNames
    ].join(" ").toLowerCase();
    const detectedAllergens = [];
    for (const userAllergy of userAllergies){
        const normalizedUserAllergy = userAllergy.toLowerCase().trim();
        // Find rule in master list or match directly
        const rule = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$data$2f$mockAllergies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMON_ALLERGENS"].find((r)=>r.id.toLowerCase() === normalizedUserAllergy || r.name.toLowerCase() === normalizedUserAllergy);
        const keywords = rule ? rule.keywords : [
            normalizedUserAllergy
        ];
        const allergenDisplayName = rule ? rule.name : userAllergy;
        // Check explicit array match
        const explicitMatch = explicitAllergens.some((a)=>a === normalizedUserAllergy || rule && a === rule.id.toLowerCase());
        // Check keyword match in ingredients or text
        const keywordMatch = keywords.some((kw)=>{
            const lowerKw = kw.toLowerCase();
            return ingredientNames.some((ing)=>ing.includes(lowerKw)) || fullText.includes(lowerKw);
        });
        if ((explicitMatch || keywordMatch) && !detectedAllergens.includes(allergenDisplayName)) {
            detectedAllergens.push(allergenDisplayName);
        }
    }
    const hasAllergy = detectedAllergens.length > 0;
    return {
        hasAllergy,
        allergens: detectedAllergens,
        isSafe: !hasAllergy,
        warningMessage: hasAllergy ? `This recipe contains ingredients that may cause an allergic reaction based on your profile. Detected allergens: ${detectedAllergens.join(", ")}` : undefined
    };
}
const checkRecipeAllergy = checkAllergies;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$utils$2f$forumDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/utils/forumDate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$community$2f$components$2f$ForumRightRail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/community/components/ForumRightRail.tsx [app-client] (ecmascript)");
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
function formatForumDate(dateStr) {
    if (!dateStr) return "Vừa xong";
    const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    if (isNaN(date.getTime())) return String(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffSecs < 60) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}
function getInitials(name) {
    if (!name || !name.trim()) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/components/DailyMacroSummary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DailyMacroSummary",
    ()=>DailyMacroSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.mjs [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/priceService.ts [app-client] (ecmascript)");
"use client";
;
;
;
function DailyMacroSummary({ day }) {
    const totalCalories = Math.round(day.totalCalories);
    const targetCalories = Math.round(day.targetCalories);
    const totalProtein = Math.round(day.totalProtein * 10) / 10;
    const totalCarbs = Math.round(day.totalCarbs * 10) / 10;
    const totalFat = Math.round(day.totalFat * 10) / 10;
    const pct = Math.min(100, Math.round(totalCalories / targetCalories * 100));
    const remaining = Math.round(targetCalories - totalCalories);
    const isOver = remaining < 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-bold uppercase tracking-wider text-stone-400",
                                children: [
                                    "Phân bổ dinh dưỡng trong ngày (",
                                    day.dayName,
                                    ", ",
                                    day.dateText,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline gap-2 mt-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-serif font-bold text-3xl text-stone-900",
                                        children: totalCalories
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-stone-400 text-lg",
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-serif font-bold text-xl text-emerald-700",
                                        children: [
                                            targetCalories,
                                            " kcal"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                        lineNumber: 35,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3.5 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-950 text-xs font-bold flex items-center gap-1.5 shadow-2xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                        className: "w-3.5 h-3.5 text-emerald-700"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Chi phí ước tính: ~",
                                            day.estimatedCost.toLocaleString("vi-VN"),
                                            " VNĐ/ngày"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `px-3.5 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 ${isOver ? "bg-red-50 text-red-700 border-red-200" : "bg-emerald-50 text-emerald-800 border-emerald-200"}`,
                                children: isOver ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            className: "w-3.5 h-3.5 text-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                            lineNumber: 57,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Vượt mức tiêu chuẩn ",
                                                Math.abs(remaining),
                                                " kcal"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                            lineNumber: 58,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            className: "w-3.5 h-3.5 text-emerald-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                            lineNumber: 62,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Còn dư ",
                                                remaining,
                                                " kcal cho bữa phụ/đồ uống"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                            lineNumber: 63,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full",
                                children: [
                                    pct,
                                    "% mục tiêu"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-3 bg-stone-100 rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `h-full transition-all duration-500 rounded-full ${isOver ? "bg-amber-500" : "bg-emerald-600"}`,
                    style: {
                        width: `${pct}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-stone-50 border border-stone-200/80 rounded-2xl p-3 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-semibold text-stone-500 uppercase",
                                children: "Chất đạm (Protein)"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-serif font-bold text-xl text-emerald-800 mt-0.5",
                                children: [
                                    totalProtein,
                                    "g"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-stone-400",
                                children: [
                                    "~",
                                    Math.round(totalProtein * 4),
                                    " kcal"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-stone-50 border border-stone-200/80 rounded-2xl p-3 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-semibold text-stone-500 uppercase",
                                children: "Đường bột (Carbs)"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-serif font-bold text-xl text-amber-700 mt-0.5",
                                children: [
                                    totalCarbs,
                                    "g"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-stone-400",
                                children: [
                                    "~",
                                    Math.round(totalCarbs * 4),
                                    " kcal"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-stone-50 border border-stone-200/80 rounded-2xl p-3 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-semibold text-stone-500 uppercase",
                                children: "Chất béo (Fat)"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-serif font-bold text-xl text-violet-700 mt-0.5",
                                children: [
                                    totalFat,
                                    "g"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-stone-400",
                                children: [
                                    "~",
                                    Math.round(totalFat * 9),
                                    " kcal"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-stone-50 border border-stone-200/80 rounded-2xl p-3 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-semibold text-stone-500 uppercase",
                                children: "Chi phí ngày"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-serif font-bold text-xl text-emerald-900 mt-0.5",
                                children: [
                                    "~",
                                    day.estimatedCost.toLocaleString("vi-VN"),
                                    " VNĐ"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-stone-400",
                                children: "4 bữa đã lên lịch"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-[11px] text-stone-400 bg-stone-50/60 p-2.5 rounded-xl border border-stone-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                        className: "w-3.5 h-3.5 text-stone-400 shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRICE_WARNING_TEXT"]
                    }, void 0, false, {
                        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/meal-planner/components/DailyMacroSummary.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = DailyMacroSummary;
var _c;
__turbopack_context__.k.register(_c, "DailyMacroSummary");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/components/FavoritesModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FavoritesModal",
    ()=>FavoritesModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.mjs [app-client] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.mjs [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/favoriteService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/favoriteApiService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$utils$2f$recipeMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/utils/recipeMapper.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/services/mealPlannerService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/priceService.ts [app-client] (ecmascript)");
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
function FavoritesModal({ isOpen, onClose, profile, onApplyPlan, onLoadSavedPlan, onSelectFavoriteRecipe, onGenerateWeeklyWithFavorites, onGenerateMonthlyWithFavorites, initialFavoriteRecipes }) {
    _s();
    const userId = String(profile.id || "1");
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("recipes");
    const [favRecipes, setFavRecipes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialFavoriteRecipes || []);
    const [savedPlans, setSavedPlans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Selection for Create Meal Plan from Favorites (Requirement 2)
    const [selectedBreakfast, setSelectedBreakfast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedLunch, setSelectedLunch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedDinner, setSelectedDinner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedSnack, setSelectedSnack] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [validationResult, setValidationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const reloadData = async ()=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteApiService"].getMyFavorites();
            const list = Array.isArray(res) ? res : res?.data || [];
            if (Array.isArray(list) && list.length > 0) {
                const mapped = list.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$utils$2f$recipeMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBackendToFrontendRecipe"]);
                setFavRecipes(mapped);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].saveUserFavorites({
                    userId,
                    recipes: mapped.map((r)=>String(r.id)),
                    mealPlans: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].getFavoriteMealPlans(userId)
                });
            } else if (initialFavoriteRecipes && initialFavoriteRecipes.length > 0) {
                setFavRecipes(initialFavoriteRecipes);
            } else {
                setFavRecipes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].getFavoriteRecipes(userId));
            }
        } catch  {
            if (initialFavoriteRecipes && initialFavoriteRecipes.length > 0) {
                setFavRecipes(initialFavoriteRecipes);
            } else {
                setFavRecipes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].getFavoriteRecipes(userId));
            }
        }
        setSavedPlans(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].getFavoriteMealPlans(userId));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FavoritesModal.useEffect": ()=>{
            if (isOpen) {
                if (initialFavoriteRecipes && initialFavoriteRecipes.length > 0) {
                    setFavRecipes(initialFavoriteRecipes);
                }
                queueMicrotask({
                    "FavoritesModal.useEffect": ()=>{
                        reloadData();
                        setValidationResult(null);
                    }
                }["FavoritesModal.useEffect"]);
            }
        }
    }["FavoritesModal.useEffect"], [
        isOpen,
        userId,
        initialFavoriteRecipes
    ]);
    // Group recipes by mealType
    const groupedRecipes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FavoritesModal.useMemo[groupedRecipes]": ()=>{
            const map = {
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: [],
                any: []
            };
            for (const r of favRecipes){
                const raw = (r.mealType || "").toLowerCase();
                if (raw.includes("breakfast") || raw.includes("sáng")) {
                    map.breakfast.push(r);
                } else if (raw.includes("snack") || raw.includes("vặt") || raw.includes("phụ")) {
                    map.snack.push(r);
                } else if (raw.includes("dinner") || raw.includes("tối")) {
                    map.dinner.push(r);
                } else if (raw === "any" || raw.includes("any")) {
                    map.any.push(r);
                    map.lunch.push(r);
                    map.dinner.push(r);
                } else {
                    map.lunch.push(r);
                }
            }
            return map;
        }
    }["FavoritesModal.useMemo[groupedRecipes]"], [
        favRecipes
    ]);
    const breakfastOptions = groupedRecipes.breakfast.length > 0 ? groupedRecipes.breakfast : favRecipes;
    const lunchOptions = groupedRecipes.lunch.length > 0 ? groupedRecipes.lunch : favRecipes;
    const dinnerOptions = groupedRecipes.dinner.length > 0 ? groupedRecipes.dinner : favRecipes;
    const snackOptions = groupedRecipes.snack.length > 0 ? groupedRecipes.snack : favRecipes;
    if (!isOpen) return null;
    const handleValidateSelection = ()=>{
        const result = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlannerService"].validateAndCreateFromFavorites({
            breakfast: selectedBreakfast || undefined,
            lunch: selectedLunch || undefined,
            dinner: selectedDinner || undefined,
            snack: selectedSnack || undefined
        }, profile);
        setValidationResult(result);
        // If completely compatible without warnings, immediately apply
        if (result.isCompatible) {
            onApplyPlan(result.dayPlan);
            onClose();
        }
    };
    const handleKeepMySelection = ()=>{
        if (validationResult) {
            onApplyPlan(validationResult.dayPlan);
            onClose();
        }
    };
    const handleAdjustAutomatically = ()=>{
        if (validationResult) {
            // Generate a calibrated day using selected favorite ids as preferred pool
            const favIds = [
                selectedBreakfast?.id,
                selectedLunch?.id,
                selectedDinner?.id,
                selectedSnack?.id
            ].filter(Boolean);
            const adjusted = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlannerService"].generateDayPlan({
                day: "Adjusted Day",
                short: "Adj",
                date: "AI Balanced"
            }, profile, 0, 1, {
                planType: "weekly",
                favoriteRecipeIds: favIds
            });
            onApplyPlan(adjusted);
            onClose();
        }
    };
    const handleRemoveSavedPlan = (id)=>{
        if (confirm("Bạn có chắc muốn xóa thực đơn đã lưu này khỏi danh sách?")) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].removeSavedMealPlan(userId, id);
            reloadData();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        className: "w-4 h-4 fill-rose-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-serif font-bold text-lg text-stone-900",
                                            children: "Bộ sưu tập yêu thích"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                            lineNumber: 207,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-stone-500",
                                            children: "Công thức cá nhân hóa & các mẫu thực đơn đã lưu"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                            lineNumber: 202,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                            lineNumber: 215,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 px-6 pt-3 border-b border-stone-100 bg-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab("recipes"),
                            className: `pb-3 text-xs font-bold transition-colors border-b-2 cursor-pointer ${activeTab === "recipes" ? "border-emerald-700 text-emerald-800" : "border-transparent text-stone-500 hover:text-stone-800"}`,
                            children: [
                                "Món ăn yêu thích (",
                                favRecipes.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab("plans"),
                            className: `pb-3 text-xs font-bold transition-colors border-b-2 cursor-pointer ${activeTab === "plans" ? "border-emerald-700 text-emerald-800" : "border-transparent text-stone-500 hover:text-stone-800"}`,
                            children: [
                                "Thực đơn đã lưu (",
                                savedPlans.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this),
                activeTab === "recipes" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 overflow-y-auto space-y-6 flex-1",
                    children: favRecipes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-12 text-center text-stone-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                className: "w-10 h-10 mx-auto mb-2 text-stone-300"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                lineNumber: 252,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-sm text-stone-600",
                                children: "Bạn chưa lưu món ăn yêu thích nào."
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                lineNumber: 253,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-stone-400 mt-1",
                                children: "Nhấn vào biểu tượng ♡ trên bất kỳ công thức nào để lưu vào danh sách yêu thích."
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                lineNumber: 256,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                        lineNumber: 251,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/80 rounded-3xl p-5 space-y-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-serif font-bold text-base text-stone-900 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                            className: "w-4 h-4 fill-rose-500 text-rose-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 25
                                                        }, this),
                                                        "Tạo thực đơn Tuần & Tháng từ món yêu thích"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-stone-600 mt-0.5",
                                                    children: [
                                                        "Đưa ",
                                                        favRecipes.length,
                                                        " công thức yêu thích vào thực đơn AI, tự động cân đối dinh dưỡng và calo."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                            lineNumber: 265,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 shrink-0",
                                            children: [
                                                onGenerateWeeklyWithFavorites && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        onGenerateWeeklyWithFavorites(favRecipes.map((r)=>r.id));
                                                        onClose();
                                                    },
                                                    className: "px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            className: "w-3.5 h-3.5 text-amber-300"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Thực đơn Tuần (7 ngày)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                            lineNumber: 286,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 25
                                                }, this),
                                                onGenerateMonthlyWithFavorites && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        onGenerateMonthlyWithFavorites(favRecipes.map((r)=>r.id));
                                                        onClose();
                                                    },
                                                    className: "px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Thực đơn Tháng (30 ngày)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                            lineNumber: 275,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                    lineNumber: 264,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                lineNumber: 263,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-serif font-bold text-base text-emerald-950 flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                className: "w-4 h-4 text-emerald-700"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                lineNumber: 312,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Tự tạo thực đơn 1 ngày từ món yêu thích"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-emerald-800/80",
                                                        children: "Chọn món yêu thích cho từng bữa ăn và để AI hỗ trợ cân đối chuẩn mục tiêu calo."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 310,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleValidateSelection,
                                                disabled: !selectedBreakfast && !selectedLunch && !selectedDinner && !selectedSnack,
                                                className: "px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all cursor-pointer",
                                                children: "Áp dụng thực đơn"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 320,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                        lineNumber: 309,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-4 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-3 rounded-2xl border border-emerald-100 text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-stone-500 block mb-1",
                                                        children: "1. Bữa sáng:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 333,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: selectedBreakfast?.id || "",
                                                        onChange: (e)=>{
                                                            const r = favRecipes.find((item)=>item.id === e.target.value) || null;
                                                            setSelectedBreakfast(r);
                                                        },
                                                        className: "w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "-- Chọn món hoặc tự động --"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                lineNumber: 344,
                                                                columnNumber: 25
                                                            }, this),
                                                            breakfastOptions.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: r.id,
                                                                    children: [
                                                                        r.name || r.title,
                                                                        " (",
                                                                        r.calories,
                                                                        " kcal)"
                                                                    ]
                                                                }, r.id, true, {
                                                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                    lineNumber: 346,
                                                                    columnNumber: 27
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 23
                                                    }, this),
                                                    selectedBreakfast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] font-semibold text-emerald-800 mt-1",
                                                        children: [
                                                            selectedBreakfast.calories,
                                                            " kcal · ",
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(selectedBreakfast, userId).formatted
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 332,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-3 rounded-2xl border border-emerald-100 text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-stone-500 block mb-1",
                                                        children: "2. Bữa trưa:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: selectedLunch?.id || "",
                                                        onChange: (e)=>{
                                                            const r = favRecipes.find((item)=>item.id === e.target.value) || null;
                                                            setSelectedLunch(r);
                                                        },
                                                        className: "w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "-- Chọn món hoặc tự động --"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                lineNumber: 371,
                                                                columnNumber: 25
                                                            }, this),
                                                            lunchOptions.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: r.id,
                                                                    children: [
                                                                        r.name || r.title,
                                                                        " (",
                                                                        r.calories,
                                                                        " kcal)"
                                                                    ]
                                                                }, r.id, true, {
                                                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                    lineNumber: 373,
                                                                    columnNumber: 27
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 23
                                                    }, this),
                                                    selectedLunch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] font-semibold text-emerald-800 mt-1",
                                                        children: [
                                                            selectedLunch.calories,
                                                            " kcal · ",
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(selectedLunch, userId).formatted
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 359,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-3 rounded-2xl border border-emerald-100 text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-stone-500 block mb-1",
                                                        children: "3. Bữa tối:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: selectedDinner?.id || "",
                                                        onChange: (e)=>{
                                                            const r = favRecipes.find((item)=>item.id === e.target.value) || null;
                                                            setSelectedDinner(r);
                                                        },
                                                        className: "w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "-- Chọn món hoặc tự động --"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                lineNumber: 398,
                                                                columnNumber: 25
                                                            }, this),
                                                            dinnerOptions.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: r.id,
                                                                    children: [
                                                                        r.name || r.title,
                                                                        " (",
                                                                        r.calories,
                                                                        " kcal)"
                                                                    ]
                                                                }, r.id, true, {
                                                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                    lineNumber: 400,
                                                                    columnNumber: 27
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 23
                                                    }, this),
                                                    selectedDinner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] font-semibold text-emerald-800 mt-1",
                                                        children: [
                                                            selectedDinner.calories,
                                                            " kcal · ",
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(selectedDinner, userId).formatted
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 406,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 386,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-3 rounded-2xl border border-emerald-100 text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-stone-500 block mb-1",
                                                        children: "4. Bữa phụ:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 414,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: selectedSnack?.id || "",
                                                        onChange: (e)=>{
                                                            const r = favRecipes.find((item)=>item.id === e.target.value) || null;
                                                            setSelectedSnack(r);
                                                        },
                                                        className: "w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "-- Chọn món hoặc tự động --"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                lineNumber: 425,
                                                                columnNumber: 25
                                                            }, this),
                                                            snackOptions.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: r.id,
                                                                    children: [
                                                                        r.name || r.title,
                                                                        " (",
                                                                        r.calories,
                                                                        " kcal)"
                                                                    ]
                                                                }, r.id, true, {
                                                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                    lineNumber: 427,
                                                                    columnNumber: 27
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 23
                                                    }, this),
                                                    selectedSnack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] font-semibold text-emerald-800 mt-1",
                                                        children: [
                                                            selectedSnack.calories,
                                                            " kcal · ",
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(selectedSnack, userId).formatted
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 433,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 413,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                        lineNumber: 330,
                                        columnNumber: 19
                                    }, this),
                                    validationResult && !validationResult.isCompatible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-3 text-xs text-amber-900 animate-in fade-in",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                        className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-bold",
                                                                children: "Một số món ăn chưa hoàn toàn khớp với mục tiêu dinh dưỡng hôm nay:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                lineNumber: 446,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                className: "list-disc pl-4 mt-1 space-y-0.5 text-stone-700",
                                                                children: validationResult.warnings.map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: w
                                                                    }, i, false, {
                                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                        lineNumber: 451,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                lineNumber: 449,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-2 text-[11px] text-stone-500",
                                                                children: [
                                                                    "Calo dự tính: ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: [
                                                                            validationResult.dayPlan.totalCalories,
                                                                            " kcal"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                        lineNumber: 455,
                                                                        columnNumber: 43
                                                                    }, this),
                                                                    " so với Mục tiêu: ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: profile.weight ? `${validationResult.dayPlan.targetCalories} kcal` : "Tùy chỉnh"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                        lineNumber: 455,
                                                                        columnNumber: 123
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                lineNumber: 454,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 443,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 justify-end pt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleAdjustAutomatically,
                                                        className: "px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-100 font-bold text-amber-900 text-xs transition-colors cursor-pointer",
                                                        children: "Tự động cân bằng AI"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleKeepMySelection,
                                                        className: "px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 font-bold text-white text-xs shadow-2xs transition-colors cursor-pointer",
                                                        children: "Giữ nguyên lựa chọn"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 467,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 460,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                        lineNumber: 442,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                lineNumber: 308,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-stone-800 text-xs uppercase tracking-wider mb-3",
                                        children: [
                                            "Tất cả món đã yêu thích (",
                                            favRecipes.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                        lineNumber: 480,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                        children: favRecipes.map((r)=>{
                                            const cost = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(r, userId);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 rounded-2xl border border-stone-200 bg-white flex items-center justify-between gap-3 shadow-2xs hover:border-emerald-300 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0",
                                                                children: r.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: r.image,
                                                                    alt: r.title,
                                                                    fill: true,
                                                                    className: "object-cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                    lineNumber: 494,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                lineNumber: 492,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-sm bg-stone-100 text-stone-600",
                                                                        children: r.mealType
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                        lineNumber: 503,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                        className: "font-semibold text-stone-900 text-xs truncate mt-0.5",
                                                                        children: r.name || r.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                        lineNumber: 506,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 text-[11px] text-stone-500",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-amber-700 font-bold",
                                                                                children: [
                                                                                    r.calories,
                                                                                    " kcal"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                                lineNumber: 510,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: "·"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                                lineNumber: 511,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-emerald-800 font-medium",
                                                                                children: cost.formatted
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                                lineNumber: 512,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                        lineNumber: 509,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                                lineNumber: 502,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].toggleFavoriteRecipe(userId, r.id);
                                                            reloadData();
                                                        },
                                                        title: "Bỏ khỏi yêu thích",
                                                        className: "p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                            className: "w-4 h-4 fill-rose-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, r.id, true, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 487,
                                                columnNumber: 25
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                        lineNumber: 483,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                lineNumber: 479,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                        lineNumber: 261,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                    lineNumber: 249,
                    columnNumber: 11
                }, this),
                activeTab === "plans" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 overflow-y-auto space-y-4 flex-1",
                    children: savedPlans.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-12 text-center text-stone-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                className: "w-10 h-10 mx-auto mb-2 text-stone-300"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                lineNumber: 542,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-sm text-stone-600",
                                children: "Chưa có thực đơn nào được lưu."
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                lineNumber: 543,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-stone-400 mt-1",
                                children: 'Khi tạo thực đơn tuần hoặc tháng, hãy nhấn "Lưu thực đơn" để lưu lại làm mẫu kế hoạch mẫu.'
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                lineNumber: 546,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                        lineNumber: 541,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: savedPlans.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-2xl border border-stone-200 bg-white hover:border-emerald-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900",
                                                        children: plan.planType === "monthly" ? "Thực đơn tháng" : "Thực đơn tuần"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 559,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-bold text-stone-900 text-sm",
                                                        children: plan.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 558,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-stone-500 mt-1",
                                                children: [
                                                    "Kế hoạch ",
                                                    plan.days.length,
                                                    " ngày · Mục tiêu: ",
                                                    plan.targetCalories,
                                                    " kcal/ngày · Chi phí ước tính: ~",
                                                    plan.totalEstimatedCost.toLocaleString("vi-VN"),
                                                    " đ"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 566,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                        lineNumber: 557,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 self-end sm:self-auto shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onLoadSavedPlan(plan);
                                                    onClose();
                                                },
                                                className: "px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer",
                                                children: "Áp dụng"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 572,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleRemoveSavedPlan(plan.id),
                                                className: "p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer",
                                                title: "Xóa thực đơn",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                                lineNumber: 581,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                        lineNumber: 571,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, plan.id, true, {
                                fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                                lineNumber: 553,
                                columnNumber: 19
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                        lineNumber: 551,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
                    lineNumber: 539,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
            lineNumber: 199,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/meal-planner/components/FavoritesModal.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_s(FavoritesModal, "2uTtcyqpN2TUDdHHpHT49NFnCQU=");
_c = FavoritesModal;
var _c;
__turbopack_context__.k.register(_c, "FavoritesModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GenerationSettingsModal",
    ()=>GenerationSettingsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.mjs [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/favoriteService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/nutrition/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$services$2f$nutritionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/services/nutritionService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$components$2f$NutritionWarnings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/components/NutritionWarnings.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const MONTHS = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
];
function GenerationSettingsModal({ isOpen, onClose, activeProfile, isPlanForSomeoneElse, onOpenSomeoneElseModal, onConfirmGenerate, initialPlanType = "weekly", currentBudget }) {
    _s();
    const [planType, setPlanType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialPlanType);
    const [useFavorites, setUseFavorites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasBudgetLimit, setHasBudgetLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentBudget !== undefined);
    const [budgetValue, setBudgetValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentBudget ?? 500000);
    const [selectedMonth, setSelectedMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "GenerationSettingsModal.useState": ()=>new Date().getMonth()
    }["GenerationSettingsModal.useState"]);
    const [selectedYear, setSelectedYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "GenerationSettingsModal.useState": ()=>new Date().getFullYear()
    }["GenerationSettingsModal.useState"]);
    const [warnings, setWarnings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "GenerationSettingsModal.useEffect": ()=>{
            if (isOpen) {
                setPlanType(initialPlanType);
                if (currentBudget !== undefined) {
                    setHasBudgetLimit(true);
                    setBudgetValue(currentBudget);
                } else {
                    setHasBudgetLimit(false);
                }
                // Fetch nutrition warnings from server
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$services$2f$nutritionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nutritionService"].getServerNutritionSummary().then({
                    "GenerationSettingsModal.useEffect": (data)=>{
                        if (data?.warnings) {
                            setWarnings(data.warnings);
                        }
                    }
                }["GenerationSettingsModal.useEffect"]).catch({
                    "GenerationSettingsModal.useEffect": ()=>{}
                }["GenerationSettingsModal.useEffect"]);
            }
        }
    }["GenerationSettingsModal.useEffect"], [
        isOpen,
        initialPlanType,
        currentBudget
    ]);
    const userId = String(activeProfile.id || "u1");
    const favRecipes = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].getFavoriteRecipes(userId);
    const handleSubmit = (e)=>{
        e.preventDefault();
        onConfirmGenerate({
            planType,
            isSomeoneElse: isPlanForSomeoneElse,
            targetProfile: activeProfile,
            budgetLimit: hasBudgetLimit ? budgetValue : undefined,
            selectedMonth,
            selectedYear,
            favoriteRecipeIds: useFavorites && favRecipes.length > 0 ? favRecipes.map((r)=>r.id) : undefined
        });
        onClose();
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "w-4 h-4 text-emerald-700"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-serif font-bold text-lg text-stone-900",
                                            children: "Tạo Kế Hoạch Thực Đơn"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-stone-500",
                                            children: "Tùy chỉnh kế hoạch thực đơn thuần chay theo nhu cầu cá nhân"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "p-6 overflow-y-auto space-y-5 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2",
                                    children: "Thời hạn kế hoạch:"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: `p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${planType === "weekly" ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs" : "bg-white border-stone-200 hover:bg-stone-50 text-stone-700 font-medium"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "planType",
                                                    value: "weekly",
                                                    checked: planType === "weekly",
                                                    onChange: ()=>setPlanType("weekly"),
                                                    className: "accent-emerald-700"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm",
                                                            children: "Kế hoạch Tuần"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 145,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[11px] font-normal text-stone-500",
                                                            children: "7 ngày (Thứ 2 - Chủ nhật)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: `p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${planType === "monthly" ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs" : "bg-white border-stone-200 hover:bg-stone-50 text-stone-700 font-medium"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "planType",
                                                    value: "monthly",
                                                    checked: planType === "monthly",
                                                    onChange: ()=>setPlanType("monthly"),
                                                    className: "accent-emerald-700"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm",
                                                            children: "Kế hoạch Tháng"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 166,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[11px] font-normal text-stone-500",
                                                            children: "Xem toàn bộ lịch trong tháng"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this),
                        planType === "monthly" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-stone-50 rounded-2xl border border-stone-200 grid grid-cols-2 gap-3 animate-in fade-in",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-stone-700 mb-1",
                                            children: "Chọn Tháng:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 177,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedMonth,
                                            onChange: (e)=>setSelectedMonth(Number(e.target.value)),
                                            className: "w-full h-10 px-3 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-900 outline-none",
                                            children: MONTHS.map((m, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: idx,
                                                    children: m
                                                }, m, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 180,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-stone-700 mb-1",
                                            children: "Chọn Năm:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 193,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedYear,
                                            onChange: (e)=>setSelectedYear(Number(e.target.value)),
                                            className: "w-full h-10 px-3 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-900 outline-none",
                                            children: [
                                                new Date().getFullYear(),
                                                new Date().getFullYear() + 1
                                            ].map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: y,
                                                    children: y
                                                }, y, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2",
                                    children: "Lên kế hoạch cho:"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                                    className: "w-4 h-4 text-emerald-700"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold text-stone-900",
                                                    children: isPlanForSomeoneElse ? `Người khác: ${activeProfile.name}` : `Bản thân (${activeProfile.name})`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-stone-500",
                                                    children: [
                                                        "· ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVegetarianType"])(activeProfile.vegetarianType)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 215,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: onOpenSomeoneElseModal,
                                            className: "text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer",
                                            children: isPlanForSomeoneElse ? "Đổi người" : "Lên kế hoạch cho người khác"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 214,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2",
                                    children: "Ngân sách thực đơn:"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "budgetOpt",
                                                            checked: !hasBudgetLimit,
                                                            onChange: ()=>setHasBudgetLimit(false),
                                                            className: "accent-emerald-700"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 243,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Không giới hạn ngân sách"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 250,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "budgetOpt",
                                                            checked: hasBudgetLimit,
                                                            onChange: ()=>setHasBudgetLimit(true),
                                                            className: "accent-emerald-700"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Đặt ngân sách tối đa"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 241,
                                            columnNumber: 15
                                        }, this),
                                        hasBudgetLimit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-2 animate-in fade-in",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            step: "50000",
                                                            min: "50000",
                                                            value: budgetValue,
                                                            onChange: (e)=>setBudgetValue(Number(e.target.value)),
                                                            className: "w-full h-10 px-3.5 pr-28 rounded-xl border border-stone-200 bg-stone-50 text-xs font-bold text-stone-900 focus:bg-white focus:border-emerald-600 outline-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500",
                                                            children: [
                                                                "VNĐ / ",
                                                                planType === "weekly" ? "tuần" : "tháng"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-stone-500 mt-1",
                                                    children: "AI sẽ tính toán chi phí nguyên liệu cho từng bữa ăn đảm bảo tổng chi phí không vượt quá mức ngân sách này."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 266,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2",
                                    children: "Tích hợp món ăn yêu thích:"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 290,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: `p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${useFavorites ? "bg-rose-50/80 border-rose-300 text-rose-950 shadow-2xs" : "bg-stone-50/70 border-stone-200 hover:bg-stone-100/70 text-stone-700"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${useFavorites ? "bg-rose-200 text-rose-600" : "bg-stone-200 text-stone-400"}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                        className: `w-4 h-4 ${useFavorites ? "fill-rose-500" : ""}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-bold flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Ưu tiên các món ăn yêu thích"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                                    lineNumber: 312,
                                                                    columnNumber: 21
                                                                }, this),
                                                                favRecipes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700",
                                                                    children: [
                                                                        favRecipes.length,
                                                                        " món yêu thích sẵn sàng"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                                    lineNumber: 314,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 311,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[11px] text-stone-500 font-normal mt-0.5",
                                                            children: favRecipes.length > 0 ? "AI sẽ ưu tiên xếp các món bạn yêu thích vào lịch ăn trong tuần/tháng" : "Chưa có món yêu thích nào. Hãy nhấn biểu tượng ♡ trên các món ăn để thêm vào yêu thích"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 300,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: useFavorites,
                                            onChange: (e)=>setUseFavorites(e.target.checked),
                                            className: "w-4 h-4 accent-rose-600 rounded cursor-pointer ml-3 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 326,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 293,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                            lineNumber: 289,
                            columnNumber: 11
                        }, this),
                        warnings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$components$2f$NutritionWarnings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NutritionWarnings"], {
                            warnings: warnings,
                            title: "Lưu ý dinh dưỡng trước khi tạo thực đơn"
                        }, void 0, false, {
                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                            lineNumber: 337,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-end gap-2 pt-2 border-t border-stone-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "h-10 px-4 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer",
                                    children: "Hủy"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 342,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "h-11 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "w-3.5 h-3.5 text-amber-300 fill-amber-300"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                            lineNumber: 353,
                                            columnNumber: 15
                                        }, this),
                                        "Tạo thực đơn ",
                                        planType === "weekly" ? "Tuần" : "Tháng"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                            lineNumber: 341,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(GenerationSettingsModal, "Y3NxbWQikG1Pkjb6qzVeQ4Ejlz8=");
_c = GenerationSettingsModal;
var _c;
__turbopack_context__.k.register(_c, "GenerationSettingsModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/components/MealCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MealCard",
    ()=>MealCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.mjs [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.mjs [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$components$2f$RecipeAllergyBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/components/RecipeAllergyBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$RecipeFavoriteButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/RecipeFavoriteButton.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$components$2f$RecipeFavoriteButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/components/RecipeFavoriteButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/priceService.ts [app-client] (ecmascript)");
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
function MacroPill({ label, grams, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1 text-[11px] bg-stone-50 border border-stone-200/80 rounded-lg px-1.5 py-0.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `w-1.5 h-1.5 rounded-full ${color}`
            }, void 0, false, {
                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-stone-500",
                children: [
                    label,
                    ":"
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-semibold text-stone-800",
                children: [
                    grams,
                    "g"
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = MacroPill;
function MealCard({ mealType, recipe, timeString, onOpenReplace, onOpenPriceModal, userId }) {
    _s();
    const [showPriceWarningTooltip, setShowPriceWarningTooltip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const colorMap = {
        Breakfast: {
            badge: "bg-amber-100 text-amber-900 border-amber-200",
            border: "border-stone-200"
        },
        Lunch: {
            badge: "bg-emerald-100 text-emerald-900 border-emerald-200",
            border: "border-stone-200"
        },
        Dinner: {
            badge: "bg-violet-100 text-violet-900 border-violet-200",
            border: "border-stone-200"
        },
        Snack: {
            badge: "bg-sky-100 text-sky-900 border-sky-200",
            border: "border-stone-200"
        }
    };
    const colors = colorMap[mealType] || colorMap.Breakfast;
    const effectivePrice = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(recipe, userId);
    const myPrice = userId ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getMyPrice(userId, recipe.id) : undefined;
    const adminEstimatedCost = recipe.estimatedCost || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].calculateRecipeCost(recipe.ingredients || []).estimatedCost;
    const totalGrams = (recipe.ingredients || []).reduce((sum, ing)=>{
        const q = Number(ing.quantity) || 0;
        const u = (ing.unit || "").toLowerCase();
        if (u === "g" || u === "gram" || u === "gam" || u === "ml") return sum + q;
        return sum;
    }, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-white border ${colors.border} rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-[16/10] w-full bg-stone-100 overflow-hidden",
                children: [
                    recipe.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: recipe.image,
                        alt: recipe.title,
                        fill: true,
                        className: "object-cover group-hover:scale-105 transition-transform duration-300",
                        sizes: "(max-width: 768px) 100vw, 25vw"
                    }, void 0, false, {
                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full flex items-center justify-center bg-stone-200 text-stone-400",
                        children: "No Image"
                    }, void 0, false, {
                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-2xs ${colors.badge}`,
                            children: mealType === "Breakfast" ? "Bữa sáng" : mealType === "Lunch" ? "Bữa trưa" : mealType === "Dinner" ? "Bữa tối" : "Bữa phụ"
                        }, void 0, false, {
                            fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5",
                        children: [
                            timeString && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "w-2.5 h-2.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this),
                                    timeString
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$components$2f$RecipeFavoriteButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecipeFavoriteButton"], {
                                recipeId: recipe.id,
                                size: "sm"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 flex-1 flex flex-col justify-between space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$components$2f$RecipeAllergyBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecipeAllergyBadge"], {
                                    recipe: recipe,
                                    compact: true
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/recipes/${recipe.id}`,
                                className: "block font-semibold text-stone-900 text-sm leading-snug line-clamp-2 hover:text-emerald-700 hover:underline transition-colors cursor-pointer",
                                children: recipe.name || recipe.title
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mt-2 text-xs text-stone-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                className: "w-3 h-3 text-amber-500 fill-amber-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                                lineNumber: 120,
                                                columnNumber: 15
                                            }, this),
                                            recipe.calories,
                                            " kcal"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    totalGrams > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200/60",
                                        children: [
                                            "~",
                                            Math.round(totalGrams),
                                            "g"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: myPrice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 text-[10px] text-stone-400",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Ước tính: ",
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].formatEstimatedPrice(adminEstimatedCost)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 text-xs font-bold text-emerald-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                            className: "w-3 h-3 text-emerald-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                                            lineNumber: 139,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Giá của tôi: ",
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].formatActualPrice(myPrice)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                                            lineNumber: 140,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-xs font-bold text-stone-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "Ước tính: ",
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].formatEstimatedPrice(adminEstimatedCost)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative inline-block",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setShowPriceWarningTooltip(!showPriceWarningTooltip),
                                                            onMouseEnter: ()=>setShowPriceWarningTooltip(true),
                                                            onMouseLeave: ()=>setShowPriceWarningTooltip(false),
                                                            title: "Thông tin giá",
                                                            className: "text-stone-400 hover:text-stone-600 cursor-pointer p-0.5",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                className: "w-3 h-3 text-stone-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                                                lineNumber: 155,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                                            lineNumber: 147,
                                                            columnNumber: 21
                                                        }, this),
                                                        showPriceWarningTooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute bottom-full left-0 mb-1 w-52 p-2 bg-stone-900 text-white text-[10px] rounded-xl shadow-lg z-20 leading-relaxed",
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRICE_WARNING_TEXT"]
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                                            lineNumber: 158,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this),
                                    onOpenPriceModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>onOpenPriceModal(recipe),
                                        className: "text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 transition-colors cursor-pointer shrink-0",
                                        children: myPrice ? "Sửa giá" : "Nhập giá thực"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-2 border-t border-stone-100 space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MacroPill, {
                                        label: "Đạm",
                                        grams: recipe.protein,
                                        color: "bg-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MacroPill, {
                                        label: "Carb",
                                        grams: recipe.carbs,
                                        color: "bg-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MacroPill, {
                                        label: "Béo",
                                        grams: recipe.fat,
                                        color: "bg-violet-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            onOpenReplace && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onOpenReplace(recipe),
                                className: "w-full h-8 rounded-xl bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200 hover:border-emerald-300 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        className: "w-3 h-3 text-emerald-700"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Đổi món"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/meal-planner/components/MealCard.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(MealCard, "FLFu89TSaJJEsIpl23WmAYOQD7A=");
_c1 = MealCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "MacroPill");
__turbopack_context__.k.register(_c1, "MealCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/components/MealReplacementModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MealReplacementModal",
    ()=>MealReplacementModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.mjs [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/recipeService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/priceService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$components$2f$RecipeAllergyBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/components/RecipeAllergyBadge.tsx [app-client] (ecmascript)");
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
function MealReplacementModal({ isOpen, onClose, originalRecipe, mealType, profile, onSelectReplacement }) {
    _s();
    const suggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MealReplacementModal.useMemo[suggestions]": ()=>{
            if (!originalRecipe) return [];
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getReplacementSuggestions(originalRecipe, profile);
        }
    }["MealReplacementModal.useMemo[suggestions]"], [
        originalRecipe,
        profile
    ]);
    if (!isOpen || !originalRecipe) return null;
    const origCost = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(originalRecipe, String(profile.id || "")).formatted;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-serif font-bold text-lg text-stone-900 flex items-center gap-2",
                                            children: [
                                                "Đổi món ",
                                                mealType.toLowerCase() === 'breakfast' ? 'bữa sáng' : mealType.toLowerCase() === 'lunch' ? 'bữa trưa' : mealType.toLowerCase() === 'dinner' ? 'bữa tối' : 'bữa phụ'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                            lineNumber: 48,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-stone-500",
                                            children: [
                                                "Gợi ý phù hợp chế độ chay (",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVegetarianType"])(profile.vegetarianType),
                                                "), dị ứng & mức calo mục tiêu"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 bg-emerald-50/60 border-b border-emerald-100 flex items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 shrink-0",
                                    children: "Hiện tại"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-stone-900 text-sm truncate",
                                    children: originalRecipe.name || originalRecipe.title
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 text-xs shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-amber-700",
                                    children: [
                                        originalRecipe.calories,
                                        " kcal"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-stone-400",
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-stone-600",
                                    children: origCost
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 overflow-y-auto space-y-3 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-xs text-stone-500 mb-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold uppercase tracking-wider",
                                    children: [
                                        suggestions.length,
                                        " Món thay thế tương thích"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Ưu tiên độ lệch calo thấp nhất"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        suggestions.map((recipe)=>{
                            const calDiff = recipe.calories - originalRecipe.calories;
                            const diffText = calDiff === 0 ? "Chuẩn xác calo" : calDiff > 0 ? `+${calDiff} kcal` : `${calDiff} kcal`;
                            const diffColor = Math.abs(calDiff) <= 25 ? "bg-emerald-100 text-emerald-900 border-emerald-200" : "bg-amber-100 text-amber-900 border-amber-200";
                            const costInfo = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(recipe, String(profile.id || ""));
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3.5 sm:p-4 rounded-2xl border border-stone-200 hover:border-emerald-500/80 bg-white hover:bg-stone-50/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3.5 min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0",
                                                children: recipe.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: recipe.image,
                                                    alt: recipe.title,
                                                    fill: true,
                                                    className: "object-cover group-hover:scale-105 transition-transform duration-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full h-full flex items-center justify-center text-[10px] text-stone-400",
                                                    children: "Chưa có ảnh"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                lineNumber: 116,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-2 mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-bold uppercase px-2 py-0.2 rounded-full bg-stone-100 text-stone-700",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVegetarianType"])(recipe.vegetarianType)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                                lineNumber: 133,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-[10px] font-semibold px-2 py-0.2 rounded-full border ${diffColor}`,
                                                                children: diffText
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                                lineNumber: 136,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$components$2f$RecipeAllergyBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecipeAllergyBadge"], {
                                                                recipe: recipe,
                                                                compact: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                                lineNumber: 141,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                        lineNumber: 132,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-stone-900 text-sm truncate group-hover:text-emerald-700 transition-colors",
                                                        children: recipe.name || recipe.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 text-xs text-stone-500 mt-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-1 font-semibold text-amber-600",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                        className: "w-3 h-3 fill-amber-500 text-amber-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                                        lineNumber: 150,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    recipe.calories,
                                                                    " kcal"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                                lineNumber: 149,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Đạm: ",
                                                                    recipe.protein,
                                                                    "g · Đường bột: ",
                                                                    recipe.carbs,
                                                                    "g · Béo: ",
                                                                    recipe.fat,
                                                                    "g"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                                lineNumber: 153,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-emerald-800 font-medium",
                                                                children: costInfo.formatted
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                                lineNumber: 154,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                lineNumber: 131,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                        lineNumber: 114,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onSelectReplacement(recipe);
                                            onClose();
                                        },
                                        className: "px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer shrink-0 self-end sm:self-center flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                                lineNumber: 166,
                                                columnNumber: 19
                                            }, this),
                                            "Chọn món này"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, recipe.id, true, {
                                fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, this);
                        }),
                        suggestions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 text-center text-stone-400 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "w-8 h-8 mx-auto mb-2 text-stone-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this),
                                "Không tìm thấy món thay thế phù hợp với các ràng buộc dinh dưỡng và dị ứng."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Đổi món sẽ cập nhật bữa này và tự động cân đối lại lượng calo."
                        }, void 0, false, {
                            fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-4 py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 font-semibold cursor-pointer",
                            children: "Đóng"
                        }, void 0, false, {
                            fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/meal-planner/components/MealReplacementModal.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(MealReplacementModal, "99brXxSgOmBvkdM48NkneLDgWZQ=");
_c = MealReplacementModal;
var _c;
__turbopack_context__.k.register(_c, "MealReplacementModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MonthlyCalendarView",
    ()=>MonthlyCalendarView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.mjs [app-client] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.mjs [app-client] (ecmascript) <export default as Flame>");
"use client";
;
;
function MonthlyCalendarView({ monthlyPlan, activeDayIndex, onSelectDay }) {
    const { days, monthName, totalEstimatedCost, averageDailyCalories } = monthlyPlan;
    // Weekday columns starting with Monday (Vietnamese standard)
    const weekdays = [
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7",
        "CN"
    ];
    // Calculate empty spaces before day 1
    const firstDayOfWeek = new Date(monthlyPlan.year, monthlyPlan.month, 1).getDay();
    // In JS getDay(): 0 is Sunday, 1 is Monday ... 6 is Saturday
    // Convert to Mon=0 ... Sun=6
    const leadingBlankDays = (firstDayOfWeek + 6) % 7;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif font-bold text-xl text-stone-900",
                                        children: [
                                            "Lịch thực đơn ",
                                            monthName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                        lineNumber: 38,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-stone-500",
                                        children: "Nhấn vào ngày bất kỳ để xem chi tiết và tùy biến 4 bữa ăn"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-stone-400 block text-[10px]",
                                        children: "Tổng chi phí tháng:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-emerald-800",
                                        children: [
                                            "~",
                                            totalEstimatedCost.toLocaleString("vi-VN"),
                                            " VNĐ"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-600 block text-[10px]",
                                        children: "Trung bình ngày:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-amber-900",
                                        children: [
                                            averageDailyCalories,
                                            " kcal/ngày"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-stone-500 uppercase tracking-wider py-1",
                children: weekdays.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-1",
                        children: w
                    }, w, false, {
                        fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 gap-1.5",
                children: [
                    Array.from({
                        length: leadingBlankDays
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "aspect-square sm:aspect-auto sm:h-20 rounded-2xl bg-stone-50/40 border border-transparent"
                        }, `blank-${i}`, false, {
                            fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)),
                    days.map((day, idx)=>{
                        const isSelected = activeDayIndex === idx;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onSelectDay(idx),
                            className: `aspect-square sm:aspect-auto sm:h-20 p-2 sm:p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${isSelected ? "bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-600/30" : "bg-white border-stone-200/90 text-stone-700 hover:border-emerald-400 hover:bg-stone-50"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-xs font-bold ${isSelected ? "text-white" : "text-stone-900"}`,
                                            children: day.dayOfMonth
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                            lineNumber: 97,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[10px] hidden sm:inline ${isSelected ? "text-emerald-200" : "text-stone-400"}`,
                                            children: day.shortDay
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                            lineNumber: 104,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden sm:block space-y-0.5 text-[10px] w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex items-center gap-1 font-semibold truncate ${isSelected ? "text-amber-200" : "text-amber-700"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                    className: "w-2.5 h-2.5 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        day.totalCalories,
                                                        " kcal"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `truncate font-medium ${isSelected ? "text-emerald-100" : "text-stone-500"}`,
                                            children: [
                                                "~",
                                                day.estimatedCost.toLocaleString("vi-VN"),
                                                " VNĐ"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                            lineNumber: 123,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sm:hidden flex items-center justify-center gap-1 mt-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-1.5 h-1.5 rounded-full ${isSelected ? "bg-amber-300" : "bg-emerald-600"}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, day.dateKey, true, {
                            fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = MonthlyCalendarView;
var _c;
__turbopack_context__.k.register(_c, "MonthlyCalendarView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NutritionGoalBanner",
    ()=>NutritionGoalBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.mjs [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.mjs [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/types.ts [app-client] (ecmascript)");
"use client";
;
;
;
function NutritionGoalBanner({ nutrition, profile, onCompleteProfile }) {
    const { bmiInfo, bmiStatus, dailyCalorieTarget, goalTitle, recommendedApproach, suggestions, isProfileComplete } = nutrition;
    // Incomplete profile state (Requirement 12)
    if (!isProfileComplete || !bmiInfo) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden mb-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-0 right-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none"
                }, void 0, false, {
                    fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3 max-w-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2.5 rounded-2xl bg-amber-400 text-amber-950 shrink-0 mt-0.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[11px] font-bold uppercase tracking-wider text-emerald-200 block mb-1",
                                            children: "Mục tiêu dinh dưỡng của bạn"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                            lineNumber: 40,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-serif font-bold text-xl text-white",
                                            children: "Hoàn thiện hồ sơ để cá nhân hóa thực đơn ăn chay chính xác."
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-emerald-200 mt-1 leading-relaxed",
                                            children: "Hệ thống cần chiều cao, cân nặng và độ tuổi của bạn để tính chính xác chỉ số BMI, tỷ lệ trao đổi chất BMR và lượng calo mục tiêu mỗi ngày."
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onCompleteProfile,
                            className: "h-11 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Cập nhật hồ sơ"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -bottom-10 -right-10 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-3 border-b border-emerald-700/60 pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "p-1.5 rounded-xl bg-amber-400 text-amber-950",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold uppercase tracking-wider text-emerald-200",
                                        children: "Mục tiêu dinh dưỡng của bạn"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-emerald-200",
                                        children: "Hồ sơ:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-white",
                                        children: [
                                            profile.weight,
                                            " kg · ",
                                            profile.height,
                                            " cm · ",
                                            profile.age,
                                            " tuổi"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-emerald-300 font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-[10px]",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVegetarianType"])(profile.vegetarianType)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this),
                                    profile.allergies && profile.allergies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-200 font-medium px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-600/40 text-[10px]",
                                        children: [
                                            "Dị ứng: ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatAllergies"])(profile.allergies)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-emerald-950/40 border border-emerald-700/40 rounded-2xl p-4 flex flex-col justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-emerald-300 mb-1.5 flex items-center gap-1.5 font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                        className: "w-3.5 h-3.5 text-emerald-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Chỉ số khối cơ thể (BMI)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                lineNumber: 104,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-baseline gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-serif font-bold text-3xl text-white",
                                                        children: bmiInfo.formattedBMI
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-xs font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${bmiStatus === "Underweight" ? "bg-amber-400/20 text-amber-300 border-amber-400/40" : bmiStatus === "Balanced" ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/40" : "bg-orange-500/20 text-orange-200 border-orange-400/40"}`,
                                                        children: bmiStatus === "Underweight" ? "Thiếu cân" : bmiStatus === "Balanced" ? "Cân đối" : "Thừa cân"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                lineNumber: 108,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-emerald-200/80 mt-2 leading-snug",
                                        children: [
                                            "Cân nặng lý tưởng: ",
                                            bmiInfo.healthyWeightRange.min,
                                            " - ",
                                            bmiInfo.healthyWeightRange.max,
                                            " kg"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-emerald-950/40 border border-emerald-700/40 rounded-2xl p-4 flex flex-col justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-emerald-300 mb-1.5 flex items-center gap-1.5 font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                        className: "w-3.5 h-3.5 text-amber-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                        lineNumber: 134,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Mục tiêu calo mỗi ngày"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                lineNumber: 133,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-baseline gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-serif font-bold text-3xl text-amber-300",
                                                        children: [
                                                            "~",
                                                            dailyCalorieTarget.toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-emerald-200",
                                                        children: "kcal/ngày"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                lineNumber: 137,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-emerald-200/80 mt-2 leading-snug",
                                        children: [
                                            "BMR: ",
                                            nutrition.bmr.toLocaleString(),
                                            " kcal · TDEE: ",
                                            nutrition.tdee.toLocaleString(),
                                            " kcal"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-emerald-950/40 border border-emerald-700/40 rounded-2xl p-4 flex flex-col justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-emerald-300 mb-1.5 flex items-center gap-1.5 font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                        className: "w-3.5 h-3.5 text-amber-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Mục tiêu khuyến nghị"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                lineNumber: 152,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-serif font-bold text-lg text-white leading-snug",
                                                children: goalTitle
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                lineNumber: 156,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "text-[11px] text-emerald-200/90 mt-2 space-y-0.5",
                                        children: suggestions.slice(0, 2).map((s, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-start gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-amber-400",
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate",
                                                        children: s
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-2 border-t border-emerald-800/80 flex flex-wrap items-center gap-2 text-xs text-emerald-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-amber-300",
                                children: "Định hướng:"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: recommendedApproach
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c = NutritionGoalBanner;
var _c;
__turbopack_context__.k.register(_c, "NutritionGoalBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanForSomeoneElseModal",
    ()=>PlanForSomeoneElseModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$bmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/utils/bmi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$calorieCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/utils/calorieCalculator.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const COMMON_ALLERGENS = [
    "peanut",
    "soy",
    "dairy",
    "gluten",
    "nuts",
    "egg",
    "sesame"
];
const ALLERGEN_LABELS = {
    peanut: "Đậu phộng",
    soy: "Đậu nành",
    dairy: "Sữa & Chế phẩm sữa",
    gluten: "Gluten (Lúa mì)",
    nuts: "Hạt cây",
    egg: "Trứng",
    sesame: "Mè / Vừng"
};
function PlanForSomeoneElseModal({ isOpen, onClose, currentOtherProfile, onApplySomeoneElse, onResetToMyself, isPlanForSomeoneElse }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentOtherProfile?.name || "Người thân");
    const [age, setAge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentOtherProfile?.age || 28);
    const [gender, setGender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentOtherProfile?.gender || "female");
    const [weight, setWeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentOtherProfile?.weight || 58);
    const [height, setHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentOtherProfile?.height || 162);
    // Hàm loại bỏ số 0 ở đầu khi nhập số (VD: "001" -> "1", "0170" -> "170")
    const cleanNumberInput = (raw)=>{
        if (!raw) return "";
        if (raw === "0") return "";
        return raw.replace(/^0+(?=\d)/, "");
    };
    const [activityLevel, setActivityLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentOtherProfile?.activityLevel || "moderate");
    const [vegetarianType, setVegetarianType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentOtherProfile?.vegetarianType || "vegan");
    const [healthGoal, setHealthGoal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentOtherProfile?.healthGoal || "maintain_weight");
    const [allergies, setAllergies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentOtherProfile?.allergies || []);
    const [hasCalculated, setHasCalculated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    if (!isOpen) return null;
    // Build draft profile
    const draftProfile = {
        id: "someone_else_target",
        name: name.trim() || "Khách",
        age: Number(age) || 25,
        gender,
        weight: Number(weight) || 60,
        height: Number(height) || 165,
        activityLevel,
        vegetarianType,
        healthGoal,
        allergies
    };
    const bmiInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$bmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateBMI"])(draftProfile.weight, draftProfile.height);
    const nutrition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$calorieCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDailyCalorieTarget"])(draftProfile);
    const toggleAllergy = (allergy)=>{
        if (allergies.includes(allergy)) {
            setAllergies(allergies.filter((a)=>a !== allergy));
        } else {
            setAllergies([
                ...allergies,
                allergy
            ]);
        }
    };
    const handleApply = (e)=>{
        e.preventDefault();
        onApplySomeoneElse(draftProfile);
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-9 h-9 rounded-xl bg-violet-100 text-violet-800 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-serif font-bold text-lg text-stone-900",
                                            children: "Lên kế hoạch cho người khác"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-stone-500",
                                            children: "Tạo kế hoạch ăn uống tùy chỉnh mà không ảnh hưởng đến hồ sơ chính của bạn"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleApply,
                    className: "p-6 overflow-y-auto space-y-5 flex-1",
                    children: [
                        isPlanForSomeoneElse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 bg-violet-50 border border-violet-200 rounded-2xl flex items-center justify-between text-xs text-violet-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Đang áp dụng cho: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: currentOtherProfile?.name || "Người khác"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 130,
                                            columnNumber: 35
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        onResetToMyself();
                                        onClose();
                                    },
                                    className: "font-bold underline text-violet-800 hover:text-violet-950 cursor-pointer",
                                    children: "Chuyển lại cho Bản thân"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-stone-700 mb-1",
                                            children: "Họ tên / Biệt danh:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: name,
                                            onChange: (e)=>setName(e.target.value),
                                            placeholder: "Ví dụ: Mẹ, Bạn thân, Vợ...",
                                            className: "w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-stone-700 mb-1",
                                            children: "Tuổi:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "10",
                                            max: "100",
                                            value: age === 0 ? "" : age,
                                            onChange: (e)=>setAge(cleanNumberInput(e.target.value)),
                                            className: "w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-stone-700 mb-1",
                                            children: "Giới tính:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 180,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: gender,
                                            onChange: (e)=>setGender(e.target.value),
                                            className: "w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "female",
                                                    children: "Nữ"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "male",
                                                    children: "Nam"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "other",
                                                    children: "Khác"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 183,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-stone-700 mb-1",
                                            children: "Kiểu ăn chay:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 194,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: vegetarianType,
                                            onChange: (e)=>setVegetarianType(e.target.value),
                                            className: "w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "vegan",
                                                    children: "Thuần chay (Vegan)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "lacto_vegetarian",
                                                    children: "Chay có sữa (Lacto)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "ovo_vegetarian",
                                                    children: "Chay có trứng (Ovo)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "lacto_ovo_vegetarian",
                                                    children: "Chay có trứng & sữa (Ovo-Lacto)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 197,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-stone-700 mb-1",
                                            children: "Cân nặng (kg):"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 213,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            step: "any",
                                            min: "30",
                                            max: "200",
                                            value: weight === 0 ? "" : weight,
                                            onChange: (e)=>setWeight(cleanNumberInput(e.target.value)),
                                            className: "w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 216,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-stone-700 mb-1",
                                            children: "Chiều cao (cm):"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 228,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "100",
                                            max: "230",
                                            value: height === 0 ? "" : height,
                                            onChange: (e)=>setHeight(cleanNumberInput(e.target.value)),
                                            className: "w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 231,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 227,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-stone-700 mb-1",
                                            children: "Mức độ vận động:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 247,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: activityLevel,
                                            onChange: (e)=>setActivityLevel(e.target.value),
                                            className: "w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "sedentary",
                                                    children: "Ít vận động (Ngồi nhiều)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "light",
                                                    children: "Vận động nhẹ (1-3 ngày/tuần)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "moderate",
                                                    children: "Vận động vừa (3-5 ngày/tuần)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "active",
                                                    children: "Năng động (6-7 ngày/tuần)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "very_active",
                                                    children: "Cường độ cao (Tập nặng)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 246,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-semibold text-stone-700 mb-1",
                                            children: "Mục tiêu sức khỏe:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: healthGoal,
                                            onChange: (e)=>setHealthGoal(e.target.value),
                                            className: "w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "lose_weight",
                                                    children: "Giảm cân (-500 kcal)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "maintain_weight",
                                                    children: "Giữ cân (Cân bằng)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "gain_weight",
                                                    children: "Tăng cơ / tăng cân (+350 kcal)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "healthy_eating",
                                                    children: "Ăn uống lành mạnh"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 266,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-stone-700 mb-1.5",
                                    children: "Dị ứng cần loại trừ:"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 281,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: COMMON_ALLERGENS.map((allergy)=>{
                                        const active = allergies.includes(allergy);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>toggleAllergy(allergy),
                                            className: `px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${active ? "bg-rose-600 text-white font-semibold shadow-2xs" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`,
                                            children: [
                                                active ? "✕ " : "+ ",
                                                ALLERGEN_LABELS[allergy] || allergy
                                            ]
                                        }, allergy, true, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 288,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between border-b pb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-stone-800 flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    className: "w-3.5 h-3.5 text-emerald-700"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 17
                                                }, this),
                                                "Chỉ số dinh dưỡng tính toán cho ",
                                                name || "người này"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 309,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[11px] font-semibold text-emerald-800",
                                            children: "Công thức Mifflin-St Jeor"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 313,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 308,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-stone-500",
                                                    children: "BMI"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold text-stone-900 text-sm",
                                                    children: bmiInfo?.formattedBMI
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-stone-400",
                                                    children: [
                                                        "(",
                                                        bmiInfo?.category === "Underweight" ? "Thiếu cân" : bmiInfo?.category === "Balanced" ? "Cân đối" : "Thừa cân",
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 316,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-stone-500",
                                                    children: "BMR"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 324,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold text-stone-900 text-sm",
                                                    children: [
                                                        nutrition.bmr,
                                                        " kcal"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 325,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 323,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-stone-500",
                                                    children: "TDEE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold text-stone-900 text-sm",
                                                    children: [
                                                        nutrition.tdee,
                                                        " kcal"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 327,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-stone-500",
                                                    children: "Calo mục tiêu"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold text-emerald-800 text-sm",
                                                    children: [
                                                        nutrition.dailyCalorieTarget,
                                                        " kcal"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 331,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 315,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                            lineNumber: 307,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between pt-2",
                            children: [
                                isPlanForSomeoneElse ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        onResetToMyself();
                                        onClose();
                                    },
                                    className: "text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer",
                                    children: "Khôi phục về Bản thân"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 341,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 352,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: onClose,
                                            className: "h-10 px-4 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer",
                                            children: "Hủy"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 356,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 17
                                                }, this),
                                                "Áp dụng vào thực đơn"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                            lineNumber: 363,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                                    lineNumber: 355,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                            lineNumber: 339,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
            lineNumber: 101,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(PlanForSomeoneElseModal, "aob4GQGds3dxtmN+IuSFrI8BWiM=");
_c = PlanForSomeoneElseModal;
var _c;
__turbopack_context__.k.register(_c, "PlanForSomeoneElseModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SaveMealPlanModal",
    ()=>SaveMealPlanModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SaveMealPlanModal({ isOpen, onClose, onSave, planType, targetCalories, totalCost }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(`${planType === "weekly" ? "Kế hoạch tuần" : "Kế hoạch tháng"} (${new Date().toLocaleDateString("vi-VN")})`);
    if (!isOpen) return null;
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!name.trim()) return;
        onSave(name.trim());
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        className: "w-4 h-4 fill-rose-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                        lineNumber: 43,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-serif font-bold text-base text-stone-900",
                                            children: "Lưu vào Thực đơn yêu thích"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-stone-500",
                                            children: "Lưu lại thành mẫu thực đơn yêu thích để tái sử dụng"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                            lineNumber: 49,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-stone-700 mb-1.5",
                                    children: "Tên mẫu thực đơn:"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    placeholder: "Ví dụ: Thực đơn giàu đạm tuần 1",
                                    className: "w-full h-11 px-4 rounded-xl border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-900 focus:bg-white focus:border-emerald-600 outline-none",
                                    autoFocus: true,
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Loại thực đơn:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                            lineNumber: 81,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-stone-900",
                                            children: planType === "weekly" ? "Thực đơn tuần (7 ngày)" : "Thực đơn tháng (30 ngày)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Mục tiêu calo / ngày:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-amber-700",
                                            children: [
                                                targetCalories,
                                                " kcal"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Chi phí ước tính:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-emerald-800",
                                            children: [
                                                "~",
                                                totalCost.toLocaleString("vi-VN"),
                                                " VNĐ"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-end gap-2 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "h-10 px-4 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer",
                                    children: "Hủy"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this),
                                        "Lưu thực đơn"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(SaveMealPlanModal, "PWYKIq+K+fh3bF0GON/E/JQFqK8=");
_c = SaveMealPlanModal;
var _c;
__turbopack_context__.k.register(_c, "SaveMealPlanModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/data/mockMealPlan.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALLERGY_OPTIONS",
    ()=>ALLERGY_OPTIONS,
    "GOAL_OPTIONS",
    ()=>GOAL_OPTIONS,
    "MEAL_PLAN_DAYS",
    ()=>MEAL_PLAN_DAYS,
    "PANTRY_DEFAULT_TAGS",
    ()=>PANTRY_DEFAULT_TAGS,
    "SCAN_PRESETS",
    ()=>SCAN_PRESETS
]);
const ALLERGY_OPTIONS = [
    "Peanuts",
    "Gluten",
    "Soy",
    "Dairy",
    "Tree nuts",
    "Sesame",
    "Corn",
    "Shellfish cross-contact"
];
const PANTRY_DEFAULT_TAGS = [
    "Tofu",
    "Brown rice",
    "Spinach",
    "Avocado",
    "Garlic",
    "Chickpeas",
    "Sesame oil"
];
const GOAL_OPTIONS = [
    "Weight loss",
    "Muscle gain",
    "Maintenance"
];
const MEAL_PLAN_DAYS = [
    {
        day: "Monday",
        shortDay: "Mon",
        date: "Sep 22",
        targetKcal: 2100,
        totalKcal: 1980,
        breakfast: {
            name: "High-Protein Chia Overnight Oats with Soy Milk & Berries",
            kcal: 460,
            proteinGrams: 28,
            carbsGrams: 58,
            fatGrams: 14,
            time: "5 min prep"
        },
        lunch: {
            name: "Crispy Sesame Garlic Tofu with Bok Choy & Jasmine Rice",
            kcal: 680,
            proteinGrams: 42,
            carbsGrams: 76,
            fatGrams: 22,
            time: "25 min"
        },
        dinner: {
            name: "Golden Turmeric Red Lentil Dahl with Wilted Greens",
            kcal: 540,
            proteinGrams: 32,
            carbsGrams: 64,
            fatGrams: 16,
            time: "30 min"
        }
    },
    {
        day: "Tuesday",
        shortDay: "Tue",
        date: "Sep 23",
        targetKcal: 2100,
        totalKcal: 2050,
        breakfast: {
            name: "Fresh Mango Mint Smoothie Bowl with Hemp Hearts",
            kcal: 420,
            proteinGrams: 22,
            carbsGrams: 65,
            fatGrams: 12,
            time: "10 min"
        },
        lunch: {
            name: "Charred Broccoli Quinoa Protein Bowl with Lemon Tahini",
            kcal: 710,
            proteinGrams: 38,
            carbsGrams: 78,
            fatGrams: 26,
            time: "25 min"
        },
        dinner: {
            name: "Vietnamese Lemongrass Braised Eggplant with Brown Rice",
            kcal: 520,
            proteinGrams: 24,
            carbsGrams: 72,
            fatGrams: 15,
            time: "20 min"
        }
    },
    {
        day: "Wednesday",
        shortDay: "Wed",
        date: "Sep 24",
        targetKcal: 2100,
        totalKcal: 2020,
        breakfast: {
            name: "Avocado & Scrambled Turmeric Tofu Toast on Sourdough",
            kcal: 480,
            proteinGrams: 30,
            carbsGrams: 45,
            fatGrams: 20,
            time: "15 min"
        },
        lunch: {
            name: "Creamy Coconut Lime Noodle Soup with King Oyster Mushrooms",
            kcal: 690,
            proteinGrams: 34,
            carbsGrams: 82,
            fatGrams: 24,
            time: "20 min"
        },
        dinner: {
            name: "Tempeh & Edamame Poke Bowl with Spicy Mayo",
            kcal: 580,
            proteinGrams: 44,
            carbsGrams: 60,
            fatGrams: 18,
            time: "20 min"
        }
    },
    {
        day: "Thursday",
        shortDay: "Thu",
        date: "Sep 25",
        targetKcal: 2100,
        totalKcal: 1960,
        breakfast: {
            name: "Peanut Butter Banana Protein Oatmeal Bowl",
            kcal: 510,
            proteinGrams: 29,
            carbsGrams: 66,
            fatGrams: 16,
            time: "10 min"
        },
        lunch: {
            name: "Smoky Black Bean & Sweet Potato Burrito Bowl",
            kcal: 650,
            proteinGrams: 36,
            carbsGrams: 86,
            fatGrams: 18,
            time: "25 min"
        },
        dinner: {
            name: "Miso Glazed Portobello Steaks with Sautéed Gai Lan",
            kcal: 500,
            proteinGrams: 26,
            carbsGrams: 52,
            fatGrams: 19,
            time: "25 min"
        }
    },
    {
        day: "Friday",
        shortDay: "Fri",
        date: "Sep 26",
        targetKcal: 2100,
        totalKcal: 2110,
        breakfast: {
            name: "Dragonfruit Chia Pudding with Toasted Coconut Flakes",
            kcal: 390,
            proteinGrams: 18,
            carbsGrams: 54,
            fatGrams: 14,
            time: "5 min prep"
        },
        lunch: {
            name: "Vietnamese Tofu Spring Rolls with Hoisin Peanut Dip",
            kcal: 620,
            proteinGrams: 35,
            carbsGrams: 74,
            fatGrams: 20,
            time: "20 min"
        },
        dinner: {
            name: "Rich Coconut Pumpkin Curry with Steamed Wild Rice",
            kcal: 640,
            proteinGrams: 28,
            carbsGrams: 80,
            fatGrams: 22,
            time: "30 min"
        }
    },
    {
        day: "Saturday",
        shortDay: "Sat",
        date: "Sep 27",
        targetKcal: 2100,
        totalKcal: 2180,
        breakfast: {
            name: "Fluffy Banana Buckwheat Pancakes with Pure Maple Glaze",
            kcal: 540,
            proteinGrams: 24,
            carbsGrams: 84,
            fatGrams: 12,
            time: "20 min"
        },
        lunch: {
            name: "Loaded Falafel Salad with Pickled Turnips & Tahini",
            kcal: 690,
            proteinGrams: 32,
            carbsGrams: 72,
            fatGrams: 28,
            time: "15 min"
        },
        dinner: {
            name: "Spicy Kung Pao Tofu with Cashews & Bell Peppers",
            kcal: 650,
            proteinGrams: 39,
            carbsGrams: 68,
            fatGrams: 24,
            time: "25 min"
        }
    },
    {
        day: "Sunday",
        shortDay: "Sun",
        date: "Sep 28",
        targetKcal: 2100,
        totalKcal: 1940,
        breakfast: {
            name: "Warm Matcha Protein Latte with Spiced Apple Stew",
            kcal: 410,
            proteinGrams: 25,
            carbsGrams: 52,
            fatGrams: 10,
            time: "10 min"
        },
        lunch: {
            name: "Vietnamese Sweet & Sour Tofu Soup (Canh Chua Chay)",
            kcal: 580,
            proteinGrams: 36,
            carbsGrams: 64,
            fatGrams: 16,
            time: "30 min"
        },
        dinner: {
            name: "Rainbow Pad Thai with Crushed Peanuts & Crispy Tofu",
            kcal: 670,
            proteinGrams: 40,
            carbsGrams: 82,
            fatGrams: 21,
            time: "25 min"
        }
    }
];
const SCAN_PRESETS = [
    {
        id: "pantry",
        label: "Pantry Produce Basket",
        detected: [
            {
                id: "d1",
                name: "Firm Tofu block",
                freshness: "Fresh",
                category: "Protein",
                confidence: 0.98
            },
            {
                id: "d2",
                name: "Baby Bok Choy",
                freshness: "Fresh",
                category: "Vegetable",
                confidence: 0.95
            },
            {
                id: "d3",
                name: "Garlic cloves",
                freshness: "Fresh",
                category: "Aromatics",
                confidence: 0.99
            },
            {
                id: "d4",
                name: "Ripe Asian Eggplant",
                freshness: "Use soon",
                category: "Vegetable",
                confidence: 0.92
            },
            {
                id: "d5",
                name: "Cilantro bunch",
                freshness: "Use soon",
                category: "Herbs",
                confidence: 0.88
            }
        ],
        matchingRecipeIds: [
            "v1",
            "v5",
            "v2"
        ]
    },
    {
        id: "fridge",
        label: "Fridge Leftovers Box",
        detected: [
            {
                id: "d6",
                name: "Red Lentils",
                freshness: "Fresh",
                category: "Legumes",
                confidence: 0.97
            },
            {
                id: "d7",
                name: "Spinach leaves",
                freshness: "Use soon",
                category: "Greens",
                confidence: 0.91
            },
            {
                id: "d8",
                name: "Turmeric root",
                freshness: "Fresh",
                category: "Spices",
                confidence: 0.96
            },
            {
                id: "d9",
                name: "Coconut milk can",
                freshness: "Fresh",
                category: "Pantry",
                confidence: 0.99
            }
        ],
        matchingRecipeIds: [
            "v6",
            "v2",
            "v4"
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/hooks/useMealPlanner.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMealPlanner",
    ()=>useMealPlanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/services/mealPlannerService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/hooks/useProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$calorieCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/utils/calorieCalculator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/favoriteService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/recipeService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlanApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/services/mealPlanApiService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/services/profileService.ts [app-client] (ecmascript)");
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
function useMealPlanner() {
    _s();
    const { profile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"])();
    // "Plan for Someone Else" state (Requirement 17)
    const [isPlanForSomeoneElse, setIsPlanForSomeoneElse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [someoneElseProfile, setSomeoneElseProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Active profile used for planning
    const activeProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMealPlanner.useMemo[activeProfile]": ()=>{
            if (isPlanForSomeoneElse && someoneElseProfile) {
                return someoneElseProfile;
            }
            return profile;
        }
    }["useMealPlanner.useMemo[activeProfile]"], [
        isPlanForSomeoneElse,
        someoneElseProfile,
        profile
    ]);
    // NO AUTO-GENERATION: defaults to false unless explicitly generated or loaded (Requirements 18, 22, 29)
    const [hasGenerated, setHasGenerated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useMealPlanner.useState": ()=>{
            const saved = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].GENERATED_PLAN, null);
            return !!saved && (!!saved.weeklyPlan || !!saved.monthlyPlan);
        }
    }["useMealPlanner.useState"]);
    const [planType, setPlanType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useMealPlanner.useState": ()=>{
            const saved = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].GENERATED_PLAN, null);
            return saved?.planType || "weekly";
        }
    }["useMealPlanner.useState"]);
    const [activeDayIndex, setActiveDayIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useMealPlanner.useState": ()=>{
            const saved = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].GENERATED_PLAN, null);
            return saved?.activeDayIndex || 0;
        }
    }["useMealPlanner.useState"]);
    // Store actual plans
    const [weeklyPlan, setWeeklyPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useMealPlanner.useState": ()=>{
            const saved = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].GENERATED_PLAN, null);
            return saved?.weeklyPlan || null;
        }
    }["useMealPlanner.useState"]);
    const [monthlyPlan, setMonthlyPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useMealPlanner.useState": ()=>{
            const saved = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].GENERATED_PLAN, null);
            return saved?.monthlyPlan || null;
        }
    }["useMealPlanner.useState"]);
    const [selectedMonth, setSelectedMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useMealPlanner.useState": ()=>new Date().getMonth()
    }["useMealPlanner.useState"]);
    const [selectedYear, setSelectedYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useMealPlanner.useState": ()=>new Date().getFullYear()
    }["useMealPlanner.useState"]);
    const [budgetLimit, setBudgetLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [generationFeedback, setGenerationFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Profile Change Notification without auto-regenerating (Requirement 29)
    const [profileChangedNotice, setProfileChangedNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const prevProfileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(JSON.stringify(profile));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMealPlanner.useEffect": ()=>{
            const currentJson = JSON.stringify(profile);
            if (hasGenerated && !isPlanForSomeoneElse && prevProfileRef.current !== currentJson) {
                setProfileChangedNotice(true);
            }
            prevProfileRef.current = currentJson;
        }
    }["useMealPlanner.useEffect"], [
        profile,
        hasGenerated,
        isPlanForSomeoneElse
    ]);
    // Listen for external recipe changes or price updates
    const [syncVersion, setSyncVersion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMealPlanner.useEffect": ()=>{
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].subscribe({
                "useMealPlanner.useEffect.unsubscribe": (event)=>{
                    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPES || event.key === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPE_PRICES || event.key === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].FAVORITES) {
                        setSyncVersion({
                            "useMealPlanner.useEffect.unsubscribe": (v)=>v + 1
                        }["useMealPlanner.useEffect.unsubscribe"]);
                    }
                }
            }["useMealPlanner.useEffect.unsubscribe"]);
            return unsubscribe;
        }
    }["useMealPlanner.useEffect"], []);
    const nutritionSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMealPlanner.useMemo[nutritionSummary]": ()=>{
            void syncVersion;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$calorieCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDailyCalorieTarget"])(activeProfile);
        }
    }["useMealPlanner.useMemo[nutritionSummary]"], [
        activeProfile,
        syncVersion
    ]);
    // Current active day meal plan
    const activeDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMealPlanner.useMemo[activeDay]": ()=>{
            if (!hasGenerated) return null;
            if (planType === "weekly" && weeklyPlan) {
                return weeklyPlan.days[activeDayIndex] || weeklyPlan.days[0] || null;
            }
            if (planType === "monthly" && monthlyPlan) {
                return monthlyPlan.days[activeDayIndex] || monthlyPlan.days[0] || null;
            }
            return null;
        }
    }["useMealPlanner.useMemo[activeDay]"], [
        hasGenerated,
        planType,
        weeklyPlan,
        monthlyPlan,
        activeDayIndex
    ]);
    /**
   * Generates Weekly Meal Plan on explicit user action (Requirement 18, 19, 22)
   */ /**
   * Generates Weekly Meal Plan using real database recipes and backend AI API (Requirement 18, 19, 22)
   */ const generateWeekly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMealPlanner.useCallback[generateWeekly]": async (options, onComplete)=>{
            setIsGenerating(true);
            setGenerationFeedback("AI đang phân tích hồ sơ dinh dưỡng & công thức thật...");
            try {
                // 1. Đồng bộ công thức thật từ database
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].syncRecipesFromApi();
                // 2. Đồng bộ profile nếu đã đăng nhập và là chính mình
                if (!isPlanForSomeoneElse) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].updateProfile(activeProfile).catch({
                        "useMealPlanner.useCallback[generateWeekly]": ()=>{}
                    }["useMealPlanner.useCallback[generateWeekly]"]);
                }
                let plan = null;
                // 3. Nếu không có danh sách món yêu thích tùy biến, thử gọi Backend API #25
                if (!options?.favoriteRecipeIds || options.favoriteRecipeIds.length === 0) {
                    try {
                        const apiRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlanApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlanApiService"].generateWeekly({
                            total_budget: options?.budgetLimit ?? budgetLimit
                        });
                        if (apiRes && (apiRes.data || apiRes.weekly_plans || apiRes.meal_plan_id)) {
                            plan = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlannerService"].convertBackendWeeklyPlan(apiRes, activeProfile);
                        }
                    } catch (apiErr) {
                        console.warn("Backend generateWeekly failed, falling back to local engine with real DB recipes:", apiErr);
                    }
                }
                // 4. Nếu chưa có plan (hoặc có favoriteRecipeIds), dùng engine với danh sách công thức thật
                if (!plan) {
                    const seed = Math.floor(Math.random() * 100);
                    plan = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlannerService"].generateWeeklyPlan(activeProfile, seed, {
                        planType: "weekly",
                        budgetLimit: options?.budgetLimit ?? budgetLimit,
                        favoriteRecipeIds: options?.favoriteRecipeIds
                    });
                }
                setWeeklyPlan(plan);
                setPlanType("weekly");
                setHasGenerated(true);
                setActiveDayIndex(0);
                setProfileChangedNotice(false);
                setIsGenerating(false);
                setGenerationFeedback("✓ Đã sinh thực đơn 7 ngày từ công thức thật!");
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].GENERATED_PLAN, {
                    planType: "weekly",
                    weeklyPlan: plan,
                    monthlyPlan: null,
                    activeDayIndex: 0
                });
                setTimeout({
                    "useMealPlanner.useCallback[generateWeekly]": ()=>setGenerationFeedback(null)
                }["useMealPlanner.useCallback[generateWeekly]"], 3000);
                onComplete?.();
            } catch (err) {
                console.error("Lỗi khi sinh thực đơn tuần:", err);
                setIsGenerating(false);
                setGenerationFeedback("Có lỗi khi sinh thực đơn");
                setTimeout({
                    "useMealPlanner.useCallback[generateWeekly]": ()=>setGenerationFeedback(null)
                }["useMealPlanner.useCallback[generateWeekly]"], 3000);
            }
        }
    }["useMealPlanner.useCallback[generateWeekly]"], [
        activeProfile,
        budgetLimit,
        isPlanForSomeoneElse
    ]);
    /**
   * Generates Monthly Meal Plan using real database recipes and backend AI API (Requirement 18, 20, 21)
   */ const generateMonthly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMealPlanner.useCallback[generateMonthly]": async (month = selectedMonth, year = selectedYear, options, onComplete)=>{
            setIsGenerating(true);
            setGenerationFeedback(`AI đang chuẩn bị thực đơn cả tháng ${month + 1}/${year}...`);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].syncRecipesFromApi();
                if (!isPlanForSomeoneElse) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].updateProfile(activeProfile).catch({
                        "useMealPlanner.useCallback[generateMonthly]": ()=>{}
                    }["useMealPlanner.useCallback[generateMonthly]"]);
                }
                let plan = null;
                if (!options?.favoriteRecipeIds || options.favoriteRecipeIds.length === 0) {
                    try {
                        const apiRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlanApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlanApiService"].generateMonthly({
                            total_budget: options?.budgetLimit ?? budgetLimit
                        });
                        if (apiRes && (apiRes.data || apiRes.weekly_plans || apiRes.meal_plan_id)) {
                            plan = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlannerService"].convertBackendMonthlyPlan(apiRes, activeProfile, year, month);
                        }
                    } catch (apiErr) {
                        console.warn("Backend generateMonthly failed, falling back to local engine with real DB recipes:", apiErr);
                    }
                }
                if (!plan) {
                    const seed = Math.floor(Math.random() * 100);
                    plan = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlannerService"].generateMonthlyPlan(activeProfile, year, month, seed, {
                        planType: "monthly",
                        budgetLimit: options?.budgetLimit ?? budgetLimit,
                        favoriteRecipeIds: options?.favoriteRecipeIds
                    });
                }
                setMonthlyPlan(plan);
                setSelectedMonth(month);
                setSelectedYear(year);
                setPlanType("monthly");
                setHasGenerated(true);
                setActiveDayIndex(0);
                setProfileChangedNotice(false);
                setIsGenerating(false);
                setGenerationFeedback(`✓ Đã sinh thực đơn cả tháng cho ${plan.monthName}!`);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].GENERATED_PLAN, {
                    planType: "monthly",
                    weeklyPlan: null,
                    monthlyPlan: plan,
                    activeDayIndex: 0
                });
                setTimeout({
                    "useMealPlanner.useCallback[generateMonthly]": ()=>setGenerationFeedback(null)
                }["useMealPlanner.useCallback[generateMonthly]"], 3000);
                onComplete?.();
            } catch (err) {
                console.error("Lỗi khi sinh thực đơn tháng:", err);
                setIsGenerating(false);
                setGenerationFeedback("Có lỗi khi sinh thực đơn tháng");
                setTimeout({
                    "useMealPlanner.useCallback[generateMonthly]": ()=>setGenerationFeedback(null)
                }["useMealPlanner.useCallback[generateMonthly]"], 3000);
            }
        }
    }["useMealPlanner.useCallback[generateMonthly]"], [
        activeProfile,
        selectedMonth,
        selectedYear,
        budgetLimit,
        isPlanForSomeoneElse
    ]);
    /**
   * Change a single individual meal in the active plan without regenerating other meals (Requirement 3)
   */ const replaceMeal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMealPlanner.useCallback[replaceMeal]": (dayIdx, mealSlot, newRecipe)=>{
            const userId = String(activeProfile.id || "");
            const targetCalories = nutritionSummary.dailyCalorieTarget;
            if (planType === "weekly" && weeklyPlan) {
                const updatedDays = [
                    ...weeklyPlan.days
                ];
                const day = updatedDays[dayIdx];
                if (!day) return;
                const updatedDay = {
                    ...day,
                    [mealSlot]: {
                        recipe: newRecipe,
                        time: `${newRecipe.prepTime + newRecipe.cookTime} min`
                    }
                };
                const recalculated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlannerService"].recalculateDay(updatedDay, targetCalories, userId);
                updatedDays[dayIdx] = recalculated;
                const totalKcal = updatedDays.reduce({
                    "useMealPlanner.useCallback[replaceMeal].totalKcal": (sum, d)=>sum + d.totalCalories
                }["useMealPlanner.useCallback[replaceMeal].totalKcal"], 0);
                const totalProtein = updatedDays.reduce({
                    "useMealPlanner.useCallback[replaceMeal].totalProtein": (sum, d)=>sum + d.totalProtein
                }["useMealPlanner.useCallback[replaceMeal].totalProtein"], 0);
                const totalCost = updatedDays.reduce({
                    "useMealPlanner.useCallback[replaceMeal].totalCost": (sum, d)=>sum + d.estimatedCost
                }["useMealPlanner.useCallback[replaceMeal].totalCost"], 0);
                setWeeklyPlan({
                    days: updatedDays,
                    averageDailyCalories: Math.round(totalKcal / updatedDays.length),
                    averageProtein: Math.round(totalProtein / updatedDays.length),
                    targetCalories,
                    totalEstimatedCost: totalCost,
                    averageDailyCost: Math.round(totalCost / updatedDays.length)
                });
            } else if (planType === "monthly" && monthlyPlan) {
                const updatedDays = [
                    ...monthlyPlan.days
                ];
                const day = updatedDays[dayIdx];
                if (!day) return;
                const updatedDay = {
                    ...day,
                    [mealSlot]: {
                        recipe: newRecipe,
                        time: `${newRecipe.prepTime + newRecipe.cookTime} min`
                    }
                };
                const recalculated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlannerService"].recalculateDay(updatedDay, targetCalories, userId);
                updatedDays[dayIdx] = {
                    ...recalculated,
                    dayOfMonth: day.dayOfMonth,
                    month: day.month,
                    year: day.year,
                    dateKey: day.dateKey,
                    isCurrentMonth: day.isCurrentMonth
                };
                const totalKcal = updatedDays.reduce({
                    "useMealPlanner.useCallback[replaceMeal].totalKcal": (sum, d)=>sum + d.totalCalories
                }["useMealPlanner.useCallback[replaceMeal].totalKcal"], 0);
                const totalCost = updatedDays.reduce({
                    "useMealPlanner.useCallback[replaceMeal].totalCost": (sum, d)=>sum + d.estimatedCost
                }["useMealPlanner.useCallback[replaceMeal].totalCost"], 0);
                setMonthlyPlan({
                    ...monthlyPlan,
                    days: updatedDays,
                    totalEstimatedCost: totalCost,
                    averageDailyCalories: Math.round(totalKcal / updatedDays.length),
                    averageDailyCost: Math.round(totalCost / updatedDays.length)
                });
            }
        }
    }["useMealPlanner.useCallback[replaceMeal]"], [
        planType,
        weeklyPlan,
        monthlyPlan,
        activeProfile,
        nutritionSummary
    ]);
    /**
   * Regenerates a single day with random variation (Requirement 3, 4)
   */ const regenerateSingleDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMealPlanner.useCallback[regenerateSingleDay]": (index)=>{
            const targetDay = planType === "weekly" ? weeklyPlan?.days[index] : monthlyPlan?.days[index];
            if (!targetDay) return;
            const dayInfo = {
                day: targetDay.dayName,
                short: targetDay.shortDay,
                date: targetDay.dateText
            };
            const randomOffset = Math.floor(Math.random() * 20) + 1;
            const regenerated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlannerService"].generateDayPlan(dayInfo, activeProfile, index, randomOffset);
            if (planType === "weekly" && weeklyPlan) {
                const updatedDays = [
                    ...weeklyPlan.days
                ];
                updatedDays[index] = regenerated;
                const totalKcal = updatedDays.reduce({
                    "useMealPlanner.useCallback[regenerateSingleDay].totalKcal": (sum, d)=>sum + d.totalCalories
                }["useMealPlanner.useCallback[regenerateSingleDay].totalKcal"], 0);
                const totalProtein = updatedDays.reduce({
                    "useMealPlanner.useCallback[regenerateSingleDay].totalProtein": (sum, d)=>sum + d.totalProtein
                }["useMealPlanner.useCallback[regenerateSingleDay].totalProtein"], 0);
                const totalCost = updatedDays.reduce({
                    "useMealPlanner.useCallback[regenerateSingleDay].totalCost": (sum, d)=>sum + d.estimatedCost
                }["useMealPlanner.useCallback[regenerateSingleDay].totalCost"], 0);
                setWeeklyPlan({
                    days: updatedDays,
                    averageDailyCalories: Math.round(totalKcal / updatedDays.length),
                    averageProtein: Math.round(totalProtein / updatedDays.length),
                    targetCalories: weeklyPlan.targetCalories,
                    totalEstimatedCost: totalCost,
                    averageDailyCost: Math.round(totalCost / updatedDays.length)
                });
            } else if (planType === "monthly" && monthlyPlan) {
                const calDay = targetDay;
                const updatedDays = [
                    ...monthlyPlan.days
                ];
                updatedDays[index] = {
                    ...regenerated,
                    dayOfMonth: calDay.dayOfMonth,
                    month: calDay.month,
                    year: calDay.year,
                    dateKey: calDay.dateKey,
                    isCurrentMonth: calDay.isCurrentMonth
                };
                const totalKcal = updatedDays.reduce({
                    "useMealPlanner.useCallback[regenerateSingleDay].totalKcal": (sum, d)=>sum + d.totalCalories
                }["useMealPlanner.useCallback[regenerateSingleDay].totalKcal"], 0);
                const totalCost = updatedDays.reduce({
                    "useMealPlanner.useCallback[regenerateSingleDay].totalCost": (sum, d)=>sum + d.estimatedCost
                }["useMealPlanner.useCallback[regenerateSingleDay].totalCost"], 0);
                setMonthlyPlan({
                    ...monthlyPlan,
                    days: updatedDays,
                    totalEstimatedCost: totalCost,
                    averageDailyCalories: Math.round(totalKcal / updatedDays.length),
                    averageDailyCost: Math.round(totalCost / updatedDays.length)
                });
            }
        }
    }["useMealPlanner.useCallback[regenerateSingleDay]"], [
        planType,
        weeklyPlan,
        monthlyPlan,
        activeProfile
    ]);
    /**
   * Save currently active plan to User Favorites and PostgreSQL Database
   */ const saveCurrentMealPlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMealPlanner.useCallback[saveCurrentMealPlan]": async (name)=>{
            const days = planType === "weekly" ? weeklyPlan?.days : monthlyPlan?.days;
            if (!days || days.length === 0) return null;
            const totalCost = planType === "weekly" ? weeklyPlan?.totalEstimatedCost || 0 : monthlyPlan?.totalEstimatedCost || 0;
            const saved = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].saveMealPlan(String(profile.id || "u1"), {
                name,
                planType,
                targetCalories: nutritionSummary.dailyCalorieTarget,
                totalEstimatedCost: totalCost,
                days
            });
            return saved;
        }
    }["useMealPlanner.useCallback[saveCurrentMealPlan]"], [
        planType,
        weeklyPlan,
        monthlyPlan,
        profile,
        nutritionSummary
    ]);
    /**
   * Load a saved meal plan as current active plan (Requirement 1)
   */ const loadSavedPlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMealPlanner.useCallback[loadSavedPlan]": (saved)=>{
            if (saved.planType === "weekly") {
                const totalKcal = saved.days.reduce({
                    "useMealPlanner.useCallback[loadSavedPlan].totalKcal": (sum, d)=>sum + d.totalCalories
                }["useMealPlanner.useCallback[loadSavedPlan].totalKcal"], 0);
                const totalProtein = saved.days.reduce({
                    "useMealPlanner.useCallback[loadSavedPlan].totalProtein": (sum, d)=>sum + d.totalProtein
                }["useMealPlanner.useCallback[loadSavedPlan].totalProtein"], 0);
                const totalCost = saved.days.reduce({
                    "useMealPlanner.useCallback[loadSavedPlan].totalCost": (sum, d)=>sum + d.estimatedCost
                }["useMealPlanner.useCallback[loadSavedPlan].totalCost"], 0);
                const newPlan = {
                    days: saved.days,
                    averageDailyCalories: Math.round(totalKcal / saved.days.length),
                    averageProtein: Math.round(totalProtein / saved.days.length),
                    targetCalories: saved.targetCalories,
                    totalEstimatedCost: totalCost,
                    averageDailyCost: Math.round(totalCost / saved.days.length)
                };
                setWeeklyPlan(newPlan);
                setPlanType("weekly");
                setHasGenerated(true);
                setActiveDayIndex(0);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].GENERATED_PLAN, {
                    planType: "weekly",
                    weeklyPlan: newPlan,
                    monthlyPlan: null,
                    activeDayIndex: 0
                });
            }
        }
    }["useMealPlanner.useCallback[loadSavedPlan]"], []);
    /**
   * Apply day created from favorites (Requirement 2)
   */ const applyFavoriteDayPlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMealPlanner.useCallback[applyFavoriteDayPlan]": (dayPlan)=>{
            if (!weeklyPlan) {
                // Initialize 7-day plan with this favorite day as day 0
                const base = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mealPlannerService"].generateWeeklyPlan(activeProfile, 1);
                base.days[0] = dayPlan;
                setWeeklyPlan(base);
                setPlanType("weekly");
                setHasGenerated(true);
                setActiveDayIndex(0);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].GENERATED_PLAN, {
                    planType: "weekly",
                    weeklyPlan: base,
                    monthlyPlan: null,
                    activeDayIndex: 0
                });
            } else {
                const updatedDays = [
                    ...weeklyPlan.days
                ];
                updatedDays[activeDayIndex] = dayPlan;
                const totalKcal = updatedDays.reduce({
                    "useMealPlanner.useCallback[applyFavoriteDayPlan].totalKcal": (sum, d)=>sum + d.totalCalories
                }["useMealPlanner.useCallback[applyFavoriteDayPlan].totalKcal"], 0);
                const totalProtein = updatedDays.reduce({
                    "useMealPlanner.useCallback[applyFavoriteDayPlan].totalProtein": (sum, d)=>sum + d.totalProtein
                }["useMealPlanner.useCallback[applyFavoriteDayPlan].totalProtein"], 0);
                const totalCost = updatedDays.reduce({
                    "useMealPlanner.useCallback[applyFavoriteDayPlan].totalCost": (sum, d)=>sum + d.estimatedCost
                }["useMealPlanner.useCallback[applyFavoriteDayPlan].totalCost"], 0);
                const updatedPlan = {
                    ...weeklyPlan,
                    days: updatedDays,
                    averageDailyCalories: Math.round(totalKcal / updatedDays.length),
                    averageProtein: Math.round(totalProtein / updatedDays.length),
                    totalEstimatedCost: totalCost,
                    averageDailyCost: Math.round(totalCost / updatedDays.length)
                };
                setWeeklyPlan(updatedPlan);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].GENERATED_PLAN, {
                    planType: "weekly",
                    weeklyPlan: updatedPlan,
                    monthlyPlan: null,
                    activeDayIndex
                });
            }
        }
    }["useMealPlanner.useCallback[applyFavoriteDayPlan]"], [
        weeklyPlan,
        activeDayIndex,
        activeProfile
    ]);
    return {
        hasGenerated,
        planType,
        setPlanType,
        weeklyPlan,
        monthlyPlan,
        activeDay,
        activeDayIndex,
        setActiveDayIndex,
        nutritionSummary,
        isGenerating,
        generationFeedback,
        profileChangedNotice,
        activeProfile,
        isPlanForSomeoneElse,
        setIsPlanForSomeoneElse,
        someoneElseProfile,
        setSomeoneElseProfile,
        budgetLimit,
        setBudgetLimit,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        generateWeekly,
        generateMonthly,
        replaceMeal,
        regenerateSingleDay,
        saveCurrentMealPlan,
        loadSavedPlan,
        applyFavoriteDayPlan
    };
}
_s(useMealPlanner, "2KYzHF4bmXaEnxTsayat7rFpPUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$data$2f$mockMealPlan$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/data/mockMealPlan.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlannerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/services/mealPlannerService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$services$2f$mealPlanApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/services/mealPlanApiService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$hooks$2f$useMealPlanner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/hooks/useMealPlanner.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$DailyMacroSummary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/DailyMacroSummary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$FavoritesModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/FavoritesModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$GenerationSettingsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MealCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/MealCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MealReplacementModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/MealReplacementModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MonthlyCalendarView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$NutritionGoalBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$PlanForSomeoneElseModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$SaveMealPlanModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/services/mealPlanApiService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mealPlanApiService",
    ()=>mealPlanApiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/api/client.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
;
const mealPlanApiService = {
    // API #25: POST /meal-plans/generate/weekly - Sinh thực đơn 7 ngày theo hồ sơ, dị ứng, chế độ chay, ngân sách
    generateWeekly (payload) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/meal-plans/generate/weekly", payload || {});
    },
    // API #26: POST /meal-plans/generate/monthly - Sinh thực đơn cả tháng
    generateMonthly (payload) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/meal-plans/generate/monthly", payload || {});
    },
    // API #27: POST /meal-plans/validate - Kiểm tra bữa user tự chọn từ món yêu thích
    validateMealPlan (payload) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/meal-plans/validate", payload);
    },
    // API #28: POST /meal-plans/generate/for-someone - Lập cho người khác, dùng meal_plan_profile, Premium
    generateForSomeone (payload) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/meal-plans/generate/for-someone", payload);
    },
    // API #29: GET /users/me/meal-plans - Danh sách thực đơn đã lưu
    getMyMealPlans () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/users/me/meal-plans");
    },
    // API #30: GET /users/me/meal-plans/:id - Chi tiết kèm ngày, bữa, món
    getMyMealPlanDetail (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/users/me/meal-plans/${id}`);
    },
    // API #31: POST /users/me/meal-plans - Lưu thực đơn
    saveMealPlan (payload) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/users/me/meal-plans", payload);
    },
    // API #32: PATCH /users/me/meal-plans/:id - Đổi tên, đặt đang áp dụng
    updateMyMealPlan (id, payload) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/users/me/meal-plans/${id}`, payload);
    },
    // API #33: DELETE /users/me/meal-plans/:id - Xoá thực đơn
    deleteMyMealPlan (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/users/me/meal-plans/${id}`);
    },
    // API #34: PATCH /users/me/meal-plans/:id/days/:dayId/slots/:slotId - Đổi món trong một bữa
    updateMealSlot (planId, dayId, slotId, payload) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/users/me/meal-plans/${planId}/days/${dayId}/slots/${slotId}`, payload);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/services/mealPlannerService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DAYS_OF_WEEK",
    ()=>DAYS_OF_WEEK,
    "getCurrentWeekDates",
    ()=>getCurrentWeekDates,
    "mealPlannerService",
    ()=>mealPlannerService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/services/profileService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$calorieCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/utils/calorieCalculator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/recipeService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$utils$2f$checkRecipeAllergy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/allergy/utils/checkRecipeAllergy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/priceService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$utils$2f$recipeMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/utils/recipeMapper.ts [app-client] (ecmascript)");
;
;
;
;
;
;
function getCurrentWeekDates(refDate = new Date()) {
    const d = new Date(refDate);
    const dayOfWeek = d.getDay(); // 0 is Sunday, 1 is Monday ...
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    const monday = new Date(d);
    monday.setDate(d.getDate() + diffToMonday);
    const dayNames = [
        {
            day: "Monday",
            short: "Mon"
        },
        {
            day: "Tuesday",
            short: "Tue"
        },
        {
            day: "Wednesday",
            short: "Wed"
        },
        {
            day: "Thursday",
            short: "Thu"
        },
        {
            day: "Friday",
            short: "Fri"
        },
        {
            day: "Saturday",
            short: "Sat"
        },
        {
            day: "Sunday",
            short: "Sun"
        }
    ];
    const monthShort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    return dayNames.map((item, idx)=>{
        const cur = new Date(monday);
        cur.setDate(monday.getDate() + idx);
        return {
            day: item.day,
            short: item.short,
            date: `${monthShort[cur.getMonth()]} ${cur.getDate()}`
        };
    });
}
const DAYS_OF_WEEK = getCurrentWeekDates();
const mealPlannerService = {
    /**
   * Recalculates nutritional totals, remaining calories, and cost for a single day plan
   */ recalculateDay (day, targetCalories, userId) {
        const totalCalories = Math.round(day.breakfast.recipe.calories + day.lunch.recipe.calories + day.dinner.recipe.calories + day.snack.recipe.calories);
        const totalProtein = Math.round((day.breakfast.recipe.protein + day.lunch.recipe.protein + day.dinner.recipe.protein + day.snack.recipe.protein) * 10) / 10;
        const totalCarbs = Math.round((day.breakfast.recipe.carbs + day.lunch.recipe.carbs + day.dinner.recipe.carbs + day.snack.recipe.carbs) * 10) / 10;
        const totalFat = Math.round((day.breakfast.recipe.fat + day.lunch.recipe.fat + day.dinner.recipe.fat + day.snack.recipe.fat) * 10) / 10;
        const costBreakfast = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(day.breakfast.recipe, userId).price;
        const costLunch = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(day.lunch.recipe, userId).price;
        const costDinner = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(day.dinner.recipe, userId).price;
        const costSnack = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(day.snack.recipe, userId).price;
        const estimatedCost = costBreakfast + costLunch + costDinner + costSnack;
        return {
            ...day,
            totalCalories,
            totalProtein,
            totalCarbs,
            totalFat,
            targetCalories,
            remainingCalories: Math.max(0, targetCalories - totalCalories),
            estimatedCost
        };
    },
    /**
   * Cân bằng calo trong ngày để bám sát mục tiêu:
   * Đảm bảo tổng calo không vượt quá mục tiêu >150 kcal và không thiếu quá 100 kcal
   */ calibrateDayCalories (day, targetKcal) {
        const rawTotal = day.breakfast.recipe.calories + day.lunch.recipe.calories + day.dinner.recipe.calories + day.snack.recipe.calories;
        const diff = rawTotal - targetKcal;
        // Nếu tổng calo lệch quá +150 kcal hoặc thiếu quá 100 kcal:
        if (rawTotal > 0 && (diff > 150 || diff < -100)) {
            const ratio = targetKcal / rawTotal;
            const scaleR = (r)=>{
                const scaledIngredients = (r.ingredients || []).map((ing)=>({
                        ...ing,
                        quantity: typeof ing.quantity === "number" ? Math.round(ing.quantity * ratio * 10) / 10 : ing.quantity
                    }));
                return {
                    ...r,
                    calories: Math.round(r.calories * ratio),
                    serving: 1,
                    protein: Math.round(r.protein * ratio * 10) / 10,
                    carbs: Math.round(r.carbs * ratio * 10) / 10,
                    fat: Math.round(r.fat * ratio * 10) / 10,
                    ingredients: scaledIngredients
                };
            };
            return {
                ...day,
                breakfast: {
                    ...day.breakfast,
                    recipe: scaleR(day.breakfast.recipe)
                },
                lunch: {
                    ...day.lunch,
                    recipe: scaleR(day.lunch.recipe)
                },
                dinner: {
                    ...day.dinner,
                    recipe: scaleR(day.dinner.recipe)
                },
                snack: {
                    ...day.snack,
                    recipe: scaleR(day.snack.recipe)
                }
            };
        }
        return day;
    },
    /**
   * Generates a single day plan based on the user's Profile, BMI status, calorie target,
   * vegetarian diet, and strictly excluding any allergy conflicts (Requirements 4, 5, 6, 7).
   */ generateDayPlan (dayInfo, profile, dayIndex = 0, seed = 0, options) {
        const nutrition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$calorieCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDailyCalorieTarget"])(profile);
        const targetCalories = nutrition.dailyCalorieTarget;
        const { mealTargets } = nutrition;
        const userId = String(profile.id || "");
        // Fetch safe recipes for each meal type strictly avoiding allergies
        const breakfastCandidates = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecommendations(profile, mealTargets.breakfast, "breakfast");
        const lunchCandidates = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecommendations(profile, mealTargets.lunch, "lunch");
        const dinnerCandidates = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecommendations(profile, mealTargets.dinner, "dinner");
        const snackCandidates = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecommendations(profile, mealTargets.snack, "snack");
        const scaleRecipeToCalories = (raw, targetKcal)=>{
            const baseKcal = Number(raw.calories) || 150;
            const maxPortion = baseKcal < 200 ? 3.0 : baseKcal < 350 ? 2.5 : 1.8;
            const portion = Math.round(Math.min(maxPortion, Math.max(0.4, targetKcal / baseKcal)) * 10) / 10;
            const scaledIngredients = (raw.ingredients || []).map((ing)=>({
                    ...ing,
                    quantity: typeof ing.quantity === "number" ? Math.round(ing.quantity * portion * 10) / 10 : ing.quantity
                }));
            return {
                ...raw,
                calories: Math.round(baseKcal * portion),
                serving: 1,
                protein: Math.round((Number(raw.protein) || 0) * portion * 10) / 10,
                carbs: Math.round((Number(raw.carbs) || 0) * portion * 10) / 10,
                fat: Math.round((Number(raw.fat) || 0) * portion * 10) / 10,
                ingredients: scaledIngredients
            };
        };
        // Pick distinct recipes using offset without allergen violations, bám sát calo mục tiêu
        const pickRecipe = (candidates, targetKcal, index, preferredFavIds)=>{
            // 1. If user chose favorites, give them precedence and rotate across days
            if (preferredFavIds && preferredFavIds.length > 0) {
                const matchingFavs = candidates.filter((r)=>preferredFavIds.includes(r.id));
                if (matchingFavs.length > 0) {
                    const chosen = matchingFavs[(index + seed) % matchingFavs.length];
                    return scaleRecipeToCalories(chosen, targetKcal);
                }
            }
            // Filter out any recipe with user allergies
            const safe = candidates.filter((r)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$utils$2f$checkRecipeAllergy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkAllergies"])(r, profile).hasAllergy);
            let pool = safe.length > 0 ? safe : candidates;
            // Budget sorting if budget limit exists (Requirement 24)
            if (options?.budgetLimit && options.budgetLimit > 0) {
                pool = [
                    ...pool
                ].sort((a, b)=>{
                    const costA = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(a, userId).price;
                    const costB = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getEffectivePrice(b, userId).price;
                    return costA - costB;
                });
            }
            if (!pool.length) {
                const allSafe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecipes().filter((r)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$utils$2f$checkRecipeAllergy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkAllergies"])(r, profile).hasAllergy);
                const fallback = allSafe[0] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecipes()[0];
                return scaleRecipeToCalories(fallback, targetKcal);
            }
            // Sắp xếp theo mức độ gần với targetKcal để chọn món cung cấp đủ năng lượng
            const sortedByCal = [
                ...pool
            ].sort((a, b)=>Math.abs(a.calories - targetKcal) - Math.abs(b.calories - targetKcal));
            // Luân chuyển trong top 6 món gần nhất để đảm bảo đa dạng nhưng vẫn bám sát calo
            const topPool = sortedByCal.slice(0, Math.min(6, sortedByCal.length));
            const chosen = topPool[(index + seed) % topPool.length];
            return scaleRecipeToCalories(chosen, targetKcal);
        };
        const breakfastRecipe = pickRecipe(breakfastCandidates, mealTargets.breakfast, dayIndex, options?.favoriteRecipeIds);
        const lunchRecipe = pickRecipe(lunchCandidates, mealTargets.lunch, dayIndex, options?.favoriteRecipeIds);
        const dinnerRecipe = pickRecipe(dinnerCandidates, mealTargets.dinner, dayIndex, options?.favoriteRecipeIds);
        const snackRecipe = pickRecipe(snackCandidates, mealTargets.snack, dayIndex, options?.favoriteRecipeIds);
        const breakfastSlot = {
            recipe: breakfastRecipe,
            time: `${breakfastRecipe.prepTime + breakfastRecipe.cookTime} min`
        };
        const lunchSlot = {
            recipe: lunchRecipe,
            time: `${lunchRecipe.prepTime + lunchRecipe.cookTime} min`
        };
        const dinnerSlot = {
            recipe: dinnerRecipe,
            time: `${dinnerRecipe.prepTime + dinnerRecipe.cookTime} min`
        };
        const snackSlot = {
            recipe: snackRecipe,
            time: `${snackRecipe.prepTime + snackRecipe.cookTime} min`
        };
        const baseDay = {
            dayName: dayInfo.day,
            shortDay: dayInfo.short,
            dateText: dayInfo.date,
            breakfast: breakfastSlot,
            lunch: lunchSlot,
            dinner: dinnerSlot,
            snack: snackSlot,
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0,
            targetCalories,
            remainingCalories: 0,
            estimatedCost: 0
        };
        const calibratedDay = this.calibrateDayCalories(baseDay, targetCalories);
        return this.recalculateDay(calibratedDay, targetCalories, userId);
    },
    /**
   * Generates the entire 7-day weekly meal plan based on Profile (Requirement 4, 19)
   */ generateWeeklyPlan (profile, seed = 0, options, refDate = new Date()) {
        const activeProfile = profile ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].getProfile();
        const weekDays = getCurrentWeekDates(refDate);
        const days = weekDays.map((dayInfo, idx)=>this.generateDayPlan(dayInfo, activeProfile, idx, seed, options));
        const totalKcal = days.reduce((sum, d)=>sum + d.totalCalories, 0);
        const totalProtein = days.reduce((sum, d)=>sum + d.totalProtein, 0);
        const totalCost = days.reduce((sum, d)=>sum + d.estimatedCost, 0);
        return {
            days,
            averageDailyCalories: Math.round(totalKcal / days.length),
            averageProtein: Math.round(totalProtein / days.length),
            targetCalories: days[0]?.targetCalories || 2492,
            totalEstimatedCost: totalCost,
            averageDailyCost: Math.round(totalCost / days.length),
            budgetLimit: options?.budgetLimit
        };
    },
    /**
   * Generates Monthly Meal Plan for a full calendar month (Requirement 20, 21)
   */ generateMonthlyPlan (profile, year = new Date().getFullYear(), month = new Date().getMonth(), seed = 0, options) {
        const activeProfile = profile ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].getProfile();
        const nutrition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$calorieCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDailyCalorieTarget"])(activeProfile);
        const targetCalories = nutrition.dailyCalorieTarget;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const monthName = `${monthNames[month]} ${year}`;
        const days = [];
        for(let dayNum = 1; dayNum <= daysInMonth; dayNum++){
            const dateObj = new Date(year, month, dayNum);
            const dayOfWeekIdx = dateObj.getDay(); // 0 is Sun, 1 is Mon...
            const dayNames = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            const shortDays = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ];
            const dayName = dayNames[dayOfWeekIdx];
            const shortDay = shortDays[dayOfWeekIdx];
            const dateText = `${monthNames[month].substring(0, 3)} ${dayNum}`;
            // Rotates recipes smoothly across the month without repeating identical consecutive meals
            const dayPlan = this.generateDayPlan({
                day: dayName,
                short: shortDay,
                date: dateText
            }, activeProfile, dayNum - 1, seed + Math.floor((dayNum - 1) / 7) * 3, options);
            const calendarDay = {
                ...dayPlan,
                dayOfMonth: dayNum,
                month,
                year,
                dateKey: `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`,
                isCurrentMonth: true
            };
            days.push(calendarDay);
        }
        const totalKcal = days.reduce((sum, d)=>sum + d.totalCalories, 0);
        const totalCost = days.reduce((sum, d)=>sum + d.estimatedCost, 0);
        return {
            month,
            year,
            monthName,
            days,
            totalEstimatedCost: totalCost,
            averageDailyCalories: Math.round(totalKcal / days.length),
            averageDailyCost: Math.round(totalCost / days.length),
            targetCalories,
            budgetLimit: options?.budgetLimit
        };
    },
    /**
   * Creates a meal plan from user-selected favorites with validation (Requirement 2)
   */ validateAndCreateFromFavorites (selectedRecipes, profile) {
        const nutrition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$calorieCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDailyCalorieTarget"])(profile);
        const targetCalories = nutrition.dailyCalorieTarget;
        // Fill any missing meal slots with safe recommended recipes
        const breakfast = selectedRecipes.breakfast || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecommendations(profile, nutrition.mealTargets.breakfast, "breakfast")[0] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecipes()[0];
        const lunch = selectedRecipes.lunch || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecommendations(profile, nutrition.mealTargets.lunch, "lunch")[0] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecipes()[0];
        const dinner = selectedRecipes.dinner || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecommendations(profile, nutrition.mealTargets.dinner, "dinner")[0] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecipes()[0];
        const snack = selectedRecipes.snack || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecommendations(profile, nutrition.mealTargets.snack, "snack")[0] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecipes()[0];
        const rawDay = {
            dayName: "Selected Day",
            shortDay: "Fav",
            dateText: "Favorite Plan",
            breakfast: {
                recipe: breakfast,
                time: `${breakfast.prepTime + breakfast.cookTime} min`
            },
            lunch: {
                recipe: lunch,
                time: `${lunch.prepTime + lunch.cookTime} min`
            },
            dinner: {
                recipe: dinner,
                time: `${dinner.prepTime + dinner.cookTime} min`
            },
            snack: {
                recipe: snack,
                time: `${snack.prepTime + snack.cookTime} min`
            },
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0,
            targetCalories,
            remainingCalories: 0,
            estimatedCost: 0
        };
        const calculatedDay = this.recalculateDay(rawDay, targetCalories, String(profile.id || ""));
        const warnings = [];
        // Check allergy violations
        const allSelected = [
            breakfast,
            lunch,
            dinner,
            snack
        ];
        for (const r of allSelected){
            const allergy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$utils$2f$checkRecipeAllergy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkAllergies"])(r, profile);
            if (allergy.hasAllergy) {
                warnings.push(`"${r.title}" contains your allergen (${allergy.allergens.join(", ")}).`);
            }
        }
        // Check diet compatibility
        for (const r of allSelected){
            if (profile.vegetarianType && !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].isDietCompatible(r.vegetarianType, profile.vegetarianType)) {
                warnings.push(`"${r.title}" is ${r.vegetarianType} which is not compatible with your ${profile.vegetarianType} diet.`);
            }
        }
        // Check calorie tolerance (within ±15% of target)
        const calDiff = Math.abs(calculatedDay.totalCalories - targetCalories);
        const tolerance = targetCalories * 0.15;
        if (calDiff > tolerance) {
            warnings.push(`Total calories (${calculatedDay.totalCalories} kcal) differs from your target (${targetCalories} kcal) by ${calDiff} kcal.`);
        }
        const isCompatible = warnings.length === 0;
        return {
            isCompatible,
            warnings,
            dayPlan: calculatedDay
        };
    },
    /**
   * Chuyển đổi dữ liệu Meal Plan từ backend NestJS sang định dạng WeeklyMealPlan của frontend
   */ convertBackendWeeklyPlan (data, profile) {
        const plan = data?.data || data;
        const weeklyPlans = plan?.weekly_plans || [];
        const dailyMeals = weeklyPlans[0]?.daily_meals || [];
        const dateMap = new Map();
        const allApproved = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecipes();
        for (const dm of dailyMeals){
            const rawDate = typeof dm.meal_date === "string" ? dm.meal_date.split("T")[0] : String(dm.meal_date);
            if (!dateMap.has(rawDate)) {
                dateMap.set(rawDate, {});
            }
            const slots = dateMap.get(rawDate);
            const rawItem = dm.meal_items?.[0];
            const rawRecipe = rawItem?.recipe;
            const portion = Number(rawItem?.portion_multiplier) || 1;
            if (rawRecipe) {
                let frontendRecipe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$utils$2f$recipeMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBackendToFrontendRecipe"])(rawRecipe);
                if (frontendRecipe.calories === 350) {
                    const fromCache = allApproved.find((r)=>String(r.id) === String(rawRecipe.recipe_id));
                    if (fromCache && fromCache.calories !== 350) {
                        frontendRecipe = {
                            ...frontendRecipe,
                            calories: fromCache.calories,
                            protein: fromCache.protein,
                            carbs: fromCache.carbs,
                            fat: fromCache.fat,
                            fiber: fromCache.fiber
                        };
                    }
                }
                if (portion && portion !== 1) {
                    const scaledIngredients = (frontendRecipe.ingredients || []).map((ing)=>({
                            ...ing,
                            quantity: typeof ing.quantity === "number" ? Math.round(ing.quantity * portion * 10) / 10 : ing.quantity
                        }));
                    frontendRecipe = {
                        ...frontendRecipe,
                        calories: Math.round(frontendRecipe.calories * portion),
                        serving: 1,
                        protein: Math.round(frontendRecipe.protein * portion * 10) / 10,
                        carbs: Math.round(frontendRecipe.carbs * portion * 10) / 10,
                        fat: Math.round(frontendRecipe.fat * portion * 10) / 10,
                        ingredients: scaledIngredients
                    };
                }
                slots[dm.meal_type] = frontendRecipe;
            }
        }
        const currentWeekDates = getCurrentWeekDates();
        const dayDates = Array.from(dateMap.keys()).sort();
        const snackCandidates = allApproved.filter((r)=>r.mealType === "snack");
        const days = currentWeekDates.map((dayInfo, idx)=>{
            const dateKey = dayDates[idx] || dayDates[0];
            const slots = (dateKey ? dateMap.get(dateKey) : null) || {};
            const breakfast = slots.breakfast || allApproved.find((r)=>r.mealType === "breakfast") || allApproved[0];
            const lunch = slots.lunch || allApproved.find((r)=>r.mealType === "lunch") || allApproved[1 % allApproved.length];
            const dinner = slots.dinner || allApproved.find((r)=>r.mealType === "dinner") || allApproved[2 % allApproved.length];
            const snack = slots.snack || (snackCandidates.length > 0 ? snackCandidates[idx % snackCandidates.length] : allApproved[idx % allApproved.length]);
            const baseDay = {
                dayName: dayInfo.day,
                shortDay: dayInfo.short,
                dateText: dayInfo.date,
                breakfast: {
                    recipe: breakfast,
                    time: `${breakfast.prepTime + breakfast.cookTime} min`
                },
                lunch: {
                    recipe: lunch,
                    time: `${lunch.prepTime + lunch.cookTime} min`
                },
                dinner: {
                    recipe: dinner,
                    time: `${dinner.prepTime + dinner.cookTime} min`
                },
                snack: {
                    recipe: snack,
                    time: `${snack.prepTime + snack.cookTime} min`
                },
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFat: 0,
                targetCalories: plan.target_calories_per_day || 2000,
                remainingCalories: 0,
                estimatedCost: 0
            };
            const calibratedDay = this.calibrateDayCalories(baseDay, plan.target_calories_per_day || 2000);
            return this.recalculateDay(calibratedDay, plan.target_calories_per_day || 2000, String(profile.id || ""));
        });
        const totalKcal = days.reduce((sum, d)=>sum + d.totalCalories, 0);
        const totalProt = days.reduce((sum, d)=>sum + d.totalProtein, 0);
        const totalCost = days.reduce((sum, d)=>sum + d.estimatedCost, 0);
        return {
            days,
            averageDailyCalories: Math.round(totalKcal / days.length),
            averageProtein: Math.round(totalProt / days.length),
            targetCalories: plan.target_calories_per_day || 2000,
            totalEstimatedCost: totalCost,
            averageDailyCost: Math.round(totalCost / days.length),
            budgetLimit: plan.has_budget && plan.total_budget ? Number(plan.total_budget) : undefined
        };
    },
    /**
   * Chuyển đổi dữ liệu Monthly Meal Plan từ backend NestJS sang định dạng MonthlyMealPlan của frontend
   */ convertBackendMonthlyPlan (data, profile, year, month) {
        const plan = data?.data || data;
        const weeklyPlans = plan?.weekly_plans || [];
        const allApproved = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecipes();
        const allDailyMeals = [];
        for (const wp of weeklyPlans){
            if (Array.isArray(wp.daily_meals)) {
                allDailyMeals.push(...wp.daily_meals);
            }
        }
        const dateMap = new Map();
        for (const dm of allDailyMeals){
            const rawDate = typeof dm.meal_date === "string" ? dm.meal_date.split("T")[0] : String(dm.meal_date);
            if (!dateMap.has(rawDate)) {
                dateMap.set(rawDate, {});
            }
            const slots = dateMap.get(rawDate);
            const rawItem = dm.meal_items?.[0];
            const rawRecipe = rawItem?.recipe;
            const portion = Number(rawItem?.portion_multiplier) || 1;
            if (rawRecipe) {
                let frontendRecipe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$utils$2f$recipeMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBackendToFrontendRecipe"])(rawRecipe);
                if (frontendRecipe.calories === 350) {
                    const fromCache = allApproved.find((r)=>String(r.id) === String(rawRecipe.recipe_id));
                    if (fromCache && fromCache.calories !== 350) {
                        frontendRecipe = {
                            ...frontendRecipe,
                            calories: fromCache.calories,
                            protein: fromCache.protein,
                            carbs: fromCache.carbs,
                            fat: fromCache.fat,
                            fiber: fromCache.fiber
                        };
                    }
                }
                if (portion && portion !== 1) {
                    const scaledIngredients = (frontendRecipe.ingredients || []).map((ing)=>({
                            ...ing,
                            quantity: typeof ing.quantity === "number" ? Math.round(ing.quantity * portion * 10) / 10 : ing.quantity
                        }));
                    frontendRecipe = {
                        ...frontendRecipe,
                        calories: Math.round(frontendRecipe.calories * portion),
                        serving: 1,
                        protein: Math.round(frontendRecipe.protein * portion * 10) / 10,
                        carbs: Math.round(frontendRecipe.carbs * portion * 10) / 10,
                        fat: Math.round(frontendRecipe.fat * portion * 10) / 10,
                        ingredients: scaledIngredients
                    };
                }
                slots[dm.meal_type] = frontendRecipe;
            }
        }
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const monthShort = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        const dayNames = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        const dayShorts = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ];
        const calendarDays = [];
        const targetCalories = plan.target_calories_per_day || 2000;
        for(let d = 1; d <= daysInMonth; d++){
            const curDate = new Date(year, month, d);
            const dayOfWeek = curDate.getDay();
            const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
            const slots = dateMap.get(dateKey) || {};
            const breakfast = slots.breakfast || allApproved[d % allApproved.length] || allApproved[0];
            const lunch = slots.lunch || allApproved[(d + 1) % allApproved.length] || allApproved[0];
            const dinner = slots.dinner || allApproved[(d + 2) % allApproved.length] || allApproved[0];
            const snack = slots.snack || allApproved[(d + 3) % allApproved.length] || allApproved[0];
            const baseDay = {
                dayName: dayNames[dayOfWeek],
                shortDay: dayShorts[dayOfWeek],
                dateText: `${monthShort[month]} ${d}`,
                breakfast: {
                    recipe: breakfast,
                    time: `${breakfast.prepTime + breakfast.cookTime} min`
                },
                lunch: {
                    recipe: lunch,
                    time: `${lunch.prepTime + lunch.cookTime} min`
                },
                dinner: {
                    recipe: dinner,
                    time: `${dinner.prepTime + dinner.cookTime} min`
                },
                snack: {
                    recipe: snack,
                    time: `${snack.prepTime + snack.cookTime} min`
                },
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFat: 0,
                targetCalories,
                remainingCalories: 0,
                estimatedCost: 0
            };
            const calibratedDay = this.calibrateDayCalories(baseDay, targetCalories);
            const calculated = this.recalculateDay(calibratedDay, targetCalories, String(profile.id || ""));
            calendarDays.push({
                ...calculated,
                dayOfMonth: d,
                month,
                year,
                dateKey,
                isCurrentMonth: true
            });
        }
        const totalKcal = calendarDays.reduce((sum, d)=>sum + d.totalCalories, 0);
        const totalCost = calendarDays.reduce((sum, d)=>sum + d.estimatedCost, 0);
        return {
            month,
            year,
            monthName: `${monthNames[month]} ${year}`,
            days: calendarDays,
            totalEstimatedCost: totalCost,
            averageDailyCalories: Math.round(totalKcal / calendarDays.length),
            averageDailyCost: Math.round(totalCost / calendarDays.length),
            targetCalories,
            budgetLimit: plan.has_budget && plan.total_budget ? Number(plan.total_budget) : undefined
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/services/userIngredientService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "userIngredientService",
    ()=>userIngredientService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage/storage.ts [app-client] (ecmascript)");
;
;
const LOCAL_PANTRY_KEY = "user_pantry_ingredients";
const userIngredientService = {
    /**
   * Lấy danh sách nguyên liệu chuẩn hệ thống
   * GET /ingredients
   */ async getSystemIngredients () {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/ingredients");
            if (Array.isArray(res) && res.length > 0) return res;
        } catch (err) {
            console.warn("[userIngredientService] Không thể lấy danh sách nguyên liệu hệ thống:", err);
        }
        return [];
    },
    /**
   * Lấy danh sách nguyên liệu trong tủ lạnh của người dùng
   * GET /users/me/ingredients
   */ async getMyIngredients () {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/users/me/ingredients");
            if (Array.isArray(res)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(LOCAL_PANTRY_KEY, res);
                return res;
            }
        } catch (err) {
            console.warn("[userIngredientService] Lỗi khi tải tủ lạnh từ server, dùng cache:", err);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(LOCAL_PANTRY_KEY, []);
    },
    /**
   * Thêm nguyên liệu vào tủ lạnh
   * POST /users/me/ingredients
   */ async addIngredient (payload) {
        try {
            const created = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/users/me/ingredients", {
                ...payload,
                source: "MANUAL"
            });
            if (created?.user_ingredient_id) {
                const current = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(LOCAL_PANTRY_KEY, []);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(LOCAL_PANTRY_KEY, [
                    created,
                    ...current
                ]);
                return created;
            }
        } catch (err) {
            console.warn("[userIngredientService] Lỗi khi thêm vào server, lưu cục bộ:", err);
        }
        const localItem = {
            user_ingredient_id: Date.now(),
            ingredient_id: payload.ingredient_id,
            quantity: payload.quantity || 100,
            unit: payload.unit || "g",
            expiry_date: payload.expiry_date,
            freshness_status: payload.freshness_status || "fresh"
        };
        const current = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(LOCAL_PANTRY_KEY, []);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(LOCAL_PANTRY_KEY, [
            localItem,
            ...current
        ]);
        return localItem;
    },
    /**
   * Xóa nguyên liệu khỏi tủ lạnh
   * DELETE /users/me/ingredients/:id
   */ async removeIngredient (userIngredientId) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/users/me/ingredients/${userIngredientId}`);
        } catch (err) {
            console.warn("[userIngredientService] Lỗi khi xóa trên server:", err);
        }
        const current = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(LOCAL_PANTRY_KEY, []);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(LOCAL_PANTRY_KEY, current.filter((item)=>item.user_ingredient_id !== userIngredientId));
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/meal-planner/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
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
"[project]/src/features/nutrition/components/CalorieExplanationSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CalorieExplanationSection",
    ()=>CalorieExplanationSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.mjs [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calculator.mjs [app-client] (ecmascript) <export default as Calculator>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.mjs [app-client] (ecmascript) <export default as Target>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CalorieExplanationSection({ explanation, targetGoal, targetCalories }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasExplanation = explanation && explanation.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            targetGoal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-5 shadow-sm border border-emerald-700/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-3 border-b border-emerald-700/60 pb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                            lineNumber: 30,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 29,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold uppercase tracking-wider text-emerald-300",
                                                children: "MỤC TIÊU CÂN NẶNG & TIẾN ĐỘ"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                                lineNumber: 33,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-base font-bold text-white",
                                                children: [
                                                    "Đạt ",
                                                    targetGoal.target_weight_kg,
                                                    " kg vào ngày ",
                                                    targetGoal.target_date
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                                lineNumber: 36,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 32,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-800/80 border border-emerald-600 text-emerald-200",
                                children: [
                                    "BMI dự kiến: ",
                                    targetGoal.target_bmi
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2.5 rounded-xl bg-white/10 backdrop-blur-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-emerald-200 block",
                                        children: "Mức thay đổi"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-bold text-amber-300",
                                        children: [
                                            targetGoal.change_kg > 0 ? `+${targetGoal.change_kg}` : targetGoal.change_kg,
                                            " kg"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2.5 rounded-xl bg-white/10 backdrop-blur-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-emerald-200 block",
                                        children: "Thời gian còn lại"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-bold text-white",
                                        children: [
                                            targetGoal.weeks_left,
                                            " tuần"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2.5 rounded-xl bg-white/10 backdrop-blur-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-emerald-200 block",
                                        children: "Tốc độ điều chỉnh"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-bold text-white",
                                        children: [
                                            targetGoal.weekly_change_kg,
                                            " kg/tuần"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2.5 rounded-xl bg-white/10 backdrop-blur-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-emerald-200 block",
                                        children: "Calo khuyến nghị"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-bold text-emerald-300",
                                        children: targetCalories ? `${targetCalories.toLocaleString()} kcal` : "Theo mục tiêu"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this),
            hasExplanation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setIsOpen(!isOpen),
                        className: "w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                            lineNumber: 88,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-xs font-bold uppercase tracking-wider text-stone-800",
                                                children: "Minh bạch công thức tính Kcal"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-stone-500",
                                                children: [
                                                    "Xem chi tiết ",
                                                    explanation.length,
                                                    " bước tính toán năng lượng chuẩn y khoa"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                                lineNumber: 94,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs font-semibold text-emerald-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: isOpen ? "Thu gọn" : "Xem chi tiết"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this),
                                    isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 102,
                                        columnNumber: 25
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 102,
                                        columnNumber: 61
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 pt-1 border-t border-stone-100 space-y-3 bg-stone-50/40",
                        children: explanation.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-bold text-emerald-900 flex items-center gap-2 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0",
                                                        children: index + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sm:whitespace-normal",
                                                        children: item.step
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                                lineNumber: 114,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md shrink-0 whitespace-nowrap",
                                                children: [
                                                    typeof item.result === "number" ? item.result.toLocaleString() : item.result,
                                                    " ",
                                                    item.unit
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                                lineNumber: 120,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 113,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-mono text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-100",
                                        children: item.formula
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 125,
                                        columnNumber: 19
                                    }, this),
                                    item.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-stone-500 italic",
                                        children: [
                                            "Lưu ý: ",
                                            item.note
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                        lineNumber: 130,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, item.step || index, true, {
                                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                                lineNumber: 109,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                        lineNumber: 107,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/nutrition/components/CalorieExplanationSection.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(CalorieExplanationSection, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c = CalorieExplanationSection;
var _c;
__turbopack_context__.k.register(_c, "CalorieExplanationSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/nutrition/components/NutritionWarnings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NutritionWarnings",
    ()=>NutritionWarnings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
"use client";
;
;
const WARNING_TITLE_MAP = {
    BMI_GOAL_CONFLICT: "Xung đột mục tiêu & BMI",
    CALORIE_FLOOR_APPLIED: "Áp dụng sàn calo an toàn",
    TARGET_PACE_TOO_FAST: "Tốc độ thay đổi cân nặng quá nhanh",
    TARGET_GOAL_MISMATCH: "Mục tiêu không khớp chỉ số",
    TARGET_BMI_UNDERWEIGHT: "Cân nặng mục tiêu ở mức thiếu cân",
    TARGET_DATE_PASSED: "Thời hạn mục tiêu đã qua"
};
function NutritionWarnings({ warnings, className = "", title = "Cảnh báo & Lưu ý dinh dưỡng" }) {
    if (!warnings || warnings.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/90 to-orange-50/80 p-4 sm:p-5 shadow-xs space-y-3 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-amber-900 font-bold text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        className: "w-4 h-4 text-amber-600 shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900 ml-auto",
                        children: [
                            warnings.length,
                            " lưu ý"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: warnings.map((w, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-amber-200/60 text-xs text-amber-950 shadow-2xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                className: "w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-amber-900 mr-1.5",
                                        children: [
                                            "[",
                                            WARNING_TITLE_MAP[w.code] || w.code,
                                            "]:"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "leading-relaxed",
                                        children: w.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this)
                        ]
                    }, `${w.code}-${index}`, true, {
                        fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] text-amber-700/80 italic pt-1",
                children: "* Đây là khuyến nghị an toàn sức khỏe từ chuyên gia dinh dưỡng và không chặn bạn tiếp tục tạo thực đơn."
            }, void 0, false, {
                fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/nutrition/components/NutritionWarnings.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = NutritionWarnings;
var _c;
__turbopack_context__.k.register(_c, "NutritionWarnings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/nutrition/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$services$2f$nutritionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/services/nutritionService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$bmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/utils/bmi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$calorieCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/utils/calorieCalculator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$components$2f$NutritionWarnings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/components/NutritionWarnings.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$components$2f$CalorieExplanationSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/components/CalorieExplanationSection.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/nutrition/services/nutritionService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nutritionService",
    ()=>nutritionService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/services/profileService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$bmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/utils/bmi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$calorieCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/utils/calorieCalculator.ts [app-client] (ecmascript)");
;
;
;
;
const nutritionService = {
    /**
   * Lấy tóm tắt dinh dưỡng từ backend (Mifflin-St Jeor, BMR, TDEE, Calo mục tiêu, Macro, Calo từng bữa)
   * GET /users/me/nutrition-summary
   */ async getServerNutritionSummary () {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/users/me/nutrition-summary");
    },
    /**
   * Tính toán dinh dưỡng client-side (cho live preview hoặc khi offline)
   */ getNutritionSummary (profile) {
        const activeProfile = profile ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].getProfile();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$calorieCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDailyNutrition"])(activeProfile);
    },
    /**
   * Tính toán BMI client-side
   */ getBMISummary (profile) {
        const activeProfile = profile ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].getProfile();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$bmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateBMI"])(activeProfile.weight, activeProfile.height);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/nutrition/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/nutrition/utils/bmi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateBMI",
    ()=>calculateBMI,
    "getBMIStatus",
    ()=>getBMIStatus
]);
function getBMIStatus(bmi) {
    if (bmi < 18.5) {
        return "Underweight";
    }
    if (bmi < 25) {
        return "Balanced";
    }
    return "Overweight";
}
function calculateBMI(profileOrWeight, explicitHeightCm) {
    let weightKg = 0;
    let heightCm = 0;
    if (typeof profileOrWeight === "object" && profileOrWeight !== null) {
        weightKg = Number(profileOrWeight.weight) || 0;
        heightCm = Number(profileOrWeight.height) || 0;
    } else {
        weightKg = Number(profileOrWeight) || 0;
        heightCm = Number(explicitHeightCm) || 0;
    }
    // If profile is incomplete (missing height or weight), do not calculate
    if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
        return null;
    }
    const heightM = heightCm / 100;
    const rawBmi = weightKg / (heightM * heightM);
    const roundedBmi = Math.round(rawBmi * 10) / 10;
    // Calculate healthy weight range (BMI 18.5 - 24.9)
    const minHealthyWeight = Math.round(18.5 * heightM * heightM * 10) / 10;
    const maxHealthyWeight = Math.round(24.9 * heightM * heightM * 10) / 10;
    const status = getBMIStatus(roundedBmi);
    let colorClass;
    let badgeVariant;
    let description;
    switch(status){
        case "Underweight":
            colorClass = "text-amber-500";
            badgeVariant = "warning";
            description = "Chỉ số BMI cho thấy bạn đang nhẹ cân (< 18.5). Hãy tập trung tăng cân lành mạnh với các loại thực phẩm thực vật giàu dinh dưỡng và chất béo tốt.";
            break;
        case "Balanced":
            colorClass = "text-emerald-400";
            badgeVariant = "success";
            description = "Chỉ số BMI của bạn ở mức cân đối (18.5 - 24.9). Hãy duy trì mức năng lượng hiện tại với chế độ dinh dưỡng thuần chay cân bằng.";
            break;
        case "Overweight":
        default:
            colorClass = "text-amber-400";
            badgeVariant = "warning";
            description = "Chỉ số BMI cho thấy bạn đang thừa cân (>= 25). Khuyến nghị thâm hụt calo vừa phải kết hợp ưu tiên đạm thực vật và chất xơ.";
            break;
    }
    return {
        bmi: roundedBmi,
        formattedBMI: roundedBmi.toFixed(1),
        category: status,
        status,
        colorClass,
        badgeVariant,
        healthyWeightRange: {
            min: minHealthyWeight,
            max: maxHealthyWeight
        },
        description
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/nutrition/utils/calorieCalculator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateBMR",
    ()=>calculateBMR,
    "calculateDailyCalorieTarget",
    ()=>calculateDailyCalorieTarget,
    "calculateDailyNutrition",
    ()=>calculateDailyNutrition,
    "calculateTDEE",
    ()=>calculateTDEE,
    "getActivityMultiplier",
    ()=>getActivityMultiplier,
    "getNutritionGoal",
    ()=>getNutritionGoal,
    "isProfileComplete",
    ()=>isProfileComplete
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$bmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/utils/bmi.ts [app-client] (ecmascript)");
;
function isProfileComplete(profile) {
    if (!profile) return false;
    const weight = Number(profile.weight);
    const height = Number(profile.height);
    return Boolean(weight && weight > 0 && height && height > 0);
}
function calculateBMR(profileOrWeight, explicitHeightCm, explicitAge, explicitGender) {
    let weight = 0;
    let height = 0;
    let age = 22;
    let gender = "male";
    if (typeof profileOrWeight === "object" && profileOrWeight !== null) {
        weight = Number(profileOrWeight.weight) || 0;
        height = Number(profileOrWeight.height) || 0;
        age = Number(profileOrWeight.age) || 22;
        gender = profileOrWeight.gender || "male";
    } else {
        weight = Number(profileOrWeight) || 0;
        height = Number(explicitHeightCm) || 0;
        age = Number(explicitAge) || 22;
        gender = explicitGender || "male";
    }
    if (!weight || !height || weight <= 0 || height <= 0) {
        return 1608;
    }
    const base = 10 * weight + 6.25 * height - 5 * age;
    if (gender === "male") {
        return Math.round(base + 5);
    } else if (gender === "female") {
        return Math.round(base - 161);
    }
    return Math.round(base - 78);
}
function getActivityMultiplier(activityLevel) {
    switch(activityLevel){
        case "sedentary":
            return 1.2;
        case "light":
            return 1.375;
        case "moderate":
            return 1.55;
        case "active":
            return 1.725;
        case "very_active":
            return 1.9;
        default:
            return 1.55;
    }
}
function calculateTDEE(profileOrBmr, explicitActivityLevel) {
    if (typeof profileOrBmr === "object" && profileOrBmr !== null) {
        const bmr = calculateBMR(profileOrBmr);
        const multiplier = getActivityMultiplier(profileOrBmr.activityLevel);
        return Math.round(bmr * multiplier);
    }
    const bmr = Number(profileOrBmr) || 1608;
    const multiplier = getActivityMultiplier(explicitActivityLevel);
    return Math.round(bmr * multiplier);
}
function getNutritionGoal(bmiStatus) {
    switch(bmiStatus){
        case "Underweight":
            return {
                goalTitle: "Tăng cân lành mạnh",
                recommendedApproach: "Tăng dần lượng calo với thực phẩm giàu đạm thực vật và chất béo tốt.",
                suggestions: [
                    "Tăng lượng calo hợp lý (dư thừa calo)",
                    "Ưu tiên đạm thực vật",
                    "Bổ sung chất béo tốt (bơ, các loại hạt)",
                    "Chia đều calo trong ngày",
                    "Tránh thâm hụt calo"
                ],
                calorieAdjustment: 350
            };
        case "Overweight":
            return {
                goalTitle: "Giảm cân khoa học",
                recommendedApproach: "Thâm hụt calo vừa phải, ưu tiên đạm thực vật, chất xơ và thực phẩm giàu vi chất.",
                suggestions: [
                    "Tạo thâm hụt calo vừa phải",
                    "Ưu tiên thực phẩm giàu đạm và chất xơ",
                    "Hạn chế thực phẩm nhiều đường / calo rỗng",
                    "Không giảm calo quá mức"
                ],
                calorieAdjustment: -450
            };
        case "Balanced":
        default:
            return {
                goalTitle: "Duy trì vóc dáng cân đối",
                recommendedApproach: "Duy trì mức năng lượng cân bằng với chế độ dinh dưỡng thuần thực vật.",
                suggestions: [
                    "Duy trì mục tiêu calo",
                    "Cân bằng đạm / tinh bột / chất béo tốt",
                    "Đảm bảo đủ chất xơ và vi chất",
                    "Duy trì chế độ ăn chay phù hợp"
                ],
                calorieAdjustment: 0
            };
    }
}
function calculateDailyCalorieTarget(profile) {
    const complete = isProfileComplete(profile);
    const bmiInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$utils$2f$bmi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateBMI"])(profile);
    const bmr = calculateBMR(profile);
    const tdee = calculateTDEE(profile);
    const bmiStatus = bmiInfo ? bmiInfo.status : "Balanced";
    const goalInfo = getNutritionGoal(bmiStatus);
    // If user explicitly chose a healthGoal in their profile and BMI is balanced, allow subtle refinement
    let calorieAdjustment = goalInfo.calorieAdjustment;
    let goalTitle = goalInfo.goalTitle;
    let recommendedApproach = goalInfo.recommendedApproach;
    let suggestions = goalInfo.suggestions;
    if (bmiStatus === "Balanced" && profile.healthGoal) {
        if (profile.healthGoal === "lose_weight") {
            calorieAdjustment = -350;
            goalTitle = "Giảm cân khoa học";
            recommendedApproach = "Thâm hụt calo vừa phải, ưu tiên đạm thực vật, chất xơ và thực phẩm giàu vi chất.";
            suggestions = [
                "Tạo calorie deficit vừa phải",
                "Ưu tiên thực phẩm giàu protein và chất xơ",
                "Hạn chế thực phẩm nhiều đường / calorie rỗng",
                "Không giảm calorie quá mức"
            ];
        } else if (profile.healthGoal === "gain_weight") {
            calorieAdjustment = 350;
            goalTitle = "Tăng cơ / Tăng cân";
            recommendedApproach = "Tăng dần lượng calo với thực phẩm giàu đạm thực vật và chất béo tốt.";
            suggestions = [
                "Tăng lượng calorie hợp lý (calorie surplus)",
                "Ưu tiên protein thực vật",
                "Bổ sung healthy fats (bơ, các loại hạt)",
                "Chia đều calories trong ngày",
                "Không tạo calorie deficit"
            ];
        }
    }
    const rawDailyTarget = tdee + calorieAdjustment;
    // Safe floor for healthy plant-based nutrition
    const dailyCalorieTarget = Math.max(1350, Math.round(rawDailyTarget));
    // Macronutrient breakdown: 25% Protein, 50% Carbs, 25% Fat
    let proteinPct = 0.25;
    let carbsPct = 0.50;
    let fatPct = 0.25;
    if (bmiStatus === "Underweight" || profile.healthGoal === "gain_weight") {
        proteinPct = 0.28;
        carbsPct = 0.50;
        fatPct = 0.22;
    } else if (bmiStatus === "Overweight" || profile.healthGoal === "lose_weight") {
        proteinPct = 0.30;
        carbsPct = 0.45;
        fatPct = 0.25;
    }
    const proteinGrams = Math.round(dailyCalorieTarget * proteinPct / 4);
    const carbsGrams = Math.round(dailyCalorieTarget * carbsPct / 4);
    const fatGrams = Math.round(dailyCalorieTarget * fatPct / 9);
    // Meal distribution (Requirement 6):
    // Breakfast: ~22% (~550 kcal)
    // Lunch: ~31% (~750 kcal)
    // Dinner: ~31% (~750 kcal)
    // Snack: ~16% (~400 kcal)
    // Sum = 100% (~2450-2500 kcal when target is 2492)
    const breakfast = Math.round(dailyCalorieTarget * 0.22);
    const lunch = Math.round(dailyCalorieTarget * 0.31);
    const dinner = Math.round(dailyCalorieTarget * 0.31);
    const snack = dailyCalorieTarget - (breakfast + lunch + dinner);
    const mealTargets = {
        breakfast,
        lunch,
        dinner,
        snack: Math.max(200, snack)
    };
    return {
        bmr,
        tdee,
        dailyCalorieTarget,
        calorieAdjustment,
        goalTitle,
        goalDescription: suggestions.join(" · "),
        recommendedApproach,
        suggestions,
        bmiInfo,
        bmiStatus: complete ? bmiStatus : "Incomplete",
        isProfileComplete: complete,
        macros: {
            proteinGrams,
            carbsGrams,
            fatGrams,
            proteinPct: Math.round(proteinPct * 100),
            carbsPct: Math.round(carbsPct * 100),
            fatPct: Math.round(fatPct * 100)
        },
        mealTargets
    };
}
function calculateDailyNutrition(profile) {
    return calculateDailyCalorieTarget(profile);
}
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
"[project]/src/features/recipes/components/RecipeAllergyBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RecipeAllergyBadge",
    ()=>RecipeAllergyBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$utils$2f$checkRecipeAllergy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/allergy/utils/checkRecipeAllergy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/hooks/useProfile.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function RecipeAllergyBadge({ recipe, compact = false, className = "" }) {
    _s();
    const { profile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"])();
    const allergyResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$utils$2f$checkRecipeAllergy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkRecipeAllergy"])(recipe, profile);
    // If no allergy: do NOT display warning (Requirement 5)
    if (!allergyResult.hasAllergy) {
        return null;
    }
    const allergenText = allergyResult.allergens.join(", ");
    const warningLabel = allergyResult.allergens.length === 1 ? `Chứa ${allergenText}` : `Cảnh báo: Chứa ${allergenText}`;
    if (compact) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs ${className}`,
            title: `Cảnh báo dị ứng: Chứa ${allergenText}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "w-3.5 h-3.5 text-amber-700 shrink-0"
                }, void 0, false, {
                    fileName: "[project]/src/features/recipes/components/RecipeAllergyBadge.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "truncate",
                    children: [
                        "⚠ ",
                        warningLabel
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/recipes/components/RecipeAllergyBadge.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/recipes/components/RecipeAllergyBadge.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs shadow-2xs ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "w-3.5 h-3.5 stroke-[2.25]"
                }, void 0, false, {
                    fileName: "[project]/src/features/recipes/components/RecipeAllergyBadge.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/recipes/components/RecipeAllergyBadge.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-bold text-amber-900",
                        children: "⚠ Cảnh báo dị ứng"
                    }, void 0, false, {
                        fileName: "[project]/src/features/recipes/components/RecipeAllergyBadge.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-amber-800 mt-0.5 leading-relaxed",
                        children: [
                            "Có chứa thành phần: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-amber-950",
                                children: allergenText
                            }, void 0, false, {
                                fileName: "[project]/src/features/recipes/components/RecipeAllergyBadge.tsx",
                                lineNumber: 55,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/recipes/components/RecipeAllergyBadge.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/recipes/components/RecipeAllergyBadge.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/recipes/components/RecipeAllergyBadge.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(RecipeAllergyBadge, "jdsHPOXin7idJMSTj6g46WA0av8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"]
    ];
});
_c = RecipeAllergyBadge;
var _c;
__turbopack_context__.k.register(_c, "RecipeAllergyBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/recipes/components/RecipeFavoriteButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RecipeFavoriteButton",
    ()=>RecipeFavoriteButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/favoriteService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/hooks/useProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tokenStorage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function RecipeFavoriteButton({ recipeId, size = "md", className = "" }) {
    _s();
    const { profile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"])();
    const authUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getUser();
    const userId = String(authUser?.user_id || profile.id || "1");
    const [isFav, setIsFav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "RecipeFavoriteButton.useState": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].isRecipeFavorite(userId, recipeId);
        }
    }["RecipeFavoriteButton.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RecipeFavoriteButton.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].fetchServerFavorites(userId).then({
                "RecipeFavoriteButton.useEffect": ()=>{
                    setIsFav(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].isRecipeFavorite(userId, recipeId));
                }
            }["RecipeFavoriteButton.useEffect"]);
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].subscribe({
                "RecipeFavoriteButton.useEffect.unsubscribe": (event)=>{
                    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].FAVORITES) {
                        setIsFav(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].isRecipeFavorite(userId, recipeId));
                    }
                }
            }["RecipeFavoriteButton.useEffect.unsubscribe"]);
            return unsubscribe;
        }
    }["RecipeFavoriteButton.useEffect"], [
        userId,
        recipeId
    ]);
    const handleToggle = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        const updated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].toggleFavoriteRecipe(userId, recipeId);
        setIsFav(updated);
    };
    const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
    const btnSize = size === "sm" ? "w-7 h-7" : "w-8 h-8";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleToggle,
        title: isFav ? "♥ Remove from Favorites" : "♡ Add to Favorites",
        "aria-label": isFav ? "Remove from Favorites" : "Add to Favorites",
        className: `${btnSize} rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs ${isFav ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs hover:bg-rose-100" : "bg-white/90 text-stone-400 hover:text-rose-500 hover:bg-white border border-stone-200/80 shadow-2xs"} ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
            className: `${iconSize} transition-transform active:scale-75 ${isFav ? "fill-rose-500 text-rose-500" : ""}`
        }, void 0, false, {
            fileName: "[project]/src/features/recipes/components/RecipeFavoriteButton.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/recipes/components/RecipeFavoriteButton.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(RecipeFavoriteButton, "gtrSQhJieEw/dIv61EUSDeWxEfI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"]
    ];
});
_c = RecipeFavoriteButton;
var _c;
__turbopack_context__.k.register(_c, "RecipeFavoriteButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/recipes/data/mockRecipes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INITIAL_MOCK_RECIPES",
    ()=>INITIAL_MOCK_RECIPES
]);
const INITIAL_MOCK_RECIPES = [
    // ==========================================
    // BREAKFASTS (~520 - 560 kcal)
    // ==========================================
    // 1. Breakfast - Contains Peanut, Vegan, 550 kcal
    {
        id: "rec-1",
        name: "Peanut Butter Banana Protein Oatmeal",
        title: "Peanut Butter Banana Protein Oatmeal",
        description: "Creamy rolled oats simmered with almond milk, layered with ripe bananas, chia seeds, and rich crushed peanut butter.",
        image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
        category: "Breakfast & Porridge",
        mealType: "breakfast",
        vegetarianType: "vegan",
        allergens: [
            "peanut"
        ],
        prepTime: 5,
        cookTime: 10,
        duration: "15 min",
        serving: 1,
        calories: 550,
        protein: 26,
        carbs: 72,
        fat: 20,
        author: "Mai Tran",
        authorHandle: "maitran_vegan",
        authorInitials: "MT",
        verified: true,
        views: "24.5k",
        rating: 4.9,
        reviewsCount: "132",
        cuisine: "American",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i1",
                name: "Rolled Oats",
                quantity: 70,
                unit: "g"
            },
            {
                id: "i2",
                name: "Peanut Butter",
                quantity: 32,
                unit: "g"
            },
            {
                id: "i3",
                name: "Crushed Peanuts",
                quantity: 15,
                unit: "g"
            },
            {
                id: "i4",
                name: "Banana",
                quantity: 1,
                unit: "pc"
            },
            {
                id: "i5",
                name: "Almond milk",
                quantity: 220,
                unit: "ml"
            },
            {
                id: "i6",
                name: "Chia seeds",
                quantity: 10,
                unit: "g"
            }
        ],
        instructions: [
            "Simmer rolled oats with almond milk over medium heat for 6-8 minutes until thick and creamy.",
            "Stir in half the sliced banana and 1 tablespoon of peanut butter.",
            "Transfer to a bowl and top with remaining banana slices, crushed peanuts, and a swirl of peanut butter."
        ]
    },
    // 2. Breakfast - Contains Soy, Vegan, 530 kcal
    {
        id: "rec-2",
        name: "High-Protein Soy Chia Overnight Oats with Berries",
        title: "High-Protein Soy Chia Overnight Oats with Berries",
        description: "Overnight chia seed pudding prepared with organic soy milk and sweet seasonal blueberries.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        category: "Breakfast & Porridge",
        mealType: "breakfast",
        vegetarianType: "vegan",
        allergens: [
            "soy"
        ],
        prepTime: 5,
        cookTime: 0,
        duration: "5 min prep",
        serving: 1,
        calories: 530,
        protein: 32,
        carbs: 68,
        fat: 16,
        author: "Linh Nguyen",
        authorHandle: "linh_saigonveg",
        authorInitials: "LN",
        verified: true,
        views: "31.2k",
        rating: 4.8,
        reviewsCount: "215",
        cuisine: "Continental",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i7",
                name: "Organic Soy Milk",
                quantity: 280,
                unit: "ml"
            },
            {
                id: "i8",
                name: "Rolled Oats",
                quantity: 65,
                unit: "g"
            },
            {
                id: "i9",
                name: "Chia seeds",
                quantity: 15,
                unit: "g"
            },
            {
                id: "i10",
                name: "Blueberries",
                quantity: 50,
                unit: "g"
            },
            {
                id: "i11",
                name: "Soy protein isolate powder",
                quantity: 20,
                unit: "g"
            }
        ],
        instructions: [
            "Combine rolled oats, chia seeds, and soy protein isolate in a jar.",
            "Pour in organic soy milk and stir vigorously to avoid clumps.",
            "Refrigerate overnight (at least 4 hours) and garnish with fresh blueberries before serving."
        ]
    },
    // 3. Breakfast - Safe (No Peanuts, No Soy), Vegan, 540 kcal
    {
        id: "rec-3",
        name: "Tropical Mango Passionfruit Smoothie Bowl with Hemp & Pumpkin Seeds",
        title: "Tropical Mango Passionfruit Smoothie Bowl with Hemp & Pumpkin Seeds",
        description: "Refreshing frozen mango, passion fruit pulp, coconut milk, topped with toasted pumpkin seeds and hemp hearts.",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
        category: "Smoothies & Bowls",
        mealType: "breakfast",
        vegetarianType: "vegan",
        allergens: [],
        prepTime: 10,
        cookTime: 0,
        duration: "10 min",
        serving: 1,
        calories: 540,
        protein: 22,
        carbs: 78,
        fat: 18,
        author: "Khoa Dang",
        authorHandle: "khoadang_chef",
        authorInitials: "KD",
        verified: true,
        views: "18.9k",
        rating: 4.7,
        reviewsCount: "94",
        cuisine: "Tropical",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i12",
                name: "Frozen Mango Chunks",
                quantity: 200,
                unit: "g"
            },
            {
                id: "i13",
                name: "Coconut Milk (light)",
                quantity: 150,
                unit: "ml"
            },
            {
                id: "i14",
                name: "Hemp Seeds",
                quantity: 25,
                unit: "g"
            },
            {
                id: "i15",
                name: "Pumpkin Seeds",
                quantity: 25,
                unit: "g"
            },
            {
                id: "i16",
                name: "Rolled Oats (ground)",
                quantity: 30,
                unit: "g"
            },
            {
                id: "i17",
                name: "Passion fruit pulp",
                quantity: 30,
                unit: "g"
            }
        ],
        instructions: [
            "Blend frozen mango, coconut milk, and ground oats until thick and frosty.",
            "Scoop into a chilled bowl.",
            "Garnish with passion fruit, toasted pumpkin seeds, and hemp seeds."
        ]
    },
    // 4. Breakfast - Safe (No Peanuts, No Soy), Vegan, 550 kcal
    {
        id: "rec-3b",
        name: "Warm Cinnamon Apple Oatmeal with Toasted Sunflower Seeds",
        title: "Warm Cinnamon Apple Oatmeal with Toasted Sunflower Seeds",
        description: "Steaming steel-cut oats simmered with diced red apples, maple syrup, Ceylon cinnamon, and crunchy sunflower seeds.",
        image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
        category: "Breakfast & Porridge",
        mealType: "breakfast",
        vegetarianType: "vegan",
        allergens: [],
        prepTime: 5,
        cookTime: 10,
        duration: "15 min",
        serving: 1,
        calories: 550,
        protein: 20,
        carbs: 85,
        fat: 17,
        author: "Mai Tran",
        authorHandle: "maitran_vegan",
        authorInitials: "MT",
        verified: true,
        views: "19.8k",
        rating: 4.8,
        reviewsCount: "105",
        cuisine: "American",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i18",
                name: "Rolled Oats",
                quantity: 80,
                unit: "g"
            },
            {
                id: "i19",
                name: "Fresh Diced Apple",
                quantity: 1,
                unit: "pc"
            },
            {
                id: "i20",
                name: "Sunflower Seeds",
                quantity: 25,
                unit: "g"
            },
            {
                id: "i21",
                name: "Oat Milk",
                quantity: 220,
                unit: "ml"
            },
            {
                id: "i22",
                name: "Pure Maple Syrup",
                quantity: 15,
                unit: "ml"
            },
            {
                id: "i23",
                name: "Cinnamon",
                quantity: 3,
                unit: "g"
            }
        ],
        instructions: [
            "Cook rolled oats in oat milk with cinnamon and diced apple for 8 minutes.",
            "Stir in pure maple syrup.",
            "Top with toasted sunflower seeds for healthy fats and crunch."
        ]
    },
    // 5. Breakfast - Ovo Vegetarian (Contains Egg), 530 kcal
    {
        id: "rec-4",
        name: "Sourdough Toast with Soft Scrambled Eggs & Sautéed Spinach",
        title: "Sourdough Toast with Soft Scrambled Eggs & Sautéed Spinach",
        description: "Crispy artisan sourdough bread with pasture-raised soft eggs and garlic baby spinach.",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
        category: "Toast & Bread",
        mealType: "breakfast",
        vegetarianType: "ovo_vegetarian",
        allergens: [
            "egg"
        ],
        prepTime: 5,
        cookTime: 10,
        duration: "15 min",
        serving: 1,
        calories: 530,
        protein: 30,
        carbs: 48,
        fat: 22,
        author: "An Vo",
        authorHandle: "anvo_ovo",
        authorInitials: "AV",
        verified: false,
        views: "12.1k",
        rating: 4.6,
        reviewsCount: "68",
        cuisine: "European",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i24",
                name: "Farm Fresh Eggs",
                quantity: 3,
                unit: "pcs"
            },
            {
                id: "i25",
                name: "Sourdough Bread",
                quantity: 2,
                unit: "slices"
            },
            {
                id: "i26",
                name: "Baby Spinach",
                quantity: 80,
                unit: "g"
            },
            {
                id: "i27",
                name: "Olive oil",
                quantity: 8,
                unit: "ml"
            },
            {
                id: "i28",
                name: "Avocado",
                quantity: 30,
                unit: "g"
            }
        ],
        instructions: [
            "Toast sourdough slices until crisp.",
            "Sauté spinach in a drop of olive oil.",
            "Gently scramble eggs and serve on sourdough with sliced avocado."
        ]
    },
    // ==========================================
    // LUNCHES (~740 - 760 kcal)
    // ==========================================
    // 6. Lunch - Contains Soy, Vegan, 750 kcal
    {
        id: "rec-5",
        name: "Crispy Sesame Garlic Tofu with Jasmine Rice & Bok Choy",
        title: "Crispy Sesame Garlic Tofu with Jasmine Rice & Bok Choy",
        description: "Golden cubed tofu coated in fragrant garlic, ginger, and dark tamari sesame glaze over steamed jasmine rice.",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        category: "Stir-Fried & Crispy",
        mealType: "lunch",
        vegetarianType: "vegan",
        allergens: [
            "soy"
        ],
        prepTime: 15,
        cookTime: 15,
        duration: "30 min",
        serving: 1,
        calories: 750,
        protein: 44,
        carbs: 88,
        fat: 24,
        author: "Linh Nguyen",
        authorHandle: "linh_saigonveg",
        authorInitials: "LN",
        verified: true,
        views: "64.3k",
        rating: 4.9,
        reviewsCount: "348",
        cuisine: "Vietnamese",
        difficulty: "Medium",
        ingredients: [
            {
                id: "i29",
                name: "Firm Tofu block",
                quantity: 250,
                unit: "g"
            },
            {
                id: "i30",
                name: "Soy sauce (Tamari)",
                quantity: 25,
                unit: "ml"
            },
            {
                id: "i31",
                name: "Sesame oil",
                quantity: 15,
                unit: "ml"
            },
            {
                id: "i32",
                name: "Garlic cloves",
                quantity: 4,
                unit: "pcs"
            },
            {
                id: "i33",
                name: "Baby Bok Choy",
                quantity: 120,
                unit: "g"
            },
            {
                id: "i34",
                name: "Steamed Jasmine Rice",
                quantity: 180,
                unit: "g"
            }
        ],
        instructions: [
            "Press tofu with a clean towel and cut into 2cm cubes.",
            "Pan-fry cubes in sesame oil until golden on all sides.",
            "Add minced garlic, tamari soy sauce, and a splash of water; toss until glossy.",
            "Steam bok choy and serve warm alongside jasmine rice."
        ]
    },
    // 7. Lunch - Contains Peanut & Soy, Vegan, 740 kcal
    {
        id: "rec-6",
        name: "Rainbow Pad Thai with Crushed Peanuts & Crispy Tofu",
        title: "Rainbow Pad Thai with Crushed Peanuts & Crispy Tofu",
        description: "Classic stir-fried rice noodles tossed with bean sprouts, tamarind sauce, crispy tofu, and generous toasted peanuts.",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
        category: "Noodles & Pho",
        mealType: "lunch",
        vegetarianType: "vegan",
        allergens: [
            "peanut",
            "soy"
        ],
        prepTime: 15,
        cookTime: 15,
        duration: "30 min",
        serving: 1,
        calories: 740,
        protein: 42,
        carbs: 92,
        fat: 23,
        author: "Khoa Dang",
        authorHandle: "khoadang_chef",
        authorInitials: "KD",
        verified: true,
        views: "42.0k",
        rating: 4.8,
        reviewsCount: "189",
        cuisine: "Thai",
        difficulty: "Medium",
        ingredients: [
            {
                id: "i35",
                name: "Rice flat noodles",
                quantity: 120,
                unit: "g"
            },
            {
                id: "i36",
                name: "Crushed Peanuts",
                quantity: 40,
                unit: "g"
            },
            {
                id: "i37",
                name: "Tofu",
                quantity: 140,
                unit: "g"
            },
            {
                id: "i38",
                name: "Bean sprouts",
                quantity: 80,
                unit: "g"
            },
            {
                id: "i39",
                name: "Tamarind paste",
                quantity: 20,
                unit: "g"
            },
            {
                id: "i40",
                name: "Soy sauce",
                quantity: 20,
                unit: "ml"
            }
        ],
        instructions: [
            "Soak rice noodles in warm water until pliable.",
            "Sear tofu cubes in a wok over high heat with tamarind and soy sauce.",
            "Toss noodles and bean sprouts for 2 minutes.",
            "Serve hot garnished with lime wedge and crushed peanuts."
        ]
    },
    // 8. Lunch - Safe (No Peanut, No Soy), Vegan, 750 kcal
    {
        id: "rec-7",
        name: "Mediterranean Lemon Herb Quinoa & Chickpea Power Bowl",
        title: "Mediterranean Lemon Herb Quinoa & Chickpea Power Bowl",
        description: "Protein-packed cooked chickpeas, fluffy quinoa, Kalamata olives, diced avocado, and cold-pressed olive oil dressing.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        category: "Rolls & Salads",
        mealType: "lunch",
        vegetarianType: "vegan",
        allergens: [],
        prepTime: 10,
        cookTime: 15,
        duration: "25 min",
        serving: 1,
        calories: 750,
        protein: 34,
        carbs: 95,
        fat: 25,
        author: "Mai Tran",
        authorHandle: "maitran_vegan",
        authorInitials: "MT",
        verified: true,
        views: "29.4k",
        rating: 4.8,
        reviewsCount: "142",
        cuisine: "Mediterranean",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i41",
                name: "Cooked Chickpeas",
                quantity: 240,
                unit: "g"
            },
            {
                id: "i42",
                name: "Cooked Quinoa",
                quantity: 180,
                unit: "g"
            },
            {
                id: "i43",
                name: "Avocado",
                quantity: 50,
                unit: "g"
            },
            {
                id: "i44",
                name: "Cucumber & Cherry Tomatoes",
                quantity: 120,
                unit: "g"
            },
            {
                id: "i45",
                name: "Extra virgin olive oil",
                quantity: 18,
                unit: "ml"
            },
            {
                id: "i46",
                name: "Lemon juice & fresh parsley",
                quantity: 20,
                unit: "ml"
            }
        ],
        instructions: [
            "Combine cooked quinoa, chickpeas, diced cucumber, and halved cherry tomatoes in a large bowl.",
            "Whisk extra virgin olive oil, freshly squeezed lemon juice, salt, and minced parsley.",
            "Pour dressing over salad, toss gently, and top with ripe avocado."
        ]
    },
    // 9. Lunch - Safe (No Peanut, No Soy), Vegan, 760 kcal
    {
        id: "rec-7b",
        name: "Hearty Lentil Walnut Bolognese with Whole Grain Pasta",
        title: "Hearty Lentil Walnut Bolognese with Whole Grain Pasta",
        description: "Rich Italian tomato ragu simmered with brown lentils, crushed walnuts, garlic, and served over al dente whole grain pasta.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
        category: "Noodles & Pho",
        mealType: "lunch",
        vegetarianType: "vegan",
        allergens: [],
        prepTime: 10,
        cookTime: 20,
        duration: "30 min",
        serving: 1,
        calories: 760,
        protein: 36,
        carbs: 98,
        fat: 23,
        author: "Khoa Dang",
        authorHandle: "khoadang_chef",
        authorInitials: "KD",
        verified: true,
        views: "33.1k",
        rating: 4.9,
        reviewsCount: "167",
        cuisine: "Italian",
        difficulty: "Medium",
        ingredients: [
            {
                id: "i47",
                name: "Whole Grain Spaghetti",
                quantity: 130,
                unit: "g"
            },
            {
                id: "i48",
                name: "Cooked Brown Lentils",
                quantity: 160,
                unit: "g"
            },
            {
                id: "i49",
                name: "Crushed Walnuts",
                quantity: 25,
                unit: "g"
            },
            {
                id: "i50",
                name: "Crushed Plum Tomatoes",
                quantity: 180,
                unit: "g"
            },
            {
                id: "i51",
                name: "Olive oil",
                quantity: 12,
                unit: "ml"
            },
            {
                id: "i52",
                name: "Garlic & Italian Herbs",
                quantity: 10,
                unit: "g"
            }
        ],
        instructions: [
            "Boil whole grain pasta until al dente.",
            "Simmer lentils, crushed walnuts, and tomato ragu with Italian herbs.",
            "Toss pasta in sauce and garnish with fresh basil."
        ]
    },
    // ==========================================
    // DINNERS (~740 - 760 kcal)
    // ==========================================
    // 10. Dinner - Safe (No Peanut, No Soy), Vegan, 750 kcal
    {
        id: "rec-9",
        name: "Golden Turmeric Red Lentil Dahl with Brown Rice & Greens",
        title: "Golden Turmeric Red Lentil Dahl with Brown Rice & Greens",
        description: "Creamy yellow coconut red lentils slow-simmered with fresh turmeric, ginger, cumin, tender greens, served with brown rice.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
        category: "Curries & Stews",
        mealType: "dinner",
        vegetarianType: "vegan",
        allergens: [],
        prepTime: 10,
        cookTime: 25,
        duration: "35 min",
        serving: 1,
        calories: 750,
        protein: 38,
        carbs: 102,
        fat: 20,
        author: "Linh Nguyen",
        authorHandle: "linh_saigonveg",
        authorInitials: "LN",
        verified: true,
        views: "52.8k",
        rating: 4.9,
        reviewsCount: "273",
        cuisine: "Indian",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i53",
                name: "Red Lentils",
                quantity: 140,
                unit: "g"
            },
            {
                id: "i54",
                name: "Light Coconut Milk",
                quantity: 140,
                unit: "ml"
            },
            {
                id: "i55",
                name: "Cooked Brown Rice",
                quantity: 180,
                unit: "g"
            },
            {
                id: "i56",
                name: "Spinach Leaves",
                quantity: 100,
                unit: "g"
            },
            {
                id: "i57",
                name: "Fresh Turmeric & Cumin",
                quantity: 10,
                unit: "g"
            }
        ],
        instructions: [
            "Simmer red lentils with grated fresh turmeric, cumin, and water for 20 minutes.",
            "Stir in light coconut milk and fold in spinach until wilted.",
            "Serve hot alongside steaming brown rice."
        ]
    },
    // 11. Dinner - Contains Soy, Vegan, 740 kcal
    {
        id: "rec-10",
        name: "Glazed Tempeh & Edamame Poke Bowl with Avocado",
        title: "Glazed Tempeh & Edamame Poke Bowl with Avocado",
        description: "Caramelized fermented tempeh, steamed edamame, ripe avocado, pickled ginger, and brown sushi rice.",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        category: "Mixed Vegan Platters",
        mealType: "dinner",
        vegetarianType: "vegan",
        allergens: [
            "soy"
        ],
        prepTime: 15,
        cookTime: 10,
        duration: "25 min",
        serving: 1,
        calories: 740,
        protein: 48,
        carbs: 82,
        fat: 24,
        author: "Khoa Dang",
        authorHandle: "khoadang_chef",
        authorInitials: "KD",
        verified: true,
        views: "37.5k",
        rating: 4.9,
        reviewsCount: "166",
        cuisine: "Japanese",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i58",
                name: "Fermented Tempeh (Soy)",
                quantity: 180,
                unit: "g"
            },
            {
                id: "i59",
                name: "Shelled Edamame (Soy)",
                quantity: 80,
                unit: "g"
            },
            {
                id: "i60",
                name: "Brown Rice",
                quantity: 160,
                unit: "g"
            },
            {
                id: "i61",
                name: "Avocado",
                quantity: 60,
                unit: "g"
            },
            {
                id: "i62",
                name: "Soy sauce marinade",
                quantity: 20,
                unit: "ml"
            },
            {
                id: "i63",
                name: "Sesame seeds",
                quantity: 10,
                unit: "g"
            }
        ],
        instructions: [
            "Steam tempeh cubes for 5 minutes, then pan-sear in soy marinade until deeply caramelized.",
            "Arrange warm brown rice in a wide bowl.",
            "Top with glazed tempeh, bright edamame, sliced avocado, and toasted sesame seeds."
        ]
    },
    // 12. Dinner - Contains Peanut & Soy, Vegan, 730 kcal
    {
        id: "rec-11",
        name: "Vietnamese Tofu Spring Rolls with Hoisin Peanut Dip",
        title: "Vietnamese Tofu Spring Rolls with Hoisin Peanut Dip",
        description: "Rice paper rolls filled with pan-seared tofu, fresh mint, coriander, served with rich hoisin peanut sauce.",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
        category: "Rolls & Salads",
        mealType: "dinner",
        vegetarianType: "vegan",
        allergens: [
            "peanut",
            "soy"
        ],
        prepTime: 20,
        cookTime: 10,
        duration: "30 min",
        serving: 1,
        calories: 730,
        protein: 40,
        carbs: 88,
        fat: 25,
        author: "Mai Tran",
        authorHandle: "maitran_vegan",
        authorInitials: "MT",
        verified: true,
        views: "78.4k",
        rating: 4.9,
        reviewsCount: "420",
        cuisine: "Vietnamese",
        difficulty: "Medium",
        ingredients: [
            {
                id: "i64",
                name: "Tofu",
                quantity: 200,
                unit: "g"
            },
            {
                id: "i65",
                name: "Peanut Butter & Roasted Peanuts",
                quantity: 45,
                unit: "g"
            },
            {
                id: "i66",
                name: "Soy sauce & Hoisin sauce",
                quantity: 25,
                unit: "g"
            },
            {
                id: "i67",
                name: "Rice paper sheets",
                quantity: 5,
                unit: "pcs"
            },
            {
                id: "i68",
                name: "Rice vermicelli",
                quantity: 110,
                unit: "g"
            }
        ],
        instructions: [
            "Cut tofu into batons and brown in a skillet.",
            "Dip rice paper in warm water until pliable.",
            "Roll vermicelli, tofu batons, and herbs tightly.",
            "Whisk hoisin sauce and peanut butter into dipping sauce; scatter crushed peanuts on top."
        ]
    },
    // 13. Dinner - Safe (No Peanut, No Soy), Vegan, 760 kcal
    {
        id: "rec-12",
        name: "Smoky Black Bean, Roasted Sweet Potato & Quinoa Burrito Bowl",
        title: "Smoky Black Bean, Roasted Sweet Potato & Quinoa Burrito Bowl",
        description: "Roasted cumin sweet potato chunks, simmered black beans, fresh sweet corn, and guacamole over fluffy quinoa.",
        image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
        category: "Mixed Vegan Platters",
        mealType: "dinner",
        vegetarianType: "vegan",
        allergens: [],
        prepTime: 15,
        cookTime: 20,
        duration: "35 min",
        serving: 1,
        calories: 760,
        protein: 32,
        carbs: 112,
        fat: 21,
        author: "Khoa Dang",
        authorHandle: "khoadang_chef",
        authorInitials: "KD",
        verified: true,
        views: "21.6k",
        rating: 4.8,
        reviewsCount: "112",
        cuisine: "Mexican",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i69",
                name: "Cooked Black Beans",
                quantity: 220,
                unit: "g"
            },
            {
                id: "i70",
                name: "Roasted Sweet Potato",
                quantity: 180,
                unit: "g"
            },
            {
                id: "i71",
                name: "Cooked Quinoa",
                quantity: 140,
                unit: "g"
            },
            {
                id: "i72",
                name: "Avocado",
                quantity: 60,
                unit: "g"
            },
            {
                id: "i73",
                name: "Sweet corn kernels",
                quantity: 60,
                unit: "g"
            },
            {
                id: "i74",
                name: "Lime juice & smoked paprika",
                quantity: 10,
                unit: "g"
            }
        ],
        instructions: [
            "Roast sweet potato cubes with smoked paprika at 200°C for 20 minutes.",
            "Warm black beans with cumin and lime juice.",
            "Assemble over quinoa with sweet corn and freshly mashed avocado."
        ]
    },
    // ==========================================
    // SNACKS (~380 - 410 kcal)
    // ==========================================
    // 14. Snack - Contains Soy, Vegan, 380 kcal
    {
        id: "rec-13",
        name: "Crispy Roasted Salt & Pepper Edamame with Brown Rice Crackers",
        title: "Crispy Roasted Salt & Pepper Edamame with Brown Rice Crackers",
        description: "Young green soybeans roasted until crunchy, paired with sea-salted wholegrain brown rice crackers.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        category: "Snacks & Pastries",
        mealType: "snack",
        vegetarianType: "vegan",
        allergens: [
            "soy"
        ],
        prepTime: 5,
        cookTime: 15,
        duration: "20 min",
        serving: 1,
        calories: 380,
        protein: 26,
        carbs: 42,
        fat: 12,
        author: "Linh Nguyen",
        authorHandle: "linh_saigonveg",
        authorInitials: "LN",
        verified: true,
        views: "15.4k",
        rating: 4.7,
        reviewsCount: "63",
        cuisine: "Japanese",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i75",
                name: "Whole Edamame pods (Soy)",
                quantity: 220,
                unit: "g"
            },
            {
                id: "i76",
                name: "Brown Rice Crackers",
                quantity: 40,
                unit: "g"
            },
            {
                id: "i77",
                name: "Olive oil",
                quantity: 8,
                unit: "ml"
            },
            {
                id: "i78",
                name: "Coarse sea salt & black pepper",
                quantity: 3,
                unit: "g"
            }
        ],
        instructions: [
            "Toss edamame pods with olive oil, sea salt, and black pepper.",
            "Roast on a baking sheet at 200°C for 15 minutes until blistered.",
            "Serve alongside brown rice crackers."
        ]
    },
    // 15. Snack - Contains Peanut, Vegan, 400 kcal
    {
        id: "rec-14",
        name: "Crunchy Peanut Coconut Date Energy Bites",
        title: "Crunchy Peanut Coconut Date Energy Bites",
        description: "Wholesome raw snack balls made from crushed roasted peanuts, Medjool dates, chia seeds, and shredded coconut.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
        category: "Snacks & Pastries",
        mealType: "snack",
        vegetarianType: "vegan",
        allergens: [
            "peanut"
        ],
        prepTime: 10,
        cookTime: 0,
        duration: "10 min",
        serving: 1,
        calories: 400,
        protein: 16,
        carbs: 48,
        fat: 18,
        author: "Mai Tran",
        authorHandle: "maitran_vegan",
        authorInitials: "MT",
        verified: true,
        views: "27.1k",
        rating: 4.8,
        reviewsCount: "98",
        cuisine: "Continental",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i79",
                name: "Medjool Dates",
                quantity: 60,
                unit: "g"
            },
            {
                id: "i80",
                name: "Roasted Peanuts",
                quantity: 40,
                unit: "g"
            },
            {
                id: "i81",
                name: "Shredded coconut",
                quantity: 15,
                unit: "g"
            },
            {
                id: "i82",
                name: "Chia seeds",
                quantity: 10,
                unit: "g"
            }
        ],
        instructions: [
            "Pulse pitted dates and roasted peanuts in a food processor until a sticky dough forms.",
            "Roll into bite-sized balls and coat with shredded coconut.",
            "Chill for 15 minutes before enjoying."
        ]
    },
    // 16. Snack - Safe (No Peanut, No Soy), Vegan, 390 kcal
    {
        id: "rec-15",
        name: "Crisp Apple Wedges with Sunflower Butter & Chia Pudding",
        title: "Crisp Apple Wedges with Sunflower Butter & Chia Pudding",
        description: "Fresh tart honeycrisp apple slices served with rich roasted sunflower seed butter and chilled oat chia pudding.",
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=800&q=80",
        category: "Desserts & Drinks",
        mealType: "snack",
        vegetarianType: "vegan",
        allergens: [],
        prepTime: 5,
        cookTime: 0,
        duration: "5 min",
        serving: 1,
        calories: 390,
        protein: 14,
        carbs: 52,
        fat: 16,
        author: "An Vo",
        authorHandle: "anvo_ovo",
        authorInitials: "AV",
        verified: false,
        views: "8.9k",
        rating: 4.6,
        reviewsCount: "44",
        cuisine: "American",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i83",
                name: "Fresh Honeycrisp Apple",
                quantity: 1,
                unit: "pc"
            },
            {
                id: "i84",
                name: "Sunflower Seed Butter",
                quantity: 30,
                unit: "g"
            },
            {
                id: "i85",
                name: "Chia seeds in oat milk",
                quantity: 120,
                unit: "g"
            },
            {
                id: "i86",
                name: "Ceylon Cinnamon",
                quantity: 2,
                unit: "g"
            }
        ],
        instructions: [
            "Slice crisp apple into wedges.",
            "Dust sunflower seed butter with Ceylon cinnamon.",
            "Dip apple wedges and enjoy alongside chilled chia pudding."
        ]
    },
    // 17. Snack - Safe (No Peanut, No Soy), Vegan, 400 kcal
    {
        id: "rec-15b",
        name: "Smoky Spiced Roasted Chickpeas & Dried Fruit Trail Mix",
        title: "Smoky Spiced Roasted Chickpeas & Dried Fruit Trail Mix",
        description: "Crunchy oven-crisped chickpeas dusted with smoked paprika and cumin, mixed with golden raisins and pumpkin seeds.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        category: "Snacks & Pastries",
        mealType: "snack",
        vegetarianType: "vegan",
        allergens: [],
        prepTime: 5,
        cookTime: 20,
        duration: "25 min",
        serving: 1,
        calories: 400,
        protein: 16,
        carbs: 58,
        fat: 14,
        author: "Mai Tran",
        authorHandle: "maitran_vegan",
        authorInitials: "MT",
        verified: true,
        views: "22.5k",
        rating: 4.8,
        reviewsCount: "89",
        cuisine: "Mediterranean",
        difficulty: "Easy",
        ingredients: [
            {
                id: "i87",
                name: "Cooked Chickpeas",
                quantity: 140,
                unit: "g"
            },
            {
                id: "i88",
                name: "Pumpkin Seeds",
                quantity: 25,
                unit: "g"
            },
            {
                id: "i89",
                name: "Golden Raisins",
                quantity: 30,
                unit: "g"
            },
            {
                id: "i90",
                name: "Olive oil & Smoked Paprika",
                quantity: 10,
                unit: "g"
            }
        ],
        instructions: [
            "Toss dry chickpeas with olive oil, sea salt, and smoked paprika.",
            "Roast at 200°C for 20 minutes until crisp.",
            "Toss with pumpkin seeds and golden raisins."
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/recipes/services/favoriteApiService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "favoriteApiService",
    ()=>favoriteApiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/api/client.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
;
const favoriteApiService = {
    // API #13: GET /users/me/favorites/recipes - Danh sách yêu thích
    getMyFavorites () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/users/me/favorites/recipes");
    },
    // API #14: POST /users/me/favorites/recipes/:recipeId - Thêm yêu thích
    addFavorite (recipeId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/users/me/favorites/recipes/${recipeId}`);
    },
    // API #15: DELETE /users/me/favorites/recipes/:recipeId - Bỏ yêu thích
    removeFavorite (recipeId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/users/me/favorites/recipes/${recipeId}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/recipes/services/favoriteService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "favoriteService",
    ()=>favoriteService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/recipeService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tokenStorage.ts [app-client] (ecmascript)");
;
;
;
;
function buildDefaultSavedPlans(_userId) {
    return [];
}
const isMockRecipeId = (id)=>/^rec-\d{1,2}$/.test(id);
const isMockPlanId = (id)=>id.includes("demo");
const favoriteService = {
    /**
   * Retrieves all favorites for a specific user without mock data
   */ getUserFavorites (userId) {
        const safeId = userId || "1";
        const all = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].FAVORITES, {});
        if (all[safeId]) {
            // Purge any legacy mock recipe IDs and mock saved plans from storage
            const cleanedRecipes = (all[safeId].recipes || []).filter((id)=>!isMockRecipeId(id));
            const cleanedPlans = (all[safeId].mealPlans || []).filter((p)=>!isMockPlanId(p.id));
            if (cleanedRecipes.length !== (all[safeId].recipes || []).length || cleanedPlans.length !== (all[safeId].mealPlans || []).length) {
                all[safeId] = {
                    ...all[safeId],
                    recipes: cleanedRecipes,
                    mealPlans: cleanedPlans
                };
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].FAVORITES, all);
            }
            return all[safeId];
        }
        const defaultData = {
            userId: safeId,
            recipes: [],
            mealPlans: []
        };
        all[safeId] = defaultData;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].FAVORITES, all);
        return defaultData;
    },
    /**
   * Saves favorites object for a specific user
   */ saveUserFavorites (data) {
        if (!data.userId) return;
        const all = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].FAVORITES, {});
        const existing = all[data.userId];
        if (existing) {
            const sameRecipes = Array.isArray(existing.recipes) && Array.isArray(data.recipes) && existing.recipes.length === data.recipes.length && existing.recipes.every((r, idx)=>r === data.recipes[idx]);
            const sameMealPlans = Array.isArray(existing.mealPlans) && Array.isArray(data.mealPlans) && existing.mealPlans.length === data.mealPlans.length && existing.mealPlans.every((m, idx)=>m.id === data.mealPlans[idx]?.id);
            if (sameRecipes && sameMealPlans) {
                return;
            }
        }
        all[data.userId] = data;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].FAVORITES, all);
    },
    /**
   * Check if a recipe is in user's favorites
   */ isRecipeFavorite (userId, recipeId) {
        if (!recipeId) return false;
        const favs = this.getUserFavorites(userId);
        const cleanId = String(recipeId).trim();
        const numId = cleanId.replace(/\D/g, "");
        return favs.recipes.some((id)=>{
            if (id === cleanId) return true;
            if (numId && id.replace(/\D/g, "") === numId) return true;
            return false;
        });
    },
    /**
   * Toggle favorite recipe status for a user
   */ toggleFavoriteRecipe (userId, recipeId) {
        if (!recipeId) return false;
        const favs = this.getUserFavorites(userId);
        const cleanId = String(recipeId).trim();
        const numId = cleanId.replace(/\D/g, "");
        const exists = this.isRecipeFavorite(userId, recipeId);
        let updatedRecipes;
        if (exists) {
            updatedRecipes = favs.recipes.filter((id)=>{
                if (id === cleanId) return false;
                if (numId && id.replace(/\D/g, "") === numId) return false;
                return true;
            });
        } else {
            updatedRecipes = [
                ...favs.recipes,
                cleanId
            ];
        }
        this.saveUserFavorites({
            ...favs,
            recipes: updatedRecipes
        });
        // Sync to backend if logged in
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getToken();
        const numericId = parseInt(numId, 10);
        if (token && !isNaN(numericId) && numericId > 0) {
            if (exists) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/users/me/favorites/recipes/${numericId}`).catch(()=>{});
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/users/me/favorites/recipes/${numericId}`).catch(()=>{});
            }
        }
        return !exists;
    },
    /**
   * Đồng bộ danh sách yêu thích từ backend
   * GET /users/me/favorites/recipes
   */ async fetchServerFavorites (userId) {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getToken();
        if (!token) return this.getUserFavorites(userId).recipes;
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/users/me/favorites/recipes");
            const list = Array.isArray(res) ? res : res?.data || [];
            if (Array.isArray(list)) {
                const ids = list.map((r)=>String(r.recipe_id || r.id));
                const current = this.getUserFavorites(userId);
                this.saveUserFavorites({
                    ...current,
                    recipes: ids
                });
                return ids;
            }
        } catch  {}
        return this.getUserFavorites(userId).recipes;
    },
    /**
   * Get full Recipe objects for user's favorite recipes
   */ getFavoriteRecipes (userId) {
        const favs = this.getUserFavorites(userId);
        const allRecipes = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecipes();
        return allRecipes.filter((r)=>{
            const rNum = String(r.id).replace(/\D/g, "");
            return favs.recipes.some((fid)=>{
                if (fid === r.id) return true;
                const fNum = String(fid).replace(/\D/g, "");
                return Boolean(fNum && rNum && fNum === rNum);
            });
        });
    },
    /**
   * Save a generated meal plan as "Saved Meal Plan" (Requirement 1)
   * Đồng bộ lưu thực đơn vào backend database PostgreSQL và localStorage
   */ async saveMealPlan (userId, planData) {
        const favs = this.getUserFavorites(userId);
        let planId = `saved-plan-${Date.now()}`;
        // Chuẩn bị payload cho backend
        const now = new Date();
        const startDateStr = now.toISOString().split("T")[0];
        const endDays = planData.planType === "monthly" ? 30 : 7;
        const endDate = new Date(now.getTime() + endDays * 24 * 60 * 60 * 1000);
        const endDateStr = endDate.toISOString().split("T")[0];
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getToken();
        if (token) {
            try {
                const dto = {
                    plan_type: planData.planType === "monthly" ? "monthly" : "weekly",
                    start_date: startDateStr,
                    end_date: endDateStr,
                    has_budget: Boolean(planData.totalEstimatedCost && planData.totalEstimatedCost > 0),
                    total_budget: planData.totalEstimatedCost ? Math.round(planData.totalEstimatedCost) : undefined,
                    target_calories_per_day: planData.targetCalories ? Math.round(planData.targetCalories) : undefined,
                    weekly_plans: [
                        {
                            week_number: 1,
                            start_date: startDateStr,
                            end_date: endDateStr,
                            week_budget: planData.totalEstimatedCost ? Math.round(planData.totalEstimatedCost) : undefined,
                            week_calorie_target: planData.targetCalories ? Math.round(planData.targetCalories) : undefined,
                            daily_meals: (planData.days || []).map((day, dIdx)=>{
                                const dDate = new Date(now.getTime() + dIdx * 24 * 60 * 60 * 1000);
                                const meal_date = dDate.toISOString().split("T")[0];
                                const items = [];
                                const addSlot = (rec)=>{
                                    if (!rec) return;
                                    const num = parseInt(String(rec.id).replace(/\D/g, ""), 10);
                                    if (!isNaN(num) && num > 0) {
                                        items.push({
                                            recipe_id: num,
                                            portion_multiplier: 1
                                        });
                                    }
                                };
                                addSlot(day.breakfast?.recipe);
                                addSlot(day.lunch?.recipe);
                                addSlot(day.dinner?.recipe);
                                addSlot(day.snack?.recipe);
                                return {
                                    meal_date,
                                    meal_type: "lunch",
                                    target_calories: day.targetCalories || 500,
                                    meal_items: items.length > 0 ? items : [
                                        {
                                            recipe_id: 1,
                                            portion_multiplier: 1
                                        }
                                    ]
                                };
                            })
                        }
                    ]
                };
                const serverRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/users/me/meal-plans", dto);
                if (serverRes?.meal_plan_id) {
                    planId = String(serverRes.meal_plan_id);
                }
            } catch (err) {
                console.warn("[favoriteService] Không thể lưu thực đơn lên server, lưu tạm offline:", err);
            }
        }
        const newSavedPlan = {
            id: planId,
            name: planData.name || `Thực đơn (${new Date().toLocaleDateString("vi-VN")})`,
            planType: planData.planType,
            createdAt: new Date().toISOString(),
            targetCalories: planData.targetCalories,
            totalEstimatedCost: planData.totalEstimatedCost,
            days: planData.days
        };
        this.saveUserFavorites({
            ...favs,
            mealPlans: [
                newSavedPlan,
                ...favs.mealPlans
            ]
        });
        return newSavedPlan;
    },
    /**
   * Remove a saved meal plan
   * Xóa thực đơn khỏi database và localStorage
   */ async removeSavedMealPlan (userId, planId) {
        const favs = this.getUserFavorites(userId);
        this.saveUserFavorites({
            ...favs,
            mealPlans: favs.mealPlans.filter((p)=>p.id !== planId)
        });
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getToken();
        const numId = parseInt(planId.replace(/\D/g, ""), 10);
        if (token && !isNaN(numId)) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/users/me/meal-plans/${numId}`);
            } catch (err) {
                console.warn("[favoriteService] Xóa thực đơn trên server thất bại, đã xóa cục bộ:", err);
            }
        }
    },
    /**
   * Đồng bộ danh sách thực đơn đã lưu từ backend
   * GET /users/me/meal-plans
   */ async fetchServerMealPlans (userId) {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getToken();
        if (!token) return this.getFavoriteMealPlans(userId);
        try {
            const serverPlans = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/users/me/meal-plans");
            if (Array.isArray(serverPlans)) {
                const favs = this.getUserFavorites(userId);
                const mapped = serverPlans.map((sp)=>({
                        id: String(sp.meal_plan_id),
                        name: sp.name || `Thực đơn #${sp.meal_plan_id} (${new Date(sp.start_date).toLocaleDateString("vi-VN")})`,
                        planType: sp.plan_type === "monthly" ? "monthly" : "weekly",
                        createdAt: sp.created_at || new Date().toISOString(),
                        targetCalories: Number(sp.target_calories_per_day || 2000),
                        totalEstimatedCost: Number(sp.total_budget || 0),
                        days: []
                    }));
                // Merge mapped plans with local plans that already have full days detail
                const merged = [
                    ...favs.mealPlans
                ];
                for (const mp of mapped){
                    if (!merged.some((p)=>p.id === mp.id)) {
                        merged.push(mp);
                    }
                }
                this.saveUserFavorites({
                    ...favs,
                    mealPlans: merged
                });
                return merged;
            }
        } catch (err) {
            console.warn("[favoriteService] Không thể tải danh sách thực đơn từ server:", err);
        }
        return this.getFavoriteMealPlans(userId);
    },
    /**
   * Get all saved meal plans for user
   */ getFavoriteMealPlans (userId) {
        return this.getUserFavorites(userId).mealPlans;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/recipes/services/priceService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_INGREDIENT_PRICES",
    ()=>DEFAULT_INGREDIENT_PRICES,
    "PRICE_WARNING_TEXT",
    ()=>PRICE_WARNING_TEXT,
    "PRICE_WARNING_TEXT_EN",
    ()=>PRICE_WARNING_TEXT_EN,
    "calculateIngredientCost",
    ()=>calculateIngredientCost,
    "priceService",
    ()=>priceService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage/storage.ts [app-client] (ecmascript)");
;
const DEFAULT_INGREDIENT_PRICES = {
    rice: {
        unit: "kg",
        price: 30000
    },
    tofu: {
        unit: "kg",
        price: 45000
    },
    "firm tofu": {
        unit: "kg",
        price: 45000
    },
    carrot: {
        unit: "kg",
        price: 25000
    },
    "rolled oats": {
        unit: "kg",
        price: 65000
    },
    oats: {
        unit: "kg",
        price: 65000
    },
    "peanut butter": {
        unit: "kg",
        price: 140000
    },
    peanuts: {
        unit: "kg",
        price: 70000
    },
    "crushed peanuts": {
        unit: "kg",
        price: 75000
    },
    banana: {
        unit: "pc",
        price: 4000
    },
    "almond milk": {
        unit: "liter",
        price: 55000
    },
    "soy milk": {
        unit: "liter",
        price: 30000
    },
    "organic soy milk": {
        unit: "liter",
        price: 35000
    },
    "oat milk": {
        unit: "liter",
        price: 45000
    },
    "chia seeds": {
        unit: "kg",
        price: 160000
    },
    blueberries: {
        unit: "kg",
        price: 220000
    },
    mango: {
        unit: "kg",
        price: 40000
    },
    "frozen mango": {
        unit: "kg",
        price: 45000
    },
    "coconut milk": {
        unit: "liter",
        price: 40000
    },
    "pumpkin seeds": {
        unit: "kg",
        price: 150000
    },
    "hemp seeds": {
        unit: "kg",
        price: 240000
    },
    "sunflower seeds": {
        unit: "kg",
        price: 110000
    },
    apple: {
        unit: "pc",
        price: 12000
    },
    "bok choy": {
        unit: "kg",
        price: 30000
    },
    spinach: {
        unit: "kg",
        price: 35000
    },
    mushrooms: {
        unit: "kg",
        price: 80000
    },
    tempeh: {
        unit: "kg",
        price: 95000
    },
    chickpeas: {
        unit: "kg",
        price: 70000
    },
    lentils: {
        unit: "kg",
        price: 65000
    },
    quinoa: {
        unit: "kg",
        price: 110000
    },
    broccoli: {
        unit: "kg",
        price: 45000
    },
    cucumber: {
        unit: "kg",
        price: 20000
    },
    tomato: {
        unit: "kg",
        price: 28000
    },
    avocado: {
        unit: "pc",
        price: 15000
    },
    "olive oil": {
        unit: "liter",
        price: 180000
    },
    "soy sauce": {
        unit: "liter",
        price: 40000
    },
    "maple syrup": {
        unit: "liter",
        price: 150000
    },
    cinnamon: {
        unit: "kg",
        price: 80000
    },
    egg: {
        unit: "pc",
        price: 3500
    },
    eggs: {
        unit: "pc",
        price: 3500
    },
    bread: {
        unit: "pc",
        price: 5000
    },
    toast: {
        unit: "pc",
        price: 5000
    },
    sourdough: {
        unit: "pc",
        price: 6000
    },
    garlic: {
        unit: "pc",
        price: 2000
    },
    onion: {
        unit: "pc",
        price: 4000
    }
};
const PRICE_WARNING_TEXT = "Giá chỉ mang tính ước tính. Chi phí thực tế có thể thay đổi tùy giá nguyên liệu, khu vực, thương hiệu, mùa vụ và nơi mua.";
const PRICE_WARNING_TEXT_EN = "Estimated price only. Actual cost may vary depending on ingredient prices, location, brand, season and quantity.";
// Helper to normalize ingredient lookup key
function normalizeName(name) {
    return name.toLowerCase().trim();
}
function calculateIngredientCost(name, quantityRaw, unitRaw, customUnitPrice) {
    const norm = normalizeName(name);
    const qty = typeof quantityRaw === "number" ? quantityRaw : parseFloat(String(quantityRaw)) || 0;
    const unit = unitRaw.toLowerCase().trim();
    // Find price definition or fallback
    let rule = DEFAULT_INGREDIENT_PRICES[norm];
    if (!rule) {
        const key = Object.keys(DEFAULT_INGREDIENT_PRICES).find((k)=>norm.includes(k) || k.includes(norm));
        if (key) {
            rule = DEFAULT_INGREDIENT_PRICES[key];
        } else {
            rule = {
                unit: "kg",
                price: 45000
            }; // Baseline ~45,000 VND / kg
        }
    }
    const unitPrice = customUnitPrice !== undefined && customUnitPrice > 0 ? customUnitPrice : rule.price;
    let factor = 1;
    if (unit === "g" || unit === "gram" || unit === "grams" || unit === "ml" || unit === "milliliter" || unit === "milliliters") {
        factor = qty / 1000;
    } else if (unit === "tbsp") {
        factor = qty * 15 / 1000;
    } else if (unit === "tsp") {
        factor = qty * 5 / 1000;
    } else if (unit === "kg" || unit === "liter" || unit === "l") {
        factor = qty;
    } else if (unit === "pc" || unit === "pcs" || unit === "piece" || unit === "pieces" || unit === "slice" || unit === "slices") {
        if (rule.unit === "pc") {
            factor = qty;
        } else {
            factor = qty * 0.08; // ~80g piece
        }
    } else if (unit === "clove" || unit === "cloves" || unit === "pinch") {
        factor = qty * 5 / 1000;
    } else {
        if (qty > 10) factor = qty / 1000;
        else factor = qty;
    }
    const cost = Math.max(500, Math.round(factor * unitPrice));
    return {
        cost,
        unitPrice
    };
}
const priceService = {
    calculateIngredientCost,
    /**
   * Calculates recipe estimated price summing all ingredient costs (Requirement 4)
   */ calculateRecipeCost (ingredients) {
        if (!ingredients || ingredients.length === 0) {
            return {
                estimatedCost: 18500,
                ingredientsWithCost: []
            };
        }
        let total = 0;
        const ingredientsWithCost = ingredients.map((ing)=>{
            const { cost, unitPrice } = calculateIngredientCost(ing.name, ing.quantity, ing.unit, ing.unitPrice);
            total += cost;
            return {
                ...ing,
                unitPrice: ing.unitPrice || unitPrice,
                cost
            };
        });
        // Round to nearest 500 VND
        const estimatedCost = Math.max(10000, Math.round(total / 500) * 500);
        return {
            estimatedCost,
            ingredientsWithCost
        };
    },
    /**
   * Formats estimated price with leading "~" (Requirement 5)
   */ formatEstimatedPrice (amount) {
        return `~${Math.round(amount).toLocaleString("vi-VN")} VNĐ`;
    },
    /**
   * Formats actual price (exact or customized by user)
   */ formatActualPrice (amount) {
        return `${Math.round(amount).toLocaleString("vi-VN")} VNĐ`;
    },
    /**
   * User custom recipe price management (Requirement 6)
   * Stored in localStorage by userId:
   * { [userId]: { [recipeId]: number } }
   */ getUserPrices (userId) {
        const safeId = userId || "1";
        const all = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPE_PRICES, {});
        if (all[safeId]) {
            return all[safeId];
        }
        return {};
    },
    getMyPrice (userId, recipeId) {
        const safeId = userId || "1";
        const userPrices = this.getUserPrices(safeId);
        return userPrices[recipeId];
    },
    async setMyPrice (userId, recipeId, actualPrice) {
        const safeId = userId || "1";
        if (!recipeId) return;
        const rounded = Math.max(0, Math.round(actualPrice));
        // 1. Lưu cục bộ cache
        const all = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPE_PRICES, {});
        if (!all[safeId]) {
            all[safeId] = {};
        }
        all[safeId][recipeId] = rounded;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPE_PRICES, all);
        // 2. Gửi API backend: PUT /users/me/recipe-prices/:recipeId
        const numericId = parseInt(recipeId.replace(/\D/g, ""), 10);
        if (!isNaN(numericId)) {
            try {
                const { ingredientApiService } = await __turbopack_context__.A("[project]/src/features/recipes/services/ingredientApiService.ts [app-client] (ecmascript, async loader)");
                await ingredientApiService.setMyRecipePrice(numericId, rounded);
            } catch (err) {
                console.warn("[priceService] Lưu giá lên server thất bại, đã lưu tạm cục bộ:", err);
            }
        }
    },
    async removeMyPrice (userId, recipeId) {
        const safeId = userId || "1";
        if (!recipeId) return;
        const all = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPE_PRICES, {});
        if (all[safeId] && all[safeId][recipeId]) {
            delete all[safeId][recipeId];
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPE_PRICES, all);
        }
        // Gửi API backend: DELETE /users/me/recipe-prices/:recipeId
        const numericId = parseInt(recipeId.replace(/\D/g, ""), 10);
        if (!isNaN(numericId)) {
            try {
                const { ingredientApiService } = await __turbopack_context__.A("[project]/src/features/recipes/services/ingredientApiService.ts [app-client] (ecmascript, async loader)");
                await ingredientApiService.removeMyRecipePrice(numericId);
            } catch (err) {
                console.warn("[priceService] Xóa giá trên server thất bại, đã xóa cục bộ:", err);
            }
        }
    },
    /**
   * Đồng bộ bảng giá cá nhân từ backend database
   * GET /users/me/recipe-prices
   */ async syncUserPricesFromServer (userId) {
        const safeId = userId || "1";
        try {
            const { ingredientApiService } = await __turbopack_context__.A("[project]/src/features/recipes/services/ingredientApiService.ts [app-client] (ecmascript, async loader)");
            const res = await ingredientApiService.getMyRecipePrices();
            const list = Array.isArray(res) ? res : res?.data || [];
            if (Array.isArray(list)) {
                const prices = {};
                for (const item of list){
                    const rId = String(item.recipe_id || item.recipeId);
                    prices[rId] = Number(item.actual_price ?? 0);
                }
                const all = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPE_PRICES, {});
                all[safeId] = {
                    ...all[safeId] || {},
                    ...prices
                };
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPE_PRICES, all);
                return all[safeId];
            }
        } catch (err) {
            console.warn("[priceService] Không thể đồng bộ giá từ server:", err);
        }
        return this.getUserPrices(safeId);
    },
    /**
   * Returns list of recipes with user custom prices for profile management
   */ getAllUserPricedRecipes (userId, recipes) {
        const prices = this.getUserPrices(userId);
        const result = [];
        for (const [recipeId, myPrice] of Object.entries(prices)){
            const recipe = recipes.find((r)=>r.id === recipeId);
            if (recipe && myPrice > 0) {
                const estimatedCost = recipe.estimatedCost || this.calculateRecipeCost(recipe.ingredients || []).estimatedCost;
                result.push({
                    recipe,
                    myPrice,
                    estimatedCost,
                    diff: myPrice - estimatedCost
                });
            }
        }
        return result;
    },
    /**
   * Resolves effective price: prioritizes user's My Price, falls back to Admin Estimated Price (Requirement 7)
   */ getEffectivePrice (recipe, userId) {
        const myPrice = userId ? this.getMyPrice(userId, recipe.id) : undefined;
        if (myPrice !== undefined && myPrice > 0) {
            return {
                price: myPrice,
                isCustom: true,
                formatted: this.formatActualPrice(myPrice)
            };
        }
        const estimated = recipe.estimatedCost || this.calculateRecipeCost(recipe.ingredients).estimatedCost;
        return {
            price: estimated,
            isCustom: false,
            formatted: this.formatEstimatedPrice(estimated)
        };
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
    // API Nutrition #1: GET /nutrition - Lấy danh sách dinh dưỡng các công thức
    getAllNutrition () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/nutrition");
    },
    // API Nutrition #2: GET /nutrition/:recipeId - Lấy thông tin dinh dưỡng của công thức
    getNutritionByRecipeId (recipeId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/nutrition/${recipeId}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/recipes/services/recipeService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recipeService",
    ()=>recipeService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$data$2f$mockRecipes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/data/mockRecipes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$utils$2f$checkRecipeAllergy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/allergy/utils/checkRecipeAllergy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/priceService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/recipeApiService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$utils$2f$recipeMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/utils/recipeMapper.ts [app-client] (ecmascript)");
;
;
;
;
;
;
function enrichRecipeDefaults(r) {
    const status = r.status || "APPROVED";
    const estimatedCost = r.estimatedCost || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].calculateRecipeCost(r.ingredients || []).estimatedCost;
    const source = r.source || {
        type: "admin",
        name: "VeggieHub Kitchen"
    };
    return {
        ...r,
        name: r.name || r.title,
        status,
        estimatedCost,
        source,
        allergens: r.allergens || []
    };
}
let isSyncingRecipes = false;
const recipeService = {
    /**
   * Đồng bộ tất cả công thức đã duyệt từ backend vào localStorage
   */ async syncRecipesFromApi () {
        if (isSyncingRecipes) return this.getRecipes();
        isSyncingRecipes = true;
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeApiService"].getRecipes({
                limit: 500
            });
            const items = Array.isArray(res) ? res : res?.data || res?.items;
            if (Array.isArray(items) && items.length > 0) {
                const mapped = items.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$utils$2f$recipeMapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBackendToFrontendRecipe"]).map(enrichRecipeDefaults);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPES, mapped);
                return mapped;
            }
        } catch (err) {
            console.error("Failed to sync recipes from backend:", err);
        } finally{
            isSyncingRecipes = false;
        }
        return this.getRecipes();
    },
    getRecipes (options) {
        const raw = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPES, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$data$2f$mockRecipes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_MOCK_RECIPES"]);
        const enriched = raw.map(enrichRecipeDefaults);
        // If local storage only has old mock recipes (rec-1), trigger background sync from API
        if (("TURBOPACK compile-time value", "object") !== "undefined" && !isSyncingRecipes && raw.some((r)=>r.id.startsWith("rec-"))) {
            this.syncRecipesFromApi().catch(()=>{});
        }
        if (options?.includeAll) {
            return enriched;
        }
        // Only APPROVED recipes are used in meal planning and standard discovery (Requirement 15, 26)
        return enriched.filter((r)=>r.status === "APPROVED");
    },
    getRecipeById (id) {
        const list = this.getRecipes({
            includeAll: true
        });
        const cleanId = String(id).trim();
        const numId = cleanId.replace(/\D/g, "");
        return list.find((r)=>{
            if (r.id === cleanId) return true;
            if (numId && String(r.id).replace(/\D/g, "") === numId) return true;
            return false;
        });
    },
    createRecipe (data) {
        const list = this.getRecipes({
            includeAll: true
        });
        const newId = data.id || `rec-${Date.now()}`;
        const cost = data.estimatedCost || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].calculateRecipeCost(data.ingredients || []).estimatedCost;
        const newRecipe = enrichRecipeDefaults({
            ...data,
            id: newId,
            name: data.name || data.title,
            estimatedCost: cost,
            status: data.status || "APPROVED",
            source: data.source || {
                type: "admin",
                name: "VeggieHub Kitchen"
            },
            allergens: data.allergens || [],
            duration: data.duration || `${(data.prepTime || 0) + (data.cookTime || 0)} min`,
            rating: data.rating || 5.0,
            views: data.views || "1.2k",
            author: data.author || "VeggieHub Member",
            authorInitials: data.authorInitials || "VH",
            verified: data.verified ?? true
        });
        const updated = [
            newRecipe,
            ...list
        ];
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPES, updated);
        return newRecipe;
    },
    updateRecipe (id, updates) {
        const list = this.getRecipes({
            includeAll: true
        });
        const index = list.findIndex((r)=>r.id === id);
        if (index === -1) {
            return {
                id,
                ...updates
            };
        }
        const current = list[index];
        const newIngredients = updates.ingredients || current.ingredients;
        const estimatedCost = updates.estimatedCost || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].calculateRecipeCost(newIngredients).estimatedCost;
        const updatedRecipe = enrichRecipeDefaults({
            ...current,
            ...updates,
            estimatedCost,
            duration: updates.duration || `${(updates.prepTime ?? current.prepTime) + (updates.cookTime ?? current.cookTime)} min`
        });
        list[index] = updatedRecipe;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPES, [
            ...list
        ]);
        return updatedRecipe;
    },
    deleteRecipe (id) {
        const list = this.getRecipes({
            includeAll: true
        });
        const filtered = list.filter((r)=>r.id !== id);
        if (filtered.length === list.length) return false;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPES, filtered);
        return true;
    },
    resetRecipes () {
        const enriched = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$data$2f$mockRecipes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_MOCK_RECIPES"].map(enrichRecipeDefaults);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECIPES, enriched);
        return enriched;
    },
    /**
   * Evaluates if a recipe matches a user's vegetarian dietary tier:
   * - vegan: only vegan
   * - lacto_vegetarian: vegan or lacto_vegetarian
   * - ovo_vegetarian: vegan or ovo_vegetarian
   * - lacto_ovo_vegetarian: vegan, lacto, ovo, or lacto_ovo
   */ isDietCompatible (recipeType, userType) {
        if (!userType) return true;
        if (userType === "vegan") return recipeType === "vegan";
        if (userType === "lacto_vegetarian") {
            return recipeType === "vegan" || recipeType === "lacto_vegetarian";
        }
        if (userType === "ovo_vegetarian") {
            return recipeType === "vegan" || recipeType === "ovo_vegetarian";
        }
        if (userType === "lacto_ovo_vegetarian") {
            return true;
        }
        return true;
    },
    /**
   * Filter recipes with complex criteria
   */ filterRecipes (recipes, filters, profile) {
        return recipes.filter((recipe)=>{
            // 1. Search Query
            if (filters.searchQuery?.trim()) {
                const q = filters.searchQuery.toLowerCase();
                const matchesTitle = recipe.title.toLowerCase().includes(q);
                const matchesAuthor = recipe.author?.toLowerCase().includes(q);
                const matchesCuisine = recipe.cuisine?.toLowerCase().includes(q);
                const matchesIngredient = recipe.ingredients.some((i)=>i.name.toLowerCase().includes(q));
                if (!matchesTitle && !matchesAuthor && !matchesCuisine && !matchesIngredient) {
                    return false;
                }
            }
            // 2. Category
            if (filters.category && filters.category !== "All") {
                if (!recipe.category.toLowerCase().includes(filters.category.toLowerCase())) {
                    return false;
                }
            }
            // 3. Meal Type (any khớp với cả lunch và dinner)
            if (filters.mealType && filters.mealType !== "all") {
                const target = filters.mealType.toLowerCase();
                const cur = (recipe.mealType || "").toLowerCase();
                const isMatch = cur === target || cur === "any" || target === "any" && (cur === "lunch" || cur === "dinner");
                if (!isMatch) {
                    return false;
                }
            }
            // 4. Vegetarian Type
            if (filters.vegetarianType && filters.vegetarianType !== "all") {
                if (!this.isDietCompatible(recipe.vegetarianType, filters.vegetarianType)) {
                    return false;
                }
            }
            // 5. Exclude Allergens
            if (profile && profile.allergies && profile.allergies.length > 0) {
                const check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$utils$2f$checkRecipeAllergy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkRecipeAllergy"])(recipe, profile);
                if (filters.excludeAllergens && check.hasAllergy) {
                    return false;
                }
            }
            // 6. Max Calories
            if (filters.maxCalories && recipe.calories > filters.maxCalories) {
                return false;
            }
            return true;
        });
    },
    /**
   * Smart Recipe Recommendation based on Profile + Calories + Allergies + Meal Type
   */ getRecommendations (profile, targetCalories, mealType) {
        const all = this.getRecipes(); // only approved recipes
        // 1. Strictly filter by Vegetarian Type and Allergen-Free
        const safeForUser = all.filter((r)=>{
            if (!this.isDietCompatible(r.vegetarianType, profile.vegetarianType)) {
                return false;
            }
            const allergyCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$utils$2f$checkRecipeAllergy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkRecipeAllergy"])(r, profile);
            return !allergyCheck.hasAllergy;
        });
        // 2. Filter by mealType if provided (any khớp với cả lunch và dinner)
        let candidates = mealType ? safeForUser.filter((r)=>{
            const target = mealType.toLowerCase();
            const cur = (r.mealType || "").toLowerCase();
            return cur === target || cur === "any" || target === "any" && (cur === "lunch" || cur === "dinner");
        }) : safeForUser;
        // Fallback to all safe if candidates empty for this specific mealType
        if (candidates.length === 0) {
            candidates = safeForUser;
        }
        // 3. Sort by proximity to target calories if provided
        if (targetCalories && targetCalories > 0) {
            candidates.sort((a, b)=>{
                const diffA = Math.abs(a.calories - targetCalories);
                const diffB = Math.abs(b.calories - targetCalories);
                return diffA - diffB;
            });
        }
        return candidates;
    },
    /**
   * Suggests compatible replacements for a specific meal slot (Requirement 3)
   * Prioritizes:
   * 1. Same meal type
   * 2. Compatible with vegetarian diet
   * 3. Allergen-free for user
   * 4. Calories close to original recipe
   * 5. Fits Daily Calorie Target and Nutrition Goal
   */ getReplacementSuggestions (originalRecipe, profile, targetMealCalories) {
        const all = this.getRecipes();
        // 1. Same meal type, exclude current recipe, match diet & allergens
        const eligible = all.filter((r)=>{
            const origType = (originalRecipe.mealType || "").toLowerCase();
            const candType = (r.mealType || "").toLowerCase();
            const isMealMatch = origType === candType || origType === "any" || candType === "any" || (origType === "lunch" || origType === "dinner") && (candType === "lunch" || candType === "dinner");
            if (!isMealMatch) return false;
            if (!this.isDietCompatible(r.vegetarianType, profile.vegetarianType)) return false;
            const allergy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$utils$2f$checkRecipeAllergy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkRecipeAllergy"])(r, profile);
            return !allergy.hasAllergy;
        });
        // If empty with same meal type, allow other safe recipes as fallback
        const pool = eligible.length > 0 ? eligible : all.filter((r)=>r.id !== originalRecipe.id && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$allergy$2f$utils$2f$checkRecipeAllergy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkRecipeAllergy"])(r, profile).hasAllergy);
        const refCalories = targetMealCalories || originalRecipe.calories;
        // Sort by calorie proximity to original recipe / meal target
        pool.sort((a, b)=>{
            const diffA = Math.abs(a.calories - refCalories);
            const diffB = Math.abs(b.calories - refCalories);
            return diffA - diffB;
        });
        return pool;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/recipes/services/recommendationService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recommendationService",
    ()=>recommendationService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
;
const recommendationService = {
    /**
   * Yêu cầu AI sinh gợi ý món ăn dựa trên tủ lạnh và hồ sơ dinh dưỡng
   * POST /users/me/recommendations/generate
   */ async generateRecommendations () {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/users/me/recommendations/generate");
    },
    /**
   * Lấy danh sách món ăn gợi ý cá nhân hóa
   * GET /users/me/recommendations
   */ async getRecommendations () {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/users/me/recommendations");
            if (Array.isArray(res)) return res;
        } catch (err) {
            console.warn("[recommendationService] Lỗi khi tải gợi ý từ server:", err);
        }
        return [];
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/recipes/utils/recipeMapper.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapBackendToFrontendRecipe",
    ()=>mapBackendToFrontendRecipe,
    "mapDietTypeToFrontend",
    ()=>mapDietTypeToFrontend
]);
function mapDietTypeToFrontend(dietType) {
    const dt = (dietType || "").toLowerCase();
    if (dt.includes("vegan") || dt === "thuần chay") return "vegan";
    if (dt.includes("lacto-ovo") || dt.includes("ovo-lacto") || dt === "lacto_ovo_vegetarian") return "lacto_ovo_vegetarian";
    if (dt.includes("lacto") || dt === "lacto_vegetarian") return "lacto_vegetarian";
    if (dt.includes("ovo") || dt === "ovo_vegetarian") return "ovo_vegetarian";
    return "vegan";
}
function mapBackendToFrontendRecipe(r) {
    const id = String(r.recipe_id || r.id || `rec-${Date.now()}`);
    const title = r.title || r.name || "Món chay ngon";
    const mealType = (r.meal_type || r.mealType || "lunch").toLowerCase();
    const vegetarianType = mapDietTypeToFrontend(r.diet_type || r.vegetarianType);
    const prepTime = Number(r.prep_time ?? r.prepTime ?? 10);
    const cookTime = Number(r.cook_time ?? r.cookTime ?? 15);
    const serving = Number(r.servings ?? r.serving ?? 1);
    // Nutrition
    const nut = r.nutrition || r.nutritionInfo || {};
    const protein = Math.round(Number(nut.protein ?? r.protein ?? 0) * 10) / 10;
    const carbs = Math.round(Number(nut.carbs ?? r.carbs ?? 0) * 10) / 10;
    const fat = Math.round(Number(nut.fat ?? r.fat ?? 0) * 10) / 10;
    const fiber = Math.round(Number(nut.fiber ?? r.fiber ?? 0) * 10) / 10;
    let rawCalories = nut.calories !== undefined && nut.calories !== null ? Number(nut.calories) : r.calories !== undefined && r.calories !== null ? Number(r.calories) : null;
    if (rawCalories === null || isNaN(rawCalories) || rawCalories <= 0) {
        const macroCalories = Math.round(protein * 4 + carbs * 4 + fat * 9);
        rawCalories = macroCalories > 0 ? macroCalories : 350;
    }
    const calories = Math.round(rawCalories);
    // Ingredients
    let ingredients = [];
    const rawIngredients = Array.isArray(r.recipeIngredients) ? r.recipeIngredients : Array.isArray(r.ingredients) ? r.ingredients : [];
    if (rawIngredients.length > 0) {
        ingredients = rawIngredients.map((item)=>{
            const ingredientObj = item.ingredient || {};
            const id = item.ingredient_id || ingredientObj.ingredient_id || item.id || ingredientObj.id || 1;
            const name = ingredientObj.ingredient_name || ingredientObj.name || item.ingredient_name || item.name || "Nguyên liệu";
            const quantity = Number(item.quantity ?? 1);
            const unit = item.unit || ingredientObj.unit || "g";
            const unitPrice = Number(ingredientObj.avg_price_per_unit || ingredientObj.price_per_unit || item.unitPrice || item.unit_price || item.price_per_unit || 0);
            const cost = Number(item.cost || (unitPrice > 0 ? Math.round(unitPrice * quantity) : 0));
            return {
                id,
                name,
                quantity,
                unit,
                unitPrice,
                cost
            };
        });
    }
    // Instructions
    let instructions = [];
    if (Array.isArray(r.instructions)) {
        instructions = r.instructions;
    } else if (typeof r.instructions === "string") {
        instructions = r.instructions.split("\n").map((s)=>s.trim()).filter(Boolean);
    }
    if (instructions.length === 0) {
        instructions = [
            "Chuẩn bị nguyên liệu",
            "Sơ chế và chế biến theo công thức",
            "Trình bày ra đĩa và thưởng thức"
        ];
    }
    // Category
    const category = r.recipeCategories?.[0]?.category?.name || r.category || "Món chính";
    // Status
    const status = (r.status === "pending_review" ? "PENDING_REVIEW" : r.status === "approved" ? "APPROVED" : r.status === "rejected" ? "REJECTED" : r.status === "draft" ? "DRAFT" : r.status || "APPROVED").toUpperCase();
    return {
        id,
        name: title,
        title,
        description: r.description || "Công thức món ăn thanh đạm, dinh dưỡng.",
        image: r.image_url || r.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        category,
        mealType,
        vegetarianType,
        prepTime,
        cookTime,
        serving,
        calories,
        protein,
        carbs,
        fat,
        fiber,
        ingredients,
        allergens: r.allergens || [],
        instructions,
        estimatedCost: Number(r.estimated_cost ?? r.estimatedCost ?? 0),
        status,
        source: r.source || {
            type: "admin",
            name: "VeggieHub Kitchen"
        },
        duration: `${prepTime + cookTime} min`,
        author: r.author || (r.user ? r.user.full_name || r.user.email : "VeggieHub Kitchen"),
        verified: true
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/videos/components/BookmarkButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookmarkButton",
    ()=>BookmarkButton,
    "FavoriteButton",
    ()=>FavoriteButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/favoriteService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/hooks/useProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage/storage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function BookmarkButton({ recipeId, initialSaved = false, onToggle, className = "", size = "md" }) {
    _s();
    const { profile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"])();
    const userId = String(profile?.id || "u1");
    const [isFav, setIsFav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BookmarkButton.useState": ()=>{
            if (recipeId) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].isRecipeFavorite(userId, recipeId);
            }
            return initialSaved;
        }
    }["BookmarkButton.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookmarkButton.useEffect": ()=>{
            if (!recipeId) return;
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].subscribe({
                "BookmarkButton.useEffect.unsubscribe": (event)=>{
                    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].FAVORITES) {
                        setIsFav(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].isRecipeFavorite(userId, recipeId));
                    }
                }
            }["BookmarkButton.useEffect.unsubscribe"]);
            return unsubscribe;
        }
    }["BookmarkButton.useEffect"], [
        recipeId,
        userId
    ]);
    const handleToggle = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        if (recipeId) {
            const updated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].toggleFavoriteRecipe(userId, recipeId);
            setIsFav(updated);
            onToggle?.(updated);
        } else {
            const next = !isFav;
            setIsFav(next);
            onToggle?.(next);
        }
    };
    const btnSize = size === "sm" ? "w-8 h-8 rounded-lg" : "w-9 h-9 rounded-xl";
    const iconSize = size === "sm" ? "w-4 h-4" : "w-[18px] h-[18px]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: handleToggle,
        "aria-label": isFav ? "Bỏ thích công thức" : "Thích công thức",
        title: isFav ? "Đã thích công thức (Click để bỏ thích)" : "Thích công thức (Lưu vào thực đơn yêu thích)",
        className: `${btnSize} bg-white/95 backdrop-blur flex items-center justify-center transition-all cursor-pointer hover:bg-white shadow-sm hover:scale-105 active:scale-95 ${isFav ? "text-rose-500" : "text-stone-600 hover:text-rose-500"} ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
            className: `${iconSize} transition-transform ${isFav ? "fill-rose-500 text-rose-500 scale-110" : ""}`,
            strokeWidth: 1.75
        }, void 0, false, {
            fileName: "[project]/src/features/videos/components/BookmarkButton.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/videos/components/BookmarkButton.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(BookmarkButton, "f1EWXl96z3ar59EOfG+izLQ7hRY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"]
    ];
});
_c = BookmarkButton;
const FavoriteButton = BookmarkButton;
var _c;
__turbopack_context__.k.register(_c, "BookmarkButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/videos/components/DurationChip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DurationChip",
    ()=>DurationChip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript) <export default as Play>");
;
;
function DurationChip({ duration, className = "", variant = "video" }) {
    const bgClass = variant === "hero" ? "bg-black/55 backdrop-blur px-3" : "bg-stone-900/70 backdrop-blur px-2.5";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `h-7 rounded-full inline-flex items-center gap-1 text-white text-[13px] font-semibold select-none ${bgClass} ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                className: "w-3 h-3 fill-current"
            }, void 0, false, {
                fileName: "[project]/src/features/videos/components/DurationChip.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: duration
            }, void 0, false, {
                fileName: "[project]/src/features/videos/components/DurationChip.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/videos/components/DurationChip.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = DurationChip;
var _c;
__turbopack_context__.k.register(_c, "DurationChip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/videos/components/VideoCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VideoCard",
    ()=>VideoCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$components$2f$DurationChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/components/DurationChip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$components$2f$BookmarkButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/components/BookmarkButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$components$2f$RecipeAllergyBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/components/RecipeAllergyBadge.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
function VideoCard({ video, title: titleProp, duration: durationProp, author: authorProp, views: viewsProp, imageUrl: imageUrlProp, id: idProp, className = "", showAllergyBadge = true }) {
    const title = video?.title ?? titleProp ?? "";
    const duration = video?.duration ?? durationProp ?? "";
    const author = video?.author ?? authorProp ?? "";
    const views = video?.views ?? viewsProp ?? "";
    const imageUrl = video?.image ?? imageUrlProp;
    const id = video?.id ?? idProp;
    const inner = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col group cursor-pointer ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-video w-full rounded-2xl overflow-hidden bg-stone-200",
                children: [
                    imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: imageUrl,
                        alt: title,
                        fill: true,
                        className: "object-cover group-hover:scale-105 transition-transform duration-300",
                        sizes: "(max-width: 1280px) 50vw, 25vw"
                    }, void 0, false, {
                        fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full flex items-center justify-center bg-stone-200 text-stone-400",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-10 h-10 stroke-current stroke-1 opacity-40",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: "2",
                                    y: "2",
                                    width: "20",
                                    height: "20",
                                    rx: "4"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "8.5",
                                    cy: "8.5",
                                    r: "1.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "m21 15-5-5L5 21"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-3 top-3 z-10 pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$components$2f$DurationChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DurationChip"], {
                            duration: duration,
                            variant: "video"
                        }, void 0, false, {
                            fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-3 top-3 z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$components$2f$BookmarkButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookmarkButton"], {
                            recipeId: id
                        }, void 0, false, {
                            fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex flex-col",
                children: [
                    showAllergyBadge && video && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$components$2f$RecipeAllergyBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecipeAllergyBadge"], {
                            recipe: video,
                            compact: true
                        }, void 0, false, {
                            fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-semibold text-stone-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-stone-500",
                        children: [
                            author,
                            " · ",
                            views
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/videos/components/VideoCard.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/videos/components/VideoCard.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
    if (id) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: `/videos/${id}`,
            children: inner
        }, void 0, false, {
            fileName: "[project]/src/features/videos/components/VideoCard.tsx",
            lineNumber: 106,
            columnNumber: 12
        }, this);
    }
    return inner;
}
_c = VideoCard;
var _c;
__turbopack_context__.k.register(_c, "VideoCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/videos/data/mockVideos.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RECIPE_FILTERS",
    ()=>RECIPE_FILTERS,
    "VIDEO_RECIPES",
    ()=>VIDEO_RECIPES
]);
const RECIPE_FILTERS = [
    "Tất cả",
    "Bánh & Đồ ăn vặt",
    "Món luộc & hấp",
    "Canh & Súp",
    "Cơm & Cháo",
    "Gỏi cuốn & Salad",
    "Bún, Miến & Phở",
    "Mâm cỗ chay",
    "Món kho & om",
    "Tráng miệng & Đồ uống",
    "Món xào & chiên giòn"
];
const VIDEO_RECIPES = [
    {
        id: "v1",
        title: "Crispy Sesame Garlic Tofu with Bok Choy",
        duration: "6:42",
        author: "Linh Nguyen",
        authorHandle: "@linh.greens",
        authorInitials: "LN",
        verified: true,
        views: "142K views",
        rating: 4.9,
        reviewsCount: "1.4K",
        kcal: 460,
        time: "25 min",
        difficulty: "Easy",
        cuisine: "Vietnamese",
        category: "Stir-Fried & Crispy",
        description: "Extra-crispy pan-seared tofu tossed in a savory garlic soy glaze with tender baby bok choy and toasted white sesame seeds.",
        ingredients: [
            {
                name: "Extra-firm tofu, pressed & cubed",
                amount: "400g"
            },
            {
                name: "Baby bok choy, halved",
                amount: "4 heads"
            },
            {
                name: "Garlic cloves, minced",
                amount: "4 cloves"
            },
            {
                name: "Tamari or low-sodium soy sauce",
                amount: "2 tbsp"
            },
            {
                name: "Pure maple syrup",
                amount: "1 tbsp"
            },
            {
                name: "Toasted sesame oil",
                amount: "1 tbsp"
            },
            {
                name: "Cornstarch for dusting",
                amount: "2 tbsp"
            },
            {
                name: "Toasted sesame seeds",
                amount: "1 tbsp"
            }
        ],
        steps: [
            "Press the block of extra-firm tofu for 15 minutes, cut into 2cm cubes, and lightly dust with cornstarch and a pinch of salt.",
            "Heat sesame oil in a wide skillet over medium-high heat. Sear tofu cubes until golden and crispy on all sides (about 8 minutes).",
            "Whisk tamari, minced garlic, and maple syrup in a small ramekin. Pour over the tofu cubes and toss quickly to caramelize.",
            "Steam baby bok choy in the same pan with 2 tablespoons of water for 2 minutes until bright vibrant green.",
            "Garnish with toasted sesame seeds and serve warm over steamed brown jasmine rice."
        ],
        aiSummary: {
            durationNote: "Speech-to-text generated in 1.2s from audio stream",
            keyIngredients: [
                "Tofu (400g)",
                "Bok choy (4 heads)",
                "Garlic (4 cloves)",
                "Tamari glaze"
            ],
            speechTranscript: "Chef emphasizes drying tofu thoroughly before dusting with cornstarch. Keep the pan hot to prevent sticking, and add the garlic sauce at the very end so it doesn't scorch."
        },
        comments: [
            {
                id: "c1",
                author: "Thao Vu",
                authorInitials: "TV",
                verified: true,
                content: "Made this for dinner tonight! The cornstarch crust makes the tofu outrageously crispy. Definitely saving to my weekly rotation.",
                timestamp: "2 hours ago",
                votes: 38
            },
            {
                id: "c2",
                author: "Marcus Chen",
                authorInitials: "MC",
                verified: false,
                content: "Substituted bok choy with gai lan and it turned out incredible. Thanks Linh!",
                timestamp: "5 hours ago",
                votes: 14
            }
        ]
    },
    {
        id: "v2",
        title: "Creamy Coconut Lime Noodle Soup",
        duration: "4:05",
        author: "Mai Tran",
        authorHandle: "@mai.bowls",
        authorInitials: "MT",
        verified: true,
        views: "89K views",
        rating: 4.8,
        reviewsCount: "820",
        kcal: 510,
        time: "20 min",
        difficulty: "Easy",
        cuisine: "Southeast Asian",
        category: "Noodles & Pho",
        description: "A warming fragrant broth infused with lemongrass, kaffir lime leaves, coconut milk, and rice vermicelli noodles topped with king oyster mushrooms.",
        ingredients: [
            {
                name: "Light coconut milk",
                amount: "400ml"
            },
            {
                name: "Vegetable broth",
                amount: "500ml"
            },
            {
                name: "Rice vermicelli noodles",
                amount: "200g"
            },
            {
                name: "King oyster mushrooms, sliced",
                amount: "150g"
            },
            {
                name: "Lemongrass stalks, bruised",
                amount: "2 stalks"
            },
            {
                name: "Kaffir lime leaves",
                amount: "3 leaves"
            },
            {
                name: "Fresh lime juice",
                amount: "2 tbsp"
            },
            {
                name: "Fresh red chili & cilantro",
                amount: "For garnish"
            }
        ],
        steps: [
            "Bruise lemongrass and tear lime leaves. Simmer gently in vegetable broth for 10 minutes to extract floral citrus oils.",
            "Add sliced king oyster mushrooms and pour in coconut milk. Bring to a gentle simmer on medium-low.",
            "Cook rice vermicelli separately according to package instructions, drain, and divide into two large ceramic bowls.",
            "Ladle hot fragrant broth over noodles, finish with fresh lime juice, sliced chili, and generous fresh herbs."
        ],
        aiSummary: {
            durationNote: "Speech-to-text generated in 0.9s from audio stream",
            keyIngredients: [
                "Coconut milk",
                "Lemongrass",
                "Rice noodles",
                "Oyster mushrooms"
            ],
            speechTranscript: "Mai notes to never boil coconut milk rapidly to keep the emulsion silky smooth. Always add lime juice off the heat to protect its bright aroma."
        },
        comments: [
            {
                id: "c3",
                author: "Sarah Jenkins",
                authorInitials: "SJ",
                content: "Comfort in a bowl! Perfect for rainy Saigon afternoons.",
                timestamp: "1 day ago",
                votes: 21
            }
        ]
    },
    {
        id: "v3",
        title: "Fresh Mango Mint Smoothie Bowl",
        duration: "2:44",
        author: "Chef An",
        authorHandle: "@an.vitality",
        authorInitials: "CA",
        verified: true,
        views: "64K views",
        rating: 4.7,
        reviewsCount: "540",
        kcal: 320,
        time: "10 min",
        difficulty: "Easy",
        cuisine: "Fusion",
        category: "Desserts & Drinks",
        description: "Thick tropical smoothie bowl made with frozen ripe mangoes, fresh garden mint, chia seeds, and coconut flakes.",
        ingredients: [
            {
                name: "Frozen ripe mango chunks",
                amount: "300g"
            },
            {
                name: "Frozen banana",
                amount: "1 medium"
            },
            {
                name: "Fresh mint leaves",
                amount: "8 leaves"
            },
            {
                name: "Soy or almond milk",
                amount: "80ml"
            },
            {
                name: "Chia seeds & toasted coconut",
                amount: "2 tbsp"
            }
        ],
        steps: [
            "Add frozen mango, frozen banana, mint leaves, and a splash of plant milk into a high-speed blender.",
            "Blend using the tamper until a thick soft-serve consistency forms.",
            "Scoop into chilled bowls and top with fresh mango slices, chia seeds, and fresh mint sprigs."
        ],
        aiSummary: {
            durationNote: "Speech-to-text generated in 0.7s from audio stream",
            keyIngredients: [
                "Mango",
                "Banana",
                "Mint",
                "Chia"
            ],
            speechTranscript: "Use as little liquid as possible to achieve thick smoothie bowl consistency that holds your toppings without sinking."
        },
        comments: []
    },
    {
        id: "v4",
        title: "Charred Broccoli Quinoa Protein Bowl",
        duration: "2:08",
        author: "GreenBites",
        authorHandle: "@greenbites.vn",
        authorInitials: "GB",
        verified: false,
        views: "115K views",
        rating: 4.8,
        reviewsCount: "980",
        kcal: 540,
        time: "25 min",
        difficulty: "Medium",
        cuisine: "Western Plant-Based",
        category: "Rolls & Salads",
        description: "Nutritious power bowl loaded with charred broccoli florets, tricolor quinoa, spicy chickpeas, and creamy lemon tahini drizzle.",
        ingredients: [
            {
                name: "Cooked tricolor quinoa",
                amount: "1.5 cups"
            },
            {
                name: "Broccoli head, cut into florets",
                amount: "1 large"
            },
            {
                name: "Cooked chickpeas, rinsed",
                amount: "1 cup"
            },
            {
                name: "Smoked paprika & cumin",
                amount: "1 tsp each"
            },
            {
                name: "Runny tahini",
                amount: "3 tbsp"
            },
            {
                name: "Lemon juice & warm water",
                amount: "To thin"
            }
        ],
        steps: [
            "Roast chickpeas and broccoli florets at 200°C (400°F) with smoked paprika and olive oil for 18 minutes until deeply charred.",
            "Whisk tahini with lemon juice, minced garlic, and warm water until pale and drizzlable.",
            "Assemble bowl with warm quinoa base, roasted vegetables, and a generous stream of lemon tahini sauce."
        ],
        aiSummary: {
            durationNote: "Speech-to-text generated in 0.8s from audio stream",
            keyIngredients: [
                "Quinoa",
                "Broccoli",
                "Chickpeas",
                "Tahini"
            ],
            speechTranscript: "Do not overcrowd the baking tray or broccoli will steam instead of caramelizing into crispy smoky florets."
        },
        comments: []
    },
    {
        id: "v5",
        title: "Vietnamese Lemongrass Braised Eggplant",
        duration: "5:15",
        author: "Linh Nguyen",
        authorHandle: "@linh.greens",
        authorInitials: "LN",
        verified: true,
        views: "98K views",
        rating: 4.9,
        reviewsCount: "750",
        kcal: 290,
        time: "20 min",
        difficulty: "Easy",
        cuisine: "Vietnamese",
        category: "Braised & Simmered",
        description: "Melt-in-your-mouth Asian eggplant slowly braised in caramelized soy, finely minced lemongrass, and crushed black pepper in an earthenware pot.",
        ingredients: [
            {
                name: "Asian long eggplants, cut in chunks",
                amount: "3 medium"
            },
            {
                name: "Minced lemongrass",
                amount: "3 tbsp"
            },
            {
                name: "Soy sauce & dark soy sauce",
                amount: "2 tbsp"
            },
            {
                name: "Coconut sugar",
                amount: "1 tbsp"
            },
            {
                name: "Crushed black peppercorns",
                amount: "1 tsp"
            }
        ],
        steps: [
            "Soak eggplant chunks in salted water for 10 minutes to prevent browning and reduce bitterness.",
            "Sauté fragrant minced lemongrass in oil until golden.",
            "Add drained eggplant, soy sauces, sugar, and 100ml water. Cover and simmer on low for 15 minutes until tender.",
            "Finish with freshly cracked black pepper and green scallion tops."
        ],
        aiSummary: {
            durationNote: "Speech-to-text generated in 1.1s from audio stream",
            keyIngredients: [
                "Eggplant",
                "Lemongrass",
                "Caramelized soy",
                "Black pepper"
            ],
            speechTranscript: "Slow braising in an earthenware pot retains maximum moisture and infuses sweet lemongrass deep into the eggplant center."
        },
        comments: []
    },
    {
        id: "v6",
        title: "Golden Turmeric Lentil Dahl",
        duration: "7:10",
        author: "Chef An",
        authorHandle: "@an.vitality",
        authorInitials: "CA",
        verified: true,
        views: "73K views",
        rating: 4.8,
        reviewsCount: "620",
        kcal: 380,
        time: "30 min",
        difficulty: "Easy",
        cuisine: "Indian Inspired",
        category: "Soups & Broths",
        description: "Creamy comforting red lentil stew gently spiced with fresh turmeric root, cumin seeds, garlic, and rich coconut cream.",
        ingredients: [
            {
                name: "Split red lentils, rinsed",
                amount: "1 cup"
            },
            {
                name: "Fresh turmeric root, grated",
                amount: "1 tbsp"
            },
            {
                name: "Ground cumin & coriander",
                amount: "1 tsp each"
            },
            {
                name: "Coconut milk",
                amount: "200ml"
            },
            {
                name: "Spinach leaves",
                amount: "2 big handfuls"
            }
        ],
        steps: [
            "Rinse split red lentils until the water runs clear.",
            "Sauté onions, ginger, and grated turmeric in a pot until deeply aromatic.",
            "Add lentils and 3 cups of water. Simmer for 20 minutes until tender and creamy.",
            "Stir in coconut milk and spinach until wilted. Serve with warm flatbread or brown rice."
        ],
        aiSummary: {
            durationNote: "Speech-to-text generated in 1.3s from audio stream",
            keyIngredients: [
                "Red lentils",
                "Turmeric",
                "Cumin",
                "Coconut cream"
            ],
            speechTranscript: "Using freshly grated turmeric root produces a vibrant golden hue and earthy warmth far superior to dried powder."
        },
        comments: []
    },
    {
        id: "v7",
        title: "Bánh Xèo Chay Nấm Rơm Giòn Rụm Chuẩn Vị",
        duration: "8:15",
        author: "Linh Nguyen",
        authorHandle: "@linh.greens",
        authorInitials: "LN",
        verified: true,
        views: "128K views",
        rating: 4.9,
        reviewsCount: "1.1K",
        kcal: 420,
        time: "30 min",
        difficulty: "Medium",
        cuisine: "Vietnamese",
        category: "Snacks & Pastries",
        description: "Bánh xèo giòn rụm với nhân nấm rơm, đậu xanh, giá đỗ và nước mắm chay chua ngọt chuẩn vị miền Tây.",
        ingredients: [
            {
                name: "Bột bánh xèo pha sẵn",
                amount: "300g"
            },
            {
                name: "Nấm rơm tươi",
                amount: "200g"
            },
            {
                name: "Giá đỗ & đậu xanh bở",
                amount: "150g"
            },
            {
                name: "Nước cốt dừa",
                amount: "100ml"
            },
            {
                name: "Rau sống, cải bẹ xanh",
                amount: "Ăn kèm"
            }
        ],
        steps: [
            "Khuấy bột bánh xèo với nước cốt dừa và hành lá cắt nhỏ.",
            "Xào sơ nấm rơm cho thơm rồi tráng bột thật mỏng trên chảo nóng.",
            "Cho giá đỗ, đậu xanh vào đậy nắp 2 phút cho rìa bánh giòn tan.",
            "Cuộn ăn cùng cải bẹ xanh và nước mắm chua ngọt."
        ],
        aiSummary: {
            durationNote: "Speech-to-text generated in 1.0s",
            keyIngredients: [
                "Bột bánh xèo",
                "Nấm rơm",
                "Đậu xanh",
                "Nước cốt dừa"
            ],
            speechTranscript: "Mẹo nhỏ để bánh giòn lâu là tráng lớp mỏng trên chảo thật nóng và dùng nước cốt dừa béo bùi."
        },
        comments: []
    },
    {
        id: "v8",
        title: "Nấm Đùi Gà & Rau Củ Hấp Gừng Chấm Chao",
        duration: "5:40",
        author: "Chef An",
        authorHandle: "@an.vitality",
        authorInitials: "CA",
        verified: true,
        views: "52K views",
        rating: 4.8,
        reviewsCount: "430",
        kcal: 260,
        time: "15 min",
        difficulty: "Easy",
        cuisine: "Vietnamese",
        category: "Boiled & Steamed",
        description: "Món thanh đạm giữ trọn vị ngọt tự nhiên của nấm đùi gà, bắp non và bông cải xanh hấp gừng sả thơm lừng.",
        ingredients: [
            {
                name: "Nấm đùi gà khía vảy rồng",
                amount: "300g"
            },
            {
                name: "Gừng tươi thái sợi & sả cây",
                amount: "3 củ"
            },
            {
                name: "Bắp non & đậu bắp",
                amount: "200g"
            },
            {
                name: "Chao môn pha ớt cay",
                amount: "3 muỗng"
            }
        ],
        steps: [
            "Xếp sả và gừng thái sợi lót dưới đáy xửng hấp.",
            "Đặt nấm đùi gà và rau củ lên trên, hấp cách thủy trong 10 phút.",
            "Pha chao môn cùng chút đường và ớt tươi làm nước chấm đậm đà."
        ],
        aiSummary: {
            durationNote: "Speech-to-text generated in 0.8s",
            keyIngredients: [
                "Nấm đùi gà",
                "Gừng tươi",
                "Rau củ",
                "Chao môn"
            ],
            speechTranscript: "Hấp giúp nấm giữ nguyên độ giòn ngọt mọng nước mà không hề ngấy dầu mỡ."
        },
        comments: []
    },
    {
        id: "v9",
        title: "Cơm Chiên Trái Thơm Hạt Sen Hoàng Gia",
        duration: "6:20",
        author: "Mai Tran",
        authorHandle: "@mai.bowls",
        authorInitials: "MT",
        verified: true,
        views: "95K views",
        rating: 4.9,
        reviewsCount: "810",
        kcal: 510,
        time: "25 min",
        difficulty: "Easy",
        cuisine: "Vietnamese",
        category: "Rice & Congee",
        description: "Cơm chiên vàng óng đựng trong nửa quả dứa với hạt sen bùi bùi, đậu Hà Lan, cà rốt và nấm đông cô thơm phức.",
        ingredients: [
            {
                name: "Cơm nguội ráo hạt",
                amount: "3 chén"
            },
            {
                name: "Nửa quả dứa khoét ruột",
                amount: "1 quả"
            },
            {
                name: "Hạt sen Huế luộc chín",
                amount: "100g"
            },
            {
                name: "Nấm đông cô & cà rốt thái hạt lựu",
                amount: "150g"
            }
        ],
        steps: [
            "Xào thơm nấm đông cô, cà rốt và hạt sen với dầu hào chay.",
            "Cho cơm vào đảo lửa lớn đến khi hạt cơm săn bóng.",
            "Trộn dứa cắt hạt lựu vào đảo nhanh tay rồi múc vào vỏ quả dứa thưởng thức."
        ],
        aiSummary: {
            durationNote: "Speech-to-text generated in 1.1s",
            keyIngredients: [
                "Cơm hạt",
                "Hạt sen",
                "Trái thơm",
                "Nấm đông cô"
            ],
            speechTranscript: "Chỉ cho dứa vào cuối cùng để cơm không bị ra nước và giữ được độ thơm ngọt giòn sần sật."
        },
        comments: []
    },
    {
        id: "v10",
        title: "Lẩu Nấm Thập Cẩm Chay Đậm Đà Thanh Ngọt",
        duration: "9:45",
        author: "Linh Nguyen",
        authorHandle: "@linh.greens",
        authorInitials: "LN",
        verified: true,
        views: "165K views",
        rating: 5.0,
        reviewsCount: "1.6K",
        kcal: 480,
        time: "40 min",
        difficulty: "Medium",
        cuisine: "Vietnamese",
        category: "Mixed Vegan Platters",
        description: "Nồi lẩu nấm ấm cúng với nước dùng hầm từ mía lau, táo đỏ, lê ngọt cùng 8 loại nấm tươi và tàu hũ ky chiên giòn.",
        ingredients: [
            {
                name: "Nước dùng củ quả (mía, lê, bắp ngọt)",
                amount: "1.5 lít"
            },
            {
                name: "Nấm kim châm, linh chi, đùi gà, đông cô",
                amount: "500g"
            },
            {
                name: "Đậu hũ non & váng đậu giòn",
                amount: "200g"
            },
            {
                name: "Mì trứng chay hoặc bún tươi",
                amount: "Ăn kèm"
            }
        ],
        steps: [
            "Hầm mía lau, lê và bắp ngọt 30 phút lấy nước dùng thanh tao.",
            "Bày các loại nấm sạch và tàu hũ ra đĩa lớn.",
            "Nêm chút muối hồng và nước tương hảo hạng rồi nhúng nấm nóng hổi."
        ],
        aiSummary: {
            durationNote: "Speech-to-text generated in 1.2s",
            keyIngredients: [
                "Nước dùng củ quả",
                "Thập cẩm nấm",
                "Tàu hũ",
                "Táo đỏ"
            ],
            speechTranscript: "Nước dùng hoàn toàn tự nhiên không cần mì chính nhờ vị ngọt tiết ra từ mía lau và quả lê tươi."
        },
        comments: []
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/videos/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/data/mockVideos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$services$2f$videoService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/services/videoService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$components$2f$VideoCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/components/VideoCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$components$2f$BookmarkButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/components/BookmarkButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$components$2f$DurationChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/components/DurationChip.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/videos/services/videoService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "videoService",
    ()=>videoService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/data/mockVideos.ts [app-client] (ecmascript)");
;
const videoService = {
    getVideoRecipes () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_RECIPES"];
    },
    getVideoById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_RECIPES"].find((v)=>v.id === id);
    },
    getRecipeFilters () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RECIPE_FILTERS"];
    },
    getTrendingVideos (limit = 6) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_RECIPES"].slice(0, limit);
    },
    searchVideos (query) {
        const q = (query || "").toLowerCase().trim();
        if (!q) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_RECIPES"];
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_RECIPES"].filter((v)=>v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q) || v.cuisine.toLowerCase().includes(q) || v.category.toLowerCase().includes(q) || v.ingredients.some((ing)=>ing.name.toLowerCase().includes(q)));
    },
    filterByCategory (category) {
        if (!category || category === "All") return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_RECIPES"];
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_RECIPES"].filter((v)=>v.category === category);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/videos/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_features_0-5w9-9._.js.map
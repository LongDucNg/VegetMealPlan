(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/src/features/recipes/components/UpdatePriceModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UpdatePriceModal",
    ()=>UpdatePriceModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.mjs [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.mjs [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/priceService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/hooks/useProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$ingredientApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/ingredientApiService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function UpdatePriceModal({ recipe, isOpen, onClose, onSaved }) {
    _s();
    const { profile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"])();
    const userId = String(profile.id || "u1");
    const [priceInput, setPriceInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [successMsg, setSuccessMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UpdatePriceModal.useEffect": ()=>{
            if (recipe && isOpen) {
                queueMicrotask({
                    "UpdatePriceModal.useEffect": ()=>{
                        const currentMyPrice = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getMyPrice(userId, recipe.id);
                        setPriceInput(currentMyPrice ? String(currentMyPrice) : "");
                        setSuccessMsg(false);
                    }
                }["UpdatePriceModal.useEffect"]);
            }
        }
    }["UpdatePriceModal.useEffect"], [
        recipe,
        userId,
        isOpen
    ]);
    if (!isOpen || !recipe) return null;
    const estimatedCost = recipe.estimatedCost || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].calculateRecipeCost(recipe.ingredients || []).estimatedCost;
    const currentMyPrice = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].getMyPrice(userId, recipe.id);
    const handleSave = async (e)=>{
        e.preventDefault();
        const parsed = parseInt(priceInput.replace(/\D/g, ""), 10);
        if (isNaN(parsed) || parsed <= 0) {
            alert("Vui lòng nhập số tiền hợp lệ (lớn hơn 0 VNĐ).");
            return;
        }
        const numericId = parseInt(recipe.id.replace(/\D/g, ""), 10);
        if (!isNaN(numericId)) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$ingredientApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ingredientApiService"].setMyRecipePrice(numericId, parsed);
            } catch (err) {
                console.warn("Failed to set price on server:", err);
            }
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].setMyPrice(userId, recipe.id, parsed);
        setSuccessMsg(true);
        setTimeout(()=>{
            onSaved?.();
            onClose();
        }, 400);
    };
    const handleResetToAdmin = async ()=>{
        const numericId = parseInt(recipe.id.replace(/\D/g, ""), 10);
        if (!isNaN(numericId)) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$ingredientApiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ingredientApiService"].removeMyRecipePrice(numericId);
            } catch (err) {
                console.warn("Failed to delete price on server:", err);
            }
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].removeMyPrice(userId, recipe.id);
        setPriceInput("");
        setSuccessMsg(true);
        setTimeout(()=>{
            onSaved?.();
            onClose();
        }, 400);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/60",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-serif font-bold text-base text-stone-900",
                                            children: "Cập nhật giá thực tế"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-stone-500",
                                            children: "Giá mua nguyên liệu theo thực tế chi tiêu của bạn"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSave,
                    className: "p-6 space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-semibold text-stone-900 text-sm line-clamp-1",
                                    children: recipe.name || recipe.title
                                }, void 0, false, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mt-2 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-stone-500 block text-[10px]",
                                                    children: "Ước tính mẫu:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-stone-800",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].formatEstimatedPrice(estimatedCost)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                            lineNumber: 124,
                                            columnNumber: 15
                                        }, this),
                                        currentMyPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-900",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-emerald-700 block text-[10px]",
                                                    children: "Giá hiện tại của bạn:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceService"].formatActualPrice(currentMyPrice)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$priceService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRICE_WARNING_TEXT"]
                                }, void 0, false, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-xs font-semibold text-stone-700 mb-1.5",
                                    children: "Giá thực tế của bạn (VNĐ):"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            step: "500",
                                            min: "1000",
                                            placeholder: "Ví dụ: 22000",
                                            value: priceInput,
                                            onChange: (e)=>setPriceInput(e.target.value),
                                            className: "w-full h-11 px-4 rounded-xl border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-900 focus:bg-white focus:border-emerald-600 outline-none",
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400",
                                            children: "VNĐ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-stone-400 mt-1",
                                    children: "Dữ liệu này được lưu riêng cho bạn và không ảnh hưởng đến người dùng khác."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this),
                        successMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-4 h-4 text-emerald-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 174,
                                    columnNumber: 15
                                }, this),
                                "Đã cập nhật giá cá nhân thành công!"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-3 pt-2",
                            children: [
                                currentMyPrice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleResetToAdmin,
                                    className: "h-10 px-3.5 rounded-xl border border-stone-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer",
                                    title: "Khôi phục về giá ước tính mặc định",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                            lineNumber: 188,
                                            columnNumber: 17
                                        }, this),
                                        "Dùng giá mẫu"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 192,
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
                                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer",
                                            children: "Lưu Giá Của Tôi"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                            lineNumber: 203,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
            lineNumber: 93,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/recipes/components/UpdatePriceModal.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_s(UpdatePriceModal, "fzBuyDRIdo5Qt2r56vaEPJPvSyo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"]
    ];
});
_c = UpdatePriceModal;
var _c;
__turbopack_context__.k.register(_c, "UpdatePriceModal");
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
    // API Export: GET /recipes/export - Xuất dữ liệu công thức ra file CSV
    exportRecipes (params) {
        return __turbopack_context__.A("[project]/src/features/admin/services/adminRecipeApiService.ts [app-client] (ecmascript, async loader)").then((m)=>m.adminRecipeApiService.exportRecipes(params));
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
            throw new Error(`Recipe with id "${id}" not found.`);
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
    const categoriesList = [];
    if (Array.isArray(r.categories)) {
        categoriesList.push(...r.categories.filter(Boolean));
    }
    if (Array.isArray(r.recipeCategories)) {
        for (const rc of r.recipeCategories){
            const name = rc.category?.category_name || rc.category?.name || rc.category_name;
            if (name && !categoriesList.includes(name)) {
                categoriesList.push(name);
            }
        }
    }
    const rawCat = typeof r.category === "string" ? r.category : r.category?.category_name;
    if (rawCat && !categoriesList.includes(rawCat)) {
        categoriesList.push(rawCat);
    }
    const category = categoriesList.length > 0 ? categoriesList[0] : rawCat || "Món chính";
    // Status
    const status = (r.status === "pending_review" ? "PENDING_REVIEW" : r.status === "approved" ? "APPROVED" : r.status === "rejected" ? "REJECTED" : r.status === "draft" ? "DRAFT" : r.status || "APPROVED").toUpperCase();
    return {
        id,
        name: title,
        title,
        description: r.description || "Công thức món ăn thanh đạm, dinh dưỡng.",
        image: r.image_url || r.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        category,
        categories: categoriesList.length > 0 ? categoriesList : [
            category
        ],
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
]);

//# sourceMappingURL=src_features_recipes_0-8vwg6._.js.map
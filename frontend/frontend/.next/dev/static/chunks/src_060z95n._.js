(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/admin/recipes/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminRecipesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LockedState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/LockedState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/context/RoleContext.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/RoleContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$admin$2f$recipes$2f$components$2f$AdminRecipeManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/admin/recipes/components/AdminRecipeManagement.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function AdminRecipesPage() {
    _s();
    const { isGuest, isMember, ready } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppShell"], {
        showRightRail: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1240px] mx-auto w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    eyebrow: "Quản trị hệ thống",
                    title: "Quản trị Công thức",
                    subtitle: "Thêm mới, chỉnh sửa, xem chi tiết và quản lý công thức món ăn. Dữ liệu đồng bộ trực tiếp tới kế hoạch thực đơn và trợ lý AI dinh dưỡng."
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/recipes/page.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                !ready ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LockedState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GatedSkeleton"], {}, void 0, false, {
                    fileName: "[project]/src/app/admin/recipes/page.tsx",
                    lineNumber: 22,
                    columnNumber: 11
                }, this) : isGuest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LockedState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LockedState"], {
                    reason: "guest"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/recipes/page.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, this) : isMember ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LockedState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LockedState"], {
                    reason: "forbidden"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/recipes/page.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$admin$2f$recipes$2f$components$2f$AdminRecipeManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminRecipeManagement"], {}, void 0, false, {
                    fileName: "[project]/src/app/admin/recipes/page.tsx",
                    lineNumber: 28,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/recipes/page.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/admin/recipes/page.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(AdminRecipesPage, "zWYJ+ciz0acA1esHXEI4xAPSPwI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"]
    ];
});
_c = AdminRecipesPage;
var _c;
__turbopack_context__.k.register(_c, "AdminRecipesPage");
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

//# sourceMappingURL=src_060z95n._.js.map
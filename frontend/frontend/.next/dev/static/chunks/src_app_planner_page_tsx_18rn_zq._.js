(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/planner/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlannerPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LockedState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/LockedState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/context/RoleContext.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/RoleContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$hooks$2f$useMealPlanner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/hooks/useMealPlanner.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MealCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/MealCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$NutritionGoalBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/NutritionGoalBanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$DailyMacroSummary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/DailyMacroSummary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MonthlyCalendarView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/MonthlyCalendarView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MealReplacementModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/MealReplacementModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$components$2f$UpdatePriceModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/components/UpdatePriceModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$FavoritesModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/FavoritesModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$PlanForSomeoneElseModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/PlanForSomeoneElseModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$SaveMealPlanModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/SaveMealPlanModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$GenerationSettingsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/meal-planner/components/GenerationSettingsModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$hooks$2f$useSubscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/subscription/hooks/useSubscription.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$components$2f$PremiumUpgradeModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/subscription/components/PremiumUpgradeModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$components$2f$ProfileEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/components/ProfileEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.mjs [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/utensils-crossed.mjs [app-client] (ecmascript) <export default as UtensilsCrossed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.mjs [app-client] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.mjs [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
;
function PlannerContent() {
    _s();
    const { hasGenerated, planType, setPlanType, weeklyPlan, monthlyPlan, activeDay, activeDayIndex, setActiveDayIndex, nutritionSummary, isGenerating, generationFeedback, profileChangedNotice, activeProfile, isPlanForSomeoneElse, setIsPlanForSomeoneElse, someoneElseProfile, setSomeoneElseProfile, budgetLimit, setBudgetLimit, selectedMonth, selectedYear, generateWeekly, generateMonthly, replaceMeal, regenerateSingleDay, saveCurrentMealPlan, loadSavedPlan, applyFavoriteDayPlan } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$hooks$2f$useMealPlanner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMealPlanner"])();
    const { isPremium, purchase, toggle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$hooks$2f$useSubscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"])();
    // Modals state
    const [showProfileDrawer, setShowProfileDrawer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showUpgradeModal, setShowUpgradeModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSettingsModal, setShowSettingsModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFavoritesModal, setShowFavoritesModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSomeoneElseModal, setShowSomeoneElseModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSavePlanModal, setShowSavePlanModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Single meal replace state
    const [replacingSlot, setReplacingSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Update user price modal state
    const [pricingRecipe, setPricingRecipe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Check premium gating helper
    const requirePremium = (action)=>{
        if (!isPremium) {
            setShowUpgradeModal(true);
        } else {
            action();
        }
    };
    // Generate Weekly Plan action
    const handleGenerateWeekly = (opts)=>{
        if (!nutritionSummary.isProfileComplete && !isPlanForSomeoneElse) {
            setShowProfileDrawer(true);
            return;
        }
        requirePremium(()=>{
            generateWeekly({
                budgetLimit,
                ...opts
            });
        });
    };
    // Generate Monthly Plan action (Requirement 18, 20)
    const handleGenerateMonthly = (opts)=>{
        if (!nutritionSummary.isProfileComplete && !isPlanForSomeoneElse) {
            setShowProfileDrawer(true);
            return;
        }
        requirePremium(()=>{
            generateMonthly(selectedMonth, selectedYear, {
                budgetLimit,
                ...opts
            });
        });
    };
    // Open replace modal for an individual meal (Requirement 3)
    const handleOpenReplace = (recipe, slot)=>{
        requirePremium(()=>{
            setReplacingSlot({
                slot,
                recipe
            });
        });
    };
    // Execute replace
    const handleSelectReplacement = (newRecipe)=>{
        if (!replacingSlot) return;
        replaceMeal(activeDayIndex, replacingSlot.slot, newRecipe);
        setReplacingSlot(null);
    };
    const handleUpgradeSuccess = ()=>{
        purchase("premium");
        setShowUpgradeModal(false);
        setTimeout(()=>{
            generateWeekly();
        }, 200);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            isPremium ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200/90 rounded-2xl px-4 py-2.5 text-xs text-emerald-950 shadow-2xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base leading-none"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-emerald-900 flex items-center gap-1.5",
                                children: "Gói Premium đang hoạt động"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-emerald-700 font-medium",
                                children: "· 99.000 VNĐ / tháng"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline text-emerald-600/80",
                                children: "(Đã mở khóa toàn bộ tính năng cá nhân hóa thực đơn, kế hoạch tháng và đổi món)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 self-end sm:self-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>toggle(),
                            className: "text-[11px] font-medium text-emerald-800 hover:text-red-700 underline underline-offset-2 transition-colors cursor-pointer",
                            title: "Nhấn để chuyển sang gói Miễn phí (kiểm thử)",
                            children: "[Thử nghiệm: Về gói Thường]"
                        }, void 0, false, {
                            fileName: "[project]/src/app/planner/page.tsx",
                            lineNumber: 168,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 155,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-50 border border-stone-200/90 rounded-2xl px-4 py-2.5 text-xs text-stone-700 shadow-2xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base leading-none"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-stone-900",
                                children: "Gói Miễn phí"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 181,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-stone-500",
                                children: "· Tính năng cơ bản"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline text-stone-400",
                                children: "(Tạo thực đơn cá nhân hóa Tuần & Tháng yêu cầu gói Premium)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 self-end sm:self-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowUpgradeModal(true),
                                className: "px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "w-3.5 h-3.5 fill-amber-950"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this),
                                    "Nâng cấp Premium (99.000 VNĐ / tháng)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>toggle(),
                                className: "text-[11px] text-stone-400 hover:text-stone-700 underline cursor-pointer",
                                title: "Nhấn để mở khóa Premium ngay lập tức (kiểm thử)",
                                children: "[Thử nghiệm: Mở Premium]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 178,
                columnNumber: 9
            }, this),
            isPlanForSomeoneElse && someoneElseProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between bg-violet-50 border border-violet-200 rounded-2xl px-4 py-2.5 text-xs text-violet-950",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                className: "w-4 h-4 text-violet-700"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 213,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Đang lên kế hoạch cho: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: someoneElseProfile.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 38
                                    }, this),
                                    " (",
                                    someoneElseProfile.age,
                                    " tuổi, ",
                                    someoneElseProfile.weight,
                                    "kg, ",
                                    someoneElseProfile.height,
                                    "cm · ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVegetarianType"])(someoneElseProfile.vegetarianType),
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowSomeoneElseModal(true),
                                className: "font-bold text-violet-800 underline hover:text-violet-950 cursor-pointer",
                                children: "Chỉnh sửa"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsPlanForSomeoneElse(false),
                                className: "text-stone-500 hover:text-stone-800 underline cursor-pointer",
                                children: "Đặt lại về bản thân"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 211,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$NutritionGoalBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NutritionGoalBanner"], {
                nutrition: nutritionSummary,
                profile: activeProfile,
                onCompleteProfile: ()=>{
                    if (isPlanForSomeoneElse) {
                        setShowSomeoneElseModal(true);
                    } else {
                        setShowProfileDrawer(true);
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            profileChangedNotice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-amber-50 border border-amber-200 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950 animate-in fade-in shadow-2xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                className: "w-4 h-4 text-amber-600 shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold",
                                        children: "Hồ sơ dinh dưỡng của bạn đã thay đổi."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-amber-800",
                                        children: "Hãy tạo lại thực đơn để áp dụng mức calo mới, chế độ ăn chay hoặc cập nhật dị ứng."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "sm",
                        onClick: ()=>planType === "monthly" ? handleGenerateMonthly() : handleGenerateWeekly(),
                        className: "bg-amber-600 hover:bg-amber-700 text-white font-bold h-9 px-4 rounded-xl cursor-pointer self-end sm:self-auto shrink-0 shadow-2xs",
                        children: "Tạo lại thực đơn"
                    }, void 0, false, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 265,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 255,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "w-4 h-4 text-emerald-700"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif font-bold text-lg text-stone-900",
                                        children: "Kế hoạch Thực đơn chay Cá nhân hóa"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this),
                                    !isPremium && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300",
                                        children: "Premium"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 281,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-stone-500 mt-1 max-w-xl leading-relaxed",
                                children: [
                                    "Tạo thực đơn chay cân bằng dinh dưỡng phù hợp với",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "text-stone-700",
                                        children: [
                                            "mục tiêu ",
                                            nutritionSummary.dailyCalorieTarget.toLocaleString(),
                                            " kcal của ",
                                            activeProfile.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 294,
                                        columnNumber: 13
                                    }, this),
                                    ", trường phái ăn chay và dị ứng thực phẩm."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this),
                            generationFeedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold text-emerald-700 mt-1.5 flex items-center gap-1.5 animate-in fade-in",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this),
                                    generationFeedback
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2.5 self-start sm:self-center shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 bg-stone-50 hover:bg-stone-100/90 border border-stone-200/90 rounded-2xl px-3 py-1.5 shadow-2xs transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 311,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-stone-500 uppercase tracking-wider",
                                                children: "Ngân sách:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 313,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        placeholder: "Không giới hạn",
                                                        value: budgetLimit ?? "",
                                                        onChange: (e)=>{
                                                            const val = e.target.value ? Number(e.target.value) : undefined;
                                                            setBudgetLimit(val);
                                                        },
                                                        className: "w-28 text-xs font-bold text-stone-900 bg-transparent outline-none placeholder:text-stone-400 placeholder:font-normal",
                                                        step: "50000",
                                                        min: "50000"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/planner/page.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-semibold text-stone-500",
                                                        children: "VNĐ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/planner/page.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 17
                                                    }, this),
                                                    budgetLimit !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setBudgetLimit(undefined),
                                                        className: "text-stone-400 hover:text-stone-700 text-xs px-1 font-bold cursor-pointer",
                                                        title: "Xoá giới hạn ngân sách (Không giới hạn)",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/planner/page.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 316,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 312,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "soft",
                                size: "sm",
                                onClick: ()=>setShowFavoritesModal(true),
                                className: "h-10 px-3.5 rounded-xl border-stone-200 text-stone-700 hover:border-rose-300 hover:text-rose-700 flex items-center gap-1.5 text-xs cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        className: "w-3.5 h-3.5 text-rose-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Món yêu thích"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 351,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "soft",
                                size: "sm",
                                onClick: ()=>setShowSettingsModal(true),
                                className: "h-10 px-3.5 rounded-xl border-stone-200 text-stone-700 flex items-center gap-1.5 text-xs cursor-pointer",
                                title: "Tuỳ chỉnh chi tiết thực đơn & ngân sách",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                        className: "w-3.5 h-3.5 text-stone-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 361,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Cài đặt"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 362,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 354,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "md",
                                onClick: ()=>handleGenerateWeekly(),
                                disabled: isGenerating,
                                className: `h-11 px-5 rounded-2xl font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer ${hasGenerated && planType === "weekly" ? "bg-emerald-800 text-white" : "bg-emerald-700 hover:bg-emerald-800 text-white"}`,
                                children: [
                                    isGenerating && planType === "weekly" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 376,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 378,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tạo Kế Hoạch Tuần"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 380,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "md",
                                onClick: ()=>handleGenerateMonthly(),
                                disabled: isGenerating,
                                className: `h-11 px-5 rounded-2xl font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer ${hasGenerated && planType === "monthly" ? "bg-stone-900 text-white" : "bg-stone-800 hover:bg-stone-900 text-white"}`,
                                children: [
                                    isGenerating && planType === "monthly" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 394,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "w-3.5 h-3.5 text-amber-300"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 396,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tạo Kế Hoạch Tháng"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 398,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            !hasGenerated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-8 sm:p-12 text-center bg-white border border-stone-200/90 rounded-3xl space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__["UtensilsCrossed"], {
                            className: "w-8 h-8"
                        }, void 0, false, {
                            fileName: "[project]/src/app/planner/page.tsx",
                            lineNumber: 409,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 408,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-md mx-auto space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-serif font-bold text-xl text-stone-900",
                                children: "Thực đơn của bạn chưa được tạo."
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 412,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-stone-500 leading-relaxed",
                                children: "Tạo thực đơn cá nhân hóa dựa trên hồ sơ dinh dưỡng, mục tiêu calo theo BMI, sở thích ăn chay và loại trừ dị ứng thực phẩm của bạn."
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 415,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 411,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-center gap-3 pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>handleGenerateWeekly(),
                                className: "h-11 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                        className: "w-4 h-4 text-emerald-200"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tạo Kế Hoạch Tuần (7 Ngày)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 426,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 421,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>handleGenerateMonthly(),
                                className: "h-11 px-6 rounded-2xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "w-4 h-4 text-amber-300"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 433,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tạo Kế Hoạch Tháng (Lịch)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 434,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 429,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "soft",
                                onClick: ()=>setShowFavoritesModal(true),
                                className: "h-11 px-5 rounded-2xl border-stone-200 text-stone-700 hover:border-emerald-300 font-bold text-xs cursor-pointer flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        className: "w-3.5 h-3.5 text-rose-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 442,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tạo Từ Món Yêu Thích"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 443,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 437,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 420,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 407,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    (budgetLimit || (planType === "weekly" ? weeklyPlan?.budgetLimit : monthlyPlan?.budgetLimit)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-emerald-50/70 border border-emerald-200/90 rounded-2xl text-xs text-emerald-950 animate-in fade-in shadow-2xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 453,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    "Ngân sách kế hoạch (",
                                                    planType === "weekly" ? "Tuần" : "Tháng",
                                                    "):"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 455,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            ((planType === "weekly" ? weeklyPlan?.budgetLimit : monthlyPlan?.budgetLimit) ?? budgetLimit)?.toLocaleString("vi-VN"),
                                            " VNĐ"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 454,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-emerald-700 font-medium",
                                        children: [
                                            "· Chi phí nguyên liệu ước tính:",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    (planType === "weekly" ? weeklyPlan?.totalEstimatedCost : monthlyPlan?.totalEstimatedCost)?.toLocaleString("vi-VN"),
                                                    " VNĐ"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 460,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 458,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 452,
                                columnNumber: 15
                            }, this),
                            (()=>{
                                const b = (planType === "weekly" ? weeklyPlan?.budgetLimit : monthlyPlan?.budgetLimit) ?? budgetLimit;
                                const cost = planType === "weekly" ? weeklyPlan?.totalEstimatedCost : monthlyPlan?.totalEstimatedCost;
                                if (b && cost !== undefined) {
                                    const diff = b - cost;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2.5 py-0.5 rounded-full font-bold text-[11px] ${diff >= 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`,
                                        children: diff >= 0 ? `Trong ngân sách (Dư ${diff.toLocaleString("vi-VN")} VNĐ)` : `Vượt ngân sách: ${Math.abs(diff).toLocaleString("vi-VN")} VNĐ`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 471,
                                        columnNumber: 21
                                    }, this);
                                }
                                return null;
                            })()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 451,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4",
                        children: [
                            planType === "weekly" && weeklyPlan ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 overflow-x-auto scrollbar-none pb-1",
                                children: weeklyPlan.days.map((d, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveDayIndex(index),
                                        className: `shrink-0 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${activeDayIndex === index ? "bg-emerald-700 text-white shadow-xs" : "bg-white border border-stone-200 text-stone-600 hover:border-emerald-300 hover:text-stone-900"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-bold",
                                                children: d.shortDay
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 497,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-[10px] ${activeDayIndex === index ? "text-emerald-200" : "text-stone-400"}`,
                                                children: d.dateText
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 498,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, d.dayName, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 489,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 487,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-stone-800",
                                        children: [
                                            "Lịch tháng (",
                                            monthlyPlan?.monthName,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 509,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-stone-400",
                                        children: "· Bấm vào các ngày trên lịch để đổi món"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 512,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 508,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 self-end sm:self-center shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowSavePlanModal(true),
                                        className: "h-10 px-3.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer",
                                        title: "Lưu thực đơn vào mục Yêu thích",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                className: "w-3.5 h-3.5 fill-rose-500 text-rose-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 525,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Lưu thực đơn"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 526,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 520,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowProfileDrawer(!showProfileDrawer),
                                        className: "h-10 px-3.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                                className: "w-3.5 h-3.5 text-emerald-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 533,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: showProfileDrawer ? "Ẩn hồ sơ" : "Hồ sơ"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 534,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 529,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "soft",
                                        size: "sm",
                                        onClick: ()=>requirePremium(()=>regenerateSingleDay(activeDayIndex)),
                                        className: "flex items-center gap-1.5 text-xs h-10 px-4 rounded-xl cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 543,
                                                columnNumber: 17
                                            }, this),
                                            "Tạo lại ",
                                            activeDay?.shortDay || "ngày"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 537,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 519,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 484,
                        columnNumber: 11
                    }, this),
                    showProfileDrawer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "p-6 bg-stone-50/70 border-emerald-200 animate-in fade-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4 border-b pb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-serif font-bold text-lg text-stone-900",
                                                children: "Cập nhật hồ sơ & tính lại thực đơn"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 554,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-stone-500",
                                                children: "Thay đổi sẽ giúp tạo lại thực đơn đồng bộ với chỉ số của bạn."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 557,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 553,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowProfileDrawer(false),
                                        className: "text-xs font-semibold text-stone-500 hover:text-stone-900 underline cursor-pointer",
                                        children: "Đóng"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 561,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 552,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$components$2f$ProfileEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfileEditor"], {}, void 0, false, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 568,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 551,
                        columnNumber: 13
                    }, this),
                    planType === "monthly" && monthlyPlan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MonthlyCalendarView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MonthlyCalendarView"], {
                        monthlyPlan: monthlyPlan,
                        activeDayIndex: activeDayIndex,
                        onSelectDay: (idx)=>setActiveDayIndex(idx)
                    }, void 0, false, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 576,
                        columnNumber: 13
                    }, this),
                    activeDay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$DailyMacroSummary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DailyMacroSummary"], {
                        day: activeDay
                    }, void 0, false, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 586,
                        columnNumber: 25
                    }, this),
                    activeDay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-serif font-bold text-xl text-stone-900 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2d$crossed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UtensilsCrossed$3e$__["UtensilsCrossed"], {
                                                className: "w-5 h-5 text-emerald-700"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 595,
                                                columnNumber: 19
                                            }, this),
                                            "Các bữa ăn trong ",
                                            activeDay.dayName,
                                            " (",
                                            activeDay.dateText,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 594,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-medium text-stone-500",
                                                children: [
                                                    "Tổng ",
                                                    activeDay.totalCalories,
                                                    " kcal · 4 bữa"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 599,
                                                columnNumber: 19
                                            }, this),
                                            !isPremium && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full",
                                                children: "Bản xem trước"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 603,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 598,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 593,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MealCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MealCard"], {
                                        mealType: "Breakfast",
                                        recipe: activeDay.breakfast.recipe,
                                        timeString: activeDay.breakfast.time,
                                        userId: String(activeProfile.id || ""),
                                        onOpenReplace: (r)=>handleOpenReplace(r, "breakfast"),
                                        onOpenPriceModal: (r)=>setPricingRecipe(r)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 611,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MealCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MealCard"], {
                                        mealType: "Lunch",
                                        recipe: activeDay.lunch.recipe,
                                        timeString: activeDay.lunch.time,
                                        userId: String(activeProfile.id || ""),
                                        onOpenReplace: (r)=>handleOpenReplace(r, "lunch"),
                                        onOpenPriceModal: (r)=>setPricingRecipe(r)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 619,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MealCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MealCard"], {
                                        mealType: "Dinner",
                                        recipe: activeDay.dinner.recipe,
                                        timeString: activeDay.dinner.time,
                                        userId: String(activeProfile.id || ""),
                                        onOpenReplace: (r)=>handleOpenReplace(r, "dinner"),
                                        onOpenPriceModal: (r)=>setPricingRecipe(r)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 627,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MealCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MealCard"], {
                                        mealType: "Snack",
                                        recipe: activeDay.snack.recipe,
                                        timeString: activeDay.snack.time,
                                        userId: String(activeProfile.id || ""),
                                        onOpenReplace: (r)=>handleOpenReplace(r, "snack"),
                                        onOpenPriceModal: (r)=>setPricingRecipe(r)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 635,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 610,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 592,
                        columnNumber: 13
                    }, this),
                    planType === "weekly" && weeklyPlan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                                className: "w-4 h-4 text-emerald-700"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 654,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-stone-800 text-sm",
                                                children: "Tổng quan thực đơn 7 ngày"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 655,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 653,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-stone-500 font-medium",
                                        children: [
                                            "Tổng ước tính: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-emerald-800 font-bold",
                                                children: [
                                                    "~",
                                                    weeklyPlan.totalEstimatedCost.toLocaleString("vi-VN"),
                                                    " VNĐ"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 658,
                                                columnNumber: 34
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 657,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 652,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 sm:grid-cols-4 gap-4 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-serif font-bold text-2xl text-stone-900",
                                                children: weeklyPlan.averageDailyCalories
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 663,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-stone-500 mt-0.5",
                                                children: "Calo TB/ngày"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 666,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 662,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-serif font-bold text-2xl text-emerald-800",
                                                children: [
                                                    weeklyPlan.averageProtein,
                                                    "g"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 669,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-stone-500 mt-0.5",
                                                children: "Đạm TB/ngày"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 672,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 668,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-serif font-bold text-2xl text-emerald-900",
                                                children: [
                                                    "~",
                                                    weeklyPlan.averageDailyCost.toLocaleString("vi-VN"),
                                                    " VNĐ"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 675,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-stone-500 mt-0.5",
                                                children: "Chi phí TB/ngày"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 678,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 674,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-serif font-bold text-2xl text-violet-700",
                                                children: "7 / 7"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 681,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-stone-500 mt-0.5",
                                                children: "Ngày đã lên kế hoạch"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/planner/page.tsx",
                                                lineNumber: 682,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/planner/page.tsx",
                                        lineNumber: 680,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/planner/page.tsx",
                                lineNumber: 661,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 651,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 448,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$MealReplacementModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MealReplacementModal"], {
                isOpen: replacingSlot !== null,
                onClose: ()=>setReplacingSlot(null),
                originalRecipe: replacingSlot?.recipe || null,
                mealType: replacingSlot?.slot ? replacingSlot.slot.toUpperCase() : "Meal",
                profile: activeProfile,
                onSelectReplacement: handleSelectReplacement
            }, void 0, false, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 694,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$components$2f$UpdatePriceModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UpdatePriceModal"], {
                isOpen: pricingRecipe !== null,
                onClose: ()=>setPricingRecipe(null),
                recipe: pricingRecipe,
                onSaved: ()=>{
                    // Re-trigger active day recomputation
                    if (activeDay) {
                        replaceMeal(activeDayIndex, "breakfast", activeDay.breakfast.recipe);
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 704,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$FavoritesModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FavoritesModal"], {
                isOpen: showFavoritesModal,
                onClose: ()=>setShowFavoritesModal(false),
                profile: activeProfile,
                onApplyPlan: (dayPlan)=>applyFavoriteDayPlan(dayPlan),
                onLoadSavedPlan: (plan)=>loadSavedPlan(plan),
                onGenerateWeeklyWithFavorites: (favIds)=>{
                    generateWeekly({
                        favoriteRecipeIds: favIds
                    });
                    setShowFavoritesModal(false);
                },
                onGenerateMonthlyWithFavorites: (favIds)=>{
                    requirePremium(()=>{
                        generateMonthly(selectedMonth, selectedYear, {
                            favoriteRecipeIds: favIds
                        });
                        setShowFavoritesModal(false);
                    });
                }
            }, void 0, false, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 717,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$PlanForSomeoneElseModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlanForSomeoneElseModal"], {
                isOpen: showSomeoneElseModal,
                onClose: ()=>setShowSomeoneElseModal(false),
                currentOtherProfile: someoneElseProfile,
                isPlanForSomeoneElse: isPlanForSomeoneElse,
                onApplySomeoneElse: (p)=>{
                    setSomeoneElseProfile(p);
                    setIsPlanForSomeoneElse(true);
                },
                onResetToMyself: ()=>{
                    setIsPlanForSomeoneElse(false);
                    setSomeoneElseProfile(null);
                }
            }, void 0, false, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 736,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$SaveMealPlanModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SaveMealPlanModal"], {
                isOpen: showSavePlanModal,
                onClose: ()=>setShowSavePlanModal(false),
                planType: planType,
                targetCalories: nutritionSummary.dailyCalorieTarget,
                totalCost: planType === "weekly" ? weeklyPlan?.totalEstimatedCost || 0 : monthlyPlan?.totalEstimatedCost || 0,
                onSave: (name)=>{
                    saveCurrentMealPlan(name);
                    alert(`Đã lưu "${name}" vào danh sách Thực đơn yêu thích!`);
                }
            }, void 0, false, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 752,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$components$2f$GenerationSettingsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GenerationSettingsModal"], {
                isOpen: showSettingsModal,
                onClose: ()=>setShowSettingsModal(false),
                activeProfile: activeProfile,
                isPlanForSomeoneElse: isPlanForSomeoneElse,
                currentBudget: budgetLimit,
                onOpenSomeoneElseModal: ()=>{
                    setShowSettingsModal(false);
                    setShowSomeoneElseModal(true);
                },
                onConfirmGenerate: (options)=>{
                    if (options.budgetLimit !== undefined) {
                        setBudgetLimit(options.budgetLimit);
                    }
                    if (options.planType === "monthly") {
                        generateMonthly(options.selectedMonth, options.selectedYear, options);
                    } else {
                        generateWeekly(options);
                    }
                },
                initialPlanType: planType
            }, void 0, false, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 769,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$components$2f$PremiumUpgradeModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PremiumUpgradeModal"], {
                isOpen: showUpgradeModal,
                onClose: ()=>setShowUpgradeModal(false),
                onUpgrade: handleUpgradeSuccess
            }, void 0, false, {
                fileName: "[project]/src/app/planner/page.tsx",
                lineNumber: 793,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/planner/page.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_s(PlannerContent, "j8jg2uPaUsAhEH5JXLhOGUJW8Es=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$meal$2d$planner$2f$hooks$2f$useMealPlanner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMealPlanner"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$hooks$2f$useSubscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"]
    ];
});
_c = PlannerContent;
function PlannerPage() {
    _s1();
    const { ready } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppShell"], {
        showRightRail: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1240px] mx-auto w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    eyebrow: "AI Hỗ trợ",
                    title: "Kế hoạch Thực đơn của tôi",
                    subtitle: "Lập kế hoạch thực đơn chay theo tuần và tháng dựa trên chỉ số BMI, mục tiêu calo, trường phái ăn chay và loại trừ dị ứng thực phẩm của bạn.",
                    action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: "beta",
                        className: "text-sm px-3 py-1",
                        children: "Cá nhân hóa"
                    }, void 0, false, {
                        fileName: "[project]/src/app/planner/page.tsx",
                        lineNumber: 813,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/planner/page.tsx",
                    lineNumber: 808,
                    columnNumber: 9
                }, this),
                !ready ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LockedState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GatedSkeleton"], {}, void 0, false, {
                    fileName: "[project]/src/app/planner/page.tsx",
                    lineNumber: 819,
                    columnNumber: 19
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlannerContent, {}, void 0, false, {
                    fileName: "[project]/src/app/planner/page.tsx",
                    lineNumber: 819,
                    columnNumber: 39
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/planner/page.tsx",
            lineNumber: 807,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/planner/page.tsx",
        lineNumber: 806,
        columnNumber: 5
    }, this);
}
_s1(PlannerPage, "XH9vly3R03omb5pVBkELbbJFcpQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"]
    ];
});
_c1 = PlannerPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "PlannerContent");
__turbopack_context__.k.register(_c1, "PlannerPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_planner_page_tsx_18rn_zq._.js.map
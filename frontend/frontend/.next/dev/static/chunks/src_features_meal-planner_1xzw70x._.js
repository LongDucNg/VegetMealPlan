(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
]);

//# sourceMappingURL=src_features_meal-planner_1xzw70x._.js.map
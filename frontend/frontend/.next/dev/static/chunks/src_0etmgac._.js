(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/ai/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AIPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LockedState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/LockedState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/context/RoleContext.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/RoleContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$guards$2f$PremiumGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/subscription/guards/PremiumGuard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$components$2f$ChatbotInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/chatbot/components/ChatbotInterface.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function AIPage() {
    _s();
    const { ready } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppShell"], {
        showRightRail: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[900px] mx-auto w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                    eyebrow: "AI Assistant",
                    title: "AI Nutritionist",
                    subtitle: "Ask about ingredient swaps, macro balancing, B12 requirements, or how to personalize your diet for your health goals."
                }, void 0, false, {
                    fileName: "[project]/src/app/ai/page.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                !ready ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$LockedState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GatedSkeleton"], {}, void 0, false, {
                    fileName: "[project]/src/app/ai/page.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$guards$2f$PremiumGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PremiumGuard"], {
                    feature: "ai-chatbot",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$components$2f$ChatbotInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatbotInterface"], {}, void 0, false, {
                        fileName: "[project]/src/app/ai/page.tsx",
                        lineNumber: 27,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/ai/page.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/ai/page.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/ai/page.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_s(AIPage, "XH9vly3R03omb5pVBkELbbJFcpQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$RoleContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"]
    ];
});
_c = AIPage;
var _c;
__turbopack_context__.k.register(_c, "AIPage");
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
"[project]/src/components/ui/ChatBubble.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$components$2f$ChatBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/chatbot/components/ChatBubble.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/LockedState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GatedSkeleton",
    ()=>GatedSkeleton,
    "LockedState",
    ()=>LockedState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.mjs [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function LockedState({ reason = "guest", title, description, className = "" }) {
    if (reason === "forbidden") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: `max-w-2xl mx-auto my-12 text-center p-10 select-none ${className}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-16 h-16 rounded-full bg-red-50 text-red-700 flex items-center justify-center mx-auto mb-5 shadow-xs",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                        className: "w-8 h-8",
                        strokeWidth: 1.75
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/LockedState.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/LockedState.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "font-serif font-bold text-[30px] text-stone-900 tracking-tight leading-tight mb-3",
                    children: title || "Admin Access Required"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/LockedState.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-base text-stone-600 max-w-md mx-auto leading-relaxed mb-8",
                    children: description || "This section is restricted to VeggieHub administrators. Please use the 'Preview as' switcher at the bottom of the sidebar to test Admin features."
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/LockedState.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center gap-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "h-10 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold inline-flex items-center gap-2 transition-colors shadow-sm cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-4 h-4",
                                strokeWidth: 2
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/LockedState.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Return to Discover"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/LockedState.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/LockedState.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/LockedState.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/LockedState.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: `max-w-2xl mx-auto my-12 text-center p-10 select-none ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-5 shadow-xs",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                    className: "w-8 h-8",
                    strokeWidth: 1.75
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/LockedState.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LockedState.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "font-serif font-bold text-[30px] text-stone-900 tracking-tight leading-tight mb-3",
                children: title || "Join VeggieHub to unlock this feature"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LockedState.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base text-stone-600 max-w-md mx-auto leading-relaxed mb-8",
                children: description || "Personalized weekly meal plans, AI nutrition consultations, recipe saving, and community discussion are free forever for registered members."
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LockedState.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/register",
                        className: "h-11 px-7 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-base font-medium inline-flex items-center justify-center transition-colors shadow-xs cursor-pointer",
                        children: "Create free account"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/LockedState.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/login",
                        className: "h-11 px-6 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 text-base font-medium inline-flex items-center justify-center transition-colors cursor-pointer",
                        children: "Log in"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/LockedState.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/LockedState.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/LockedState.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = LockedState;
function GatedSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto my-12 p-10 bg-white border border-stone-200 rounded-[20px] shadow-sm animate-pulse flex flex-col items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 h-16 rounded-full bg-stone-100 mb-5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LockedState.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-8 w-64 bg-stone-100 rounded-lg mb-3"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LockedState.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-4 w-96 bg-stone-100 rounded mb-2"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LockedState.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-4 w-72 bg-stone-100 rounded mb-8"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LockedState.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-11 w-44 bg-stone-100 rounded-full"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/LockedState.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/LockedState.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c1 = GatedSkeleton;
var _c, _c1;
__turbopack_context__.k.register(_c, "LockedState");
__turbopack_context__.k.register(_c1, "GatedSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/PageHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHeader",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function PageHeader({ eyebrow, title, subtitle, action, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    eyebrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[13px] font-semibold uppercase tracking-[0.1em] text-emerald-700 mb-1",
                        children: eyebrow
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/PageHeader.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-serif font-bold text-[30px] text-stone-900 tracking-tight leading-tight",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/PageHeader.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-base text-stone-600 leading-normal max-w-2xl",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/PageHeader.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/PageHeader.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0",
                children: action
            }, void 0, false, {
                fileName: "[project]/src/components/ui/PageHeader.tsx",
                lineNumber: 36,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/PageHeader.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = PageHeader;
var _c;
__turbopack_context__.k.register(_c, "PageHeader");
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
"[project]/src/features/chatbot/components/ChatBubble.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatBubble",
    ()=>ChatBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
;
;
function ChatBubble({ sender, text, timestamp, substitution }) {
    if (sender === "user") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-end mb-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-emerald-700 text-white rounded-2xl rounded-tr-xs px-5 py-3.5 max-w-[80%] shadow-xs",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-base leading-relaxed",
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                timestamp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs text-stone-400 mt-1 px-1",
                    children: timestamp
                }, void 0, false, {
                    fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                    lineNumber: 25,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start gap-3.5 mb-5 max-w-[90%]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 shadow-xs mt-0.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                    className: "w-5 h-5 fill-current"
                }, void 0, false, {
                    fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border border-stone-200 rounded-2xl rounded-tl-xs p-5 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base text-stone-800 leading-relaxed whitespace-pre-line",
                                children: text
                            }, void 0, false, {
                                fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            substitution && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200/70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-base font-semibold text-amber-950",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: substitution.original
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                                                lineNumber: 46,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "w-4 h-4 text-amber-700 shrink-0",
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                                                lineNumber: 47,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-emerald-800 font-bold",
                                                children: substitution.substitute
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                                                lineNumber: 48,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs font-semibold uppercase tracking-wider text-amber-800",
                                        children: [
                                            "Ratio: ",
                                            substitution.ratio
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm text-stone-700 leading-normal",
                                        children: substitution.reason
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    timestamp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-stone-400 mt-1 block px-1",
                        children: timestamp
                    }, void 0, false, {
                        fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/chatbot/components/ChatBubble.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = ChatBubble;
var _c;
__turbopack_context__.k.register(_c, "ChatBubble");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/chatbot/components/ChatbotInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatbotInterface",
    ()=>ChatbotInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.mjs [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$hooks$2f$useChatbot$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/chatbot/hooks/useChatbot.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$data$2f$mockChatResponses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/chatbot/data/mockChatResponses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ChatBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/ChatBubble.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$components$2f$ChatBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/chatbot/components/ChatBubble.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ChatbotInterface() {
    _s();
    const { messages, loading, sendMessage, resetChat } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$hooks$2f$useChatbot$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatbot"])();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const endRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatbotInterface.useEffect": ()=>{
            endRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["ChatbotInterface.useEffect"], [
        messages,
        loading
    ]);
    const handleSend = (text)=>{
        const trimmed = text.trim();
        if (!trimmed || loading) return;
        sendMessage(trimmed);
        setInput("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-[calc(100vh-210px)] min-h-[520px] max-h-[820px] bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 px-6 py-4 border-b border-stone-100 bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center shrink-0 shadow-xs",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            className: "w-5 h-5 text-amber-950 fill-current"
                        }, void 0, false, {
                            fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold text-stone-900",
                                children: "VeggieHub AI Nutritionist"
                            }, void 0, false, {
                                fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-emerald-600 font-medium flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                                        lineNumber: 35,
                                        columnNumber: 13
                                    }, this),
                                    "Online · Connected to your Profile & Meal Planner"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: resetChat,
                        className: "ml-auto p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer text-stone-400 hover:text-stone-600",
                        title: "Restart conversation",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-6 space-y-4",
                children: [
                    messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$components$2f$ChatBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatBubble"], {
                            sender: m.sender,
                            text: m.text,
                            timestamp: m.timestamp,
                            substitution: m.substitution
                        }, m.id, false, {
                            fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3.5 mb-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "w-4 h-4 text-amber-950 fill-current"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-stone-200 rounded-2xl rounded-tl-xs p-4 shadow-xs",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1.5 items-center h-5",
                                    children: [
                                        0,
                                        1,
                                        2
                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full bg-stone-300 animate-bounce",
                                            style: {
                                                animationDelay: `${i * 0.15}s`
                                            }
                                        }, i, false, {
                                            fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                                            lineNumber: 68,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: endRef
                    }, void 0, false, {
                        fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-none",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$data$2f$mockChatResponses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAT_SUGGESTIONS"].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleSend(s.text),
                        disabled: loading,
                        className: "shrink-0 text-xs px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 transition-colors cursor-pointer font-medium disabled:opacity-50",
                        children: s.text
                    }, s.text, false, {
                        fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-t border-stone-100 flex gap-2 bg-stone-50/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: input,
                        onChange: (e)=>setInput(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend(input);
                            }
                        },
                        disabled: loading,
                        placeholder: "Ask about meal ideas, BMI, calories, B12, or allergies...",
                        className: "flex-1 h-11 rounded-2xl border border-stone-200 bg-white px-4 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none disabled:opacity-50"
                    }, void 0, false, {
                        fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleSend(input),
                        disabled: loading || !input.trim(),
                        className: "w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 cursor-pointer shadow-xs",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/chatbot/components/ChatbotInterface.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(ChatbotInterface, "OumUypEsWhlBaD1tYFCWzJhr7HM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$hooks$2f$useChatbot$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatbot"]
    ];
});
_c = ChatbotInterface;
var _c;
__turbopack_context__.k.register(_c, "ChatbotInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/chatbot/data/mockChatResponses.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHAT_SUGGESTIONS",
    ()=>CHAT_SUGGESTIONS,
    "CHAT_SUGGESTION_CHIPS",
    ()=>CHAT_SUGGESTION_CHIPS,
    "INITIAL_CHAT_MESSAGES",
    ()=>INITIAL_CHAT_MESSAGES,
    "MOCK_SUBSTITUTIONS",
    ()=>MOCK_SUBSTITUTIONS,
    "STATIC_KNOWLEDGE_BASE",
    ()=>STATIC_KNOWLEDGE_BASE
]);
const CHAT_SUGGESTIONS = [
    {
        text: "What should I eat for dinner?",
        category: "dinner"
    },
    {
        text: "Explain my BMI and body metrics",
        category: "bmi"
    },
    {
        text: "How many calories should I eat daily?",
        category: "macros"
    },
    {
        text: "Egg substitute for baking",
        category: "general"
    },
    {
        text: "How to get enough B12 in Vietnam",
        category: "general"
    },
    {
        text: "Protein in tofu vs tempeh",
        category: "macros"
    }
];
const CHAT_SUGGESTION_CHIPS = [
    "Egg substitute for baking",
    "How to get enough B12 in Vietnam",
    "Explain my BMI (21.4)",
    "Protein in tofu vs tempeh"
];
const MOCK_SUBSTITUTIONS = {
    egg: {
        original: "1 Chicken Egg",
        substitute: "50g Silken Tofu (blended)",
        ratio: "1 egg = 50g silken tofu or 1 tbsp ground flaxseed + 3 tbsp water",
        reason: "Provides moisture, emulsification, and dense crumb structure in brownies and quick breads without imparting flavor."
    },
    fishSauce: {
        original: "Fish Sauce (Nước mắm)",
        substitute: "Fermented Pineapple & Soy Liquid (Nước mắm chay)",
        ratio: "1:1 direct swap",
        reason: "Delivers deep umami, natural salinity, and amber clarity using simmered pineapple, shiitake stems, and sea salt."
    }
};
const INITIAL_CHAT_MESSAGES = [
    {
        id: "m1",
        sender: "ai",
        text: "Hello! I'm your VeggieHub AI Nutritionist. Ask me about ingredient swaps, macro balancing, daily B12 requirements, or how to personalize your meal plan for optimal plant nutrition.",
        timestamp: "Just now"
    }
];
const STATIC_KNOWLEDGE_BASE = {
    "egg substitute for baking": {
        text: "For baking, eggs serve as binders, leaveners, and moisture providers. Here are the most reliable vegan substitutes:\n\n• **For binding:** Flax egg (1 tbsp ground flax + 3 tbsp water, rest 5 min) or chia egg.\n• **For lift:** 1 tsp baking soda + 1 tbsp apple cider vinegar per egg.\n• **For moisture & density:** 50g blended silken tofu per egg — works beautifully in brownies and quick breads.",
        substitution: {
            original: "1 Chicken Egg",
            substitute: "50g Silken Tofu (blended)",
            ratio: "1 egg = 50g silken tofu or 1 tbsp ground flax + 3 tbsp water",
            reason: "Provides moisture, emulsification, and dense crumb structure in brownies and quick breads without imparting flavor."
        }
    },
    "how to get enough b12 in vietnam": {
        text: "B12 is the most critical nutrient for plant-based eaters since plants don't synthesize it reliably. In Vietnam:\n\n• **Supplementation:** A weekly 2,000–2,500µg cyanocobalamin tablet or daily 50–100µg dose is standard. Readily available at Pharmacity and An Khang.\n• **Fortified foods:** Nutritional yeast (men dinh dưỡng), fortified soy/oat milks sold at supermarkets.\n• **Target:** Aim for at least 2.4µg/day. If you consume eggs or dairy occasionally (lacto-ovo), part of your requirement may be met."
    },
    "protein in tofu vs tempeh": {
        text: "Both are stellar soy proteins, but have different macro profiles:\n\n• **Firm Tofu (per 100g):** ~8–10g Protein, ~76 kcal. Soft, neutral, soaks up marinades.\n• **Tempeh (per 100g):** ~19–20g Protein (nearly 2× tofu!), ~193 kcal. Fermented whole soybeans, dense, nutty, rich in prebiotics.\n\n**Recommendation:** Use tofu for creamy soups/scrambles and tempeh for stir-fries and protein grain bowls."
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/chatbot/hooks/useChatbot.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChatbot",
    ()=>useChatbot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$services$2f$chatbotService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/chatbot/services/chatbotService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const INITIAL_MESSAGES = [
    {
        id: "m-welcome",
        sender: "ai",
        text: "Hello! I'm your VeggieHub AI Nutritionist. I can recommend meals based on your daily calories, explain your BMI, check ingredient allergies, or advise on plant-based nutrient absorption. What can I help you with today?",
        timestamp: "Just now"
    }
];
function useChatbot() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_MESSAGES);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatbot.useCallback[sendMessage]": async (userText)=>{
            const trimmed = userText.trim();
            if (!trimmed) return;
            const userMessageId = `u-${Math.random().toString(36).substring(2, 9)}`;
            const userMsg = {
                id: userMessageId,
                sender: "user",
                text: trimmed,
                timestamp: "Just now"
            };
            setMessages({
                "useChatbot.useCallback[sendMessage]": (prev)=>[
                        ...prev,
                        userMsg
                    ]
            }["useChatbot.useCallback[sendMessage]"]);
            setLoading(true);
            try {
                const aiReply = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$services$2f$chatbotService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatbotService"].processUserMessage(trimmed);
                setMessages({
                    "useChatbot.useCallback[sendMessage]": (prev)=>[
                            ...prev,
                            aiReply
                        ]
                }["useChatbot.useCallback[sendMessage]"]);
            } catch (err) {
                console.error("[useChatbot] error processing message:", err);
                const fallback = {
                    id: `ai-err-${Math.random().toString(36).substring(2, 9)}`,
                    sender: "ai",
                    text: "I encountered a minor issue processing your question. Please try asking again!",
                    timestamp: "Just now"
                };
                setMessages({
                    "useChatbot.useCallback[sendMessage]": (prev)=>[
                            ...prev,
                            fallback
                        ]
                }["useChatbot.useCallback[sendMessage]"]);
            } finally{
                setLoading(false);
            }
        }
    }["useChatbot.useCallback[sendMessage]"], []);
    const resetChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChatbot.useCallback[resetChat]": ()=>{
            setMessages(INITIAL_MESSAGES);
        }
    }["useChatbot.useCallback[resetChat]"], []);
    return {
        messages,
        loading,
        sendMessage,
        resetChat
    };
}
_s(useChatbot, "WwImXEvkN79tlummqYzT8QV9toc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/chatbot/services/chatbotService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chatbotService",
    ()=>chatbotService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/services/profileService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/profile/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$services$2f$nutritionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/nutrition/services/nutritionService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/recipes/services/recipeService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$data$2f$mockChatResponses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/chatbot/data/mockChatResponses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
;
;
;
;
;
;
const chatbotService = {
    async processUserMessage (userText) {
        // 0. Try calling Backend AI Chatbot API
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/chatbot/ask", {
                question: userText
            });
            const aiText = res?.answer || res?.reply || res?.message;
            if (aiText && !aiText.includes("AI dang tam thoi khong phan hoi")) {
                return {
                    id: `ai-${Date.now()}`,
                    sender: "ai",
                    timestamp: "Vừa xong",
                    text: aiText
                };
            }
        } catch  {
        // Backend AI unavailable or unauthenticated -> fall through to intelligent local nutritionist engine
        }
        // Simulate slight AI thinking latency
        await new Promise((res)=>setTimeout(res, 400));
        const normalized = userText.toLowerCase().trim();
        const profile = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$services$2f$profileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].getProfile();
        const nutrition = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$nutrition$2f$services$2f$nutritionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nutritionService"].getNutritionSummary(profile);
        // 1. Check for Dinner / Meal recommendation requests
        if (normalized.includes("dinner") || normalized.includes("eat for dinner") || normalized.includes("tối nay ăn gì") || normalized.includes("ăn gì") || normalized.includes("lunch") || normalized.includes("breakfast")) {
            const mealType = normalized.includes("breakfast") ? "breakfast" : normalized.includes("lunch") ? "lunch" : "dinner";
            const mealLabel = mealType === "breakfast" ? "bữa sáng" : mealType === "lunch" ? "bữa trưa" : "bữa tối";
            const recommendations = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$recipeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipeService"].getRecommendations(profile, nutrition.mealTargets[mealType], mealType);
            const topPick = recommendations[0];
            const allergyNote = profile.allergies.length > 0 ? `Đã lọc để tránh các thành phần dị ứng của bạn (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatAllergies"])(profile.allergies)}).` : "Phù hợp với chế độ ăn chay của bạn.";
            if (topPick) {
                return {
                    id: `ai-${Math.random().toString(36).substring(2, 9)}`,
                    sender: "ai",
                    timestamp: "Vừa xong",
                    text: `Dựa trên hồ sơ của bạn (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVegetarianType"])(profile.vegetarianType)}, mục tiêu ~${nutrition.mealTargets[mealType]} kcal cho ${mealLabel}):\n\n🍽️ **Món ăn gợi ý: ${topPick.title}**\n• Năng lượng: **${topPick.calories} kcal**\n• Chất đạm: **${topPick.protein}g** | Tinh bột: **${topPick.carbs}g** | Chất béo: **${topPick.fat}g**\n• Thời gian chuẩn bị/nấu: **${topPick.prepTime + topPick.cookTime} phút**\n\n${topPick.description}\n\n✅ *${allergyNote}*`,
                    suggestedRecipeId: topPick.id
                };
            }
        }
        // 2. Check for BMI / Body metrics
        if (normalized.includes("bmi") || normalized.includes("body mass") || normalized.includes("weight") || normalized.includes("cân nặng")) {
            const { bmiInfo } = nutrition;
            if (!bmiInfo) {
                return {
                    id: `ai-${Math.random().toString(36).substring(2, 9)}`,
                    sender: "ai",
                    timestamp: "Vừa xong",
                    text: `Vui lòng cập nhật chiều cao và cân nặng trong hồ sơ để tính chỉ số BMI và khoảng cân nặng lý tưởng.`
                };
            }
            return {
                id: `ai-${Math.random().toString(36).substring(2, 9)}`,
                sender: "ai",
                timestamp: "Vừa xong",
                text: `Phân tích chỉ số BMI cá nhân hóa từ hồ sơ của bạn:\n\n• **Chiều cao:** ${profile.height} cm | **Cân nặng:** ${profile.weight} kg\n• **Chỉ số BMI:** **${bmiInfo.formattedBMI}** (${bmiInfo.category})\n• **Cân nặng lý tưởng:** **${bmiInfo.healthyWeightRange.min} kg – ${bmiInfo.healthyWeightRange.max} kg**\n\n💡 *${bmiInfo.description}*`
            };
        }
        // 3. Check for Calorie / Macro inquiries
        if (normalized.includes("calorie") || normalized.includes("calories") || normalized.includes("calo") || normalized.includes("macro") || normalized.includes("tdee") || normalized.includes("bmr")) {
            return {
                id: `ai-${Math.random().toString(36).substring(2, 9)}`,
                sender: "ai",
                timestamp: "Vừa xong",
                text: `Các chỉ số chuyển hóa năng lượng hàng ngày của bạn (theo công thức Mifflin-St Jeor):\n\n• **Chuyển hóa cơ bản (BMR):** **${nutrition.bmr} kcal/ngày**\n• **Tổng tiêu hao năng lượng (TDEE):** **${nutrition.tdee} kcal/ngày** (Mức độ vận động: ${profile.activityLevel})\n• **Mục tiêu calo (${nutrition.goalTitle}):** **~${nutrition.dailyCalorieTarget.toLocaleString()} kcal/ngày**\n\n🎯 **Khuyến nghị dinh dưỡng hàng ngày:**\n• Chất đạm: **${nutrition.macros.proteinGrams}g** (~${nutrition.macros.proteinPct}%)\n• Tinh bột: **${nutrition.macros.carbsGrams}g** (~${nutrition.macros.carbsPct}%)\n• Chất béo: **${nutrition.macros.fatGrams}g** (~${nutrition.macros.fatPct}%)`
            };
        }
        // 4. Check for Allergy inquiries
        if (normalized.includes("allergy") || normalized.includes("allergies") || normalized.includes("dị ứng") || normalized.includes("peanut") || normalized.includes("soy")) {
            const userAllergies = profile.allergies;
            if (userAllergies.length > 0) {
                return {
                    id: `ai-${Math.random().toString(36).substring(2, 9)}`,
                    sender: "ai",
                    timestamp: "Vừa xong",
                    text: `Hồ sơ của bạn hiện ghi nhận dị ứng với: **${userAllergies.join(", ")}**.\n\nTất cả công thức được gợi ý trong Kế hoạch Thực đơn sẽ tự động loại trừ các nguyên liệu này. Khi bạn xem video hoặc công thức, bất kỳ món nào chứa ${userAllergies.join(" hoặc ")} sẽ hiển thị huy hiệu cảnh báo ⚠ **Dị ứng thực phẩm** để bảo vệ an toàn cho bạn.`
                };
            } else {
                return {
                    id: `ai-${Math.random().toString(36).substring(2, 9)}`,
                    sender: "ai",
                    timestamp: "Vừa xong",
                    text: `Hiện bạn chưa lưu thông tin dị ứng thực phẩm nào trong hồ sơ. Bạn có thể cập nhật dị ứng bất cứ lúc nào trong trang **Hồ sơ cá nhân** hoặc cài đặt.`
                };
            }
        }
        // 5. Check Static Knowledge Base
        for (const [key, value] of Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$chatbot$2f$data$2f$mockChatResponses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATIC_KNOWLEDGE_BASE"])){
            if (normalized.includes(key)) {
                return {
                    id: `ai-${Math.random().toString(36).substring(2, 9)}`,
                    sender: "ai",
                    timestamp: "Vừa xong",
                    text: value.text,
                    substitution: value.substitution
                };
            }
        }
        // 6. Contextual Default
        return {
            id: `ai-${Math.random().toString(36).substring(2, 9)}`,
            sender: "ai",
            timestamp: "Vừa xong",
            text: `Chào bạn! Với vai trò là Chuyên gia Dinh dưỡng Chay AI, tôi luôn ghi nhớ hồ sơ của bạn:\n• Chế độ ăn: **${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVegetarianType"])(profile.vegetarianType)}**\n• Mục tiêu sức khỏe: **${nutrition.goalTitle}** (~${nutrition.dailyCalorieTarget} kcal/ngày)\n• Dị ứng thực phẩm: **${profile.allergies.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatAllergies"])(profile.allergies) : "Không có"}**\n\nBạn có thể hỏi tôi:\n1. *"Tối nay ăn gì?"*\n2. *"Giải thích chỉ số BMI và thể trạng của tôi"*\n3. *"Tôi nên nạp bao nhiêu calo mỗi ngày?"*\n4. *"Nguyên liệu thay thế trứng khi làm bánh"* hoặc *"Cách bổ sung B12 cho người ăn chay tại Việt Nam"*.`
        };
    }
};
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
"[project]/src/features/subscription/components/MockPaymentModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MockPaymentModal",
    ()=>MockPaymentModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.mjs [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/qr-code.mjs [app-client] (ecmascript) <export default as QrCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/subscription/data/mockSubscriptions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$services$2f$subscriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/subscription/services/subscriptionService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function MockPaymentModal({ isOpen, onClose, onSuccess, defaultPlanId = "premium" }) {
    _s();
    const [selectedPlanId, setSelectedPlanId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultPlanId);
    const [paymentMethod, setPaymentMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("vnpay");
    const [processing, setProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [completed, setCompleted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    if (!isOpen) return null;
    const currentPlan = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PLANS"].find((p)=>p.id === selectedPlanId) || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PLANS"][1];
    const handleConfirm = async ()=>{
        setErrorMessage(null);
        // Nếu chọn cổng VNPay thật: gọi API POST /subscriptions/checkout
        if (paymentMethod === "vnpay") {
            setProcessing(true);
            try {
                const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$services$2f$subscriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscriptionService"].createCheckout();
                if (res?.payment_url) {
                    // Điều hướng toàn trang sang cổng thanh toán VNPay
                    window.location.assign(res.payment_url);
                    return;
                }
                throw new Error("Không nhận được link thanh toán từ hệ thống.");
            } catch (err) {
                setProcessing(false);
                if (err?.status === 503 || err?.code === "SUBSCRIPTION_PAYMENT_NOT_CONFIGURED") {
                    setErrorMessage("Cổng thanh toán VNPay đang ở chế độ chờ cấu hình khóa bí mật (VNPAY_TMN_CODE) trên server. Bạn có thể chọn 'Kích hoạt thử nghiệm (Demo)' bên dưới để trải nghiệm.");
                } else {
                    setErrorMessage(err?.message || "Không thể khởi tạo giao dịch thanh toán VNPay.");
                }
            }
            return;
        }
        // Đối với các phương thức mô phỏng (Card, Momo):
        setProcessing(true);
        setTimeout(()=>{
            setProcessing(false);
            setCompleted(true);
            setTimeout(()=>{
                onSuccess(currentPlan.id);
                setCompleted(false);
                onClose();
            }, 1200);
        }, 800);
    };
    const handleDemoUpgrade = ()=>{
        setProcessing(true);
        setTimeout(()=>{
            setProcessing(false);
            setCompleted(true);
            setTimeout(()=>{
                onSuccess(currentPlan.id);
                setCompleted(false);
                onClose();
            }, 800);
        }, 500);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "absolute top-4 right-4 text-emerald-200 hover:text-white transition-colors cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mb-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-amber-400 text-amber-950 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                                children: "Mock Payment Gateway"
                            }, void 0, false, {
                                fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-serif font-bold text-2xl",
                            children: "Confirm Upgrade to Premium"
                        }, void 0, false, {
                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-emerald-100 text-xs mt-1",
                            children: "Frontend Prototype · No real charges will be made."
                        }, void 0, false, {
                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block",
                                    children: "Choose Plan"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PLANS"].filter((p)=>p.price > 0).map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setSelectedPlanId(plan.id),
                                            className: `p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${selectedPlanId === plan.id ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/30" : "border-stone-200 hover:border-stone-300 bg-stone-50/50"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-sm text-stone-900",
                                                            children: plan.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                            lineNumber: 128,
                                                            columnNumber: 21
                                                        }, this),
                                                        plan.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full",
                                                            children: plan.badge
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                            lineNumber: 130,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-serif font-bold text-lg text-emerald-800",
                                                    children: plan.formattedPrice
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-stone-500",
                                                    children: plan.billingCycleText
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, plan.id, true, {
                                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block",
                                    children: "Phương thức thanh toán"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setPaymentMethod("vnpay"),
                                            className: `flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${paymentMethod === "vnpay" ? "border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20" : "border-stone-200 text-stone-600 hover:bg-stone-50"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                    className: "w-4 h-4 text-blue-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 17
                                                }, this),
                                                "VNPay Gateway"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setPaymentMethod("card"),
                                            className: `flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${paymentMethod === "card" ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20" : "border-stone-200 text-stone-600 hover:bg-stone-50"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                    className: "w-4 h-4 text-emerald-700"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 17
                                                }, this),
                                                "Thẻ Quốc Tế (Visa)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setPaymentMethod("momo"),
                                            className: `flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${paymentMethod === "momo" ? "border-pink-600 bg-pink-50 text-pink-900 ring-2 ring-pink-500/20" : "border-stone-200 text-stone-600 hover:bg-stone-50"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                                                    className: "w-4 h-4 text-pink-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 17
                                                }, this),
                                                "Ví MoMo"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                            lineNumber: 172,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-stone-50 border border-stone-200 rounded-2xl p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold text-stone-700 mb-2 flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "w-3.5 h-3.5 text-amber-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, this),
                                        "Đặc quyền gói ",
                                        currentPlan.name,
                                        ":"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600",
                                    children: currentPlan.features.slice(0, 4).map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    className: "w-3.5 h-3.5 text-emerald-600 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: f
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, f, true, {
                                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                            lineNumber: 195,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this),
                        errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5 animate-in fade-in",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: errorMessage
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                            lineNumber: 208,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleDemoUpgrade,
                                            disabled: processing || completed,
                                            className: "px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs cursor-pointer transition-colors",
                                            children: "Kích hoạt thử nghiệm (Demo)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                            lineNumber: 209,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleConfirm,
                                    disabled: processing || completed,
                                    className: `w-full h-12 rounded-2xl text-white font-semibold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 ${paymentMethod === "vnpay" ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-700 hover:bg-emerald-800"}`,
                                    children: completed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "w-5 h-5 text-emerald-300 animate-in zoom-in"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                lineNumber: 234,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Nâng cấp thành công!"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                lineNumber: 235,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, this) : processing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                lineNumber: 239,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: paymentMethod === "vnpay" ? "Đang kết nối cổng VNPay..." : "Đang xử lý giao dịch..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                lineNumber: 240,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                        lineNumber: 238,
                                        columnNumber: 17
                                    }, this) : paymentMethod === "vnpay" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                className: "w-5 h-5 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                lineNumber: 246,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Thanh toán VNPay · ",
                                                    currentPlan.formattedPrice
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                lineNumber: 247,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                className: "w-4 h-4 text-blue-200"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                lineNumber: 248,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                        lineNumber: 245,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                className: "w-5 h-5 text-emerald-200"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                lineNumber: 252,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Xác nhận thanh toán · ",
                                                    currentPlan.formattedPrice
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                                lineNumber: 253,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                        lineNumber: 251,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-center text-stone-400 mt-2",
                                    children: paymentMethod === "vnpay" ? "Giao dịch được bảo mật và xử lý trực tiếp qua Cổng thanh toán điện tử VNPay." : "Mô phỏng thanh toán trực tiếp trên môi trường thử nghiệm."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/subscription/components/MockPaymentModal.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(MockPaymentModal, "oeD7r+etwsxu5lPes6r2EdUp3MA=");
_c = MockPaymentModal;
var _c;
__turbopack_context__.k.register(_c, "MockPaymentModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/subscription/data/mockSubscriptions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_SUBSCRIPTION",
    ()=>DEFAULT_SUBSCRIPTION,
    "MOCK_PLANS",
    ()=>MOCK_PLANS
]);
const MOCK_PLANS = [
    {
        id: "free",
        name: "Miễn phí",
        price: 0,
        formattedPrice: "0 VNĐ",
        duration: "free",
        billingCycleText: "Tính năng cơ bản",
        features: [
            "Xem danh mục công thức",
            "Khám phá các công thức món chay",
            "Xem chi tiết công thức",
            "Hồ sơ cá nhân cơ bản",
            "Tính toán chỉ số BMI cơ bản",
            "Thông tin dinh dưỡng cơ bản",
            "Xem trước thực đơn mẫu"
        ]
    },
    {
        id: "premium",
        name: "Premium",
        price: 99000,
        formattedPrice: "99.000 VNĐ",
        duration: "monthly",
        billingCycleText: "99.000 VNĐ / tháng",
        badge: "Toàn bộ tính năng",
        popular: true,
        features: [
            "Kế hoạch thực đơn cá nhân hóa toàn diện",
            "Mục tiêu calo theo chỉ số cơ thể",
            "Gợi ý bữa ăn dựa trên BMI & BMR",
            "Loại trừ dị ứng thực phẩm nghiêm ngặt",
            "Đầy đủ thực đơn tuần và lịch tháng",
            "Tùy biến đổi món và chỉnh sửa thực đơn",
            "AI Dinh dưỡng hỗ trợ tư vấn",
            "Tạo lại thực đơn không giới hạn",
            "Ưu tiên tích hợp món ăn yêu thích"
        ]
    }
];
const DEFAULT_SUBSCRIPTION = {
    status: "free",
    planId: "free",
    planName: "Free Plan",
    autoRenew: false
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/subscription/guards/PremiumGuard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PremiumGuard",
    ()=>PremiumGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.mjs [app-client] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$hooks$2f$useSubscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/subscription/hooks/useSubscription.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$components$2f$MockPaymentModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/subscription/components/MockPaymentModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PremiumGuard({ children, feature, customTitle, customDescription }) {
    _s();
    const { isPremium, purchase, toggle, subscription } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$hooks$2f$useSubscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"])();
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (isPremium) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 flex items-center justify-between bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2 text-xs text-emerald-900 shadow-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                            className: "w-3.5 h-3.5 text-amber-500 fill-amber-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                            lineNumber: 32,
                                            columnNumber: 15
                                        }, this),
                                        "Gói Premium đang hoạt động"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-emerald-700/80 hidden sm:inline",
                                    children: "· 99.000 VNĐ / tháng"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>toggle(),
                            className: "text-[11px] font-medium text-emerald-800 hover:text-red-700 underline underline-offset-2 transition-colors cursor-pointer",
                            title: "Nhấn để chuyển sang gói Miễn phí (kiểm thử)",
                            children: "[Thử nghiệm: Về gói Thường]"
                        }, void 0, false, {
                            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this);
    }
    // Content for Meal Planner
    if (feature === "meal-planner") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl mx-auto my-10 p-8 sm:p-12 bg-white border border-stone-200 rounded-3xl shadow-sm text-center relative overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -top-16 -right-16 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none"
                        }, void 0, false, {
                            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -bottom-16 -left-16 w-40 h-40 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none"
                        }, void 0, false, {
                            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-6 shadow-xs",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                        className: "w-8 h-8 text-amber-500 fill-amber-500",
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-serif font-bold text-3xl text-stone-900 mb-3 tracking-tight",
                                    children: customTitle || "Mở khóa Kế hoạch Thực đơn Cá nhân hóa"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-stone-600 text-base max-w-lg mx-auto mb-6",
                                    children: customDescription || "Nhận thực đơn được thiết kế riêng phù hợp với chỉ số cơ thể và lối sống ăn chay của bạn:"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-stone-50 border border-stone-200/90 rounded-2xl p-5 max-w-md mx-auto mb-8 text-left space-y-2.5",
                                    children: [
                                        "Tính toán chỉ số BMI & vóc dáng của bạn",
                                        "Nhu cầu calo & dinh dưỡng đa lượng hàng ngày (Mifflin-St Jeor)",
                                        "Mục tiêu sức khỏe cá nhân (Giảm cân, giữ dáng, tăng cơ)",
                                        "Trường phái ăn chay của bạn (Thuần chay, Chay có sữa, Chay có trứng, Trứng & Sữa)",
                                        "Loại trừ dị ứng thực phẩm cụ thể (Đậu phộng, Đậu nành, Gluten,...)"
                                    ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-2.5 text-sm text-stone-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        className: "w-3 h-3 stroke-[2.5]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: item
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, item, true, {
                                            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                            lineNumber: 84,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row items-center justify-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setModalOpen(true),
                                            className: "w-full sm:w-auto h-12 px-8 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    className: "w-4 h-4 text-amber-900 fill-amber-900"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 17
                                                }, this),
                                                "Nâng cấp Premium",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>toggle(),
                                            className: "text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 py-2 px-3 cursor-pointer",
                                            children: "[Thử nghiệm: Mở nhanh]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-stone-400 mt-4",
                                    children: "99.000 VNĐ / tháng · Hủy bất cứ lúc nào · Thanh toán mô phỏng"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$components$2f$MockPaymentModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockPaymentModal"], {
                    isOpen: modalOpen,
                    onClose: ()=>setModalOpen(false),
                    onSuccess: (planId)=>purchase(planId)
                }, void 0, false, {
                    fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this);
    }
    // Content for AI Chatbot
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-2xl mx-auto my-10 p-8 sm:p-12 bg-white border border-stone-200 rounded-3xl shadow-sm text-center relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-xs",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            className: "w-8 h-8 text-emerald-600 fill-emerald-600"
                        }, void 0, false, {
                            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-serif font-bold text-3xl text-stone-900 mb-3 tracking-tight",
                        children: "Trợ lý AI Dinh dưỡng"
                    }, void 0, false, {
                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-stone-600 text-base max-w-md mx-auto mb-6",
                        children: "Tính năng này chỉ dành cho thành viên Premium. Mở khóa tư vấn dinh dưỡng thuần thực vật không giới hạn, được cá nhân hóa theo các chỉ số cơ thể của bạn."
                    }, void 0, false, {
                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-stone-50 border border-stone-200/90 rounded-2xl p-5 max-w-md mx-auto mb-8 text-left space-y-2.5",
                        children: [
                            "Gợi ý tức thì món ăn cho bữa sáng, trưa, tối dựa trên lượng calo còn lại",
                            "Đổi món an toàn theo dị ứng và trường phái ăn chay của bạn",
                            "Giải thích chi tiết chỉ số BMI và mục tiêu chuyển hóa",
                            "Hướng dẫn tìm nguồn thực phẩm chay Việt Nam & bổ sung vi chất B12"
                        ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-2.5 text-sm text-stone-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "w-3 h-3 stroke-[2.5]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                            lineNumber: 150,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item, true, {
                                fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row items-center justify-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setModalOpen(true),
                                className: "w-full sm:w-auto h-12 px-8 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "w-4 h-4 text-amber-900 fill-amber-900"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this),
                                    "Nâng cấp Premium",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>toggle(),
                                className: "text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 py-2 px-3 cursor-pointer",
                                children: "[Thử nghiệm: Mở nhanh]"
                            }, void 0, false, {
                                fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-stone-400 mt-4",
                        children: "Trạng thái được lưu trong hệ thống và duy trì khi làm mới trang."
                    }, void 0, false, {
                        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$components$2f$MockPaymentModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockPaymentModal"], {
                isOpen: modalOpen,
                onClose: ()=>setModalOpen(false),
                onSuccess: (planId)=>purchase(planId)
            }, void 0, false, {
                fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/subscription/guards/PremiumGuard.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_s(PremiumGuard, "MRnvrrtqd6T1e2Zn3oEa1Y2+zeM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$hooks$2f$useSubscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"]
    ];
});
_c = PremiumGuard;
var _c;
__turbopack_context__.k.register(_c, "PremiumGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/subscription/hooks/useSubscription.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSubscription",
    ()=>useSubscription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$services$2f$subscriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/subscription/services/subscriptionService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage/storage.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useSubscription() {
    _s();
    const [subscription, setSubscription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useSubscription.useState": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$services$2f$subscriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscriptionService"].getSubscription()
    }["useSubscription.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSubscription.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$services$2f$subscriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscriptionService"].fetchServerStatus().then(setSubscription);
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].subscribe({
                "useSubscription.useEffect.unsubscribe": (event)=>{
                    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SUBSCRIPTION) {
                        setSubscription(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$services$2f$subscriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscriptionService"].getSubscription());
                    }
                }
            }["useSubscription.useEffect.unsubscribe"]);
            return unsubscribe;
        }
    }["useSubscription.useEffect"], []);
    const purchase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSubscription.useCallback[purchase]": (planId)=>{
            const updated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$services$2f$subscriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscriptionService"].purchasePlan(planId);
            setSubscription(updated);
            return updated;
        }
    }["useSubscription.useCallback[purchase]"], []);
    const cancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSubscription.useCallback[cancel]": async (id)=>{
            const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$services$2f$subscriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscriptionService"].cancelSubscription(id);
            setSubscription(updated);
            return updated;
        }
    }["useSubscription.useCallback[cancel]"], []);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSubscription.useCallback[toggle]": ()=>{
            const updated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$services$2f$subscriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscriptionService"].togglePremium();
            setSubscription(updated);
            return updated;
        }
    }["useSubscription.useCallback[toggle]"], []);
    const checkout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSubscription.useCallback[checkout]": async ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$services$2f$subscriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscriptionService"].createCheckout();
        }
    }["useSubscription.useCallback[checkout]"], []);
    const refreshStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSubscription.useCallback[refreshStatus]": async ()=>{
            const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$services$2f$subscriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscriptionService"].fetchServerStatus();
            setSubscription(updated);
            return updated;
        }
    }["useSubscription.useCallback[refreshStatus]"], []);
    return {
        subscription,
        isPremium: subscription.status === "active",
        purchase,
        cancel,
        toggle,
        checkout,
        refreshStatus
    };
}
_s(useSubscription, "0/WIzcW9NzY1VUSsh3TikJjEAtk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/subscription/services/subscriptionService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "subscriptionService",
    ()=>subscriptionService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tokenStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/subscription/data/mockSubscriptions.ts [app-client] (ecmascript)");
;
;
;
;
const SUBSCRIPTION_PLAN_KEY = "subscriptionPlan";
const subscriptionService = {
    /**
   * Get subscription plan ("free" | "premium")
   */ getSubscriptionPlan () {
        if ("TURBOPACK compile-time truthy", 1) {
            const explicit = window.localStorage.getItem(SUBSCRIPTION_PLAN_KEY);
            if (explicit === "premium" || explicit === "free") {
                return explicit;
            }
        }
        const current = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SUBSCRIPTION, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SUBSCRIPTION"]);
        return current.status === "active" ? "premium" : "free";
    },
    getSubscription () {
        const plan = this.getSubscriptionPlan();
        const stored = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SUBSCRIPTION, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SUBSCRIPTION"]);
        if (plan === "premium" && stored.status !== "active") {
            const premiumPlan = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PLANS"].find((p)=>p.id === "premium") || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PLANS"][1];
            const fixed = {
                status: "active",
                planId: "premium",
                planName: premiumPlan.name,
                autoRenew: false
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SUBSCRIPTION, fixed);
            return fixed;
        }
        if (plan === "free" && stored.status === "active") {
            const fixed = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SUBSCRIPTION"]
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SUBSCRIPTION, fixed);
            return fixed;
        }
        return stored;
    },
    isPremium () {
        return this.getSubscriptionPlan() === "premium";
    },
    /**
   * Đồng bộ trạng thái Premium thật từ backend:
   * GET /subscriptions/me/premium-status
   */ async fetchServerStatus () {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getToken();
        if (!token) {
            return this.getSubscription();
        }
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/subscriptions/me/premium-status");
            const isPrem = !!res?.isPremium;
            if (isPrem) {
                if ("TURBOPACK compile-time truthy", 1) {
                    window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "premium");
                }
                const activeSub = {
                    status: "active",
                    planId: "premium",
                    planName: "Premium 1 tháng",
                    expiresAt: res.premium_until || undefined,
                    autoRenew: false
                };
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SUBSCRIPTION, activeSub);
                // Đồng bộ Auth user cache
                const authUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getUser();
                if (authUser) {
                    authUser.is_premium = true;
                    if (res.premium_until) {
                        authUser.premium_until = new Date(res.premium_until);
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].setUser(authUser);
                }
                return activeSub;
            } else {
                if ("TURBOPACK compile-time truthy", 1) {
                    window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "free");
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SUBSCRIPTION, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SUBSCRIPTION"]);
                const authUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getUser();
                if (authUser && authUser.is_premium) {
                    authUser.is_premium = false;
                    authUser.premium_until = undefined;
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].setUser(authUser);
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SUBSCRIPTION"];
            }
        } catch (err) {
            console.warn("[subscriptionService] fetchServerStatus fallback:", err);
            return this.getSubscription();
        }
    },
    /**
   * Lấy danh sách các gói dịch vụ thật từ backend:
   * GET /subscriptions/plans
   */ async getPlans () {
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/subscriptions/plans");
            if (Array.isArray(res) && res.length > 0) {
                const backendPlans = res.map((bp)=>({
                        id: "premium",
                        name: bp.name,
                        price: bp.price,
                        formattedPrice: `${bp.price.toLocaleString("vi-VN")} đ`,
                        duration: "monthly",
                        billingCycleText: `${bp.price.toLocaleString("vi-VN")} đ / ${bp.duration_days} ngày`,
                        badge: "Toàn bộ tính năng",
                        popular: true,
                        description: bp.description,
                        features: [
                            "Kế hoạch thực đơn cá nhân hóa toàn diện",
                            "Mục tiêu calo chuẩn theo chỉ số cơ thể",
                            "Gợi ý bữa ăn dựa trên BMI & BMR",
                            "Loại trừ dị ứng thực phẩm nghiêm ngặt",
                            "Đầy đủ thực đơn tuần và lịch tháng",
                            "Tùy biến đổi món và chỉnh sửa thực đơn",
                            "AI Dinh dưỡng hỗ trợ tư vấn",
                            "Tạo lại thực đơn không giới hạn",
                            "Ưu tiên tích hợp món ăn yêu thích"
                        ]
                    }));
                const freePlan = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PLANS"].find((p)=>p.id === "free") || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PLANS"][0];
                return [
                    freePlan,
                    ...backendPlans
                ];
            }
        } catch (err) {
            console.warn("[subscriptionService] getPlans error, fallback to mock:", err);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PLANS"];
    },
    /**
   * Tạo giao dịch VNPay thật:
   * POST /subscriptions/checkout
   * Trả về { payment_url, gateway_txn_ref, amount, expires_in_minutes }
   */ async createCheckout () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/subscriptions/checkout");
    },
    /**
   * Xác nhận kết quả thanh toán từ VNPay Return URL:
   * GET /subscriptions/vnpay-return
   */ async verifyVnpayReturn (params) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/subscriptions/vnpay-return", {
            params
        });
    },
    /**
   * Kích hoạt trạng thái Premium sau khi thanh toán thành công
   */ setPremiumActive (premiumUntil, txnRef) {
        if ("TURBOPACK compile-time truthy", 1) {
            window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "premium");
        }
        const updated = {
            status: "active",
            planId: "premium",
            planName: "Premium 1 tháng",
            activatedAt: new Date().toISOString(),
            expiresAt: premiumUntil || undefined,
            autoRenew: false
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SUBSCRIPTION, updated);
        const authUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getUser();
        if (authUser) {
            authUser.is_premium = true;
            if (premiumUntil) {
                authUser.premium_until = new Date(premiumUntil);
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].setUser(authUser);
        }
        return updated;
    },
    /**
   * Kích hoạt Demo / Test khi cổng thanh toán chưa được cấu hình
   */ purchasePlan (planId = "premium") {
        const now = new Date();
        const expires = new Date();
        expires.setDate(now.getDate() + 30);
        return this.setPremiumActive(expires.toISOString());
    },
    upgradeToPremium () {
        return this.purchasePlan("premium");
    },
    /**
   * Hủy gói Premium:
   * DELETE /subscriptions/:id
   */ async cancelSubscription (id = 1) {
        if ("TURBOPACK compile-time truthy", 1) {
            window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "free");
        }
        const updated = {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SUBSCRIPTION"],
            status: "free",
            planId: "free",
            planName: "Free Plan"
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SUBSCRIPTION, updated);
        const authUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getUser();
        if (authUser) {
            authUser.is_premium = false;
            authUser.premium_until = undefined;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].setUser(authUser);
        }
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getToken();
        if (token) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/subscriptions/${id}`);
            } catch (err) {
                console.warn("[subscriptionService] cancel error:", err);
            }
        }
        return updated;
    },
    togglePremium () {
        if (this.isPremium()) {
            this.cancelSubscription();
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$subscription$2f$data$2f$mockSubscriptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SUBSCRIPTION"];
        }
        return this.upgradeToPremium();
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

//# sourceMappingURL=src_0etmgac._.js.map
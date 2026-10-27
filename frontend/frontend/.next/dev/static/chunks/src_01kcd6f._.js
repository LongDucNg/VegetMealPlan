(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/src/components/ui/Chip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chip",
    ()=>Chip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function Chip({ variant = "filter", active = false, className = "", children, ...props }) {
    if (variant === "diet") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: `h-[30px] px-3 text-[13px] font-medium rounded-full border transition-colors cursor-pointer select-none ${active ? "bg-emerald-700 text-white border-emerald-700" : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900"} ${className}`,
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Chip.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        className: `h-10 px-[18px] text-[15px] rounded-full border transition-colors cursor-pointer select-none inline-flex items-center justify-center shrink-0 whitespace-nowrap ${active ? "bg-emerald-700 text-white border-emerald-700 font-semibold shadow-sm" : "bg-white text-stone-700 border-stone-200 font-medium hover:border-stone-300 hover:text-stone-900"} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Chip.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c = Chip;
var _c;
__turbopack_context__.k.register(_c, "Chip");
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
"[project]/src/components/ui/SectionHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionHeader",
    ()=>SectionHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
;
;
function SectionHeader({ eyebrow, title, actionText = "See all", onAction, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-end justify-between ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    eyebrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[13px] font-semibold uppercase tracking-[0.1em] text-emerald-700 mb-1",
                        children: eyebrow
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SectionHeader.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-serif font-bold text-[30px] text-stone-900 tracking-tight leading-tight",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SectionHeader.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/SectionHeader.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            actionText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onAction,
                className: "inline-flex items-center gap-1.5 text-base font-medium text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: actionText
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SectionHeader.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                        className: "w-4 h-4",
                        strokeWidth: 1.75
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SectionHeader.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/SectionHeader.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/SectionHeader.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = SectionHeader;
var _c;
__turbopack_context__.k.register(_c, "SectionHeader");
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
"[project]/src/features/discover/components/Hero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hero",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.mjs [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chef$2d$hat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChefHat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chef-hat.mjs [app-client] (ecmascript) <export default as ChefHat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.mjs [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$components$2f$DurationChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/components/DurationChip.tsx [app-client] (ecmascript)");
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
;
;
;
;
function Hero() {
    _s();
    const { profile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"])();
    const userId = String(profile?.id || "u1");
    const heroRecipeId = "v1";
    const [isFav, setIsFav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Hero.useState": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].isRecipeFavorite(userId, heroRecipeId);
        }
    }["Hero.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Hero.useEffect": ()=>{
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].subscribe({
                "Hero.useEffect.unsubscribe": (event)=>{
                    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].FAVORITES) {
                        setIsFav(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].isRecipeFavorite(userId, heroRecipeId));
                    }
                }
            }["Hero.useEffect.unsubscribe"]);
            return unsubscribe;
        }
    }["Hero.useEffect"], [
        userId
    ]);
    const handleToggleFavorite = ()=>{
        const updated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$recipes$2f$services$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoriteService"].toggleFavoriteRecipe(userId, heroRecipeId);
        setIsFav(updated);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-[498px] w-full rounded-3xl bg-emerald-900 overflow-hidden select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -left-10 -bottom-20 w-64 h-64 rounded-full bg-emerald-800 pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/src/features/discover/components/Hero.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 inset-y-0 w-[55%] overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/images/hero-bowl.jpg",
                        alt: "Lemongrass Tofu Rice Bowl",
                        fill: true,
                        priority: true,
                        className: "object-cover",
                        sizes: "(max-width: 1280px) 100vw, 55vw"
                    }, void 0, false, {
                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-emerald-900 to-transparent pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-4 bottom-4 z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$components$2f$DurationChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DurationChip"], {
                            duration: "5:12",
                            variant: "hero"
                        }, void 0, false, {
                            fileName: "[project]/src/features/discover/components/Hero.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/discover/components/Hero.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 p-11 max-w-[500px] h-full flex flex-col justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-8 px-3 rounded-full bg-amber-400 text-amber-950 text-sm font-semibold inline-flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                className: "w-3.5 h-3.5 fill-current"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 75,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Món ngon trong ngày"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 76,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold text-emerald-200",
                                        children: "Món Việt"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-6 font-serif font-bold text-[46px] leading-[50px] text-white tracking-tight",
                                children: [
                                    "Cơm Đậu Hũ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this),
                                    "Sả Ớt Giòn Rụm"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 text-lg leading-[27px] text-emerald-100",
                                children: "Đậu hũ chiên sả ớt giòn thơm dùng kèm cơm lài dẻo thơm, đồ chua thanh mát và nước mắm chay đậm đà chuẩn vị."
                            }, void 0, false, {
                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex items-center gap-6 text-base font-semibold text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                className: "w-[18px] h-[18px] text-emerald-200"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 98,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "35 phút"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 99,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chef$2d$hat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChefHat$3e$__["ChefHat"], {
                                                className: "w-[18px] h-[18px] text-emerald-200"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 102,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Dễ làm"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 103,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                className: "w-[18px] h-[18px] fill-amber-400 text-amber-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "4.8"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 107,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-emerald-300 font-semibold",
                                                children: "(1.3K)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 108,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                className: "w-[18px] h-[18px] text-emerald-200"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 111,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "540 kcal"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 112,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-7 flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/videos/v1",
                                        className: "h-[54px] px-7 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-[17px] font-medium inline-flex items-center gap-2.5 transition-colors cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                className: "w-[18px] h-[18px] fill-current"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 122,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Xem công thức"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 123,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleToggleFavorite,
                                        title: isFav ? "Bỏ thích công thức" : "Thêm vào công thức yêu thích",
                                        className: `h-[54px] px-5 rounded-full text-[17px] font-semibold inline-flex items-center gap-2.5 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 ${isFav ? "bg-rose-500/20 text-rose-300 border border-rose-400/40 hover:bg-rose-500/30" : "text-white hover:bg-white/10 border border-white/20"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                className: `w-[18px] h-[18px] transition-transform ${isFav ? "fill-rose-400 text-rose-400 scale-110" : ""}`,
                                                strokeWidth: 1.75
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 135,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: isFav ? "Yêu thích" : "Thích công thức"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 141,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px w-full bg-white/10"
                            }, void 0, false, {
                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                        initials: "LN",
                                        verified: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 text-base font-semibold text-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Linh Nguyen"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 152,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/60",
                                                children: "·"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 153,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-emerald-200/85 font-normal",
                                                children: "@linh.greens"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                                lineNumber: 154,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/discover/components/Hero.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/discover/components/Hero.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/discover/components/Hero.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/discover/components/Hero.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(Hero, "hPWvls+iBwFWEfeKCzU934Jly1A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$profile$2f$hooks$2f$useProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfile"]
    ];
});
_c = Hero;
var _c;
__turbopack_context__.k.register(_c, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/discover/components/TrendingVideos.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrendingVideos",
    ()=>TrendingVideos
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.mjs [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SectionHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SectionHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Chip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Chip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$components$2f$VideoCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/components/VideoCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/videos/data/mockVideos.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function TrendingVideos() {
    _s();
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const filteredVideos = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_RECIPES"].filter((recipe)=>{
        if (activeFilter === "All") return true;
        return recipe.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(recipe.category.toLowerCase());
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mt-11",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SectionHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionHeader"], {
                eyebrow: "XEM & NẤU ĂN",
                title: "Công thức video thịnh hành",
                actionText: "Xem tất cả"
            }, void 0, false, {
                fileName: "[project]/src/features/discover/components/TrendingVideos.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-wrap items-center gap-2.5",
                children: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$data$2f$mockVideos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RECIPE_FILTERS"].map((filter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Chip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"], {
                            variant: "filter",
                            active: activeFilter === filter,
                            onClick: ()=>setActiveFilter(filter),
                            className: "shrink-0 whitespace-nowrap",
                            children: filter
                        }, filter, false, {
                            fileName: "[project]/src/features/discover/components/TrendingVideos.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "h-10 px-4 text-sm font-semibold rounded-full border border-stone-200 bg-white text-stone-700 hover:text-stone-900 hover:border-stone-300 transition-colors inline-flex items-center gap-2 shrink-0 whitespace-nowrap cursor-pointer shadow-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                className: "w-4 h-4 text-stone-500",
                                strokeWidth: 1.75
                            }, void 0, false, {
                                fileName: "[project]/src/features/discover/components/TrendingVideos.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Bộ lọc"
                            }, void 0, false, {
                                fileName: "[project]/src/features/discover/components/TrendingVideos.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/discover/components/TrendingVideos.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/discover/components/TrendingVideos.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]",
                children: filteredVideos.map((recipe)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$videos$2f$components$2f$VideoCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideoCard"], {
                        title: recipe.title,
                        duration: recipe.duration,
                        author: recipe.author,
                        views: recipe.views,
                        imageUrl: recipe.image
                    }, recipe.id, false, {
                        fileName: "[project]/src/features/discover/components/TrendingVideos.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/features/discover/components/TrendingVideos.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/discover/components/TrendingVideos.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(TrendingVideos, "AZRvGA5qNeOgBNoKkTmonibR1jE=");
_c = TrendingVideos;
var _c;
__turbopack_context__.k.register(_c, "TrendingVideos");
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

//# sourceMappingURL=src_01kcd6f._.js.map
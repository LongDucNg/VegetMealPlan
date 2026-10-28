(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/admin/services/adminRecipeApiService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminRecipeApiService",
    ()=>adminRecipeApiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/api/client.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tokenStorage.ts [app-client] (ecmascript)");
;
;
;
;
const adminRecipeApiService = {
    // API #20: GET /admin/recipes - Tất cả recipe gồm draft, pending, rejected
    getAdminRecipes (status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/admin/recipes", status ? {
            status
        } : undefined);
    },
    // API #21: PUT /admin/recipes/:id/status - Duyệt, từ chối kèm lý do
    updateRecipeStatus (id, status, rejected_reason) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/admin/recipes/${id}/status`, {
            status,
            rejected_reason
        });
    },
    // API #22: POST /admin/recipe-imports - Nhập Excel
    importRecipeExcel (file) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].upload("/admin/recipe-imports", file, "file");
    },
    // API #23: GET /admin/recipe-imports - Lịch sử lô nhập
    getImportBatches () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("/admin/recipe-imports");
    },
    // API #24: GET /admin/recipe-imports/:id/items - Chi tiết từng dòng nhập
    getImportBatchItems (batchId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/admin/recipe-imports/${batchId}/items`);
    },
    /**
   * API Export: GET /recipes/export
   * Hỗ trợ 3 chế độ xuất dữ liệu:
   * 1. Xuất 1 món: params = { ids: "15" } -> File chứa món ID 15
   * 2. Xuất nhiều món: params = { ids: "15,20,35" } -> Một file chứa cả 3 món
   * 3. Xuất theo bộ lọc: params = { dietType: "vegan", status: "approved" } -> File chứa tất cả món phù hợp
   */ async exportRecipes (params = {}) {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tokenStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenStorage"].getToken();
        const query = new URLSearchParams();
        if (params.ids !== undefined && params.ids !== null && params.ids !== "") {
            const idsStr = Array.isArray(params.ids) ? params.ids.join(",") : String(params.ids).trim();
            if (idsStr) {
                query.append("ids", idsStr);
            }
        }
        if (params.mealType && params.mealType !== "all") {
            query.append("mealType", params.mealType.trim());
        }
        if (params.dietType && params.dietType !== "all") {
            let dt = params.dietType.trim().toLowerCase();
            if (dt === "lacto_vegetarian") dt = "lacto";
            if (dt === "ovo_vegetarian") dt = "ovo";
            if (dt === "lacto_ovo_vegetarian") dt = "ovo_lacto";
            query.append("diet_type", dt);
        }
        if (params.status && params.status !== "all") {
            query.append("status", params.status.trim().toLowerCase());
        }
        if (params.category && params.category !== "all") {
            query.append("category", String(params.category).trim());
        }
        if (params.q && params.q.trim()) {
            query.append("q", params.q.trim());
        }
        const qs = query.toString();
        const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/recipes/export${qs ? `?${qs}` : ""}`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                ...token ? {
                    Authorization: `Bearer ${token}`
                } : {}
            }
        });
        if (!res.ok) {
            let errMsg = "Không thể xuất file dữ liệu công thức.";
            try {
                const text = await res.text();
                const json = JSON.parse(text);
                errMsg = json?.message || json?.error || errMsg;
            } catch  {
                errMsg = `Lỗi máy chủ (${res.status}): ${res.statusText || "Yêu cầu thất bại"}`;
            }
            throw new Error(errMsg);
        }
        const disposition = res.headers.get("content-disposition");
        let filename = "cong-thuc-xuat.csv";
        if (disposition) {
            const match = disposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i);
            if (match && match[1]) {
                filename = decodeURIComponent(match[1]);
            }
        }
        if (!filename.toLowerCase().endsWith(".csv")) {
            filename += ".csv";
        }
        const rawBlob = await res.blob();
        const blob = new Blob([
            rawBlob
        ], {
            type: "text/csv;charset=utf-8;"
        });
        if ("TURBOPACK compile-time truthy", 1) {
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
        }
        return {
            filename,
            blob
        };
    },
    /**
   * Xuất danh sách công thức ra định dạng Excel (.xlsx) chuẩn 100%
   */ exportRecipesToExcel (recipes, filenamePrefix = "Cong_Thuc_Mon_Chay") {
        if (("TURBOPACK compile-time value", "object") === "undefined" || !recipes || recipes.length === 0) {
            throw new Error("Không có công thức nào để xuất ra file Excel.");
        }
        const headers = [
            "ID",
            "Tên món",
            "Danh mục",
            "Mô tả",
            "Bữa ăn",
            "Chế độ ăn chay",
            "Độ khó",
            "Khẩu phần",
            "Thời gian chuẩn bị (phút)",
            "Thời gian nấu (phút)",
            "Nguyên liệu",
            "Hướng dẫn thực hiện",
            "Năng lượng (kcal)",
            "Đạm (g)",
            "Tinh bột (g)",
            "Chất béo (g)",
            "Chất xơ (g)",
            "Chi phí ước tính",
            "Trạng thái"
        ];
        const rows = recipes.map((r)=>{
            const numId = parseInt(String(r.id || r.recipe_id || "").replace(/\D/g, ""), 10);
            const ingList = r.ingredients || [];
            const ingText = Array.isArray(ingList) ? ingList.map((ing)=>{
                if (typeof ing === "string") return ing;
                const name = ing.name || ing.ingredient_name || ing.ingredient?.ingredient_name || "Nguyên liệu";
                const qty = ing.quantity ?? 1;
                const unit = ing.unit ?? "g";
                const opt = ing.is_optional ? " (tuỳ chọn)" : "";
                return `${name} (${qty}${unit}${opt})`;
            }).join(", ") : String(ingList);
            const instructions = r.instructions || (Array.isArray(r.steps) ? r.steps.join("\n") : "");
            return [
                !isNaN(numId) ? numId : r.id,
                r.name || r.title || "",
                r.category || (Array.isArray(r.categories) ? r.categories.join(", ") : ""),
                r.description || "",
                r.mealType || r.meal_type || "",
                r.vegetarianType || r.diet_type || "",
                r.difficulty || "",
                r.servings || 1,
                r.prepTime || r.prep_time || 0,
                r.cookTime || r.cook_time || 0,
                ingText,
                instructions,
                r.calories ?? r.nutrition?.calories ?? 0,
                r.protein ?? r.nutrition?.protein ?? 0,
                r.carbs ?? r.nutrition?.carbs ?? 0,
                r.fat ?? r.nutrition?.fat ?? 0,
                r.fiber ?? r.nutrition?.fiber ?? 0,
                r.estimatedCost ?? r.estimated_cost ?? 0,
                r.status || "APPROVED"
            ];
        });
        const ws = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].aoa_to_sheet([
            headers,
            ...rows
        ]);
        ws["!cols"] = [
            {
                wch: 8
            },
            {
                wch: 28
            },
            {
                wch: 18
            },
            {
                wch: 35
            },
            {
                wch: 12
            },
            {
                wch: 16
            },
            {
                wch: 10
            },
            {
                wch: 10
            },
            {
                wch: 22
            },
            {
                wch: 18
            },
            {
                wch: 45
            },
            {
                wch: 45
            },
            {
                wch: 15
            },
            {
                wch: 10
            },
            {
                wch: 12
            },
            {
                wch: 12
            },
            {
                wch: 12
            },
            {
                wch: 16
            },
            {
                wch: 14
            }
        ];
        const wb = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_new();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(wb, ws, "CongThucChay");
        const stamp = new Date().toISOString().slice(0, 10);
        const filename = `${filenamePrefix}_${recipes.length}_mon_${stamp}.xlsx`;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeFile"](wb, filename);
        return filename;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_features_admin_services_adminRecipeApiService_ts_09wash6._.js.map
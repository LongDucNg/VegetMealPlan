(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
]);

//# sourceMappingURL=src_features_recipes_services_ingredientApiService_ts_05v_47m._.js.map
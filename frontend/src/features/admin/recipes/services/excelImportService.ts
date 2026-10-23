import * as XLSX from "xlsx";
import { Recipe, RecipeStatus, MealType, IngredientItem } from "@/features/recipes/types";
import { VegetarianType } from "@/features/profile/types";
import { recipeService } from "@/features/recipes/services/recipeService";
import { priceService } from "@/features/recipes/services/priceService";
import { ingredientConflictService } from "@/features/recipes/services/ingredientConflictService";
import { vegetarianValidationService } from "@/features/recipes/services/vegetarianValidationService";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";

export type ImportIssueType =
  | "DUPLICATE"
  | "INGREDIENT_CONFLICT"
  | "NON_VEGETARIAN"
  | "MISSING_DATA"
  | "INVALID_INGREDIENT"
  | "INVALID_NUTRITION"
  | "DUPLICATE_INGREDIENT"
  | "INVALID_SOURCE";

export interface ImportValidationIssue {
  type: ImportIssueType;
  message: string;
  details?: string;
  duplicateOfRecipeId?: string;
}

export interface ImportPendingRecipe {
  tempId: string;
  recipe: Recipe;
  issues: ImportValidationIssue[];
  isValid: boolean;
  reviewStatus: "PENDING_REVIEW" | "APPROVED" | "REJECTED";
}

export interface ImportSummary {
  totalImported: number;
  validCount: number;
  duplicateCount: number;
  conflictCount: number;
  nonVegetarianCount: number;
  missingDataCount: number;
  invalidDataCount: number;
}

// Normalize strings for matching
function normalizeText(str: string): string {
  return (str || "")
    .toLowerCase()
    .trim()
    .replace(/[\s\-_]+/g, " ");
}

export const excelImportService = {
  /**
   * Tải tệp mẫu Excel chuẩn tiếng Việt cho Admin (Hỗ trợ nhập trực tiếp vào hệ thống)
   */
  downloadTemplate(): void {
    if (typeof window === "undefined") return;

    const headers = [
      "Tên món",
      "Mô tả",
      "Hướng dẫn",
      "Bữa ăn",
      "Chế độ ăn chay",
      "Thời gian chuẩn bị (phút)",
      "Thời gian nấu (phút)",
      "Khẩu phần",
      "Độ khó",
      "Nguyên liệu",
    ];

    const sampleRows = [
      [
        "Đậu phụ sốt cà chua",
        "Đậu phụ chiên giòn sốt cùng cà chua tươi, hành hoa đậm đà thanh ngọt.",
        "1. Cắt đậu phụ miếng vừa ăn, chiên vàng đều hai mặt.\n2. Phi thơm hành, xào nhuyễn cà chua với chút muối và hạt nêm chay.\n3. Cho đậu phụ vào đảo nhỏ lửa 5 phút cho ngấm sốt, rắc hành lá rồi tắt bếp.",
        "Trưa/Tối",
        "Thuần chay",
        10,
        15,
        2,
        "Dễ",
        "Đậu phụ (200g), Cà chua (150g), Hành lá (20g)",
      ],
      [
        "Canh chua chay Nam Bộ",
        "Canh chua thanh mát với dứa, cà chua, đậu bắp, giá đỗ và ngò gai thơm lành.",
        "1. Sơ chế các loại rau củ sạch sẽ, cắt khúc vừa ăn.\n2. Nấu sôi nước me, cho dứa, cà chua và đậu phụ vào đun sôi.\n3. Cho tiếp đậu bắp, giá đỗ, nêm đường muối chay vừa ăn rồi tắt bếp, rắc ngò gai.",
        "Trưa/Tối",
        "Thuần chay",
        15,
        15,
        4,
        "Trung bình",
        "Đậu phụ (150g), Cà chua (100g), Dứa (100g), Đậu bắp (50g), Giá đỗ (50g)",
      ],
      [
        "Bún xào rau nấm chay",
        "Bún gạo xào giòn ngọt cùng nấm rơm, cà rốt và cải ngọt giàu năng lượng bữa sáng.",
        "1. Trụng bún qua nước sôi, để ráo dầu mè.\n2. Phi thơm hành baro, xào nấm rơm và rau củ vừa chín tới.\n3. Cho bún vào đảo đều với nước tương chay, rắc tiêu thơm và dùng nóng.",
        "Sáng",
        "Thuần chay",
        10,
        10,
        2,
        "Dễ",
        "Bún tươi (250g), Nấm rơm (100g), Cà rốt (60g), Cải ngọt (100g)",
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleRows]);
    // Đặt độ rộng các cột cho dễ nhìn
    ws["!cols"] = [
      { wch: 25 }, // Tên món
      { wch: 35 }, // Mô tả
      { wch: 45 }, // Hướng dẫn
      { wch: 12 }, // Bữa ăn
      { wch: 18 }, // Chế độ ăn chay
      { wch: 22 }, // Thời gian chuẩn bị
      { wch: 20 }, // Thời gian nấu
      { wch: 12 }, // Khẩu phần
      { wch: 12 }, // Độ khó
      { wch: 45 }, // Nguyên liệu
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CongThucChay");
    XLSX.writeFile(wb, "Mau_Nhap_Cong_Thuc_Chay.xlsx");
  },

  /**
   * Parses file buffer (xlsx or csv), groups multi-row ingredients, and executes validation checks
   */
  async parseAndValidateFile(file: File): Promise<{
    summary: ImportSummary;
    items: ImportPendingRecipe[];
  }> {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Read rows as array of objects with normalized keys
    const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
      defval: "",
    });

    if (!rawRows || rawRows.length === 0) {
      throw new Error("Uploaded file is empty or contains no readable rows.");
    }

    // Group rows by Recipe Name (Requirement 9)
    const grouped = new Map<string, Record<string, unknown>[]>();

    for (const row of rawRows) {
      // Find key matching "Recipe Name" or "recipe_name" or "Name"
      const nameKey =
        Object.keys(row).find((k) =>
          normalizeText(k).includes("recipe name") || normalizeText(k) === "name"
        ) || Object.keys(row)[0];

      const recipeName = String(row[nameKey] || "").trim();
      if (!recipeName) continue; // skip blank rows

      const normName = normalizeText(recipeName);
      if (!grouped.has(normName)) {
        grouped.set(normName, []);
      }
      grouped.get(normName)!.push(row);
    }

    const existingRecipes = recipeService.getRecipes();
    const pendingItems: ImportPendingRecipe[] = [];

    // Helper to find column by loose keyword
    const findVal = (row: Record<string, unknown>, ...keywords: string[]): string => {
      for (const kw of keywords) {
        const key = Object.keys(row).find((k) => normalizeText(k).includes(normalizeText(kw)));
        if (key && row[key] !== undefined && row[key] !== null) {
          return String(row[key]).trim();
        }
      }
      return "";
    };

    let idx = 0;
    for (const [normName, rows] of Array.from(grouped.entries())) {
      idx++;
      const firstRow = rows[0];
      const issues: ImportValidationIssue[] = [];

      const rawTitle = findVal(firstRow, "recipe name", "name", "title") || "Untitled Recipe";
      const description = findVal(firstRow, "description", "desc") || "Imported recipe.";
      const rawMealType = findVal(firstRow, "meal type", "mealtype", "meal").toLowerCase();
      const rawVegType = findVal(firstRow, "vegetarian type", "diet", "vegetarian").toLowerCase();
      const calories = parseInt(findVal(firstRow, "calories", "kcal"), 10);
      const protein = parseInt(findVal(firstRow, "protein"), 10);
      const carbs = parseInt(findVal(firstRow, "carbs", "carbohydrates"), 10);
      const fat = parseInt(findVal(firstRow, "fat"), 10);
      const rawAllergens = findVal(firstRow, "allergens", "allergy");
      const sourceUrl = findVal(firstRow, "source url", "url", "link");
      const sourceName = findVal(firstRow, "source name", "source", "author") || "Excel Import";

      // Parse MealType
      let mealType: MealType = "lunch";
      if (["breakfast", "lunch", "dinner", "snack"].includes(rawMealType)) {
        mealType = rawMealType as MealType;
      } else {
        issues.push({
          type: "MISSING_DATA",
          message: `Loại bữa ăn không hợp lệ hoặc để trống: "${rawMealType}". Mặc định chuyển thành Bữa trưa.`,
        });
      }

      // Parse VegetarianType
      let vegetarianType: VegetarianType = "vegan";
      if (["vegan", "lacto_vegetarian", "ovo_vegetarian", "lacto_ovo_vegetarian"].includes(rawVegType)) {
        vegetarianType = rawVegType as VegetarianType;
      }

      // Parse Ingredients from grouped rows
      const ingredients: IngredientItem[] = [];
      const ingredientNamesSeen = new Set<string>();

      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const ingName = findVal(r, "ingredient", "ingredient name", "item");
        const qtyRaw = findVal(r, "quantity", "qty", "amount");
        const unit = findVal(r, "unit", "measure") || "g";

        if (!ingName) {
          issues.push({
            type: "INVALID_INGREDIENT",
            message: `Dòng ${i + 1} để trống tên nguyên liệu.`,
          });
          continue;
        }

        const normIng = normalizeText(ingName);
        if (ingredientNamesSeen.has(normIng)) {
          issues.push({
            type: "DUPLICATE_INGREDIENT",
            message: `Trùng lặp nguyên liệu trong cùng một công thức: "${ingName}".`,
          });
        }
        ingredientNamesSeen.add(normIng);

        const qty = parseFloat(qtyRaw);
        if (isNaN(qty) || qty <= 0) {
          issues.push({
            type: "INVALID_INGREDIENT",
            message: `Số lượng nguyên liệu không hợp lệ cho "${ingName}": "${qtyRaw}".`,
          });
        }

        ingredients.push({
          id: `imp-ing-${idx}-${i + 1}`,
          name: ingName,
          quantity: isNaN(qty) ? 100 : qty,
          unit: unit || "g",
        });
      }

      // 4. Missing Required Data
      if (!rawTitle || rawTitle === "Untitled Recipe") {
        issues.push({
          type: "MISSING_DATA",
          message: "Tên công thức là bắt buộc.",
        });
      }

      if (ingredients.length === 0) {
        issues.push({
          type: "MISSING_DATA",
          message: "Công thức phải có ít nhất một nguyên liệu hợp lệ.",
        });
      }

      // 6. Invalid Nutrition Data
      if (isNaN(calories) || calories <= 0) {
        issues.push({
          type: "INVALID_NUTRITION",
          message: `Năng lượng (calo) không hợp lệ hoặc để trống: ${calories}. Phải là số dương lớn hơn 0.`,
        });
      }

      // 1. Duplicate Recipe Detection (Requirement 11)
      const existingMatch = existingRecipes.find(
        (er) => normalizeText(er.title) === normName || normalizeText(er.name || "") === normName
      );
      if (existingMatch) {
        issues.push({
          type: "DUPLICATE",
          message: `Trùng với công thức đã có trên hệ thống: "${existingMatch.title}".`,
          duplicateOfRecipeId: existingMatch.id,
        });
      }

      // Check duplicates within this same batch
      const batchDuplicate = pendingItems.find(
        (p) => normalizeText(p.recipe.title) === normName
      );
      if (batchDuplicate) {
        issues.push({
          type: "DUPLICATE",
          message: `Trùng với một công thức khác trong cùng tệp tải lên.`,
        });
      }

      // 2. Ingredient Conflict Detection (Requirement 12)
      const conflicts = ingredientConflictService.detectConflicts(ingredients);
      for (const conf of conflicts) {
        issues.push({
          type: "INGREDIENT_CONFLICT",
          message: `Xung đột tương kỵ giữa "${conf.foundA}" và "${conf.foundB}": ${conf.rule.reason}`,
        });
      }

      // 3. Non-Vegetarian Detection (Requirement 13)
      const vegCheck = vegetarianValidationService.validate(ingredients, vegetarianType);
      if (!vegCheck.isCompliant) {
        for (const iss of vegCheck.issues) {
          issues.push({
            type: "NON_VEGETARIAN",
            message: iss,
          });
        }
      }

      // 8. Invalid Source Check
      if (sourceUrl && !sourceUrl.startsWith("http://") && !sourceUrl.startsWith("https://")) {
        issues.push({
          type: "INVALID_SOURCE",
          message: `Đường dẫn nguồn không phải liên kết web hợp lệ: "${sourceUrl}".`,
        });
      }

      // Calculate estimated cost
      const { estimatedCost, ingredientsWithCost } = priceService.calculateRecipeCost(ingredients);

      const allergens = rawAllergens
        ? rawAllergens.split(/[,;/]+/).map((s) => s.trim().toLowerCase()).filter(Boolean)
        : [];

      const constructedRecipe: Recipe = {
        id: `rec-imp-${Date.now()}-${idx}`,
        title: rawTitle,
        name: rawTitle,
        description,
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        category: "Món ăn nhập từ file",
        mealType,
        vegetarianType,
        prepTime: 15,
        cookTime: 15,
        serving: 1,
        calories: isNaN(calories) ? 500 : calories,
        protein: isNaN(protein) ? 25 : protein,
        carbs: isNaN(carbs) ? 65 : carbs,
        fat: isNaN(fat) ? 15 : fat,
        ingredients: ingredientsWithCost,
        allergens,
        instructions: [
          "Sơ chế nguyên liệu tươi sạch theo quy chuẩn vệ sinh an toàn thực phẩm.",
          "Chế biến và nêm nếm gia vị vừa ăn, thưởng thức khi còn ấm nóng.",
        ],
        estimatedCost,
        source: {
          type: sourceUrl ? "web" : "admin",
          name: sourceName,
          url: sourceUrl || undefined,
        },
        status: issues.length === 0 ? "APPROVED" : "PENDING_REVIEW",
      };

      pendingItems.push({
        tempId: constructedRecipe.id,
        recipe: constructedRecipe,
        issues,
        isValid: issues.length === 0,
        reviewStatus: "PENDING_REVIEW",
      });
    }

    // Save pending import items into storage (Requirement 10)
    storage.setItem(STORAGE_KEYS.IMPORT_PENDING, pendingItems);

    const summary: ImportSummary = {
      totalImported: pendingItems.length,
      validCount: pendingItems.filter((i) => i.issues.length === 0).length,
      duplicateCount: pendingItems.filter((i) =>
        i.issues.some((iss) => iss.type === "DUPLICATE")
      ).length,
      conflictCount: pendingItems.filter((i) =>
        i.issues.some((iss) => iss.type === "INGREDIENT_CONFLICT")
      ).length,
      nonVegetarianCount: pendingItems.filter((i) =>
        i.issues.some((iss) => iss.type === "NON_VEGETARIAN")
      ).length,
      missingDataCount: pendingItems.filter((i) =>
        i.issues.some((iss) => iss.type === "MISSING_DATA")
      ).length,
      invalidDataCount: pendingItems.filter((i) =>
        i.issues.some((iss) =>
          ["INVALID_INGREDIENT", "INVALID_NUTRITION", "DUPLICATE_INGREDIENT"].includes(
            iss.type
          )
        )
      ).length,
    };

    return { summary, items: pendingItems };
  },

  /**
   * Retrieves pending items from storage
   */
  getPendingItems(): ImportPendingRecipe[] {
    return storage.getItem<ImportPendingRecipe[]>(STORAGE_KEYS.IMPORT_PENDING, []);
  },

  /**
   * Approves a single recipe: updates status to APPROVED and publishes to live recipe database (Requirement 15)
   */
  approveRecipe(tempId: string): Recipe | null {
    const list = this.getPendingItems();
    const item = list.find((i) => i.tempId === tempId);
    if (!item) return null;

    const publishedRecipe: Recipe = {
      ...item.recipe,
      status: "APPROVED",
    };

    recipeService.createRecipe(publishedRecipe);

    // Remove from pending
    const remaining = list.filter((i) => i.tempId !== tempId);
    storage.setItem(STORAGE_KEYS.IMPORT_PENDING, remaining);

    return publishedRecipe;
  },

  /**
   * Batch approves all 100% valid recipes with one click
   */
  approveAllValid(): number {
    const list = this.getPendingItems();
    const validItems = list.filter((i) => i.isValid);

    for (const item of validItems) {
      recipeService.createRecipe({
        ...item.recipe,
        status: "APPROVED",
      });
    }

    const remaining = list.filter((i) => !i.isValid);
    storage.setItem(STORAGE_KEYS.IMPORT_PENDING, remaining);

    return validItems.length;
  },

  /**
   * Edits and approves an item
   */
  editAndApprove(tempId: string, updatedRecipe: Recipe): Recipe | null {
    const list = this.getPendingItems();
    const item = list.find((i) => i.tempId === tempId);
    if (!item) return null;

    const publishedRecipe: Recipe = {
      ...updatedRecipe,
      status: "APPROVED",
    };

    recipeService.createRecipe(publishedRecipe);

    const remaining = list.filter((i) => i.tempId !== tempId);
    storage.setItem(STORAGE_KEYS.IMPORT_PENDING, remaining);

    return publishedRecipe;
  },

  /**
   * Merges imported duplicate recipe with an existing recipe
   */
  mergeRecipe(tempId: string, existingRecipeId: string): Recipe | null {
    const list = this.getPendingItems();
    const item = list.find((i) => i.tempId === tempId);
    if (!item) return null;

    const updated = recipeService.updateRecipe(existingRecipeId, {
      ingredients: item.recipe.ingredients,
      calories: item.recipe.calories,
      protein: item.recipe.protein,
      carbs: item.recipe.carbs,
      fat: item.recipe.fat,
      estimatedCost: item.recipe.estimatedCost,
      source: item.recipe.source,
    });

    const remaining = list.filter((i) => i.tempId !== tempId);
    storage.setItem(STORAGE_KEYS.IMPORT_PENDING, remaining);

    return updated;
  },

  /**
   * Removes / rejects a pending recipe
   */
  removePendingItem(tempId: string): void {
    const list = this.getPendingItems();
    const remaining = list.filter((i) => i.tempId !== tempId);
    storage.setItem(STORAGE_KEYS.IMPORT_PENDING, remaining);
  },

  /**
   * Tải file Excel trực tiếp lên server để phân tích và lưu database
   * POST /admin/recipe-imports
   */
  async uploadExcelToServer(file: File): Promise<any> {
    const { apiClient } = await import("@/lib/apiClient");
    const formData = new FormData();
    formData.append("file", file);
    return await apiClient.post("/admin/recipe-imports", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * Lấy lịch sử các đợt import của Admin từ server
   * GET /admin/recipe-imports
   */
  async getImportHistory(): Promise<any[]> {
    const { apiClient } = await import("@/lib/apiClient");
    try {
      const res = await apiClient.get<any[]>("/admin/recipe-imports");
      if (Array.isArray(res)) return res;
    } catch (err) {
      console.warn("[excelImportService] Lỗi khi tải lịch sử import:", err);
    }
    return [];
  },

  /**
   * Clears all pending import items
   */
  clearAllPending(): void {
    storage.setItem(STORAGE_KEYS.IMPORT_PENDING, []);
  },
};

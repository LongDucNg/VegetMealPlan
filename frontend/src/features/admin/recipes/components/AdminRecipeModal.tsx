"use client";

import React, { useState, useMemo } from "react";
import { X, Plus, Trash2, Check, Tag, Info } from "lucide-react";
import { Recipe, IngredientItem, MealType, RecipeStatus } from "@/features/recipes/types";
import { VegetarianType } from "@/features/profile/types";
import { priceService, PRICE_WARNING_TEXT } from "@/features/recipes/services/priceService";

interface AdminRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipeData: Omit<Recipe, "id">, editId?: string) => void;
  initialRecipe?: Recipe | null;
}

const CATEGORY_PRESETS = [
  "Breakfast & Porridge",
  "Smoothies & Bowls",
  "Stir-Fried & Crispy",
  "Noodles & Pho",
  "Soups & Broths",
  "Rolls & Salads",
  "Curries & Stews",
  "Mixed Vegan Platters",
  "Snacks & Pastries",
  "Desserts & Drinks",
];

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
];

function AdminRecipeForm({
  initialRecipe,
  onClose,
  onSave,
}: {
  initialRecipe?: Recipe | null;
  onClose: () => void;
  onSave: (recipeData: Omit<Recipe, "id">, editId?: string) => void;
}) {
  const [title, setTitle] = useState(initialRecipe?.title || "");
  const [description, setDescription] = useState(initialRecipe?.description || "");
  const [image, setImage] = useState(initialRecipe?.image || SAMPLE_IMAGES[0]);
  const [category, setCategory] = useState(initialRecipe?.category || CATEGORY_PRESETS[0]);
  const [mealType, setMealType] = useState<MealType>(initialRecipe?.mealType || "lunch");
  const [vegetarianType, setVegetarianType] = useState<VegetarianType>(
    initialRecipe?.vegetarianType || "vegan"
  );
  const [status, setStatus] = useState<RecipeStatus>(initialRecipe?.status || "APPROVED");
  const [sourceName, setSourceName] = useState(initialRecipe?.source?.name || "Admin Created");
  const [sourceUrl, setSourceUrl] = useState(initialRecipe?.source?.url || "");

  const [prepTime, setPrepTime] = useState<number>(initialRecipe?.prepTime ?? 15);
  const [cookTime, setCookTime] = useState<number>(initialRecipe?.cookTime ?? 15);
  const [serving, setServing] = useState<number>(initialRecipe?.serving ?? 1);
  const [calories, setCalories] = useState<number>(initialRecipe?.calories ?? 500);
  const [protein, setProtein] = useState<number>(initialRecipe?.protein ?? 30);
  const [carbs, setCarbs] = useState<number>(initialRecipe?.carbs ?? 60);
  const [fat, setFat] = useState<number>(initialRecipe?.fat ?? 15);
  const [cuisine, setCuisine] = useState(initialRecipe?.cuisine || "Vietnamese");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Advanced">(
    initialRecipe?.difficulty || "Easy"
  );

  const [ingredients, setIngredients] = useState<IngredientItem[]>(
    initialRecipe?.ingredients?.length
      ? initialRecipe.ingredients
      : [
          { id: 1, name: "Firm Tofu", quantity: 200, unit: "g", unitPrice: 45000 },
          { id: 2, name: "Carrot", quantity: 100, unit: "g", unitPrice: 25000 },
          { id: 3, name: "Rice", quantity: 150, unit: "g", unitPrice: 30000 },
        ]
  );

  const [instructions, setInstructions] = useState<string[]>(
    initialRecipe?.instructions?.length
      ? initialRecipe.instructions
      : [
          "Cut ingredients into bite-sized pieces.",
          "Pan-fry until golden and fragrant.",
          "Serve hot with your favorite whole grains.",
        ]
  );

  // Live estimated cost calculation (Requirement 4)
  const estimatedCost = useMemo(() => {
    return priceService.calculateRecipeCost(ingredients).estimatedCost;
  }, [ingredients]);

  const handleAddIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: Date.now(), name: "", quantity: "", unit: "g" },
    ]);
  };

  const handleUpdateIngredient = (
    index: number,
    field: keyof IngredientItem,
    val: string | number
  ) => {
    setIngredients((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddInstruction = () => {
    setInstructions((prev) => [...prev, ""]);
  };

  const handleUpdateInstruction = (index: number, val: string) => {
    setInstructions((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a recipe name.");
      return;
    }

    const { ingredientsWithCost } = priceService.calculateRecipeCost(
      ingredients.filter((i) => i.name.trim() !== "")
    );

    const payload: Omit<Recipe, "id"> = {
      title: title.trim(),
      name: title.trim(),
      description: description.trim(),
      image,
      category,
      mealType,
      vegetarianType,
      status,
      source: {
        type: sourceUrl ? "web" : "admin",
        name: sourceName.trim() || "Admin Created",
        url: sourceUrl.trim() || undefined,
      },
      estimatedCost,
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      duration: `${Number(prepTime) + Number(cookTime)} min`,
      serving: Number(serving),
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
      cuisine,
      difficulty,
      ingredients: ingredientsWithCost,
      instructions: instructions.filter((step) => step.trim() !== ""),
    };

    onSave(payload, initialRecipe?.id);
    onClose();
  };

  return (
    <div className="relative w-full max-w-3xl my-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
      {/* Modal Header */}
      <div className="bg-stone-900 text-white p-6 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Admin Recipe Management
          </span>
          <h2 className="font-serif font-bold text-2xl mt-0.5">
            {initialRecipe ? "Edit Recipe" : "Add New Recipe"}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-80px)] overflow-y-auto"
      >
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-2">
            1. Basic Information & Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Recipe Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Crispy Lemongrass Tofu Rice Bowl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50 px-3.5 text-sm focus:border-emerald-600 focus:bg-white outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                placeholder="Short description highlighting flavors and key health benefits..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm focus:border-emerald-600 focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Status * (Requirement 26)
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as RecipeStatus)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm font-semibold text-emerald-800 focus:border-emerald-600 focus:bg-white outline-none"
              >
                <option value="APPROVED">APPROVED (Active in Meal Planner)</option>
                <option value="PENDING_REVIEW">PENDING_REVIEW</option>
                <option value="DRAFT">DRAFT</option>
                <option value="REJECTED">REJECTED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:border-emerald-600 focus:bg-white outline-none"
              >
                {CATEGORY_PRESETS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Meal Type *
              </label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as MealType)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:border-emerald-600 focus:bg-white outline-none"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Vegetarian Type *
              </label>
              <select
                value={vegetarianType}
                onChange={(e) => setVegetarianType(e.target.value as VegetarianType)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:border-emerald-600 focus:bg-white outline-none"
              >
                <option value="vegan">Vegan (100% Plant)</option>
                <option value="lacto_vegetarian">Lacto Vegetarian (Allows Dairy)</option>
                <option value="ovo_vegetarian">Ovo Vegetarian (Allows Eggs)</option>
                <option value="lacto_ovo_vegetarian">Lacto-Ovo Vegetarian (Dairy & Eggs)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recipe Source & Citation (Requirement 16) */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-2">
            2. Recipe Source & Citation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Source Name / Author:
              </label>
              <input
                type="text"
                placeholder="e.g. Minimalist Baker, Admin Created"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50 px-3.5 text-sm focus:border-emerald-600 focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Source URL (if from web):
              </label>
              <input
                type="url"
                placeholder="https://example.com/recipe"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50 px-3.5 text-sm focus:border-emerald-600 focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Image Selection / URL */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-stone-700">
            Recipe Image URL
          </label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50 px-3.5 text-sm focus:border-emerald-600 focus:bg-white outline-none"
          />
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-stone-500">Or pick preset:</span>
            {SAMPLE_IMAGES.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setImage(url)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  image === url
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800 font-bold"
                    : "border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                Sample #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Cooking Metrics & Macros */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-2">
            3. Timings & Nutritional Values
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-stone-600 mb-1">Prep Time (min)</label>
              <input
                type="number"
                min="0"
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-600 mb-1">Cook Time (min)</label>
              <input
                type="number"
                min="0"
                value={cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-600 mb-1">Servings</label>
              <input
                type="number"
                min="1"
                value={serving}
                onChange={(e) => setServing(Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-600 mb-1 font-bold text-amber-700">
                Calories (kcal) *
              </label>
              <input
                type="number"
                min="50"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-amber-200 bg-amber-50/50 px-3 text-sm font-bold text-amber-900"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-600 mb-1">Protein (g)</label>
              <input
                type="number"
                min="0"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-600 mb-1">Carbs (g)</label>
              <input
                type="number"
                min="0"
                value={carbs}
                onChange={(e) => setCarbs(Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-600 mb-1">Fat (g)</label>
              <input
                type="number"
                min="0"
                value={fat}
                onChange={(e) => setFat(Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-600 mb-1">Cuisine</label>
              <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Ingredients & Pricing Calculation (Requirement 4) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                4. Ingredients & Pricing
              </h3>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Estimated: {priceService.formatEstimatedPrice(estimatedCost)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="text-xs text-emerald-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Ingredient
            </button>
          </div>

          <div className="space-y-2">
            {ingredients.map((ing, idx) => (
              <div key={ing.id || idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ingredient Name"
                  value={ing.name}
                  onChange={(e) => handleUpdateIngredient(idx, "name", e.target.value)}
                  className="flex-2 h-9 rounded-lg border border-stone-200 bg-stone-50 px-3 text-sm"
                />
                <input
                  type="text"
                  placeholder="Qty"
                  value={ing.quantity}
                  onChange={(e) => handleUpdateIngredient(idx, "quantity", e.target.value)}
                  className="w-20 h-9 rounded-lg border border-stone-200 bg-stone-50 px-2 text-sm text-center"
                />
                <input
                  type="text"
                  placeholder="Unit (g, ml)"
                  value={ing.unit}
                  onChange={(e) => handleUpdateIngredient(idx, "unit", e.target.value)}
                  className="w-20 h-9 rounded-lg border border-stone-200 bg-stone-50 px-2 text-sm text-center"
                />
                <input
                  type="number"
                  placeholder="Unit price (VND/kg)"
                  value={ing.unitPrice || ""}
                  onChange={(e) => handleUpdateIngredient(idx, "unitPrice", Number(e.target.value))}
                  className="w-32 h-9 rounded-lg border border-stone-200 bg-stone-50 px-2 text-xs text-right"
                  title="Unit price (VND) per kg/liter/pc"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-stone-400">
            Total cost = sum(quantity used × price per unit). Displays as estimated cost on recipe cards.
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              5. Cooking Steps
            </h3>
            <button
              type="button"
              onClick={handleAddInstruction}
              className="text-xs text-emerald-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Step
            </button>
          </div>

          <div className="space-y-2">
            {instructions.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-6 text-xs font-bold text-stone-400 text-center shrink-0">
                  {idx + 1}.
                </span>
                <input
                  type="text"
                  placeholder={`Step ${idx + 1} instruction...`}
                  value={step}
                  onChange={(e) => handleUpdateInstruction(idx, e.target.value)}
                  className="flex-1 h-9 rounded-lg border border-stone-200 bg-stone-50 px-3 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveInstruction(idx)}
                  className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-4 border-t flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-sm font-semibold hover:bg-stone-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-7 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {initialRecipe ? "Save Changes" : "Create Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function AdminRecipeModal({
  isOpen,
  onClose,
  onSave,
  initialRecipe,
}: AdminRecipeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <AdminRecipeForm
        key={initialRecipe?.id || "new-recipe"}
        initialRecipe={initialRecipe}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
}

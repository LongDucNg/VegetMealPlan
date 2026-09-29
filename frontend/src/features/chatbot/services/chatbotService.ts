import { profileService } from "@/features/profile/services/profileService";
import { nutritionService } from "@/features/nutrition/services/nutritionService";
import { recipeService } from "@/features/recipes/services/recipeService";
import { ChatbotMessage } from "../types";
import { STATIC_KNOWLEDGE_BASE } from "../data/mockChatResponses";

export const chatbotService = {
  async processUserMessage(userText: string): Promise<ChatbotMessage> {
    // Simulate slight AI thinking latency
    await new Promise((res) => setTimeout(res, 600));

    const normalized = userText.toLowerCase().trim();
    const profile = profileService.getProfile();
    const nutrition = nutritionService.getNutritionSummary(profile);

    // 1. Check for Dinner / Meal recommendation requests
    if (
      normalized.includes("dinner") ||
      normalized.includes("eat for dinner") ||
      normalized.includes("tối nay ăn gì") ||
      normalized.includes("lunch") ||
      normalized.includes("breakfast")
    ) {
      const mealType = normalized.includes("breakfast")
        ? "breakfast"
        : normalized.includes("lunch")
        ? "lunch"
        : "dinner";

      const recommendations = recipeService.getRecommendations(
        profile,
        nutrition.mealTargets[mealType],
        mealType
      );

      const topPick = recommendations[0];
      const allergyNote =
        profile.allergies.length > 0
          ? `Filtered to avoid your allergens (${profile.allergies.join(", ")}).`
          : "Matches your diet preferences.";

      if (topPick) {
        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Just now",
          text: `Based on your profile (${profile.vegetarianType.replace("_", " ")}, target ~${nutrition.mealTargets[mealType]} kcal for ${mealType}):\n\n🍽️ **Recommended Dish: ${topPick.title}**\n• Calories: **${topPick.calories} kcal**\n• Protein: **${topPick.protein}g** | Carbs: **${topPick.carbs}g** | Fat: **${topPick.fat}g**\n• Prep/Cook Time: **${topPick.prepTime + topPick.cookTime} minutes**\n\n${topPick.description}\n\n✅ *${allergyNote}*`,
          suggestedRecipeId: topPick.id,
        };
      }
    }

    // 2. Check for BMI / Body metrics
    if (
      normalized.includes("bmi") ||
      normalized.includes("body mass") ||
      normalized.includes("weight") ||
      normalized.includes("cân nặng")
    ) {
      const { bmiInfo } = nutrition;
      if (!bmiInfo) {
        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Just now",
          text: `Please complete your height and weight in your profile to calculate your Body Mass Index (BMI) and healthy weight range.`,
        };
      }
      return {
        id: `ai-${Math.random().toString(36).substring(2, 9)}`,
        sender: "ai",
        timestamp: "Just now",
        text: `Here is the personalized analysis of your BMI based on your profile:\n\n• **Height:** ${profile.height} cm | **Weight:** ${profile.weight} kg\n• **Calculated BMI:** **${bmiInfo.formattedBMI}** (${bmiInfo.category})\n• **Healthy Weight Range:** **${bmiInfo.healthyWeightRange.min} kg – ${bmiInfo.healthyWeightRange.max} kg**\n\n💡 *${bmiInfo.description}*`,
      };
    }

    // 3. Check for Calorie / Macro inquiries
    if (
      normalized.includes("calorie") ||
      normalized.includes("calories") ||
      normalized.includes("calo") ||
      normalized.includes("macro") ||
      normalized.includes("tdee") ||
      normalized.includes("bmr")
    ) {
      return {
        id: `ai-${Math.random().toString(36).substring(2, 9)}`,
        sender: "ai",
        timestamp: "Just now",
        text: `Here are your calculated daily metabolic numbers (Mifflin-St Jeor formula):\n\n• **Basal Metabolic Rate (BMR):** **${nutrition.bmr} kcal/day**\n• **Total Daily Energy Expenditure (TDEE):** **${nutrition.tdee} kcal/day** (Activity: ${profile.activityLevel})\n• **Target Intake (${nutrition.goalTitle}):** **~${nutrition.dailyCalorieTarget.toLocaleString()} kcal/day**\n\n🎯 **Recommended Daily Macros:**\n• Protein: **${nutrition.macros.proteinGrams}g** (~${nutrition.macros.proteinPct}%)\n• Carbs: **${nutrition.macros.carbsGrams}g** (~${nutrition.macros.carbsPct}%)\n• Fat: **${nutrition.macros.fatGrams}g** (~${nutrition.macros.fatPct}%)`,
      };
    }

    // 4. Check for Allergy inquiries
    if (
      normalized.includes("allergy") ||
      normalized.includes("allergies") ||
      normalized.includes("dị ứng") ||
      normalized.includes("peanut") ||
      normalized.includes("soy")
    ) {
      const userAllergies = profile.allergies;
      if (userAllergies.length > 0) {
        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Just now",
          text: `Your profile currently flags allergies to: **${userAllergies.join(", ")}**.\n\nAll recipes recommended in your Meal Planner are automatically filtered to exclude these ingredients. Whenever you browse videos or recipes, any recipe containing ${userAllergies.join(" or ")} will display a conspicuous ⚠ **Allergy Warning** badge to protect you.`,
        };
      } else {
        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Just now",
          text: `You currently have no allergies saved in your profile. You can update your allergens anytime in **Preferences / Settings** or on your Profile page.`,
        };
      }
    }

    // 5. Check Static Knowledge Base
    for (const [key, value] of Object.entries(STATIC_KNOWLEDGE_BASE)) {
      if (normalized.includes(key)) {
        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Just now",
          text: value.text,
          substitution: value.substitution,
        };
      }
    }

    // 6. Contextual Default
    return {
      id: `ai-${Math.random().toString(36).substring(2, 9)}`,
      sender: "ai",
      timestamp: "Just now",
      text: `Thanks for asking! As your AI Plant Nutritionist, I keep your personal profile in mind:\n• Diet: **${profile.vegetarianType.replace("_", " ")}**\n• Health Goal: **${nutrition.goalTitle}** (~${nutrition.dailyCalorieTarget} kcal/day)\n• Allergies: **${profile.allergies.length ? profile.allergies.join(", ") : "None"}**\n\nFeel free to ask me:\n1. *"What should I eat for dinner?"*\n2. *"Explain my BMI and body metrics"*\n3. *"How many calories should I eat daily?"*\n4. *"Egg substitute for baking"* or *"How to get enough B12 in Vietnam"*.`,
    };
  },
};

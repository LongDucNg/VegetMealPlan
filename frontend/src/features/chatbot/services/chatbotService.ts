import { profileService } from "@/features/profile/services/profileService";
import { formatVegetarianType } from "@/features/profile/types";
import { nutritionService } from "@/features/nutrition/services/nutritionService";
import { recipeService } from "@/features/recipes/services/recipeService";
import { ChatbotMessage } from "../types";
import { STATIC_KNOWLEDGE_BASE } from "../data/mockChatResponses";
import { apiClient } from "@/lib/apiClient";

export const chatbotService = {
  async processUserMessage(userText: string): Promise<ChatbotMessage> {
    // 0. Try calling Backend AI Chatbot API
    try {
      const res = await apiClient.post<{ answer?: string; reply?: string; message?: string }>(
        "/chatbot/ask",
        { question: userText }
      );
      const aiText = res?.answer || res?.reply || res?.message;
      if (aiText && !aiText.includes("AI dang tam thoi khong phan hoi")) {
        return {
          id: `ai-${Date.now()}`,
          sender: "ai",
          timestamp: "Vừa xong",
          text: aiText,
        };
      }
    } catch {
      // Backend AI unavailable or unauthenticated -> fall through to intelligent local nutritionist engine
    }

    // Simulate slight AI thinking latency
    await new Promise((res) => setTimeout(res, 400));

    const normalized = userText.toLowerCase().trim();
    const profile = profileService.getProfile();
    const nutrition = nutritionService.getNutritionSummary(profile);

    // 1. Check for Dinner / Meal recommendation requests
    if (
      normalized.includes("dinner") ||
      normalized.includes("eat for dinner") ||
      normalized.includes("tối nay ăn gì") ||
      normalized.includes("ăn gì") ||
      normalized.includes("lunch") ||
      normalized.includes("breakfast")
    ) {
      const mealType = normalized.includes("breakfast")
        ? "breakfast"
        : normalized.includes("lunch")
        ? "lunch"
        : "dinner";

      const mealLabel = mealType === "breakfast" ? "bữa sáng" : mealType === "lunch" ? "bữa trưa" : "bữa tối";

      const recommendations = recipeService.getRecommendations(
        profile,
        nutrition.mealTargets[mealType],
        mealType
      );

      const topPick = recommendations[0];
      const allergyNote =
        profile.allergies.length > 0
          ? `Đã lọc để tránh các thành phần dị ứng của bạn (${profile.allergies.join(", ")}).`
          : "Phù hợp với chế độ ăn chay của bạn.";

      if (topPick) {
        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Vừa xong",
          text: `Dựa trên hồ sơ của bạn (${formatVegetarianType(profile.vegetarianType)}, mục tiêu ~${nutrition.mealTargets[mealType]} kcal cho ${mealLabel}):\n\n🍽️ **Món ăn gợi ý: ${topPick.title}**\n• Năng lượng: **${topPick.calories} kcal**\n• Chất đạm: **${topPick.protein}g** | Tinh bột: **${topPick.carbs}g** | Chất béo: **${topPick.fat}g**\n• Thời gian chuẩn bị/nấu: **${topPick.prepTime + topPick.cookTime} phút**\n\n${topPick.description}\n\n✅ *${allergyNote}*`,
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
          timestamp: "Vừa xong",
          text: `Vui lòng cập nhật chiều cao và cân nặng trong hồ sơ để tính chỉ số BMI và khoảng cân nặng lý tưởng.`,
        };
      }
      return {
        id: `ai-${Math.random().toString(36).substring(2, 9)}`,
        sender: "ai",
        timestamp: "Vừa xong",
        text: `Phân tích chỉ số BMI cá nhân hóa từ hồ sơ của bạn:\n\n• **Chiều cao:** ${profile.height} cm | **Cân nặng:** ${profile.weight} kg\n• **Chỉ số BMI:** **${bmiInfo.formattedBMI}** (${bmiInfo.category})\n• **Cân nặng lý tưởng:** **${bmiInfo.healthyWeightRange.min} kg – ${bmiInfo.healthyWeightRange.max} kg**\n\n💡 *${bmiInfo.description}*`,
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
        timestamp: "Vừa xong",
        text: `Các chỉ số chuyển hóa năng lượng hàng ngày của bạn (theo công thức Mifflin-St Jeor):\n\n• **Chuyển hóa cơ bản (BMR):** **${nutrition.bmr} kcal/ngày**\n• **Tổng tiêu hao năng lượng (TDEE):** **${nutrition.tdee} kcal/ngày** (Mức độ vận động: ${profile.activityLevel})\n• **Mục tiêu calo (${nutrition.goalTitle}):** **~${nutrition.dailyCalorieTarget.toLocaleString()} kcal/ngày**\n\n🎯 **Khuyến nghị dinh dưỡng hàng ngày:**\n• Chất đạm: **${nutrition.macros.proteinGrams}g** (~${nutrition.macros.proteinPct}%)\n• Tinh bột: **${nutrition.macros.carbsGrams}g** (~${nutrition.macros.carbsPct}%)\n• Chất béo: **${nutrition.macros.fatGrams}g** (~${nutrition.macros.fatPct}%)`,
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
          timestamp: "Vừa xong",
          text: `Hồ sơ của bạn hiện ghi nhận dị ứng với: **${userAllergies.join(", ")}**.\n\nTất cả công thức được gợi ý trong Kế hoạch Thực đơn sẽ tự động loại trừ các nguyên liệu này. Khi bạn xem video hoặc công thức, bất kỳ món nào chứa ${userAllergies.join(" hoặc ")} sẽ hiển thị huy hiệu cảnh báo ⚠ **Dị ứng thực phẩm** để bảo vệ an toàn cho bạn.`,
        };
      } else {
        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Vừa xong",
          text: `Hiện bạn chưa lưu thông tin dị ứng thực phẩm nào trong hồ sơ. Bạn có thể cập nhật dị ứng bất cứ lúc nào trong trang **Hồ sơ cá nhân** hoặc cài đặt.`,
        };
      }
    }

    // 5. Check Static Knowledge Base
    for (const [key, value] of Object.entries(STATIC_KNOWLEDGE_BASE)) {
      if (normalized.includes(key)) {
        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Vừa xong",
          text: value.text,
          substitution: value.substitution,
        };
      }
    }

    // 6. Contextual Default
    return {
      id: `ai-${Math.random().toString(36).substring(2, 9)}`,
      sender: "ai",
      timestamp: "Vừa xong",
      text: `Chào bạn! Với vai trò là Chuyên gia Dinh dưỡng Chay AI, tôi luôn ghi nhớ hồ sơ của bạn:\n• Chế độ ăn: **${formatVegetarianType(profile.vegetarianType)}**\n• Mục tiêu sức khỏe: **${nutrition.goalTitle}** (~${nutrition.dailyCalorieTarget} kcal/ngày)\n• Dị ứng thực phẩm: **${profile.allergies.length ? profile.allergies.join(", ") : "Không có"}**\n\nBạn có thể hỏi tôi:\n1. *"Tối nay ăn gì?"*\n2. *"Giải thích chỉ số BMI và thể trạng của tôi"*\n3. *"Tôi nên nạp bao nhiêu calo mỗi ngày?"*\n4. *"Nguyên liệu thay thế trứng khi làm bánh"* hoặc *"Cách bổ sung B12 cho người ăn chay tại Việt Nam"*.`,
    };
  },
};

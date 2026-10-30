import { profileService } from "@/features/profile/services/profileService";
import { formatVegetarianType, formatAllergies } from "@/features/profile/types";
import { nutritionService } from "@/features/nutrition/services/nutritionService";
import { recipeService } from "@/features/recipes/services/recipeService";
import { checkRecipeAllergy } from "@/features/allergy/utils/checkRecipeAllergy";
import { ChatbotMessage } from "../types";
import { STATIC_KNOWLEDGE_BASE } from "../data/mockChatResponses";
import { apiClient } from "@/lib/apiClient";
import { tokenStorage } from "@/lib/tokenStorage";

export function cleanChatText(text: string): string {
  if (!text) return "";
  return text
    // Bỏ tất cả emoji và biểu tượng icon Unicode
    .replace(
      /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}\u{200D}]/gu,
      ""
    )
    // Bỏ các ký tự heading markdown ở đầu dòng: ###, ##, #
    .replace(/^#{1,6}\s+/gm, "")
    // Bỏ dấu gạch ngang ngăn cách thừa: --- ở đầu/cuối khối
    .replace(/^[-*_]{3,}\s*$/gm, "")
    // Chuyển dấu hoa thị gạch đầu dòng thành dấu gạch ngang: * item -> - item
    .replace(/^(\s*)\*\s+/gm, (_match, p1) => `${p1}- `)
    // Bỏ toàn bộ dấu sao * còn lại (bao gồm cả ** và *)
    .replace(/\*/g, "")
    // Chuyển dấu gạch đứng | thành dấu phẩy
    .replace(/\s*\|\s*/g, ", ")
    // Chuyển ký tự bullet • thành gạch đầu dòng -
    .replace(/^\s*•\s*/gm, "- ")
    .replace(/•/g, "")
    // Chuẩn hóa dấu phẩy thừa và khoảng trắng
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ",")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    // Chuẩn hóa tối đa 2 dòng ngắt liên tiếp
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "guest-session";
  let sId = localStorage.getItem("veggiehub_chatbot_session_id");
  if (!sId) {
    sId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("veggiehub_chatbot_session_id", sId);
  }
  return sId;
}

export const chatbotService = {
  async processUserMessage(userText: string): Promise<ChatbotMessage> {
    const sessionId = getOrCreateSessionId();

    // 0. Gọi Backend AI Chatbot API (POST /api/v1/ai/chat)
    try {
      const res = await apiClient.post<any>("/ai/chat", {
        message: userText,
        session_id: sessionId,
      });

      const data = res?.data || res;
      const aiText = data?.answer || data?.reply || data?.message;

      if (aiText && !aiText.includes("AI dang tam thoi khong phan hoi")) {
        return {
          id: `ai-${Date.now()}`,
          sender: "ai",
          timestamp: "Vừa xong",
          text: cleanChatText(aiText),
          remaining_queries: data?.remaining_queries ?? null,
          suggested_recipes: data?.suggested_recipes || [],
        };
      }
    } catch (err: any) {
      // Nếu lỗi 401 do token hết hạn, xóa token và thử lại ngay với tư cách khách
      if (err?.status === 401) {
        tokenStorage.removeToken();
        try {
          const retryRes = await apiClient.post<any>("/ai/chat", {
            message: userText,
            session_id: sessionId,
          });
          const retryData = retryRes?.data || retryRes;
          const retryText = retryData?.answer || retryData?.reply || retryData?.message;
          if (retryText && !retryText.includes("AI dang tam thoi khong phan hoi")) {
            return {
              id: `ai-${Date.now()}`,
              sender: "ai",
              timestamp: "Vừa xong",
              text: cleanChatText(retryText),
              remaining_queries: retryData?.remaining_queries ?? null,
              suggested_recipes: retryData?.suggested_recipes || [],
            };
          }
        } catch (retryErr) {
          console.warn("[chatbotService] Thử lại như khách gặp lỗi:", retryErr);
        }
      }

      // Nếu hết lượt hoặc gặp lỗi từ backend
      const errMsg = err?.message || err?.details?.[0];
      if (err?.status === 429 || (errMsg && (errMsg.includes("hết") || errMsg.includes("lượt")))) {
        return {
          id: `ai-${Date.now()}`,
          sender: "ai",
          timestamp: "Vừa xong",
          text: cleanChatText(
            errMsg ||
              "Bạn đã dùng hết lượt câu hỏi hôm nay. Vui lòng quay lại vào ngày mai hoặc nâng cấp tài khoản Premium để hỏi không giới hạn!"
          ),
        };
      }
      console.warn("[chatbotService] Backend AI không khả dụng, chuyển sang chế độ tư vấn tích hợp:", err);
    }

    // Tự động phân tích theo hồ sơ người dùng nếu Backend AI tạm gián đoạn
    await new Promise((res) => setTimeout(res, 350));

    const normalized = userText.toLowerCase().trim();
    const profile = profileService.getProfile();
    const nutrition = nutritionService.getNutritionSummary(profile);

    // Phát hiện yêu cầu giới hạn calo từ câu hỏi (vd: "dưới 500 kcal", "không quá 400 calo", "< 600", "500 calo")
    const maxCalMatch =
      normalized.match(/(?:dưới|<|không quá|nhỏ hơn|dưới mức|chỉ)\s*(\d{2,4})\s*(?:kcal|calo|cal)?/i) ||
      normalized.match(/(\d{3,4})\s*(?:kcal|calo|calories)/i);
    const requestedMaxCal = maxCalMatch ? parseInt(maxCalMatch[1], 10) : null;

    // 1. Gợi ý bữa ăn
    if (
      requestedMaxCal !== null ||
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

      // Lọc danh sách món an toàn cho chế độ ăn và dị ứng
      const safeForUser = recipeService.getRecipes().filter((r) => {
        if (!recipeService.isDietCompatible(r.vegetarianType, profile.vegetarianType)) {
          return false;
        }
        return !checkRecipeAllergy(r, profile).hasAllergy;
      });

      let topPick: any = null;
      if (requestedMaxCal && requestedMaxCal > 0) {
        // Tìm các món <= requestedMaxCal
        const underCal = safeForUser.filter((r) => r.calories <= requestedMaxCal);
        if (underCal.length > 0) {
          // Ưu tiên món gần requestedMaxCal nhất nhưng không vượt quá
          underCal.sort((a, b) => Math.abs(a.calories - requestedMaxCal) - Math.abs(b.calories - requestedMaxCal));
          topPick = underCal[0];
        } else {
          // Nếu không có món nào hoàn toàn <= requestedMaxCal, lấy món có lượng calo thấp nhất
          const sortedAsc = [...safeForUser].sort((a, b) => a.calories - b.calories);
          topPick = sortedAsc[0];
        }
      } else {
        const recommendations = recipeService.getRecommendations(
          profile,
          nutrition.mealTargets[mealType],
          mealType
        );
        topPick = recommendations[0];
      }

      const allergyNote =
        profile.allergies.length > 0
          ? `Đã lọc để tránh các thành phần dị ứng của bạn (${formatAllergies(profile.allergies)}).`
          : "Phù hợp với chế độ ăn chay của bạn.";

      if (topPick) {
        const calDescription = requestedMaxCal
          ? `mục tiêu dưới ${requestedMaxCal} kcal`
          : `mục tiêu khoảng ${nutrition.mealTargets[mealType]} kcal cho ${mealLabel}`;

        const calNote = requestedMaxCal
          ? `- Năng lượng: ${topPick.calories} kcal (${
              topPick.calories <= requestedMaxCal
                ? `phù hợp với mức dưới ${requestedMaxCal} kcal bạn yêu cầu`
                : `đây là món có lượng calo thấp nhất hiện có`
            })`
          : `- Năng lượng: ${topPick.calories} kcal`;

        const rawText = `Dựa trên yêu cầu của bạn (${formatVegetarianType(profile.vegetarianType)}, ${calDescription}):\n\nMón ăn gợi ý: ${topPick.title}\n${calNote}\n- Dinh dưỡng: Chất đạm ${topPick.protein}g, Tinh bột ${topPick.carbs}g, Chất béo ${topPick.fat}g\n- Thời gian chuẩn bị và nấu: ${topPick.prepTime + topPick.cookTime} phút\n\n${topPick.description}\n\n${allergyNote}`;

        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Vừa xong",
          text: cleanChatText(rawText),
          suggestedRecipeId: topPick.id,
          suggested_recipes: [{ recipe_id: Number(topPick.id.replace(/\D/g, "")) || 1, title: topPick.title }],
        };
      }
    }

    // 2. Chỉ số BMI
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
          text: "Vui lòng cập nhật chiều cao và cân nặng trong hồ sơ để tính chỉ số BMI và khoảng cân nặng lý tưởng.",
        };
      }
      const rawText = `Phân tích chỉ số BMI cá nhân hóa từ hồ sơ của bạn:\n- Chiều cao: ${profile.height} cm, Cân nặng: ${profile.weight} kg\n- Chỉ số BMI: ${bmiInfo.formattedBMI} (${bmiInfo.category})\n- Cân nặng lý tưởng: ${bmiInfo.healthyWeightRange.min} kg đến ${bmiInfo.healthyWeightRange.max} kg\n\n${bmiInfo.description}`;

      return {
        id: `ai-${Math.random().toString(36).substring(2, 9)}`,
        sender: "ai",
        timestamp: "Vừa xong",
        text: cleanChatText(rawText),
      };
    }

    // 3. Calo / Macro
    if (
      normalized.includes("calorie") ||
      normalized.includes("calories") ||
      normalized.includes("calo") ||
      normalized.includes("macro") ||
      normalized.includes("tdee") ||
      normalized.includes("bmr")
    ) {
      const rawText = `Các chỉ số chuyển hóa năng lượng hàng ngày của bạn:\n- Chuyển hóa cơ bản (BMR): ${nutrition.bmr} kcal/ngày\n- Tổng tiêu hao năng lượng (TDEE): ${nutrition.tdee} kcal/ngày (mức độ vận động: ${profile.activityLevel})\n- Mục tiêu calo (${nutrition.goalTitle}): khoảng ${nutrition.dailyCalorieTarget.toLocaleString()} kcal/ngày\n\nKhuyến nghị dinh dưỡng hàng ngày:\n- Chất đạm: ${nutrition.macros.proteinGrams}g (~${nutrition.macros.proteinPct}%)\n- Tinh bột: ${nutrition.macros.carbsGrams}g (~${nutrition.macros.carbsPct}%)\n- Chất béo: ${nutrition.macros.fatGrams}g (~${nutrition.macros.fatPct}%)`;

      return {
        id: `ai-${Math.random().toString(36).substring(2, 9)}`,
        sender: "ai",
        timestamp: "Vừa xong",
        text: cleanChatText(rawText),
      };
    }

    // 4. Dị ứng
    if (
      normalized.includes("allergy") ||
      normalized.includes("allergies") ||
      normalized.includes("dị ứng") ||
      normalized.includes("peanut") ||
      normalized.includes("soy")
    ) {
      const userAllergies = profile.allergies;
      if (userAllergies.length > 0) {
        const rawText = `Hồ sơ của bạn hiện ghi nhận dị ứng với: ${userAllergies.join(", ")}.\n\nTất cả công thức được gợi ý trong kế hoạch thực đơn sẽ tự động loại trừ các nguyên liệu này. Khi bạn xem công thức, hệ thống sẽ cảnh báo nếu món có thành phần chứa ${userAllergies.join(" hoặc ")} để bảo vệ an toàn cho bạn.`;

        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Vừa xong",
          text: cleanChatText(rawText),
        };
      } else {
        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Vừa xong",
          text: "Hiện bạn chưa lưu thông tin dị ứng thực phẩm nào trong hồ sơ. Bạn có thể cập nhật thông tin dị ứng bất cứ lúc nào trong trang Hồ sơ cá nhân hoặc cài đặt.",
        };
      }
    }

    // 5. Static Knowledge Base
    for (const [key, value] of Object.entries(STATIC_KNOWLEDGE_BASE)) {
      if (normalized.includes(key)) {
        return {
          id: `ai-${Math.random().toString(36).substring(2, 9)}`,
          sender: "ai",
          timestamp: "Vừa xong",
          text: cleanChatText(value.text),
          substitution: value.substitution,
        };
      }
    }

    // 6. Mặc định
    const defaultRaw = `Chào bạn! Tôi là Chuyên gia Dinh dưỡng Chay AI của VeggieHub:\n- Chế độ ăn: ${formatVegetarianType(profile.vegetarianType)}\n- Mục tiêu: ${nutrition.goalTitle} (~${nutrition.dailyCalorieTarget} kcal/ngày)\n- Dị ứng: ${profile.allergies.length ? formatAllergies(profile.allergies) : "Không có"}\n\nBạn có thể hỏi tôi bất kỳ câu hỏi nào về ẩm thực chay, công thức món ăn, tính lượng calo hoặc cách bổ sung dinh dưỡng!`;

    return {
      id: `ai-${Math.random().toString(36).substring(2, 9)}`,
      sender: "ai",
      timestamp: "Vừa xong",
      text: cleanChatText(defaultRaw),
    };
  },

  async getSuggestions(): Promise<string[]> {
    try {
      const res = await apiClient.get<any>("/ai/chat/suggestions");
      const list = res?.suggestions || res?.data?.suggestions;
      if (Array.isArray(list) && list.length > 0) {
        return list.map((item: any) => typeof item === "string" ? item : item.question || item.text);
      }
    } catch {
      // Bỏ qua lỗi
    }
    return [
      "Hôm nay ăn gì thuần chay dưới 500 kcal?",
      "Cách tính calo và BMR cho người ăn chay?",
      "Thực phẩm chay nào giàu protein nhất?",
      "Cách bổ sung vitamin B12 và sắt cho người ăn chay?",
    ];
  },
};

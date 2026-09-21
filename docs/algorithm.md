# Thuật toán: User Ingredient → Recipe Matching → Recommendation → Meal Plan

Hiện thực trong `backend/src/modules/recommendation/recommendation.service.ts`
+ `backend/src/modules/recipe/recipe.service.ts`.

```
USER
  │
  ▼
USER_INGREDIENT            (nguyên liệu user đang có, nhập tay hoặc chụp ảnh)
  │  ingredient_id
  ▼
INGREDIENT
  │
  ▼
RECIPE_INGREDIENT          (nguyên liệu mỗi Recipe cần)
  │  group theo recipe_id
  ▼
RECIPE (chỉ xét status = APPROVED)
  │
  ├─ lọc allergy: loại Recipe có RECIPE_INGREDIENT trùng USER_ALLERGY.ingredient_id
  ├─ (TODO) lọc diet_type: loại Recipe không tương thích USER.diet_type
  ├─ tính match% = (số ingredient user có) / (tổng ingredient recipe cần)
  ├─ ingredient recipe cần mà user không có → missing_ingredient_ids
  │
  ▼
AI_RECOMMENDATION (+ AI_RECOMMENDATION_MISSING_INGREDIENT)
  │  user chọn 1 vài recommendation ưng ý
  ▼
MEAL_PLAN → WEEKLY_PLAN → DAILY_MEAL → MEAL_ITEM (recipe_id)
```

## Các rule bắt buộc đã cài trong code

- **Không tạo recommendation giả**: nếu `availableIngredientIds` rỗng → reject thẳng
  (`RecommendationService.generateForUser`), nếu 1 recipe match 0% → bỏ qua, không lưu.
- **Allergy là hard filter**: lọc ở bước truy vấn recipe, KHÔNG lọc sau khi đã tạo
  recommendation — recipe dính allergy không bao giờ vào tới bảng `ai_recommendations`.
- **Recipe reject/removed không được recommend**: `RecipeService.findAll()` và
  `matchRecipesByIngredients()` chỉ xét `status = APPROVED`.
- **BMI**: tính ở server (`UsersService.updateBodyMetrics`), `height_cm <= 0` hoặc
  `weight_kg <= 0` → reject, không tính, không lưu.
- **BMI snapshot**: `MealPlan.bmi_snapshot` set 1 lần lúc tạo plan, không update lại
  khi user đổi cân nặng sau đó (xem TODO trong `meal-plan.module.ts` — MealPlanService
  chưa viết, ai làm module này nhớ tuân theo rule này).
- **Trial limit**: `ChatbotService.checkAndIncrementTrial` chặn khi `query_count >= TRIAL_QUERY_LIMIT`.
- **AI timeout**: `ChatbotService.ask()` không lưu câu trả lời giả khi `callAiService` throw lỗi.

## Việc còn thiếu (để trống có chủ đích, phân cho người phụ trách module)

1. Lọc `diet_type` trong `matchRecipesByIngredients` (hiện chỉ lọc allergy).
2. `NutritionService` tính lại `NutritionInfo` mỗi khi `RecipeIngredient` đổi.
3. `MealPlanService`: tạo weekly/monthly plan từ các `AiRecommendation` user chọn,
   set `bmi_snapshot` = `user.bmi` hiện tại lúc tạo, xử lý rollover budget giữa các tuần.
4. Ingredient Recognition via Photo (computer vision) — nối vào `UserIngredientService.create`
   với `source = PHOTO_SCAN`.

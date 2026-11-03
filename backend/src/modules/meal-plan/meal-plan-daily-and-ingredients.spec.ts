/* eslint-disable @typescript-eslint/no-explicit-any */
import { MealPlanService } from './meal-plan.service';
import { PlanType } from './entities/meal-plan.entity';

describe('MealPlanService - Daily Plan, 2-3 dishes per meal, Gram aggregation with ~, and AI Review', () => {
  const RECIPES: any[] = [
    {
      recipe_id: 1,
      title: 'Bún riêu chay',
      diet_type: 'vegan',
      status: 'approved',
      meal_type: 'breakfast',
      suitable_meals: 'breakfast',
      servings: 1,
      prep_time: 10,
      cook_time: 15,
      estimated_cost: 25000,
    },
    {
      recipe_id: 2,
      title: 'Sữa đậu nành mè đen',
      diet_type: 'vegan',
      status: 'approved',
      meal_type: 'breakfast',
      suitable_meals: 'breakfast',
      servings: 1,
      prep_time: 5,
      cook_time: 10,
      estimated_cost: 12000,
    },
    {
      recipe_id: 3,
      title: 'Cơm gạo lứt',
      diet_type: 'vegan',
      status: 'approved',
      meal_type: 'lunch',
      suitable_meals: 'lunch,dinner',
      servings: 1,
      prep_time: 5,
      cook_time: 25,
      estimated_cost: 10000,
    },
    {
      recipe_id: 4,
      title: 'Đậu hũ sốt cà chua',
      diet_type: 'vegan',
      status: 'approved',
      meal_type: 'lunch',
      suitable_meals: 'lunch,dinner',
      servings: 1,
      prep_time: 10,
      cook_time: 15,
      estimated_cost: 20000,
    },
    {
      recipe_id: 5,
      title: 'Canh rau ngót nấm rơm',
      diet_type: 'vegan',
      status: 'approved',
      meal_type: 'lunch',
      suitable_meals: 'lunch,dinner',
      servings: 1,
      prep_time: 10,
      cook_time: 10,
      estimated_cost: 15000,
    },
    {
      recipe_id: 6,
      title: 'Nấm đùi gà kho tiêu',
      diet_type: 'vegan',
      status: 'approved',
      meal_type: 'dinner',
      suitable_meals: 'dinner',
      servings: 1,
      prep_time: 10,
      cook_time: 15,
      estimated_cost: 30000,
    },
    {
      recipe_id: 7,
      title: 'Canh bí đỏ đậu phộng',
      diet_type: 'vegan',
      status: 'approved',
      meal_type: 'dinner',
      suitable_meals: 'dinner',
      servings: 1,
      prep_time: 10,
      cook_time: 15,
      estimated_cost: 18000,
    },
    {
      recipe_id: 8,
      title: 'Hạt điều rang muối',
      diet_type: 'vegan',
      status: 'approved',
      meal_type: 'snack',
      suitable_meals: 'snack',
      servings: 1,
      prep_time: 0,
      cook_time: 5,
      estimated_cost: 15000,
    },
  ];

  const buildService = () => {
    let savedMealPlan: any = null;
    const savedWeeklyPlans: any[] = [];
    const savedDailyMeals: any[] = [];
    const savedMealItems: any[] = [];

    const mealPlanRepo: any = {
      save: async (entity: any) => {
        savedMealPlan = { ...entity, meal_plan_id: 101 };
        return savedMealPlan;
      },
      findOne: async () => {
        return {
          ...savedMealPlan,
          weekly_plans: savedWeeklyPlans.map((wp) => ({
            ...wp,
            daily_meals: savedDailyMeals
              .filter((dm) => dm.weekly_plan_id === wp.weekly_plan_id)
              .map((dm) => ({
                ...dm,
                meal_items: savedMealItems
                  .filter((mi) => mi.daily_meal_id === dm.daily_meal_id)
                  .map((mi) => ({
                    ...mi,
                    recipe: RECIPES.find((r) => r.recipe_id === mi.recipe_id),
                  })),
              })),
          })),
        };
      },
    };

    const weeklyPlanRepo: any = {
      save: async (entity: any) => {
        const wp = { ...entity, weekly_plan_id: savedWeeklyPlans.length + 1 };
        savedWeeklyPlans.push(wp);
        return wp;
      },
    };

    const dailyMealRepo: any = {
      save: async (entity: any) => {
        const dm = { ...entity, daily_meal_id: savedDailyMeals.length + 1 };
        savedDailyMeals.push(dm);
        return dm;
      },
    };

    const mealItemRepo: any = {
      save: async (entity: any) => {
        const mi = { ...entity, meal_item_id: savedMealItems.length + 1 };
        savedMealItems.push(mi);
        return mi;
      },
    };

    const userRepo: any = {
      findOne: async () => ({
        user_id: 1,
        diet_type: 'vegan',
        age: 28,
        gender: 'female',
        height_cm: 160,
        weight_kg: 50,
        activity_level: 'moderate',
        current_goal: { name: 'maintain' },
        current_goal_id: 1,
      }),
    };

    const allergyRepo: any = {
      find: async () => [],
    };

    const recipeRepo: any = {
      find: async () => RECIPES,
    };

    const recipeIngredientRepo: any = {
      find: async () => [
        {
          recipe_id: 1,
          ingredient_id: 11,
          quantity: 150,
          unit: 'g',
          is_optional: false,
          ingredient: { ingredient_id: 11, ingredient_name: 'Bún tươi' },
        },
        {
          recipe_id: 1,
          ingredient_id: 12,
          quantity: 100,
          unit: 'g',
          is_optional: false,
          ingredient: { ingredient_id: 12, ingredient_name: 'Đậu hũ' },
        },
        {
          recipe_id: 2,
          ingredient_id: 13,
          quantity: 200,
          unit: 'ml',
          is_optional: false,
          ingredient: { ingredient_id: 13, ingredient_name: 'Sữa đậu nành' },
        },
        {
          recipe_id: 3,
          ingredient_id: 14,
          quantity: 100,
          unit: 'g',
          is_optional: false,
          ingredient: { ingredient_id: 14, ingredient_name: 'Gạo lứt' },
        },
        {
          recipe_id: 4,
          ingredient_id: 12,
          quantity: 150,
          unit: 'g',
          is_optional: false,
          ingredient: { ingredient_id: 12, ingredient_name: 'Đậu hũ' },
        },
        {
          recipe_id: 4,
          ingredient_id: 15,
          quantity: 2,
          unit: 'qua',
          is_optional: false,
          ingredient: { ingredient_id: 15, ingredient_name: 'Cà chua' },
        },
        {
          recipe_id: 5,
          ingredient_id: 16,
          quantity: 100,
          unit: 'g',
          is_optional: false,
          ingredient: { ingredient_id: 16, ingredient_name: 'Rau ngót' },
        },
        {
          recipe_id: 6,
          ingredient_id: 17,
          quantity: 150,
          unit: 'g',
          is_optional: false,
          ingredient: { ingredient_id: 17, ingredient_name: 'Nấm đùi gà' },
        },
        {
          recipe_id: 7,
          ingredient_id: 18,
          quantity: 200,
          unit: 'g',
          is_optional: false,
          ingredient: { ingredient_id: 18, ingredient_name: 'Bí đỏ' },
        },
        {
          recipe_id: 8,
          ingredient_id: 19,
          quantity: 30,
          unit: 'g',
          is_optional: false,
          ingredient: { ingredient_id: 19, ingredient_name: 'Hạt điều' },
        },
      ],
    };

    const nutritionRepo: any = {
      find: async () => [
        { recipe_id: 1, calories: 350, protein: 12, carbs: 55, fat: 8 },
        { recipe_id: 2, calories: 150, protein: 8, carbs: 18, fat: 5 },
        { recipe_id: 3, calories: 250, protein: 5, carbs: 50, fat: 2 },
        { recipe_id: 4, calories: 280, protein: 18, carbs: 12, fat: 16 },
        { recipe_id: 5, calories: 120, protein: 6, carbs: 14, fat: 4 },
        { recipe_id: 6, calories: 260, protein: 14, carbs: 20, fat: 12 },
        { recipe_id: 7, calories: 180, protein: 5, carbs: 30, fat: 5 },
        { recipe_id: 8, calories: 160, protein: 5, carbs: 9, fat: 13 },
      ],
    };

    const favoriteRepo: any = { find: async () => [] };
    const mealPlanProfileRepo: any = { findOne: async () => null };
    const profileAllergyRepo: any = { find: async () => [] };
    const subscriptionService: any = { isUserPremium: async () => true };
    const ingredientService: any = {};
    const goalRepo: any = {
      findOne: async () => ({
        goal_id: 1,
        code: 'maintain',
        daily_calorie_target: 1750,
      }),
    };

    const dataSource: any = {
      transaction: async (cb: any) => {
        const manager: any = {
          getRepository: (entityClass: any) => {
            const name = entityClass?.name || String(entityClass);
            if (name === 'MealPlan') return mealPlanRepo;
            if (name === 'WeeklyPlan') return weeklyPlanRepo;
            if (name === 'DailyMeal') return dailyMealRepo;
            if (name === 'MealItem') return mealItemRepo;
            return mealPlanRepo;
          },
        };
        return cb(manager);
      },
    };

    const service = new MealPlanService(
      mealPlanRepo,
      weeklyPlanRepo,
      dailyMealRepo,
      mealItemRepo,
      userRepo,
      allergyRepo,
      recipeRepo,
      recipeIngredientRepo,
      nutritionRepo,
      favoriteRepo,
      mealPlanProfileRepo,
      profileAllergyRepo,
      subscriptionService,
      ingredientService,
      dataSource,
      goalRepo,
    );

    return { service, savedDailyMeals, savedMealItems };
  };

  it('generateDailyMealPlan tạo thực đơn 1 ngày với 3 buổi sáng trưa chiều có 2-3 món/bữa', async () => {
    const { service, savedDailyMeals, savedMealItems } = buildService();
    const result = await service.generateDailyMealPlan(1);

    expect(result).toBeDefined();
    expect(result.plan_type).toBe(PlanType.DAILY);
    expect(result.ai_cookability_notes).toBeTruthy();
    expect(result.ingredient_summary).toBeDefined();
    expect(result.ingredient_summary.length).toBeGreaterThan(0);

    // Kiểm tra các bữa ăn chính (breakfast, lunch, dinner)
    const breakfast = savedDailyMeals.find((d) => d.meal_type === 'breakfast');
    const lunch = savedDailyMeals.find((d) => d.meal_type === 'lunch');
    const dinner = savedDailyMeals.find((d) => d.meal_type === 'dinner');

    expect(breakfast).toBeDefined();
    expect(lunch).toBeDefined();
    expect(dinner).toBeDefined();

    const breakfastItems = savedMealItems.filter((mi) => mi.daily_meal_id === breakfast.daily_meal_id);
    const lunchItems = savedMealItems.filter((mi) => mi.daily_meal_id === lunch.daily_meal_id);
    const dinnerItems = savedMealItems.filter((mi) => mi.daily_meal_id === dinner.daily_meal_id);

    // Mỗi bữa chính có 2 đến 3 món để đảm bảo dinh dưỡng và khớp calo
    expect(breakfastItems.length).toBeGreaterThanOrEqual(2);
    expect(breakfastItems.length).toBeLessThanOrEqual(3);

    expect(lunchItems.length).toBeGreaterThanOrEqual(2);
    expect(lunchItems.length).toBeLessThanOrEqual(3);

    expect(dinnerItems.length).toBeGreaterThanOrEqual(2);
    expect(dinnerItems.length).toBeLessThanOrEqual(3);
  });

  it('tính toán nguyên liệu theo gam và định dạng có dấu áng chừng ~', async () => {
    const { service } = buildService();
    const result = await service.generateDailyMealPlan(1);

    expect(result.ingredient_summary).toBeDefined();
    for (const item of result.ingredient_summary) {
      expect(item.ingredient_name).toBeTruthy();
      expect(item.quantity_g).toBeGreaterThan(0);
      // Bắt buộc có tiền tố ~ theo yêu cầu người dùng
      expect(item.note).toMatch(/^~\d+g$/);
    }

    // Đậu hũ có trong nhiều món -> sum lại chuẩn xác
    const tofus = result.ingredient_summary.filter((i: any) => i.ingredient_name.includes('Đậu hũ'));
    expect(tofus.length).toBeGreaterThan(0);
  });
});


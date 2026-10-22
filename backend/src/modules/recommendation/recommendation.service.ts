import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiRecommendation } from './entities/ai-recommendation.entity';
import { AiRecommendationMissingIngredient } from './entities/ai-recommendation-missing-ingredient.entity';
import { UserIngredientService } from '../user-ingredient/user-ingredient.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { RecipeService } from '../recipe/recipe.service';
import { UsersService } from '../users/users.service';

/**
 * Thuật toán gợi ý món ăn:
 *
 *   USER → USER_INGREDIENT → INGREDIENT → RECIPE_INGREDIENT → RECIPE
 *   Lọc theo: allergy, diet_type (vegan/lacto/ovo/ovo_lacto), ingredient thiếu
 *   → RECIPE RECOMMENDATION (kèm score/reason/missing_ingredients)
 *
 * Bảng lọc diet_type:
 *   - vegan:     chỉ nhận recipe có diet_type = 'vegan'
 *   - lacto:     nhận recipe 'vegan' và 'lacto'   (có sữa)
 *   - ovo:       nhận recipe 'vegan' và 'ovo'      (có trứng)
 *   - ovo_lacto: nhận recipe 'vegan', 'lacto', 'ovo', 'ovo_lacto'
 *
 * Xem thêm giải thích thuật toán trong docs/algorithm.md
 */
@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(AiRecommendation)
    private readonly recommendationRepo: Repository<AiRecommendation>,
    @InjectRepository(AiRecommendationMissingIngredient)
    private readonly missingRepo: Repository<AiRecommendationMissingIngredient>,
    private readonly userIngredientService: UserIngredientService,
    private readonly ingredientService: IngredientService,
    private readonly recipeService: RecipeService,
    private readonly usersService: UsersService,
  ) {}

  /** Nhãn hiển thị cho từng loại chế độ ăn chay */
  private readonly DIET_LABEL: Record<string, string> = {
    vegan:     'Thuần chay (Vegan)',
    lacto:     'Chay có sữa (Lacto)',
    ovo:       'Chay có trứng (Ovo)',
    ovo_lacto: 'Chay trứng-sữa (Ovo-Lacto)',
  };

  async generateForUser(user_id: number): Promise<AiRecommendation[]> {
    const user = await this.usersService.findOne(user_id);

    const availableIngredientIds =
      await this.userIngredientService.getAvailableIngredientIds(user_id);

    // Bắt buộc: user chưa nhập nguyên liệu nào → không tạo recommendation giả.
    if (availableIngredientIds.length === 0) {
      throw new BadRequestException(
        'Bạn chưa nhập nguyên liệu nào — hãy thêm ít nhất 1 nguyên liệu trước khi tạo gợi ý.',
      );
    }

    const allergyIngredientIds = await this.ingredientService.getAllergyIngredientIds(user_id);

    // matchRecipesByIngredients sẽ tự động lọc theo diet_type của user:
    // - vegan     → chỉ recipe 'vegan'
    // - lacto     → recipe 'vegan' + 'lacto'
    // - ovo       → recipe 'vegan' + 'ovo'
    // - ovo_lacto → recipe 'vegan' + 'lacto' + 'ovo' + 'ovo_lacto'
    const matches = await this.recipeService.matchRecipesByIngredients(
      availableIngredientIds,
      allergyIngredientIds,
      user.diet_type,
    );

    const dietLabel = user.diet_type
      ? (this.DIET_LABEL[user.diet_type] ?? user.diet_type)
      : null;

    const saved: AiRecommendation[] = [];

    for (const match of matches) {
      // Tạo lý do gợi ý rõ ràng, đề cập đến chế độ ăn nếu có
      let reason: string;
      if (match.missing_ingredient_ids.length === 0) {
        reason = dietLabel
          ? `Phù hợp với chế độ ăn ${dietLabel}. Bạn đã có đủ nguyên liệu cho món này.`
          : 'Bạn đã có đủ nguyên liệu cho món này.';
      } else {
        reason = dietLabel
          ? `Phù hợp với chế độ ăn ${dietLabel}. Bạn có ${match.match_percentage}% nguyên liệu cần thiết, còn thiếu ${match.missing_ingredient_ids.length} nguyên liệu.`
          : `Bạn có ${match.match_percentage}% nguyên liệu cần thiết, còn thiếu ${match.missing_ingredient_ids.length} nguyên liệu.`;
      }

      const recommendation = this.recommendationRepo.create({
        user_id,
        recipe_id: match.recipe.recipe_id,
        match_percentage: match.match_percentage,
        match_score: match.match_percentage / 100,
        reason,
      });
      const savedRecommendation = await this.recommendationRepo.save(recommendation);

      if (match.missing_ingredient_ids.length > 0) {
        const missingRows = match.missing_ingredient_ids.map((ingredient_id) =>
          this.missingRepo.create({
            recommendation_id: savedRecommendation.recommendation_id,
            ingredient_id,
          }),
        );
        await this.missingRepo.save(missingRows);
      }

      saved.push(savedRecommendation);
    }

    return saved;
  }

  findAllByUser(user_id: number): Promise<AiRecommendation[]> {
    return this.recommendationRepo.find({
      where: { user_id },
      relations: ['recipe', 'missing_ingredients', 'missing_ingredients.ingredient'],
      order: { created_at: 'DESC' },
    });
  }
}


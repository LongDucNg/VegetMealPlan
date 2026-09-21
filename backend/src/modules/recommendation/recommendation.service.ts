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
 * Đây là chỗ hiện thực thuật toán tổng:
 *
 *   USER -> USER_INGREDIENT -> INGREDIENT -> RECIPE_INGREDIENT -> RECIPE
 *   kiểm tra: allergy, diet_type, ingredient thiếu
 *   -> RECIPE RECOMMENDATION (kèm score/reason/missing_ingredients)
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

  async generateForUser(user_id: number): Promise<AiRecommendation[]> {
    const user = await this.usersService.findOne(user_id);

    const availableIngredientIds =
      await this.userIngredientService.getAvailableIngredientIds(user_id);

    // Edge case bắt buộc: user chưa nhập nguyên liệu nào -> không tạo recommendation giả.
    if (availableIngredientIds.length === 0) {
      throw new BadRequestException(
        'Bạn chưa nhập nguyên liệu nào — hãy thêm ít nhất 1 nguyên liệu trước khi tạo gợi ý.',
      );
    }

    const allergyIngredientIds = await this.ingredientService.getAllergyIngredientIds(user_id);

    // TODO: lọc thêm theo user.diet_type khi RecipeService có field diet_type index sẵn
    // (hiện matchRecipesByIngredients chỉ lọc allergy, chưa lọc diet_type — bổ sung ở PR sau).
    const matches = await this.recipeService.matchRecipesByIngredients(
      availableIngredientIds,
      allergyIngredientIds,
    );

    const saved: AiRecommendation[] = [];

    for (const match of matches) {
      const recommendation = this.recommendationRepo.create({
        user_id,
        recipe_id: match.recipe.recipe_id,
        match_percentage: match.match_percentage,
        match_score: match.match_percentage / 100,
        reason:
          match.missing_ingredient_ids.length === 0
            ? 'Bạn đã có đủ nguyên liệu cho món này.'
            : `Bạn có ${match.match_percentage}% nguyên liệu cần thiết, thiếu ${match.missing_ingredient_ids.length} nguyên liệu.`,
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

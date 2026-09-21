import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiRecommendation } from './entities/ai-recommendation.entity';
import { AiRecommendationMissingIngredient } from './entities/ai-recommendation-missing-ingredient.entity';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { UserIngredientModule } from '../user-ingredient/user-ingredient.module';
import { IngredientModule } from '../ingredient/ingredient.module';
import { RecipeModule } from '../recipe/recipe.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiRecommendation, AiRecommendationMissingIngredient]),
    UserIngredientModule,
    IngredientModule,
    RecipeModule,
    UsersModule,
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationModule {}

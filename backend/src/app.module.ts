import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { HealthGoalModule } from './modules/health-goal/health-goal.module';
import { CategoryModule } from './modules/category/category.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { NutritionModule } from './modules/nutrition/nutrition.module';
import { UserIngredientModule } from './modules/user-ingredient/user-ingredient.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { MealPlanModule } from './modules/meal-plan/meal-plan.module';
import { CommunityModule } from './modules/community/community.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { ShopModule } from './modules/shop/shop.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        // LUÔN false — schema đi qua migration để cả team dùng chung 1 nguồn sự thật.
        synchronize: config.get<string>('DB_SYNCHRONIZE') === 'true',
      }),
    }),

    // ---- Feature modules, nhóm theo domain trong ERD ----
    AuthModule,
    UsersModule,
    HealthGoalModule,
    CategoryModule,
    IngredientModule,
    RecipeModule,
    NutritionModule,
    UserIngredientModule,
    RecommendationModule,
    MealPlanModule,
    CommunityModule,
    ChatbotModule,
    ShopModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { resolve } from 'path';

import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { HealthGoalModule } from './modules/health-goal/health-goal.module';
import { HealthGoalService } from './modules/health-goal/health-goal.service';
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
import { UsageQuotaModule } from './modules/usage-quota/usage-quota.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { RecipeImportModule } from './modules/recipe-import/recipe-import.module';

@Module({
  imports: [
    // envFilePath: nạp .env từ thư mục backend (thư mục chứa package.json), KHÔNG phụ thuộc
    // process.cwd() — nhờ vậy chạy `npm run dev` từ backend, hay `node dist/main` từ
    // thư mục khác, vẫn đọc đúng file. dotenv không đọc file ngoài process.cwd().
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [resolve(__dirname, '..', '.env'), resolve(process.cwd(), '.env')],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // Báo thiếu biến môi trường bằng TÊN biến, KHÔNG in giá trị (không lộ mật khẩu).
        const required = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'] as const;
        const missing = required.filter((key) => {
          const value = config.get<string>(key);
          return value === undefined || value === null || value === '';
        });
        if (missing.length) {
          throw new Error(
            `Thiếu cấu hình PostgreSQL trong file .env: ${missing.join(', ')}. ` +
              `Hãy copy .env.example thành .env rồi điền giá trị.`,
          );
        }

        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: Number(config.get<string>('DB_PORT')),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: true,
          // LUÔN false — schema đi qua migration để cả team dùng chung 1 nguồn sự thật.
          synchronize: config.get<string>('DB_SYNCHRONIZE') === 'true',
        };
      },
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
    UsageQuotaModule,
    NotificationModule,
    SubscriptionModule,
    RecipeImportModule,
  ],
  providers: [
    // Thứ tự quan trọng: đăng nhập trước, phân quyền sau. Route công khai gắn @Public().
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {
  constructor(healthGoalService: HealthGoalService) {
    // Bảng `health_goals` là master data (3 dòng). Nếu bị trống — ví dụ môi
    // trường dev mới chưa chạy `npm run seed` — thì tự khởi tạo tối thiểu để
    // `users.current_goal_id` và `meal_plans.goal_id` có giá trị hợp lệ.
    // Idempotent: dòng đã có thì không đụng tới.
    healthGoalService.ensureMasterData().catch((err) => {
      // Không được làm sập app vì thiếu master data.
      new Logger('HealthGoalBootstrap').warn(
        `Không tự khởi tạo được health_goals: ${err?.message ?? err}`,
      );
    });
  }
}

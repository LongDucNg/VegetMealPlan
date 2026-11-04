import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { SubscriptionModule } from '../subscription/subscription.module';
import { UsageQuotaModule } from '../usage-quota/usage-quota.module';
import { UsersModule } from '../users/users.module';
import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';
import { PhotoScanService } from './photo-scan.service';
import { PhotoScanController } from './photo-scan.controller';
import { GeminiScanAiProvider } from './providers/gemini-scan-ai.provider';
import { MockScanAiProvider } from './providers/mock-scan-ai.provider';

import { User } from '../users/entities/user.entity';
import { UserIngredientModule } from '../user-ingredient/user-ingredient.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingredient, User]),
    SubscriptionModule,
    UsageQuotaModule,
    UsersModule,
    UserIngredientModule,
  ],
  controllers: [PhotoScanController],
  providers: [
    PhotoScanService,
    NonVegetarianDetectorService,
    GeminiScanAiProvider,
    MockScanAiProvider,
    {
      provide: 'SCAN_AI_PROVIDER',
      useFactory: (
        gemini: GeminiScanAiProvider,
        mock: MockScanAiProvider,
      ) => {
        const provider = (
          process.env.SCAN_AI_PROVIDER || 'gemini'
        ).toLowerCase().trim();
        if (provider === 'mock' && process.env.NODE_ENV !== 'production') {
          return mock;
        }
        return gemini;
      },
      inject: [GeminiScanAiProvider, MockScanAiProvider],
    },
  ],
  exports: [PhotoScanService],
})
export class PhotoScanModule {}

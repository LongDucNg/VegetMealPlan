import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageQuota } from './entities/usage-quota.entity';
import { UsageQuotaService } from './usage-quota.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsageQuota])],
  providers: [UsageQuotaService],
  exports: [UsageQuotaService],
})
export class UsageQuotaModule {}

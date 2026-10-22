import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HealthGoal } from '../health-goal/entities/health-goal.entity';
import { UserAllergy } from '../ingredient/entities/user-allergy.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AdminUsersController } from './admin-users.controller';
import { UserSession } from '../auth/entities/user-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, HealthGoal, UserAllergy, Ingredient, UserSession])],
  controllers: [UsersController, AdminUsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}

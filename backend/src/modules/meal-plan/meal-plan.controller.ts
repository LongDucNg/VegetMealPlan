import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MealPlanService } from './meal-plan.service';
import { MealPlanProfileService } from './meal-plan-profile.service';
import { SaveMealPlanDto } from './dto/save-meal-plan.dto';
import { GenerateForSomeoneDto } from './dto/generate-for-someone.dto';
import { UpdateMyMealPlanDto } from './dto/update-my-meal-plan.dto';
import { ValidateMealPlanDto } from './dto/validate-meal-plan.dto';
import { UpdateMealSlotDto } from './dto/update-meal-slot.dto';
import { GenerateMealPlanDto } from './dto/generate-meal-plan.dto';
import { SetProfileAllergiesDto } from './dto/set-profile-allergies.dto';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('meal-plans')
@ApiBearerAuth()
@Controller()
export class MealPlanController {
  constructor(
    private readonly mealPlanService: MealPlanService,
    private readonly mealPlanProfileService: MealPlanProfileService,
  ) { }

  // =========================================================
  // ROUTE KHÔNG CÓ PARAM VÀO TRƯỚC (Tránh bị đè Route)
  // =========================================================

  @Get('users/me/meal-plans')
  findMyMealPlans(@CurrentUser('user_id') userId: number) {
    return this.mealPlanService.findMyMealPlans(userId);
  }

  @Post('users/me/meal-plans')
  createMealPlan(@CurrentUser('user_id') userId: number, @Body() dto: SaveMealPlanDto) {
    return this.mealPlanService.saveMealPlan(userId, dto);
  }

  @Post('meal-plans/generate/daily')
  generateDailyMealPlan(
    @CurrentUser('user_id') userId: number,
    @Body() dto: GenerateMealPlanDto,
  ) {
    return this.mealPlanService.generateDailyMealPlan(
      userId,
      dto,
    );
  }

  @Post('meal-plans/generate/weekly')
  generateWeeklyMealPlan(
    @CurrentUser('user_id') userId: number,
    @Body() dto: GenerateMealPlanDto,
  ) {
    return this.mealPlanService.generateWeeklyMealPlan(
      userId,
      dto,
    );
  }

  @Post('meal-plans/generate/monthly')
  generateMonthlyMealPlan(
    @CurrentUser('user_id') userId: number,
    @Body() dto: GenerateMealPlanDto,
  ) {
    return this.mealPlanService.generateMonthlyMealPlan(
      userId,
      dto,
    );
  }

  @Post('meal-plans/generate/for-someone')
  generateMealPlanForSomeone(
    @CurrentUser('user_id') userId: number,
    @Body() dto: GenerateForSomeoneDto,
  ) {
    return this.mealPlanService.generateMealPlanForSomeone(
      userId,
      dto,
    );
  }

  @Get('users/me/meal-plan-profiles/:profileId/allergies')
  getProfileAllergies(
    @CurrentUser('user_id') userId: number,
    @Param('profileId', PositiveIntPipe) profileId: number,
  ) {
    return this.mealPlanProfileService.getProfileAllergies(
      userId,
      profileId,
    );
  }

  @Put('users/me/meal-plan-profiles/:profileId/allergies')
  setProfileAllergies(
    @CurrentUser('user_id') userId: number,
    @Param('profileId', PositiveIntPipe) profileId: number,
    @Body() dto: SetProfileAllergiesDto,
  ) {
    return this.mealPlanProfileService.setProfileAllergies(
      userId,
      profileId,
      dto.ingredient_ids,
    );
  }

  @Post('meal-plans/validate')
  validateMealPlan(@CurrentUser('user_id') userId: number, @Body() dto: ValidateMealPlanDto) {
    return this.mealPlanService.validateMealPlan(userId, dto);
  }

  // =========================================================
  // ROUTE CÓ NESTED PARAM DÀI ĐẶT TRÊN PARAM NGẮN
  // =========================================================

  @Patch('users/me/meal-plans/:id/days/:dayId/slots/:slotId')
  updateMealSlot(
    @CurrentUser('user_id') userId: number,
    @Param('id', PositiveIntPipe) id: number,
    @Param('dayId', PositiveIntPipe) dayId: number,
    @Param('slotId', PositiveIntPipe) slotId: number,
    @Body() dto: UpdateMealSlotDto,
  ) {
    return this.mealPlanService.updateMealSlot(
      userId,
      id,
      dayId,
      slotId,
      dto,
    );
  }

  // =========================================================
  // ROUTE SINGLE PARAM (:id) ĐẶT CUỐI CÙNG
  // =========================================================

  @Get('users/me/meal-plans/:id')
  findMyMealPlanDetail(
    @CurrentUser('user_id') userId: number,
    @Param('id', PositiveIntPipe) id: number,
  ) {
    return this.mealPlanService.findMyMealPlanDetail(userId, id);
  }

  @Patch('users/me/meal-plans/:id')
  updateMyMealPlan(
    @CurrentUser('user_id') userId: number,
    @Param('id', PositiveIntPipe) id: number,
    @Body() dto: UpdateMyMealPlanDto,
  ) {
    return this.mealPlanService.updateMyMealPlan(userId, id, dto);
  }

  @Delete('users/me/meal-plans/:id')
  deleteMyMealPlan(
    @CurrentUser('user_id') userId: number,
    @Param('id', PositiveIntPipe) id: number,
  ) {
    return this.mealPlanService.deleteMyMealPlan(userId, id);
  }
}
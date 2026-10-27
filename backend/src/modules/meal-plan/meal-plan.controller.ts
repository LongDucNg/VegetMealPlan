import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { MealPlanService } from './meal-plan.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { SaveMealPlanDto } from './dto/save-meal-plan.dto';
import { GenerateForSomeoneDto } from './dto/generate-for-someone.dto';
import { UpdateMyMealPlanDto } from './dto/update-my-meal-plan.dto';
import { ValidateMealPlanDto } from './dto/validate-meal-plan.dto';
import { UpdateMealSlotDto } from './dto/update-meal-slot.dto';
import { GenerateMealPlanDto } from './dto/generate-meal-plan.dto';
import { SetProfileAllergiesDto } from './dto/set-profile-allergies.dto';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';

@ApiTags('meal-plans')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller()
export class MealPlanController {
  constructor(
    private readonly mealPlanService: MealPlanService,
  ) { }

  // =========================================================
  // ROUTE KHÔNG CÓ PARAM VÀO TRƯỚC (Tránh bị đè Route)
  // =========================================================

  @Get('users/me/meal-plans')
  findMyMealPlans(@Req() req: any) {
    return this.mealPlanService.findMyMealPlans(req.user.user_id);
  }

  @Post('users/me/meal-plans')
  createMealPlan(@Req() req: any, @Body() dto: SaveMealPlanDto) {
    return this.mealPlanService.saveMealPlan(req.user.user_id, dto);
  }

  @Post('meal-plans/generate/weekly')
  generateWeeklyMealPlan(
    @Req() req: any,
    @Body() dto: GenerateMealPlanDto,
  ) {
    return this.mealPlanService.generateWeeklyMealPlan(
      req.user.user_id,
      dto,
    );
  }

  @Post('meal-plans/generate/monthly')
  generateMonthlyMealPlan(
    @Req() req: any,
    @Body() dto: GenerateMealPlanDto,
  ) {
    return this.mealPlanService.generateMonthlyMealPlan(
      req.user.user_id,
      dto,
    );
  }

  @Post('meal-plans/generate/for-someone')
  generateMealPlanForSomeone(
    @Req() req: any,
    @Body() dto: GenerateForSomeoneDto,
  ) {
    return this.mealPlanService.generateMealPlanForSomeone(
      req.user.user_id,
      dto,
    );
  }

  @Get('users/me/meal-plan-profiles/:profileId/allergies')
  getProfileAllergies(
    @Req() req: any,
    @Param('profileId', PositiveIntPipe) profileId: number,
  ) {
    return this.mealPlanService.getProfileAllergies(
      req.user.user_id,
      profileId,
    );
  }

  @Put('users/me/meal-plan-profiles/:profileId/allergies')
  setProfileAllergies(
    @Req() req: any,
    @Param('profileId', PositiveIntPipe) profileId: number,
    @Body() dto: SetProfileAllergiesDto,
  ) {
    return this.mealPlanService.setProfileAllergies(
      req.user.user_id,
      profileId,
      dto.ingredient_ids,
    );
  }

  @Post('meal-plans/validate')
  validateMealPlan(@Req() req: any, @Body() dto: ValidateMealPlanDto) {
    return this.mealPlanService.validateMealPlan(req.user.user_id, dto);
  }

  // =========================================================
  // ROUTE CÓ NESTED PARAM DÀI ĐẶT TRÊN PARAM NGẮN
  // =========================================================

  @Patch('users/me/meal-plans/:id/days/:dayId/slots/:slotId')
  updateMealSlot(
    @Req() req: any,
    @Param('id', PositiveIntPipe) id: number,
    @Param('dayId', PositiveIntPipe) dayId: number,
    @Param('slotId', PositiveIntPipe) slotId: number,
    @Body() dto: UpdateMealSlotDto,
  ) {
    return this.mealPlanService.updateMealSlot(
      req.user?.user_id,
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
    @Req() req: any,
    @Param('id', PositiveIntPipe) id: number,
  ) {
    return this.mealPlanService.findMyMealPlanDetail(req.user.user_id, id);
  }

  @Patch('users/me/meal-plans/:id')
  updateMyMealPlan(
    @Req() req: any,
    @Param('id', PositiveIntPipe) id: number,
    @Body() dto: UpdateMyMealPlanDto,
  ) {
    return this.mealPlanService.updateMyMealPlan(req.user.user_id, id, dto);
  }

  @Delete('users/me/meal-plans/:id')
  deleteMyMealPlan(
    @Req() req: any,
    @Param('id', PositiveIntPipe) id: number,
  ) {
    return this.mealPlanService.deleteMyMealPlan(req.user.user_id, id);
  }
}
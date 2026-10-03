import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateAllergiesDto } from './dto/update-allergies.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

// Mọi route lấy user từ JWT (JwtAuthGuard toàn cục), không nhận userId trên path.
@ApiTags('users')
@ApiBearerAuth()
@Controller('users/me')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Xem hồ sơ cá nhân (kèm BMI, dị ứng, trạng thái Premium)' })
  getProfile(@CurrentUser('user_id') userId: number) {
    return this.usersService.getProfile(userId);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Cập nhật hồ sơ; BMI được server tự tính lại' })
  updateProfile(@CurrentUser('user_id') userId: number, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  @Get('allergies')
  @ApiOperation({ summary: 'Xem danh sách dị ứng hiện tại' })
  getAllergies(@CurrentUser('user_id') userId: number) {
    return this.usersService.getAllergies(userId);
  }

  @Put('allergies')
  @ApiOperation({ summary: 'Đặt lại toàn bộ danh sách dị ứng (ghi đè danh sách cũ)' })
  setAllergies(@CurrentUser('user_id') userId: number, @Body() dto: UpdateAllergiesDto) {
    return this.usersService.setAllergies(userId, dto);
  }

  @Get('nutrition-summary')
  @ApiOperation({ summary: 'Tóm tắt dinh dưỡng: BMR, TDEE, calo mục tiêu, macro, calo từng bữa' })
  nutritionSummary(@CurrentUser('user_id') userId: number) {
    return this.usersService.getNutritionSummary(userId);
  }
}

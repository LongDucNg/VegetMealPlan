import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  getProfile(@CurrentUser('user_id') userId: number) {
    return this.usersService.getProfile(userId);
  }

  @Put('profile')
  updateProfile(@CurrentUser('user_id') userId: number, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  @Get('allergies')
  getAllergies(@CurrentUser('user_id') userId: number) {
    return this.usersService.getAllergies(userId);
  }

  @Put('allergies')
  setAllergies(@CurrentUser('user_id') userId: number, @Body() dto: UpdateAllergiesDto) {
    return this.usersService.setAllergies(userId, dto);
  }

  @Get('nutrition-summary')
  nutritionSummary(@CurrentUser('user_id') userId: number) {
    return this.usersService.getNutritionSummary(userId);
  }
}

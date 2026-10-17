import { Body, Controller, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UpdateMemberRoleDto, UpdateMemberStatusDto } from './dto/update-member.dto';

@ApiTags('admin-members')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('admin/members')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Admin: danh sách thành viên thật từ database' })
  async getMembers(
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.usersService.findMembers(search, status);
  }

  @Put(':id/status')
  @ApiOperation({
    summary: 'Admin: khóa / mở khóa tài khoản',
    description: 'Khóa thì mọi phiên đăng nhập của người đó bị thu hồi ngay. Không được tự khóa chính mình.',
  })
  async updateStatus(
    @CurrentUser('user_id') adminId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMemberStatusDto,
  ) {
    return this.usersService.updateMemberStatus(adminId, id, dto.status);
  }

  @Put(':id/role')
  @ApiOperation({ summary: 'Admin: thăng / hạ cấp vai trò', description: 'Không được tự đổi vai trò của chính mình.' })
  async updateRole(
    @CurrentUser('user_id') adminId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMemberRoleDto,
  ) {
    return this.usersService.updateMemberRole(adminId, id, dto.role);
  }
}

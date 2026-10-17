import { Body, Controller, Get, Param, ParseIntPipe, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';

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
  @ApiOperation({ summary: 'Admin: khóa / mở khóa tài khoản' })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.usersService.updateMemberStatus(id, status);
  }

  @Put(':id/role')
  @ApiOperation({ summary: 'Admin: thăng / hạ cấp vai trò' })
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: string,
  ) {
    return this.usersService.updateMemberRole(id, role);
  }
}

import { Body, Controller, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForumService } from './forum.service';
import { AdminContentQueryDto } from './dto/admin-content-query.dto';
import { UpdateContentStatusDto } from './dto/update-content-status.dto';
import { AuthUser, CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('admin-content')
@ApiBearerAuth()
@Controller('admin/content')
export class AdminContentController {
  constructor(private readonly service: ForumService) {}

  @Get()
  @ApiOperation({ summary: 'Admin: Danh sách nội dung đã đăng (lọc theo type và status)' })
  getContentList(
    @CurrentUser() user: AuthUser,
    @Query() query: AdminContentQueryDto,
  ) {
    return this.service.getAdminContentList(user, query);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Admin: Đổi trạng thái nội dung (chuyển trạng thái hợp lệ, từ chối/gỡ cần lý do)' })
  updateStatus(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContentStatusDto,
  ) {
    return this.service.updateContentStatus(user, id, dto);
  }
}

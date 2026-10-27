import { Body, Controller, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForumService } from './forum.service';
import { AdminModerationQueryDto } from './dto/admin-moderation-query.dto';
import { ModeratePostDto } from './dto/moderate-post.dto';
import { AuthUser, CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('admin-moderation')
@ApiBearerAuth()
@Controller('admin/moderation')
export class AdminModerationController {
  constructor(private readonly service: ForumService) {}

  @Get()
  @ApiOperation({ summary: 'Admin: Hàng chờ duyệt bài viết diễn đàn (bài gắn cờ lên đầu, cũ nhất trước)' })
  getModerationQueue(
    @CurrentUser() user: AuthUser,
    @Query() query: AdminModerationQueryDto,
  ) {
    return this.service.getModerationQueue(user, query);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Admin: Duyệt hoặc từ chối bài viết (chỉ bài chờ duyệt, từ chối bắt buộc có lý do)' })
  moderatePost(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ModeratePostDto,
  ) {
    return this.service.moderatePost(user, id, dto);
  }
}

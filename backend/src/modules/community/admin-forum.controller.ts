import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForumService } from './forum.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../users/entities/user.entity';
import { UpdateForumPostStatusDto } from './dto/update-forum-post-status.dto';

@ApiTags('admin-forum')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('admin/forum')
export class AdminForumController {
  constructor(private readonly service: ForumService) {}

  @Get('posts')
  @ApiOperation({ summary: 'Admin: danh sách bài viết (kèm bộ lọc trạng thái: pending_review, approved, removed...)' })
  listPosts(
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.service.adminListPosts({ status, page, limit });
  }

  @Get('moderation/pending')
  @ApiOperation({ summary: 'Admin: danh sách hàng đợi các bài viết đang chờ kiểm duyệt' })
  listPending(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.service.adminListPending({ page, limit });
  }

  @Get('moderation/count')
  @ApiOperation({ summary: 'Admin: số lượng bài viết đang chờ duyệt' })
  getPendingCount() {
    return this.service.adminGetPendingCount();
  }

  @Put('posts/:id/status')
  @Patch('posts/:id/status')
  @ApiOperation({ summary: 'Admin: duyệt / từ chối / gỡ bài viết' })
  updateStatus(
    @CurrentUser('user_id') adminId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateForumPostStatusDto,
  ) {
    return this.service.adminUpdateStatus(adminId, id, dto.status);
  }

  @Delete('posts/:id')
  @ApiOperation({ summary: 'Admin: xoá hẳn bài viết' })
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.service.adminDeletePost(id);
  }
}

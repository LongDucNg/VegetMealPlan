import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForumService } from './forum.service';
import { ForumPostQueryDto } from './dto/forum-post-query.dto';
import { CreateForumPostDto } from './dto/create-forum-post.dto';
import { ForumCommentQueryDto } from './dto/forum-comment-query.dto';
import { CreateForumCommentDto } from './dto/create-forum-comment.dto';
import { Public } from '../../common/decorators/public.decorator';
import { AuthUser, CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('forum')
@Controller('forum')
export class ForumController {
  constructor(private readonly service: ForumService) {}

  @Get('categories')
  @Public()
  @ApiOperation({ summary: 'Danh mục diễn đàn' })
  listCategories() {
    return this.service.listCategories();
  }

  @Get('posts')
  @Public()
  @ApiOperation({ summary: 'Danh sách bài (lọc, tìm kiếm, sắp xếp, phân trang)' })
  listPosts(@Query() query: ForumPostQueryDto) {
    return this.service.listPosts(query);
  }

  @Get('posts/:id')
  @Public()
  @ApiOperation({ summary: 'Chi tiết bài, tăng lượt xem' })
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.service.getPostDetail(id);
  }

  @Post('posts')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng bài (thành viên chờ duyệt, admin duyệt luôn)' })
  createPost(@CurrentUser() user: AuthUser, @Body() dto: CreateForumPostDto) {
    return this.service.createPost(user, dto);
  }

  @Get('posts/:id/comments')
  @Public()
  @ApiOperation({ summary: 'Danh sách comment của bài (cũ nhất trước, có phân trang)' })
  listComments(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: ForumCommentQueryDto,
  ) {
    return this.service.listComments(id, query);
  }

  @Post('posts/:id/comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thêm comment vào bài đã duyệt' })
  createComment(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateForumCommentDto,
  ) {
    return this.service.createComment(user, id, dto);
  }
}
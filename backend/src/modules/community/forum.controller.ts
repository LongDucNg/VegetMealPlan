import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForumService } from './forum.service';
import { ForumPostQueryDto } from './dto/forum-post-query.dto';
import { CreateForumPostDto } from './dto/create-forum-post.dto';
import { UpdateForumPostDto } from './dto/update-forum-post.dto';
import { VotePostDto } from './dto/vote-post.dto';
import { TrendingQueryDto } from './dto/trending-query.dto';
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

  @Get('trending')
  @Public()
  @ApiOperation({ summary: 'Chủ đề nổi bật (trending tags trong 7 ngày gần nhất, mặc định 10, tối đa 20)' })
  getTrending(@Query() query: TrendingQueryDto) {
    return this.service.getTrendingTopics(query.limit);
  }

  @Get('posts')
  @Public()
  @ApiOperation({ summary: 'Danh sách bài (lọc, tìm kiếm, sắp xếp, phân trang)' })
  listPosts(@Query() query: ForumPostQueryDto) {
    return this.service.listPosts(query);
  }

  // Chú ý: Route 'posts/mine' PHẢI khai báo trước 'posts/:id' để không bị coi là ID
  @Get('posts/mine')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Danh sách bài viết của tôi (kèm status, reject_reason)' })
  listMyPosts(@CurrentUser() user: AuthUser, @Query() query: ForumPostQueryDto) {
    return this.service.listMyPosts(user, query);
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

  @Put('posts/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Chỉnh sửa bài viết (chủ bài hoặc admin)' })
  updatePost(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateForumPostDto,
  ) {
    return this.service.updatePost(user, id, dto);
  }

  @Delete('posts/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa mềm bài viết (chủ bài hoặc admin)' })
  deletePost(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.deletePost(user, id);
  }

  @Post('posts/:id/vote')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bình chọn bài viết (up / down / null để hủy)' })
  votePost(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: VotePostDto,
  ) {
    return this.service.votePost(user, id, dto);
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

  @Delete('posts/:postId/comments/:commentId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa mềm bình luận (chủ bình luận hoặc admin)' })
  deleteComment(
    @CurrentUser() user: AuthUser,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.service.deleteComment(user, postId, commentId);
  }

  @Post('posts/:postId/comments/:commentId/vote')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bình chọn bình luận (up / down / null để hủy)' })
  voteComment(
    @CurrentUser() user: AuthUser,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() dto: VotePostDto,
  ) {
    return this.service.voteComment(user, postId, commentId, dto);
  }
}
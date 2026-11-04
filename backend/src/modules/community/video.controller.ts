import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import * as fs from 'fs';
import { VideoService, UploadedMediaFile } from './video.service';
import { VideoQueryDto } from './dto/video-query.dto';
import { TrendingQueryDto } from './dto/trending-query.dto';
import { VideoCommentQueryDto } from './dto/video-comment-query.dto';
import { CreateVideoCommentDto } from './dto/create-video-comment.dto';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VoteCommentDto } from './dto/vote-comment.dto';
import { Public } from '../../common/decorators/public.decorator';
import { AuthUser, CurrentUser } from '../../common/decorators/current-user.decorator';
import { ErrorCode } from '../../common/constants/error-codes.enum';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('multer');

const videoMulterOptions = {
  storage: multer.diskStorage({
    destination: (_req: any, file: any, cb: any) => {
      let uploadPath = 'uploads/others';
      if (file.fieldname === 'videoFile') {
        uploadPath = 'uploads/videos';
      } else if (file.fieldname === 'thumbnail') {
        uploadPath = 'uploads/thumbnails';
      }
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (_req: any, file: any, cb: any) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (_req: any, file: any, cb: any) => {
    if (file.fieldname === 'videoFile') {
      const allowedMimes = ['video/mp4', 'video/webm'];
      const allowedExts = ['.mp4', '.webm'];
      const ext = path.extname(file.originalname).toLowerCase();
      if (allowedMimes.includes(file.mimetype) || allowedExts.includes(ext)) {
        cb(null, true);
      } else {
        cb(
          new BadRequestException({
            code: ErrorCode.VALIDATION_FAILED,
            message: 'File video chỉ nhận định dạng mp4 hoặc webm',
          }),
          false,
        );
      }
    } else if (file.fieldname === 'thumbnail') {
      const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
      const allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];
      const ext = path.extname(file.originalname).toLowerCase();
      if (allowedMimes.includes(file.mimetype) || allowedExts.includes(ext)) {
        cb(null, true);
      } else {
        cb(
          new BadRequestException({
            code: ErrorCode.VALIDATION_FAILED,
            message: 'Thumbnail chỉ nhận định dạng jpg, png hoặc webp',
          }),
          false,
        );
      }
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
};

@ApiTags('videos')
@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách video công thức (lọc danh mục, tìm kiếm, sắp xếp, phân trang)' })
  listVideos(@Query() query: VideoQueryDto) {
    return this.videoService.listVideos(query);
  }

  // Chú ý: Route tĩnh 'trending' và 'filters' PHẢI khai báo trước ':id' để không bị hiểu lầm là id
  @Get('trending')
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách video nổi bật (trending, mặc định 6, tối đa 20)' })
  getTrendingVideos(@Query() query: TrendingQueryDto) {
    return this.videoService.getTrendingVideos(query.limit);
  }

  @Get('filters')
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách tên danh mục video để làm bộ lọc' })
  getVideoFilters() {
    return this.videoService.getVideoFilters();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Lấy chi tiết video công thức theo ID (tăng lượt xem)' })
  getVideoDetail(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.getVideoDetail(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'videoFile', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      videoMulterOptions,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Đăng video công thức mới kèm videoFile và thumbnail' })
  createVideo(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateVideoDto,
    @UploadedFiles()
    files: {
      videoFile?: UploadedMediaFile[];
      thumbnail?: UploadedMediaFile[];
    },
  ) {
    const videoFile = files?.videoFile?.[0];
    const thumbnailFile = files?.thumbnail?.[0];
    return this.videoService.createVideo(user, dto, videoFile, thumbnailFile);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'thumbnail', maxCount: 1 }],
      videoMulterOptions,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Chỉnh sửa video công thức (chủ video hoặc admin)' })
  updateVideo(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVideoDto,
    @UploadedFiles()
    files: {
      thumbnail?: UploadedMediaFile[];
    },
  ) {
    const thumbnailFile = files?.thumbnail?.[0];
    return this.videoService.updateVideo(user, id, dto, thumbnailFile);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa video công thức (chủ video hoặc admin, xóa mềm)' })
  deleteVideo(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.videoService.deleteVideo(user, id);
  }

  @Get(':id/comments')
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách bình luận của video (cũ nhất trước, có phân trang)' })
  listVideoComments(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: VideoCommentQueryDto,
  ) {
    return this.videoService.listVideoComments(id, query);
  }

  @Post(':id/comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thêm bình luận mới vào video đã duyệt' })
  createVideoComment(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateVideoCommentDto,
  ) {
    return this.videoService.createVideoComment(user, id, dto);
  }

  @Post(':id/comments/:commentId/vote')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bình chọn bình luận (up / down / null để hủy)' })
  voteComment(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() dto: VoteCommentDto,
  ) {
    return this.videoService.voteComment(user, id, commentId, dto);
  }

  @Get(':id/ai-summary')
  @Public()
  @ApiOperation({ summary: 'Lấy tóm tắt AI của video (chỉ trả kết quả thật nếu có, không dựng dữ liệu giả)' })
  getVideoAiSummary(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.getVideoAiSummary(id);
  }
}

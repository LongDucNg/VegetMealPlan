import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Video } from './entities/video.entity';
import { Comment } from './entities/comment.entity';
import { Vote } from './entities/vote.entity';

// TODO: BlogService/VideoService/CommentService/VoteService + controllers CRUD.
// Gợi ý chia: 1 bạn FE-BE phối hợp làm Blog+Comment, 1 bạn làm Video+Vote.
@Module({
  imports: [TypeOrmModule.forFeature([Blog, Video, Comment, Vote])],
  exports: [TypeOrmModule],
})
export class CommunityModule {}

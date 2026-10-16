import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Video } from './entities/video.entity';
import { Comment } from './entities/comment.entity';
import { Vote } from './entities/vote.entity';
import { Category } from '../category/entities/category.entity';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';

// TODO: VideoService, comment, vote, admin moderation (làm ở các đợt sau).
@Module({
  imports: [TypeOrmModule.forFeature([Blog, Video, Comment, Vote, Category])],
  controllers: [ForumController],
  providers: [ForumService],
  exports: [TypeOrmModule],
})
export class CommunityModule {}
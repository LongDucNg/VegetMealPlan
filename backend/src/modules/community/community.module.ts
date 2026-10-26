import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Video } from './entities/video.entity';
import { Comment } from './entities/comment.entity';
import { Vote } from './entities/vote.entity';
import { Category } from '../category/entities/category.entity';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Video, Comment, Vote, Category])],
  controllers: [ForumController, VideoController],
  providers: [ForumService, VideoService, NonVegetarianDetectorService],
  exports: [TypeOrmModule, VideoService, NonVegetarianDetectorService],
})
export class CommunityModule {}
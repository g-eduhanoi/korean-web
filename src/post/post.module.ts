import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostProviders } from './entities/post.entity';
import { CategoryRepo } from 'category/entities/category.entity';
import { TagRepo } from 'tag/entities/tag.entity';

@Module({
  controllers: [PostController],
  providers: [PostService, ...PostProviders, CategoryRepo, TagRepo]
})
export class PostModule {}

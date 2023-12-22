import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostProviders } from './entities/post.entity';
import { CategoryRepo } from 'category/entities/category.entity';
import { TagRepo } from 'tag/entities/tag.entity';
import { CategoryService } from 'category/category.service';

@Module({
  controllers: [PostController],
  providers: [PostService, ...PostProviders, CategoryService, CategoryRepo, TagRepo]
})
export class PostModule {}

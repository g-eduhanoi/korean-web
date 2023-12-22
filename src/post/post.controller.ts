import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import { PostFilterReqDto } from './dto/post-filter-req.dto';
import { CategoryService } from 'category/category.service';
import { PostLocaleType } from './entities/post.entity';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService,
    private readonly categoryService: CategoryService,
  ) { }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Post("findAll")
  findAll(@Body("pageable") pageable: ReqPageableDto, @Body("filter") reqDto: PostFilterReqDto) {
    return this.postService.filter(reqDto, pageable);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  @Get("blogs/all")
  async getBlogs(@Query("lang") lang: PostLocaleType) {
    const child1s = (await this.categoryService.findChilds(16))
      .map(async (item) => {
        return {
          title: item.name,
          slug: item.slug,
          posts: (await this.postService.filter({
            categoryId: item.id,
            postLocale: lang
          }, {
            page: 0, size: 3,

          })).content
        }
      });

    return await Promise.all(child1s);
  }
}

import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Category } from 'category/entities/category.entity';
import { Tag } from 'tag/entities/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject("POST_REPO") private readonly postRepo: typeof Post,
    @Inject("CATEGORY_REPO") private readonly categoryRepo: typeof Category,
    @Inject("TAG_REPO") private readonly tagRepo: typeof Tag
  ) { }

  async checkDto(createPostDto: CreatePostDto | UpdatePostDto) {
    const category = await this.categoryRepo.findByPk(createPostDto.categoryId);
    if (!category)
      throw new Error("Category not found");
    createPostDto.category = category;

    if(createPostDto.tagIds)
    {
      const tags = [];
      for (let i = 0; i < createPostDto.tagIds.length; i++) {
        const tag = await this.tagRepo.findByPk(createPostDto.tagIds[i]);
        if (!tag)
          throw new Error("Tag not found");
        tags.push(tag);
      }
      createPostDto.tags = tags;
    }

  }

  async create(createPostDto: CreatePostDto) {
    await this.checkDto(createPostDto);
    const result = await this.postRepo.create({
      ...createPostDto,
      tags: createPostDto.tagIds,
      createdBy: 1,
      updatedBy: 1
    });
    // if(createPostDto.tagIds)
    //   {
    //     // result.$set("tags", createPostDto.tagIds);
    //     await result.update({
    //       tags: createPostDto.tags
    //     });
    //   }


   console.log(await result.$get("tags"));
    

    return result;
    
  }
  async findAll(pageable: ReqPageableDto) {
    return await this.postRepo.findAll({
      ...ReqPageableDto.toPageable(pageable),
      include: [
        {
          model: Category,
          as: "category"
        },
        {
          model: Tag,
          as: "tags"
        }
      ]
    });
  }

  async findOne(id: number) {
    return await this.postRepo.findByPk(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.checkDto(updatePostDto);

    const post = await this.postRepo.findByPk(id);
    if (!post) throw new Error("Post not found");

    return await post.update({
      ...updatePostDto,
      updatedBy: 1
    });
  }

  async remove(id: number) {
    const post = await this.postRepo.findByPk(id);
    if (!post) throw new Error("Post not found");
    return await post.destroy();
  }
}

import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Category } from 'category/entities/category.entity';
import { Tag } from 'tag/entities/tag.entity';
import { ResPostDto } from './dto/res-post.dto';
import { ResPageDto } from 'configure/db/res-page.dto';

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

    if (createPostDto.tagIds) {
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
      createdBy: 1,
      updatedBy: 1
    });

    if (createPostDto.tagIds) 
    await result.$set("tags", createPostDto.tags, {
      through: {
        selfGranted: true
      }
    });

    await result.save();

    return await ResPostDto.fromPost(result);

  }
  async findAll(pageable: ReqPageableDto) {
    if(!pageable)
      pageable = new ReqPageableDto();
    console.log(ReqPageableDto.toPageable(pageable));
    
    const result =  await this.postRepo.findAndCountAll({
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

    const resPage: ResPageDto<ResPostDto> = new ResPageDto();
    resPage.content = await Promise.all(result.rows.map((post) => ResPostDto.fromPost(post)));
    resPage.totalElements = result.count;
    resPage.totalPages = Math.ceil(result.count / pageable.size);
    resPage.numberOfElements = result.rows.length;

    return resPage;
  }

  async findOne(id: number) {
    return await ResPostDto.fromPost(await this.postRepo.findByPk(id));
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.checkDto(updatePostDto);

    const post = await this.postRepo.findByPk(id);
    if (!post) throw new Error("Post not found");

    const result = await post.update({
      ...updatePostDto,
      updatedBy: 1
    });

    if (updatePostDto.tagIds) 
    await result.$set("tags", updatePostDto.tags, {
      through: {
        selfGranted: true
         } });
    result.save();
    
    return await ResPostDto.fromPost(result);
   }

  async remove(id: number) {
    const post = await this.postRepo.findByPk(id);
    if (!post) throw new Error("Post not found");
    return await post.destroy();
  }
}

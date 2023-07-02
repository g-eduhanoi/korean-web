import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Category } from 'category/entities/category.entity';
import { Tag } from 'tag/entities/tag.entity';
import { ResPostDto } from './dto/res-post.dto';
import { ResPageDto } from 'configure/db/res-page.dto';
import { PostFilterReqDto } from './dto/post-filter-req.dto';
import { Op } from 'sequelize';
import removeVietnameseTones from 'configure/utils/AsciiConverter';

@Injectable()
export class PostService {
  async findRelatedPost(categoryId: number, postId: number) {
    return await this.postRepo.findAll({
      where: {
        categoryId: {
          [Op.eq]: categoryId
        },
        id: {
          [Op.ne]: postId
        }
      },
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
    })
  }
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
    createPostDto.slug = removeVietnameseTones(createPostDto.title);
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

  async filter(reqDto: PostFilterReqDto, pageable: ReqPageableDto) {
    if (!pageable)
      pageable = new ReqPageableDto();


    let whereBuilder: {
      categoryId?: object
    } = {};
    if (reqDto != null && reqDto.categoryId)
      whereBuilder.categoryId = {
        [Op.eq]: reqDto.categoryId
      }


    const result = await this.postRepo.findAndCountAll({
      ...ReqPageableDto.toPageable(pageable),
      where: whereBuilder,
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
    resPage.number = pageable.page;
    resPage.isFirst = pageable.page == 0;
    resPage.isLast = pageable.page == resPage.totalPages - 1;

    return resPage;
  }

  async findAll(pageable: ReqPageableDto) {
    if (!pageable)
      pageable = new ReqPageableDto();

    console.log("pageable: ", typeof pageable);

    console.log(ReqPageableDto.toPageable(pageable));

    const result = await this.postRepo.findAndCountAll({
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
    resPage.number = pageable.page;
    return resPage;
  }

  async findOne(id: number) {
    const post = await this.postRepo.findByPk(id);
    const res =  await ResPostDto.fromPost(post);

    res.content = post.content;
    return res;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.checkDto(updatePostDto);
    updatePostDto.slug = removeVietnameseTones(updatePostDto.title);
    console.log("slug->>>", updatePostDto.slug);

    const post = await this.postRepo.findByPk(id);
    if (!post) throw new Error("Post not found");

    // const result = await this.postRepo.update({
    //   ...updatePostDto,
    //   updatedBy: 1
    // }, {
    //   where: {
    //     id: {
    //       [Op.eq]: id
    //     }
    //   }
    // });
    const result = await post.update({
      ...updatePostDto,
      updatedBy: 1
    });

    if (updatePostDto.tagIds)
      await result.$set("tags", updatePostDto.tags, {
        through: {
          selfGranted: true
        }
      });
    result.save();

    return await ResPostDto.fromPost(result);
  }

  async remove(id: number) {
    const post = await this.postRepo.findByPk(id);
    if (!post) throw new Error("Post not found");
    return await post.destroy();
  }
}

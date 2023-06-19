import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import { ResPageDto } from 'configure/db/res-page.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject("CATEGORY_REPO") private readonly categoryRepo: typeof Category,
  ) { }

  async init() {
    const category = await this.categoryRepo.findByPk(1);
    if (!category) {
      await this.categoryRepo.create({
        id: 1,
        name: "Default",
        slug: "default",
      });
    }


    await this.categoryRepo.findOrCreate({
      where: {
        id: 2,
      },
      defaults: {
        id: 2,
        name: "Chuyên ngành học",
        slug: "major",
      }
    });

    await this.categoryRepo.findOrCreate({
      where: {
        id: 3,
      },
      defaults: {
        id: 3,
        name: "Thông tin học bổng",
        slug: "scholarship-news",
      }
    });

    await this.categoryRepo.findOrCreate({
      where: {
        id: 4,
      },
      defaults: {
        id: 4,
        name: "Hiểu về Hàn Quốc",
        slug: "about-korea",
      }
    });

    await this.categoryRepo.findOrCreate({
      where: {
        id: 5,
      },
      defaults: {
        id: 5,
        name: "Cộng đồng",
        slug: "community",
      }
    });

    await this.categoryRepo.findOrCreate({
      where: {
        id: 6,
      },
      defaults: {
        id: 6,
        name: "Sơ-Trung-Cao cấp",
        slug: "normal-courses",
      }
    });

    await this.categoryRepo.findOrCreate({
      where: {
        id: 7,
      },
      defaults: {
        id: 7,
        name: "TOPIK",
        slug: "topik-course",
      }
    });

    await this.categoryRepo.findOrCreate({
      where: {
        id: 8,
      },
      defaults: {
        id: 8,
        name: "OPIC",
        slug: "opic-course",
      }
    });

    await this.categoryRepo.findOrCreate({
      where: {
        id: 9,
      },
      defaults: {
        id: 9,
        name: "Khách mời - Thuyết giảng",
        slug: "event",
      }
    });

    await this.categoryRepo.findOrCreate({
      where: {
        id: 10,
      },
      defaults: {
        id: 10,
        name: "Cố vấn học tập",
        slug: "mentor",
      }
    });

    await this.categoryRepo.findOrCreate({
      where: {
        id: 11,
      },
      defaults: {
        id: 11,
        name: "Workshop",
        slug: "workshop",
      }
    });

  }
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepo.create({
      ...createCategoryDto,
      slug: createCategoryDto.name,
    });
  }

  async findAll(pageable: ReqPageableDto) {
    if (!pageable)
      pageable = new ReqPageableDto();
    console.log(ReqPageableDto.toPageable(pageable));

    const result = await this.categoryRepo.findAndCountAll({
      ...ReqPageableDto.toPageable(pageable)
    });

    const resPage: ResPageDto<Category> = new ResPageDto();
    resPage.content = result.rows;
    resPage.totalElements = result.count;
    resPage.totalPages = Math.ceil(result.count / pageable.size);
    resPage.numberOfElements = result.rows.length;

    return resPage;
  }

  async findOne(id: number) {
    return await this.categoryRepo.findByPk(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return await category.update({
      ...updateCategoryDto,
      slug: updateCategoryDto.name,
    });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return await category.destroy();
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import { ResPageDto } from 'configure/db/res-page.dto';

@Injectable()
export class TagService {
  constructor(
    @Inject("TAG_REPO") private readonly tagRepo: typeof Tag
  ) { }

  async create(createTagDto: CreateTagDto) {
    return await this.tagRepo.create({
      ...createTagDto,
      slug: createTagDto.name.toLowerCase().replace(/ /g, "-"),
    });
  }

  async findAll(pageable: ReqPageableDto) {
    if (!pageable)
      pageable = new ReqPageableDto();
    console.log(ReqPageableDto.toPageable(pageable));

    const result = await this.tagRepo.findAndCountAll({
      ...ReqPageableDto.toPageable(pageable)
    });

    const resPage: ResPageDto<Tag> = new ResPageDto();
    resPage.content = result.rows;
    resPage.totalElements = result.count;
    resPage.totalPages = Math.ceil(result.count / pageable.size);
    resPage.numberOfElements = result.rows.length;

    return resPage;
  }

  async findOne(id: number) {
    const tag = await this.tagRepo.findByPk(id);
    if (!tag) {
      throw new Error("Tag not found");
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id);
    await tag.update(updateTagDto);
    return tag;
  }

  async remove(id: number) {
    const tag = await this.findOne(id);
    await tag.destroy();
  }
}

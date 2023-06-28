import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import { ResPageDto } from 'configure/db/res-page.dto';
import { Op } from 'sequelize';

@Injectable()
export class TagService {
  
  constructor(
    @Inject("TAG_REPO") private readonly tagRepo: typeof Tag
  ) { }

  async create(createTagDto: CreateTagDto) {

    const checkTag = await this.tagRepo.findOne({
      where: {
        name: createTagDto.name
      }
    });
    if(checkTag)
      throw new Error("Tag already exists");

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

  async search(keyword: string) {
    return await this.tagRepo.findAll({
      where: {
        name: {
          [Op.like]: `%${keyword}%`
        }
      },
      limit: 10
    });
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import {Class, ClassRegistration, RegistrationTag} from './entities/class.entity';
import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import { ClassFilterReqDto } from './dto/class-filter.dto';
import { Op } from 'sequelize';
import { ResPageDto } from 'configure/db/res-page.dto';
import { ClassResDto } from './dto/class-res.dto';
import { RegisClassReq } from './dto/regis-class-req.dto';
import {TagClassDto} from "./dto/TagClass.dto";
import {ContactTag} from "../contact/entities/contact.entity";
import {TagCreateDto} from "./dto/TagCreate.dto";
import {RegisClassResDto} from "./dto/regis-class-res.dto";
import {ContactResDto} from "../contact/dto/contact-res.dto";

@Injectable()
export class ClassService {
  

  constructor(
    @Inject("CLASS_REPO") private readonly classRepo: typeof Class,
    @Inject("CLASS_REGIS_REPO") private readonly classRegisRepo: typeof ClassRegistration,
    @Inject("REGIS_TAG_REPO") private readonly regisTagRepo: typeof RegistrationTag,
  ) { }


  async create(createClassDto: CreateClassDto) {
    const rs = await this.classRepo.create({
      ...createClassDto
    });

    return rs;
  }

  async findAll(reqDto: ClassFilterReqDto, pageable: ReqPageableDto) {
    if (!pageable)
      pageable = new ReqPageableDto();

    let whereBuilder: {
      categoryId?: object,
      name?: object
    } = {};
    if (reqDto != null && reqDto.categoryId)
      whereBuilder.categoryId = {
        [Op.eq]: reqDto.categoryId
      }

    if (reqDto != null && reqDto.q)
      whereBuilder.name = {
        [Op.like]: `%${reqDto.q}%`
      }

    const result = await this.classRepo.findAndCountAll({
      ...ReqPageableDto.toPageable(pageable),
      where: whereBuilder,
    });


    const resPage: ResPageDto<ClassResDto> = new ResPageDto();
    resPage.content = result.rows;
    resPage.totalElements = result.count;
    resPage.totalPages = Math.ceil(result.count / pageable.size);
    resPage.numberOfElements = result.rows.length;
    resPage.number = pageable.page;
    resPage.isFirst = pageable.page == 0;
    resPage.isLast = pageable.page == resPage.totalPages - 1;

    return resPage;

  }

  async findOne(id: number) {
    return await this.classRepo.findByPk(id);
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    const origin = await this.findOne(id);
    origin.update({
      ...updateClassDto
    });

    await origin.save();
    return origin;
  }

  remove(id: number) {
    this.classRepo.destroy({
      where: {id: id}
    }).then(r => {
        console.log("remove result: ", r)
    })
    return `This action removes a #${id} class`;
  }

  async registerClass(classRegisDto: RegisClassReq) {
    // const classEntity: Class = await this.classRepo.findByPk(classRegisDto.classId);
    // if (!classEntity)
    //   throw "Class doesn't exist!";

    await this.classRegisRepo.create({
      ...classRegisDto,
      status: "PENDING"
    });
    // task: send mail to admin

    return true;
  }

  async findAllRegisClass(reqDto: { q: string; status?: "PENDING" | "COMPLETED"; }, pageable: ReqPageableDto) {
    if (!pageable)
      pageable = new ReqPageableDto();

    let whereBuilder: {
      status?: object,
    } = {};

    if (reqDto != null && reqDto.q) {
      whereBuilder = {
        // @ts-ignore
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${reqDto.q}%`
            }
          },
          {
            phone: {
              [Op.like]: `%${reqDto.q}%`
            }
          },
          {
            email: {
              [Op.like]: `%${reqDto.q}%`
            }
          }
        ]
      }
    }
    if (reqDto != null && reqDto.status)
      whereBuilder.status = {
        [Op.eq]: reqDto.status
      }

    const result = await this.classRegisRepo.findAndCountAll({
      ...ReqPageableDto.toPageable(pageable),
      where: whereBuilder,
      include: [
        {
          model: Class,
          as: "class"
        }
      ]
    });

    const resPage: ResPageDto<RegisClassResDto> = new ResPageDto();
    const regisClassResDtos = new Array<RegisClassResDto>()
    for (const x of result.rows) {
      const resultTag = await this.regisTagRepo.findAndCountAll({
        where: { classRegistrationId: x.id }
      })
      const tags : string[] = resultTag.rows.map(x => x.name);
      regisClassResDtos.push(RegisClassResDto.toDto(x,tags));
    }

    resPage.content = regisClassResDtos;
    resPage.totalElements = result.count;
    resPage.totalPages = Math.ceil(result.count / pageable.size);
    resPage.numberOfElements = result.rows.length;
    resPage.number = pageable.page;
    resPage.isFirst = pageable.page == 0;
    resPage.isLast = pageable.page == resPage.totalPages - 1;

    return resPage;
  }

  async markRegistrationCompleted(id: number) {
    const regis = await this.classRegisRepo.findByPk(id);
    if(!regis)
      throw 'regis class not found!'

    regis.update({
      status: 'COMPLETED'
    });

    await regis.save();
  }


  async updateTag(id: number, tagClassDto: TagClassDto) {
    const regis = await this.classRegisRepo.findByPk(id);
    if(!regis)
      throw 'regis class not found!'
    this.regisTagRepo.destroy({
      where: {classRegistrationId : id }
    })
    const tags = new Array<string>();
    for (const x of tagClassDto?.tags) {
      const tag :RegistrationTag = await this.regisTagRepo.create(
          {
            name: x,
            classRegistrationId: id,
          },
      )
      tags.push(tag.name);
    }

    return RegisClassResDto.toDto(regis,tags);
  }
}

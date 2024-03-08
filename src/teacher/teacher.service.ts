import {Inject, Injectable} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import {Contact, ContactTag} from "../contact/entities/contact.entity";
import {Teacher} from "./entities/teacher.entity";
import {ReqPageableDto} from "../configure/db/req-pageable.dto";
import {Op} from "sequelize";
import {ContactResDto} from "../contact/dto/contact-res.dto";
import {ResPageDto} from "../configure/db/res-page.dto";
import {ReqDto} from "./dto/reqDto";

@Injectable()
export class TeacherService {
  constructor(
      @Inject("TEACHER_REPO") private readonly teacherRepo: typeof Teacher,
  ) { }
  async create(createTeacherDto: CreateTeacherDto) {
    const result: CreateTeacherDto = await this.teacherRepo.create({
      ...createTeacherDto,
    })
    return result?.id;
  }

  async findAll(pageable: ReqPageableDto, reqDto: ReqDto) {
    if (!pageable)
      pageable = new ReqPageableDto();
    pageable.page -= 1;
    let whereBuilder: {
      [Op.like]?: object,
    } = {};

    if (reqDto != null && reqDto.textSearch)
      whereBuilder[Op.or] = [
        {fullName: {[Op.like]: `%${reqDto.textSearch}%`}},
        {email: {[Op.like]: `%${reqDto.textSearch}%`}},
        {phone: {[Op.like]: `%${reqDto.textSearch}%`}},
        {fullName: {[Op.like]: `%${reqDto.textSearch}%`}},
      ];
    const result = await this.teacherRepo.findAndCountAll({
      ...ReqPageableDto.toPageable(pageable),
      where: whereBuilder
    });

    const resPage: ResPageDto<CreateTeacherDto> = new ResPageDto();
    resPage.content = result.rows;
    resPage.totalElements = result.count;
    resPage.totalPages = Math.ceil(result.count / pageable.size);
    resPage.numberOfElements = result.rows.length;

    return resPage;
  }

  async findOne(id: number) {
    const teacher :CreateTeacherDto = await this.teacherRepo.findByPk(id);
    if (!teacher) {
      throw new Error(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.findOne(id);
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    await this.teacherRepo.update({ ...updateTeacherDto }, {
      where: {
        id: id,
      },
    })
    return id;
  }

  async remove(id: number) {
    const teacher = await this.teacherRepo.findByPk(id);
    if (!teacher) {
      throw new Error(`Teacher with ID ${id} not found`);
    }
    return await teacher.destroy();
  }
}

import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateFileDto} from "../file/dto/create-file.dto";
import {ReqPageableDto} from "../configure/db/req-pageable.dto";
import {contactFilterReqDto} from "../category/dto/contactFilterReqDto";



@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Post("findAll")
  findAll(
      // @Body("pageable") pageable: ReqPageableDto,@Body("filter") reqDto: contactFilterReqDto
      @Body() {pageable, reqDto}: {
        pageable: ReqPageableDto,
        reqDto: contactFilterReqDto
      }
  ) {
    return this.teacherService.findAll(pageable, reqDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}

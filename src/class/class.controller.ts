import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import { filter } from 'rxjs';
import { ClassFilterReqDto } from './dto/class-filter.dto';
import { RegisClassReq } from './dto/regis-class-req.dto';

@ApiTags('Class')
@Controller('api/classes')
export class ClassController {
  constructor(private readonly classService: ClassService) { }

  @Post("add")
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Post("findAll")
  findAll(@Body("pageable") pageable: ReqPageableDto, @Body("filter") reqDto: ClassFilterReqDto) {
    return this.classService.findAll(reqDto, pageable);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }

  @Post("regis-class")
  regisClass(@Body() reqDto: RegisClassReq) {
    return this.classService.registerClass(reqDto);
  }

  @Post("regis-class/findAll")
  findAllRegisClass(@Body("pageable") pageable: ReqPageableDto, @Body("filter") reqDto: {
    q: string,
    status: "PENDING" | "COMPLETED"
  }) {
    return this.classService.findAllRegisClass(reqDto, pageable);
  }
}

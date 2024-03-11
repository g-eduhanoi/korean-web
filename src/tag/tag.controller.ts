import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Post("findAll")
  findAll(@Body() pageable: ReqPageableDto) {
    return this.tagService.findAll(pageable);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tagService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }

  @Get("search")
  async search(@Query('keyword') keyword: string) {
    console.log("keyword: ", keyword);
    if(!keyword)
      keyword = "";
    return this.tagService.search(keyword);
  }
}

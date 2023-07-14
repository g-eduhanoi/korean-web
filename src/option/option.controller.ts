import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('option')
@Controller('api/options')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post("save")
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.save(createOptionDto);
  }

  @Get('optionKey/:key')
  getOptionByKey(@Param('key') optionKey: string) {
    return this.optionService.getOptionByKey(optionKey);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionService.remove(+id);
  }
}

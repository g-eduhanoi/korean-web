import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import {diskStorage} from 'multer';
import { ReqPageableDto } from 'configure/db/req-pageable.dto';


const ASSET_DIR = './assets/public/uploads/';
const multerStorage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, ASSET_DIR)
  },
  filename: function (req, file: any, cb) {
    // need create date folder berfore insert
    // const currentDate = new Date();
    // console.log(currentDate.getFullYear() + '/' + currentDate.getMonth()+1);
    const uniqueSuffix = Date.now() + '_' + file.originalname;
    file.urlLink = 'http://localhost:3000/uploads/' + uniqueSuffix;
    cb(null, uniqueSuffix)
  }
});

@ApiTags('File')
@Controller('api/files')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: multerStorage }))
  uploadFile(@UploadedFile() fileDto: CreateFileDto) {
    return this.fileService.create(fileDto);
  }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Post("findAll")
  findAll(pageable: ReqPageableDto) {

    //   {
    //     content: fileData.rows,
    //     totalElements: fileData.count,
    //     totalPages: Math.ceil(fileData.count / size),
    //     numberOfElements: fileData.rows.length,
    //  }
    return this.fileService.findAll(pageable);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }


}

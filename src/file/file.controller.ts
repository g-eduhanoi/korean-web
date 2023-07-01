import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import * as fs from 'fs';

const ASSET_DIR = process.cwd() + '/assets/public/uploads/';
if(!fs.existsSync(ASSET_DIR))
  fs.mkdirSync(ASSET_DIR);

const multerStorage = diskStorage({
  destination: function (req, file, cb) {
    // need create date folder berfore insert
    const currentDate = new Date();
    console.log(currentDate.getFullYear() + '/' + (Number(currentDate.getMonth()) + 1));
    const monthlyDir = currentDate.getFullYear() + '/' + (Number(currentDate.getMonth()) + 1);
    if(!fs.existsSync(ASSET_DIR + currentDate.getFullYear()))
      fs.mkdirSync(ASSET_DIR + currentDate.getFullYear());
    if (!fs.existsSync(ASSET_DIR + monthlyDir)) {
      fs.mkdirSync(ASSET_DIR + monthlyDir);
    }

    cb(null, ASSET_DIR + monthlyDir)
  },
  filename: function (req, file: any, cb) {

    const uniqueSuffix = Date.now() + '_' + file.originalname;
    file.urlLink = "http://localhost:3000" + '/uploads/' + uniqueSuffix;
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

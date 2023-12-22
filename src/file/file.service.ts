import { Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';
import { ReqPageableDto } from 'configure/db/req-pageable.dto';
import { ResPageDto } from 'configure/db/res-page.dto';
import { FileFilterReqDto } from './dto/file-filter-req.dto';
import {Op} from 'sequelize';

@Injectable()
export class FileService {
  constructor(@Inject("FILE_REPO") private readonly fileRepo: typeof FileEntity) { }


  async createForGallery(createFileDto: CreateFileDto) {
    const fileData = await this.fileRepo.create({
      title: createFileDto.originalname,
      alt: createFileDto.originalname,
      originalname: createFileDto.originalname,
      fileName: createFileDto.filename,
      fileType: createFileDto.mimetype,
      serverPath: createFileDto.path,
      web_url: createFileDto.urlLink,
      fileCode: "GALLERY",
      category: "NORMAL",
    });
    return fileData;
  }

  async create(createFileDto: CreateFileDto) {
    const fileData = await this.fileRepo.create({
      title: createFileDto.originalname,
      alt: createFileDto.originalname,
      originalname: createFileDto.originalname,
      fileName: createFileDto.filename,
      fileType: createFileDto.mimetype,
      serverPath: createFileDto.path,
      web_url: createFileDto.urlLink,
      fileCode: "NORMAL",
      category: "NORMAL",
    });
    return fileData;
  }

  async findAll(reqDto: FileFilterReqDto, pageable: ReqPageableDto) {
    
    if (!pageable)
      pageable = new ReqPageableDto();
    console.log(ReqPageableDto.toPageable(pageable));

    const whereBuilder: any = {};

    if(reqDto.category) {
      whereBuilder.category = {
        [Op.eq] : reqDto.category
      }
    }
    if(reqDto.fileCode) {
      whereBuilder.fileCode = {
        [Op.eq] : reqDto.fileCode
      }
    }

    const result = await this.fileRepo.findAndCountAll({
      ...ReqPageableDto.toPageable(pageable),
      where: whereBuilder
    });

    const resPage: ResPageDto<FileEntity> = new ResPageDto();
    resPage.content = result.rows;
    resPage.totalElements = result.count;
    resPage.totalPages = Math.ceil(result.count / pageable.size);
    resPage.numberOfElements = result.rows.length;

    return resPage;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}

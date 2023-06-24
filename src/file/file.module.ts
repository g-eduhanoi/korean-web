import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepo } from './entities/file.entity';

@Module({
  controllers: [FileController],
  providers: [FileService, FileRepo]
})
export class FileModule {}

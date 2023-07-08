import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { ClassRepos } from './entities/class.entity';

@Module({
  controllers: [ClassController],
  providers: [ClassService, ...ClassRepos]
})
export class ClassModule {}

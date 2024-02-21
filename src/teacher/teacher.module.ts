import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepos } from './entities/teacher.entity';
@Module({
  controllers: [TeacherController],
  providers: [TeacherService,...TeacherRepos]
})
export class TeacherModule {}

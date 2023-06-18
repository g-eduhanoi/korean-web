import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepo } from './entities/tag.entity';

@Module({
  controllers: [TagController],
  providers: [TagService, TagRepo]
})
export class TagModule {}

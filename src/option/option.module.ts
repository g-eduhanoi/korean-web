import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { OptionRepo } from './entities/option.entity';

@Module({
  controllers: [OptionController],
  providers: [OptionService, OptionRepo]
})
export class OptionModule {}

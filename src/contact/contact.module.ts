import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactRepo } from './entities/contact.entity';
@Module({
  controllers: [ContactController],
  providers: [ContactService,ContactRepo]
})
export class ContactModule {}

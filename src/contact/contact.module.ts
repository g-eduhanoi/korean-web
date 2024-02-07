import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactRepos } from './entities/contact.entity';
@Module({
  controllers: [ContactController],
  providers: [ContactService,...ContactRepos]
})
export class ContactModule {}

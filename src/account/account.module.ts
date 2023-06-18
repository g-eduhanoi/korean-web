import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountProviders } from './entities/account.providers';

@Module({
  controllers: [AccountController],
  providers: [AccountService, ...AccountProviders]
})
export class AccountModule { }

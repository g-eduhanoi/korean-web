import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account } from './entities/account.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountProviders } from './entities/account.providers';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  exports: [SequelizeModule],
  controllers: [AccountController],
  providers: [AccountService, ...AccountProviders]
})
export class AccountModule { }

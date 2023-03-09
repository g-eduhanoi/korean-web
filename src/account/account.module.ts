import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account } from './entities/account.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  exports: [SequelizeModule],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule { }

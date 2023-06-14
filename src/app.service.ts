import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Account } from './account/entities/account.entity';
import {hashSync} from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private readonly sequelize: Sequelize) {}
  getHello(): string {
    return 'Hello World!';
  }

  async onApplicationBootstrap(signal: string) {
    console.log('signal: ', signal); // e.g. "SIGINT"
    await this.sequelize.sync({ force: true });
    
    const accountRepo: typeof Account = this.sequelize.getRepository(Account);

    if (await accountRepo.findOne({ where: { username: 'admin' } })) {
      return;
    }
    await accountRepo.create({
      username: 'admin',
      password: await hashSync('admin1234', 10),
      email: 'admin@admin.com',
      fullname: 'Administrator',
      isActive: true,
      isApproved: true,
    });
  }
}

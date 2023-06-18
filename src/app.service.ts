import { Inject, Injectable } from '@nestjs/common';
import { Account } from './account/entities/account.entity';
import { hashSync } from 'bcrypt';
import { Category } from 'category/entities/category.entity';
import { Tag } from 'tag/entities/tag.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject("ACCOUNT_REPO") private readonly accountRepo: typeof Account,
    @Inject("CATEGORY_REPO") private readonly categoryRepo: typeof Category,
    @Inject("TAG_REPO") private readonly tagRepo: typeof Tag) { }
  getHello(): string {
    return 'Hello World!';
  }

  async onApplicationBootstrap(signal: string) {
    console.log('signal: ', signal); // e.g. "SIGINT"

    if (await this.accountRepo.findOne({ where: { username: 'admin' } })) {
      return;
    }
    await this.accountRepo.create({
      username: 'admin',
      password: await hashSync('admin1234', 10),
      email: 'admin@admin.com',
      fullname: 'Administrator',
      isActive: true,
      isApproved: true,
    });

    const category = await this.categoryRepo.findByPk(1);
    if (!category) {
      await this.categoryRepo.create({
        id: 1,
        name: "Default",
        slug: "default",
      });
    }

    const tag = await this.tagRepo.findByPk(1);
    if (!tag) {
      await this.tagRepo.create({
        name: "Default",
        slug: "default",
      });
    }
  }
}

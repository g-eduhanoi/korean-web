import { Inject, Injectable } from '@nestjs/common';
import { Account } from './account/entities/account.entity';
import { hashSync } from 'bcrypt';
import { Category } from 'category/entities/category.entity';
import { Tag } from 'tag/entities/tag.entity';
import { CategoryService } from 'category/category.service';

@Injectable()
export class AppService {
  constructor(
    @Inject("ACCOUNT_REPO") private readonly accountRepo: typeof Account,
    @Inject("CATEGORY_REPO") private readonly categoryRepo: typeof Category,
    @Inject("TAG_REPO") private readonly tagRepo: typeof Tag,
    private readonly categoryService: CategoryService
    ) { }
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

    await this.categoryService.init();

    const tag = await this.tagRepo.findByPk(1);
    if (!tag) {
      await this.tagRepo.create({
        name: "Default",
        slug: "default",
      });
    }
  }
}

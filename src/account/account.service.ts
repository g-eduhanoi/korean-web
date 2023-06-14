import {
  BadRequestException,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { LoginInput } from './input/login.input';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account) private accountModel: typeof Account) {
    console.log('AccountService constructor');

    // const adminUser = this.accountModel
    //   .findOne({
    //     where: { username: 'admin' },
    //   })
    //   .then((user) => {
    //     console.log('user: ', user);
    //     if (!user) {
    //       this.accountModel.create({
    //         username: 'admin',
    //         password: 'admin',
    //         email: 'admin@admin.com',
    //         fullname: 'Administrator',
    //         isActive: true,
    //         isApproved: true,
    //       });
    //       }
    //   })
    //   .catch((error) => {
    //     console.log('error: ', error);
    //     throw new PreconditionFailedException('Something bad happened', {
    //       cause: new Error(),
    //       description: 'Some error description',
    //     });
    //   });

  }

  async login(input: LoginInput): Promise<boolean> {
    const user: Account = await this.accountModel.findOne({
      where: {
        [Op.or]: [{ email: input.username }, { username: input.username }],
      },
    });

    if (!user)
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });

    if (user.password !== input.password)
      throw new Error('Password is incorrect');

    return true;
  }

  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}

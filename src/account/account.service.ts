import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { LoginInput } from './input/login.input';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(@Inject("ACCOUNT_REPO") private readonly accountRepo: typeof Account) {
    console.log('AccountService constructor');
  }

 

  async login(input: LoginInput): Promise<boolean> {
    // const user: Account = await this.accountRepo.findOne({
    //   where: {
    //     [Op.or]: [{ email: input.username }, { username: input.username }],
    //   },
    // });

    // if (!user)
    //   throw new BadRequestException('Something bad happened', {
    //     cause: new Error(),
    //     description: 'Some error description',
    //   });

    // if (user.password !== input.password)
    //   throw new Error('Password is incorrect');

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

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable, UnauthorizedException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { LoginInput } from './input/login.input';
import { Account } from './entities/account.entity';
import {ReqPageableDto} from "../configure/db/req-pageable.dto";
import {PostFilterReqDto} from "../post/dto/post-filter-req.dto";
import {ResPageDto} from "../configure/db/res-page.dto";
import {Op} from "sequelize";
import {FilterUserDto} from "./dto/filter-user.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
@Injectable()
export class AccountService {
  constructor(
      @Inject("ACCOUNT_REPO") private readonly accountRepo: typeof Account,
        private readonly jwtService: JwtService,
  ) {
    console.log('AccountService constructor');
  }

  async login(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.accountRepo.findOne({where: {username: username}});
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async checkExitsUsername(username: String) {
    if (username) {
     let user = await this.accountRepo.findOne({
        where: {
          username: username
        }
      });
      if (user)
      throw new HttpException({ message: 'Username already exists' }, 503);
    }
  }
  async checkExitsEmail(email: String) {
    if (email) {
      let user = await this.accountRepo.findOne({
        where: {
          email: email
        }
      });
      if (user)
        throw new HttpException({ message: 'Email already exists' }, 502);
    }
  }

  async checkExitsPhone(phone: String) {
    if(phone){
      let user = await this.accountRepo.findOne({
        where: {
          phone: phone
        }
      });
      if (user)
        throw new HttpException({ message: 'Phone already exists' }, 501);
    }
  }
  async create(createAccountDto: CreateAccountDto) {
    await this.checkExitsEmail(createAccountDto.email);
    await this.checkExitsUsername(createAccountDto.username);
    await this.checkExitsPhone(createAccountDto.phone);
    createAccountDto.role= "EMP";
    createAccountDto.password = await bcrypt.hash(createAccountDto.password, saltOrRounds);
    const rs = await this.accountRepo.create({
      ...createAccountDto
    });
    rs.password="";
    return rs;
  }

  async findAll(reqDto: FilterUserDto, pageable: ReqPageableDto) {
    if (!pageable) {
      pageable = new ReqPageableDto();
    }
    pageable.page -= 1;

    let whereBuilder: { [Op.like]?: object } = {};

    const textSearch = reqDto.q || "";
    if (textSearch) {
      const likeSearch = {[Op.like]: `%${textSearch}%`};
      whereBuilder[Op.or] = [
        {fullName: likeSearch},
        {email: likeSearch},
        {phone: likeSearch},
        {username: likeSearch},
      ];
    }
    whereBuilder[Op.and] = {role: "EMP"};
    const result = await this.accountRepo.findAndCountAll({
      ...ReqPageableDto.toPageable(pageable),
      where: whereBuilder,
    });
    let content = result.rows.map((it) => {
        it.password = "********";
        return it;
    });
    const resPage = new ResPageDto<CreateAccountDto>();
    resPage.content = content;
    resPage.totalElements = result.count;
    resPage.totalPages = Math.ceil(result.count / pageable.size);
    resPage.numberOfElements = result.rows.length;
    return resPage;
  }

  async findOne(id: number) {
    return await this.accountRepo.findByPk(id);
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const origin = await this.findOne(id);
    if (!origin)
      throw new Error("Account not found");
    if (updateAccountDto.username.indexOf(origin.username) == -1) {
      await this.checkExitsUsername(updateAccountDto.username);
    }
    if (updateAccountDto.email.indexOf(origin.email) == -1) {
      await this.checkExitsEmail(updateAccountDto.email);
    }
    if (updateAccountDto.phone.indexOf(origin.phone) == -1) {
      await this.checkExitsPhone(updateAccountDto.phone);
    }
    updateAccountDto.role= "EMP";
    if (updateAccountDto.password!=null && updateAccountDto.password != "********") {
        updateAccountDto.password = await bcrypt.hash(updateAccountDto.password, saltOrRounds);
      await origin.update({
        ...updateAccountDto
      });
    }else{
        await origin.update({
          username: updateAccountDto.username,
          email: updateAccountDto.email,
          fullName: updateAccountDto.fullName,
          role: updateAccountDto.role,
          phone: updateAccountDto.phone
        });
    }
    await origin.save();
    return origin;
  }

  async remove(id: number) {
    const account = await this.accountRepo.findByPk(id);
    if (!account) {
      throw new Error(`account with ID ${id} not found`);
    }
    return await account.destroy();
  }
}

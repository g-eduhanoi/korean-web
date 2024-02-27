import {Controller, Get, Post, Body, Patch, Param, Delete, Put} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiTags } from '@nestjs/swagger';
import {ReqPageableDto} from "../configure/db/req-pageable.dto";
import {FilterUserDto} from "./dto/filter-user.dto";
import {Role} from "../role/enum/role.enum";
import {Roles} from "../configure/security/roles.decorator";

@ApiTags('Account')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Roles(Role.Admin)
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Post("findAll")
  findAll(@Body("pageable") pageable: ReqPageableDto, @Body("filter") reqDto: FilterUserDto) {
    return this.accountService.findAll(reqDto, pageable);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}

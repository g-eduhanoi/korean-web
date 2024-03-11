import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
  Req, ExecutionContext
} from '@nestjs/common';
import { AccountService } from './account.service';

import { ApiTags } from '@nestjs/swagger';
import {AuthGuard, Public} from "../auth/auth.guard";
import {LoginDto} from "./dto/login.dto";
import {RolesGuard} from "../configure/security/roles.guard";
import {Roles} from "../configure/security/roles.decorator";
import {Role} from "../role/enum/role.enum";

@ApiTags('Auth')
@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly accountService: AccountService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public signIn(@Body() loginDto:  LoginDto) {
    return this.accountService.login(loginDto.username, loginDto.password);
  }


  @UseGuards(AuthGuard)
  @Roles(Role.Employee)
  @Get('profile')
  getProfile(@Request() req) {
    try {
      // Ensure req.user is available and contains the expected user data
      if (req.user) {
        return req.user;
      } else {
        throw new Error('User information not found in the request.');
      }
    } catch (error) {
      // Log or handle the error appropriately
      console.error(error.message);
      throw error;
    }
  }
}
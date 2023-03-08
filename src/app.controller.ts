import { All, Body, Controller, Get, Param, Post, Render, Req, Res, Session } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginInput } from './account/input/login.input';
import { AppService } from './app.service';
import { Roles } from './configure/security/roles.decorator';
import { Role } from './role/enum/role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello(@Req() req: Request, @Session() session: Record<string, any>): object {
    console.log('session homepage', req.session);
    // return this.appService.getHello();
    return {
      message: 'Hello World!',
    };
  }

  @Roles(Role.Admin)
  @Get('login')
  @Render('login')
  getLogin(@Session() session: Record<string, any>): object {
    session.logging = true;
    return {
      message: 'Login Page',
    };
  }

  @Post('login')
  postLogin(@Res() res: Response, @Body() input: LoginInput): void {
    console.log(input);
    res.send(JSON.stringify(input));
  }

  @All('error')
  errorPage(@Param() name: string, @Res() res: Response): void {
    res.render(`exception/${name}`);
  }
}

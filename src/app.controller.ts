import {
  All,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AccountService } from './account/account.service';
import { LoginInput } from './account/input/login.input';
import { AppService } from './app.service';
import { FileService } from 'file/file.service';
import { PostService } from 'post/post.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly accountService: AccountService,
    private readonly fileService: FileService,
    private readonly postService: PostService
  ) { }


  // for home-page
  @All()
  @Render('index')
  async getHomepage(
    @Req() req: Request,
    @Session() session: Record<string, any>,
  ): Promise<object> {
    
    const galleryImages = await this.fileService.findAll({
      fileCode: "GALLERY"
    }, {
      page: 0,
      size: 18
    });
    
    console.log(galleryImages);
    
    return {
      galleryImages: galleryImages.content
    };
  }

  @Get('contact')
  @Render('contact')
  getContactPage(): object {
    return {
      title: 'Liên hệ với chúng tôi',
    };
  }


  // @Roles(Role.Admin)
  @Get('login')
  @Render('login')
  getLogin(@Session() session: Record<string, any>): object {
    session.logging = true;
    return {
      message: 'Login Page',
    };
  }

  @Post('login')
  async postLogin(
    @Res() res: Response,
    @Body() input: LoginInput,
  ): Promise<void> {
    const result: boolean = await this.accountService.login(input);

    const loginResult: object = {
      result: await this.accountService.login(input),
      message: result ? 'Login Success' : 'Login Failed',
    };
    if (result) res.render('index', loginResult);
    else res.render('login', loginResult);
  }

  @All('error')
  errorPage(@Param() name: string, @Res() res: Response): void {
    res.render(`exception/${name}`);
  }

  @Render('posts/detail_post_page')
  @Get("bai-viet/:slug/:id")
  async getDetailPost(@Param('id') id: number){
    const post =  await this.postService.findOne(id)
    return {
      post,
      relatedPosts: await this.postService.findRelatedPost(post.category.id, id)
    }
  }
}

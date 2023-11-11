import {
  All,
  Body,
  Controller,
  Get,
  Headers,
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
import { ClassService } from 'class/class.service';
import { OptionService } from 'option/option.service';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import createLocaleRoute from 'configure/utils/I18nRoute';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly accountService: AccountService,
    private readonly fileService: FileService,
    private readonly postService: PostService,
    private readonly classService: ClassService,
    private readonly optionService: OptionService,
    private readonly i18n: I18nService
  ) { }


  // for home-page
  @All(['/', '/en', '/ko'])
  @Render('index')
  async getHomepage(
    @Req() req: Request,
    @Session() session: Record<string, any>,
    @I18n() i18n: I18nContext
  ): Promise<object> {
    console.log("lang: ", i18n.lang);
    console.log("tss", await i18n.translate('test.testmmm', {lang: i18n.lang}));


    const galleryImages = await this.fileService.findAll({
      fileCode: "GALLERY"
    }, {
      page: 0,
      size: 18
    });

    
    return {
      galleryImages: galleryImages.content
    };
  }

  @Get(['lien-he', ...createLocaleRoute('contact')])
  @Render('contact')
  async getContactPage() {
    let pageContent = await this.optionService.getOptionByKey(`page_contact`);
    const pageData = JSON.parse(pageContent.optionValue);
    let snsContent = await this.optionService.getOptionByKey(`page_sns`);
    const snsData = JSON.parse(snsContent.optionValue);
    return {
      title: 'Liên hệ với chúng tôi',
      pageData,
      snsData
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
  @Get(["bai-viet/:slug/:id", ...createLocaleRoute('post/:slug/:id')])
  async getDetailPost(@Param('id') id: number) {
    const post = await this.postService.findOne(id);
    const relatedPosts = await this.postService.findRelatedPost(post.category.id, id);

    console.log(relatedPosts.length);

    return {
      post,
      relatedPosts

    }
  }

  @Render('course/course_page')
  @Get(["khoa-hoc/:slug/:id", ...createLocaleRoute('course/:slug/:id')])
  async getKhoaHoc(@Param('id') id: number) {
    console.log(`course id: `, id);

    let pageContent = await this.optionService.getOptionByKey(`page_course-c${id}`);

    const pageData: {
      image: string,
      content: string
    } = pageContent ? JSON.parse(pageContent.optionValue) : {
      image: '',
      content: ''
    };

    let pageTitle: string = 'Khoá học sơ cấp';
    if (id == 2)
      pageTitle = 'Khoá học trung cấp';
    if (id == 3)
      pageTitle = 'Khoá học cao cấp';
    if (id == 4)
      pageTitle = 'Khoá học Topik';
    else if (id == 5)
      pageTitle = 'Khoá học đặc biệt'

    const classData = await this.classService.findAll({
      categoryId: id,
      q: undefined
    }, {
      page: 0,
      size: 9999
    });

    console.log('class data', classData.content);

    return {
      id,
      pageTitle,
      pageData,
      classData: classData.content
    };
  }
}

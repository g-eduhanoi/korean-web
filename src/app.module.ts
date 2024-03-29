import { FileRepo } from './file/entities/file.entity';
import { ExecutionContext, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { AccountModule } from './account/account.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RoleModule } from './role/role.module';
import { AuthorityModule } from './authority/authority.module';
import { RolesGuard } from './configure/security/roles.guard';
import {APP_FILTER, APP_GUARD} from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountService } from './account/account.service';
import { Account } from './account/entities/account.entity';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { DatabaseModule } from 'configure/db/database.providers';
import { PostService } from 'post/post.service';
import { AccountProviders } from 'account/entities/account.providers';
import { PostProviders } from 'post/entities/post.entity';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { CategoryRepo } from 'category/entities/category.entity';
import { TagRepo } from 'tag/entities/tag.entity';
import { CategoryService } from 'category/category.service';
import { WebViewsController } from './web-views/web-views.controller';
import { FileService } from 'file/file.service';
import { ClassModule } from './class/class.module';
import { ClassService } from 'class/class.service';
import { ClassRepos } from 'class/entities/class.entity';
import { OptionModule } from './option/option.module';
import { OptionService } from 'option/option.service';
import { OptionRepo } from 'option/entities/option.entity';
import { QueryResolver, AcceptLanguageResolver, I18nModule, I18nResolver, HeaderResolver } from 'nestjs-i18n';
import { Request } from 'express';
import { ConfigModule } from '@nestjs/config';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';
import {ContactService} from "./contact/contact.service";
import {ContactRepos, ContactTag} from "./contact/entities/contact.entity";
import {jwtConstants} from "./auth/constants";
import {JwtModule} from "@nestjs/jwt";
import {HttpExceptionFilter} from "./configure/httpException/HttpExceptionFilter";
import {AuthGuard} from "./auth/auth.guard";
import {AuthorityController} from "./authority/authority.controller";
import {AuthController} from "./account/auth.controller";
import { TeacherModule } from './teacher/teacher.module';
import {TeacherController} from "./teacher/teacher.controller";
import {TeacherRepos} from "./teacher/entities/teacher.entity";
import {TeacherService} from "./teacher/teacher.service";



class TestI18n implements I18nResolver {
  resolve(context: ExecutionContext): string | string[] | Promise<string | string[]> {
    const req: Request = context.switchToHttp().getRequest();
    // @ts-ignore
    let lang = '';
    if (req.baseUrl.startsWith('/en'))
      lang = 'en';
    else if (req.baseUrl.startsWith('/ko'))
      lang = 'ko';
    else lang = 'vi';

    req.headers['custom-lang'] = lang;
    req.headers['lang'] = lang;
    console.log(req.headers);
    console.log("base", req.baseUrl.startsWith('/ko'));
    
    return lang;
  }

}
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: process.cwd() + '/src/i18n/',
        watch: true,
      },
      resolvers: [
        TestI18n,

      ],
      viewEngine: 'hbs'
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600000000000000s' },
    }),
    DatabaseModule,
    FileModule,
    AccountModule,
    RoleModule,
    AuthorityModule,
    PostModule,
    CategoryModule,
    TagModule,
    ClassModule,
    OptionModule,
    ContactModule,
    TeacherModule,
  ],
  controllers: [AppController, PostController, WebViewsController, ContactController,AppController,AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
    AccountService,
    ...AccountProviders,
    PostService,
    ...PostProviders,
    CategoryService,
    CategoryRepo,
    TagRepo,
    FileService,
    FileRepo,
    ClassService,
    ...ClassRepos,
    OptionService,
    OptionRepo,
    ContactService,
    ...ContactRepos,
    ...TeacherRepos,
    TeacherService
  ],
})
export class AppModule { }

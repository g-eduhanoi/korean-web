import { FileRepo } from './file/entities/file.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { AccountModule } from './account/account.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RoleModule } from './role/role.module';
import { AuthorityModule } from './authority/authority.module';
import { RolesGuard } from './configure/security/roles.guard';
import { APP_GUARD } from '@nestjs/core';
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

@Module({
  imports: [
    DatabaseModule,
    FileModule,
    AccountModule,
    RoleModule,
    AuthorityModule,
    PostModule,
    CategoryModule,
    TagModule,
    
  ],
  controllers: [AppController, PostController],
  providers: [
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
    FileRepo
  ],
})
export class AppModule { }

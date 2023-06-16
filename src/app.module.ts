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

@Module({
  imports: [
    DatabaseModule,
    FileModule,
    AccountModule,
    RoleModule,
    AuthorityModule,
    PostModule,
  ],
  controllers: [AppController, PostController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
    AccountService,
  ],
})
export class AppModule { }

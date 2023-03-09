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

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'korean_web',
      password: '1234',
      database: 'korean_web',
      models: [Account],
      sync: { force: true },// not working
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    FileModule,
    AccountModule,
    RoleModule,
    AuthorityModule,
  ],
  controllers: [AppController],
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

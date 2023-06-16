import { Module } from '@nestjs/common';
import { Account } from 'account/entities/account.entity';
import { Sequelize } from 'sequelize-typescript';

const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'korean_web',
                password: '1234',
                database: 'korean_web',
            });
            sequelize.addModels([Account]);
            await sequelize.sync();
            return sequelize;
        },
    },
];


@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }
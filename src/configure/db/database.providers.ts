import { Module } from '@nestjs/common';
import { Account } from 'account/entities/account.entity';
import { Category } from 'category/entities/category.entity';
import { File } from 'file/entities/file.entity';
import { Post, PostTag,  } from 'post/entities/post.entity';
import { Sequelize } from 'sequelize-typescript';
import { Tag } from 'tag/entities/tag.entity';

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
            sequelize.addModels([
                Account, Post, Category, Tag, File,
                PostTag
            ]);
            await sequelize.sync({
                // force: true
            });
            return sequelize;
        },
    },
];


@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }
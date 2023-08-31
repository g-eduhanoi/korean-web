import { Module } from '@nestjs/common';
import { Account } from 'account/entities/account.entity';
import { Category } from 'category/entities/category.entity';
import { Class, ClassRegistration } from 'class/entities/class.entity';
import { File } from 'file/entities/file.entity';
import { Option } from 'option/entities/option.entity';
import { Post, PostTag,  } from 'post/entities/post.entity';
import { Sequelize } from 'sequelize-typescript';
import { Tag } from 'tag/entities/tag.entity';

const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: '35.221.182.124',
                port: 3306,
                username: 'korean_web',
                password: '$Korean1234',
                database: 'korean_web',
            });
            
            sequelize.addModels([
                Account, Post, Category, Tag, File,
                PostTag,
                Class, ClassRegistration,
                Option
            ]);
            await sequelize.sync({
                // alter: true
            
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
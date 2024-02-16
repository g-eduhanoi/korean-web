import { Module } from '@nestjs/common';
import { Account } from 'account/entities/account.entity';
import { Category } from 'category/entities/category.entity';
import {Class, ClassRegistration, RegistrationTag} from 'class/entities/class.entity';
import { FileEntity } from 'file/entities/file.entity';
import { Option } from 'option/entities/option.entity';
import { Post, PostTag,  } from 'post/entities/post.entity';
import { Sequelize } from 'sequelize-typescript';
import { Tag } from 'tag/entities/tag.entity';

const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const dialect: any = process.env.DATABASE_DIALECT;
            const sequelize =  new Sequelize({
                dialect: dialect,
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_DB,
            });

            // const sequelize = new Sequelize(`${process.env.DATABASE_DIALECT}://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_DB}`);

            
            sequelize.addModels([
                Account, Post, Category, Tag, FileEntity,
                PostTag,
                Class, ClassRegistration,
                Option,
                Contact,
                ContactTag,
                RegistrationTag
            ]);
            await sequelize.sync({
                alter: true
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
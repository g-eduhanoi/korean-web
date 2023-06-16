import { Column, Model, Table } from 'sequelize-typescript';

export class Post extends Model {
    @Column
    title: string;
    
    @Column
    content: string;
    
    @Column
    excerpt: string;

    @Column
    slug: string;

    @Column
    status: string;

    @Column
    viewCount: number;

    @Column
    thumbnail: string;

    @Column
    categoryId: number;

    @Column
    createdBy: number;

    @Column
    updatedBy: number;
}

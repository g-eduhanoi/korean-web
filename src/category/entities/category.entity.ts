import { Column, Model, Table } from 'sequelize-typescript';

@Table({tableName: 'tbl_categories'})
export class Category extends Model{
    @Column
    name: string;
    @Column
    slug: string;
}

export const CategoryRepo = {
    provide: "CATEGORY_REPO",
    useValue: Category,
    global: true
}
import { Column, Model, Table } from 'sequelize-typescript';

@Table({tableName: 'tbl_categories'})
export class Category extends Model{
    @Column({
        validate: {
            isNull: false
        }
    })
    name: string;
    @Column({
        validate: {
            isNull: false
        }
    })
    slug: string;
}

export const CategoryRepo = {
    provide: "CATEGORY_REPO",
    useValue: Category,
    global: true
}
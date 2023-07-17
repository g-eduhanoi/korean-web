import { Column, Model, Table } from 'sequelize-typescript';

@Table({tableName: 'tbl_tags'})
export class Tag extends Model{
    @Column
    name: string;

    @Column
    slug: string;
}

export const TagRepo = {
    provide: "TAG_REPO",
    useValue: Tag
}
import { Column, Model, Table } from 'sequelize-typescript';

@Table({tableName: 'tbl_tags'})
export class Tag extends Model{
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

export const TagRepo = {
    provide: "TAG_REPO",
    useValue: Tag
}
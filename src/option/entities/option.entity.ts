import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'tbl_options' })
export class Option extends Model {

    @Column
    optionKey: string;

    @Column({
        type: "longtext"
    })
    optionValue: string;
}


export const OptionRepo = {
    provide: "OPTION_REPO",
    useValue: Option
}
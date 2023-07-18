
import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';

@Table({tableName: 'tbl_classes'})
export class Class extends Model{
    @Column
    name: string;

    @Column
    sessionTime: string;

    @Column
    sessionDays: string;

    @Column
    startDate: Date

    @Column 
    categoryId: number;

}

@Table({tableName: 'tbl_class_registration'})
export class ClassRegistration extends Model{
    @Column
    name: string;

    @Column
    phone: string;

    @Column
    email: string;

    @Column
    note: string;

    @BelongsTo(() => Class, "classId")
    class: Class;

    @Column
    status: string;
    
}

export const ClassRepos = [
    {
        provide: "CLASS_REPO",
        useValue: Class,
        global: true
    },
    {
        provide: "CLASS_REGIS_REPO",
        useValue: ClassRegistration,
        global: true
    }
]
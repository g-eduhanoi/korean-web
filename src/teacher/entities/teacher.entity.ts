import {Column, Model, Table} from "sequelize-typescript";
@Table({tableName: 'tbl_teacher'})
export class Teacher extends Model{
    @Column
    name: string;
    @Column
    phone: string;
    @Column
    email: string;
    @Column
    qualification : string;
    @Column
    teachingExperience : string;
    @Column
    avatar : string;
}
export const TeacherRepos = [
    {
        provide: "TEACHER_REPO",
        useValue: Teacher,
        global: true
    }
]

import { Column, Model, Table } from 'sequelize-typescript';
@Table({tableName: 'tbl_contact'})
export class Contact extends Model{
    @Column
    fullName: string;
    @Column
    phone: string;
    @Column
    email: string;
    @Column
    content: string;
}

export const ContactRepo = {
    provide: "CONTACT_REPO",
    useValue: Contact,
    global: true
}
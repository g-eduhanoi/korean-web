import {BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
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

@Table({tableName: 'tbl_contact_tag'})
export class ContactTag extends Model{
    @Column
    name: string;
    @Column
    contactId: number;
}

export const ContactRepos = [
    {
        provide: "CONTACT_REPO",
        useValue: Contact,
        global: true
    },
    {
        provide: "CONTACT_TAG_REPO",
        useValue: ContactTag,
        global: true
    }
]
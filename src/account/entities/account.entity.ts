import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'tbl_accounts' })
export class Account extends Model {
  @Column
  username: string;
  @Column
  password: string;
  @Column
  email: string;
  @Column
  fullName: string;
  @Column
  phone: string;
  @Column
  role: string;
}

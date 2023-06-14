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
  fullname: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ defaultValue: false })
  isApproved: boolean;

}

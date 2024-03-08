import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'tbl_accounts' })
export class Account extends Model {
  @Column({
    comment: 'Username',
  })
  username: string;

  @Column
  password: string;

  @Column
  email: string;

  @Column
  fullName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ defaultValue: false })
  isApproved: boolean;

}

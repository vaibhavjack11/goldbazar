import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { UserType } from 'src/types';

@Table({ tableName: 'users', timestamps: true })
export class User extends BaseModel {

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @Column({
    type: DataType.ENUM({
      values: Object.keys(UserType)
    }),
    defaultValue: UserType.CUSTOMER
  })
  type: UserType;
}

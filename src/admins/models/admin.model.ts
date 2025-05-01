import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  full_name: string;
  username: string;
  email: string;
  hashed_password: string;
  is_creater: boolean;
  is_active: boolean;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare username: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  declare hashed_refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_creater: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;
}

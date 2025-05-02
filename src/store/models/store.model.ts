import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IStoreCreationAttr {
  id: number;
  name: string;
  location: string;
  phone: string;
  owner_id: number;
  description: string;
  region_id: number;
  district_id: number;
  address: string;
  status_id: number;
  open_time: string;
  close_time: string;
  weekday: number;
}

@Table({ tableName: "stores" })
export class Store extends Model<Store, IStoreCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare location: string;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare phone: string;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare ownerId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare regionId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare districtId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare address: string;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare statusId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare open_time: string;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare close_time: string;

  @Column({
    type: DataType.INTEGER,
    allowNull:false
  })
  declare weekday: number;
}

import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: "districts" })
export class District extends Model<District, IDistrictCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare regionId: number;
}

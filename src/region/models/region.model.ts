import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IRegionCreationAttr {
    name: string;
  }
  
  @Table({ tableName: "regions" })
  export class Region extends Model<Region, IRegionCreationAttr> {
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
  }
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IStatusCreationAttr {
    name: string;
    description: string;
  }
  
  @Table({ tableName: "statuses" })
  export class Status extends Model<Status, IStatusCreationAttr> {
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
      type: DataType.STRING,
    })
    declare description: string;
  }
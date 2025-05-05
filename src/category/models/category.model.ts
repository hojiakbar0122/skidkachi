import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICategoryCreationAttr {
  name: string;
  description: string;
  parentId: number;
}

@Table({ tableName: "categories" })
export class Category extends Model<Category, ICategoryCreationAttr> {
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

  @Column({
    type: DataType.INTEGER,
  })
  declare parentId: number;
}

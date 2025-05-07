import { Column, DataType, Model, Table } from "sequelize-typescript"

interface IAddressCreationAttr{
    userId:number
    last_state:string
}

@Table({tableName:"address"})
export class Address extends Model<Address, IAddressCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number

    @Column({
        type:DataType.STRING(50),
    })
    declare name:string

    @Column({
        type:DataType.STRING,
    })
    declare address:string

    @Column({
        type:DataType.BIGINT,
    })
    declare userId:number

    @Column({
        type:DataType.STRING,
    })
    declare location:string

    @Column({
        type:DataType.STRING,
    })
    declare last_state:string
}
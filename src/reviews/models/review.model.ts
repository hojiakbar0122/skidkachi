import { Column, DataType, Model, Table } from "sequelize-typescript"

interface IreviewCreationAttr{
    userId:number
    discountId:number
    comment:string
    rating:number
}

@Table({tableName:"reviews"})
export class Review extends Model<Review, IreviewCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number

    @Column({
        type:DataType.INTEGER
    })
    declare userId:number

    @Column({
        type:DataType.INTEGER
    })
    declare discountId:number

    @Column({
        type:DataType.STRING
    })
    declare comment:string

    @Column({
        type:DataType.SMALLINT
    })
    declare rating:number
}

import { Column, DataType, Model, Table } from "sequelize-typescript"

interface IFavouritCreationAttr{
    userId:number
    discountId:number
}

@Table({tableName:"favourites"})
export class Favourite extends Model<Favourite, IFavouritCreationAttr>{
    @Column({
        type:DataType.INTEGER
    })
    declare userId:number

    @Column({
        type:DataType.INTEGER
    })
    declare discountId:number
}

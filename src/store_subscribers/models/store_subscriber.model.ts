import { Column, DataType, Model, Table } from "sequelize-typescript"

interface IStoreSubscriberCreationAttr{
    userId:number
    storeId:number
}

@Table({tableName:"store_subscribers"})
export class StoreSubscriber extends Model<StoreSubscriber, IStoreSubscriberCreationAttr>{
    @Column({
        type:DataType.INTEGER
    })
    declare userId:number

    @Column({
        type:DataType.INTEGER
    })
    declare storeId:number
}

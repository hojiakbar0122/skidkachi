import { Column, DataType, Model, Table } from "sequelize-typescript"

interface IStoreSocialLinks{
    url:string
    description:string
    storeId:number
    socialMediaTypeId:number
}

@Table({tableName:"store_social_links"})
export class StoreSocialLink extends Model<StoreSocialLink, IStoreSocialLinks>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number

    @Column({
        type:DataType.STRING
    })
    declare url:string

    @Column({
        type:DataType.STRING
    })
    declare description:string

    @Column({
        type:DataType.INTEGER
    })
    declare storeId:number

    @Column({
        type:DataType.INTEGER
    })
    declare socialMediaTypeId:number
}

import { Column, DataType, Model, Table } from "sequelize-typescript"

interface ISocialMediaTypeCreationAttr{
    based_url:string
    is_active:boolean
}

@Table({tableName:"social_media_type"})
export class SocialMediaType extends Model<SocialMediaType, ISocialMediaTypeCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number

    @Column({
        type:DataType.STRING
    })
    declare based_url:string

    @Column({
        type:DataType.BOOLEAN
    })
    declare is_active:boolean

}

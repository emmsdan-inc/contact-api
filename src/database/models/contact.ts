import { Optional } from 'sequelize'
import { Model, Table,Column, IsEmail, IsUrl, IsIn, Comment, Default, DataType, IsUUID, PrimaryKey, BeforeCreate, BeforeBulkCreate  } from 'sequelize-typescript'
import { v4 as uuid } from 'uuid'

export interface PersonAttributes {
    id: number
    name: string
    userId: string
}

interface PersonCreationAttributes extends Optional<PersonAttributes, 'id'> {}

@Table
export default class Contact extends Model<PersonAttributes, PersonCreationAttributes> {
    @IsUUID(4)
    @PrimaryKey
    @Column(DataType.UUID)
    id!: string

    @Comment('Unique users identifier, across all EmmsDan apps')
    @Column(DataType.STRING)
    userId!: string

    @Column(DataType.STRING)
    name!: string

    @Default('')
    @Column(DataType.STRING)
    pix!: string

    @IsEmail
    @Column(DataType.STRING)
    email!: string

    @IsUrl
    @Column(DataType.STRING)
    website!: string

    @Default('')
    @Column(DataType.STRING)
    phone!: string

    @Default('')
    @Column(DataType.STRING)
    job!: string

    @Default('normal')
    @IsIn([['important', 'normal', 'vip', 'high', 'low']])
    @Column(DataType.STRING)
    priority!: string

    @BeforeCreate
    static addUserId(instance: Contact) {
        // this will also be called when an instance is created
        instance.id = uuid()
    }

    @BeforeBulkCreate
    static addUserIdBulk(instances: Contact[]) {
        for (const instance of instances) {
            instance.id = uuid()
        }
    }

}

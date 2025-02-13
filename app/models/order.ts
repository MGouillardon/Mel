import { BaseModel, column, belongsTo, hasMany, Belongs, HasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user'
import OrderProduct from './order_product'
import OrderStatus from '#enums/order_status'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare status: OrderStatus

  @column()
  declare totalAmount: number

  @column()
  declare shippingAddress: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: Belongs<typeof User>

  @hasMany(() => OrderProduct)
  declare orderProducts: HasMany<typeof OrderProduct>
}

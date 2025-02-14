import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from '#models/user'
import OrderProduct from '#models/order_product'
import { OrderStatus } from '#enums/order_status'

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
  declare user: BelongsTo<typeof User>

  @hasMany(() => OrderProduct)
  declare orderProducts: HasMany<typeof OrderProduct>
}

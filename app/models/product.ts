import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare region: string

  @column()
  declare weight: number

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    serialize: (value: string) => JSON.parse(value),
  })
  declare flavor_profile: string[]

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    serialize: (value: string) => JSON.parse(value),
  })
  declare grind_option: string[]

  @column()
  declare roast_level: number

  @column()
  declare image_url: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

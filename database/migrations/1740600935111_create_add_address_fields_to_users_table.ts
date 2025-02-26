import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('postal_code').nullable()
      table.string('country').nullable()
      table.string('phone_number').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('address')
      table.dropColumn('city')
      table.dropColumn('postal_code')
      table.dropColumn('country')
      table.dropColumn('phone_number')
    })
  }
}

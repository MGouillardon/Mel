import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role', ['admin', 'user']).defaultTo('user').after('password')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
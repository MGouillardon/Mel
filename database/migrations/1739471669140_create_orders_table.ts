import { BaseSchema } from '@adonisjs/lucid/schema'
import { OrderStatus } from '#enum/order_status'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('status', Object.values(OrderStatus)).defaultTo(OrderStatus.PENDING)
      table.decimal('total_amount', 10, 2).notNullable()
      table.string('shipping_address').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

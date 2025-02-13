import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.decimal('price', 8, 2).notNullable()
      table.string('region').notNullable()
      table.integer('weight').notNullable()
      table.json('flavor_profile').notNullable()
      table.json('grind_option').notNullable()
      table.integer('roast_level').notNullable()
      table.string('image_url').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

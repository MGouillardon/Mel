import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'
import type { CreateProduct } from '#types/product'

export default class extends BaseSeeder {
  async run() {
    try {
      const response = await fetch('https://fake-coffee-api.vercel.app/api')
      const data = (await response.json()) as (CreateProduct & { _id: string })[]
      const productsData = data.map(({ _id, ...rest }) => rest)

      await Product.createMany(productsData)
    } catch (error) {
      console.error('Seeding error: ', error)
      if (error instanceof Error) {
        console.error('Details: ', error.message)
      }
    }
  }
}

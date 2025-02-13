import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'
import { ProductDTO } from '#types/product'

export default class extends BaseSeeder {
  async run() {
    try {
      const response = await fetch('https://fake-coffee-api.vercel.app/api')
      const data = (await response.json()) as ProductDTO[]

      const productsData = data.map((product) => ({
        name: product.name,
        description: product.description,
        price: product.price,
        region: product.region,
        weight: product.weight,
        flavor_profile: product.flavor_profile,
        grind_option: product.grind_option,
        roast_level: product.roast_level,
        image_url: product.image_url,
      }))

      await Product.createMany(productsData)
    } catch (error) {
      console.error('Seeding error: ', error)
      if (error instanceof Error) {
        console.error('Details: ', error.message)
      }
    }
  }
}

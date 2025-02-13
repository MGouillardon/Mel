import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async handle({ inertia }: HttpContext) {
    const products = await Product.all()
    return inertia.render('home', {
      products,
    })
  }
}

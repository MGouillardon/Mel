import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductController {
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10

    const products = await Product.query().orderBy('created_at', 'desc').paginate(page, limit)

    return inertia.render('products/index', {
      products,
      query: {
        page,
      },
    })
  }
}

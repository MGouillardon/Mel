import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductController {
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 12

    const products = await Product.query().orderBy('created_at', 'desc').paginate(page, limit)

    return inertia.render('Products/Index', {
      products,
      query: {
        page,
      },
    })
  }

  async show({ inertia, params }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    return inertia.render('Products/Show', {
      product,
    })
  }
}

import { inject } from '@adonisjs/core'
import CartService from '#services/cart_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

@inject()
export default class CartMiddleware {
  constructor(private cartService: CartService) {}

  async handle({ session, inertia }: HttpContext, next: NextFn) {
    if (inertia) {
      try {
        const cartSummary = this.cartService.getCartSummary({ session } as HttpContext)
        inertia.share({
          cart: cartSummary,
        })
      } catch (error) {
        console.error('Error:', error)
        inertia.share({
          cart: {
            itemCount: 0,
            totalAmount: 0,
          },
        })
      }
    }

    await next()
  }
}

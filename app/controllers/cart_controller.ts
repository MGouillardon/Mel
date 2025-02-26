import { inject } from '@adonisjs/core'
import CartService from '#services/cart_service'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CartController {
  constructor(private cartService: CartService) {}

  async index({ inertia, session }: HttpContext) {
    try {
      const cartWithProducts = await this.cartService.getCartWithProducts({
        session,
      } as HttpContext)
      return inertia.render('Cart/Index', { cart: cartWithProducts })
    } catch (error) {
      return inertia.render('Cart/Index', {
        cart: { items: [], totalAmount: 0, itemCount: 0 },
        error: 'Failed to retrieve cart',
      })
    }
  }

  async store({ request, response, session }: HttpContext) {
    try {
      const { productId, quantity = 1, redirectTo = null } = request.body()

      if (!productId || typeof Number.parseInt(productId) !== 'number') {
        session.flash('error', 'Valid productId is required')
        return response.redirect().back()
      }

      await this.cartService.addItem(
        { session } as HttpContext,
        Number.parseInt(productId),
        Number.parseInt(quantity)
      )
      session.flash('success', 'Product added to cart')

      return redirectTo ? response.redirect(redirectTo) : response.redirect().back()
    } catch (error) {
      session.flash('error', 'Failed to add item to cart')
      return response.redirect().back()
    }
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const productId = Number.parseInt(params.id, 10)
      const { quantity } = request.body()

      if (Number.isNaN(productId) || !quantity || Number.isNaN(Number.parseInt(quantity))) {
        session.flash('error', 'Valid productId and quantity are required')
        return response.redirect().back()
      }

      this.cartService.updateItemQuantity(
        { session } as HttpContext,
        productId,
        Number.parseInt(quantity)
      )
      session.flash('success', 'Cart updated')
      return response.redirect().back()
    } catch (error) {
      session.flash('error', 'Failed to update cart item')
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    try {
      const productId = Number.parseInt(params.id, 10)

      if (Number.isNaN(productId)) {
        session.flash('error', 'Valid productId is required')
        return response.redirect().back()
      }

      this.cartService.removeItem({ session } as HttpContext, productId)
      session.flash('success', 'Item removed from cart')
      return response.redirect().back()
    } catch (error) {
      session.flash('error', 'Failed to remove item from cart')
      return response.redirect().back()
    }
  }

  async clear({ response, session }: HttpContext) {
    try {
      this.cartService.clearCart({ session } as HttpContext)
      session.flash('success', 'Cart cleared')
      return response.redirect().back()
    } catch (error) {
      session.flash('error', 'Failed to clear cart')
      return response.redirect().back()
    }
  }
}

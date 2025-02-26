import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import CartService from '#services/cart_service'
import OrderService from '#services/order_service'
import PaymentService from '#services/payment_service'
import User from '#models/user'
import { OrderStatus } from '#enums/order_status'
import Order from '#models/order'

@inject()
export default class CheckoutController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private paymentService: PaymentService
  ) {}

  async index({ inertia, auth, response, session }: HttpContext) {
    if (!auth.user) {
      session.flash('redirect_after_login', '/checkout')
      return response.redirect('/login')
    }

    const cartWithProducts = await this.cartService.getCartWithProducts({ session } as HttpContext)
    if (cartWithProducts.items.length === 0) {
      session.flash('error', 'Your cart is empty')
      return response.redirect('/cart')
    }

    const user = auth.user as User

    return inertia.render('Checkout/Index', {
      cart: cartWithProducts,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        city: user.city,
        postalCode: user.postalCode,
        country: user.country,
        phoneNumber: user.phoneNumber,
      },
    })
  }

  async updateAddress({ request, auth, response, session }: HttpContext) {
    if (!auth.user) {
      return response.redirect('/login')
    }

    try {
      const user = auth.user as User

      user.address = request.input('address', user.address)
      user.city = request.input('city', user.city)
      user.postalCode = request.input('postalCode', user.postalCode)
      user.country = request.input('country', user.country)
      user.phoneNumber = request.input('phoneNumber', user.phoneNumber)

      await user.save()

      session.flash('success', 'Shipping information updated')
      return response.redirect('/checkout')
    } catch (error) {
      console.error('Error updating shipping address:', error)
      session.flash('error', 'Failed to update shipping information')
      return response.redirect().back()
    }
  }

  async processOrder({ auth, response, session }: HttpContext) {
    if (!auth.user) {
      return response.redirect('/login')
    }

    try {
      const user = auth.user as User

      if (!user.address || !user.city || !user.postalCode || !user.country) {
        session.flash('error', 'Please complete your shipping address')
        return response.redirect('/checkout')
      }

      const order = await this.orderService.createOrderFromCart({ session } as HttpContext, user)

      const paymentResult = await this.paymentService.processOrderPayment(order, {
        session,
      } as HttpContext)

      if (paymentResult.success) {
        await this.orderService.updateOrderStatus(order.id, OrderStatus.PAID)

        this.cartService.clearCart({ session } as HttpContext)

        session.flash('success', 'Your order has been placed successfully')
        return response.redirect(`/checkout/confirmation/${order.id}`)
      } else {
        session.flash('error', paymentResult.errorMessage || 'Payment failed')
        return response.redirect('/checkout')
      }
    } catch (error) {
      console.error('Order processing error:', error)
      session.flash('error', 'An error occurred while processing your order')
      return response.redirect('/checkout')
    }
  }

  async confirmation({ inertia, params, auth, response }: HttpContext) {
    if (!auth.user) {
      return response.redirect('/login')
    }

    try {
      const orderId = params.id
      const user = auth.user as User

      const order = await Order.query()
        .where('id', orderId)
        .where('user_id', user.id)
        .preload('orderProducts', (query) => {
          query.preload('product')
        })
        .firstOrFail()

      return inertia.render('Checkout/Confirmation', {
        order,
      })
    } catch (error) {
      console.error('Error retrieving order:', error)
      return response.redirect('/')
    }
  }
}

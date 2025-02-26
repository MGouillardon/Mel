import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import OrderProduct from '#models/order_product'
import CartService from '#services/cart_service'
import { OrderStatus } from '#enums/order_status'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'

@inject()
export default class OrderService {
  constructor(private cartService: CartService) {}

  async createOrderFromCart(ctx: HttpContext, user: User): Promise<Order> {
    const cartWithProducts = await this.cartService.getCartWithProducts(ctx)

    if (cartWithProducts.items.length === 0) {
      throw new Error('Cannot create an order with an empty cart')
    }

    const shippingAddress = this.formatShippingAddress(user)

    const createdOrder = await db.transaction(async (trx) => {
      const newOrder = await Order.create(
        {
          userId: user.id,
          status: OrderStatus.PENDING,
          totalAmount: cartWithProducts.totalAmount,
          shippingAddress,
        },
        { client: trx }
      )

      const orderProductsData = cartWithProducts.items.map((item) => ({
        orderId: newOrder.id,
        productId: item.product.id,
        quantity: item.quantity,
        priceAtTime: item.product.price,
      }))

      await OrderProduct.createMany(orderProductsData, { client: trx })

      return newOrder
    })

    return createdOrder
  }

  async updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order> {
    const order = await Order.findOrFail(orderId)
    order.status = status
    await order.save()
    return order
  }

  private formatShippingAddress(user: User): string {
    const addressParts = []

    if (user.firstName && user.lastName) {
      addressParts.push(`${user.firstName} ${user.lastName}`)
    }

    if (user.address) {
      addressParts.push(user.address)
    }

    if (user.postalCode && user.city) {
      addressParts.push(`${user.postalCode} ${user.city}`)
    }

    if (user.country) {
      addressParts.push(user.country)
    }

    if (user.phoneNumber) {
      addressParts.push(`Tél: ${user.phoneNumber}`)
    }

    return addressParts.join('\n')
  }
}

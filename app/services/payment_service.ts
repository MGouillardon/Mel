import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'

export interface PaymentProvider {
  processPayment(
    amount: number,
    orderId: string,
    ctx: HttpContext
  ): Promise<{
    success: boolean
    transactionId?: string
    errorMessage?: string
  }>
}

export class TestPaymentProvider implements PaymentProvider {
  async processPayment(
    amount: number,
    orderId: string
  ): Promise<{
    success: boolean
    transactionId?: string
    errorMessage?: string
  }> {
    return {
      success: true,
      transactionId: `test-${Date.now()}-${orderId}`,
    }
  }
}

export default class PaymentService {
  private provider: PaymentProvider

  constructor(provider: PaymentProvider = new TestPaymentProvider()) {
    this.provider = provider
  }

  setProvider(provider: PaymentProvider) {
    this.provider = provider
  }

  async processOrderPayment(
    order: Order,
    ctx: HttpContext
  ): Promise<{
    success: boolean
    transactionId?: string
    errorMessage?: string
  }> {
    try {
      return await this.provider.processPayment(order.totalAmount, order.id.toString(), ctx)
    } catch (error) {
      console.error('Payment processing error:', error)
      return {
        success: false,
        errorMessage: 'An unexpected error occurred during payment processing',
      }
    }
  }
}

import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { Cart, CartWithProducts, CartProductItem } from '#types/cart'

const CART_SESSION_KEY = 'cart'

export default class CartService {
  private initCart(ctx: HttpContext): Cart {
    if (!ctx.session.has(CART_SESSION_KEY)) {
      const cart: Cart = {
        items: [],
        lastUpdated: DateTime.now(),
      }
      ctx.session.put(CART_SESSION_KEY, cart)
      return cart
    }

    return ctx.session.get(CART_SESSION_KEY)
  }

  private saveCart(ctx: HttpContext, cart: Cart): void {
    cart.lastUpdated = DateTime.now()
    ctx.session.put(CART_SESSION_KEY, cart)
  }

  getCart(ctx: HttpContext): Cart {
    return this.initCart(ctx)
  }

  async addItem(ctx: HttpContext, productId: number, quantity: number): Promise<Cart> {
    const product = await Product.find(productId)
    if (!product) {
      throw new Error('Product not found')
    }

    const cart = this.getCart(ctx)
    const existingItemIndex = cart.items.findIndex((item) => item.productId === productId)

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity
    } else {
      cart.items.push({ productId, quantity })
    }

    this.saveCart(ctx, cart)
    return cart
  }

  updateItemQuantity(ctx: HttpContext, productId: number, quantity: number): Cart {
    const cart = this.getCart(ctx)
    const existingItemIndex = cart.items.findIndex((item) => item.productId === productId)

    if (existingItemIndex >= 0) {
      if (quantity <= 0) {
        cart.items.splice(existingItemIndex, 1)
      } else {
        cart.items[existingItemIndex].quantity = quantity
      }
    }

    this.saveCart(ctx, cart)
    return cart
  }

  removeItem(ctx: HttpContext, productId: number): Cart {
    const cart = this.getCart(ctx)
    cart.items = cart.items.filter((item) => item.productId !== productId)

    this.saveCart(ctx, cart)
    return cart
  }

  clearCart(ctx: HttpContext): Cart {
    const cart: Cart = {
      items: [],
      lastUpdated: DateTime.now(),
    }

    this.saveCart(ctx, cart)
    return cart
  }

  async getCartWithProducts(ctx: HttpContext): Promise<CartWithProducts> {
    const cart = this.getCart(ctx)

    if (cart.items.length === 0) {
      return {
        items: [],
        totalAmount: 0,
        itemCount: 0,
      }
    }

    const productIds = cart.items.map((item) => item.productId)
    const products = await Product.query().whereIn('id', productIds)

    const cartItems = cart.items
      .map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId)
        if (!product) return null

        return {
          product,
          quantity: cartItem.quantity,
          subtotal: product.price * cartItem.quantity,
        }
      })
      .filter((item): item is CartProductItem => item !== null)

    const totalAmount = cartItems.reduce((total, item) => total + item.subtotal, 0)
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

    return {
      items: cartItems,
      totalAmount,
      itemCount,
    }
  }

  getCartSummary(ctx: HttpContext): { itemCount: number; totalAmount: number } {
    const cart = this.getCart(ctx)
    const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0)

    return {
      itemCount,
      totalAmount: 0,
    }
  }
}

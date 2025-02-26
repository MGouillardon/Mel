import { DateTime } from 'luxon'
import Product from '#models/product'

export interface CartItem {
  productId: number
  quantity: number
}

export interface Cart {
  items: CartItem[]
  lastUpdated: DateTime
}

export interface CartProductItem {
  product: Product
  quantity: number
  subtotal: number
}

export interface CartWithProducts {
  items: CartProductItem[]
  totalAmount: number
  itemCount: number
}

import type { DateTime } from 'luxon'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  region: string
  weight: number
  flavorProfile: string[]
  grindOption: string[]
  roastLevel: number
  imageUrl: string
  createdAt: DateTime
  updatedAt: DateTime
}

export type CreateProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>

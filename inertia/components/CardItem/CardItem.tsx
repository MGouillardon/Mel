import { Link } from '@tuyau/inertia/react'
import { Link as InertiaLink } from '@inertiajs/react'
import type { Product } from '#types/product'
import CoffeeBeans from './CoffeeBeans/CoffeeBeans'

function CardItem({ product }: { product: Product }) {
  return (
    <Link
      route="products.show"
      params={{ id: product.id }}
      className="card bg-base-100 shadow-xl h-full max-w-96 md:max-w-none hover:bg-base-200 transition-all"
    >
      <figure>
        <img src={product.imageUrl} alt={product.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl">{product.name}</h2>
        <span className="text-lg italic">{product.region}</span>
        <CoffeeBeans value={product.roastLevel} />
        <div className="card-actions justify-end">
          {product.flavorProfile.map((flavor) => (
            <Link route="products.index" className="badge hover:badge-neutral" key={flavor}>
              {flavor}
            </Link>
          ))}
        </div>
        <p>{product.description}</p>
        <div className="card-actions justify-end items-center">
          <p className="text-xl font-black">{product.price} €</p>
          <InertiaLink
            href="/cart"
            method="post"
            data={{ productId: product.id }}
            className="btn btn-accent"
          >
            Add to cart
          </InertiaLink>
        </div>
      </div>
    </Link>
  )
}

export default CardItem

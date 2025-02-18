import { Head, Link} from '@inertiajs/react'
import type { Product } from '#types/product'

import CardItem from '~/components/CardItem/CardItem'

export default function Home({ products }: { products: Product[] }) {

  return (
    <>
      <Head title="Homepage" />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/resources/assets/images/heroImg.png"
            className="max-w-sm rounded-lg max-h-80" />
          <div className='flex flex-col justify-center p-6'>
            <h1 className="text-5xl font-bold lg:text-start text-center">Coffee !</h1>
            <p className="py-6 lg:text-start text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore delectus eveniet aspernatur iusto. Quibusdam praesentium eum illum! Officia, eos mollitia earum dolores aliquam quas beatae.
            </p>
            <Link href="/products" className="btn btn-primary max-w-32 lg:self-start self-center">Shop now !</Link>
          </div>
        </div>
      </div>

      <div className=' flex-1 min-h-screen flex flex-col justify-center m-auto max-w-7xl py-6 gap-6'>
        <h2 className="text-4xl font-bold lg:text-start text-center">Our Products</h2>
        <div className='grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 grid-cols-1 gap-4 content-center place-items-center'>
          {products.map((product) => (
            <CardItem key={product.id} product={product} />
          ))}
        </div>
        <Link href="/products" className="btn btn-primary max-w-64 w-full self-center">See all</Link>
      </div>
    </>
  )
}
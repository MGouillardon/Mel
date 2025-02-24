import { Link } from '@inertiajs/react';
import type { Product } from '#types/product';
import CoffeeBeans from './CoffeeBeans/CoffeBeans';

function CardItem( {product}: {product:Product} ){
  return (
    <div className="card bg-base-100 shadow-xl h-full max-w-96 md:max-w-none hover:bg-base-200 transition-all">
      <figure>
        <img
          src={product.imageUrl}
          alt={product.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl">{product.name}</h2>
        <span className='text-lg italic'>{product.region}</span>
        <CoffeeBeans value={product.roastLevel} />
        <div className="card-actions justify-end">
        {
          product.flavorProfile.map((flavor) => (
            <Link href="#" className="badge hover:badge-neutral">{flavor}</Link>
          ))
        }
        </div>
        <p>{product.description}</p>
        <div className="card-actions justify-end items-center">
          <p className='text-xl font-black'>{product.price} €</p>
          <Link href='#' className="btn btn-accent">Add to cart</Link>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
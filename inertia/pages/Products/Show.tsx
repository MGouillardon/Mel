import type { Product } from '#types/product';
import CoffeeBeans from '~/components/CardItem/CoffeeBeans/CoffeeBeans';

function Show( {product}: {product:Product} ){

  const makeAList = (list: string[]) => {
    return (
      <ul className='list-disc list-inside'>
        {list.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    );
  }

    return (
        <div className='flex-1 h-screen flex justify-evenly m-auto gap-6'>
          <figure className='w-2/5'>
            <img
              className='object-cover w-full h-full'
              src={product.imageUrl}
              alt={product.name} />
          </figure>
          <div className='w-2/5 flex flex-col gap-4 justify-center'>
            <h1 className='text-3xl font-bold'>{product.name}</h1>
            <p className='text-lg'>{product.description}</p>
            <p className='text-lg'>Price: {product.price} €</p>
            <p className='text-lg'>Region: {product.region}</p>
            <p className='text-lg'>Weight: {product.weight}</p>
            <p className='text-lg'>Flavor Profile: {makeAList(product.flavorProfile)}</p>
            <p className='text-lg'>Grind Option: {makeAList(product.grindOption)}</p>
            <p className='text-lg flex h-auto gap-2'>Roast Level: <CoffeeBeans value={product.roastLevel} /></p>
            <button className='btn btn-accent'>Add to Cart</button>
          </div>
        </div>
    );
};

export default Show;
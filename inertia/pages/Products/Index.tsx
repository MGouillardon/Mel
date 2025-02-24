import type { Product } from '#types/product';
import CardItem from '~/components/CardItem/CardItem';
import { Link } from '@inertiajs/react';

function Index({ products }: { products: { data: Product[]; meta: { currentPage: number; previousPageUrl?: string; nextPageUrl?: string } } }) {
  const { data, meta } = products;
  return (
    <>
    <div className='flex-1 min-h-screen flex flex-col justify-center m-auto max-w-7xl py-6 gap-6'>
      <div className='grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 grid-cols-1 gap-4 content-center place-items-center mt-24'>
        {data.map((product: Product) => (
          <CardItem key={product.id} product={product} />
        ))}
      </div>
      <div className="join flex m-auto my-3">
        {
          meta.previousPageUrl &&
          <Link href={`/products${meta.previousPageUrl}`} className="join-item btn">«</Link>
        }
        <div className="join-item btn">Page {meta.currentPage}</div>
        {
          meta.nextPageUrl &&
          <Link href={`/products${meta.nextPageUrl}`} className="join-item btn">»</Link>
        }
      </div>
    </div>
    </>
  );
};

export default Index;
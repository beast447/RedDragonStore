import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    title: 'Red Dragons T-Shirt',
    price: '$25.00',
    image: '',
  },
  {
    title: 'Red Dragons Hoodie',
    price: '$45.00',
    image: '',
  },
  {
    title: 'Athletic Shorts',
    price: '$30.00',
    image: '',
  },
  {
    title: 'Red Dragons Hat',
    price: '$20.00',
    image: '',
  },
];

function Shop(): React.ReactElement {
  return (
    <section id="shop" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 uppercase tracking-wider">
          Shop
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Shop; 
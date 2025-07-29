import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  title: string;
  price: string;
  image: string;
  category: 'standard' | 'swag';
}

const products: Product[] = [
  {
    title: 'Red Dragons T-Shirt',
    price: '$25.00',
    image: '',
    category: 'swag',
  },
  {
    title: 'Red Dragons Hoodie',
    price: '$45.00',
    image: '',
    category: 'swag',
  },
  {
    title: 'Athletic Shorts',
    price: '$30.00',
    image: '',
    category: 'standard',
  },
  {
    title: 'Red Dragons Hat',
    price: '$20.00',
    image: '',
    category: 'standard',
  },
];

function Shop(): React.ReactElement {
  const [filter, setFilter] = React.useState<'standard' | 'swag' | null>(null);

  const filteredProducts =
    filter === null ? [] : products.filter((p) => p.category === filter);

  return (
    <section id="shop" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 uppercase tracking-wider">
          Shop
        </h2>

        {/* Filter tiles */}
        <div className="mb-12 w-full grid grid-cols-1 sm:grid-cols-2 gap-0">
          {(
            [
              {
                label: 'Standard Issue',
                value: 'standard',
                bg: 'url(/src/assets/standard-tile.jpg)',
              },
              {
                label: 'Swag Apparel',
                value: 'swag',
                bg: 'url(/src/assets/swag-tile.jpg)',
              },
            ] as const
          ).map(({ label, value, bg }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`relative overflow-hidden flex items-center justify-center w-full h-[50vh] sm:h-screen font-semibold transition-transform hover:scale-[1.02] focus:outline-none ${
                filter === value ? 'ring-4 ring-red-600' : ''
              }`}
              style={{ backgroundImage: bg }}
            >
              {/* Dark overlay for text readability */}
              <span className="absolute inset-0 bg-black/40" aria-hidden="true" />
              {/* Label */}
              <span className="relative z-10 text-white text-2xl sm:text-3xl text-center px-4 font-extrabold tracking-wide">
                {label}
              </span>
            </button>
          ))}
        </div>

        {filter !== null && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p) => (
              <ProductCard key={p.title} {...p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Shop; 
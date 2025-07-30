import React from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { customMockups } from '../data/customMockups';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  variants?: any[];
  images?: string[];
}

function Shop(): React.ReactElement {
  const [revealed, setRevealed] = React.useState(false);
  const [selected, setSelected] = React.useState<'standard' | 'swag' | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  // Fetch Printful products once
  React.useEffect(() => {
    fetch('/api/printful/products')
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error('Unexpected products payload', data);
          return;
        }
        const mapped: Product[] = data.map((item: any) => ({
          id: item.id,
          title: item.name,
          price: `$${item.variants?.[0]?.retail_price ?? '0.00'}`,
          image: item.thumbnail_url,
        }));
        setProducts(mapped);
      })
      .catch(console.error);
  }, []);

  const visibleProducts = revealed ? products : [];

  // Fetch full product details when a product is selected
  React.useEffect(() => {
    if (!selectedProduct) return;
    if (selectedProduct.variants) return; // already loaded
    fetch(`/api/printful/products/${selectedProduct.id}`)
      .then(async (r) => {
        if (!r.ok) {
          console.error('Failed to load product details', r.status);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        // Gather unique preview images from product and variants
        const imageSet = new Set<string>();
        if (data.sync_product?.thumbnail_url) imageSet.add(data.sync_product.thumbnail_url);
        if (Array.isArray(data.sync_product?.files)) {
          data.sync_product.files.forEach((f: any) => {
            if (f?.preview_url) imageSet.add(f.preview_url);
            if (f?.thumbnail_url) imageSet.add(f.thumbnail_url);
          });
        }
        if (Array.isArray(data.sync_variants)) {
          data.sync_variants.forEach((variant: any) => {
            if (variant?.preview_url) imageSet.add(variant.preview_url);
            if (Array.isArray(variant.files)) {
              variant.files.forEach((f: any) => {
                if (f?.preview_url) imageSet.add(f.preview_url);
              });
            }
          });
        }

        let images = Array.from(imageSet);
        if (customMockups[selectedProduct.title]) {
          images = customMockups[selectedProduct.title];
        }

        setSelectedProduct({ ...selectedProduct, variants: data.sync_variants, images });
      })
      .catch(console.error);
  }, [selectedProduct]);

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
                bg: 'url(/src/assets/swag.jpg)',
              },
            ] as const
          ).map(({ label, value, bg }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setSelected(value);
                setRevealed(true);
              }}
              className={`relative overflow-hidden flex items-center justify-center w-full h-[50vh] sm:h-screen font-semibold transition-transform hover:scale-[1.02] focus:outline-none ${
                selected === value ? 'ring-4 ring-red-600' : ''
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

        {revealed && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {visibleProducts.map((p) => (
              <ProductCard
                key={p.id}
                {...p}
                onSelect={() => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}

        <ProductModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
          onAddToCart={(variantId: number) => {
            // TODO: integrate cart add
            console.log('Add variant', variantId);
          }}
        />
      </div>
    </section>
  );
}

export default Shop; 
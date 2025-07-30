import React from 'react';

interface Variant {
  id: number;
  name: string;
  retail_price: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    title: string;
    image: string;
    price: string;
    images?: string[];
    variants?: Variant[];
  } | null;
  onAddToCart: (variantId: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = React.useState<number | null>(null);
  const [activeImage, setActiveImage] = React.useState(0);
  const [zoomSrc, setZoomSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    // reset on product change
    setSelectedVariant(null);
    setActiveImage(0);
  }, [product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto py-8 bg-black/60 backdrop-blur">
      {/* Zoom overlay */}
      {zoomSrc && (
        <div
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center cursor-zoom-out"
          onClick={() => setZoomSrc(null)}
        >
          <img
            src={zoomSrc}
            alt="Zoomed"
            className="max-w-[95vw] max-h-[95vh] object-contain"
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-lg mx-4 p-4 sm:p-6 relative animate-fade max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <img
          src={product.images?.[activeImage] ?? product.image}
          alt={product.title}
          onClick={() =>
            setZoomSrc(product.images?.[activeImage] ?? product.image)
          }
          className="w-full max-h-60 sm:max-h-80 object-contain rounded transition-opacity duration-300 cursor-zoom-in"
        />

        {/* Image thumbnails */}
        {product.images && product.images.length > 1 && (
          <div className="flex overflow-x-auto gap-2 mt-2 pb-2">
            {product.images.map((img, idx) => (
              <img
                key={`${img}-${idx}`}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setActiveImage(idx)}
                className={`h-16 w-16 object-cover rounded cursor-pointer border-2 transition-opacity ${
                  activeImage === idx ? 'border-red-600' : 'border-transparent opacity-70'
                }`}
              />
            ))}
          </div>
        )}
        <h3 className="text-2xl font-semibold mt-4 mb-2">{product.title}</h3>
        {/* Variant selection if available */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Select Size / Variant</h4>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v.id)}
                  className={`px-3 py-1 rounded border transition-colors text-sm ${
                    selectedVariant === v.id
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <span className="text-xl font-bold text-red-600">{product.price}</span>
          <button
            type="button"
            disabled={product.variants && !selectedVariant}
            onClick={() => selectedVariant && onAddToCart(selectedVariant)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 
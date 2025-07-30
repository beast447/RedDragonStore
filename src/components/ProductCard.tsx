import React from 'react';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
  onSelect?: () => void;
}

function ProductCard({ title, price, image, onSelect }: ProductCardProps): React.ReactElement {
  const { addItem } = useCart();
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
  return (
    <div
      className="group bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform hover:-translate-y-1 cursor-pointer"
      onClick={onSelect}
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-60 sm:h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <span className="text-red-600 font-bold mb-4">{price}</span>
        <button
          onClick={() => addItem({ id: title, title, price: numericPrice, image })}
          className="mt-auto bg-red-600 hover:bg-red-700 transition-colors text-white py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard; 
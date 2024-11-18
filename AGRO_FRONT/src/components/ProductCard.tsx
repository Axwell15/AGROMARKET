import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  owner: string;
}

interface ProductCardProps {
  product: Product;
  onBuyClick: () => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyClick }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-4">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-xl font-semibold text-green-700 mt-2">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-600 font-semibold">${product.price}</p>
      <p className="text-gray-500">{product.owner}</p>
      <button
        onClick={onBuyClick}
        className="mt-4 w-full bg-custom-green text-white py-2 rounded"
      >
        Comprar
      </button>
    </div>
  );
};

export default ProductCard;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/cartcontext'; 

const ProductPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = location.state as {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  };
  
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl, 
    };

    addToCart(cartItem);
    navigate('/cart'); 
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-700">{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded mt-4" />
      <p className="text-gray-700 mt-4">{product.description}</p>
      <p className="text-green-600 font-semibold mt-2">${product.price} por unidad</p>

      <div className="mt-6">
        <label htmlFor="quantity" className="block text-gray-700">Cantidad</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-custom-green text-white py-2 rounded mt-4"
      >
        Añadir al Carrito
      </button>
    </div>
  );
};

export default ProductPage;

import React, { useEffect, useState } from 'react';
import { useCart } from '../context/cartcontext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const [localCart, setLocalCart] = useState(cart);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const total = localCart.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return total + price * quantity;
  }, 0);

  useEffect(() => {
    const syncCart = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setLocalCart(updatedCart);
    };

    syncCart();

    window.addEventListener('storage', syncCart);
    
    return () => {
      window.removeEventListener('storage', syncCart);
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Carrito de Compras</h2>
      {localCart.length === 0 ? (
        <p className="text-gray-600">No tienes productos en el carrito.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-4">
          {localCart.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">Cantidad: {item.quantity}</p>
                <p className="text-green-700 font-semibold">Precio: ${item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center font-semibold text-xl mt-6 border-t pt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="w-full bg-custom-green text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 mt-6"
          >
            Proceder al Pago
          </button>

          <Link to="/" className="mt-4 inline-block text-green-600 hover:underline">
            Seguir comprando
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;

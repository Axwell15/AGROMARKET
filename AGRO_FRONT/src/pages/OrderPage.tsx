import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authcontext'; 
const OrdersPage: React.FC = () => {
  const { user } = useAuth(); 
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const userOrders = storedOrders.filter((order: any) => order.user_id === user.id);
      setOrders(userOrders); 
    }
  }, [user]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mis Órdenes</h2>
      {orders.length === 0 ? (
        <p>No tienes órdenes aún.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.order_date} className="mb-4 p-4 border border-gray-300 rounded-md">
              <h3 className="font-semibold">Orden #{order.order_date}</h3>
              <p><strong>Fecha:</strong> {new Date(order.order_date).toLocaleString()}</p>
              <p><strong>Total:</strong> ${order.total_price}</p>

              <h4 className="font-semibold mt-4">Productos en esta orden:</h4>
              <ul>
                {order.cart_items.map((item: any) => (
                  <li key={item.name} className="flex justify-between items-center mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
    
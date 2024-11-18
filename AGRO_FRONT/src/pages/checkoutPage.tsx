import React, { useState } from 'react';
import { useCart } from '../context/cartcontext';  
import { useAuth } from '../context/authcontext'; 
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user } = useAuth();  
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    cardNumber: '',
    cardExpiration: '',
    cardCVC: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card'); 

  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalRounded = parseFloat(total.toFixed(2));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validación para permitir solo números en ciertos campos
    if (name === 'phone' || name === 'cardNumber' || name === 'cardCVC') {
      if (!/^\d*$/.test(value)) return; // Permitir solo números
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Debes iniciar sesión para realizar una compra.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const emailParams = {
      fullName: user.name,
      user_email: user.email, 
      user_phone: formData.phone,
      address: formData.address,
      cardNumber: paymentMethod === 'card' ? formData.cardNumber : '', 
      expiryDate: paymentMethod === 'card' ? formData.cardExpiration : '',
      cvv: paymentMethod === 'card' ? formData.cardCVC : '',
    };

    console.log(emailParams);

    try {
      await emailjs.send(
        'service_ag0q3rf',  
        'template_9rck5vp',  
        emailParams,
        'oXnkMWFTKlt7ulqxi'  
      );

      const order = {
        user_id: user.id,
        user_name: user.name,
        address: formData.address,
        phone: formData.phone,
        total_price: total,
        cart_items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total_price: item.price * item.quantity,
        })),
        order_date: new Date().toISOString(),
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      alert('¡Compra realizada con éxito! Te hemos enviado un comprobante al correo.');
      navigate('/');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      alert('Hubo un problema al enviar el comprobante. Intenta nuevamente.');
    }

    setIsProcessing(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-700">Confirmación de Compra</h2>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">Dirección de Envío</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">Número de Teléfono</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-gray-700">Método de Pago</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          >
            <option value="card">Tarjeta de Crédito</option>
            <option value="cash">Efectivo</option>
          </select>
        </div>

        {paymentMethod === 'card' && (
          <>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700">Número de Tarjeta</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>

            <div className="mb-4 flex">
              <div className="w-1/2 mr-2">
                <label htmlFor="cardExpiration" className="block text-gray-700">Fecha de Expiración</label>
                <input
                  type="month"
                  id="cardExpiration"
                  name="cardExpiration"
                  value={formData.cardExpiration}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="cardCVC" className="block text-gray-700">CVC</label>
                <input
                  type="text"
                  id="cardCVC"
                  name="cardCVC"
                  value={formData.cardCVC}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  required
                />
              </div>
            </div>
          </>
        )}

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full bg-custom-green text-white py-2 rounded mt-4"
          disabled={isProcessing}
        >
          {isProcessing ? 'Procesando...' : 'Confirmar Compra'}
        </button>
      </form>

      <h3 className="mt-6 text-xl font-bold">Resumen de la compra</h3>
      <ul className="mt-2">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>${totalRounded}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold">Total: ${totalRounded}</p>
    </div>
  );
};

export default CheckoutPage;

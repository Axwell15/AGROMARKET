import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext'; 

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dui, setDui] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState<'Vendedor' | 'Comprador'>('Comprador');

  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Filtrar cualquier cosa que no sea un número
    setPhone(value.replace(/[^0-9]/g, ''));
  };

  const handleDuiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Filtrar cualquier cosa que no sea un número
    setDui(value.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar teléfono y DUI para asegurarse de que solo se ingresen números
    if (!/^\d+$/.test(phone)) {
      alert('El número de teléfono debe contener solo números.');
      return;
    }

    if (!/^\d+$/.test(dui)) {
      alert('El DUI debe contener solo números.');
      return;
    }

    const userData = { name, email, phone, dui, address, role, id: Date.now() };
    login(userData);
    navigate('/');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600">
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-green-700 text-center mb-6">Crear Cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-green-600 text-lg font-medium">Nombre Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-lg bg-green-50 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-green-600 text-lg font-medium">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg bg-green-50 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-green-600 text-lg font-medium">Número de Teléfono</label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full p-4 rounded-lg bg-green-50 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-green-600 text-lg font-medium">DUI</label>
            <input
              type="text"
              value={dui}
              onChange={handleDuiChange}
              className="w-full p-4 rounded-lg bg-green-50 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-green-600 text-lg font-medium">Dirección</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-4 rounded-lg bg-green-50 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-green-600 text-lg font-medium">Rol</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'Vendedor' | 'Comprador')}
              className="w-full p-4 rounded-lg bg-green-50 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Comprador">Comprador</option>
              <option value="Vendedor">Vendedor</option>
            </select>
          </div>
          <button type="submit" className="w-full p-4 bg-custom-green text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
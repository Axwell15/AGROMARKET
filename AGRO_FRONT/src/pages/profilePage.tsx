import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, updateUserInfo } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const filteredValue = value.replace(/[^0-9]/g, ''); 
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar teléfono para asegurarse de que solo se ingresen números
    if (!/^\d+$/.test(formData.phone)) {
      alert('El número de teléfono debe contener solo números.');
      return;
    }

    updateUserInfo(formData);
    setSuccessMessage('¡Información actualizada con éxito!');
    setTimeout(() => {
      setSuccessMessage(null); 
      navigate('/'); 
    }, 3000);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-700">Mi Perfil</h2>

      {successMessage && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-4 rounded-md shadow-lg">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
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
            inputMode="numeric"   
            pattern="[0-9]*"  
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-custom-green text-white py-2 rounded mt-4"
        >
          Actualizar Información
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;

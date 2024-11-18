import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState<string | null>(null); // Estado para mostrar el mensaje
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let loggedInUser;
    if (email === 'comprador@example.com' && password === 'comprador123') {
      loggedInUser = {
        name: 'ernesto bricenio',
        id: '1',
        email: 'comprador@example.com',
        phone: '12345678',
        dui: '12345678-9',
        address: 'Calle Ernesto 123',
        role: 'Comprador' as 'Comprador' | 'Vendedor',
      };
    } else if (email === 'vendedor@example.com' && password === 'vendedor123') {
      loggedInUser = {
        name: 'kevin escalante',
        id: '2',
        email: 'vendedor@example.com',
        phone: '87654321',
        dui: '98765432-1',
        address: 'Calle Principal 456',
        role: 'Vendedor' as 'Comprador' | 'Vendedor',
      };
    } else {
      alert('Correo electrónico o contraseña incorrectos');
      return;
    }

    login(loggedInUser);

    // Mostrar mensaje de éxito al iniciar sesión
    setLoginMessage('¡Has iniciado sesión exitosamente!');

    // Esperar 2 segundos antes de navegar
    setTimeout(() => {
      setLoginMessage(null); // Limpiar el mensaje después de navegar
      navigate('/'); // Navegar a la página principal
    }, 2000); // Mantener el mensaje visible por 2 segundos
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600">
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-custom-green text-center mb-6">Iniciar Sesión</h2>
        {loginMessage && (
          <div className="mb-4 p-2 text-white bg-green-500 rounded text-center">
            {loginMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-custom-green text-lg font-medium">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg bg-green-50 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-custom-green text-lg font-medium">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-lg bg-green-50 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-custom-green text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authcontext';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/iconagro.png';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null); // Estado para mensaje de cierre de sesión

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((count: number, item: any) => count + item.quantity, 0);
    setCartItemCount(totalItems);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-custom-green p-4 text-white">
      <div className="flex justify-between items-center">
        {/* Contenedor del logo y texto */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="AgroMarket Logo" className="h-12 w-auto" />
          <span className="ml-2 text-xl font-bold">AgroMarket</span>
        </Link>

        {/* Menú hamburguesa */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-custom-green md:bg-transparent transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'
            } md:flex flex-col md:flex-row md:items-center`}
        >
          <Link
            to="/cart"
            className="flex items-center p-4 md:p-0 md:mr-6"
            onClick={() => setMenuOpen(false)} >
            <FaShoppingCart size={20} className="mr-2" />
            <span>Carrito</span>
            {cartItemCount > 0 && (
              <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-sm">
                {cartItemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex flex-col md:flex-row items-center md:gap-6">
              <Link
                to="/orders"
                className="p-4 md:p-0 md:mr-6"
                onClick={() => setMenuOpen(false)}
              >
                Mis Órdenes🧾

              </Link>

              {/* Mostrar "Agregar Productos" solo si el usuario es vendedor */}
              {user.role === 'Vendedor' && (
                <Link
                  to="/my-products"
                  className="p-4 md:p-0 md:mr-6"
                  onClick={() => setMenuOpen(false)}
                >
                  Agregar Productos ➕
                </Link>
              )}

              <Link
                to="/profile"  // Aquí se cambia el "span" a un enlace a "/profile"
                className="p-4 md:p-0 md:mr-6"
              >
                👤Hola, {user.name}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                  setLogoutMessage("Has cerrado sesión satisfactoriamente."); // Mensaje de éxito
                  setTimeout(() => {
                    setLogoutMessage(null); // Limpiar mensaje después de 3 segundos
                  }, 3000);
                }}
                className="bg-red-600 px-4 py-2 rounded text-white"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center md:gap-6">
              <Link
                to="/signup"
                className="p-4 md:p-0 md:mr-6"
                onClick={() => setMenuOpen(false)}
              >
                Registrarse
              </Link>
              <Link
                to="/login"
                className="p-4 md:p-0"
                onClick={() => setMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mostrar el mensaje de cierre de sesión */}
      {logoutMessage && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-4 rounded-md shadow-lg">
          {logoutMessage}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const [product, setProduct] = useState<{
    name: string;
    description: string;
    price: number;
    unit: string;
    imageFile: File | null;
  }>({
    name: 'Tomate',  
    description: '',
    price: 0,
    unit: 'libra', 
    imageFile: null, 
  });

  const [addMessage, setAddMessage] = useState<string | null>(null); // Estado para el mensaje de éxito

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProduct({
        ...product,
        imageFile: file,
      });
    }
  };

  const handleUnitChange = (unit: string) => {
    setProduct({
      ...product,
      unit: unit,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct({
      ...product,
      name: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!product.name || !product.description || product.price <= 0 || !product.imageFile) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }
  
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
  
    const newProduct = {
      id: Date.now(), 
      name: product.name,
      description: product.description,
      price: product.price,
      unit: product.unit,
      imageUrl: URL.createObjectURL(product.imageFile), 
      owner: user ? user.name : 'Anónimo',
    };

    storedProducts.push(newProduct);
  
    localStorage.setItem('products', JSON.stringify(storedProducts));

    // Mostrar el mensaje de éxito
    setAddMessage('Producto agregado exitosamente!');

    // Esperar 2 segundos antes de navegar
    setTimeout(() => {
      setAddMessage(null); // Limpiar el mensaje después de navegar
      navigate('/'); // Navegar a la página principal
    }, 2000); // Mantener el mensaje visible por 2 segundos
  };

  const productOptions = [
    'Tomate', 'Manzana', 'Banana', 'Pera', 'Uva', 
    'Zanahoria', 'Pepino', 'Lechuga', 'Espinaca', 
    'Pimiento', 'Cebolla', 'Papa', 'Flor de Izote', 'Coliflor', 
    'Calabaza','Huevo'
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Agregar Nuevo Producto</h2>

        {addMessage && (
          <div className="mb-4 p-2 text-white bg-green-500 rounded text-center">
            {addMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-gray-700">Nombre del Producto</label>
            <select
              id="name"
              name="name"
              value={product.name}
              onChange={handleNameChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            >
              {productOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm text-gray-700">Descripción</label>
            <input
              type="text"
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm text-gray-700">Precio por Unidad</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="mb-4">
            <span className="text-sm text-gray-700">Unidad de Medida:</span>
            <div className="flex items-center mt-3">
              <button
                type="button"
                onClick={() => handleUnitChange('libra')}
                className={`px-4 py-2 mr-4 rounded-md ${product.unit === 'libra' ? 'bg-custom-green text-white' : 'bg-gray-200'}`}
              >
                Libra
              </button>
              <button
                type="button"
                onClick={() => handleUnitChange('quintal')}
                className={`px-4 py-2 rounded-md ${product.unit === 'quintal' ? 'bg-custom-green text-white' : 'bg-gray-200'}`}
              >
                Quintal
              </button>
              <button
                type="button"
                onClick={() => handleUnitChange('docena')}
                className={`px-4 py-2 ml-4 rounded-md ${product.unit === 'docena' ? 'bg-custom-green text-white' : 'bg-gray-200'}`}
              >
                Docena
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm text-gray-700">Imagen del Producto</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md cursor-pointer"
              required
            />
            {product.imageFile && (
              <p className="mt-2 text-sm text-gray-600">Archivo seleccionado: {product.imageFile.name}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-custom-green text-white py-3 rounded-md mt-6 hover:bg-green-700 transition duration-200"
          >
            Agregar Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;

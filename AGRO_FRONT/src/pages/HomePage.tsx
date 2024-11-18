import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import granja from '../assets/fotogranja.jpg';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [searchByName, setSearchByName] = useState<string>('');
  const [filterByUnit, setFilterByUnit] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentComment, setCurrentComment] = useState<string>('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(storedProducts);
    setFilteredProducts(storedProducts);

    const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    setComments(storedComments);
  }, []);

  useEffect(() => {
    let results = products;

    if (searchByName) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchByName.toLowerCase())
      );
    }

    if (filterByUnit) {
      results = results.filter(
        (product) => product.unit.toLowerCase() === filterByUnit.toLowerCase()
      );
    }

    setFilteredProducts(results);
  }, [searchByName, filterByUnit, products]);

  const calculateAverageRating = (productId: string) => {
    const productComments = comments.filter(
      (comment) => comment.productId === productId
    );
    if (productComments.length === 0) return 0;
    const totalRating = productComments.reduce((total, comment) => {
      return total + (typeof comment.rating === "number" ? comment.rating : 0);
    }, 0);

    // Retorna el promedio redondeado a 1 decimal
    return totalRating / productComments.length;
  };



  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productToAdd = { ...selectedProduct, quantity };
    localStorage.setItem('cart', JSON.stringify([...cart, productToAdd]));
    navigate('/cart');
  };
  const handleAddComment = (productId: string, rating: number) => {
    const newCommentObj = {
      productId,
      user: user?.name || 'Anónimo',
      comment: currentComment,
      rating,
      date: new Date().toISOString(),
    };

    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setSuccessMessage("Comentario agregado satisfactoriamente");
    setCurrentComment('');
    setSelectedRating(0);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

  };
  const handleRatingChange = (rating: number) => {
    setSelectedProduct((prevProduct: any) => ({
      ...prevProduct,
      rating: rating,
    }));
  };

  const handleEditProduct = (productId: string, newPrice: number) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, price: newPrice } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    setSuccessMessage("Producto eliminado correctamente");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000)
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const productComments = comments.filter(
    (comment) => comment.productId === selectedProduct?.id
  );

  const averageRating = calculateAverageRating(selectedProduct?.id);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Imagen en la parte superior */}
      <div
        className="w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${granja})` }}
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Bienvenidos a AgroMarket</h1>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-4">Nuestra Misión y Visión</h2>
        <p className="text-lg text-gray-700 mb-4">
          En AgroMarket nos dedicamos a ofrecer los productos más frescos y de calidad de frutas y verduras salvadoreñas a través de internet, acercando la agricultura local al consumidor con un solo clic.
        </p>
      </div>
      <div className="container mx-auto p-20">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-6">Productos Disponibles</h2>

        {/* Filtros de búsqueda */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchByName}
            onChange={(e) => setSearchByName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <select
            value={filterByUnit}
            onChange={(e) => setFilterByUnit(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Filtrar por unidad</option>
            <option value="libra">Libra</option>
            <option value="quintal">Quintal</option>
            <option value="docena">Docena</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600">No hay productos que coincidan con la búsqueda.</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-gray-700 mt-2">
                  {product.price} {product.unit === 'libra' ? 'por libra' : product.unit === 'quintal' ? 'por quintal' : 'por docena'}
                </p>

                {/* Botones según el rol del usuario */}
                {user && user.role === 'Vendedor' ? (
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => openProductModal(product)}
                      className="bg-yellow-600 text-white text-center py-2 px-4 rounded-md"
                    >
                      Editar Producto
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-600 text-white text-center py-2 px-4 rounded-md"
                    >
                      Eliminar Producto
                      {successMessage && (
  <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-4 rounded-md shadow-lg">
    {successMessage}
  </div>
)}

                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => openProductModal(product)}
                    className="block mt-4 bg-green-600 text-white text-center py-2 rounded-md"
                  >
                    Ver Producto
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal de producto */}
        {selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <button
                onClick={closeProductModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-md"
              />
              <h2 className="text-2xl font-bold text-gray-800 mt-4">{selectedProduct.name}</h2>
              <p className="text-gray-600 mt-2">{selectedProduct.description}</p>

              {user && user.role === 'Vendedor' && (
                <div className="mt-4">
                  <label htmlFor="price" className="block text-gray-700">Precio:</label>
                  <input
                    type="number"
                    id="price"
                    value={selectedProduct.price}
                    onChange={(e) => {
                      const newPrice = parseFloat(e.target.value);
                      setSelectedProduct((prev: any) => ({ ...prev, price: newPrice }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                  />
                </div>
              )}
              {user && user.role === 'Vendedor' && (
                <button
                  onClick={() => handleEditProduct(selectedProduct.id, selectedProduct.price)}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md w-full"
                >
                  Guardar Cambios
                </button>
              )}

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Vendido por: <span className="font-semibold">{"Anonimo"}</span>
                </p>
                <label htmlFor="quantity" className="block text-gray-700">Cantidad:</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Promedio de Calificación:</h3>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-gray-400 ${averageRating >= star ? 'text-yellow-500' : ''}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mt-2">
                  {productComments.length > 0
                    ? `Calificación promedio: ${averageRating.toFixed(1)} de 5`
                    : 'Aún no hay calificaciones.'}
                </p>
              </div>


              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Comentarios:</h3>
                {user && user.role === 'Comprador' && (
                  <div className="mt-4">
                    <textarea
                      value={currentComment}
                      onChange={(e) => setCurrentComment(e.target.value)}
                      placeholder="Escribe tu comentario aquí..."
                      className="w-full p-2 border border-gray-300 rounded"
                      rows={3}
                    ></textarea>
                    <div className="mt-2 flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer text-gray-400 ${selectedProduct.rating >= star ? 'text-yellow-500' : ''}`}
                          onClick={() => handleRatingChange(star)}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => handleAddComment(selectedProduct.id, selectedProduct.rating)}
                      className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md"
                    >
                      Añadir Comentario
                      {successMessage && (
                        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-4 rounded-md shadow-lg">
                          {successMessage}
                        </div>
                      )}

                    </button>

                  </div>
                )}

                <div className="mt-4 max-h-20 overflow-y-auto">
                  {productComments.length > 0 ? (
                    <ul>
                      {productComments.map((comment) => (
                        <li key={comment.date} className="border-b py-2">
                          <p className="text-sm font-semibold">{comment.user}</p>
                          <div className="flex items-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`cursor-pointer ${comment.rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                                onClick={() => setSelectedRating(star)}
                              />
                            ))}
                          </div>
                          <p className="mt-1 text-gray-600">{comment.comment}</p>
                        </li>
                      ))}

                    </ul>
                  ) : (
                    <p className="text-gray-600 mt-4">No hay comentarios aún.</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-6 bg-green-600 text-white w-full py-2 rounded-md"
              >
                Agregar al Carrito
              </button>
              <button
                onClick={closeProductModal}
                className="mt-2 bg-gray-300 text-gray-800 w-full py-2 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

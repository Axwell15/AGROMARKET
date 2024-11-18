import './pView.style.css';
import {useState, useEffect} from 'react';
import {getProduct, buyproduct} from '../../helpers/pView';

const productView = ({...props }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    getProduct().then((res) => {
      setProduct(res.product);
    });
  }, []);
  return (
    <div className='product-view' {...props}>
      <figure className='product-image'>
        <img src={product.image} alt={product.name} />
      </figure>
      <div className='product-info'>
        <h2 className='product-title'>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.category?.name}</p>
        <p>{product.measureUnit?.name} {product.quantity}</p>
        <p>${product.price}</p>
        <div className='buy-btn'>
          <button onClick={() => buyproduct(product)}>Comprar</button>
        </div>
      </div>
    </div>
  )
};//✅

export default productView;
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './card.style.css';
import {deleteProduct} from '../../helpers/card'
import Swal from  'sweetalert2';

//✅
const card = ({ hookNavigate, owner, card, ...props }) => {
    const [product, setProduct] = useOutletContext();
  const navigate = hookNavigate();
  return (
    <article className='card' {...props}>
      <figure>
        <img src={card.image} alt="img" className='card-image' onClick={() => {
          owner ? setProduct(card) : setProduct(null);
          owner ? navigate('/home/update-product') : navigate(`/home/item/${card._id}`)}} />
      </figure>
      <div className='card-content'>
        <h3 className='card-title'>{card.name}</h3>
        <p>{card.category?.name}</p>
        <p className='self-end'>${card.price}</p>
      </div>
      <button className={`btn-del ${!owner && 'hidden'}`} onClick={async () => {
        const res = await deleteProduct(card)
        if(res){
          const res = await Swal.fire({
            title: 'Producto eliminado',
            icon: 'success',
            confirmButtonText: 'Ok'
          })

          if(res.isConfirmed){
            navigate('/home');
          }
        }
      }}>eliminar</button>
    </article>
  )
}

export default card
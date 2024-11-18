import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import { addPicture, CreateProduct, getCategories, GetUnits, protectRoute, UpdateProduct } from '../../helpers/selling';
import Button from '../Button/button';
import './selling.style.css';

const selling = () => {
    const [product, setProduct] = useOutletContext();
    const [category, setCategory] = useState([]);
    const [unitOfMeasure, setUnitOfMeasure] = useState([]);
    const [img, setImg] = useState(product?.image || 'https://s1.eestatic.com/2020/05/29/ciencia/nutricion/arroz-seguridad_alimentaria-enfermedades_493711911_152762639_1024x576.jpg');

    const [name, setName] = useState(() => product?.name || '');
    const [description, setDescription] = useState(() => product?.description || '');
    const [quantity, setQuantity] = useState(() => product?.quantity || '');
    const [price, setPrice] = useState(() => product?.price || '');
    const [stock, setStock] = useState(() => product?.stock || '');
    const [categorySelected, setCategorySelected] = useState(() => product?.category?.name || category[0]?.name);
    const [unitOfMeasureSelected, setUnitOfMeasureSelected] = useState(() => product?.unitOfMeasure?.name || unitOfMeasure[0]?.name);

    useEffect(() => {
        protectRoute()
            .then(() => {
                getCategories()
                    .then((data) => {
                        setCategory(data);
                    })

                GetUnits()
                    .then((data) => {
                        setUnitOfMeasure(data);
                    })
            })
    }, [product]);
    return (
        <div className='selling'>
            <h3 className='selling-title'>{product ? 'EDITAR' : 'VENDER'}</h3>
            <div className='sell-container'>
                <figure className='img-product'>
                    <img src={img} alt="product image" />
                </figure>
                <form className='selling-form'
                    onSubmit={(e) => {
                        e.preventDefault();
                        product ? UpdateProduct(e, img, product) : CreateProduct(e, img);
                        e.target.reset();
                        setImg('https://picsum.photos/1024');
                    }}>
                    <Button classes="btn-selling" type='button' onClick={async () => {
                        const result = await addPicture();
                        if (result) {
                            switch (result.type) {
                                case 'local':
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        setImg(e.target.result);
                                    }
                                    reader.readAsDataURL(result.file);
                                    break;
                                case 'url':
                                    setImg(result.url);
                                    break;
                            }
                        }
                    }}>
                        Agregar fotografia
                    </Button>

                    <TextField id='name' variant='outlined' className='sell-info' label="Nombre"
                        value={name} onChange={(e) => setName(e.target.value)} required />

                    <TextField id='description' variant='outlined' className='sell-info' label="Descripcion"
                        value={description} onChange={(e) => setDescription(e.target.value)} required />

                    <Autocomplete
                        id='category'
                        options={category}
                        className='sell-info'
                        value={categorySelected}
                        onChange={(e, value) => setCategorySelected(value)}
                        renderInput={(params) => <TextField {...params} label="categoria" required />}
                    />

                    <Autocomplete
                        id='unitOfMeasure'
                        options={unitOfMeasure}
                        className='sell-info'
                        value={unitOfMeasureSelected}
                        onChange={(e, value) => setUnitOfMeasureSelected(value)}
                        renderInput={(params) => <TextField {...params} label="unidad de medida" required />}
                    />

                    <TextField id='amount' variant='outlined' InputLabelProps={{ shrink: true }} inputProps={{ inputMode: 'numeric' }} min='0' className='sell-info'
                        value={quantity} onChange={(e, value) => setQuantity(value)} label="cantidad" required />

                    <TextField id='price' variant='outlined' InputLabelProps={{ shrink: true }} inputProps={{ inputMode: 'decimal' }} className='sell-info' label="precio"
                        value={price} onChange={(e, value) => setPrice(value)} required />

                    <TextField id='stock' variant='outlined' InputLabelProps={{ shrink: true }} inputProps={{ inputMode: 'numeric' }} min='0' className='sell-info'
                        value={stock} onChange={(e, value) => setStock(value)} label="cantidad disponible" required />

                    <Button classes='btn-selling' id='submit-product' type='submit'>
                        Publicar
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default selling
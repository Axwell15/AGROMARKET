import './CardContainer.style.css';
import { useOutletContext } from 'react-router-dom';
import { getFeed } from '../../helpers/feed'
import { useState, useEffect } from "react";
import Card from "../card/card";

//✅
const CardContainer = ({ hookNavigate, typeref }) => {
    const [products, setProducts] = useState([]);
    const [contextValue, setContextValue] = useOutletContext();
    useEffect(() => {
        getFeed(typeref, contextValue).then((res) => {
            res.products.reverse();
            setProducts(res.products);
        });
    }, [typeref]);
    return (
        <div className="card-container">
            {products?.map((product) => (
                <Card card={product} key={product._id} owner={(typeref === 'user')} hookNavigate={hookNavigate} />
            ))}
        </div>
    );
};

export default CardContainer;
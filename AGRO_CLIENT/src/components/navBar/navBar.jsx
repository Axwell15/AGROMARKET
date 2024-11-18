import { memo } from 'react';
import { Category, MonetizationOn, CreditCard, AccountCircle, Inventory, Logout } from '@mui/icons-material';
import {Checklogout} from '../../helpers/validate'
import './navBar.style.css';

export const navBarOptions = 
[
    {
        Name: 'Mis productos',
        Icon: Inventory,
        id: 'myproducts'
    },
    {
        Name: 'Categorias',
        Icon: Category,
        id: 'category'
    },
    {
        Name: 'Vender',
        Icon: MonetizationOn,
        id: 'sell'
    },
    {
        Name: 'Creditos',
        Icon: CreditCard,
        id: 'credit'
    },
    {
        Name: 'Perfil',
        Icon: AccountCircle,
        id: 'profile'
    }
]

//✅
const navBar = ({ className, value, hookNavigate }) => {
    const navigate = hookNavigate();
    return (
        <div className={`navBar ${className}`}>
            {navBarOptions?.map((option) => {
                const Icon = option.Icon;
                return (
                    <button key={option.id} id={option.id} className='navBtn' onClick={() => navigate(`/home/${option.id}`)}>
                        <h2 className={`navOpt ${!value && "scale-0"}`}>{option.Name}</h2>
                        <Icon className="navIcon" />
                    </button>
                )
            })}
            <button id='logout' className='navBtn' onClick={async () => {
                const band = await Checklogout();
                if (band) {
                    navigate('/');
                }
            }}>
                <h2 className={`navOpt ${!value && "scale-0"}`}>Cerrar sesion</h2>
                <Logout className="navIcon" />
            </button>
        </div>
    )
}

export default memo(navBar);
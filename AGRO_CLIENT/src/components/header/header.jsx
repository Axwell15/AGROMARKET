import { memo } from 'react'
import './header.style.css'

//✅
const header = ({ Hook, Value, hookNavigate }) => {
    const navigate = hookNavigate();
    return (
        <div className='header'>
            <h1 className="headerTitle" onClick={() => navigate('/home')}>AGROMARKET</h1>
            <div className="header-btn">
                <button>
                    <span className="material-symbols-outlined header-Icon hidden">
                        search
                    </span>
                </button>
                <button onClick={() => Hook(!Value)}>
                    <span className="material-symbols-outlined header-Icon">
                        menu
                    </span>
                </button>
            </div>
        </div>
    )
};

export default memo(header);
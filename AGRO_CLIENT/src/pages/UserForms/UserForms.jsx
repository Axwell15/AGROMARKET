import './UserForms.style.css';
import { memo, useState } from "react";
import BgForms from '../../assets/images/bg-forms.jpg';
import { Outlet } from 'react-router-dom';

const UserForms = () => {
    return (
        <div className='userForms'>
            <div className='Forms'>
                <h1 className='title'>AGROMARKET</h1>
                <Outlet />
            </div>
            <figure className='bg-side-forms'>
                <img src={BgForms} alt="imagen" />
            </figure>
        </div>
    )
};

export default memo(UserForms);
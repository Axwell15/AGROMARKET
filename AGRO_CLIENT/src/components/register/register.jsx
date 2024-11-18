import './register.style.css';
import React from 'react';
import Button from '../Button/button';
import { CheckRegister } from '../../helpers/validate';

//✅
const register = ({hookNavigate}) => {
    const navigate = hookNavigate();
    return (
        <form className='container-register-form' method='POST' onSubmit={async (e) => {
            e.preventDefault();
            const band = await CheckRegister(e);
            if (band) {
                navigate('/');
            }
        }}>
            <label className='info-register'>
                Usuario
                <input name="username" type="text" id="register-user" required />
            </label>

            <label className='info-register'>
                Correo
                <input name="email" type="email" id="register-email" required />
            </label>

            <label className='info-register'>
                Direccion
                <input name="address" type="address" id="register-address" required />
            </label>

            <label className='info-register'>
                Telefono
                <input name="phone" type="tel" id="register-phone" required />
            </label>

            <label className='info-register'>
                Contraseña
                <input name="password" type="password" id="register-password" minLength='6' required />
            </label>

            <label className='info-register'>
                Confirmar contraseña
                <input name="confirm-password" type="password" id="password-confirm" required />
            </label>

            <Button id="register-button" type="submit">
                Registrarse
            </Button>
        </form>
    )
}

export default register
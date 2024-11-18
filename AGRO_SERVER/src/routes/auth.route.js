import express from "express";
import { body } from 'express-validator';
import { login, register, refreshToken, logout } from "../controllers/auth.controller.js";
import { authValidate } from "../middlewares/authValidate.js";

const router = express.Router();

router.post('/login', 
    [
        body('username', 'Username is required').not().isEmpty().trim(),
        body('password', 'Password is required').not().isEmpty(),
        authValidate
    ],
login)//✅

router.post(
    '/register',
    [
        body('username', 'Username is required').not().isEmpty(),
        body('email', 'Email is required').trim().isEmail().normalizeEmail().not().isEmpty(),
        body('address', 'Address is required').not().isEmpty(),
        body('phone', 'Phone is required').not().isEmpty(),
        body('password', 'Password is required').not().isEmpty(),
        authValidate
    ],
    register
);//✅

router.get('/refresh',refreshToken)//✅

router.get('/logout', logout )//✅

export default router;
import { Transaction } from '../models/transaction.js';
import { Cart } from '../models/cart.js';
import jwt from "jsonwebtoken";

export const createTransaction = async (req, res) => {
    try {
        const authToken = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(authToken, process.env.SECRET_KEY);
        let { type, value } = req.body;
        if (type === 'compra' || type === 'retiro') {
            value *= -1;
        }
        const transaction = await Transaction.create({
            type,
            value,
            user: id
        });
        return res.status(200).json({ transaction });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error de server" });
    }
};

export const getTransactionByUser = async (req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const alltransactions = await Transaction.find({ user: id }).lean();
        return res.status(200).json({ alltransactions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error de server" });
    }
};

// Cart controllers
export const addToCart = async (req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ user: id });

        if (cart) {
            // Update existing cart
            const productIndex = cart.products.findIndex(p => p.productId === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        } else {
            // Create new cart
            cart = new Cart({
                user: id,
                products: [{ productId, quantity }]
            });
        }

        await cart.save();
        return res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getCartByUser = async (req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const cart = await Cart.findOne({ user: id }).lean();
        return res.status(200).json({ cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const checkout = async (req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const cart = await Cart.findOne({ user: id }).populate('products.product');

        if (!cart) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // Calculate total
        cart.calculateTotal();

        // Create a transaction
        const transaction = await Transaction.create({
            type: 'purchase',
            value: cart.total,
            user: id,
            products: cart.products
        });

        // Clear the cart
        cart.products = [];
        cart.total = 0;
        await cart.save();

        return res.status(200).json({ transaction });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};
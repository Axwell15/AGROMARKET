import mongoose from "mongoose";
const { Schema, model} = mongoose;


const purchaseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    total: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Purchase = model("Purchase", purchaseSchema);
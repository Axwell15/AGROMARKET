import mongoose from "mongoose";
const { Schema, model } = mongoose;

const transactionSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Transaction = model("Transaction", transactionSchema);
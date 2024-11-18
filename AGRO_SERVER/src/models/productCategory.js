import mongoose from "mongoose";
const { Schema, model} = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: "http://via.placeholder.com/150x150"
    }
});

export const Category = model("Category", categorySchema);
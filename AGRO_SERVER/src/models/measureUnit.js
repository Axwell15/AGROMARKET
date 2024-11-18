import mongoose from "mongoose";
const { Schema, model} = mongoose;

const measureUnitSchema = 
    new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        }
    });

export const MeasureUnit = model("MeasureUnit", measureUnitSchema);

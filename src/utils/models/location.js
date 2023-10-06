import mongoose from "mongoose";

const productModel = new mongoose.Schema({
    latitude:String,
    long:String,
    name:String,
})

export const Location =  mongoose.models.locations || mongoose.model("locations",productModel)
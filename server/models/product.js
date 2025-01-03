import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    id:Number,
    title: String,
    price: Number,
    description:String,
    category:String,
    image: String,
    sold: Boolean,
    dateOfSale:String,
});

const Product= mongoose.model("cart", productSchema)

export default Product;
import mongoose from "mongoose";


//structure of product document
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

//model creation
const Product = mongoose.model('Products', productSchema);

export default Product;
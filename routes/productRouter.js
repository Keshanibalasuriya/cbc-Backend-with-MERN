import express from 'express';
import {
    getProductByName,
    createProduct,
    getProducts,
    deleteProduct,
    deleteAllProducts
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);

// DELETE all products
productRouter.delete("/", deleteAllProducts);

// GET one
productRouter.get("/:name", getProductByName);

// DELETE one
productRouter.delete("/:name", deleteProduct);

export default productRouter;

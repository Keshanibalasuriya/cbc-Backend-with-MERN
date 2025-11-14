import express from 'express';
import {getProductByName,createProduct, getProducts, deleteProduct} from '../controllers/productController.js';   

//create router productRouter
const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);

//delete product by name - parameterized route
productRouter.delete ("/:name",deleteProduct);
productRouter.get("/:name", getProductByName);

export default productRouter;
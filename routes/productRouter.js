import express from 'express';
import { getAllProducts, createProduct} from '../controllers/productController.js';  

const productRouter = express.Router();

// Routes
productRouter.post('/', createProduct); // Create new product
productRouter.get('/', getAllProducts); // Get all products

export default productRouter;
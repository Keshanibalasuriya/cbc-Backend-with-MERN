import Product from "../models/product.js";
import { isAdmin } from "../controllers/userController.js";

// Create new product (Admins ONLY)
export function createProduct(req, res) {

    // Check login
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized. No logged user.' });
    }

    // Allow only admins
    if (!isAdmin(req)) {
        return res.status(403).json({ error: 'Forbidden. Admins only.' });
    }

    const newProduct = new Product(req.body);

    newProduct.save()
        .then(() => res.json({ message: 'Product added successfully!' }))
        .catch(err => res.status(400).json({ error: err.message }));
}


//get products
export function getAllProducts(req, res) {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json({ error: err.message }));
}

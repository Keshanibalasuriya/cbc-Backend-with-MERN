import Product from "../models/product.js";

// Create new product
export function createProduct(req, res) {

    if (req.user == null) {
        return res.status(401).json({ error: 'Unauthorized ,No Logged User' });
    }

    if (req.user.isAdmin) {
        return res.status(403).json({ error: 'Forbidden , Admins Only' });
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
import Product from "../models/product.js";

// GET all products
export function getProducts(req, res) {
    Product.find()
        .then(productList => {
            res.json({ list: productList });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
}

// POST create product
export function createProduct(req, res) {
    const productData = req.body;
    const newProduct = new Product(productData);

    newProduct.save()
        .then(() => res.json({ message: 'Product created successfully!' }))
        .catch(err => res.status(400).json({ error: err.message }));
}

// DELETE product by name
export function deleteProduct(req, res) {
    Product.deleteOne({ name: req.body.name })
        .then(() => res.json({ message: 'Product deleted successfully!' }))
        .catch(err => res.status(400).json({ error: err.message }));
}

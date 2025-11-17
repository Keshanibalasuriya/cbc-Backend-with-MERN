import Product from "../models/product.js";

// GET all products
export async function getProducts(req, res) {
    try {
        const productList = await Product.find();
        res.json({ list: productList });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// CREATE product
export async function createProduct(req, res) {
    // Authentication user
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized, No Logged User' });
    }

    // Authorization admin
    if (req.user.type !== "admin") {
        return res.status(403).json({ error: 'Forbidden, Admins Only' });
    }

    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json({ message: 'Product created successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// DELETE product by name
export async function deleteProduct(req, res) {
    const productName = req.params.name;

    try {
        const result = await Product.deleteOne({ name: productName });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// DELETE all products
export async function deleteAllProducts(req, res) {
    try {
        const result = await Product.deleteMany({});
        res.json({
            message: "All products deleted successfully!",
            deletedCount: result.deletedCount
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// GET product by name
export async function getProductByName(req, res) {
    const productName = req.params.name;

    try {
        const productList = await Product.find({ name: productName });
        if (productList.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ list: productList });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
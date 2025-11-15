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

    //console.log(req.user); // Log the authenticated user info   

    const productData = req.body;
    const newProduct = new Product(productData);

    newProduct.save()
        .then(() => res.json({ message: 'Product created successfully!' }))
        .catch(err => res.status(400).json({ error: err.message }));
}

// DELETE product 
export function deleteProduct(req, res) {
    Product.deleteOne({ name: req.params.name }) //parameterized route
        .then(() => res.json({ message: 'Product deleted successfully!' }))
        .catch(err => res.status(400).json({ error: err.message }));
}




export function getProductByName(req, res) {
  const productName = req.params.name;

  Product.find({ name: productName })
    .then(productList => {
      if (productList.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ list: productList });
    })
    .catch(err => res.status(400).json({ error: err.message }));
}


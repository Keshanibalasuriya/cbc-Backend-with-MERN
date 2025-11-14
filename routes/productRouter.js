import express from 'express';

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
    console.log('GET request received at /products');
    res.json({ message: 'products get route working!' });
});

productRouter.post("/", (req, res) => {
    console.log('POST request received at /products');
    res.json({ message: 'products post route working!' });
}   );

export default productRouter;   
import Order from '../models/order.js';
import Product from '../models/product.js';
import { isCustomer } from '../controllers/userController.js';

export async function createOrder(req, res) {
    try {
        // Only customers can create orders
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized. No logged user.' });
        }

        // if (!isCustomer(req)) {
        //     return res.status(403).json({ message: 'Access denied. Customers only.' });
        // }

        // Fetch the latest order
        const latestOrder = await Order.find().sort({ date: -1 }).limit(1);

        let newOrderId;

        if (latestOrder.length === 0) {
            newOrderId = "CBC0001";
        } else {
            const latest = latestOrder[0].orderID;      // e.g. CBC0012
            const number = parseInt(latest.slice(3));   // extract 0012 → 12
            const next = (number + 1).toString().padStart(4, "0");
            newOrderId = `CBC${next}`;
        }

        // Prepare order data
        const newOrderData = req.body;

        //converting simple to structured arry

        const newProductArray = [];

        for (let i = 0; i < newOrderData.orderItems.length; i++) {
            //console.log(newOrderData.orderItems[i]);
            const product=await Product.findOne
            ({
                productID: newOrderData.orderItems[i].productID  
            });
                

            if (product==null) {
                return res.status(404).json({ message: `Product with ID ${newOrderData.orderItems[i].productID} not found` });
            }


           newProductArray[i] = {
                productID: product.productID,
                productName: product.productName,
                price: product.price,
                quantity: newOrderData.orderItems[i].quantity,
                image: product.image
           };

        }

        //console.log(newProductArray);


        newOrderData.orderID=newOrderId,
        newOrderData.email=req.user.email

        // Save new order
        const newOrder = new Order(newOrderData);
        await newOrder.save();

        // 🔻 Reduce stock for each product
        for (let i = 0; i < newProductArray.length; i++) {
            const item = newProductArray[i];

            await Product.updateOne(
                { productID: item.productID },
                { $inc: { stock: -item.quantity } }
            );
        }


        return res.status(201).json({
            message: "Order created successfully",
            orderID: newOrderId
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

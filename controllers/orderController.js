import Order from '../models/order.js';
import { isCustomer } from '../controllers/userController.js';

export async function createOrder(req, res) {
    try {
        // Only customers can create orders
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized. No logged user.' });
        }

        if (!isCustomer(req)) {
            return res.status(403).json({ message: 'Access denied. Customers only.' });
        }

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
        const newOrderData = {
            ...req.body,
            orderID: newOrderId,
            email: req.user.email,
        };

        // Save new order
        const newOrder = new Order(newOrderData);
        await newOrder.save();

        return res.status(201).json({
            message: "Order created successfully",
            orderID: newOrderId
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

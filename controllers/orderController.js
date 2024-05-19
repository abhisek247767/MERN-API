const Order = require('../models/Order');
const Product = require('../models/Product');

// Controller function to place an order
const placeOrder = async (req, res) => {
    try {
        const { items, customerName, customerAddress, customerEmail } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items in the order' });
        }

        let totalAmount = 0;
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
            totalAmount += product.price * item.quantity;
        }

        const order = new Order({
            items,
            totalAmount,
            customerName,
            customerAddress,
            customerEmail
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    placeOrder,
};

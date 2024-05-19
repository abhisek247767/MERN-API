const Product = require('../models/Product');

// Controller function to create a list of products
const createProducts = async (req, res) => {
    try {
        const products = req.body.products;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Products array is required' });
        }

        const createdProducts = await Product.insertMany(products);
        res.status(201).json(createdProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to search products
const searchProducts = async (req, res) => {
    try {
        const { store, name, category } = req.query;
        let query = {};

        if (store) {
            query.store = store;
        }
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive regex search
        }
        if (category) {
            query.category = category;
        }

        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProducts,
    getAllProducts,
    searchProducts,
};

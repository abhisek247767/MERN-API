const express = require('express');
const router = express.Router();
const { createProducts, getAllProducts, searchProducts } = require('../controllers/productController');

// Route to create a list of products
router.post('/products', createProducts);

// Route to get all products
router.get('/products', getAllProducts);

// Route to search products
router.get('/search', searchProducts);

module.exports = router;

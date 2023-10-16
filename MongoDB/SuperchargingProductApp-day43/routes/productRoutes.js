const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to create a new product
router.post('/', productController.createProduct);

// Route to retrieve a list of products
router.get('/', productController.getProducts);

// Route to retrieve a single product by ID
router.get('/:productId', productController.getProductById);

// Route to update a product by ID
router.put('/:productId', productController.updateProduct);

// Route to delete a product by ID
router.delete('/:productId', productController.deleteProduct);

module.exports = router;

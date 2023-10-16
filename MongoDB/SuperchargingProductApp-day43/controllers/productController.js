const Product = require('../models/Product'); // Assuming your model is in a file named Product.js

// Controller function to create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
     res.status(201).send(product);
    // res.status(201).render('addProduct', { product });
  } catch (error) {
    res.status(400).json({ error: 'Unable to create product' });
  }
};

// Controller function to retrieve a list of products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products)
    // res.status(200).render('home', { products });
  } catch (error) {
    res.status(400).json({ error: 'Unable to retrieve products' });
  }
};

// Controller function to retrieve a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Unable to retrieve product' });
  }
};

// Controller function to update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update product' });
  }
};

// Controller function to delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    await Product.findByIdAndRemove(productId);
    res.status(204).send(); // Successful deletion, no content to return
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete product' });
  }
};

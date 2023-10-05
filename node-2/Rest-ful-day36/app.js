const express = require('express');
const path = require("path");
const app=express();
const cacheControl = require('cache-control');
// Serve static files from the "public" directory
const staticPath = path.join(__dirname, "public", "img");
const cssPath = path.join(__dirname, "public", "css");

// Serve static assets from the 'public' directory with caching headers
// Serve static files (images) with caching headers
app.use('/img',  express.static(staticPath, {
  maxAge: "1y", // Set the maximum age for caching (1 day in this example)
  etag: true, // Enable ETag for RESTful API
})
);
// Serve CSS files with caching headers
app.use(
  "/css",
  express.static(cssPath, {
    maxAge: "1y", // Set the maximum age for caching (1 day in this example)
    etag: true, // Enable ETag for RESTful API
  })
);
app.set('view engine', 'ejs');
// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
const port = process.env.PORT || 3000;
let products = [
    { id: 1, description:'red iphone 12 Pro neuf ', name: 'iPhone 12 Pro', price: 1099.99, image:'1.jpg' },
    { id: 2, description:'black Samsung Galaxy S21 2021', name: 'Samsung Galaxy S21', price: 999.99, image:'2.jpg' },
    { id: 3, description:'white Sony PlayStation 5 2022', name: 'Sony PlayStation 5', price: 499.99, image:'3.jpg' },
    { id: 4, description:'black MacBook Pro 16 2025', name: 'MacBook Pro 16', price: 2399.99, image:'4.jpg' },
    { id: 5, description:'grey DJI Mavic Air 2 2002', name: 'DJI Mavic Air 3', price: 799.99, image:'5.jpg' },
];

app.get('/', (req, res, next) => {
    res.render('home', {products: products});
  });
  app.get("/products", (req, res, next) => {
    res.render("home", { products: products });
  });
  
  app.get("/products/search", (req, res, next) => {
    const searchQuery = req.query.item;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    let filteredProducts = products;
  
    if (filteredProducts) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
    res.send(filteredProducts);
  });
  app.get('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    // Use the productId to fetch the corresponding product from the database
    const productFound = products.find((product) => product.id === productId);
    if(productFound){
        res.render('productDetails', {productFound});
    }else{
        res.status(404).send({ error: 'Product not found' });
    }    
  });
  app.post("/products", (req, res, next) => {
    const newProduct = req.body;
    if (!newProduct || !newProduct.name || !newProduct.price) {
      const error = new Error("Invalid product data. Please provide a valid product name and price.");
      error.statusCode = 400;
      next(error);
    }
    products.push(newProduct);
    res.send(products);
  });
  
  app.put("/products/:id", (req, res, next) => {
    const productId = parseInt(req.params.id); // Convert the ID parameter to an integer.
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      const error = new Error(`Product with ID ${productId} not found. Editing product failed.`);
      error.statusCode = 404;
      next(error);
    }
    const updatedProduct = req.body; // Assuming the request body contains the updated product data.
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    res.send(products[productIndex]);
  });
  
  app.delete("/products/:id", (req, res, next) => {
    const productId = parseInt(req.params.id); // Convert the ID parameter to an integer.
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      const error = new Error(`Product with ID ${productId} not found. Deleting product failed.`);
      error.statusCode = 404;
      next(error);
    }
    products.splice(productIndex, 1);
    res.send({ message: "Product deleted successfully" });
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json(message);
  });
  
app.listen(port, () => {
    console.log('Server is listening on port '+ port);
  });
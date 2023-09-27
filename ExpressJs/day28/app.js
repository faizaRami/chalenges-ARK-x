
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Logging Middleware
const loggingMiddleware=(req, res, next)=> {
    const currentDate = new Date();
    console.log(`[${currentDate.toISOString()}] ${req.method} ${req.url}`);
    next();
}

app.use(loggingMiddleware); 

app.use(express.json());
// Sample data for products (replace with your data source)
let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  ];
// GET request to retrieve a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  // Use the productId to fetch the corresponding product from the database
  const productIndex = products.find((product) => product.id === productId);
if(productIndex){
    res.send(productIndex);
}else{
     res.status(404).send({ error: 'Product not found' });
}    
  // Return the product information as the response
  
});

// GET request to search for products based on query parameters
app.get('/products', (req, res) => {
  
  res.send(products);
});

// Route to search for products based on query parameters

app.get('/products/search', (req, res) => {

    const { q, minPrice, maxPrice } = req.query;
    let filteredProducts = products;
  
    if (q) {
      // Filter by name containing the query string
      filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(q.toLowerCase())
      );
    }
  
    if (minPrice) {
      // Filter by minimum price
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= parseFloat(minPrice)
      );
    }
  
    if (maxPrice) {
      // Filter by maximum price
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= parseFloat(maxPrice)
      );
    }
  
    res.json(filteredProducts);
  });
  
  // Route to create a new product
  app.post('/products', (req, res) => {
    const produit={}
    produit.id = products.length+1;
   produit.name = req.body.name; 
   produit.price = req.body.price; 

    products.push(produit);
    res.status(201).json(produit);
  });
  
  // Route to update the details of a specific product by ID
  app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
    const productIndex = products.findIndex((product) => product.id === productId);
  
    if (productIndex === -1) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      products[productIndex] = { id: productId, name, price };
      console.log(products[productIndex]);
      res.json(products[productIndex]);
    }
  });
  
  // Route to delete a specific product by ID
  app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((product) => product.id === productId);
  
    if (productIndex === -1) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      products.splice(productIndex, 1);
      res.status(204).send(`Product : ${req.params.name} is deleted`);
    }
  });
  const errorHandlerMiddleware=(err, req, res, next)=> {
    console.error(err.stack);
    res.status(500).send('An error occurred! Please try again.');
}

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log('Server is listening on port '+ port);
});
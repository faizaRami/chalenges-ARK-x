const express = require('express');
const app=express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
const port = process.env.PORT || 3000;
let products = [
    { id: 1, description:'red iphone 12 Pro neuf ', name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, description:'black Samsung Galaxy S21 2021', name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, description:'white Sony PlayStation 5 2022', name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, description:'black MacBook Pro 16 2025', name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, description:'grey DJI Mavic Air 2 2002', name: 'DJI Mavic Air 2', price: 799.99 },
];

app.get('/', (req, res) => {
    res.render('home', {products});
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
  
app.listen(port, () => {
    console.log('Server is listening on port '+ port);
  });
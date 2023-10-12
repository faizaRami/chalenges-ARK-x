const express = require('express');
const port = process.env.PORT || 3000;
const route =  require("./routes/route")
const {run} = require("./db")
const app = express();

app.use(express.json());
app.use(route)// const cacheControl = require('cache-control');
// const myDB = client.db("products");
// const myColl = myDB.collection("phones");
// // Serve static files from the "public" directory
// app.use(express.static('public'))

// // Serve static assets from the 'public' directory with caching headers
// app.use('/img', cacheControl({maxAge:36000}));

// app.set('view engine', 'ejs');

// const port = process.env.PORT || 3000;
// let products = [
//     { id: 1, description:'red iphone 12 Pro neuf ', name: 'iPhone 12 Pro', price: 1099.99, image:'1.jpg' },
//     { id: 2, description:'black Samsung Galaxy S21 2021', name: 'Samsung Galaxy S21', price: 999.99, image:'2.jpg' },
//     { id: 3, description:'white Sony PlayStation 5 2022', name: 'Sony PlayStation 5', price: 499.99, image:'3.jpg' },
//     { id: 4, description:'black MacBook Pro 16 2025', name: 'MacBook Pro 16', price: 2399.99, image:'4.jpg' },
//     { id: 5, description:'grey DJI Mavic Air 2 2002', name: 'DJI Mavic Air 3', price: 799.99, image:'5.jpg' },
// ];

// app.get('/', (req, res) => {
//     res.render('home', {products});
//   });

//   app.get('/product/:id', (req, res) => {
//     const productId = parseInt(req.params.id);
//     // Use the productId to fetch the corresponding product from the database
//     const productFound = products.find((product) => product.id === productId);
//     if(productFound){
//         res.render('productDetails', {productFound});
//     }else{
//         res.status(404).send({ error: 'Product not found' });
//     }    
//   });
  
//  app.post('/',async (req, res) => {
//   const {name, description, price, image} = req.body
//   res.send({name, description, price, image});
//      const db= await run()

//       let newProduct={
//             name,
//             description,
//             price,
//             image
//       }
//       console.log(newProduct);
//       const result = await db.collection("phones").insertOne(newProduct);
//       console.log(result);

//       console.log(
//          `A document was inserted with the _id: ${result.insertedId}`,
//       );
//       // products.push(newProduct)
//       res.status(201).json(newProduct); 
//  });

app.listen(port, () => {
    console.log('Server is listening on port '+ port);
  });
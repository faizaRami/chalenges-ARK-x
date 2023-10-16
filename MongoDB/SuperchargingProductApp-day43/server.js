const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const ejs = require('ejs');
const productRoutes = require('./routes/productRoutes');
const app = express();
const port = process.env.PORT || 3000;

// Connect to your MongoDB database
const dbURI = 'mongodb://127.0.0.1:27017/products'; // Replace with your MongoDB database URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Handle MongoDB connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Set the view engine to EJS
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views'); // Set the views directory

// Mount product routes
app.use(productRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

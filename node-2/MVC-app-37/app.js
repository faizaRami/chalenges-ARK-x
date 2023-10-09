const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'faiza99',
  resave: false,
  saveUninitialized: true,
}));
app.set('view engine', 'ejs');

// Registering the Auth Controller
const authController = require('./controllers/authController');
app.use(authController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const express = require('express');
// const session = require('express-session');
// const cookieParser = require('cookie-parser')
// const csurf = require('csurf');
// const jwt = require('jsonwebtoken');

// const app = express();

// // Middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(session({ secret: 'faiza99', resave: false, saveUninitialized: false }));
// app.use(cookieParser());
// app.set('view engine', 'ejs');
// app.use(csurf({ cookie: true }));

// //user data
// const users = [
//   { id: 1, username: 'user1', password: 'u123', role: 'user' },
//   { id: 2, username: 'admin', password: 'a123', role: 'admin' },
// ];
// // Routes
// app.get('/', (req, res) => {
//   res.render('index', { csrfToken: req.csrfToken() });
// });

// app.post('/login', (req, res) => {
//   // Validate and authenticate the user
//  [
//     body('username').notEmpty().withMessage('Username is required'),
//     body('password').notEmpty().withMessage('Password is required'),
//   ]
//    // Check for validation errors
//    const errors = validationResult(req);
//    if (!errors.isEmpty()) {
//     return res.render('index', { csrfToken: req.csrfToken(), errors: errors.array() });

//    }
//   // Implement appropriate validation and secure authentication mechanisms here
//   // For simplicity, you can use a hardcoded username and password for demonstration purposes

//   const { username, password } = req.body;
// // Find the user based on the provided username
// const user = users.find((u) => u.username === username);


//   if (username === user.username && password === user.password) {
//     const token = jwt.sign({ username: user.username, password: user.password }, 'faiza99');
//     req.session.isAuthenticated = true;
//     res.redirect('/dashboard?token=' + token);
//   } else {
//     res.redirect('/');
//   }
// });

// app.get('/dashboard', (req, res) => {
 
//   // Secure the dashboard route to only allow authenticated users
//   if (req.session.isAuthenticated) {
//     const token = req.query.token;
//     try{
//       const decoded = jwt.verify(token, 'faiza99');
//       res.render('dashboard', { username : decoded.username, password : decoded.password });
//     } catch(err){
//       console.error(err);
//       res.redirect('/');
//     }

//   } else {
//     res.redirect('/');
//   }
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: 'YourStrongSessionSecret', resave: false, saveUninitialized: false }));
app.use(csurf({ cookie: true }));

// User data
const users = [
  { id: 1, username: 'user1', password: 'u123', role: 'user' },
  { id: 2, username: 'admin', password: 'a123', role: 'admin' },
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
], (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('index', { csrfToken: req.csrfToken(), errors: errors.array() });
  }

  // Implement appropriate validation and secure authentication mechanisms here
  // For simplicity, you can use a hardcoded username and password for demonstration purposes

  const { username, password } = req.body;
  // Find the user based on the provided username
  const user = users.find((u) => u.username === username);

  if (user && password === user.password) {
    const token = jwt.sign({ username: user.username, password: user.password }, 'faiza99');
    req.session.isAuthenticated = true;
    console.log(user.role);
    res.redirect('/dashboard?token=' + token);
  } else {
    res.redirect('/');
  }
});

app.get('/dashboard', (req, res) => {
  // Secure the dashboard route to only allow authenticated users
  if (req.session.isAuthenticated) {
    const token = req.query.token;
    try {
      const decoded = jwt.verify(token, 'faiza99');
      
      res.render('dashboard', { username: decoded.username, password: decoded.password });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

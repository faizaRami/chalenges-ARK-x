// // app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const bcrypt = require('bcrypt');
// const User = require('./models/userModel'); // You need to create the User model
// const userController = require('./controllers/userController');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({
//   secret: 'chatappsecret',
//   resave: false,
//   saveUninitialized: true,
// }));
// app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   res.redirect('/chat');
// });

// // User Registration and Login Routes
// app.get('/register', userController.getRegistration);
// app.post('/register', userController.postRegistration);
// app.get('/login', userController.getLogin);
// app.post('/login', userController.postLogin);

// // Chat Route (Requires Authentication)
// app.get('/chat', (req, res) => {
//   if (!req.session.userId) {
//     res.redirect('/login');
//   } else {
//     res.render('chat');
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

const User = require('./models/userModel');
const users = require('./models/users');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');
const chatModel = require('./models/chatModel'); // Import your Chat model


const app = express();
const port = process.env.PORT || 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io-client/dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'chatappsecret',
  resave: false,
  saveUninitialized: true,
}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.redirect('/chat');
});
app.use('/public', (req, res, next) => {
  res.setHeader('Content-Type', 'application/javascript');
  next();
});

// User Registration and Login Routes
app.get('/register', userController.getRegistration);
app.post('/register', userController.postRegistration);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
// Chat Route (Requires Authentication)
app.get('/chat', chatController.getChatPage);
app.post('/chat', chatController.sendMessage(io));

io.on('connection', (socket) => {
  console.log('A user connected');
  io.emit("user-connected", {
    socketId: socket.id,
  });
  socket.on("message", (data) => {
    // Now you can safely access socket.request.user.username
    // const username = user.username;
    // Broadcast the message to all connected clients, including the sender
    io.emit("message", { from: socket.id, text: data });
  });


  // Handle user disconnections
  socket.on("disconnect", () => {
    // Emit a user disconnected event to all connected users
    io.emit("user-disconnected", {
      // username: user.username,
      socketId: socket.id,
    });

    console.log(`${socket.username} disconnected from socket id ${socket.id}`);
  });
});
// Start the server
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

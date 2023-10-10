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

const moment = require('moment');  //moment package
const nodemailer = require('nodemailer'); // Import the sendEmail function

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
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use the email service you prefer
  auth: {
      user: 'rami.faiza06@gmail.com', // Your email address
      pass: 'your-password', // Your email password (use environment variables for security)
  },
});


io.on('connection', (socket) => {
  console.log('A user connected');
  io.emit("user-connected", {
    username: socket.username,
  });
  socket.on("message", (username) => {
    // Now you can safely access socket.request.user.username
    // const username = user.username;
    // Broadcast the message to all connected clients, including the sender
    io.emit("message", { from: username, text: data });
  });

  const mailOptions = {
    from: 'rami.faiza06@gmail.com',
    to: 'rami.faiza06@gmail.com', // Recipient's email address
    subject: 'User Joined Chat',
    text: `${username} has joined the chat at ${moment().format('YYYY-MM-DD HH:mm:ss')}`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
  });
  // Handle user disconnections
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat message', `---${username} left the chat---`);
    
  });
  socket.on('chat message', (msg) => {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');   //time of message during conversation
    io.emit('chat message', `[${timestamp}] ${msg}`);
  });
//sending email when the user joins or leaves the chat conversation
});
// Start the server
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

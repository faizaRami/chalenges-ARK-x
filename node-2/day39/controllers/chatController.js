// // controllers/chatController.js

// // Import any necessary modules or models

// // Handle chat-related routes and actions
// exports.getChatPage = (req, res) => {
//     // Render the chat page (chat.ejs)
//     res.render('chat');
//   };
  
//   exports.sendMessage = (req, res) => {
//     // Get the message from the request
//     const { message } = req.body;
    
//     // Add the message to the chat model (chatModel.js)
//     chatModel.addMessage(message);
    
//     // Redirect back to the chat page
//     res.redirect('/chat');
//   };
  
//   // You can define more actions like handling user connections, disconnections, etc.
  
// chatController.js

// Import any necessary modules or models
const chatModel = require('../models/chatModel');

// Render the chat page
exports.getChatPage = (req, res) => {
  // Check if the user is authenticated, if not, redirect to login
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    res.render('chat', { username: req.session.userId });
  }
};

// Handle sending a chat message
exports.sendMessage = (io) => (req, res) => {
  // Get the message from the request
  const { message } = req.body;

  // Emit the message to all connected clients
  io.emit('chat message', { username: req.session.userId, message });

  // Add the message to the chat model
  chatModel.addMessage({ username: req.session.userId, message });

  // Redirect back to the chat page
  res.redirect('/chat');
};


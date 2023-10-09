// models/chatModel.js

// Define an array to store chat messages
const chatMessages = [];

// Function to add a message to the chat
exports.addMessage = (message) => {
  chatMessages.push(message);
};

// Function to get all chat messages
exports.getAllMessages = () => {
  return chatMessages;
};

// You can add more functions for managing chat messages

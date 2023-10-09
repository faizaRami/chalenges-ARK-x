// models/users.js
// Sample user data
const bcrypt = require('bcrypt');

const users = [
  {
    username: 'john_doe',
    password: bcrypt.hashSync('password123', 10), // Hashed password
  },
  {
    username: 'jane_smith',
    password: bcrypt.hashSync('password456', 10), // Hashed password
  },
  // Add more user objects as needed
];

module.exports = users;

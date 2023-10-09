// models/user.js
// Sample user data
const users = require('./users');

class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
    
    // You would typically add methods for database operations here
    static findByUsername(username) {
      // Simulated database query to find a user by username
      // In a real app, replace this with database logic
      return users.find(user => user.username === username);
    }
  }
  
  module.exports = User;
  
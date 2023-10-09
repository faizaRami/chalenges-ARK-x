// controllers/userController.js
const bcrypt = require('bcrypt');
// In app.js
const User = require('../models/userModel');
const users = require('../models/users');
exports.getRegistration = (req, res) => {
  res.render('register');
};

exports.postRegistration = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    if (users.some((user) => user.username === username)) {
      return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(username, hashedPassword);
    
    // Add the user to the simulated in-memory user data
    users.push(user);
    
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error'); // Handle the error gracefully
  }
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = users.find((user) => user.username === username);
    
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = username;
      res.redirect('/chat');
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error'); // Handle the error gracefully
  }
}
  exports.logout =  (req, res) => {
    if (req.session) {
      req.session.destroy(function (err) {
        if (err) {
          console.error(err);
        }else{
          return res.redirect("/login");

        }
      });
    }else{
      return res.redirect("/login");

    }

  }
  


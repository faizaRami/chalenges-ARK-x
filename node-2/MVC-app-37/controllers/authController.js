const express = require('express');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findByUsername(username);

  if (user) {
    return res.send('Username already exists');
  }

  await UserModel.create(username, password);
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findByUsername(username);

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = username;
    res.cookie('sessionId', req.session.id, { maxAge: 3600000 });
    res.redirect('/dashboard');
  } else {
    res.send('Invalid username or password');
  }
});

// Protected Route
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
}

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { username: req.session.userId });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.clearCookie('sessionId');
    res.redirect('/login');
  });
});

module.exports = router;

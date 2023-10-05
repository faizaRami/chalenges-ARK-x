const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();
const port = process.env.PORT || 3000;

// Configure middleware
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'faiza99',
  resave: false,
  saveUninitialized: true,
}));
app.set('view engine', 'ejs');

// Initialisation de Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Sample user data for demonstration purposes
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];
//configuration
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  (username, password, done) => {
    // Trouvez l'utilisateur dans votre base de données ou vos variables serveur
    const user = users.find((user) => user.username === username);
    if (!user) {
      return done(null, false, { message: 'Utilisateur non trouvé' });
    }
    // Comparez le mot de passe avec le mot de passe haché
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Mot de passe incorrect' });
      }
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
  if (!user) {
    return done(null, false);
  }
});

// Your registration, login, and other routes will go here

// Registration Form
app.get('/register', (req, res) => {
  res.render('register'); // Create an EJS template for the registration form
});



// Login Form
app.get('/login', (req, res) => {
  res.render('login'); // Create an EJS template for the login form
});
//Utilisation de Passport.js dans vos routes de connexion et d'inscription
// app.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//     failureFlash: true // Optionnel : activer la gestion des messages flash
//   })
// );
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("profile");
  }
);
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.redirect('/login');
});
// Protected Route
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
}

app.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile', { user: req.user })
  // res.send(`Welcome, ${req.session.userId}! This is your dashboard.`);
  
});
app.post('/profile', isAuthenticated, async (req, res) => {
  const { password } = req.body;
  const user = req.user;

  // Mettez à jour le mot de passe de l'utilisateur avec le nouveau mot de passe haché
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;

  res.redirect('/profile');
});
// Logout Functionality
// User logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');

const dB = require('../models/')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WebLink' });
});

/* GET Register page. */
router.get('/register', function(req, res, next) {
  res.render('auth_signup', { title: 'Register' });
});

/* GET Login page. */
router.get('/login', function(req, res, next) {
  res.render('auth_login', { title: 'Login' });
});

/* GET Dashboard page. */
router.get('/dashboard', function(req, res, next) {
  res.render('auth_dashboard', { title: 'Dashboard' });
});

module.exports = router;

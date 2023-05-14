
const express = require('express');
const path = require('path');
const passport = require('passport');
const authRouter = express.Router();

authRouter.get('/', async function (req, res) {
  if(req.isAuthenticated()){
    res.redirect('/Game');
  }
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

authRouter.get('/google', passport.authenticate('google', { scope: ['email'] }));

authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/Auth' }),
  (req, res) => {
    // This function will be called when the user has authenticated successfully
    // You can access the user's profile data in `req.user`
    console.log('We got here');
    res.redirect('/Game');
  }
);

module.exports = authRouter;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const gameRoute = require('./routes/gameRoute');
const authRoute = require('./routes/authRoute');
const session = require('express-session');
const passport = require('passport');
const highscoreRoute = require('./routes/highScoreUtils');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();
const port = process.env.PORT || 3000;

const configManger = require('./globalUtils/configManager');

passport.use(new GoogleStrategy({
  clientID: configManger.getChain('google.clientID'),
  clientSecret: configManger.getChain('google.clientSecret'),
  callbackURL: configManger.getChain('google.callbackURL')
},
(accessToken, refreshToken, profile, cb) => {
  // This function will be called when the user has authenticated successfully
  // You can access the user's profile data in the `profile` object
  return cb(null, profile);
}
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(bodyParser.json());

app.use(session({
  secret: 'KEKW2017',
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

//setInterval(word.createNewEvent,8.64*10^7)

app.use(cors()); 

app.get('/', (req, res) => {
  res.redirect('/Auth');
});

app.use(express.static('scripts'));
app.use(express.static('styles'));
app.use(express.static('resources'));
app.use('/Game',gameRoute);
app.use('/Auth',authRoute);
app.use('/Highscore',highscoreRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const gameRoute = require('./routes/gameRoute');
const authRoute = require('./routes/authRoute');
const session = require('express-session');
const passport = require('passport');
const highscoreRoute = require('./routes/highScoreRoute');
const word = require("./routes/Utility/wordUtils");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { readFileSync } = require('fs');
const https = require('https');

const port = process.env.PORT || 3000;
const app = express();

const configManager = require('./globalUtils/configManager');

passport.use(
  new GoogleStrategy(
    {
      clientID: configManager.getChain('google.clientID'),
      clientSecret: configManager.getChain('google.clientSecret'),
      callbackURL: configManager.getChain('google.callbackURL'),
    },
    (accessToken, refreshToken, profile, cb) => {
      // This function will be called when the user has authenticated successfully
      // You can access the user's profile data in the `profile` object
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(bodyParser.json());

app.use(
  session({
    secret: 'KEKW2017',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.get('/', (req, res) => {
  res.redirect('/Auth');
});

app.use(express.static('scripts'));
app.use(express.static('styling'));
app.use(express.static('resources'));
app.use(express.static('images'));
app.use('/Game', gameRoute);
app.use('/Auth', authRoute);
app.use('/Highscore', highscoreRoute);

const newWord = word.createNewEvent();
console.log(newWord);

const options = {
  key: readFileSync('configs/localhost.key'),
  cert: readFileSync('configs/localhost.crt'),
};

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`listening on https://localhost:${port}`);
});

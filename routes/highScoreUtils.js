const express = require('express');
const { isLoggedIn } = require('./Utility/authUtils');
const highscoreRoute = express.Router();
const path = require('path');
const gameUtils = require("./Utility/gameUtils")

//highscoreRoute.get("/",isLoggedIn, async function (req, res) {
//     const email = req.user.emails[0].value;
//     const highscore = await gameUtils.HighScores();
//     console.log(highscore);
//     res.json({message: 'Successful',highscore});
//     res.status = 201;


highscoreRoute.get('/',isLoggedIn, async function (req, res) {
  req.user.emails[0].value;
  res.sendFile(path.join(__dirname, '../views/highscore.html'));
});

module.exports = highscoreRoute;
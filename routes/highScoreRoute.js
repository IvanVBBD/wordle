const express = require('express');
const highscoreRoute = express.Router();
const path = require('path');
const gameUtils = require('./Utility/gameUtils');

highscoreRoute.get('/', async function (req, res) {
  //req.user.emails[0].value;
  res.sendFile(path.join(__dirname, '../views/highscore.html'));
});


highscoreRoute.get('/scores', async function(req,res){
  //const email = req.user.emails[0].value;
  const highscore = await gameUtils.HighScores();
  console.log(highscore);
  res.json({message: 'Successful',highscore});
  res.status = 201;
});

module.exports = highscoreRoute;
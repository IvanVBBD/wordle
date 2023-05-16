const express = require('express');
const auth = require('./Utility/authUtils');
const word = require('./Utility/wordUtils');
const path = require('path');
const gameUtils = require('./Utility/gameUtils');
const gameRouter = express.Router();

//auth.isLoggedIn,

gameRouter.get('/', async function (req, res) {
  const email = 'ivanblizz23@gmail.com';//req.user.emails[0].value;
  auth.checkUserProfile(email);
  res.sendFile(path.join(__dirname, '../views/game.html'));
  //res.end(await readFile(path.join(__dirname, "../views/index.html")))
});


gameRouter.get('/GetChallenge',async function(req,res) {
  let currentWord = await word.getActiveEvent();
  console.log('------Current word-------');
  console.log(currentWord);
  res.json({word : currentWord[0].word});
});

gameRouter.post('/SaveGame', async function(req,res) {
  const data = req.body;
  gameUtils.SaveGame(data.score, data.email);
  console.log(data);
  res.json({ message: 'Successful', data });
  res.statusCode = 201;
});

module.exports = gameRouter;
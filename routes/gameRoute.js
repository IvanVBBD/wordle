const express = require("express");
const auth = require("./Utility/authUtils")
const word = require("./Utility/wordUtils")
const path = require("path");
const gameRouter = express.Router();

//auth.isLoggedIn,

gameRouter.get("/", async function (req, res) {
    const email = "ivanblizz23@gmail.com"//req.user.emails[0].value;
    const newWord = word.createNewEvent();
    console.log(newWord);
    auth.checkUserProfile(email);
  res.sendFile(path.join(__dirname, "../views/game.html"));
  //res.end(await readFile(path.join(__dirname, "../views/index.html")))
});


gameRouter.get("/GetChallenge",async function(req,res) {
    let currentWord = await word.getActiveEvent()
    res.send(currentWord);
})

module.exports = gameRouter;
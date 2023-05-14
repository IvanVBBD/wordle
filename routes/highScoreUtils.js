const express = require("express");
const { isLoggedIn } = require("./Utility/authUtils");
const highscoreRoute = express.Router();
const gameUtils = require("./Utility/gameUtils")

highscoreRoute.get("/",isLoggedIn, async function (req, res) {
    const email = req.user.emails[0].value;
    const highscore = await gameUtils.HighScores();
    console.log(highscore);
    res.json({message: 'Successful',highscore});
    res.status = 201;
});

module.exports = highscoreRoute;
const express = require("express");
const { isLoggedIn } = require("./Utility/authUtils");
const highscoreRoute = express.Router();

highscoreRoute.get("/",isLoggedIn, async function (req, res) {
    const email = req.user.emails[0].value;
  res.sendFile(path.join(__dirname, "../views/highscore.html"));
});

module.exports = highscoreRoute;
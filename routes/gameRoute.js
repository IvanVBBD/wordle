const express = require("express");
const auth = require("./Utility/authUtils")
const path = require("path");
const gameRouter = express.Router();

gameRouter.get("/", auth.isLoggedIn, async function (req, res) {
    const email = req.user.emails[0].value;
    auth.checkUserProfile(email);
  res.sendFile(path.join(__dirname, "../views/game.html"));
  //res.end(await readFile(path.join(__dirname, "../views/index.html")))
});

module.exports = gameRouter;
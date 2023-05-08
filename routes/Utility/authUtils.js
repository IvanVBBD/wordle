
const DB = require("./dbUtils")



async function checkUserProfile(email){
    console.log("check if user : " + email + " exists");
    const statement = "SELECT * FROM USERS WHERE user_email = " + "\'" + email + "\'";
    console.log(statement);
    let result = await DB.executeQuery(statement);
}

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/Auth');
  };

module.exports = {checkUserProfile, isLoggedIn}

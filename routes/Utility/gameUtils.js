const word = require("./wordUtils")
const DB = require("./dbUtils")


async function SaveGame(score,email){
    const currentEvent = await word.getActiveEvent();
    const userIDQuery = "SELECT user_id FROM USERS WHERE user_email = '" + email + "'";
    let result = await DB.executeQuery(userIDQuery);
    const query = "INSERT INTO EVENTRESPONSES (event_id,user_id,score) VALUES ('" + email + "')";
}
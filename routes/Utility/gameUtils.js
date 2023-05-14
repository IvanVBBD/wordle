const word = require("./wordUtils")
const DB = require("./dbUtils")


async function SaveGame(score,email){
    try {
        const currentEvent = await word.getActiveEvent();
        const userIDQuery = "SELECT user_id FROM USERS WHERE user_email = '" + email + "'";
        const eventIDQuery = "SELECT event_id FROM EVENTS WHERE active = 1";
        let eventId = await DB.executeQuery(eventIDQuery);
        let userId = await DB.executeQuery(userIDQuery);
        const insertQuery = "INSERT INTO EVENTRESPONSES (event_id,user_id,score) VALUES ("+eventId[0].event_id+","+userId[0].user_id+","+score+")";
        await DB.executeQuery(insertQuery);
        
    } catch (error) {
        console.log("ooops user error occured: " + error);
    }

}

async function HighScores(){
    try{
        const highScoreQuery = `select EVENTS.event_id, USERS.user_id, USERS.user_email, EVENTS.word, EVENTRESPONSES.score from EVENTRESPONSES
        INNER JOIN EVENTS ON EVENTRESPONSES.event_id = EVENTS.event_id
        INNER JOIN USERS ON EVENTRESPONSES.user_id = USERS.user_id
        where EVENTS.ACTIVE = 1;`;
        const result = await DB.executeQuery(highScoreQuery);
        return result;
        
    } catch (error) {
        console.log("ooops user error occured: " + error);
    }
}

module.exports = {SaveGame, HighScores};
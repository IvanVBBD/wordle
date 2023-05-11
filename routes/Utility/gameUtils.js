const word = require('./wordUtils');
const DB = require('./dbUtils');


async function SaveGame(score,email){
  try {
    await word.getActiveEvent();
    const userIDQuery = 'SELECT user_id FROM USERS WHERE user_email = \'' + email + '\'';
    const eventIDQuery = 'SELECT event_id FROM EVENTS WHERE active = 1';
    let eventId = await DB.executeQuery(eventIDQuery);
    let userId = await DB.executeQuery(userIDQuery);
    const insertQuery = 'INSERT INTO EVENTRESPONSES (event_id,user_id,score) VALUES ('+eventId[0].event_id+','+userId[0].user_id+','+score+')';
    await DB.executeQuery(insertQuery);
        
  } catch (error) {
    console.log('ooops user error occured: ' + error);
  }

}

module.exports = {SaveGame};
const sql = require('msnodesqlv8');
const configManger = require('../../globalUtils/configManager');

async function executeQuery(sqlQuery) {
  try{
    let result = await new Promise((resolve, reject) => {
      const query = sql.query(configManger.get('database'), sqlQuery, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
      query.on('error', (err) => {
        reject(err);
      });
    });
    return result;
  }catch(e){
    console.log(e);
  }
}

module.exports = {executeQuery};
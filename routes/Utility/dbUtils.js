const sql = require('msnodesqlv8');
const fs = require('fs');
const path = require("path")

const config = JSON.parse(fs.readFileSync(path.join(__dirname,"../../configs/config.json")))



async function executeQuery(sqlQuery) {
  try{
    let result = await new Promise((resolve, reject) => {
      const query = sql.query(config.database.toString(), sqlQuery, (err, results) => {
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
    return result
  }catch(e){
    console.log(e)
  }
}


module.exports = {executeQuery};
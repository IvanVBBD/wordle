const sql = require('msnodesqlv8');
const fs = require('fs');
const path = require("path")

const config = JSON.parse(fs.readFileSync(path.join(__dirname,"../../configs/config.json")))



async function executeQuery(query) {
  sql.query(config.database.toString(), query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return;
    }

    console.log(results);
  });
}


module.exports = {executeQuery};
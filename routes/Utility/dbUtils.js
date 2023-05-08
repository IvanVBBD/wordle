const sql = require('msnodesqlv8');
const { configManger } = require('../../globalUtils/index');

async function executeQuery(query) {
  sql.query(configManger['database'], query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return;
    }

    console.log(results);
  });
}

module.exports = {executeQuery};
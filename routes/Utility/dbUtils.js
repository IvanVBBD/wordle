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

// const { Connection, Request } = require('tedious');
// const configManager = require('../../globalUtils/configManager');

// async function executeQuery(sqlQuery) {
//   try {
//     const config = {
//       server: configManager.get('dbserver'),
//       authentication: {
//         type: 'default',
//         options: {
//           userName: configManager.get('dbusername'),
//           password: configManager.get('dbpassword')
//         }
//       },
//       options: {
//         encrypt: true,
//         database: configManager.get('dbname')
//       }
//     };

//     const connection = new Connection(config);

//     await new Promise((resolve, reject) => {
//       connection.on('connect', (err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve();
//         }
//       });
//     });

//     const request = new Request(sqlQuery, (err, rowCount, rows) => {
//       if (err) {
//         console.error(err.message);
//         connection.close();
//       } else {
//         console.log(`${rowCount} rows returned`);
//         rows.forEach(row => {
//           console.log(row);
//         });
//         connection.close();
//       }
//     });

//     connection.execSql(request);
//   } catch (e) {
//     console.log(e);
//   }
// }

// module.exports = { executeQuery };

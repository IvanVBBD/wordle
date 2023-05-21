// const sql = require('msnodesqlv8');
// const configManger = require('../../globalUtils/configManager');

// async function executeQuery(sqlQuery) {
//   try{
//     let result = await new Promise((resolve, reject) => {
//       const query = sql.query(configManger.get('database'), sqlQuery, (err, results) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(results);
//         }
//       });
//       query.on('error', (err) => {
//         reject(err);
//       });
//     });
//     return result;
//   }catch(e){
//     console.log(e);
//   }
// }

// module.exports = {executeQuery};

// const { Connection, Request } = require('tedious');
// const configManager = require('../../globalUtils/configManager');

// async function executeQuery(sqlQuery) {
//   try {
//     const config = {
//       server: 'wordle-db.c68ft3jbsleb.eu-west-1.rds.amazonaws.com',
//       authentication: {
//         type: 'default',
//         options: {
//           userName: 'admin',
//           password: 'admin1234'
//         }
//       },
//       options: {
//         database: 'WordleApp',
//         encrypt: true,
//         trustServerCertificate: true  // Add this line
//       }
//     };
//     const connection = new Connection(config);
//     connection.on('connect', function(err) {
//       if(err) {
//         console.log('Error: ', err)
//       }
//       // If no error, then good to go...
//       console.log("YAAASSSSSS");
//       const request = new Request(sqlQuery, (err, rowCount, rows) => {
//         if (err) {
//           console.error("Caught here 3: " + err.message);
//           connection.close();
//         } else {
//           console.log(`${rowCount} rows returned`);
//           rows.forEach(row => {
//             console.log(row);
//           });
//           connection.close();
//           //return rows;
//         }
//       });

//       request.on('row', columns => { 
//         console.log("we here")
//         console.log(columns)
//       // if (strgOpt=="array"){
//       //     var arry=[];
//       //     columns.forEach(column => {
//       //         arry.push(column.value);
//       //     });
//       //     result.push(arry);
//       //     console.log(result);  
//       // }
//       // if (strgOpt=="object"){
//       //     var objt={};
//       //     columns.forEach(column => {
//       //         objt[column.metadata.colName]=column.value;
//       //     });
//       //     result.push(objt);
//       //     console.log(result);  
//       // }        
//   });
  
//       connection.execSql(request);
//     });

    

//     connection.connect();
    
//   } catch (e) {
//     console.log("catch here 2: " + e);
//   }
// }

// module.exports = { executeQuery };

const sql = require('mssql');

const config = {
  user: 'wordle-game',
  password: 'Admin1234',
  server: 'wordle-game.database.windows.net',
  database: 'WordleApp',
  options: {
    encrypt: true,
    trustServerCertificate: true, // Set this to true for self-signed certificates
  },
};

// Create a connection pool with the specified configuration
const pool = new sql.ConnectionPool(config);

async function executeQuery(sqlQuery) {
  try {
    let result = undefined;
    // Check if the connection pool is already connected
    if (!pool.connected) 
      await pool.connect();
      
    result = await pool.request().query(sqlQuery);
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error(err);
  }
}

function checkPoolStatus(){
  console.log(pool.connected);
  return pool.connected;
}

function closeConnection(){
  if (pool.connected)
    pool.close();
}

module.exports = { executeQuery,checkPoolStatus,closeConnection };

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
    // Check if the connection pool is already connected
    if (pool.connected) {
      const result = await pool.request().query(sqlQuery);
      console.log(result.recordset);
      return result.recordset;
    } else {
      // If not connected, establish a new connection from the pool
      const connection = await pool.connect();
      const result = await connection.request().query(sqlQuery);
      console.log(result.recordset);
      return result.recordset;
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { executeQuery };

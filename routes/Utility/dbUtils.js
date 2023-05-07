const sql = require('mssql');
const fs = require('fs');
const path = require("path")

const config = JSON.parse(fs.readFileSync(path.join(__dirname,"../../configs/config.json")))



async function executeQuery(query){
    console.log("Config file: " + config)
    try {
        await sql.connect(config.database.toString());
        sql.connect()
        const result = await sql.query(query);
        console.log(result.recordset);
        return result;
      } catch (err) {
        console.error(err);
      } finally {
        sql.close();
      }
}

module.exports = {executeQuery};
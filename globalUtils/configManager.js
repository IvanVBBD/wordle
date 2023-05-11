const fs = require('fs');
const path = require('path');
const configPath = '../configs/config.json';

function readConfig(){
  return JSON.parse(fs.readFileSync(path.join(__dirname,configPath)));
}

function readFromConfig(required){
  const config = readConfig();
  return config[`${required}`] || null;
}

function writeToConfig(configID,Value){
  const config = readConfig();
  config[`${configID}`] = Value;
  fs.writeFileSync(path.join(__dirname,configPath),JSON.stringify(config, null, 4));
}

module.exports = {
  readFromConfig,
  writeToConfig,
  readConfig
};
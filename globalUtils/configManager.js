const fs = require('fs');
const path = require('path');
const configPath = '../configs/config.json';

module.exports = class configManager{
  static config = configManager.readConfig();

  static readConfig(){
    return JSON.parse(fs.readFileSync(path.join(__dirname,configPath)));
  }
  
  static get(required){
    return configManager.config[`${required}`] || null;
  }

  static getChain(required){
    return configManager.getChainEnd(configManager.splitChain(required)) || null;
  }
  
  static setChain(configID,Value){
    configManager.config[`${configID}`] = Value;
    fs.writeFileSync(path.join(__dirname,configPath),JSON.stringify(configManager.config, null, 4));
  }

  static set(configID,Value){
    configManager.config[`${configID}`] = Value;
    fs.writeFileSync(path.join(__dirname,configPath),JSON.stringify(configManager.config, null, 4));
  }

  static getChainEnd(chainLinks){
    let clasp  = configManager.config;
    chainLinks.forEach( link => {
      clasp = clasp[`${link}`];
    });
    return clasp;
  }

  static splitChain(chain){
    return chain.split('.');
  }
};
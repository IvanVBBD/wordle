module.exports = class StructorNavigator{
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
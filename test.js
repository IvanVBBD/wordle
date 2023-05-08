const {
  configManger
} = require('./globalUtils/index');

console.log(configManger.writeToConfig('database','nice'));
console.log(configManger.writeToConfig('nice','nice'));
console.log(configManger.readConfig());
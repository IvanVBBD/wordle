const configManger = require('./globalUtils/configManager');

console.log(configManger.set('database','nice'));
console.log(configManger.set('nice','nice'));
console.log(configManger.get('nice'));
console.log(configManger.getChain('thing.thingy.answer'));
console.log(configManger.getChain('arrayHolder.someArray.2.item'));
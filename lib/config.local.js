var config = require('./config.global');

config.log = {
	appenders: {onnara: {type:'console'}},
	categories: {default: {appenders: ['onnara'], level: 'debug'}}
};
module.exports = config;
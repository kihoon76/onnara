var config = require('./config.global');

config.db.server = '192.168.0.2';
config.db.port = 1433; /*7651;*/
/*config.db.options = {
	instanceName: 'MSSQL2014'
};*/

config.log = {
	appenders: {onnara: {
		type:'dateFile',
		filename: '/home/hotplace/apis/onnara/logs/onnara.log',
		pattern: '-yyyy-MM-dd',
		alwaysIncludePattern: true
	}},
	categories: {default: {appenders: ['onnara'], level: 'debug'}}
};
module.exports = config;
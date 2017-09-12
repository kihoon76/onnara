var config = require('./config.global');

config.db.server = '192.168.0.2';
config.db.port = 7651;
config.db.options = {
	instanceName: 'MSSQL2014'
};
module.exports = config;
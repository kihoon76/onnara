var config = module.exports = {};

config.db = {
	user: 'sa',
	password: '1111',
	server:'JNNASUS\\MSSQL2014',
	pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

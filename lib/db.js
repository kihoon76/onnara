/**
	https://www.npmjs.com/package/mssql
*/
var env		= process.env.NODE_ENV || 'local';
var sql 	= require('mssql'),
	log4js	= require('log4js'),
	config	= require('./config.' + env);
	
var logger  = log4js.getLogger('lib/db.js');
var cp = null;

var format = function(param) {
	return {
		success: param.success,
		errMsg: param.errMsg || '',
		count: param.rowsAffected[0],
		recordset: param.recordset
	}
}

module.exports = function() {
	if(!cp) {
		cp = new sql.ConnectionPool(config.db, function(err) {
			if(err) {
				logger.error('Connection Pool not created...', err.message);
				return;		
			}
		});
	}
	
	var obj = {
		getPnuCode: function(q, res) {
			cp.request()
			.input('int수집회차', sql.Int, 1)
			.execute(q, function(err, result) {
				if(err) {
					logger.error(q, err.message);
					res.status(500).send({success:false, errMsg: err.message, rowsAffected:null, recordset:null});
				}
				else {
					console.dir(result);
					result.success = true;
					res.setHeader('Content-Type', 'application/json');
					res.status(200).send(JSON.stringify(format(result)));
				}
			});
		},
		setInsOnnaraImya2: function(q, param, res) {
			cp.request()
			.input('PnuSerial', sql.BigInt, param.PnuSerial)
			.input('Imya', sql.VarBinary, param.Imya)
			.execute(q, function(err, result) {
				if(err) {
					logger.error(q, err.message);
					res.status(500).send({success:false, errMsg: err.message});
				}
				else {
					result.success = true;
					res.status(200).json({success:true});
				}
			});
		}
	};
	
	return obj; 
}
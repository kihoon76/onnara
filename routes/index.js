var express    = require('express'),
	log4js	   = require('log4js'),
	db         = require('../lib/db')();
	
var router     = express.Router();
var logger	   = log4js.getLogger('index.js');

router.use(function preProcess(req, res, next) {
	logger.debug('요청 URL : ', req.originalUrl);
	logger.debug('요청 METHOD : ', req.method);
	
	if(req.method == 'GET') {
		logger.debug('파라미터  query : ', req.query);
	}
	else {
		logger.debug('파라미터 params: ', req.params);
	}
	
    next();
});

router.get('/api/onnara/pnucode', function(req, res) {
	db.getPnuCode('[데이터수집].[dbo].[SEL_온나라수집PNU_고유번호]', res);
});

router.get('/api/onnaraform', function(req, res) {
	res.render('test', {title:'onnara'});
});

router.post('/api/onnara', function(req, res) {
	db.setInsOnnaraImya2('[데이터수집].[dbo].[INS_Onnara_Imya_2]', {PnuSerial:req.body.PnuSerial, Imya:new Buffer(req.body.Imya)}, res);
});

module.exports = router;
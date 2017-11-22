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
		logger.debug('파라미터 params: ', req.body);
	}
	
    next();
});

router.get('/api/onnara/pnucode', function(req, res) {
	db.getPnuCode('[데이터수집].[dbo].[SEL_온나라수집PNU_고유번호]', req, res);
});

router.post('/api/onnara', function(req, res) {
	db.setProcedure('[데이터수집].[dbo].' + req.body.p_nm, req, res);
});

router.get('/download', function(req, res) {
	res.render('download');
});

router.get('/download/:ver', function(req, res) {
	var ver = req.params.ver;
	var file = __dirname + '/../download/' + ver + '/온나라' + ver + '.zip';
	res.download(file);
});

router.get('/map', function(req, res) {
	var level = 1;
	var lng = req.query.lng;
	var lat = req.query.lat;
	var level = req.query.level;

	res.render('daummap', {lng:lng, lat:lat, level: level});
});

module.exports = router;
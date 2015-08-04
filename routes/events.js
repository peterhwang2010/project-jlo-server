var express = require('express');
var router = express.Router();

var anyDB = require('any-db');
var conn = anyDB.createConnection('postgres://localhost:5432/jlo');

router.get('/event', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	var sql = 'SELECT * FROM event';
	var q = conn.query(sql, function(error, result) {
		res.json(result.rows);
	});
});

router.post('/event', function(req, res) { 
	var obj = req.body;
	var id = Math.abs((new Date()).valueOf() & 0xffffffff);
	var sql = 'INSERT INTO event (eid, name, purpose, venue, country, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7)';
	conn.query(sql, [id, obj.name, obj.purpose, obj.venue, obj.country, obj.start_date, obj.end_date], function(error, result) {
		res.json({ eid: id });
	});
}); 

router.get('/event/:eid', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	var eid = parseInt(req.params.eid);
	var sql = 'SELECT * FROM event WHERE eid = $1';
	var q = conn.query(sql, [eid], function(error, result) {
		res.json(result.rows[0]);
	});
});

router.put('/event/:eid', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    var eid = parseInt(req.params.eid);
    var obj = req.body;
    var sql = 'UPDATE event SET name = $1, purpose = $2, venue = $3, country = $4, start_date = $5, end_date = $6 WHERE eid = $7';
    var q = conn.query(sql, [obj.name, obj.purpose, obj.venue, obj.country, obj.start_date, obj.end_date, eid], function(error, result){
        res.json({ eid: eid });
    });
});

router.delete('/event/:eid', function(req, res){
	var eid = parseInt(req.params.eid); 
	var sql = 'DELETE FROM event WHERE eid = $1';
	conn.query(sql, [eid], function(error, result) {
		res.json({ eid: eid });
	});
}); 

module.exports = router;

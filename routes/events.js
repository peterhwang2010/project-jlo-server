var express = require('express');
var router = express.Router();

var anyDB = require('any-db');
var conn = anyDB.createConnection('postgres://localhost:5432/jlo');

/* GET home page. */
router.get('/event', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	var SQLquery = 'SELECT * FROM event';
	var q = conn.query(SQLquery, function(error, result) {
		res.json(result.rows);
	});
});

router.post('/event', function(req, res) { 
	var obj = req.body;
	var id = Math.abs((new Date()).valueOf() & 0xffffffff);
	var sql = 'INSERT INTO event (eid, name, purpose, venue, country, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6, $7)';
	conn.query(sql, [id, obj.name, obj.purpose, obj.venue, obj.country, obj.start_time, obj.end_time], function(error, result) {
		res.send(id + "");
	});
}); 

router.get('/event/:id', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	var id = req.params.id;
	var sql = 'SELECT * FROM event WHERE eid = $1';
	var q = conn.query(sql, [id], function(error, result) {
		res.json(result.rows[0]);
	});
});

router.delete('/event/:id', function(req, res){
	var id = req.params.id;
	var sql = 'DELETE FROM person WHERE eid = $1';
	conn.query(sql, [id], function(error, result) {
		res.send("success");
	});
}); 

module.exports = router;

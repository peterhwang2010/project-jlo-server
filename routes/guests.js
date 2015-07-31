var express = require('express');
var router = express.Router();

var anyDB = require('any-db');
var conn = anyDB.createConnection('postgres://localhost:5432/jlo');

router.post('/guest', function(req, res) { 
	var obj = req.body;

	var sql = 'INSERT INTO guest (eid, pid, attended, registered, approved) VALUES ($1, $2, $3, $4, $5)';
	
	conn.query(sql, [obj.eid, obj.pid, obj.attended, obj.registered, obj.approved], function(error, result) {
		res.send("success");
	});
});

router.get('/guest/:eid', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	
	var eid = req.params.eid;
	var sql = 'SELECT * FROM guest AS a INNER JOIN person AS p ON a.pid = p.pid WHERE eid = $1';
	var q = conn.query(sql, [eid], function(error, result) {
		var ret = {};
		ret.guests = result.rows;

		var sql1 = 'SELECT * FROM event WHERE eid = $1';
		var q1 = conn.query(sql1, [eid], function(error, result) {
			ret.event = result.rows[0];
			res.json(ret);
		});
	});
});


module.exports = router;
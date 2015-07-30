var express = require('express');
var router = express.Router();

var anyDB = require('any-db');
var conn = anyDB.createConnection('postgres://localhost:5432/jlo');

/* GET home page. */
router.get('/event', function(request, response) {
	var SQLquery = 'SELECT * FROM event';
	var q = conn.query(SQLquery, function(error, result) {
		response.json(result.rows);
	});
});

router.post('/event', function(request, response) { 
	var obj = request.body;
	var id = Math.abs((new Date()).valueOf() & 0xffffffff);
	var sql = 'INSERT INTO event (eid, name, purpose, venue, country, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6, $7)';
		conn.query(sql, [id, obj.name, obj.purpose, obj.venue, obj.country, obj.start_time, obj.end_time], function(error, result) {
		response.send(id + "");
	});
}); 

router.get('/event/:id', function(request, response) {
	var id = request.params.id;
	var sql = 'SELECT * FROM event WHERE eid = $1';
	var q = conn.query(sql, [id], function(error, result) {
		response.json(result.rows[0]);
	});
});

module.exports = router;

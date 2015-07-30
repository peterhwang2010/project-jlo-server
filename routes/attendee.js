var express = require('express');
var router = express.Router();

var anyDB = require('any-db');
var conn = anyDB.createConnection('postgres://localhost:5432/jlo');

router.post('/guest', function(request, response) { 
  var obj = request.body;
  console.log(obj);
  var sql = 'INSERT INTO attendance (eid, pid, attended, registered, approved) VALUES ($1, $2, $3, $4, $5)';
    conn.query(sql, [obj.eid, obj.pid, obj.attended, obj.registered, obj.approved], function(error, result) {
    response.send("success");
  });
});

router.get('/guest/:eid', function(request, response) {
	response.setHeader('Access-Control-Allow-Origin', '*');
	
	var eid = request.params.eid;
	var sql = 'SELECT * FROM attendance AS a INNER JOIN person AS p ON a.pid = p.pid WHERE eid = $1';
	var q = conn.query(sql, [eid], function(error, result) {
		var ret = {};
		ret.guests = result.rows;

		var sql1 = 'SELECT * FROM event WHERE eid = $1';
		var q1 = conn.query(sql1, [eid], function(error, result) {
			ret.event = result.rows[0];
			console.log(ret);
			response.json(ret);
		});
	});
});


module.exports = router;
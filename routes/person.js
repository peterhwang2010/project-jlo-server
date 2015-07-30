var express = require('express');
var router = express.Router();

var anyDB = require('any-db');
var conn = anyDB.createConnection('postgres://localhost:5432/jlo');

/* GET home page. */
router.get('/person', function(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');

  var SQLquery = 'SELECT * FROM person';
  var q = conn.query(SQLquery, function(error, result) {
    response.json(result.rows);
  });
});

router.post('/person', function(request, response) { 
  var obj = request.body;
  var id = Math.abs((new Date()).valueOf() & 0xffffffff);
  var sql = 'INSERT INTO person (pid, first_name, last_name, email, sfdc_id, job_title, role_level, bu) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    conn.query(sql, [id, obj.first_name, obj.last_name, obj.email, obj.sfdc_id, obj.job_title, obj.role_level, obj.bu], function(error, result) {
    response.send(id + "");
  });
}); 

router.get('/person/:id', function(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  
	var id = request.params.id;
	var sql = 'SELECT * FROM person WHERE pid = $1';
	var q = conn.query(sql, [id], function(error, result) {
		response.json(result.rows[0]);
	});
});


module.exports = router;

var express = require('express');
var router = express.Router();


var anyDB = require('any-db');
var conn = anyDB.createConnection('postgres://localhost:5432/jlo');

/* GET home page. */
router.get('/event', function(request, response) {

	var SQLquery = 'SELECT * FROM event';

	var q = conn.query(SQLquery, function(error, result) {
		response.json(result.rows)
	});

});

router.get('/addevent', function(request, response) { 
	var sql = 'INSERT INTO event (name, purpose, venue, country, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6)';
  conn.query(sql, ['eventname', 'purpose1', 'venue1', 123, '2011-05-16 15:36:38', '2011-05-16 15:36:38'], function(error, result) {
		response.json(result)
	});
}); 

router.get('/event/:id', function(request, response) { 

}); 

router.post('/event')



module.exports = router;

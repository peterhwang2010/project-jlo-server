var express = require('express'); 
var router = express.Router();

var anyDB = require('any-db');
var conn = anyDB.createConnection('postgres://localhost:5432/jlo');

router.get('/event/:eid/guest', function(req, res) { 
	var eid = parseInt(req.params.eid); 
	var sql = 'SELECT * FROM guest AS g INNER JOIN person AS p ON g.pid = p.pid WHERE eid = $1'; 
	var obj = {}; 

	var q = conn.query(sql, [eid], function(error, result) { 
		obj.guests = result.rows; 
		sql = 'SELECT * FROM event WHERE eid = $1'; 
		var q2 = conn.query(sql, [eid], function(error2, result2) { 
			obj.event = result2.rows[0];
			res.json(obj);  
		}); 	
	}); 
}); 

router.get('/event/:eid/guest/:pid', function(req, res) { 
	var eid = parseInt(req.params.eid); 
	var pid = parseInt(req.params.pid); 

	var sql = 'SELECT * FROM guest WHERE eid = $1 AND pid = $2'; 
	var obj = {}; 

	var q = conn.query(sql, [eid, pid], function(error, result) { 
		obj.guest = result.rows[0];
		sql = 'SELECT * FROM event WHERE eid = $1'; 
		var q2 = conn.query(sql, [eid], function(error2, result2) { 
			obj.event = result2.rows[0]; 
			res.json(obj); 
		}); 	
	}); 
}); 

router.post('/event/:eid/guest', function(req, res) { 
	var eid = parseInt(req.params.eid); 
	var obj = req.body;

	var sql = 'INSERT INTO guest (eid, pid, attended, registered, approved) VALUES ($1, $2, $3, $4, $5)';
	
	conn.query(sql, [eid, obj.pid, obj.attended, obj.registered, obj.approved], function(error, result) {
		res.json({ eid: eid, pid: obj.pid });
	});
}); 

router.delete('/event/:eid/guest', function(req, res){
    var eid = parseInt(req.params.eid);
    var sql = 'DELETE FROM guest WHERE eid = $1';
    conn.query(sql, [eid], function(error, result) {
        res.json({ eid: eid });
    });
});

router.delete('/event/:eid/guest/:pid', function(req, res) { 
	var eid = parseInt(req.params.eid) 
	var pid = parseInt(req.params.pid); 

    var sql = 'DELETE FROM guest WHERE eid = $1 AND pid = $2';
    conn.query(sql, [eid, pid], function(error, result) {
        res.json({ eid: eid, pid: pid  });
    });
}); 

module.exports = router;
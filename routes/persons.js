var express = require('express');
var router = express.Router();

var anyDB = require('any-db');
var conn = anyDB.createConnection('postgres://localhost:5432/jlo');

/* GET home page. */
router.get('/person', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var SQLquery = 'SELECT * FROM person';
    var q = conn.query(SQLquery, function(error, result) {
        res.json(result.rows);
    });
});

router.post('/person', function(req, res) { 
    var obj = req.body;
    var id = Math.abs((new Date()).valueOf() & 0xffffffff);
    var sql = 'INSERT INTO person (pid, first_name, last_name, email, sfdc_id, job_title, role_level, bu) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    conn.query(sql, [id, obj.first_name, obj.last_name, obj.email, obj.sfdc_id, obj.job_title, obj.role_level, obj.bu], function(error, result) {
        res.send(id + "");
    });
}); 

router.get('/person/:id', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var id = req.params.id;
    var sql = 'SELECT * FROM person WHERE pid = $1';
    var q = conn.query(sql, [id], function(error, result) {
        res.json(result.rows[0]);
    });
});

router.delete('/person/:id', function(req, res){
    var id = req.params.id;
    var sql = 'DELETE FROM person WHERE pid = $1';
    conn.query(sql, [id], function(error, result) {
        res.send("success");
    });
});

module.exports = router;

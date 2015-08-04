var express = require('express');
var router = express.Router();

var anyDB = require('any-db');
var conn = anyDB.createConnection('postgres://localhost:5432/jlo');

router.get('/person', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var sql = 'SELECT * FROM person';
    var q = conn.query(sql, function(error, result) {
        res.json(result.rows);
    });
});

router.post('/person', function(req, res) { 
    var obj = req.body;
    var id = Math.abs((new Date()).valueOf() & 0xffffffff);
    var sql = 'INSERT INTO person (pid, first_name, last_name, email, sfdc_id, job_title, role_level, bu) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    conn.query(sql, [id, obj.first_name, obj.last_name, obj.email, obj.sfdc_id, obj.job_title, obj.role_level, obj.bu], function(error, result) {
        res.json({ pid: id });
    });
}); 

router.get('/person/:pid', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var pid = parseInt(req.params.pid);
    var sql = 'SELECT * FROM person WHERE pid = $1';
    var q = conn.query(sql, [pid], function(error, result) {
        res.json(result.rows[0]);
    });
});

router.put('/person/:pid', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    var pid = parseInt(req.params.pid);
    var obj = req.body;
    var sql = 'UPDATE person SET first_name = $1, last_name = $2, email = $3, sfdc_id = $4, job_title = $5, role_level = $6, bu = $7 WHERE pid = $8';
    var q = conn.query(sql, [obj.first_name, obj.last_name, obj.email, obj.sfdc_id, obj.job_title, obj.role_level, obj.bu, pid], function(error, result){
        res.json({ pid: pid });
    });
});

router.delete('/person/:pid', function(req, res){
    var pid = parseInt(req.params.pid);
    var sql = 'DELETE FROM person WHERE pid = $1';
    conn.query(sql, [pid], function(error, result) {
        res.json({ pid: pid });
    });
});

module.exports = router;

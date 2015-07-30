var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/attendee', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/attendee/:id', function(req, res) { 

}); 

router.post('/attendee')



module.exports = router;

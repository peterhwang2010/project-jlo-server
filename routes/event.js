var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/event', function(req, res, next) {
  res.send('some crap');
});

router.get('/event/:id', function(req, res) { 


}); 

router.post('/event')



module.exports = router;

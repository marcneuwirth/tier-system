var express = require('express');
var config = require('config');
var router = express.Router();


var tiers = config.get('tiers');
var ratings = config.get('ratings');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Tier System',
    data: {
      tiers: tiers,
      ratings: ratings
    }
  });
});

module.exports = router;

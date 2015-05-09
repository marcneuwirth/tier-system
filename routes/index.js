var express = require('express');
var config = require('config');
var router = express.Router();


var tiers = config.get('tiers');
var ratings = config.get('ratings');

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'The Tier System according to Whitney Sorenson',
    data: {
      tiers: tiers,
      ratings: ratings
    }
  });
});

module.exports = router;

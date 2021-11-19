// /materialmaster
var express = require('express');
var router  = express.Router();

var materialmaster = require('./controllers/materialmaster');

router.get('/', materialmaster.index);

module.exports = router;


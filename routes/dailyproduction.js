var express = require('express');
var router  = express.Router();

var dailyproduction_controller = require('./controllers/dailyproduction');

router.get('/', dailyproduction_controller.index);

module.exports = router;
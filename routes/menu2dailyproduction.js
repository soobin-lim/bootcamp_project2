var express = require('express');
var router  = express.Router();

var dailyproduction_controller = require('./controllers/menu2_dailyproduction');

router.get('/', dailyproduction_controller.index);

module.exports = router;
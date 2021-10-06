var express = require('express');
var router  = express.Router();
var dailyproduction_controller = require('../controllers/dailyproduction_controller');


router.get('/', dailyproduction_controller.index);

module.exports = router;
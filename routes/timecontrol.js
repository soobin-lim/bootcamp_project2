var express = require('express');
var router  = express.Router();
var timecontrol_controller = require('../controllers/factory/timecontrol_controllers');


router.get('/', timecontrol_controller.index);

module.exports = router;
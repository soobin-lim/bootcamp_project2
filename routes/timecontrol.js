var express = require('express');
var router  = express.Router();
var timecontrol_controller = require('../controllers/timecontrol_controller');
console.log('timecontrol.js');
router.get('/', timecontrol_controller.index);

module.exports = router;
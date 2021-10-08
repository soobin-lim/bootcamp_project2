var express = require('express');
var router  = express.Router();

var timecontrol_controller = require('./controllers/menu4_timecontrol');

router.get('/', timecontrol_controller.index);

module.exports = router;
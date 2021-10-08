var express = require('express');
var router  = express.Router();

var application_controller = require('./controllers/landing_page');

router.get('/', application_controller.index);

module.exports = router;
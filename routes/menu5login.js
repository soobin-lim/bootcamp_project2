var express = require('express');
var router  = express.Router();

var login_controller = require('./controllers/menu5)_login');

router.get('/', login_controller.index);

module.exports = router;
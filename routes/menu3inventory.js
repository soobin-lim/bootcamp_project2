var express = require('express');
var router  = express.Router();

var inventory_controller = require('./controllers/menu3_inventory');

router.get('/', inventory_controller.index);

module.exports = router;
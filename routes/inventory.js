var express = require('express');
var router  = express.Router();
var inventory_controller = require('../controllers/factory/inventory_controllers');

router.get('/', inventory_controller.index);

module.exports = router;
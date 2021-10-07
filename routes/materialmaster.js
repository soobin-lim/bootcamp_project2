var express = require('express');
var router  = express.Router();

var materialmaster = require('../controllers/materialmaster_controller');

router.get('/', materialmaster.index);

module.exports = router;
var express = require('express');
var router  = express.Router();

var trips_controller = require('../controllers/trips_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");

// router.get('/', isAuthenticated, trips_controller.index);
console.log('isAuthenticated for trips_controller.index: ', isAuthenticated);
router.get('/', isAuthenticated, (req, res) => res.render('index'));

router.post('/new', isAuthenticated, trips_controller.createTrip);

module.exports = router;
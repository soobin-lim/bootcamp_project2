const router = require('express').Router();
const material_master_route = require('./materialmaster');
// /api
// Prefix all routes defined in `kiamaterialroute.js` with `/kiamaterial
router.use('/materialmaster', material_master_route);    
// /api/materialmaster
module.exports = router;
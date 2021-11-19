// exports.index = (req, res) => res.render('report/inventory');
const inventory = require('./api/inventory');
exports.index = inventory;
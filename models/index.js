const fs = require('fs');     // be carefaul in deleting this dependency
const path = require('path');    // be carefaul in deleting this dependency
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);    // be carefaul in deleting this dependency
const env = process.env.NODE_ENV || 'development';
// entering into json file's development or production variables
const config = require(__dirname + '/../config/config.json')[env];  

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );   //Dialect needs to be explicitly in v4.0.0
}

const model1 = require('./materialmaster/kiamaterial')(sequelize, Sequelize);
const model2 = require('./materialmaster/kiaandsapmaterial')(sequelize, Sequelize);
const model3 = require('./production_report/dailyproductionreport')(sequelize, Sequelize);
const model5 = require('./timecontrol/timecontrol')(sequelize, Sequelize);

const db = {};

db.kiamaterial = model1;
db.kiaandsapmaterial = model2;
db.dailyproductionreport = model3;
db.timecontrol = model5;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

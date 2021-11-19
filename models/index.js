const fs = require('fs');     // be carefaul in deleting this dependency
const path = require('path');    // be carefaul in deleting this dependency
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);    // be carefaul in deleting this dependency
const env = process.env.NODE_ENV || 'development';
// entering into json file's development or production variables
const config = require(__dirname + '/../config/config.json')[env];  
const db = {};

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
  // console.log(sequelize)
  // index.test.js required
}

const model1 = require('./materialmaster/KiaMaterial')(sequelize, Sequelize); // module not found?
const model2 = require('./materialmaster/KiaAndSapMaterial')(sequelize, Sequelize);
const model3 = require('./production_report/DailyProductionReport')(sequelize, Sequelize);
const model5 = require('./timecontrol/TimeControl')(sequelize, Sequelize);
const model6 = require('./materialmaster/group')(sequelize, Sequelize);

db.kiamaterial = model1;
db.kiaandsapmaterial = model2;
db.dailyproductionreport = model3;
db.timecontrol = model5;
db.group = model6;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

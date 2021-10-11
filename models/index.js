const fs = require('fs');     // be carefaul
const path = require('path');    // be carefaul
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);    // be carefaul
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (process.env.JAWSDB_URL || config.use_env_variable) {
  // for Heroku
  console.log('config.use_env_variable',config.use_env_variable)
  console.log('process.env.JAWSDB_URL', process.env.JAWSDB_URL);
  sequelize = new Sequelize(process.env.JAWSDB_URL, {});
} else {
  if (config.use_env_variable) {
    //for Heroku
    console.log('config.use_env_variable',config.use_env_variable)
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    console.log('config.use_env_variable',config.use_env_variable)
    sequelize = new Sequelize(config.database, config.username, config.password, config);   //Dialect needs to be explicitly supplied as of v4.0.0
    // using .env's information..
    // console.log('option2', config.database, config.username, config.password, config);
  }
}

// DB setup
// const db = {};

// let sequelize;
// if (process.env.JAWSDB_URL) {
//   // for Heroku
//   sequelize = new Sequelize(process.env.JAWSDB_URL, {});
// } else {
//   // const env = process.env.NODE_ENV || "development";
//   // const config = path.resolve(__dirname, "..", "config", "config.json")[env];
//   const config = require(__dirname + '/../config/config.json')[env];
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

const model2 = require('./materialmaster/kiaandsapmaterial')(sequelize, Sequelize);

const model1 = require('./materialmaster/kiamaterial')(sequelize, Sequelize);

const model3 = require('./production_report/dailyproductionreport')(sequelize, Sequelize);
// const model4 = require('./materialmaster/KiaMaterial')(sequelize, Sequelize);

const model5 = require('./timecontrol/timecontrol')(sequelize, Sequelize);
// const model6 = require('./materialmaster/KiaMaterial')(sequelize, Sequelize);
db.timecontrol = model5;

db.dailyproductionreport = model3;

db.kiaandsapmaterial = model2;

db.kiamaterial = model1;
// db.model4 = model4;
// db.model6 = model6;

db.sequelize = sequelize;
db.Sequelize = Sequelize;



//1
module.exports = db;

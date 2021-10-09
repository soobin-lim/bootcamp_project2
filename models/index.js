'use strict';

const fs = require('fs');     // be carefaul
const path = require('path');    // be carefaul
const Sequelize = require('sequelize');
const basename = path.basename(__filename);    // be carefaul
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];    // there are three object in config file

//before '/../config/config.json'
//after '../config/config.json'

// __dirname = /Users/bootcamp/tdm-mxc-fsf-pt-06-2021-u-c/bootcamp_project2/models
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  // console.log('option2', config.database, config.username, config.password, config);
}

const model2 = require('./materialmaster/kiaandsapmaterial')(sequelize, Sequelize);

const model1 = require('./materialmaster/kiamaterial')(sequelize, Sequelize);

const model3 = require('./production_report/dailyproductionreport')(sequelize, Sequelize);
// const model4 = require('./materialmaster/KiaMaterial')(sequelize, Sequelize);

const model5 = require('./timecontrol/timecontrol')(sequelize, Sequelize);
// const model6 = require('./materialmaster/KiaMaterial')(sequelize, Sequelize);

db.sapmaterial = model2;

db.kiamaterial = model1;
db.dailyproductionreport = model3;
// db.model4 = model4;
db.timecontrol = model5;
// db.model6 = model6;


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

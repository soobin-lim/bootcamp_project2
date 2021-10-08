'use strict';

// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
// __dirname = /Users/bootcamp/tdm-mxc-fsf-pt-06-2021-u-c/bootcamp_project2/models
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const model1 = require('./materialmaster/KiaMaterial');
const model2 = require('./materialmaster/SapAndKiaMaterial');

const model3 = require('./production_report/DailyProductionReport');
// const model4 = require('./materialmaster/KiaMaterial');

const model5 = require('./timecontrol/TimeControl');
// const model6 = require('./materialmaster/KiaMaterial');

db.KiaMaterial = model1;
db.SapAndKiaMaterial = model2;
db.DailyProductionReport = model3;
// db.model4 = model4;
db.TimeControl = model5;
// db.model6 = model6;


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

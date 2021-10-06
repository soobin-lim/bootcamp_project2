'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);   // index.js
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;  // passing the sequelize to models
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {     // file list (js file ) ,not index.js
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {  // require(each file in files) (passing sequelize)
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
// console.log(Object.keys(db));   // ['Trip', 'User']  
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {      // associate makes relationship between Trip and Users( belongTo and hasMany)
    db[modelName].associate(db);    // user has Many Trips   and Trip belongs To User
  }
});

db.sequelize = sequelize;     // Sequelized( logged in)
db.Sequelize = Sequelize;     // just returned value of require('sequelize');

module.exports = db;

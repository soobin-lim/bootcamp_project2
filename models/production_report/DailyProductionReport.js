// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../../config/connection');

// class DailyProductionReport extends Model { }
module.exports = (sequelize, Sequelize) => {

  const dailyproductionreport = sequelize.define(
    'dailyproductionreport',
    {
      material: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pac: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [4]
        }
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['JIS', 'JIT', 'ETC']],
            msg: "Type Must be JIS or JIT or ETC"
          },
        },
      },
      client: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      Shift: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['DAY', 'NIGHT']],
            msg: "Must be DAY or NIGHT"
          },
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'dailyproductionreport',
      modelName: 'dailyproductionreport'
    }
    // {
    //   sequelize,
    //   freezeTableName: true,
    //   underscored: true,
    //   modelName: 'sap_and_kia_material',
    // }
  );
  return dailyproductionreport;
}

// return DailyProductionReport;

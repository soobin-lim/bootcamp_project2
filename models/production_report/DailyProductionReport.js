// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../../config/connection');

// class DailyProductionReport extends Model { }
module.exports = (sequelize, DataTypes) => {

  const dailyproductionreport = sequelize.define(
    'dailyproductionreport',
    {
      material: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pac: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4]
        }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['JIS', 'JIT', 'ETC']],
            msg: "Type Must be JIS or JIT or ETC"
          },
        },
      },
      client: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Date: {
        type: DataTypes.DATETIME,
        allowNull: false
      },
      Shift: {
        type: DataTypes.STRING,
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
      tableName: 'kiamaterial',
      modelName: 'kiamaterial'
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

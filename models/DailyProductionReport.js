module.exports = (sequelize, DataTypes) => {
  const DailyProductionReport = sequelize.define('DailyProductionReport', {
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
      type: DataTypes.DATE,
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
    }
  });
  // Trip.associate = models => {
  //   // associations can be defined here
  //   Trip.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // }
  return DailyProductionReport;
}
module.exports = (sequelize, Sequelize) => {
  const timecontrolreport = sequelize.define(
    'timecontrolreport',
    {
      line: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cause: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      description: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'timecontrolreport',
      modelName: 'timecontrolreport'
    }
    );
  return timecontrolreport;
}
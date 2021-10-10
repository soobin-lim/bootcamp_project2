module.exports = (sequelize, Sequelize) => {
  const timecontrol = sequelize.define(
    'timecontrol',
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
        type: Sequelize.STRING,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'timecontrol',
      modelName: 'timecontrol'
    }
  );
  return timecontrol;
}
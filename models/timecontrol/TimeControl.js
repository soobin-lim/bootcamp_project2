module.exports = (sequelize, DataTypes) => {
  const timeControl = sequelize.define('timeControl', {
    line: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cause: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  return timeControl;
}
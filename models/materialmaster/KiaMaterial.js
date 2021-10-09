'use strict';

module.exports = (sequelize, DataTypes) => {
  const kiamaterial = sequelize.define(
    'kiamaterial',
    {
      material: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: true
      },
      sapmaterial: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pac: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   len: [4]
        // }
      },
    },
    {
      timestamps: false
    }
    );
  return kiamaterial;
}
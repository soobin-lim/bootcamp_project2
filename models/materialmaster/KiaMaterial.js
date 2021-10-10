'use strict';

module.exports = (sequelize, Sequelize) => {
  const kiamaterial = sequelize.define(
    'kiamaterial',
    {
      material: {
        type: Sequelize.STRING,
        allowNull: true,
        primaryKey: true
      },
      materialwithoutdash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sapmaterial: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pac: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'kiamaterial',
      modelName: 'kiamaterial'
    }
    );
  return kiamaterial;
}
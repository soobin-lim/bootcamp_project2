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
        // validate: {
        //   len: [4]
        // }
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
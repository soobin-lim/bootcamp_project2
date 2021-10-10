'use strict';
module.exports = (sequelize, Sequelize) => {
  const kiaandsapmaterial = sequelize.define(
    'kiaandsapmaterial',
    {
      status:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      material: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sapmaterial: {
        type: Sequelize.STRING,
        allowNull: true,
        primaryKey: true
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'kiaandsapmaterial',
      modelName: 'kiaandsapmaterial'
    }
    // {
    //   sequelize,
    //   freezeTableName: true,
    //   underscored: true,
    //   modelName: 'sap_and_kia_material',
    // }
  );
  return kiaandsapmaterial;
}
'use strict';
module.exports = (sequelize, DataTypes) => {
  const kiaandsapmaterial = sequelize.define(
    'kiaandsapmaterial',
    {
      status:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      material: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sapmaterial: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: true
      },
    },
    {
      timestamps: false
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
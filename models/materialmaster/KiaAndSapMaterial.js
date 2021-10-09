'use strict';
module.exports = (sequelize, DataTypes) => {
  const KiaAndSapMaterial = sequelize.define(
    'KiaAndSapMaterial',
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
  return KiaAndSapMaterial;
}
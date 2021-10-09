'use strict';
module.exports = (sequelize, DataTypes) => {
  const SapAndKiaMaterial = sequelize.define(
    'SapAndKiaMaterial',
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
        validate: {
          len: [4]
        }
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
  return SapAndKiaMaterial;
}
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class SapAndKiaMaterial extends Model { }
SapAndKiaMaterial.init(
  {
    material: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sapmaterial:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    description:{
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
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'sap_and_kia_material',
  }
);
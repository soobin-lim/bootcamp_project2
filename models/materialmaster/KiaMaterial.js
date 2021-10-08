const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class KiaMaterial extends Model { }

KiaMaterial.init(
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
    modelName: 'kiamaterial',
  }
);

module.exports = KiaMaterial;


// Date: {
//   type: DataTypes.DATE,
//   allowNull: false
// },
// Shift: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   validate: {
//     isIn: {
//       args: [['DAY', 'NIGHT']],
//       msg: "Must be DAY or NIGHT"
//     },
//   },
// },

// client: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },

// type: {
//   type: DataTypes.STRING,
//   allowNull: true,
//   validate: {
//     isIn: {
//       args: [['JIS', 'JIT', 'ETC']],
//       msg: "Type Must be JIS or JIT or ETC"
//     },
//   },
// },
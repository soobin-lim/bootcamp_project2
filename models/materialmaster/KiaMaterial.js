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
        allowNull: true,
      },
      pac: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pgn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pgndescription: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    },
    {
      hooks: {
        beforeCreate: (kiamaterial)=>{
          kiamaterial.materialwithoutdash = kiamaterial.material.replace("-", "");
          return kiamaterial
        }
      },
      timestamps: false,
      freezeTableName: true,
      tableName: 'kiamaterial',
      modelName: 'kiamaterial'
    }
    );
  return kiamaterial;
}
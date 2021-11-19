module.exports = (sequelize, Sequelize) => {
  const group = sequelize.define(
    'group',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'group',
      modelName: 'group'
    }
    );
  return group;
}
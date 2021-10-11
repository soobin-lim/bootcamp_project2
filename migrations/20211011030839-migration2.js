'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('kiaandsapmaterial',
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
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * 
     */
     await queryInterface.dropTable('kiaandsapmaterial')
  }
};

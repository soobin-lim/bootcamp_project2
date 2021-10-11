'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('kiamaterial',
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
        allowNull: false,
      },
      pac: {
        type: Sequelize.STRING,
        allowNull: false,
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
     await queryInterface.dropTable('kiamaterial')
  }
};

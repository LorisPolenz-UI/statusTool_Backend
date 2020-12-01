'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      liveStatus: {
        type: Sequelize.STRING
      },
      statusColor: {
        type: Sequelize.STRING
      },
      background: {
        type: Sequelize.STRING
      },
      startingAt: {
        type: Sequelize.DATE
      },
      endingAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('statuses');
  }
};
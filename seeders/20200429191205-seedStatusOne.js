'use strict';

let now = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('statuses', [{
        liveStatus: 'The door is locked my firend' ,
        statusColor: 'red',
        background: 'onAirSign',
        startingAt: now,
        endingAt: now,
        createdAt: now,
        updatedAt: now
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('statuses', null, {});
    
  }
};

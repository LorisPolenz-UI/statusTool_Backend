const Sequelize = require('sequelize');

module.exports = new Sequelize('tawohuna_randomBackendStuff', 'tawohuna_devLor', process.env.DB_PASSWORD, {
  host: 'tawohuna.mysql.db.hostpoint.ch',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
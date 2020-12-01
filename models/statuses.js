"use strict";
const Sequelize = require("sequelize");
const db = require("../config/database.js");

module.exports = db.define("statuses", {
  liveStatus: Sequelize.STRING,
  statusColor: Sequelize.STRING,
  background: Sequelize.STRING,
  startingAt: Sequelize.DATE,
  endingAt: Sequelize.DATE,
});

"use strict";
const Sequelize = require("sequelize");
const db = require("../config/database.js");

module.exports = db.define("user", {
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  createdAt: new Date(),
  updatedAt: new Date()
});
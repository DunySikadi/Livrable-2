const { DataTypes } = require("sequelize");
const db = require("../Database/db");

const Prof = db.define("prof", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  firstname: {
    type: DataTypes.STRING,
  },
  office: {
    type: DataTypes.INTEGER,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = Prof;

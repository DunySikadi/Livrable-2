const { DataTypes } = require("sequelize");
const db = require("../Database/db");

const Edt = db.define("edt", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  slotNumber: {
    type: DataTypes.ENUM(1, 2, 3, 4, 5, 6),
    allowNull: false,
  },
  teaching: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  typeOfSession: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  teacher: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  group: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  room: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
});

module.exports = Edt;

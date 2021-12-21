//require the sequelize package to manipulate this object
const { Model, DataTypes } = require('sequelize');
//require the sequelize connection
const sequelize = require('../config/connection.js');
//declare the Location model
class Location extends Model {}
//declare the loaction table, column and datatypes
Location.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    zip_code: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'location',
  }
);
//exports the Loaction model
module.exports = Location;

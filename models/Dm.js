//require the sequelize package to manipulate this object
const { Model, DataTypes } = require('sequelize');
//require the sequelize connection
const sequelize = require('../config/connection');
//declare the DM model
class DM extends Model {}

//declare the thread table, columns and dataypes
DM.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dm_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    sender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    recepient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'DM'
  }
);
//export the Comment model
module.exports = DM;

//require the sequelize package to manipulate this object
const { Model, DataTypes } = require("sequelize");
//require the sequelize connection
const sequelize = require("../config/connection");
//declare the comment model
class DirectMessage extends Model {}
//declare the Comment table, columns and dataypes
DirectMessage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    from_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    to_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "job",
        key: "id",
      },
    },
    message_parties: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "directmessage",
  }
);
//export the DirectMessage model
module.exports = DirectMessage;

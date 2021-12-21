//require the sequelize package to manipulate this object
const { Model, DataTypes } = require("sequelize");
//require the sequelize connection
const sequelize = require("../config/connection.js");
//declare the Tag model
class Tag extends Model {}
//create the Tag model table, columns and dataypes
Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);
//exports the Tag model
module.exports = Tag;

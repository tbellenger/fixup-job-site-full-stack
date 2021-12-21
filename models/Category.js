//require the sequelize package to manipulate this object
const { Model, DataTypes } = require("sequelize");
//require the sequelize connection
const sequelize = require("../config/connection");
//declare the Category model
class Category extends Model {}
//declare the category table, columns and datypes
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);
//export the category model
module.exports = Category;

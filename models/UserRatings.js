//require the sequelize package to manipulate model and dataypes
const { Model, DataTypes } = require("sequelize");
//require the sequelize connection
const sequelize = require("../config/connection");
//declare the ratings model
class Ratings extends Model {}
//create the Ratings table and columns and dataypes
Ratings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "ratings",
  }
);
//export the Ratings model
module.exports = Ratings;

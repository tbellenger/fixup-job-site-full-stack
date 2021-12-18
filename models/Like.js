const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "job",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "vote",
  }
);

module.exports = Like;

//require the sequelize package to manipulate this object
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Jobimage extends Model {}
Jobimage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "job",
        key: "id",
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "jobimage",
  }
);
//export the category model
module.exports = Jobimage;

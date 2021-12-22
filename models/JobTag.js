//require the sequelize package to manipulate this object
const { Model, DataTypes } = require('sequelize');
//require the sequelize connection
const sequelize = require('../config/connection');
//declare the Jbtag model
class JobTag extends Model {}
//declare the JobTag table, columns and datatypes
JobTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'job',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'job_tag',
  }
);
//export the JobTag model
module.exports = JobTag;

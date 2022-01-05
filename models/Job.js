//require the sequelize package to manipulate this object
const { Model, DataTypes } = require("sequelize");
//require the sequelize connection
const sequelize = require("../config/connection");
// create our Post model
class Job extends Model {}

// create fields/columns for Post model
Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // we can create a table to track applicants - there will be more than
    employee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
    category_name: {
      type: DataTypes.STRING,
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [5],
      },
    },
    job_status: {
      type: DataTypes.ENUM("open", "filled", "complete"),
      defaultValue: "open",
    },
    // interested: {
    //   type: DataTypes.BOOLEAN,
    // }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "job",
  }
);
//export the Job model
module.exports = Job;

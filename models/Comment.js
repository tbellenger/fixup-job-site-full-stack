//require the sequelize package to manipulate this object
const { Model, DataTypes } = require('sequelize');
//require the sequelize connection
const sequelize = require('../config/connection');
//declare the comment model
class Comment extends Model {}
//declare the Comment table, columns and dataypes
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'job',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);
//export the Comment model
module.exports = Comment;

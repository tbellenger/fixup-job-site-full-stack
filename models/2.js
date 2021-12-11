const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Object2 extends Model {}

Object2.init({
    //rows will go here
})


module.exports = Object2;
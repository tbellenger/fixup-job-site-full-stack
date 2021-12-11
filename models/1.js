const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Object1 extends Model {}

Object1.init({
    //rows will go here
})


module.exports = Object1;
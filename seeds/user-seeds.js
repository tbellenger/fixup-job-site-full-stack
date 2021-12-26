//require the sequelize package connection
const sequelize = require("../config/connection");
//require the user models
const { User } = require("../models");
//declare the User models keys and values
const userdata = [
  {
    username: "tarek",
    email: "tarek@gmail.com",
    password: "password123",
    last_login: new Date(),
  },
  {
    username: "alma",
    email: "alma@gmail.com",
    password: "password123",
    last_login: new Date(),
  },
  {
    username: "tom",
    email: "tbellenger@gmail.com",
    password: "1234",
    last_login: new Date(),
  },
  {
    username: "kate",
    email: "kate@gmail.com",
    password: "password1234",
    last_login: new Date(),
  },
];
//seed the user data all together
const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });
//exports the users informations
module.exports = seedUsers;

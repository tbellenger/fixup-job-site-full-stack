const sequelize = require("../config/connection");
const { User } = require("../models");

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
    email: "tom@gmail.com",
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

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;

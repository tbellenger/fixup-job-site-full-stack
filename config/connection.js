//require the package to hide the sensitive information
require("dotenv").config();
//require the sequelize package
const Sequelize = require("sequelize");
//condition to require sequelize, used other url host aside from localhost
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "localhost",
      dialect: "mysql",
      dialectOptions: {
        decimalNumbers: true,
      },
    });
//export the sequelize package
module.exports = sequelize;

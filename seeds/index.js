const seedUsers = require("./user-seeds");
const seedJobs = require("./job-seeds");
const seedCategory = require("./category-seeds");
const seedLocation = require("./location-seeds");
const seedJobLocation = require("./job-location-seeds");
const seedTag = require("./tag-seeds");
const seedJobTags = require("./job-tag-seeds");
const seedComments = require("./comments-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------");
  await seedUsers();
  console.log("--------------");

  await seedCategory();
  console.log("--------------");

  await seedLocation();
  console.log("--------------");

  await seedTag();
  console.log("--------------");

  await seedJobs();
  console.log("--------------");

  await seedJobLocation();
  console.log("--------------");

  await seedJobTags();
  console.log("--------------");

  await seedComments();
  console.log("--------------");

  process.exit(0);
};

seedAll();

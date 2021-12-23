//require all the files that contains all data information
const seedUsers = require("./user-seeds");
const seedJobs = require("./job-seeds");
const seedCategory = require("./category-seeds");
const seedTag = require("./tag-seeds");
const seedJobTags = require("./job-tag-seeds");
const seedComments = require("./comments-seeds");
const seedLike = require("./like-seeds");
const seedRatings = require("./ratings-seeds");
//require the sequelize connection
const sequelize = require("../config/connection");
//function to seed all the data from the local storage
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------");
  await seedUsers();
  console.log("--------------");

  await seedCategory();
  console.log("--------------");

  await seedTag();
  console.log("--------------");

  await seedJobs();
  console.log("--------------");

  await seedJobTags();
  console.log("--------------");

  await seedComments();
  console.log("--------------");

  await seedLike();
  console.log("--------------");

  await seedRatings();
  console.log("--------------");

  process.exit(0);
};
//call back function
seedAll();

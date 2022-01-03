//require the category job models
const { Category } = require("../models");
//declare the category key and value
const categorydata = [
  {
    category_name: "Yard work",
  },
  {
    category_name: "Painting",
  },
  {
    category_name: "Handyman",
  },
  {
    category_name: "Electrical",
  },
  {
    category_name: "Cleanup",
  },
  {
    category_name: "Plumbing",
  },
  {
    category_name: "Other"
  }
];
//seed all the category data
const seedCategory = () => Category.bulkCreate(categorydata);
//then exports all seeded category data
module.exports = seedCategory;
